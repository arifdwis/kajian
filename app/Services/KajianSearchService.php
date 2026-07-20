<?php

namespace App\Services;

use App\Models\Kajian;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

class KajianSearchService
{
    /**
     * Search publications using MySQL fulltext or fallback LIKE searches for testing (SQLite)
     */
    public function search(?string $query = '', ?int $tahunId = null, ?int $bidangId = null, ?int $jenisId = null, ?string $status = 'published'): Builder
    {
        $builder = Kajian::query();

        if ($status) {
            $builder->where('status', $status);
        }

        if ($tahunId) {
            $builder->where('tahun_id', $tahunId);
        }

        if ($bidangId) {
            $builder->where('bidang_id', $bidangId);
        }

        if ($jenisId) {
            $builder->where('jenis_id', $jenisId);
        }

        $searchTerm = trim($query ?? '');

        if ($searchTerm !== '') {
            $builder->where(function ($q) use ($searchTerm) {
                $q->where('judul', 'like', "%{$searchTerm}%")
                  ->orWhere('ringkasan', 'like', "%{$searchTerm}%")
                  ->orWhere('temuan', 'like', "%{$searchTerm}%")
                  ->orWhere('rekomendasi', 'like', "%{$searchTerm}%")
                  ->orWhere('penanggung_jawab', 'like', "%{$searchTerm}%")
                  ->orWhereHas('keywords', function ($kq) use ($searchTerm) {
                      $kq->where('nama', 'like', "%{$searchTerm}%");
                  });
            });
        }

        return $builder->orderBy('created_at', 'desc');
    }
}
