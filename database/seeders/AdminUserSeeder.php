<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create superadmin
        $superadmin = User::firstOrCreate(['email' => 'superadmin@mail.com'], [
            'uid' => (string) Str::uuid(),
            'name' => 'Super Administrator',
            'email' => 'superadmin@mail.com',
            'password' => Hash::make('password'),
        ]);

        $superadmin->assignRole('superadmin');

        // Create admin Bapperida
        $admin = User::firstOrCreate(['email' => 'admin@mail.com'], [
            'uid' => (string) Str::uuid(),
            'name' => 'Admin Bapperida',
            'email' => 'admin@mail.com',
            'password' => Hash::make('password'),
        ]);

        $admin->assignRole('admin');

        // Create operators for each Bidang
        $operatorNames = [
            'Operator Pemerintahan' => 1,
            'Operator Ekonomi' => 2,
            'Operator Perencanaan' => 3,
            'Operator Riset' => 4,
        ];

        foreach ($operatorNames as $name => $bidangId) {
            $slug = Str::slug($name);
            $op = User::firstOrCreate(['email' => "{$slug}@mail.com"], [
                'uid' => (string) Str::uuid(),
                'name' => $name,
                'email' => "{$slug}@mail.com",
                'password' => Hash::make('password'),
                'id_opd' => $bidangId, // Bind operator to bidang ID
            ]);

            $op->assignRole('pengguna');
        }

        // Create a Pengguna user
        $pengguna = User::firstOrCreate(['email' => 'asn@mail.com'], [
            'uid' => (string) Str::uuid(),
            'name' => 'ASN Pemkot Samarinda',
            'email' => 'asn@mail.com',
            'password' => Hash::make('password'),
        ]);

        $pengguna->assignRole('pengguna');

        // Seed requested SSO users
        // 1. Superadmin SSO: arifdwi286@gmail.com
        $ssoSuperadmin = User::firstOrCreate(['email' => 'arifdwi286@gmail.com'], [
            'uid' => (string) Str::uuid(),
            'name' => 'Arif Dwi (Super Admin SSO)',
            'email' => 'arifdwi286@gmail.com',
            'password' => Hash::make(Str::random(16)),
        ]);
        $ssoSuperadmin->assignRole('superadmin');

        // 2. Admin Bapperida SSO: arifdwi@samarindakota.go.id
        $ssoAdmin = User::firstOrCreate(['email' => 'arifdwi@samarindakota.go.id'], [
            'uid' => (string) Str::uuid(),
            'name' => 'Arif Dwi (Admin Bapperida SSO)',
            'email' => 'arifdwi@samarindakota.go.id',
            'password' => Hash::make(Str::random(16)),
        ]);
        $ssoAdmin->assignRole('admin');

        // 3. Pengguna SSO: NIP 199703262025211007
        $ssoPengguna = User::firstOrCreate(['uid' => '199703262025211007'], [
            'uid' => '199703262025211007',
            'name' => 'ASN SSO (199703262025211007)',
            'email' => '199703262025211007@samarindakota.go.id',
            'password' => Hash::make(Str::random(16)),
        ]);
        $ssoPengguna->assignRole('pengguna');
    }
}
