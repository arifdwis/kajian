<?php

namespace Database\Seeders;

use App\Models\JenisKajian;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class JenisKajianSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $jenis = [
            'Kajian Kebijakan',
            'Penelitian Ilmiah',
            'Evaluasi Program',
            'Policy Brief',
            'Riset Sosial',
        ];

        foreach ($jenis as $nama) {
            JenisKajian::firstOrCreate(['slug' => Str::slug($nama)], [
                'nama' => $nama,
                'slug' => Str::slug($nama),
            ]);
        }
    }
}
