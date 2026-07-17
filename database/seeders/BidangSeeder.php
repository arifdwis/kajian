<?php

namespace Database\Seeders;

use App\Models\Bidang;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class BidangSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $bidangs = [
            'Bidang Pemerintahan dan Pembangunan Manusia',
            'Bidang Perekonomian, Sumber Daya Alam dan Infrastruktur',
            'Bidang Perencanaan, Pengendalian dan Evaluasi Pembangunan Daerah',
            'Bidang Penelitian dan Pengembangan',
        ];

        foreach ($bidangs as $nama) {
            Bidang::firstOrCreate(['slug' => Str::slug($nama)], [
                'nama' => $nama,
                'slug' => Str::slug($nama),
            ]);
        }
    }
}
