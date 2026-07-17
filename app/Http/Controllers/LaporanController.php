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

        // 5. View trend (last 6 months)
        $viewsTrend = ViewLog::select(
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

        // 6. Top kajian by views
        $topByViews = Kajian::with(['bidang', 'jenisKajian'])
            ->whereIn('id', $kajianIds)
            ->where('status', 'published')
            ->orderBy('view_count', 'desc')
            ->limit(5)
            ->get()
            ->map(fn($k) => [
                'judul' => $k->judul,
                'bidang' => $k->bidang->nama ?? '-',
                'views' => $k->view_count,
                'downloads' => $k->download_count,
                'slug' => $k->slug,
            ])->toArray();

        // 7. Top kajian by downloads
        $topByDownloads = Kajian::with(['bidang', 'jenisKajian'])
            ->whereIn('id', $kajianIds)
            ->where('status', 'published')
            ->orderBy('download_count', 'desc')
            ->limit(5)
            ->get()
            ->map(fn($k) => [
                'judul' => $k->judul,
                'bidang' => $k->bidang->nama ?? '-',
                'views' => $k->view_count,
                'downloads' => $k->download_count,
                'slug' => $k->slug,
            ])->toArray();

        // 8. Status distribution
        $statusDist = [
            ['label' => 'Published', 'value' => $totalPublished],
            ['label' => 'Draft', 'value' => $totalDraft],
            ['label' => 'Review', 'value' => $totalReview],
            ['label' => 'Archived', 'value' => $totalArchived],
        ];

        // 9. Views & Downloads per bidang
        $viewsPerBidang = Bidang::withCount(['kajians' => function ($q) use ($kajianIds) {
            $q->whereIn('id', $kajianIds)->where('status', 'published');
        }])
        ->withSum(['kajians' => function ($q) use ($kajianIds) {
            $q->whereIn('id', $kajianIds)->where('status', 'published');
        }], 'view_count')
        ->withSum(['kajians' => function ($q) use ($kajianIds) {
            $q->whereIn('id', $kajianIds)->where('status', 'published');
        }], 'download_count')
        ->get()
        ->map(fn($b) => [
            'bidang' => $b->nama,
            'kajian' => $b->kajians_count,
            'views' => $b->kajians_sum_view_count ?? 0,
            'downloads' => $b->kajians_sum_download_count ?? 0,
        ])->toArray();

        $charts = [
            'per_tahun' => $perTahun,
            'per_bidang' => $perBidang,
            'per_jenis' => $perJenis,
            'downloads_trend' => $downloadsTrend,
            'views_trend' => $viewsTrend,
            'top_by_views' => $topByViews,
            'top_by_downloads' => $topByDownloads,
            'status_distribution' => $statusDist,
            'views_per_bidang' => $viewsPerBidang,
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
