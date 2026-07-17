<?php

namespace App\Http\Controllers;

use App\Models\Kajian;
use App\Models\Bidang;
use App\Models\JenisKajian;
use App\Models\Tahun;
use App\Models\ViewLog;
use App\Models\DownloadLog;
use App\Services\StatisticsService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class LaporanController extends Controller
{
    protected $statsService;

    public function __construct(StatisticsService $statsService)
    {
        $this->statsService = $statsService;
    }

    public function index(Request $request)
    {
        $user = $request->user();
        
        $query = Kajian::with(['bidang', 'jenisKajian', 'tahun'])
            ->where('status', 'published');

        if ($user->hasRole('pengguna')) {
            $query->where('bidang_id', $user->id_opd);
        }

        // Apply filters
        if ($request->has('search') && $request->search) {
            $query->where('judul', 'like', "%{$request->search}%");
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

        $data = $query->orderBy('created_at', 'desc')->get();

        $summary = $this->statsService->getSummaryStats($user->hasRole('pengguna') ? $user->id_opd : null);

        return Inertia::render('Backend/Laporan/Index', [
            'data' => $data,
            'summary' => $summary,
            'filters' => $request->all(),
            'bidangs' => Bidang::orderBy('nama')->get(),
            'jenisKajians' => JenisKajian::orderBy('nama')->get(),
            'tahuns' => Tahun::orderBy('tahun', 'desc')->get(),
        ]);
    }

    public function statistik(Request $request)
    {
        $user = $request->user();
        $bidangId = $user->hasRole('pengguna') ? $user->id_opd : null;

        // Base query for counting metrics
        $query = Kajian::query();

        if ($bidangId) {
            $query->where('bidang_id', $bidangId);
        }

        // Apply filters
        if ($request->filled('bidang_id')) {
            $query->where('bidang_id', $request->bidang_id);
        }
        if ($request->filled('jenis_id')) {
            $query->where('jenis_id', $request->jenis_id);
        }
        if ($request->filled('tahun_id')) {
            $query->where('tahun_id', $request->tahun_id);
        }

        // Summary metrics
        $totalKajian = (clone $query)->count();
        $totalPublished = (clone $query)->where('status', 'published')->count();
        $totalDraft = (clone $query)->where('status', 'draft')->count();
        $totalReview = (clone $query)->where('status', 'review')->count();
        $totalArchived = (clone $query)->where('status', 'archived')->count();

        $kajianIds = (clone $query)->pluck('id');

        $totalViews = ViewLog::whereIn('kajian_id', $kajianIds)->count();
        $totalDownloads = DownloadLog::whereIn('kajian_id', $kajianIds)->count();

        $summary = [
            'total_kajian' => $totalKajian,
            'total_published' => $totalPublished,
            'total_draft' => $totalDraft,
            'total_review' => $totalReview,
            'total_archived' => $totalArchived,
            'total_views' => $totalViews,
            'total_downloads' => $totalDownloads,
        ];

        // 1. Kajian per Tahun
        $perTahun = Tahun::withCount(['kajians' => function ($q) use ($request, $bidangId) {
            $q->where('status', 'published');
            if ($bidangId) {
                $q->where('bidang_id', $bidangId);
            }
            if ($request->filled('bidang_id')) {
                $q->where('bidang_id', $request->bidang_id);
            }
            if ($request->filled('jenis_id')) {
                $q->where('jenis_id', $request->jenis_id);
            }
        }])->orderBy('tahun')->get()->map(fn($t) => [
            'label' => (string) $t->tahun,
            'value' => $t->kajians_count,
        ])->toArray();

        // 2. Kajian per Bidang
        $perBidang = Bidang::withCount(['kajians' => function ($q) use ($request) {
            $q->where('status', 'published');
            if ($request->filled('jenis_id')) {
                $q->where('jenis_id', $request->jenis_id);
            }
            if ($request->filled('tahun_id')) {
                $q->where('tahun_id', $request->tahun_id);
            }
        }])->get()->map(fn($b) => [
            'label' => $b->nama,
            'value' => $b->kajians_count,
        ])->toArray();

        // 3. Kajian per Jenis
        $perJenis = JenisKajian::withCount(['kajians' => function ($q) use ($request, $bidangId) {
            $q->where('status', 'published');
            if ($bidangId) {
                $q->where('bidang_id', $bidangId);
            }
            if ($request->filled('bidang_id')) {
                $q->where('bidang_id', $request->bidang_id);
            }
            if ($request->filled('tahun_id')) {
                $q->where('tahun_id', $request->tahun_id);
            }
        }])->get()->map(fn($j) => [
            'label' => $j->nama,
            'value' => $j->kajians_count,
        ])->toArray();

        // 4. Download trend
        $downloadsTrend = DownloadLog::select(
                DB::raw("DATE_FORMAT(created_at, '%Y-%m') as month"),
                DB::raw("count(*) as count")
            )
            ->whereIn('kajian_id', $kajianIds)
            ->where('created_at', '>=', now()->subMonths(6))
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->map(fn($l) => [
                'label' => $l->month,
                'value' => $l->count,
            ])->toArray();

        $charts = [
            'per_tahun' => $perTahun,
            'per_bidang' => $perBidang,
            'per_jenis' => $perJenis,
            'downloads_trend' => $downloadsTrend,
        ];

        return Inertia::render('Backend/Laporan/Statistik', [
            'summary' => $summary,
            'charts' => $charts,
            'bidangs' => Bidang::orderBy('nama')->get(),
            'jenisKajians' => JenisKajian::orderBy('nama')->get(),
            'tahuns' => Tahun::orderBy('tahun', 'desc')->get(),
            'filters' => $request->only(['bidang_id', 'jenis_id', 'tahun_id']),
        ]);
    }

    public function cetakDetail($uuid)
    {
        $kajian = Kajian::with(['bidang', 'jenisKajian', 'tahun', 'keywords', 'files', 'galleries'])
            ->where('uuid', $uuid)
            ->firstOrFail();

        return Inertia::render('Backend/Laporan/CetakDetail', [
            'kajian' => $kajian
        ]);
    }
}
