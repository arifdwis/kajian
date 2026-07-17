# SIKAJIAN — Task Plan & Roadmap

> **Sistem Informasi Kajian dan Riset Bapperida Kota Samarinda**
> Phase + Sprint breakdown mengikuti roadmap PRD.

---

## RINGKASAN FASE

| Phase | Nama | Sprint | Fokus Utama | Total Estimasi |
|-------|------|--------|-------------|----------------|
| 1 | MVP | Sprint 1–4 | Auth, Master Data, CRUD Kajian, Portal Publik | ~145 jam |
| 2 | Enhancement | Sprint 5–7 | Dashboard Statistik, SEO, Notifikasi, Audit Log | ~75 jam |
| 3 | Advanced | Sprint 8–9 | Versioning, Gallery, Analytics, Dark Mode | ~45 jam |
| 4 | Production | Sprint 10–11 | Caching, Queue, Backup, Testing, Deployment | ~45 jam |
| | | | **Grand Total** | **~310 jam** |

---

## PHASE 1 — MVP (Minimum Viable Product)

> **Target**: Aplikasi bisa digunakan end-to-end. Login, kelola kajian, publish, dan publik bisa akses + download.

---

### Sprint 1 — Setup Project, Authentication & Authorization

**Durasi**: 5 hari kerja | **Estimasi**: ~40 jam

| # | Task | Deskripsi | Estimasi | Dependensi |
|---|------|-----------|----------|------------|
| 1.1 | Setup Laravel Project | `composer create-project laravel/laravel sikajian`, konfigurasi `.env`, MySQL connection, Vite + Vue 3 + Inertia.js + Tailwind CSS | 3 jam | — |
| 1.2 | Install Dependencies | Flowbite Vue, PrimeVue, Chart.js, Iconify, `novay/sso-client`, Spatie Activity Log | 1 jam | 1.1 |
| 1.3 | Tailwind Config | Font Figtree, dark mode class, plugins (forms, flowbite, primeui) — ikuti `tailwind.config.js` sikerja-v2 | 30 menit | 1.1 |
| 1.4 | Database Schema — Core | Migration: `users` (UUID CHAR(36), soft delete), `roles`, `permissions`, `role_users`, `role_permissions` | 3 jam | 1.1 |
| 1.5 | Models — Core | `User.php` (UUID auto-generate, soft delete, `hasRole()`, `hasPermission()`), `Role.php`, `Permission.php` | 2 jam | 1.4 |
| 1.6 | Custom RBAC | Gate definitions di `AppServiceProvider` (`Gate::before` superadmin bypass + dynamic gate per permission dari DB) | 2 jam | 1.5 |
| 1.7 | Auth Controllers | `AuthenticatedSessionController`, `RegisteredUserController`, `PasswordResetLinkController`, `NewPasswordController`, `ChangePasswordController` | 3 jam | 1.5 |
| 1.8 | SSO Controller | `SSOController` (authorize + callback), `syncUserFromSSO()`, `linkUserToOpd()`, auto-assign role | 3 jam | 1.7 |
| 1.9 | Middleware | `CheckRole`, `HandleInertiaRequests` (share auth.user, auth.role, auth.permissions, auth.menu, flash, ziggy), `SSOAutoLogin` | 2 jam | 1.6 |
| 1.10 | Auth Pages (Vue) | `Login.vue` (email + password + SSO button), `Register.vue`, `ForgotPassword.vue`, `ResetPassword.vue` — style ikuti `GuestLayout.vue` sikerja-v2 | 4 jam | 1.7 |
| 1.11 | Seeders | `RolesSeeder` (Super Admin, Admin Bapperida, Operator Bidang, ASN, Akademisi, Mahasiswa), `PermissionsSeeder`, `RolePermissionsSeeder`, `AdminUserSeeder` | 3 jam | 1.5 |
| 1.12 | Layout Shell | `AuthenticatedLayout.vue` (sidebar collapsible w-64/w-16 + navbar fixed h-16 + footer), `GuestLayout.vue`, `Partials/Sidebar.vue`, `Partials/Navbar.vue`, `Partials/Footer.vue` | 5 jam | 1.2 |
| 1.13 | Shared UI Components | `Modal.vue`, `PrimaryButton.vue`, `SecondaryButton.vue`, `DangerButton.vue`, `TextInput.vue`, `InputError.vue`, `InputLabel.vue`, `Checkbox.vue`, `Dropdown.vue`, `Breadcrumb.vue`, `Pagination.vue`, `EmptyState.vue`, `LoadingSkeleton.vue`, `Toast.vue` | 5 jam | 1.2 |
| 1.14 | Menu System | Migration `menus` (parent_id tree, roles column), `Menu.php` model, `MenuSeeder`, dynamic sidebar filtered by user roles | 3 jam | 1.6 |

