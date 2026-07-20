<?php

namespace App\Services;

use App\Models\Kajian;
use App\Models\DownloadLog;
use App\Models\ViewLog;
use App\Models\Bidang;
use App\Models\JenisKajian;
use App\Models\Tahun;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;

class StatisticsService
{
    /**
     * Get statistics summaries
     */
    public function getSummaryStats(?int $bidangId = null): array
    {
        $cacheKey = 'summary_stats_' . ($bidangId ?? 'all');
        
        return Cache::remember($cacheKey, 60, function() use ($bidangId) {
            $query = Kajian::query();
            if ($bidangId) {
                $query->where('bidang_id', $bidangId);
            }

            $totalKajian = (clone $query)->count();
            $totalPublished = (clone $query)->where('status', 'published')->count();
            $totalDraft = (clone $query)->where('status', 'draft')->count();
            $totalReview = (clone $query)->where('status', 'review')->count();
            $totalArchived = (clone $query)->where('status', 'archived')->count();

            $kajianIds = (clone $query)->pluck('id');

            $totalViews = ViewLog::whereIn('kajian_id', $kajianIds)->count();
            $totalDownloads = DownloadLog::whereIn('kajian_id', $kajianIds)->count();

            return [
                'total_kajian' => $totalKajian,
                'total_published' => $totalPublished,
                'total_draft' => $totalDraft,
                'total_review' => $totalReview,
                'total_archived' => $totalArchived,
                'total_views' => $totalViews,
                'total_downloads' => $totalDownloads,
            ];
        });
    }

    /**
     * Get distribution charts data
     */
    public function getChartsData(?int $bidangId = null): array
    {
        $cacheKey = 'charts_data_' . ($bidangId ?? 'all');
        
        return Cache::remember($cacheKey, 3600, function() use ($bidangId) {
            // 1. Kajian per Tahun
            $perTahun = Tahun::withCount(['kajians' => function ($q) use ($bidangId) {
                if ($bidangId) $q->where('bidang_id', $bidangId);
                $q->where('status', 'published');
            }])->orderBy('tahun')->get()->map(fn($t) => [
                'label' => (string) $t->tahun,
                'value' => $t->kajians_count,
            ])->toArray();

            // 2. Kajian per Bidang
            $perBidang = Bidang::withCount(['kajians' => function ($q) {
                $q->where('status', 'published');
            }])->get()->map(fn($b) => [
                'label' => $b->nama,
                'value' => $b->kajians_count,
            ])->toArray();

            // 3. Kajian per Jenis
            $perJenis = JenisKajian::withCount(['kajians' => function ($q) use ($bidangId) {
                if ($bidangId) $q->where('bidang_id', $bidangId);
                $q->where('status', 'published');
            }])->get()->map(fn($j) => [
                'label' => $j->nama,
                'value' => $j->kajians_count,
            ])->toArray();

            // 4. Download trend (last 6 months)
            $driver = DB::connection()->getDriverName();
            $monthExpr = $driver === 'sqlite'
                ? "strftime('%Y-%m', created_at) as month"
                : "DATE_FORMAT(created_at, '%Y-%m') as month";

            $downloadsTrend = DownloadLog::select(
                    DB::raw($monthExpr),
                    DB::raw("count(*) as count")
                )
                ->when($bidangId, function($q) use ($bidangId) {
                    $q->whereHas('kajian', function($k) use ($bidangId) {
                        $k->where('bidang_id', $bidangId);
                    });
                })
                ->where('created_at', '>=', now()->subMonths(6))
                ->groupBy('month')
                ->orderBy('month')
                ->get()
                ->map(fn($l) => [
                    'label' => $l->month,
                    'value' => $l->count,
                ])->toArray();

            return [
                'per_tahun' => $perTahun,
                'per_bidang' => $perBidang,
                'per_jenis' => $perJenis,
                'downloads_trend' => $downloadsTrend,
            ];
        });
    }

    /**
     * Get popular publications
     */
    public function getPopularKajian(?int $bidangId = null, int $limit = 10): array
    {
        $cacheKey = 'popular_kajian_' . ($bidangId ?? 'all') . '_' . $limit;
        
        return Cache::remember($cacheKey, 1800, function() use ($bidangId, $limit) {
            return Kajian::with(['bidang', 'jenisKajian', 'tahun'])
                ->when($bidangId, fn($q) => $q->where('bidang_id', $bidangId))
                ->where('status', 'published')
                ->orderBy('download_count', 'desc')
                ->orderBy('view_count', 'desc')
                ->limit($limit)
                ->get()
                ->toArray();
        });
    }

    /**
     * Get recent publications
     */
    public function getRecentKajian(?int $bidangId = null, int $limit = 10): array
    {
        $cacheKey = 'recent_kajian_' . ($bidangId ?? 'all') . '_' . $limit;
        
        return Cache::remember($cacheKey, 1800, function() use ($bidangId, $limit) {
            return Kajian::with(['bidang', 'jenisKajian', 'tahun'])
                ->when($bidangId, fn($q) => $q->where('bidang_id', $bidangId))
                ->orderBy('created_at', 'desc')
                ->limit($limit)
                ->get()
                ->toArray();
        });
    }
}
