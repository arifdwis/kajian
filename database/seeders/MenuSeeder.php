<?php

namespace Database\Seeders;

use App\Models\Menu;
use Illuminate\Database\Seeder;

class MenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Menu::truncate();

        // 1. Dashboard
        Menu::create([
            'title' => 'Dashboard',
            'route' => 'dashboard',
            'icon' => 'solar:home-smile-bold-duotone',
            'is_active' => true,
            'order' => 1,
            'roles' => 'superadmin,admin,pengguna',
        ]);

        // 2. Kelola Kajian
        Menu::create([
            'title' => 'Kelola Kajian',
            'route' => 'kajian.index',
            'icon' => 'solar:document-text-bold-duotone',
            'permission_name' => 'kajian.index',
            'is_active' => true,
            'order' => 2,
            'roles' => 'superadmin,admin,pengguna',
        ]);

        // 3. Master Data
        $master = Menu::create([
            'title' => 'Master Data',
            'icon' => 'solar:database-bold-duotone',
            'is_active' => true,
            'order' => 3,
            'roles' => 'superadmin,admin',
        ]);

        Menu::create([
            'parent_id' => $master->id,
            'title' => 'Bidang Kajian',
            'route' => 'master.bidang.index',
            'permission_name' => 'master.bidang.index',
            'is_active' => true,
            'order' => 1,
            'roles' => 'superadmin,admin',
        ]);

        Menu::create([
            'parent_id' => $master->id,
            'title' => 'Jenis Kajian',
            'route' => 'master.jenis-kajian.index',
            'permission_name' => 'master.jenis_kajian.index',
            'is_active' => true,
            'order' => 2,
            'roles' => 'superadmin,admin',
        ]);

        Menu::create([
            'parent_id' => $master->id,
            'title' => 'Tahun Referensi',
            'route' => 'master.tahun.index',
            'permission_name' => 'master.tahun.index',
            'is_active' => true,
            'order' => 3,
            'roles' => 'superadmin,admin',
        ]);

        Menu::create([
            'parent_id' => $master->id,
            'title' => 'Kata Kunci',
            'route' => 'master.kata-kunci.index',
            'permission_name' => 'master.kata_kunci.index',
            'is_active' => true,
            'order' => 4,
            'roles' => 'superadmin,admin',
        ]);

        // 4. Laporan
        $laporan = Menu::create([
            'title' => 'Laporan & Analisis',
            'icon' => 'solar:chart-square-bold-duotone',
            'permission_name' => 'laporan.index',
            'is_active' => true,
            'order' => 4,
            'roles' => 'superadmin,admin,operator',
        ]);

        Menu::create([
            'parent_id' => $laporan->id,
            'title' => 'Ringkasan Laporan',
            'route' => 'laporan.index',
            'permission_name' => 'laporan.index',
            'is_active' => true,
            'order' => 1,
            'roles' => 'superadmin,admin,operator',
        ]);

        Menu::create([
            'parent_id' => $laporan->id,
            'title' => 'Grafik Statistik',
            'route' => 'laporan.statistik',
            'permission_name' => 'laporan.statistik',
            'is_active' => true,
            'order' => 2,
            'roles' => 'superadmin,admin,operator',
        ]);

        // 5. Settings
        $settings = Menu::create([
            'title' => 'Pengaturan',
            'icon' => 'solar:settings-bold-duotone',
            'is_active' => true,
            'order' => 5,
            'roles' => 'superadmin,admin',
        ]);

        Menu::create([
            'parent_id' => $settings->id,
            'title' => 'Manajemen User',
            'route' => 'settings.users.index',
            'permission_name' => 'settings.users.index',
            'is_active' => true,
            'order' => 1,
            'roles' => 'superadmin,admin',
        ]);

        Menu::create([
            'parent_id' => $settings->id,
            'title' => 'Manajemen Role',
            'route' => 'settings.roles.index',
            'permission_name' => 'settings.roles.index',
            'is_active' => true,
            'order' => 2,
            'roles' => 'superadmin,admin',
        ]);

        Menu::create([
            'parent_id' => $settings->id,
            'title' => 'Manajemen Permission',
            'route' => 'settings.permissions.index',
            'permission_name' => 'settings.permissions.index',
            'is_active' => true,
            'order' => 3,
            'roles' => 'superadmin',
        ]);

        Menu::create([
            'parent_id' => $settings->id,
            'title' => 'Manajemen Menu',
            'route' => 'settings.menu.index',
            'permission_name' => 'settings.menu.index',
            'is_active' => true,
            'order' => 4,
            'roles' => 'superadmin,admin',
        ]);

        Menu::create([
            'parent_id' => $settings->id,
            'title' => 'Log Aktivitas',
            'route' => 'settings.log-activity.index',
            'permission_name' => 'settings.log-activity.index',
            'is_active' => true,
            'order' => 5,
            'roles' => 'superadmin,admin',
        ]);
    }
}