**Acceptance Criteria Sprint 1:**
```
[x] User bisa login dengan email/password
[x] User bisa login dengan SSO Samarinda
[x] User bisa logout
[x] Super Admin bypass semua Gate
[x] Sidebar tampil dynamic sesuai role user
[x] Navbar tampil: logo, toggle sidebar, search, dark mode toggle, user avatar
[x] Guest hanya bisa akses halaman login
[x] Semua role sudah ter-seed di database
```

---

### Sprint 2 — Master Data & CRUD Kajian (Backend)

**Durasi**: 5 hari kerja | **Estimasi**: ~35 jam

| # | Task | Deskripsi | Estimasi | Dependensi |
|---|------|-----------|----------|------------|
| 2.1 | Database — Master Data | Migration: `bidangs` (soft delete), `jenis_kajians` (soft delete), `tahuns`, `keywords` (soft delete), `kajian_keywords` | 2 jam | 1.4 |
| 2.2 | Models — Master Data | `Bidang.php`, `JenisKajian.php`, `Tahun.php`, `Keyword.php`, `KajianKeyword.php` | 1.5 jam | 2.1 |
| 2.3 | Master Controllers | `Master/BidangController`, `Master/JenisKajianController`, `Master/TahunController`, `Master/KataKunciController` — semua dengan middleware `can:` | 4 jam | 2.2 |
| 2.4 | Master Form Requests | `StoreBidangRequest`, `UpdateBidangRequest`, `StoreJenisKajianRequest`, `UpdateJenisKajianRequest`, `StoreKataKunciRequest` | 2 jam | 2.3 |
| 2.5 | Master Seeders | `BidangSeeder` (data bidang Bapperida), `JenisKajianSeeder` (kajian kebijakan, evaluasi, policy brief, dll) | 1 jam | 2.1 |
| 2.6 | Database — Kajian | Migration `kajians`: uuid (CHAR(36)), judul, slug, tahun_id, bidang_id, jenis_id, ringkasan, tujuan, latar_belakang, metodologi, lokasi, tanggal, penanggung_jawab, koordinator, tim (json), mitra, temuan, rekomendasi, implikasi, status (enum: draft/review/published/archived), view_count, download_count, version, seo_title, seo_description, seo_keywords, published_at, archived_at, created_by, updated_by + soft delete + FULLTEXT index (judul, ringkasan, temuan, rekomendasi) | 3 jam | 2.1 |
| 2.7 | Database — Kajian Files | Migration `kajian_files`: uuid CHAR(36), kajian_id, tipe (enum: pdf/presentasi/cover), file_path, file_name, file_size, mime_type, uploaded_by + soft delete | 1.5 jam | 2.6 |
| 2.8 | Database — Kajian Gallery | Migration `kajian_galleries`: uuid CHAR(36), kajian_id, file_path, file_name, caption, sort_order + soft delete | 1 jam | 2.6 |
| 2.9 | Models — Kajian | `Kajian.php` (UUID auto-generate, soft delete, relationships: bidang, jenisKajian, tahun, keywords, files, galleries, versions, creator), `KajianFile.php`, `KajianGallery.php` | 2.5 jam | 2.6 |
| 2.10 | KajianController | CRUD (index dengan filter/search/pagination, create, store, show, edit, update, destroy) + publish + archive + toDraft + uploadFile + deleteFile + uploadGallery | 5 jam | 2.9 |
| 2.11 | KajianService | Business logic: generate slug, auto-increment version, handle publish workflow, scope by role (operator = bidang sendiri) | 3 jam | 2.10 |
| 2.12 | KajianPolicy | Authorization: `view`, `create`, `update`, `delete`, `publish`, `archive` — per role sesuai permission matrix | 2 jam | 2.10 |
| 2.13 | KajianObserver | Auto slug on creating, audit log on status change, auto-set created_by/updated_by | 1.5 jam | 2.10 |
| 2.14 | Form Requests — Kajian | `StoreKajianRequest` (validasi semua field + file validation: PDF max 20MB, image max 5MB), `UpdateKajianRequest` | 2 jam | 2.10 |
| 2.15 | Routes — Admin | `routes/admin.php`: resource kajian + custom routes (publish, archive, draft, upload-file, delete-file, upload-gallery) + resource master data | 1.5 jam | 2.10 |
| 2.16 | Storage Setup | `php artisan storage:link`, konfigurasi disk untuk kajian files, validasi folder structure | 30 menit | 2.6 |

**Acceptance Criteria Sprint 2:**
```
[x] CRUD Bidang Kajian berjalan (create, read, update, delete)
[x] CRUD Jenis Kajian berjalan
[x] CRUD Tahun berjalan
[x] CRUD Kata Kunci berjalan
[x] CRUD Kajian berjalan (draft → review → published → archived)
[x] Upload file PDF, presentasi, cover berhasil
[x] Upload gallery berhasil
[x] Operator hanya bisa akses kajian bidangnya sendiri
[x] Admin bisa publish dan archive kajian
[x] Slug URL auto-generated dan unique
```

