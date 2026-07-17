<?php

namespace App\Http\Controllers;

use App\Models\Kajian;
use App\Models\Bidang;
use App\Models\JenisKajian;
use App\Models\Tahun;
use App\Services\StatisticsService;
use Illuminate\Http\Request;
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

        if ($user->hasRole('operator')) {
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

        $summary = $this->statsService->getSummaryStats($user->hasRole('operator') ? $user->id_opd : null);

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
        $bidangId = $user->hasRole('operator') ? $user->id_opd : null;

        $summary = $this->statsService->getSummaryStats($bidangId);
        $charts = $this->statsService->getChartsData($bidangId);

        return Inertia::render('Backend/Laporan/Statistik', [
            'summary' => $summary,
            'charts' => $charts,
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
