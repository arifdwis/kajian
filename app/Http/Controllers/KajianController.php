<?php

namespace App\Http\Controllers;

use App\Models\Kajian;
use App\Models\KajianFile;
use App\Models\KajianGallery;
use App\Models\Bidang;
use App\Models\JenisKajian;
use App\Models\Tahun;
use App\Models\Keyword;
use App\Http\Requests\Kajian\StoreKajianRequest;
use App\Http\Requests\Kajian\UpdateKajianRequest;
use App\Services\KajianService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class KajianController extends Controller
{
    protected $kajianService;

    public function __construct(KajianService $kajianService)
    {
        $this->kajianService = $kajianService;
    }

    public function index(Request $request)
    {
        $user = $request->user();
        
        $query = Kajian::with(['bidang', 'jenisKajian', 'tahun', 'keywords', 'creator']);

        // Scope by operator's bidang
        if ($user->hasRole('operator')) {
            $query->where('bidang_id', $user->id_opd);
        }

        // Apply filters
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('judul', 'like', "%{$search}%")
                  ->orWhere('penanggung_jawab', 'like', "%{$search}%");
            });
        }

        if ($request->has('bidang_id') && $request->bidang_id) {
            $query->where('bidang_id', $request->bidang_id);
        }

        if ($request->has('jenis_id') && $request->jenis_id) {
            $query->where('jenis_id', $request->jenis_id);
        }

        if ($request->has('tahun_id') && $request->tahun_id) {
            $query->where('tahun_id', $request->tahun_id);
        }

        if ($request->has('status') && $request->status) {
            $query->where('status', $request->status);
        }

        $kajians = $query->orderBy('created_at', 'desc')->paginate(10)->withQueryString();

        return Inertia::render('Backend/Kajian/Index', [
            'kajians' => $kajians,
            'filters' => $request->all(),
            'bidangs' => Bidang::orderBy('nama')->get(),
            'jenisKajians' => JenisKajian::orderBy('nama')->get(),
            'tahuns' => Tahun::orderBy('tahun', 'desc')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Backend/Kajian/Create', [
            'bidangs' => Bidang::orderBy('nama')->get(),
            'jenisKajians' => JenisKajian::orderBy('nama')->get(),
            'tahuns' => Tahun::orderBy('tahun', 'desc')->get(),
            'keywords' => Keyword::orderBy('nama')->get(),
        ]);
    }

    public function store(StoreKajianRequest $request)
    {
        $data = $request->validated();
        $data['uuid'] = (string) Str::uuid();
        $data['created_by'] = auth()->id();
        $data['status'] = $request->input('status', 'draft');

        $kajian = Kajian::create($data);

        // Sync keywords
        if ($request->has('keywords')) {
            $kajian->keywords()->sync($request->keywords);
        }

        // Upload files
        if ($request->hasFile('file_pdf')) {
            $this->kajianService->uploadFile($kajian, $request->file('file_pdf'), 'pdf');
        }
        if ($request->hasFile('file_presentasi')) {
            $this->kajianService->uploadFile($kajian, $request->file('file_presentasi'), 'presentasi');
        }
        if ($request->hasFile('file_cover')) {
            $this->kajianService->uploadFile($kajian, $request->file('file_cover'), 'cover');
        }

        return redirect()->route('kajian.index')->with('success', 'Kajian berhasil disimpan sebagai draft.');
    }

    public function show(Kajian $kajian)
    {
        $kajian->load(['bidang', 'jenisKajian', 'tahun', 'keywords', 'files', 'galleries', 'versions.creator', 'creator']);
        
        return Inertia::render('Backend/Kajian/Show', [
            'kajian' => $kajian,
        ]);
    }

    public function edit(Kajian $kajian)
    {
        $kajian->load(['keywords', 'files']);
        
        return Inertia::render('Backend/Kajian/Edit', [
            'kajian' => $kajian,
            'bidangs' => Bidang::orderBy('nama')->get(),
            'jenisKajians' => JenisKajian::orderBy('nama')->get(),
            'tahuns' => Tahun::orderBy('tahun', 'desc')->get(),
            'keywords' => Keyword::orderBy('nama')->get(),
        ]);
    }

    public function update(UpdateKajianRequest $request, Kajian $kajian)
    {
        $data = $request->validated();
        
        // Save version snapshot before update
        $summary = $request->input('changes_summary', 'Update data kajian');
        $this->kajianService->createVersionSnapshot($kajian, ['description' => $summary]);

        $kajian->update($data);

        // Sync keywords
        if ($request->has('keywords')) {
            $kajian->keywords()->sync($request->keywords);
        }

        // Upload files if updated
        if ($request->hasFile('file_pdf')) {
            $this->kajianService->uploadFile($kajian, $request->file('file_pdf'), 'pdf');
        }
        if ($request->hasFile('file_presentasi')) {
            $this->kajianService->uploadFile($kajian, $request->file('file_presentasi'), 'presentasi');
        }
        if ($request->hasFile('file_cover')) {
            $this->kajianService->uploadFile($kajian, $request->file('file_cover'), 'cover');
        }

        return redirect()->route('kajian.show', $kajian->uuid)->with('success', 'Kajian berhasil diperbarui.');
    }

    public function destroy(Kajian $kajian)
    {
        $kajian->delete();
        return redirect()->route('kajian.index')->with('success', 'Kajian berhasil dihapus.');
    }

    public function publish($uuid)
    {
        $kajian = Kajian::where('uuid', $uuid)->firstOrFail();
        $this->kajianService->publish($kajian);
        return redirect()->back()->with('success', 'Kajian telah berhasil dipublikasikan.');
    }

    public function archive($uuid)
    {
        $kajian = Kajian::where('uuid', $uuid)->firstOrFail();
        $this->kajianService->archive($kajian);
        return redirect()->back()->with('success', 'Kajian telah berhasil diarsipkan.');
    }

    public function toDraft($uuid)
    {
        $kajian = Kajian::where('uuid', $uuid)->firstOrFail();
        $this->kajianService->toDraft($kajian);
        return redirect()->back()->with('success', 'Kajian dikembalikan ke status draft.');
    }

    public function uploadFile(Request $request, $uuid)
    {
        $request->validate([
            'file' => 'required|file|max:20480',
            'tipe' => 'required|in:pdf,presentasi,cover'
        ]);

        $kajian = Kajian::where('uuid', $uuid)->firstOrFail();
        $this->kajianService->uploadFile($kajian, $request->file('file'), $request->tipe);

        return redirect()->back()->with('success', 'File berhasil diupload.');
    }

    public function deleteFile($uuid, $fileId)
    {
        $file = KajianFile::where('id', $fileId)->firstOrFail();
        $this->kajianService->deleteFile($file);

        return redirect()->back()->with('success', 'File berhasil dihapus.');
    }

    public function uploadGallery(Request $request, $uuid)
    {
        $request->validate([
            'file' => 'required|image|mimes:jpeg,png,jpg|max:5120',
            'caption' => 'nullable|string|max:255'
        ]);

        $kajian = Kajian::where('uuid', $uuid)->firstOrFail();
        $this->kajianService->uploadGallery($kajian, $request->file('file'), $request->caption);

        return redirect()->back()->with('success', 'Foto galeri berhasil ditambahkan.');
    }
}
