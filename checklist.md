# Struktur Modul SIKAJIAN

> Dokumentasi lengkap Backend (Laravel) dan Frontend (Vue.js/Inertia)
> Sistem Informasi Kajian dan Riset Bapperida Kota Samarinda

---

## BACKEND (Laravel)

### Controllers

```
app/Http/Controllers/
│
├── Controller.php                          # Base controller
│
├── 🏠 MENU UTAMA
│   ├── DashboardController.php             # Dashboard (per role)
│   ├── KajianController.php                # Manajemen Kajian (CRUD + Workflow)
│   ├── NotifikasiController.php            # Notifikasi
│   └── ProfileController.php               # Profile User
│
├── 🌐 PORTAL PUBLIK
│   ├── PortalController.php                # Beranda publik
│   ├── PortalKajianController.php          # Daftar & Detail Kajian publik
│   └── PortalSearchController.php          # Pencarian & Filter publik
│
├── 📦 Master/                              # MASTER DATA
│   ├── BidangController.php                # Bidang Kajian
│   ├── JenisKajianController.php           # Jenis Kajian
│   ├── TahunController.php                 # Tahun
│   └── KataKunciController.php             # Kata Kunci
│
├── 📊 Laporan/                             # LAPORAN
│   ├── LaporanController.php               # Laporan & Statistik
│   └── ExportController.php                # Export PDF/Excel
│
├── ⚙️ Settings/                            # PENGATURAN (Admin Only)
│   ├── UserController.php                  # Manajemen User
│   ├── RoleController.php                  # Manajemen Role
│   ├── PermissionController.php            # Manajemen Permission
│   ├── MenuController.php                  # Manajemen Menu Sidebar
│   └── LogActivityController.php           # Log Aktivitas
│
└── 🔐 Auth/                                # AUTHENTICATION
    ├── AuthenticatedSessionController.php  # Login/Logout
    ├── RegisteredUserController.php        # Register
    ├── PasswordResetLinkController.php     # Forgot Password
    ├── NewPasswordController.php           # Reset Password
    ├── SSOController.php                   # SSO Samarinda
    └── ChangePasswordController.php        # Change Password
```

### Models

```
app/Models/
│
├── 👤 USER & AUTH
│   ├── User.php                            # Model User
│   ├── Role.php                            # Model Role
│   └── Permission.php                      # Model Permission
│
├── 📋 KAJIAN
│   ├── Kajian.php                          # Model Kajian
│   ├── KajianFile.php                      # File Lampiran (PDF, Presentasi, Cover)
│   ├── KajianGallery.php                   # Gallery Foto
│   └── KajianVersion.php                   # Versioning Kajian
│
├── 📦 MASTER DATA
│   ├── Bidang.php                          # Bidang Kajian
│   ├── JenisKajian.php                     # Jenis Kajian
│   ├── Tahun.php                           # Tahun
│   ├── Keyword.php                         # Kata Kunci
│   └── KajianKeyword.php                   # Pivot Kajian-Kata Kunci
│
├── 📊 LOG & ANALYTICS
│   ├── AuditLog.php                        # Audit Log
│   ├── DownloadLog.php                     # Log Download
│   └── ViewLog.php                         # Log View
│
└── 🔧 SYSTEM
    ├── Menu.php                            # Menu Sidebar
    └── Notifikasi.php                      # Notifikasi
```

### Services

```
app/Services/
│
├── KajianService.php                       # Business logic kajian
├── KajianSearchService.php                 # Full-text search logic
├── NotificationTemplate.php                # Template notifikasi
├── NotificationService.php                 # Kirim notifikasi (in-app + WA)
├── StatisticsService.php                   # Dashboard statistics
└── ExportService.php                       # Export PDF/Excel
```

### Observers

```
app/Observers/
│
├── KajianObserver.php                      # Auto slug, audit, notifikasi
└── UserObserver.php                        # Audit log user actions
```

### Form Requests