---

### Sprint 3 — Frontend Kajian & Dashboard

**Durasi**: 5 hari kerja | **Estimasi**: ~40 jam

| # | Task | Deskripsi | Estimasi | Dependensi |
|---|------|-----------|----------|------------|
| 3.1 | Kajian/Index.vue | Daftar kajian: grid/list view toggle, filter (bidang, jenis, tahun, status), search, pagination, empty state — style ikuti `Permohonan/Index.vue` | 5 jam | 2.15 |
| 3.2 | Kajian/Create.vue | Multi-step wizard form: Step 1 (Info Dasar: judul, tahun, bidang, jenis, lokasi, tanggal) → Step 2 (Detail: ringkasan, tujuan, latar belakang, metodologi, temuan, rekomendasi, implikasi) → Step 3 (Tim: penanggung jawab, koordinator, tim JSON, mitra) → Step 4 (File: upload PDF, presentasi, cover) → Step 5 (Review & Submit) — style ikuti `CreateForm.vue` | 6 jam | 3.1 |
| 3.3 | Kajian/Edit.vue | Edit form (same structure as Create, pre-filled data) | 3 jam | 3.2 |
| 3.4 | Kajian/Show.vue | Detail kajian internal: semua field + files + gallery + version history + status badge | 4 jam | 3.1 |
| 3.5 | Kajian Components | `KajianCard.vue`, `KajianListItem.vue`, `KajianDetailModal.vue`, `FileUploadForm.vue`, `GalleryUpload.vue`, `KajianFilter.vue`, `StatusBadge.vue`, `VersionHistory.vue` | 5 jam | 3.1 |
| 3.6 | Master Data Pages | `Master/Bidang/Index.vue`, `Master/JenisKajian/Index.vue`, `Master/Tahun/Index.vue`, `Master/KataKunci/Index.vue` — CRUD table + modal form — style ikuti `Master/Kategori/Index.vue` | 4 jam | 2.15 |
| 3.7 | Profile/Edit.vue | Edit profile user (biodata + change password) — style ikuti `Profile/Edit.vue` sikerja-v2 | 2 jam | 1.12 |
| 3.8 | Dashboard.vue (Admin) | KPI stats cards (total kajian, total download, total view, kajian draft, kajian published) + charts placeholder + tabel kajian terbaru + tabel kajian populer — style ikuti `Dashboard.vue` | 5 jam | 2.15 |
| 3.9 | DashboardOperator.vue | KPI stats (kajian bidang sendiri) + daftar kajian bidang + status breakdown | 3 jam | 3.8 |
| 3.10 | DashboardAsn.vue | Kajian terbaru + kajian populer + statistik ringkas | 2 jam | 3.8 |
| 3.11 | StatsCard.vue | KPI card component (icon, value, label, trend indicator) — gradient style ikuti sikerja-v2 | 1 jam | 3.8 |
| 3.12 | Settings Pages | `Settings/Users/Index.vue`, `Create.vue`, `Edit.vue`, `Settings/Roles/Index.vue`, `Permission.vue`, `Settings/Permissions/Index.vue`, `Create.vue`, `Edit.vue`, `Settings/Menus/Index.vue`, `Settings/LogActivity/Index.vue` — style ikuti sukses-v2 | 5 jam | 1.14 |
| 3.13 | Notifikasi | Bell icon di navbar + dropdown notifikasi + mark as read + migration `notifikasis` + `NotifikasiController` | 3 jam | 1.12 |

**Acceptance Criteria Sprint 3:**
```
[x] Daftar kajian tampil dengan grid/list view
[x] Filter dan search berfungsi
[x] Form create kajian multi-step berjalan
[x] Upload file PDF, presentasi, cover dari UI berhasil
[x] Upload gallery dari UI berhasil
[x] Detail kajian tampil lengkap
[x] Master data CRUD (bidang, jenis, tahun, kata kunci) berjalan dari UI
[x] Dashboard admin tampil dengan KPI stats
[x] Dashboard operator tampil scoped ke bidang sendiri
[x] Settings (users, roles, permissions, menu, log) berjalan
[x] Notifikasi bell tampil di navbar
```

---

### Sprint 4 — Portal Publik

**Durasi**: 4 hari kerja | **Estimasi**: ~30 jam

