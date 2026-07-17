<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SikerjaDataImporterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();

        $this->command->info("Syncing only the requested SSO users from database 'sikerja'...");

        // Truncate users table first
        DB::table('users')->truncate();

        try {
            // Get columns in kajian table (target)
            $targetColumns = Schema::getColumnListing('users');

            // Get columns in sikerja table (source)
            $sourceColumns = collect(DB::select("SHOW COLUMNS FROM sikerja.users"))->pluck('Field')->toArray();

            // Find intersection of columns
            $commonColumns = array_intersect($targetColumns, $sourceColumns);

            $columnsStr = implode('`, `', $commonColumns);
            $columnsStr = '`' . $columnsStr . '`';

            // Select only the requested SSO users
            $query = "INSERT INTO users ({$columnsStr}) 
                      SELECT {$columnsStr} FROM sikerja.users 
                      WHERE email IN ('arifdwi286@gmail.com', 'arifdwi@samarindakota.go.id', '199703262025211007') 
                      OR uid IN ('199703262025211007')";

            DB::statement($query);
            
            $this->command->info("Successfully copied requested SSO users!");
        } catch (\Exception $e) {
            $this->command->error("Failed to copy SSO users: " . $e->getMessage());
        }

        Schema::enableForeignKeyConstraints();
    }
}