```
app/Http/Requests/
│
├── Kajian/
│   ├── StoreKajianRequest.php              # Validasi create kajian
│   └── UpdateKajianRequest.php             # Validasi update kajian
│
├── Master/
│   ├── StoreBidangRequest.php
│   ├── UpdateBidangRequest.php
│   ├── StoreJenisKajianRequest.php
│   ├── UpdateJenisKajianRequest.php
│   └── StoreKataKunciRequest.php
│
└── Settings/
    ├── StoreUserRequest.php
    └── UpdateUserRequest.php
```

### Policies

```
app/Policies/
│
├── KajianPolicy.php                        # Authorization kajian
└── UserPolicy.php                          # Authorization user management
```

### Routes (web.php)

```php
// 🌐 PORTAL PUBLIK (Guest)
Route::get('/', PortalController::class . '@index');
Route::get('/kajian', PortalKajianController::class . '@index');
Route::get('/kajian/{slug}', PortalKajianController::class . '@show');
Route::get('/kajian/search', PortalSearchController::class . '@search');
Route::post('/kajian/{slug}/download', PortalKajianController::class . '@download');

// 🔐 AUTH
Route::middleware('guest')->group(function () {
    Route::get('/login', ...);
    Route::post('/login', ...);
    Route::get('/oauth/sso/authorize', SSOController::class . '@authorize');
    Route::get('/oauth/sso/callback', SSOController::class . '@callback');
});

// 🏠 AUTHENTICATED ROUTES
Route::middleware(['auth'])->group(function () {

    // Menu Utama
    Route::get('/dashboard', DashboardController::class . '@index');
    Route::get('/profile', ProfileController::class . '@edit');
    Route::get('/notifikasi', NotifikasiController::class . '@index');

    // Kajian (CRUD + Workflow)
    Route::resource('kajian', KajianController::class);
    Route::post('/kajian/{uuid}/publish', KajianController::class . '@publish');
    Route::post('/kajian/{uuid}/archive', KajianController::class . '@archive');
    Route::post('/kajian/{uuid}/draft', KajianController::class . '@toDraft');
    Route::post('/kajian/{uuid}/upload-file', KajianController::class . '@uploadFile');
    Route::delete('/kajian/{uuid}/file/{fileId}', KajianController::class . '@deleteFile');
    Route::post('/kajian/{uuid}/upload-gallery', KajianController::class . '@uploadGallery');

    // Master Data
    Route::prefix('master')->group(function () {
        Route::resource('bidang', Master\BidangController::class);
        Route::resource('jenis-kajian', Master\JenisKajianController::class);
        Route::resource('tahun', Master\TahunController::class);
        Route::resource('kata-kunci', Master\KataKunciController::class);
    });

    // Laporan
    Route::prefix('laporan')->group(function () {
        Route::get('/', LaporanController::class . '@index');
        Route::get('/statistik', LaporanController::class . '@statistik');
        Route::get('/export/pdf', ExportController::class . '@pdf');
        Route::get('/export/excel', ExportController::class . '@excel');
    });

    // Settings (Admin Only)
    Route::prefix('settings')->group(function () {
        Route::resource('users', Settings\UserController::class);
        Route::resource('roles', Settings\RoleController::class);
        Route::resource('permissions', Settings\PermissionController::class);
        Route::resource('menu', Settings\MenuController::class);
        Route::resource('log-activity', Settings\LogActivityController::class);
    });
});
```

---

## FRONTEND (Vue.js + Inertia)

### Pages (Views)