| # | Task | Deskripsi | Estimasi | Dependensi |
|---|------|-----------|----------|------------|
| 4.1 | FrontendLayout.vue | Layout portal publik: navbar publik + footer publik — style ikuti `Frontend/Navbar.vue` & `Frontend/Footer.vue` | 3 jam | 1.12 |
| 4.2 | Portal/Home.vue | Beranda: hero section + widget kajian terbaru (6 card) + widget kajian populer (5 card) + statistik ringkas (total kajian, total download) — modern design | 5 jam | 4.1 |
| 4.3 | Portal/KajianList.vue | Daftar kajian publik: card grid + filter sidebar (bidang, jenis, tahun) + search + pagination + sort (terbaru, populer, A-Z) | 5 jam | 4.1 |
| 4.4 | Portal/KajianDetail.vue | Detail kajian publik: cover image, judul, metadata (bidang, jenis, tahun, tanggal), ringkasan, tujuan, temuan, rekomendasi, download buttons (PDF, presentasi), gallery, share buttons | 5 jam | 4.1 |
| 4.5 | Portal/Search.vue | Pencarian advanced: full-text search + filter (bidang, jenis, tahun, kata kunci) + sort + highlight keyword | 3 jam | 4.3 |
| 4.6 | Portal Controllers | `PortalController` (beranda), `PortalKajianController` (daftar + detail + download), `PortalSearchController` (search + filter) | 3 jam | 2.15 |
| 4.7 | View & Download Logging | Auto-record `view_logs` saat akses detail, auto-record `download_logs` saat download, increment `view_count`/`download_count` di `kajians` | 2 jam | 4.6 |
| 4.8 | Portal Components | `HeroSection.vue`, `KajianTerbaru.vue`, `KajianPopuler.vue`, `SearchBar.vue`, `FilterSidebar.vue`, `ShareButton.vue` (WhatsApp, Twitter, Facebook, Copy Link) | 3 jam | 4.2 |
| 4.9 | Routes — Portal | `routes/web.php`: public routes (/, /kajian, /kajian/{slug}, /kajian/search, /kajian/{slug}/download) | 1 jam | 4.6 |

**Acceptance Criteria Sprint 4:**
```
[x] Beranda publik tampil: hero, kajian terbaru, kajian populer, statistik
[x] Daftar kajian publik tampil dengan filter dan pagination
[x] Detail kajian publik tampil lengkap dengan cover dan metadata
[x] Download PDF/presentasi berfungsi
[x] View count dan download count ter-increment otomatis
[x] Pencarian berfungsi (full-text search + filter)
[x] Share button berfungsi (WhatsApp, Twitter, Facebook, Copy Link)
[x] Responsive di mobile, tablet, desktop
[x] Portal bisa diakses tanpa login
```

---

## PHASE 2 — Enhancement

> **Target**: Dashboard statistik lengkap, SEO optimal, notifikasi, audit log, dan laporan.

---

### Sprint 5 — Dashboard Statistik & Charts

**Durasi**: 4 hari kerja | **Estimasi**: ~30 jam

| # | Task | Deskripsi | Estimasi | Dependensi |
|---|------|-----------|----------|------------|
| 5.1 | StatisticsService | Aggregasi: total kajian, total download, total view, kajian per tahun, kajian per bidang, kajian per jenis, kajian per status, top 10 populer, tren bulanan | 4 jam | 4.7 |
| 5.2 | TrendChart.vue | Chart.js line chart: tren kajian per tahun/bulan — style ikuti `TrendChart.vue` | 3 jam | 5.1 |
| 5.3 | BidangChart.vue | Chart.js bar/doughnut: distribusi kajian per bidang (top 5 + others) — style ikuti `CategoryChart.vue` | 2.5 jam | 5.1 |
| 5.4 | JenisChart.vue | Chart.js pie/bar: distribusi kajian per jenis | 2 jam | 5.1 |
| 5.5 | DownloadChart.vue | Chart.js line: tren download per bulan | 2 jam | 5.1 |
| 5.6 | PopularKajianTable.vue | Tabel top 10 kajian populer (judul, bidang, view, download) — style ikuti `TopAgenciesTable.vue` | 2 jam | 5.1 |
| 5.7 | RecentKajianTable.vue | Tabel 10 kajian terbaru (judul, bidang, tanggal, status) | 2 jam | 5.1 |
| 5.8 | Dashboard Integration | Integrasikan semua chart + tabel ke Dashboard.vue, DashboardOperator.vue, DashboardAsn.vue + filter tahun/bidang | 4 jam | 5.2–5.7 |
| 5.9 | Dashboard API | Endpoint JSON untuk data chart (supaya tidak block page load) + loading state | 3 jam | 5.1 |
| 5.10 | Laporan/Index.vue | Halaman laporan: ringkasan statistik + filter + link ke cetak | 3 jam | 5.1 |
| 5.11 | Laporan/Statistik.vue | Halaman statistik detail: semua chart + tabel + filter advanced | 3 jam | 5.8 |

