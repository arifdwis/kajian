<?php

namespace App\Http\Controllers;

use App\Services\StatisticsService;
use App\Models\Bidang;
use App\Models\JenisKajian;
use App\Models\Tahun;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PortalController extends Controller
{
    protected $statsService;

    public function __construct(StatisticsService $statsService)
    {
        $this->statsService = $statsService;
    }

    /**
     * Public Beranda (Landing Page)
     */
    public function index()
    {
        $stats = $this->statsService->getSummaryStats();
        $recent = $this->statsService->getRecentKajian(null, 6);
        $popular = $this->statsService->getPopularKajian(null, 5);

        return Inertia::render('Frontend/Portal/Home', [
            'summary' => $stats,
            'recentKajians' => $recent,
            'popularKajians' => $popular,
            'bidangs' => Bidang::orderBy('nama')->get(),
            'jenisKajians' => JenisKajian::orderBy('nama')->get(),
            'tahuns' => Tahun::orderBy('tahun', 'desc')->get(),
        ]);
    }
}