```
resources/js/Pages/
│
├── 🏠 MENU UTAMA
│   ├── Dashboard.vue                       # Dashboard Admin Bapperida
│   ├── DashboardOperator.vue               # Dashboard Operator Bidang
│   ├── DashboardAsn.vue                    # Dashboard ASN
│   └── Welcome.vue                         # Redirect
│
├── 🌐 PORTAL PUBLIK (Frontend)
│   ├── Frontend/
│   │   ├── Portal/
│   │   │   ├── Home.vue                    # Beranda publik
│   │   │   ├── KajianList.vue              # Daftar kajian publik
│   │   │   ├── KajianDetail.vue            # Detail kajian publik
│   │   │   └── Search.vue                  # Pencarian & Filter
│   │   ├── Navbar.vue                      # Navbar publik
│   │   └── Footer.vue                      # Footer publik
│
├── 📋 Kajian/                              # MANAJEMEN KAJIAN
│   ├── Index.vue                           # Daftar Kajian
│   ├── Create.vue                          # Form Buat Kajian
│   ├── Edit.vue                            # Form Edit Kajian
│   └── Show.vue                            # Detail Kajian (internal)
│
├── 📦 Master/                              # MASTER DATA
│   ├── Bidang/
│   │   └── Index.vue                       # CRUD Bidang Kajian
│   ├── JenisKajian/
│   │   └── Index.vue                       # CRUD Jenis Kajian
│   ├── Tahun/
│   │   └── Index.vue                       # CRUD Tahun
│   └── KataKunci/
│       └── Index.vue                       # CRUD Kata Kunci
│
├── 📊 Laporan/                             # LAPORAN
│   ├── Index.vue                           # Daftar Laporan
│   ├── Statistik.vue                       # Halaman Statistik
│   └── CetakDetail.vue                     # Cetak Detail
│
├── ⚙️ Settings/                            # PENGATURAN
│   ├── Users/
│   │   ├── Index.vue
│   │   ├── Create.vue
│   │   └── Edit.vue
│   ├── Roles/
│   │   ├── Index.vue
│   │   └── Permission.vue
│   ├── Permissions/
│   │   ├── Index.vue
│   │   ├── Create.vue
│   │   └── Edit.vue
│   ├── Menus/
│   │   └── Index.vue
│   └── LogActivity/
│       └── Index.vue
│
├── 👤 Profile/                             # PROFILE
│   └── Edit.vue
│
└── 🔐 Auth/                                # AUTHENTICATION
    ├── Login.vue                           # Halaman Login
    ├── Register.vue                        # Halaman Register
    ├── ForgotPassword.vue                  # Lupa Password
    └── ResetPassword.vue                   # Reset Password
```

### Components

```
resources/js/Components/
│
├── 🧩 UI Components
│   ├── Modal.vue                           # Modal dialog
│   ├── PrimaryButton.vue                   # Tombol utama
│   ├── SecondaryButton.vue                 # Tombol sekunder
│   ├── DangerButton.vue                    # Tombol bahaya
│   ├── TextInput.vue                       # Input text
│   ├── InputError.vue                      # Error message
│   ├── InputLabel.vue                      # Label input
│   ├── Checkbox.vue                        # Checkbox
│   ├── Dropdown.vue                        # Dropdown menu
│   ├── Breadcrumb.vue                      # Breadcrumb navigation
│   ├── Pagination.vue                      # Pagination
│   ├── EmptyState.vue                      # Empty state placeholder
│   ├── SearchSelect.vue                    # Searchable select
│   ├── LoadingSkeleton.vue                 # Loading skeleton
│   └── Toast.vue                           # Toast notification
│
├── 📋 Kajian Components
│   ├── CreateForm.vue                      # Multi-step form kajian
│   ├── KajianCard.vue                      # Card kajian (grid view)
│   ├── KajianListItem.vue                  # List item kajian
│   ├── KajianDetailModal.vue               # Modal detail kajian
│   ├── FileUploadForm.vue                  # Upload file (PDF, Presentasi, Cover)
│   ├── GalleryUpload.vue                   # Upload gallery
│   ├── KajianFilter.vue                    # Filter & Search bar
│   ├── StatusBadge.vue                     # Badge status kajian
│   └── VersionHistory.vue                  # History versi kajian
│
├── 📊 Dashboard Components
│   ├── StatsCard.vue                       # KPI stat card
│   ├── TrendChart.vue                      # Grafik tren kajian per tahun
│   ├── BidangChart.vue                     # Grafik kajian per bidang
│   ├── JenisChart.vue                      # Grafik kajian per jenis
│   ├── DownloadChart.vue                   # Grafik download
│   ├── PopularKajianTable.vue              # Tabel kajian populer
│   └── RecentKajianTable.vue               # Tabel kajian terbaru
│
├── 🌐 Portal Components
│   ├── HeroSection.vue                     # Hero banner beranda
│   ├── KajianTerbaru.vue                   # Widget kajian terbaru
│   ├── KajianPopuler.vue                   # Widget kajian populer
│   ├── SearchBar.vue                       # Search bar publik
│   ├── FilterSidebar.vue                   # Sidebar filter publik
│   └── ShareButton.vue                     # Tombol share
│
└── 📁 Layouts
    ├── AuthenticatedLayout.vue             # Layout user login
    ├── GuestLayout.vue                     # Layout guest (login/register)
    ├── FrontendLayout.vue                  # Layout portal publik
    └── Partials/
        ├── Sidebar.vue                     # Menu sidebar (dynamic from DB)
        ├── Navbar.vue                      # Topbar
        └── Footer.vue                      # Footer
```

