<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            // Menu Utama
            'dashboard',
            'kajian.index',
            'kajian.create',
            'kajian.show',
            'kajian.edit',
            'kajian.destroy',
            'kajian.publish',
            'kajian.archive',
            'kajian.upload',

            // Master Data
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

            // Laporan
            'laporan.index',
            'laporan.statistik',
            'laporan.export',

            // Settings
            'settings.users.index',
            'settings.users.create',
            'settings.users.edit',
            'settings.users.destroy',
            'settings.roles.index',
            'settings.roles.create',
            'settings.roles.edit',
            'settings.roles.destroy',
            'settings.roles.permission',
            'settings.roles.permission.update',
            'settings.permissions.index',
            'settings.permissions.create',
            'settings.permissions.edit',
            'settings.permissions.destroy',
            'settings.menu.index',
            'settings.log-activity.index',
            'settings.log-activity.show',
            'settings.log-activity.destroy',
        ];

        foreach ($permissions as $perm) {
            Permission::firstOrCreate(['slug' => Str::slug($perm)], [
                'name' => $perm,
                'slug' => Str::slug($perm),
            ]);
        }
    }
}
