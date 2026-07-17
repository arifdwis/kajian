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
    public function search(string $query, ?int $tahunId = null, ?int $bidangId = null, ?int $jenisId = null, ?string $status = 'published'): Builder
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

        if (!empty($query)) {
            $driver = DB::connection()->getDriverName();

            if ($driver === 'sqlite') {
                // SQLite fallback
                $builder->where(function ($q) use ($query) {
                    $q->where('judul', 'like', "%{$query}%")
                      ->orWhere('ringkasan', 'like', "%{$query}%")
                      ->orWhere('temuan', 'like', "%{$query}%")
                      ->orWhere('rekomendasi', 'like', "%{$query}%");
                });
            } else {
                // MySQL Fulltext search
                $builder->whereRaw(
                    "MATCH(judul, ringkasan, temuan, rekomendasi) AGAINST(? IN NATURAL LANGUAGE MODE)",
                    [$query]
                );
            }
        }

        return $builder;
    }
}