### Layouts

```
resources/js/Layouts/
│
├── AuthenticatedLayout.vue                 # Layout untuk user login
│   ├── Sidebar (dynamic, collapsible w-64/w-16)
│   ├── Navbar (fixed h-16, dark mode toggle, user avatar)
│   └── Footer
│
├── GuestLayout.vue                         # Layout untuk guest auth
│   └── Centered card with logo
│
├── FrontendLayout.vue                      # Layout portal publik
│   ├── Navbar (public)
│   └── Footer (public)
│
└── Partials/
    ├── Sidebar.vue                         # Dynamic menu from DB, role-filtered
    ├── Navbar.vue                          # Top bar: logo, toggle, search, dark mode
    └── Footer.vue                          # App footer
```

---

## PERMISSIONS

### Menu Utama
| Permission | Deskripsi | Super Admin | Admin | Operator | ASN | Akademisi | Mahasiswa | Guest |
|------------|-----------|:-----------:|:-----:|:--------:|:---:|:---------:|:---------:|:-----:|
| `dashboard` | Akses Dashboard | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| `kajian.index` | Lihat Daftar Kajian | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| `kajian.create` | Buat Kajian | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| `kajian.show` | Detail Kajian (internal) | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| `kajian.edit` | Edit Kajian | ✅ | ✅ | ✅* | ❌ | ❌ | ❌ | ❌ |
| `kajian.destroy` | Hapus Kajian | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `kajian.publish` | Publish Kajian | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `kajian.archive` | Arsipkan Kajian | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `kajian.upload` | Upload File Kajian | ✅ | ✅ | ✅* | ❌ | ❌ | ❌ | ❌ |

> *Operator hanya bisa edit/upload kajian milik bidangnya sendiri

### Portal Publik
| Permission | Deskripsi | Super Admin | Admin | Operator | ASN | Akademisi | Mahasiswa | Guest |
|------------|-----------|:-----------:|:-----:|:--------:|:---:|:---------:|:---------:|:-----:|
| `portal.index` | Beranda Publik | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `portal.kajian` | Daftar Kajian Publik | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `portal.detail` | Detail Kajian Publik | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `portal.search` | Pencarian | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `portal.download` | Download Dokumen | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

### Master Data
| Permission | Deskripsi | Super Admin | Admin | Operator | ASN | Akademisi | Mahasiswa | Guest |
|------------|-----------|:-----------:|:-----:|:--------:|:---:|:---------:|:---------:|:-----:|
| `master.bidang.index` | Lihat Bidang | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `master.bidang.create` | Buat Bidang | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `master.bidang.edit` | Edit Bidang | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `master.bidang.destroy` | Hapus Bidang | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `master.jenis_kajian.*` | CRUD Jenis Kajian | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `master.tahun.*` | CRUD Tahun | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `master.kata_kunci.*` | CRUD Kata Kunci | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |

### Laporan
| Permission | Deskripsi | Super Admin | Admin | Operator | ASN | Akademisi | Mahasiswa | Guest |
|------------|-----------|:-----------:|:-----:|:--------:|:---:|:---------:|:---------:|:-----:|
| `laporan.index` | Lihat Laporan | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| `laporan.statistik` | Statistik | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| `laporan.export` | Export PDF/Excel | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |

