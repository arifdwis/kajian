<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;

class CreateMissingRolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            ['name' => 'Super Admin', 'slug' => 'superadmin'],
            ['name' => 'Admin Bapperida', 'slug' => 'admin'],
            ['name' => 'Pengguna', 'slug' => 'pengguna'],
            ['name' => 'Pengguna', 'slug' => 'pengguna'],
        ];

        foreach ($roles as $r) {
            Role::firstOrCreate(['slug' => $r['slug']], $r);
            $this->command->info("Role ensured: {$r['slug']}");
        }

        // Re-run the SSO assignment to ensure it binds successfully to the newly created roles!
        $this->call(AssignRequestedSSORolesSeeder::class);
    }
}
