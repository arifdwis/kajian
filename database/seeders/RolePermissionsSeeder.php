<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\Permission;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RolePermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('role_permissions')->truncate();

        // 1. Admin Bapperida Permissions
        $adminPermissions = [
            'dashboard',
            'kajian.index',
            'kajian.create',
            'kajian.show',
            'kajian.edit',
            'kajian.destroy',
            'kajian.publish',
            'kajian.archive',
            'kajian.upload',

            'master.bidang.index',
            'master.bidang.create',
            'master.bidang.edit',
            'master.bidang.destroy',
            'master.jenis_kajian.index',
            'master.jenis_kajian.create',
            'master.jenis_kajian.edit',
            'master.jenis_kajian.destroy',
            'master.tahun.index',
            'master.tahun.create',
            'master.tahun.edit',
            'master.tahun.destroy',
            'master.kata_kunci.index',
            'master.kata_kunci.create',
            'master.kata_kunci.edit',
            'master.kata_kunci.destroy',

            'laporan.index',
            'laporan.statistik',
            'laporan.export',

            'settings.users.index',
            'settings.users.create',
            'settings.users.edit',
            'settings.users.destroy',
            'settings.menu.index',
            'settings.log-activity.index',
            'settings.log-activity.show',
            'settings.log-activity.destroy',
        ];

        // 2. Operator Bidang Permissions
        $operatorPermissions = [
            'dashboard',
            'kajian.index',
            'kajian.create',
            'kajian.show',
            'kajian.edit',
            'kajian.upload',
            'laporan.index',
            'laporan.statistik',
        ];

        // 3. Pengguna Permissions
        $penggunaPermissions = [
            'dashboard',
            'kajian.index',
            'kajian.show',
        ];

        // Assign to Admin
        $adminRole = Role::where('slug', 'admin')->first();
        if ($adminRole) {
            foreach ($adminPermissions as $name) {
                $perm = Permission::where('name', $name)->first();
                if ($perm) {
                    $adminRole->permissions()->attach($perm->id);
                }
            }
        }

        // Assign to Operator
        $operatorRole = Role::where('slug', 'operator')->first();
        if ($operatorRole) {
            foreach ($operatorPermissions as $name) {
                $perm = Permission::where('name', $name)->first();
                if ($perm) {
                    $operatorRole->permissions()->attach($perm->id);
                }
            }
        }

        // Assign to Pengguna
        $penggunaRole = Role::where('slug', 'pengguna')->first();
        if ($penggunaRole) {
            foreach ($penggunaPermissions as $name) {
                $perm = Permission::where('name', $name)->first();
                if ($perm) {
                    $penggunaRole->permissions()->attach($perm->id);
                }
            }
        }

        // Assign all to Superadmin
        $superAdminRole = Role::where('slug', 'superadmin')->first();
        if ($superAdminRole) {
            $allPerms = Permission::all();
            foreach ($allPerms as $perm) {
                $superAdminRole->permissions()->attach($perm->id);
            }
        }
    }
}