### Settings
| Permission | Deskripsi | Super Admin | Admin | Operator | ASN | Akademisi | Mahasiswa | Guest |
|------------|-----------|:-----------:|:-----:|:--------:|:---:|:---------:|:---------:|:-----:|
| `settings.users.*` | Manajemen User | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `settings.roles.*` | Manajemen Role | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `settings.permissions.*` | Manajemen Permission | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `settings.menu.*` | Manajemen Menu | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `settings.log-activity.*` | Log Aktivitas | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |

---

## NAMING CONVENTION

### Backend (Laravel)
| Tipe | Pattern | Contoh |
|------|---------|--------|
| Controller | `{Module}{Name}Controller.php` | `KajianController.php`, `BidangController.php` |
| Model | `{Name}.php` (Singular) | `Kajian.php`, `Bidang.php` |
| Table | `{names}` (Plural, snake_case) | `kajians`, `bidangs`, `jenis_kajians` |
| Route Name | `{module}.{action}` | `kajian.index`, `master.bidang.create` |
| Permission | `{module}.{action}` | `kajian.publish`, `master.bidang.edit` |
| Form Request | `{Action}{Name}Request.php` | `StoreKajianRequest.php` |
| Policy | `{Name}Policy.php` | `KajianPolicy.php` |
| Observer | `{Name}Observer.php` | `KajianObserver.php` |
| Service | `{Name}Service.php` | `KajianService.php` |

### Frontend (Vue.js)
| Tipe | Pattern | Contoh |
|------|---------|--------|
| Page | `{Module}/{Action}.vue` | `Kajian/Index.vue`, `Settings/Users/Create.vue` |
| Component | `{Name}.vue` (PascalCase) | `KajianCard.vue`, `Modal.vue` |
| Layout | `{Name}Layout.vue` | `AuthenticatedLayout.vue`, `FrontendLayout.vue` |
| Util | `{name}.js` (camelCase) | `status.js`, `eventBus.js` |

---

## WORKFLOW KAJIAN

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  OPERATOR   │    │    ADMIN    │    │    ADMIN    │    │   PUBLIK    │
│   Membuat   │───▶│   Review    │───▶│   Publish   │───▶│   Akses &   │
│   Kajian    │    │   & Validasi│    │             │    │   Download  │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
      │                  │                  │                  │
      ▼                  ▼                  ▼                  ▼
 STATUS: draft       STATUS: review     STATUS: published   View + Download
 (Draft)             (Review)           (Published)         + Share