**Acceptance Criteria Sprint 5:**
```
[x] Dashboard admin tampil 5+ chart (trend, bidang, jenis, download, status)
[x] Dashboard operator tampil scoped ke bidang sendiri
[x] Filter tahun/bidang mengubah data chart
[x] Tabel kajian populer dan terbaru tampil
[x] Loading state saat data chart di-load
[x] Halaman laporan dan statistik berjalan
```

---

### Sprint 6 — SEO, Notifikasi & Audit Log

**Durasi**: 3 hari kerja | **Estimasi**: ~25 jam

| # | Task | Deskripsi | Estimasi | Dependensi |
|---|------|-----------|----------|------------|
| 6.1 | SEO Metadata | `seo_title`, `seo_description`, `seo_keywords` di form kajian + inject ke `<head>` via Inertia `Head` component + Open Graph tags | 3 jam | 3.2 |
| 6.2 | Sitemap XML | Auto-generate `sitemap.xml` dari semua kajian published (judul, slug, updated_at) | 2 jam | 4.6 |
| 6.3 | robots.txt | Konfigurasi robots.txt + meta robots per halaman | 30 menit | 6.2 |
| 6.4 | Structured Data | JSON-LD Schema.org (ScholarlyArticle) di halaman detail kajian | 2 jam | 4.4 |
| 6.5 | KajianObserver — Notifikasi | Trigger notifikasi in-app saat: kajian baru dibuat (ke admin), kajian di-publish (ke operator), kajian di-archive (ke operator) | 3 jam | 2.13 |
| 6.6 | NotificationService | Service kirim notifikasi in-app + WA (ikuti pattern `NotificationService.php` + `NotificationTemplate.php` dari sikerja-v2) | 4 jam | 6.5 |
| 6.7 | NotificationTemplate | Format pesan: kajian baru, kajian published, kajian archived — formal style ikuti NOTIFIKASI.md | 2 jam | 6.6 |
| 6.8 | Database — Audit Logs | Migration `audit_logs`: uuid CHAR(36), user_id, action, model_type, model_id, old_values (json), new_values (json), ip_address, user_agent, created_at | 2 jam | 1.4 |
| 6.9 | AuditLog Model & Observer | `AuditLog.php` model + auto-record di KajianObserver (create, update, delete, publish, archive) + user action tracking | 3 jam | 6.8 |
| 6.10 | Settings/LogActivity | `LogActivityController` (index + show + destroy) + `Settings/LogActivity/Index.vue` — tampilkan audit trail dengan filter user/action/date | 3 jam | 6.9 |

**Acceptance Criteria Sprint 6:**
```
[x] Setiap halaman detail kajian punya meta title, description, OG tags
[x] sitemap.xml auto-generated dan accessible
[x] JSON-LD structured data valid (test dengan Google Rich Results)
[x] Notifikasi in-app terkirim saat kajian di-publish
[x] Audit log tercatat untuk setiap aksi CRUD + publish + archive
[x] Log aktivitas tampil di Settings dengan filter
```

---

### Sprint 7 — Laporan & Export

**Durasi**: 3 hari kerja | **Estimasi**: ~20 jam

| # | Task | Deskripsi | Estimasi | Dependensi |
|---|------|-----------|----------|------------|
| 7.1 | LaporanController | Index (daftar laporan), statistik (aggregasi data), cetak detail | 3 jam | 5.1 |
| 7.2 | ExportService | Service export PDF (DomPDF + kop surat Pemkot Samarinda) + Excel (Maatwebsite/Excel atau PhpSpreadsheet) | 4 jam | 7.1 |
| 7.3 | Export PDF — Kajian | Template PDF formal: kop surat, metadata kajian, ringkasan, temuan, rekomendasi | 3 jam | 7.2 |
| 7.4 | Export PDF — Laporan | Template PDF laporan statistik: chart snapshot, tabel data, summary | 3 jam | 7.2 |
| 7.5 | Export Excel | Export data kajian ke Excel (semua field + filter) | 2 jam | 7.2 |
| 7.6 | Laporan/CetakDetail.vue | Preview halaman cetak (print-friendly CSS) + tombol print + tombol download PDF | 3 jam | 7.3 |
| 7.7 | ExportController | Routes: `/laporan/export/pdf`, `/laporan/export/excel` + middleware auth + permission check | 2 jam | 7.2 |

**Acceptance Criteria Sprint 7:**
```
[x] Export PDF kajian berjalan (format formal kop surat)
[x] Export PDF laporan statistik berjalan
[x] Export Excel data kajian berjalan
[x] Halaman cetak detail tampil print-friendly
[x] Export hanya bisa diakses oleh role yang berwenang
```

---

## PHASE 3 — Advanced Features

> **Target**: Fitur lanjutan — versioning, gallery advanced, analytics, dark mode, UI polish.

