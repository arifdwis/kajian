<?php

namespace App\Http\Controllers;

use App\Services\StatisticsService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    protected $statsService;

    public function __construct(StatisticsService $statsService)
    {
        $this->statsService = $statsService;
    }

    public function index(Request $request)
    {
        $user = $request->user();

        // 1. Superadmin & Admin
        if ($user->hasRole(['superadmin', 'admin'])) {
            $summary = $this->statsService->getSummaryStats();
            $charts = $this->statsService->getChartsData();
            $popular = $this->statsService->getPopularKajian(null, 5);
            $recent = $this->statsService->getRecentKajian(null, 5);

            return Inertia::render('Backend/Dashboard', [
                'summary' => $summary,
                'charts' => $charts,
                'popularKajians' => $popular,
                'recentKajians' => $recent,
            ]);
        }

        // 2. Operator Bidang
        if ($user->hasRole('pengguna')) {
            $bidangId = $user->id_opd;
            $summary = $this->statsService->getSummaryStats($bidangId);
            $charts = $this->statsService->getChartsData($bidangId);
            $popular = $this->statsService->getPopularKajian($bidangId, 5);
            $recent = $this->statsService->getRecentKajian($bidangId, 5);

            return Inertia::render('Backend/DashboardOperator', [
                'summary' => $summary,
                'charts' => $charts,
                'popularKajians' => $popular,
                'recentKajians' => $recent,
            ]);
        }

        // 3. Pengguna (ASN, Akademisi, Mahasiswa)
        if ($user->hasRole('pengguna')) {
            $recent = $this->statsService->getRecentKajian(null, 8);
            $popular = $this->statsService->getPopularKajian(null, 5);

            return Inertia::render('Backend/DashboardAsn', [
                'recentKajians' => $recent,
                'popularKajians' => $popular,
            ]);
        }

        // Fallback or guest
        return redirect('/');
    }
}
