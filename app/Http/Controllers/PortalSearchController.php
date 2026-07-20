<?php

namespace App\Http\Controllers;

use App\Services\KajianSearchService;
use App\Models\Bidang;
use App\Models\JenisKajian;
use App\Models\Tahun;
use App\Models\Keyword;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PortalSearchController extends Controller
{
    protected $searchService;

    public function __construct(KajianSearchService $searchService)
    {
        $this->searchService = $searchService;
    }

    /**
     * Advanced Full-text search and filters
     */
    public function search(Request $request)
    {
        $query = (string) ($request->input('q') ?? '');
        $tahunId = $request->input('tahun_id') ? (int) $request->tahun_id : null;
        $bidangId = $request->input('bidang_id') ? (int) $request->bidang_id : null;
        $jenisId = $request->input('jenis_id') ? (int) $request->jenis_id : null;

        $builder = $this->searchService->search($query, $tahunId, $bidangId, $jenisId, 'published');
        
        $results = $builder->with(['bidang', 'jenisKajian', 'tahun', 'keywords', 'files'])
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Frontend/Portal/Search', [
            'results' => $results,
            'filters' => $request->all(),
            'bidangs' => Bidang::orderBy('nama')->get(),
            'jenisKajians' => JenisKajian::orderBy('nama')->get(),
            'tahuns' => Tahun::orderBy('tahun', 'desc')->get(),
        ]);
    }
}