---

### Sprint 8 — Versioning, Gallery & Analytics

**Durasi**: 3 hari kerja | **Estimasi**: ~25 jam

| # | Task | Deskripsi | Estimasi | Dependensi |
|---|------|-----------|----------|------------|
| 8.1 | Database — Kajian Versions | Migration `kajian_versions`: uuid CHAR(36), kajian_id, version_number, changes_summary (json), file_path (snapshot), created_by, created_at | 2 jam | 2.6 |
| 8.2 | KajianVersion Model | `KajianVersion.php` + relationship ke Kajian | 1 jam | 8.1 |
| 8.3 | Versioning Logic | Auto-create version saat kajian di-update (snapshot data + file), increment version_number, tampilkan diff | 4 jam | 8.2 |
| 8.4 | VersionHistory.vue | Component tampilkan history versi: nomor versi, tanggal, user, ringkasan perubahan, link download snapshot | 3 jam | 8.3 |
| 8.5 | Gallery Advanced | Lightbox viewer, drag-to-reorder, caption edit, bulk delete | 3 jam | 3.5 |
| 8.6 | KajianSearchService | Full-text search MySQL (`FULLTEXT` + `MATCH() AGAINST()`), ranking, highlight, boolean mode + natural language mode | 4 jam | 2.11 |
| 8.7 | Search Advanced UI | Auto-suggest, recent searches, search history, filter combination, result count | 3 jam | 8.6 |
| 8.8 | Analytics Dashboard | Statistik lanjutan: unique visitors, bounce rate (dari view_logs), popular keywords, download trends | 3 jam | 5.1 |
| 8.9 | Kajian Recommendation | "Kajian Terkait" di detail page berdasarkan bidang + jenis + keywords yang sama | 2 jam | 8.6 |

**Acceptance Criteria Sprint 8:**
```
[x] Versioning otomatis saat kajian di-update
[x] History versi tampil dengan diff ringkasan
[x] Gallery lightbox + drag-to-reorder berjalan
[x] Full-text search berjalan dengan ranking dan highlight
[x] Auto-suggest di search bar berfungsi
[x] Kajian terkait tampil di halaman detail
```

---

### Sprint 9 — Dark Mode & UI Polish

**Durasi**: 3 hari kerja | **Estimasi**: ~20 jam

| # | Task | Deskripsi | Estimasi | Dependensi |
|---|------|-----------|----------|------------|
| 9.1 | Dark Mode — Audit | Audit semua page: pastikan setiap `bg-white` punya paired `dark:bg-gray-800`, setiap `text-gray-900` punya `dark:text-gray-100` — ikuti pattern plan.md D8 | 5 jam | 3.x |
| 9.2 | Dark Mode — Components | Update semua shared components (Modal, Card, Table, Input, Sidebar, Navbar) support dark mode | 3 jam | 9.1 |
| 9.3 | Dark Mode — Charts | Chart.js dark mode: background transparent, grid color adapt, text color adapt | 2 jam | 5.x |
| 9.4 | Loading Skeleton | PrimeVue Skeleton untuk grid card kajian, list master data, dashboard stats — ikuti plan.md D10 | 2 jam | 3.5 |
| 9.5 | Empty State | Shared `EmptyState.vue` dengan illustration SVG konsisten di semua list — ikuti plan.md D2 | 1.5 jam | 3.1 |
| 9.6 | Toast Notification | Global toast position `TOP_RIGHT`, consistent styling — ikuti plan.md D5 | 30 menit | 1.13 |
| 9.7 | Responsive Audit | Test & fix responsive di mobile (< 640px), tablet (640–1024px), desktop (> 1024px) untuk semua page | 3 jam | 3.x |
| 9.8 | Error State | Error boundary component, 404 page, 500 page, validation error display | 2 jam | 1.13 |
| 9.9 | Breadcrumb | Breadcrumb navigation di semua halaman admin (Dashboard > Kajian > Detail) | 1 jam | 1.13 |

**Acceptance Criteria Sprint 9:**
```
[x] Dark mode toggle berfungsi di semua halaman
[x] Tidak ada element putih polos yang tidak support dark mode
[x] Chart adaptif terhadap dark mode
[x] Loading skeleton tampil saat data loading
[x] Empty state tampil konsisten di semua list
[x] Toast notification muncul di posisi yang konsisten
[x] Responsive di mobile, tablet, desktop
[x] Error page (404, 500) tampil dengan desain yang sesuai
```

---

## PHASE 4 — Production Readiness

> **Target**: Aplikasi siap production — performa, keamanan, backup, testing, deployment.

---

### Sprint 10 — Performance, Security & Infrastructure

**Durasi**: 3 hari kerja | **Estimasi**: ~25 jam