```

**Status Values:**
- `draft` = Kajian masih dalam penyusunan
- `review` = Menunggu review admin
- `published` = Sudah dipublikasi di portal
- `archived` = Diarsipkan (tidak tampil di portal aktif)

---

## DATABASE TABLES

### Core Tables
| Table | Deskripsi | UUID | Soft Delete |
|-------|-----------|:----:|:-----------:|
| `users` | Data user | ✅ | ✅ |
| `roles` | Data role | ❌ | ❌ |
| `permissions` | Data permission | ❌ | ❌ |
| `role_users` | Pivot role-user | ❌ | ❌ |
| `role_permissions` | Pivot role-permission | ❌ | ❌ |

### Kajian Tables
| Table | Deskripsi | UUID | Soft Delete |
|-------|-----------|:----:|:-----------:|
| `kajians` | Data kajian/riset | ✅ | ✅ |
| `kajian_files` | File lampiran (PDF, presentasi, cover) | ✅ | ✅ |
| `kajian_galleries` | Gallery foto kajian | ✅ | ✅ |
| `kajian_versions` | Versioning kajian | ✅ | ❌ |

### Master Tables
| Table | Deskripsi | UUID | Soft Delete |
|-------|-----------|:----:|:-----------:|
| `bidangs` | Bidang kajian | ❌ | ✅ |
| `jenis_kajians` | Jenis kajian | ❌ | ✅ |
| `tahuns` | Tahun referensi | ❌ | ❌ |
| `keywords` | Kata kunci | ❌ | ✅ |
| `kajian_keywords` | Pivot kajian-kata kunci | ❌ | ❌ |

### Log & Analytics Tables
| Table | Deskripsi | UUID | Soft Delete |
|-------|-----------|:----:|:-----------:|
| `audit_logs` | Audit trail sistem | ✅ | ❌ |
| `download_logs` | Log download dokumen | ✅ | ❌ |
| `view_logs` | Log kunjungan kajian | ✅ | ❌ |

### System Tables
| Table | Deskripsi | UUID | Soft Delete |
|-------|-----------|:----:|:-----------:|
| `menus` | Menu sidebar (dynamic) | ❌ | ✅ |
| `notifikasis` | Notifikasi user | ✅ | ❌ |
| `activity_log` | Log aktivitas (Spatie) | ❌ | ❌ |

---

## CHECKLIST IMPLEMENTASI

### Authentication & Authorization
- [x] AuthenticatedSessionController (login/logout)
- [x] RegisteredUserController (register)
- [x] PasswordResetLinkController (forgot password)
- [x] NewPasswordController (reset password)
- [x] ChangePasswordController (change password)
- [x] SSOController (SSO Samarinda integration)
- [x] SSOAutoLogin middleware
- [x] CheckRole middleware
- [x] Custom RBAC (roles, permissions, role_users, role_permissions)
- [x] Gate definitions di AppServiceProvider
- [x] HandleInertiaRequests (share auth, role, permissions, menu)
- [x] PermissionsSeeder (semua permissions)
- [x] RolePermissionsSeeder (auto-assign ke roles)

### Backend — Kajian (Controllers + Services)
- [x] KajianController (CRUD + publish + archive + draft)
- [x] KajianController::uploadFile (PDF, presentasi, cover)
- [x] KajianController::deleteFile
- [x] KajianController::uploadGallery
- [x] KajianService (business logic)
- [x] KajianSearchService (full-text search)
- [x] StoreKajianRequest (validasi create)
- [x] UpdateKajianRequest (validasi update)
- [x] KajianPolicy (authorization per role)
- [x] KajianObserver (auto slug, audit, notifikasi)

### Backend — Portal Publik
- [x] PortalController (beranda: kajian terbaru, populer, statistik ringkas)
- [x] PortalKajianController (daftar + detail + download)
- [x] PortalSearchController (pencarian + filter)
- [x] ViewLog auto-record saat akses detail
- [x] DownloadLog auto-record saat download
- [x] SEO metadata (title, description, og:image)
- [x] Sitemap XML generator
- [x] Share URL (WhatsApp, Twitter, Facebook, Copy Link)

### Backend — Master Data
- [x] Master/BidangController (CRUD + middleware `can:`)
- [x] Master/JenisKajianController (CRUD + middleware `can:`)
- [x] Master/TahunController (CRUD + middleware `can:`)
- [x] Master/KataKunciController (CRUD + middleware `can:`)

### Backend — Dashboard & Laporan
- [x] DashboardController (admin: total kajian, download, view, per tahun/bidang/jenis)
- [x] DashboardOperator (operator: kajian bidang sendiri)
- [x] DashboardAsn (ASN: kajian terbaru, populer)
- [x] StatisticsService (aggregasi statistik)
- [x] LaporanController (index + statistik)
- [x] ExportController (PDF + Excel)

### Backend — Settings
- [x] Settings/UserController (CRUD + middleware `can:`)
- [x] Settings/RoleController (CRUD + permission management)
- [x] Settings/PermissionController (CRUD)
- [x] Settings/MenuController (CRUD + reorder)
- [x] Settings/LogActivityController (index + show + destroy)

### Backend — Non-Functional
- [x] Queue setup (email, notifikasi, export)
- [x] Cache setup (portal publik, statistik)
- [x] Backup command (database + storage)
- [x] Restore command
- [x] Monitoring endpoint (health check)

### Frontend — Layout & Shell
- [x] AuthenticatedLayout.vue (sidebar + navbar + footer)
- [x] GuestLayout.vue (login/register)
- [x] FrontendLayout.vue (portal publik)
- [x] Partials/Sidebar.vue (dynamic from DB, collapsible, role-filtered)
- [x] Partials/Navbar.vue (logo, toggle, search, dark mode, user avatar)
- [x] Partials/Footer.vue
- [x] Dark mode toggle (localStorage)

### Frontend — Authentication Pages
- [x] Auth/Login.vue (email + password + SSO button)
- [x] Auth/Register.vue
- [x] Auth/ForgotPassword.vue
- [x] Auth/ResetPassword.vue

### Frontend — Dashboard
- [x] Dashboard.vue (admin: KPI stats + charts + tabel)
- [x] DashboardOperator.vue (operator: kajian bidang sendiri)
- [x] DashboardAsn.vue (ASN: kajian terbaru + populer)
- [ ] Components/StatsCard.vue (KPI card)
- [ ] Components/TrendChart.vue (Chart.js line chart)
- [ ] Components/BidangChart.vue (Chart.js bar/doughnut)
- [ ] Components/JenisChart.vue (Chart.js pie/bar)
- [ ] Components/DownloadChart.vue (Chart.js line)
- [ ] Components/PopularKajianTable.vue
- [ ] Components/RecentKajianTable.vue

### Frontend — Kajian
- [x] Kajian/Index.vue (daftar kajian + filter + search + pagination)
- [x] Kajian/Create.vue (multi-step form)
- [x] Kajian/Edit.vue (edit form)
- [x] Kajian/Show.vue (detail internal)
- [ ] Components/CreateForm.vue (wizard: info dasar → detail → file → review)
- [ ] Components/KajianCard.vue (grid view card)
- [ ] Components/KajianListItem.vue (list view)
- [ ] Components/KajianDetailModal.vue (modal detail)
- [ ] Components/FileUploadForm.vue (PDF, presentasi, cover)
- [ ] Components/GalleryUpload.vue
- [ ] Components/KajianFilter.vue (filter bar)
- [ ] Components/StatusBadge.vue (draft/review/published/archived)
- [ ] Components/VersionHistory.vue

### Frontend — Portal Publik
- [x] Frontend/Portal/Home.vue (hero + kajian terbaru + populer + statistik)
- [x] Frontend/Portal/KajianList.vue (daftar + filter + pagination)
- [x] Frontend/Portal/KajianDetail.vue (detail + download + share)
- [x] Frontend/Portal/Search.vue (pencarian + filter advanced)
- [ ] Components/HeroSection.vue
- [ ] Components/KajianTerbaru.vue
- [ ] Components/KajianPopuler.vue
- [ ] Components/SearchBar.vue
- [ ] Components/FilterSidebar.vue
- [ ] Components/ShareButton.vue
- [ ] Frontend/Navbar.vue (publik)
- [ ] Frontend/Footer.vue (publik)

### Frontend — Master Data
- [x] Master/Bidang/Index.vue (CRUD table + modal)
- [x] Master/JenisKajian/Index.vue (CRUD table + modal)
- [x] Master/Tahun/Index.vue (CRUD table + modal)
- [x] Master/KataKunci/Index.vue (CRUD table + modal)

### Frontend — Laporan
- [x] Laporan/Index.vue
- [x] Laporan/Statistik.vue
- [x] Laporan/CetakDetail.vue

### Frontend — Settings
- [x] Settings/Users/Index.vue
- [x] Settings/Users/Create.vue
- [x] Settings/Users/Edit.vue
- [x] Settings/Roles/Index.vue
- [x] Settings/Roles/Permission.vue
- [x] Settings/Permissions/Index.vue
- [x] Settings/Permissions/Create.vue
- [x] Settings/Permissions/Edit.vue
- [x] Settings/Menus/Index.vue
- [x] Settings/LogActivity/Index.vue

### Frontend — Profile & Notifikasi
- [x] Profile/Edit.vue
- [x] Notifikasi (bell icon + dropdown + mark as read)

### Frontend — Shared Components
- [ ] Modal.vue
- [x] PrimaryButton.vue / SecondaryButton.vue / DangerButton.vue
- [x] TextInput.vue / InputError.vue / InputLabel.vue
- [x] Checkbox.vue / Dropdown.vue
- [ ] Breadcrumb.vue
- [x] Pagination.vue
- [ ] EmptyState.vue
- [ ] SearchSelect.vue
- [ ] LoadingSkeleton.vue
- [ ] Toast.vue

### Database & Migrations
- [x] Migration: users (UUID CHAR(36), soft delete)
- [x] Migration: roles
- [x] Migration: permissions
- [x] Migration: role_users
- [x] Migration: role_permissions
- [x] Migration: kajians (UUID CHAR(36), soft delete, FULLTEXT index)
- [x] Migration: kajian_files (UUID CHAR(36), soft delete)
- [x] Migration: kajian_galleries (UUID CHAR(36), soft delete)
- [x] Migration: kajian_versions (UUID CHAR(36))
- [x] Migration: bidangs (soft delete)
- [x] Migration: jenis_kajians (soft delete)
- [x] Migration: tahuns
- [x] Migration: keywords (soft delete)
- [x] Migration: kajian_keywords
- [x] Migration: audit_logs (UUID CHAR(36))
- [x] Migration: download_logs (UUID CHAR(36))
- [x] Migration: view_logs (UUID CHAR(36))
- [x] Migration: menus (soft delete)
- [x] Migration: notifikasis (UUID CHAR(36))
- [x] Seeder: RolesSeeder (5 roles)
- [x] Seeder: PermissionsSeeder (semua permissions)
- [x] Seeder: RolePermissionsSeeder (assign permissions ke roles)
- [x] Seeder: MenuSeeder (default sidebar menus)
- [x] Seeder: BidangSeeder (data bidang Bapperida)
- [x] Seeder: JenisKajianSeeder (data jenis kajian)
- [x] Seeder: AdminUserSeeder (super admin default)

### Role-based Access (Testing)
- [ ] Super Admin — Full access (Gate::before bypass)
- [ ] Admin Bapperida — Kajian CRUD + Publish + Master + Laporan + Settings
- [ ] Operator Bidang — Kajian CRUD (bidang sendiri) + Upload
- [ ] ASN — Dashboard + Lihat kajian internal
- [ ] Akademisi — Portal publik (browse + download)
- [ ] Mahasiswa — Portal publik (browse + download)
- [ ] Guest — Portal publik (browse + download)

---

## CARA MENAMBAH MODUL BARU

### 1. Buat Model
```bash
php artisan make:model NamaModel -m
```

### 2. Buat Controller
```php
// app/Http/Controllers/Master/NamaController.php

