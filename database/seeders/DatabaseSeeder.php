<?php

namespace Database\Seeders;

use App\Models\Tahun;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed default tahuns
        for ($year = 2020; $year <= 2026; $year++) {
            Tahun::firstOrCreate(['tahun' => $year]);
        }

        // Call other seeders
        $this->call([
            SikerjaDataImporterSeeder::class,
            RolesSeeder::class,
            PermissionsSeeder::class,
            RolePermissionsSeeder::class,
            MenuSeeder::class,
            BidangSeeder::class,
            JenisKajianSeeder::class,
            AssignRequestedSSORolesSeeder::class,
            AdminUserSeeder::class,
            DummyDataSeeder::class,
        ]);
    }
}