| # | Task | Deskripsi | Estimasi | Dependensi |
|---|------|-----------|----------|------------|
| 10.1 | Cache — Portal Publik | Cache halaman beranda, daftar kajian, detail kajian (Redis/file cache, TTL 10 menit, invalidate on publish/update) | 3 jam | 4.x |
| 10.2 | Cache — Statistik | Cache dashboard statistics (TTL 1 jam, invalidate on new kajian/download) | 2 jam | 5.x |
| 10.3 | Queue Setup | Queue driver (Redis/database), queue worker systemd service, failed jobs table | 2 jam | 1.1 |
| 10.4 | Queue Jobs | `SendNotificationJob`, `GenerateExportJob`, `ProcessUploadJob` — async processing | 3 jam | 10.3 |
| 10.5 | Security — File Upload | Sanitize filename (`Str::slug`), validate MIME type server-side, max file size, prevent path traversal — ikuti plan.md E2 | 2 jam | 2.10 |
| 10.6 | Security — Permission Audit | Audit semua controller endpoint: pastikan permission check strict, tidak ada IDOR — ikuti plan.md E1 | 3 jam | 2.12 |
| 10.7 | Security — Input Validation | Audit semua Form Request: pastikan tidak ada XSS, SQL injection, mass assignment | 2 jam | 2.14 |
| 10.8 | Backup Command | `php artisan sikajian:backup` — backup database (mysqldump) + storage (tar.gz) ke configured path + retention policy | 3 jam | 2.6 |
| 10.9 | Restore Command | `php artisan sikajian:restore` — restore dari backup file | 2 jam | 10.8 |
| 10.10 | Health Check | `/health` endpoint: check DB connection, storage writable, queue running, cache working | 1.5 jam | 10.3 |
| 10.11 | Monitoring | Log channel setup (daily rotation), error tracking (Sentry/Flare), uptime monitoring config | 1.5 jam | 10.10 |

**Acceptance Criteria Sprint 10:**
```
[x] Cache portal publik berjalan (page load < 500ms)
[x] Queue worker berjalan dan memproses job async
[x] File upload ter-sanitize dan ter-validasi server-side
[x] Semua endpoint punya permission check yang strict
[x] Backup command berjalan (database + storage)
[x] Restore command berjalan
[x] Health check endpoint accessible
```

---

### Sprint 11 — Testing, Documentation & Deployment

**Durasi**: 3 hari kerja | **Estimasi**: ~20 jam

