<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
use Illuminate\Database\Seeder;

class AssignRequestedSSORolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. superadmin sso: arifdwi286@gmail.com
        $superadmin = User::where('email', 'arifdwi286@gmail.com')->first();
        if ($superadmin) {
            $superadmin->roles()->detach();
            $superadmin->assignRole('superadmin');
            $this->command->info("Assigned 'superadmin' role to arifdwi286@gmail.com");
        } else {
            $this->command->error("User arifdwi286@gmail.com not found!");
        }

        // 2. Admin Bapperida sso: arifdwi@samarindakota.go.id
        $admin = User::where('email', 'arifdwi@samarindakota.go.id')->first();
        if ($admin) {
            $admin->roles()->detach();
            $admin->assignRole('admin');
            $this->command->info("Assigned 'admin' role to arifdwi@samarindakota.go.id");
        } else {
            $this->command->error("User arifdwi@samarindakota.go.id not found!");
        }

        // 3. pengguna sso: 199703262025211007
        $pengguna = User::where('email', '199703262025211007')
            ->orWhere('uid', '199703262025211007')
            ->first();
        if ($pengguna) {
            $pengguna->roles()->detach();
            $pengguna->assignRole('pengguna');
            $this->command->info("Assigned 'pengguna' role to user 199703262025211007");
        } else {
            $this->command->error("User 199703262025211007 not found!");
        }
    }
}