class NamaController extends Controller implements HasMiddleware
{
    // Pattern: constructor + share + static middleware
}
```

### 3. Tambah Routes
```php
// routes/admin.php atau routes/web.php
Route::resource('nama', NamaController::class);
```

### 4. Tambah Permissions
```php
// database/seeders/PermissionsSeeder.php
'master.nama.index',
'master.nama.create',
'master.nama.edit',
'master.nama.destroy',
```

### 5. Buat Vue Component
```
resources/js/Pages/Master/Nama/Index.vue
```

### 6. Run Seeder
```bash
php artisan db:seed --class=PermissionsSeeder
php artisan db:seed --class=RolePermissionsSeeder
```

---

## TECH STACK

| Layer | Technology |
|-------|-----------|
| Backend | Laravel (terbaru) |
| PHP | PHP versi terbaru |
| Frontend | Vue.js 3 (Composition API) |
| SPA Bridge | Inertia.js |
| Database | MySQL |
| CSS | Tailwind CSS |
| Build Tool | Vite |
| API | REST API |
| Deployment | VPS Linux + Nginx |
| Font | Figtree (Google Fonts) |
| UI Library | Flowbite Vue + PrimeVue |
| Charts | Chart.js |
| Icons | Iconify (solar:* icon set) |
| Auth | Laravel Breeze + SSO Samarinda |