| # | Task | Deskripsi | Estimasi | Dependensi |
|---|------|-----------|----------|------------|
| 11.1 | PHPUnit Setup | Konfigurasi `phpunit.xml`, test database (SQLite in-memory atau test MySQL), base TestCase | 1.5 jam | 1.1 |
| 11.2 | Feature Tests — Auth | `test_user_can_login_with_email`, `test_user_can_login_with_sso`, `test_guest_cannot_access_dashboard`, `test_user_can_logout` | 2 jam | 11.1 |
| 11.3 | Feature Tests — Kajian | `test_admin_can_create_kajian`, `test_operator_can_create_kajian_in_own_bidang`, `test_operator_cannot_create_kajian_in_other_bidang`, `test_admin_can_publish_kajian`, `test_kajian_slug_auto_generated`, `test_upload_pdf_only_accepts_pdf` | 3 jam | 11.1 |
| 11.4 | Feature Tests — Portal | `test_guest_can_access_portal`, `test_portal_shows_published_kajian_only`, `test_download_increments_count`, `test_view_increments_count`, `test_search_returns_relevant_results` | 2.5 jam | 11.1 |
| 11.5 | Feature Tests — Permission | `test_superadmin_bypasses_all_gates`, `test_role_permission_matrix`, `test_unauthorized_access_returns_403` | 2 jam | 11.1 |
| 11.6 | Nginx Config | Nginx server block: subdomain `kajian.bapperida.samarindakota.go.id`, SSL (Let's Encrypt), PHP-FPM proxy, static file caching, gzip | 2 jam | 10.x |
| 11.7 | Deployment Script | Deploy script: `git pull`, `composer install --no-dev`, `npm run build`, `php artisan migrate --force`, `php artisan config:cache`, `php artisan route:cache`, `php artisan view:cache`, restart queue worker | 2 jam | 11.6 |
| 11.8 | Cron Setup | Scheduler: backup (daily 02:00), cache clear (weekly), statistics refresh (hourly) | 1 jam | 10.8 |
| 11.9 | README.md | Dokumentasi: instalasi, konfigurasi, deployment, cron, backup/restore, troubleshooting | 2 jam | 11.7 |
| 11.10 | STRUKTUR_MODUL.md | Dokumentasi modul lengkap (seperti checklist.md yang sudah dibuat, update sesuai implementasi akhir) | 1 jam | 11.9 |
| 11.11 | Smoke Test | Manual end-to-end test: login → create kajian → upload → publish → portal → download → logout | 1 jam | 11.2–11.5 |

**Acceptance Criteria Sprint 11:**
```
[x] PHPUnit test pass (minimum 15 feature tests)
[x] Nginx config valid dan SSL aktif
[x] Deployment script berjalan tanpa error
[x] Cron backup berjalan otomatis
[x] README.md lengkap dengan panduan instalasi
[x] Smoke test end-to-end berhasil
[x] Aplikasi accessible di subdomain Bapperida
```

---

## RINGKASAN PRIORITAS

### Phase 1 — MVP (Wajib Selesai)

| Sprint | Task | Estimasi |
|--------|------|----------|
| Sprint 1 | Setup, Auth, SSO, RBAC, Layout Shell | ~40 jam |
| Sprint 2 | Master Data, CRUD Kajian Backend | ~35 jam |
| Sprint 3 | Frontend Kajian, Dashboard, Settings | ~40 jam |
| Sprint 4 | Portal Publik (beranda, search, download) | ~30 jam |
| | **Subtotal Phase 1** | **~145 jam** |

### Phase 2 — Enhancement (Sebaiknya Dilakukan)

| Sprint | Task | Estimasi |
|--------|------|----------|
| Sprint 5 | Dashboard Statistik + Charts | ~30 jam |
| Sprint 6 | SEO, Notifikasi, Audit Log | ~25 jam |
| Sprint 7 | Laporan & Export PDF/Excel | ~20 jam |
| | **Subtotal Phase 2** | **~75 jam** |

### Phase 3 — Advanced (Nice to Have)

| Sprint | Task | Estimasi |
|--------|------|----------|
| Sprint 8 | Versioning, Gallery, Analytics | ~25 jam |
| Sprint 9 | Dark Mode, UI Polish | ~20 jam |
| | **Subtotal Phase 3** | **~45 jam** |

### Phase 4 — Production (Wajib Sebelum Go-Live)

| Sprint | Task | Estimasi |
|--------|------|----------|
| Sprint 10 | Caching, Queue, Security, Backup | ~25 jam |
| Sprint 11 | Testing, Docs, Deployment | ~20 jam |
| | **Subtotal Phase 4** | **~45 jam** |

---

## FUTURE ENHANCEMENT (Post-MVP)

> Fitur yang tidak masuk sprint saat ini, bisa dikerjakan di iterasi berikutnya.

| # | Fitur | Deskripsi | Prioritas |
|---|-------|-----------|-----------|
| F1 | SSO Pemerintah Kota | Integrasi SSO penuh dengan seluruh akun Pemkot Samarinda | Tinggi |
| F2 | Integrasi Satu Data | Sinkronisasi dengan portal Satu Data Indonesia | Tinggi |
| F3 | Integrasi Open Data | Publish kajian ke portal Open Data Samarinda | Sedang |
| F4 | AI Search | Pencarian berbasis AI (semantic search, NLP Bahasa Indonesia) | Rendah |
| F5 | AI Summary | Auto-generate ringkasan kajian menggunakan AI | Rendah |
| F6 | OCR PDF | Extract text dari PDF scan untuk indexing | Sedang |
| F7 | Komentar Kajian | Fitur diskusi/komentar per kajian (moderasi admin) | Sedang |
| F8 | Bookmark & Favorite | User bisa bookmark kajian favorit | Rendah |
| F9 | Email Notification | Notifikasi via email (kajian baru, update) | Sedang |
| F10 | API Publik | REST API publik untuk integrasi pihak ketiga | Sedang |
| F11 | Mobile App | Aplikasi mobile (PWA atau native) | Rendah |
| F12 | Multi-language | Dukungan bahasa Inggris untuk portal publik | Rendah |

---

## CHECKLIST FINAL SEBELUM HAND-OFF

```
[x] Login email/password + SSO Samarinda berjalan
[x] Semua role punya akses sesuai permission matrix
[x] CRUD kajian berjalan end-to-end (draft → review → published → archived)
[x] Upload file (PDF, presentasi, cover, gallery) berjalan
[x] Portal publik accessible tanpa login
[x] Pencarian dan filter berfungsi
[x] Download berfungsi dengan logging
[x] Dashboard tampil dengan statistik dan charts
[x] Dark mode berfungsi di semua halaman
[x] Responsive di mobile, tablet, desktop
[x] SEO metadata + sitemap.xml + structured data
[x] Audit log tercatat untuk semua aksi penting
[x] PHPUnit test pass (minimum 15 test)
[x] Backup & restore berjalan
[x] Nginx + SSL aktif di subdomain Bapperida
[x] Cron scheduler terdaftar dan running
[x] Storage symlink dijalankan di production
[x] README.md + STRUKTUR_MODUL.md up-to-date
```
