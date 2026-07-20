<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\KajianController;
use App\Http\Controllers\NotifikasiController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\LaporanController;
use App\Http\Controllers\ExportController;
use App\Http\Controllers\PortalController;
use App\Http\Controllers\PortalKajianController;
use App\Http\Controllers\PortalSearchController;

// Auth Controllers
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\SSOController;

// Master Controllers
use App\Http\Controllers\Master\BidangController;
use App\Http\Controllers\Master\JenisKajianController;
use App\Http\Controllers\Master\TahunController;
use App\Http\Controllers\Master\KataKunciController;

// Settings Controllers
use App\Http\Controllers\Settings\UserController;
use App\Http\Controllers\Settings\RoleController;
use App\Http\Controllers\Settings\PermissionController;
use App\Http\Controllers\Settings\MenuController;
use App\Http\Controllers\Settings\LogActivityController;

// 🌐 PORTAL PUBLIK (Guest/Public Access)
Route::get('/', [PortalController::class, 'index'])->name('home');
Route::get('/kajian', [PortalKajianController::class, 'index'])->name('portal.kajian');
Route::get('/kajian/search', [PortalSearchController::class, 'search'])->name('portal.search');
Route::get('/kajian/{slug}/preview', [PortalKajianController::class, 'preview'])->name('portal.preview')->where('slug', '^(?!create|search$).*$');
Route::post('/kajian/{slug}/download', [PortalKajianController::class, 'download'])->name('portal.download')->where('slug', '^(?!create|search$).*$');
Route::get('/kajian/{slug}', [PortalKajianController::class, 'show'])->name('portal.detail')->where('slug', '^(?!create|search$).*$');

// 🔐 GUEST AUTHENTICATION
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('/login', [AuthenticatedSessionController::class, 'store']);

    Route::get('/register', [RegisteredUserController::class, 'create'])->name('register');
    Route::post('/register', [RegisteredUserController::class, 'store']);

    Route::get('/forgot-password', [PasswordResetLinkController::class, 'create'])->name('password.request');
    Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])->name('password.email');

    Route::get('/reset-password/{token}', [NewPasswordController::class, 'create'])->name('password.reset');
    Route::post('/reset-password', [NewPasswordController::class, 'store'])->name('password.store');

    // SSO Samarinda Integration
    Route::get('/oauth/sso/authorize', [SSOController::class, 'login'])->name('sso.login');
    Route::get('/oauth/sso/callback', [SSOController::class, 'callback'])->name('sso.callback');
});

// 🏠 AUTHENTICATED SYSTEM ROUTES
Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
    Route::get('/oauth/sso/logout', [SSOController::class, 'logout'])->name('sso.logout');

    // Menu Utama
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::put('/profile/password', [ProfileController::class, 'changePassword'])->name('profile.password');

    // Notifikasi
    Route::get('/notifikasi', [NotifikasiController::class, 'index'])->name('notifikasi.index');
    Route::post('/notifikasi/{uuid}/read', [NotifikasiController::class, 'markAsRead'])->name('notifikasi.read');
    Route::post('/notifikasi/read-all', [NotifikasiController::class, 'markAllAsRead'])->name('notifikasi.read-all');

    // Kajian (CRUD + Workflow)
    Route::resource('manage/kajian', KajianController::class, ['names' => 'kajian']);
    Route::post('/manage/kajian/{uuid}/publish', [KajianController::class, 'publish'])->name('kajian.publish');
    Route::post('/manage/kajian/{uuid}/archive', [KajianController::class, 'archive'])->name('kajian.archive');
    Route::post('/manage/kajian/{uuid}/draft', [KajianController::class, 'toDraft'])->name('kajian.draft');
    
    // Inline Files/Gallery Actions
    Route::post('/manage/kajian/{uuid}/upload-file', [KajianController::class, 'uploadFile'])->name('kajian.upload-file');
    Route::delete('/manage/kajian/{uuid}/file/{fileId}', [KajianController::class, 'deleteFile'])->name('kajian.delete-file');
    Route::post('/manage/kajian/{uuid}/upload-gallery', [KajianController::class, 'uploadGallery'])->name('kajian.upload-gallery');

    // Master Data
    Route::prefix('master')->name('master.')->group(function () {
        Route::resource('bidang', BidangController::class);
        Route::resource('jenis-kajian', JenisKajianController::class);
        Route::resource('tahun', TahunController::class);
        Route::resource('kata-kunci', KataKunciController::class);
    });

    // Laporan
    Route::prefix('laporan')->name('laporan.')->group(function () {
        Route::get('/', [LaporanController::class, 'index'])->name('index');
        Route::get('/statistik', [LaporanController::class, 'statistik'])->name('statistik');
        Route::get('/cetak-detail/{uuid}', [LaporanController::class, 'cetakDetail'])->name('cetak-detail');
        Route::get('/export/excel', [ExportController::class, 'excel'])->name('export.excel');
    });

    // Settings (Admin & Super Admin)
    Route::prefix('settings')->name('settings.')->group(function () {
        Route::resource('users', UserController::class);
        Route::resource('roles', RoleController::class);
        Route::resource('permissions', PermissionController::class);
        Route::resource('menu', MenuController::class);
        Route::resource('log-activity', LogActivityController::class)->only(['index', 'show', 'destroy']);
        
        // Custom Role-Permission adjustments
        Route::get('roles/{role}/permission', [RoleController::class, 'permission'])->name('roles.permission');
        Route::put('roles/{role}/permission', [RoleController::class, 'updatePermission'])->name('roles.permission.update');
        Route::get('roles/{role}/users', [RoleController::class, 'users'])->name('roles.users');
        Route::post('menu/reorder', [MenuController::class, 'reorder'])->name('menu.reorder');
    });
});
