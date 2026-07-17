<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            ['name' => 'Super Admin', 'slug' => 'superadmin'],
            ['name' => 'Admin Bapperida', 'slug' => 'admin'],
            ['name' => 'Operator Bidang', 'slug' => 'operator'],
            ['name' => 'Pengguna', 'slug' => 'pengguna'],
        ];

        foreach ($roles as $role) {
            Role::firstOrCreate(['slug' => $role['slug']], $role);
        }
    }
}
