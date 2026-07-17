Prompt PRD

Bertindaklah sebagai Senior Product Manager, Senior System Analyst, dan Senior Software Architect yang berpengalaman membangun aplikasi pemerintahan berbasis SPBE di Indonesia.

Saya ingin membangun aplikasi Sistem Informasi Kajian dan Riset Bapperida Kota Samarinda, yaitu sebuah portal digital yang berfungsi sebagai repository seluruh hasil penelitian, kajian, evaluasi, policy brief, dan dokumen riset yang dimiliki Bapperida Kota Samarinda.

Aplikasi ini bertujuan untuk menggantikan pengelolaan dokumen yang selama ini dilakukan secara manual menggunakan arsip fisik, folder bersama, email, dan WhatsApp menjadi sistem yang terpusat, mudah dicari, aman, terdokumentasi, dan dapat diakses secara online melalui subdomain Bapperida.

Target pengguna terdiri dari:

Super Admin
Admin Bapperida
Operator Bidang
ASN Pemerintah Kota Samarinda
Akademisi
Mahasiswa
Masyarakat umum

Tech Stack yang digunakan:

Laravel versi terbaru
PHP versi terbaru
Vue.js 3 (Composition API)
Inertia.js
PostgreSQL
Tailwind CSS
Vite
REST API
Deploy pada VPS Linux menggunakan Nginx.

Buatkan Product Requirement Document (PRD) yang sangat lengkap dan profesional dengan struktur berikut.

1. Executive Summary

Jelaskan tujuan aplikasi, masalah yang ingin diselesaikan, manfaat bagi pemerintah daerah, serta nilai tambah bagi masyarakat.

2. Background

Jelaskan kondisi saat ini.

Misalnya:

Dokumen masih tersebar.
Sulit mencari kajian lama.
Tidak ada repository digital.
Tidak ada statistik penggunaan dokumen.
Tidak ada metadata penelitian yang terstruktur.
3. Problem Statement

Identifikasi seluruh pain point pengguna.

Contoh:

Pencarian lama.
Dokumen hilang.
Duplikasi file.
Sulit mengetahui penelitian terbaru.
Tidak ada sistem publikasi.
4. Goals

Business Goal

User Goal

System Goal

Success Metrics

KPI

5. Stakeholder

Identifikasi stakeholder beserta tanggung jawabnya.

Misalnya:

Kepala Bapperida

Kabid

Admin

Operator

Masyarakat

ASN

Peneliti

6. User Persona

Minimal 5 persona lengkap.

Berikan:

Nama

Umur

Profesi

Tujuan

Pain Point

Motivasi

7. User Journey

Buat alur pengguna mulai dari membuka website sampai berhasil menemukan dan mengunduh dokumen.

8. Functional Requirement

Jelaskan seluruh modul.

Minimal terdiri dari:

Authentication
Login
Logout
Forgot Password
Change Password
User Management
CRUD User
Role
Permission
Master Data
Bidang Kajian
Jenis Kajian
Tahun
Kata Kunci
Manajemen Kajian

Field:

Judul

Tahun

Bidang

Jenis

Ringkasan

Tujuan

Latar Belakang

Metodologi

Lokasi

Tanggal

Penanggung Jawab

Koordinator

Tim

Mitra

Temuan

Rekomendasi

Implikasi

Upload PDF

Upload Presentasi

Upload Cover

Upload Gallery

Draft

Publish

Archive

View Count

Download Count

Version

Slug URL

SEO Metadata

Portal Publik

Beranda

Daftar Kajian

Detail Kajian

Pencarian

Filter

Download

Share

Kajian Terbaru

Kajian Populer

Dashboard

Statistik:

Total Kajian

Total Download

Total View

Kajian per Tahun

Kajian per Bidang

Kajian per Jenis

Grafik Chart.js

9. Non Functional Requirement

Performance

Security

Scalability

Availability

Accessibility

SEO

Responsive

Audit Log

Backup

Restore

Monitoring

Caching

Queue

10. Database Design

Buat ERD lengkap.

Minimal tabel:

users

roles

permissions

kajians

kajian_files

kajian_galleries

bidangs

jenis_kajians

keywords

audit_logs

activity_logs

download_logs

view_logs

Gunakan UUID.

Gunakan Soft Delete.

Gunakan Foreign Key.

11. API Specification

Buat seluruh endpoint REST API.

Method

Endpoint

Request

Response

Authentication

Validation

12. UI/UX Requirement

Desain modern.

Responsive.

Dashboard profesional.

Sidebar.

Topbar.

Dark Mode.

Loading Skeleton.

Toast Notification.

Pagination.

Breadcrumb.

Modal.

Empty State.

Error State.

13. User Flow

Buat flow diagram secara tekstual.

Mulai Login → Dashboard → Tambah Kajian → Upload File → Publish → Portal Publik → Pengunjung Cari → Detail → Download.

14. Permission Matrix

Jelaskan hak akses setiap role.

Super Admin

Admin

Operator

Guest

15. Acceptance Criteria

Buat acceptance criteria untuk setiap fitur menggunakan format:

Given

When

Then

16. Roadmap

Tahap 1 (MVP)

Tahap 2

Tahap 3

Tahap 4

17. Future Enhancement

SSO Pemerintah Kota

Integrasi Satu Data

Integrasi Open Data

AI Search

AI Summary

OCR PDF

Versioning

Komentar Kajian

Bookmark

Favorite

Email Notification

API Publik

18. Tech Architecture

Jelaskan arsitektur aplikasi menggunakan Laravel + Vue + PostgreSQL + REST API + Inertia.js.

Gunakan Service Layer, Repository Pattern (bila diperlukan), Form Request Validation, Policy, Observer, Event & Listener, Queue, Cache, Storage, serta ikuti best practice Laravel terbaru.