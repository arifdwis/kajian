<?php

namespace App\Http\Controllers;

use App\Models\Kajian;
use App\Models\KajianFile;
use App\Models\ViewLog;
use App\Models\DownloadLog;
use App\Models\Bidang;
use App\Models\JenisKajian;
use App\Models\Tahun;
use App\Models\Keyword;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class PortalKajianController extends Controller
{
    /**
     * Display a list of published kajians
     */
    public function index(Request $request)
    {
        $query = Kajian::with(['bidang', 'jenisKajian', 'tahun', 'keywords', 'files'])
            ->where('status', 'published');

        // Search & Filters
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where('judul', 'like', "%{$search}%");
        }

        if ($request->filled('bidang_id')) {
            $query->where('bidang_id', $request->bidang_id);
        }

        if ($request->filled('jenis_id')) {
            $query->where('jenis_id', $request->jenis_id);
        }

        if ($request->filled('tahun_id')) {
            $query->where('tahun_id', $request->tahun_id);
        }

        // Sorting
        $sort = $request->input('sort', 'terbaru');
        if ($sort === 'populer') {
            $query->orderBy('download_count', 'desc')->orderBy('view_count', 'desc');
        } elseif ($sort === 'a-z') {
            $query->orderBy('judul', 'asc');
        } else {
            $query->orderBy('published_at', 'desc');
        }

        $kajians = $query->paginate(9)->withQueryString();

        return Inertia::render('Frontend/Portal/KajianList', [
            'kajians' => $kajians,
            'filters' => $request->all(),
            'bidangs' => Bidang::orderBy('nama')->get(),
            'jenisKajians' => JenisKajian::orderBy('nama')->get(),
            'tahuns' => Tahun::orderBy('tahun', 'desc')->get(),
        ]);
    }

    /**
     * Display detail of a published kajian by slug
     */
    public function show(Request $request, $slug)
    {
        $kajian = Kajian::with(['bidang', 'jenisKajian', 'tahun', 'keywords', 'files', 'galleries', 'versions'])
            ->where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();

        // Increment view count and record view log
        $kajian->increment('view_count');
        ViewLog::create([
            'user_id' => auth()->id(),
            'kajian_id' => $kajian->id,
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        // Get related publications (recommendations based on same bidang or same jenis)
        $related = Kajian::with(['bidang', 'jenisKajian', 'tahun'])
            ->where('id', '!=', $kajian->id)
            ->where('status', 'published')
            ->where(function($q) use ($kajian) {
                $q->where('bidang_id', $kajian->bidang_id)
                  ->orWhere('jenis_id', $kajian->jenis_id);
            })
            ->limit(3)
            ->get();

        return Inertia::render('Frontend/Portal/KajianDetail', [
            'kajian' => $kajian,
            'relatedKajians' => $related,
        ]);
    }

    /**
     * Track and download document attachments
     */
    public function download(Request $request, $slug)
    {
        $kajian = Kajian::where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();

        // If file_id provided, use it. Otherwise get the PDF file.
        if ($request->filled('file_id')) {
            $file = KajianFile::where('id', $request->file_id)
                ->where('kajian_id', $kajian->id)
                ->firstOrFail();
        } else {
            $file = KajianFile::where('kajian_id', $kajian->id)
                ->where('tipe', 'pdf')
                ->first();

            if (!$file) {
                $file = KajianFile::where('kajian_id', $kajian->id)->first();
            }

            if (!$file) {
                abort(404, 'Tidak ada berkas untuk diunduh.');
            }
        }

        // Increment download count and record log
        $kajian->increment('download_count');
        DownloadLog::create([
            'user_id' => auth()->id(),
            'kajian_id' => $kajian->id,
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        $path = storage_path('app/public/' . $file->file_path);

        if (!file_exists($path)) {
            abort(404, 'File not found on server.');
        }

        return response()->download($path, $file->file_name);
    }
}
