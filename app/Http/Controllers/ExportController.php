<?php

namespace App\Http\Controllers;

use App\Models\Kajian;
use App\Services\ExportService;
use Illuminate\Http\Request;

class ExportController extends Controller
{
    protected $exportService;

    public function __construct(ExportService $exportService)
    {
        $this->exportService = $exportService;
    }

    /**
     * Export data to Excel-compatible CSV format
     */
    public function excel(Request $request)
    {
        $user = $request->user();
        
        $query = Kajian::with(['bidang', 'jenisKajian', 'tahun'])
            ->where('status', 'published');

        if ($user->hasRole('pengguna')) {
            $query->where('bidang_id', $user->id_opd);
        }

        // Apply filters
        if ($request->has('bidang_id') && $request->bidang_id) {
            $query->where('bidang_id', $request->bidang_id);
        }

        if ($request->has('jenis_id') && $request->jenis_id) {
            $query->where('jenis_id', $request->jenis_id);
        }

        if ($request->has('tahun_id') && $request->tahun_id) {
            $query->where('tahun_id', $request->tahun_id);
        }

        $kajians = $query->orderBy('created_at', 'desc')->get();

        return $this->exportService->exportToCsv($kajians);
    }
}
