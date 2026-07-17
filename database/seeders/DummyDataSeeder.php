<?php

namespace Database\Seeders;

use App\Models\Kajian;
use App\Models\KajianFile;
use App\Models\Keyword;
use App\Models\User;
use App\Models\ViewLog;
use App\Models\DownloadLog;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DummyDataSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::where('email', 'admin@mail.com')->first();
        if (!$admin) return;

        $keywords = [
            'Kebijakan Publik', 'Tata Kelola', 'Inovasi Daerah', 'Pembangunan Berkelanjutan',
            'Digitalisasi Pemerintahan', 'Kualitas Pelayanan', 'Infrastruktur Kota',
            'Ekonomi Kreatif', 'UMKM', 'Pariwisata', 'Sumber Daya Alam',
            'Lingkungan Hidup', 'Perubahan Iklim', 'Pengelolaan Sampah',
            'SDGs', 'Pendidikan', 'Kesehatan Masyarakat', 'Kemiskinan',
            'Kependudukan', 'Gender', 'Anggaran Daerah', 'Pajak Daerah',
            'Transportasi', 'Tata Ruang', 'Sosial Budaya', 'Ketahanan Pangan',
            'Energi Terbarukan', 'Smart City', 'SPBE', 'Partisipasi Masyarakat',
        ];

        foreach ($keywords as $nama) {
            Keyword::firstOrCreate(
                ['slug' => Str::slug($nama)],
                ['nama' => $nama, 'slug' => Str::slug($nama)]
            );
        }

        $keywordIds = Keyword::pluck('id')->toArray();

        $kajians = [
            [
                'judul' => 'Analisis Efektivitas Implementasi SPBE dalam Meningkatkan Kualitas Pelayanan Publik di Kota Samarinda',
                'ringkasan' => 'Penelitian ini mengkaji tingkat kematangan SPBE pada seluruh perangkat daerah di Kota Samarinda, mengidentifikasi hambatan implementasi, dan merumuskan rekomendasi strategis untuk percepatan transformasi digital pemerintahan daerah.',
                'tujuan' => 'Menganalisis tingkat implementasi SPBE di 40 OPD Kota Samarinda dan menyusun peta jalan akselerasi digitalisasi pelayanan publik.',
                'latar_belakang' => 'Perpres No. 95/2018 tentang SPBE mendorong seluruh institusi pemerintahan untuk bertransformasi digital. Namun implementasi di Kota Samarinda masih menghadapi berbagai tantangan interoperabilitas dan sumber daya.',
                'metodologi' => 'Mixed-method dengan survei kuantitatif ke 40 OPD dan wawancara mendalam bersama 10 key informan dari Dinkominfo, Bapperida, dan Inspektorat.',
                'temuan' => 'Rata-rata indeks SPBE Kota Samarinda berada di angka 2,84 dari 5,00. Tiga domain dengan skor terendah adalah layanan terpadu, kebijakan internal, dan pengelolaan data.',
                'rekomendasi' => 'Perlu pembentukan tim koordinasi SPBE tingkat kota, penyusunan master plan arsitektur data, dan penguatan kapasitas SDM TIK di setiap OPD.',
                'bidang_id' => 4, 'jenis_id' => 1, 'tahun_id' => 7, 'penanggung_jawab' => 'Kepala Bapperida',
                'mitra' => 'Dinkominfo Kota Samarinda', 'status' => 'published',
            ],
            [
                'judul' => 'Studi Potensi dan Strategi Pengembangan UMKM Berbasis Ekonomi Kreatif di Kawasan Tepian Sungai Mahakam',
                'ringkasan' => 'Mengidentifikasi potensi UMKM ekonomi kreatif di bantaran Sungai Mahakam Kota Samarinda dan merumuskan strategi pengembangan berbasis kearifan lokal dan akses pasar digital.',
                'tujuan' => 'Memetakan potensi 200 UMKM kreatif di 5 kecamatan bantaran sungai dan menyusun model pengembangan klaster ekonomi kreatif.',
                'latar_belakang' => 'Sungai Mahakam sebagai ikon kota memiliki potensi wisata dan ekonomi yang belum dioptimalkan. UMKM di kawasan ini tumbuh sporadis tanpa pendampingan terstruktur.',
                'metodologi' => 'Survei lapangan, FGD, dan analisis价值链 (value chain) pada 200 responden UMKM di Kecamatan Samarinda Kota, Sambutan, dan Sungai Pinang.',
                'temuan' => '87% UMKM masih menggunakan pemasaran konvensional. Potensi produk unggulan meliputi anyaman purun, amplang, batik Samarinda, dan kopi lokal.',
                'rekomendasi' => 'Pembentukan sentra ekonomi kreatif terpadu, pelatihan digital marketing massal, dan kemitraan marketplace nasional.',
                'bidang_id' => 2, 'jenis_id' => 2, 'tahun_id' => 7, 'penanggung_jawab' => 'Kabid Ekonomi Kreatif',
                'mitra' => 'Dispora, Disperindag', 'status' => 'published',
            ],
            [
                'judul' => 'Evaluasi Dampak Program Kota Layak Anak terhadap Kesejahteraan Anak di Samarinda',
                'ringkasan' => 'Evaluasi komprehensif implementasi kebijakan Kota Layak Anak (KLA) di Kota Samarinda dan dampaknya terhadap indikator kesejahteraan anak lima tahun terakhir.',
                'tujuan' => 'Mengukur capaian 5 klaster KLA dan memberikan rekomendasi untuk mencapai predikat KLA Utama.',
                'latar_belakang' => 'Samarinda telah mencanangkan KLA sejak 2019. Namun indikator partisipasi anak dan perlindungan khusus masih memerlukan perhatian intensif.',
                'metodologi' => 'Analisis data sekunder dari 23 indikator KLA dan survei terhadap 400 anak dan remaja di 10 kecamatan.',
                'temuan' => 'Skor KLA Samarinda mencapai 780 (Kategori Madya). Indikator terendah pada klaster perlindungan khusus dan partisipasi anak.',
                'rekomendasi' => 'Penguatan forum anak kecamatan, pembentukan unit PPA di seluruh kelurahan, dan integrasi data anak terpadu.',
                'bidang_id' => 1, 'jenis_id' => 3, 'tahun_id' => 6, 'penanggung_jawab' => 'Kabid Pembangunan Manusia',
                'mitra' => 'DP2KBP2PA, Dinas Pendidikan', 'status' => 'published',
            ],
            [
                'judul' => 'Kajian Kesiapan Infrastruktur dan Sumber Daya dalam Mendukung Ibu Kota Nusantara (IKN) dari Perspektif Samarinda',
                'ringkasan' => 'Menganalisis dampak dan kesiapan infrastruktur pendukung Kota Samarinda sebagai daerah penyangga IKN, mencakup transportasi, logistik, SDM, dan sektor jasa.',
                'tujuan' => 'Memetakan gap infrastruktur dan kapasitas daerah yang perlu dipenuhi Samarinda untuk optimal sebagai penyangga IKN.',
                'latar_belakang' => 'Pemindahan IKN ke Kaltim membawa dampak signifikan bagi Samarinda sebagai kota terdekat dengan infrastruktur paling lengkap. Diperlukan perencanaan adaptif.',
                'metodologi' => 'Analisis spasial, wawancara ahli, dan simulasi ekonomi menggunakan model input-output.',
                'temuan' => 'Kesenjangan terbesar ada pada kapasitas bandara (hanya 1,2 juta pax/tahun), ketersediaan hotel bintang 4+, dan jaringan air bersih.',
                'rekomendasi' => 'Percepatan pembangunan Samarinda Seberang, integrasi transportasi publik, dan pengembangan SDM sektor jasa dan perhotelan.',
                'bidang_id' => 3, 'jenis_id' => 1, 'tahun_id' => 7, 'penanggung_jawab' => 'Kepala Bapperida',
                'mitra' => 'Bappeda Kaltim, Dishub, PUPR', 'status' => 'published',
            ],
            [
                'judul' => 'Analisis Kualitas Pelayanan Kesehatan di Puskesmas Se-Kota Samarinda (2023-2025)',
                'ringkasan' => 'Penelitian ini mengevaluasi kualitas pelayanan di 22 puskesmas se-Kota Samarinda berdasarkan dimensi ServQual dan kepuasan pasien JKN.',
                'tujuan' => 'Menyusun peta mutu pelayanan puskesmas dan rekomendasi prioritas perbaikan berdasarkan gap harapan-persepsi pasien.',
                'latar_belakang' => 'Meskipun cakupan JKN di Samarinda mencapai 83%, angka kepuasan pasien puskesmas masih fluktuatif dan banyak keluhan terkait waktu tunggu.',
                'metodologi' => 'Survei kepuasan 1.100 responden pasien puskesmas menggunakan instrumen ServQual modifikasi dan mutu SPM bidang kesehatan.',
                'temuan' => 'Dimensi dengan gap terbesar: responsiveness (-0,87) dan assurance (-0,72). Puskesmas dengan nilai terbaik adalah Puskesmas Sempaja dan Palaran.',
                'rekomendasi' => 'Digitalisasi antrean puskesmas, penambahan tenaga dokter spesialis dasar, dan penguatan sistem rujukan berjenjang.',
                'bidang_id' => 1, 'jenis_id' => 2, 'tahun_id' => 6, 'penanggung_jawab' => 'Kabid Kesehatan',
                'mitra' => 'Dinas Kesehatan, BPJS Kesehatan', 'status' => 'published',
            ],
            [
                'judul' => 'Strategi Pengelolaan Sampah Perkotaan Menuju Zero Waste City di Kota Samarinda',
                'ringkasan' => 'Mengkaji sistem pengelolaan sampah eksisting dan merumuskan strategi bertahap menuju kota bebas sampah dengan pendekatan ekonomi sirkular.',
                'tujuan' => 'Merancang peta jalan 10 tahun transformasi pengelolaan sampah Samarinda dari linear ke ekonomi sirkular.',
                'latar_belakang' => 'Volume sampah Samarinda mencapai 650 ton/hari dengan TPA hanya mampu menampung hingga 2028. Tingkat daur ulang masih di bawah 15%.',
                'metodologi' => 'Analisis timbulan dan komposisi sampah, studi praktik baik kota zero waste nasional, dan pemodelan finansial opsi pengolahan.',
                'temuan' => '63% sampah Samarinda adalah organik. Sampah plastik menyumbang 18%. Potensi reduksi TPA mencapai 45% dengan pemilahan dari sumber.',
                'rekomendasi' => 'Pembangunan TPS 3R di setiap kecamatan, insentif pemilahan rumah tangga, dan kemitraan dengan bank sampah dan industri daur ulang.',
                'bidang_id' => 2, 'jenis_id' => 5, 'tahun_id' => 7, 'penanggung_jawab' => 'Kadis LH',
                'mitra' => 'DLH Kota Samarinda, Dinas PUPR', 'status' => 'published',
            ],
            [
                'judul' => 'Policy Brief: Optimalisasi Penerimaan Pajak Daerah melalui Digitalisasi dan Ekstensifikasi',
                'ringkasan' => 'Rekomendasi kebijakan singkat untuk meningkatkan PAD Kota Samarinda melalui optimalisasi penerimaan pajak daerah dengan digitalisasi dan perluasan basis wajib pajak.',
                'tujuan' => 'Menyediakan opsi kebijakan konkret untuk meningkatkan rasio pajak daerah terhadap PAD dari 23% menjadi 30% dalam 3 tahun.',
                'latar_belakang' => 'PAD Samarinda masih sangat bergantung pada dana transfer pusat. Potensi pajak daerah yang belumtergali diperkirakan mencapai 40%.',
                'metodologi' => 'Analisis data realisasi pajak 5 tahun, benchmarking dengan kota-kota sejenis, dan wawancara dengan Bapenda.',
                'temuan' => 'Tiga pajak dengan celah terbesar: PBJT (35%), PBB-P2 (28%), dan BPHTB (22%). Digitalisasi meningkatkan kepatuhan 2,5 kali lipat.',
                'rekomendasi' => 'Peluncuran superapps pajak daerah, integrasi data Samsat dan BPN, serta relaksasi pokok ketetapan untuk wajib pajak baru.',
                'bidang_id' => 2, 'jenis_id' => 4, 'tahun_id' => 7, 'penanggung_jawab' => 'Kepala Bapenda',
                'mitra' => 'Bapenda, BKAD, KPP Pratama', 'status' => 'published',
            ],
            [
                'judul' => 'Mapping dan Analisis Ketahanan Pangan Rumah Tangga Miskin di Wilayah Pinggiran Kota Samarinda',
                'ringkasan' => 'Pemetaan kerentanan pangan rumah tangga miskin di 5 kelurahan pinggiran dan rekomendasi intervensi tepat sasaran berbasis data spasial.',
                'tujuan' => 'Menyusun peta kerentanan pangan tingkat kelurahan sebagai dasar penentuan prioritas intervensi.',
                'latar_belakang' => 'Indeks ketahanan pangan Samarinda masih di peringkat ke-7 dari 10 kota di Kaltim. Akses pangan di wilayah pinggiran menjadi perhatian utama.',
                'metodologi' => 'Survei 500 rumah tangga miskin, analisis Food Consumption Score, dan pemetaan jarak akses ke pasar dan fasilitas pangan.',
                'temuan' => '3 kelurahan (Loa Buah, Sungai Siring, dan Karang Anyar) masuk kategori rawan pangan. Rata-rata pengeluaran pangan mencapai 68% dari total belanja.',
                'rekomendasi' => 'Pengembangan lumbung pangan kelurahan, optimalisasi pekarangan melalui program KRPL, dan bantuan pangan non-tunai yang diperluas.',
                'bidang_id' => 1, 'jenis_id' => 2, 'tahun_id' => 6, 'penanggung_jawab' => 'Kabid Pangan',
                'mitra' => 'Dinas Pangan, Dinas Pertanian, BPS', 'status' => 'published',
            ],
            [
                'judul' => 'Evaluasi Penyerapan Anggaran dan Kualitas Belanja Daerah Pemerintah Kota Samarinda',
                'ringkasan' => 'Analisis komprehensif terhadap efektivitas penyerapan anggaran dan kualitas belanja daerah Pemerintah Kota Samarinda selama lima tahun anggaran terakhir.',
                'tujuan' => 'Mengidentifikasi pola belanja tidak efisien dan menyusun rekomendasi perbaikan tata kelola keuangan daerah.',
                'latar_belakang' => 'Penyerapan anggaran Samarinda dalam 5 tahun terakhir rata-rata 82%, dengan konsentrasi belanja tinggi di triwulan IV dan banyaknya sisa lebih pembiayaan.',
                'metodologi' => 'Analisis rasio keuangan daerah, regresi penyerapan, dan analisis kualitatif terhadap 15 perangkat daerah dengan tingkat penyerapan terendah.',
                'temuan' => 'Belanja barang dan jasa mendominasi (44%). Terdapat 23 OPD dengan penyerapan di bawah 75%. E-procurement efektif menekan markup.',
                'rekomendasi' => 'Penerapan cash management system, penguatan perencanaan pengadaan, dan evaluasi kinerja triwulanan berbasis output.',
                'bidang_id' => 2, 'jenis_id' => 3, 'tahun_id' => 6, 'penanggung_jawab' => 'Kepala BKAD',
                'mitra' => 'BKAD, Inspektorat, Bapperida', 'status' => 'published',
            ],
            [
                'judul' => 'Studi Kelayakan Pengembangan Transportasi Publik Berbasis Sungai sebagai Alternatif Mobilitas Perkotaan Samarinda',
                'ringkasan' => 'Analisis kelayakan teknis, ekonomi, dan sosial pengembangan angkutan sungai sebagai moda transportasi publik alternatif untuk mengurangi kemacetan di Samarinda.',
                'tujuan' => 'Menentukan kelayakan integrasi angkutan sungai dalam sistem transportasi publik perkotaan Samarinda.',
                'latar_belakang' => 'Kemacetan di Samarinda meningkat 12% per tahun. Sungai Mahakam yang membelah kota belum dioptimalkan sebagai jalur transportasi publik.',
                'metodologi' => 'Studi origin-destination, analisis hidrologi sungai, proyeksi demand, dan analisis biaya-manfaat sosial.',
                'temuan' => 'Potensi demand angkutan sungai: 4.500 penumpang/hari pada rute Pasar Pagi – Sempaja. Investasi awal Rp 85 miliar dengan B/C ratio 1,8.',
                'rekomendasi' => 'Pembangunan 6 dermaga terintegrasi dengan BRT, subsidi PSO 5 tahun pertama, dan pengembangan kawasan TOD di titik transit.',
                'bidang_id' => 3, 'jenis_id' => 2, 'tahun_id' => 7, 'penanggung_jawab' => 'Kadishub',
                'mitra' => 'Dishub, PUPR, Bappeda Kaltim', 'status' => 'published',
            ],
            [
                'judul' => 'Analisis Spasial Tingkat Kerentanan Banjir dan Strategi Mitigasi di Kota Samarinda',
                'ringkasan' => 'Pemetaan tingkat kerentanan banjir berbasis SIG di seluruh kelurahan Kota Samarinda dan perumusan strategi mitigasi struktural dan non-struktural.',
                'tujuan' => 'Menyusun peta kerentanan banjir skala 1:25.000 dan prioritas aksi mitigasi berdasarkan tingkat urgensi.',
                'latar_belakang' => 'Samarinda mengalami banjir tahunan dengan frekuensi meningkat. 12 kelurahan teridentifikasi sebagai zona rawan banjir tinggi.',
                'metodologi' => 'Analisis multi-kriteria berbasis SIG dengan parameter curah hujan, elevasi, kemiringan lereng, tutupan lahan, dan jarak sungai.',
                'temuan' => '21 kelurahan masuk zona kerentanan tinggi, 18 sedang, dan 11 rendah. Faktor dominan: drainase perkotaan (38%) dan alih fungsi lahan (27%).',
                'rekomendasi' => 'Normalisasi sungai, pembangunan embung retensi di hulu, penerapan biopori massal, dan revisi RTRW dengan memperhitungkan risiko banjir.',
                'bidang_id' => 3, 'jenis_id' => 2, 'tahun_id' => 6, 'penanggung_jawab' => 'Kepala BPBD',
                'mitra' => 'BPBD, DLH, PUPR, Bappeda', 'status' => 'published',
            ],
            [
                'judul' => 'Kajian Pengembangan Wisata Halal sebagai Sektor Unggulan Pariwisata Kota Samarinda',
                'ringkasan' => 'Mengidentifikasi potensi dan menyusun strategi pengembangan wisata halal di Kota Samarinda sebagai sektor unggulan baru pariwisata daerah.',
                'tujuan' => 'Memetakan potensi destinasi wisata halal dan menyusun roadmap menuju Samarinda sebagai destinasi wisata halal utama di Kaltim.',
                'latar_belakang' => 'Wisata halal nasional tumbuh 18% per tahun. Samarinda memiliki potensi wisata kuliner halal, sungai, dan budaya Islami yang belum terkelola optimal.',
                'metodologi' => 'Penilaian kesesuaian 25 destinasi terhadap standar wisata halal (MUI/GI-10) dan survei preferensi 400 wisatawan Nusantara.',
                'temuan' => '7 destinasi potensial memenuhi syarat pengembangan wisata halal. Wisata kuliner menempati peringkat pertama minat wisatawan (68%).',
                'rekomendasi' => 'Sertifikasi halal massal untuk UMKM kuliner, pengembangan paket wisata religi terpadu, dan promosi tematik berbasis digital.',
                'bidang_id' => 2, 'jenis_id' => 5, 'tahun_id' => 7, 'penanggung_jawab' => 'Kabid Pariwisata',
                'mitra' => 'Disporapar, MUI Samarinda, PHRI', 'status' => 'published',
            ],
            [
                'judul' => 'Analisis Kesenjangan Gender dalam Partisipasi Angkatan Kerja di Kota Samarinda',
                'ringkasan' => 'Menganalisis faktor-faktor yang mempengaruhi kesenjangan partisipasi angkatan kerja antara laki-laki dan perempuan di Kota Samarinda.',
                'tujuan' => 'Mengidentifikasi determinan utama kesenjangan gender dan merumuskan rekomendasi kebijakan afirmatif.',
                'latar_belakang' => 'TPAK perempuan di Samarinda (49,8%) masih tertinggal signifikan dibanding laki-laki (81,2%). Kesenjangan ini tidak mengecil dalam satu dekade.',
                'metodologi' => 'Analisis regresi logistik biner data Sakernas 2020-2024 dan FGD bersama 40 perempuan pekerja dan pencari kerja.',
                'temuan' => 'Faktor dominan: beban kerja rumah tangga (odds ratio 3,2), tingkat pendidikan (OR 2,8), dan akses transportasi (OR 1,9).',
                'rekomendasi' => 'Pengembangan program padat karya perempuan, insentif perusahaan dengan kesetaraan gender, dan perluasan akses daycare terjangkau.',
                'bidang_id' => 1, 'jenis_id' => 5, 'tahun_id' => 6, 'penanggung_jawab' => 'Kabid Pemberdayaan Perempuan',
                'mitra' => 'DP2KBP2PA, Disnaker, BPS', 'status' => 'published',
            ],
            [
                'judul' => 'Rencana Aksi Daerah Percepatan Penurunan Stunting Terintegrasi Kota Samarinda',
                'ringkasan' => 'Evaluasi implementasi Rencana Aksi Daerah (RAD) percepatan penurunan stunting dan penyusunan strategi konvergensi antar OPD di Kota Samarinda.',
                'tujuan' => 'Menyusun RAD stunting terintegrasi dengan target prevalensi turun dari 22,4% menjadi 14% pada 2026.',
                'latar_belakang' => 'Prevalensi stunting Samarinda (22,4%) masih di atas target nasional (14%). Intervensi masih berjalan sendiri-sendiri antar OPD.',
                'metodologi' => 'Analisis data SSGI, mapping program 15 OPD terkait, dan asesmen konvergensi di 10 desa/kelurahan lokus stunting.',
                'temuan' => 'Lokus prioritas: 5 kelurahan dengan prevalensi >30%. Intervensi gizi spesifik hanya mencapai 34% dari target. Konvergensi anggaran masih lemah.',
                'rekomendasi' => 'Pembentukan posko stunting kelurahan, integrasi data e-stunting, dan alokasi DAK tematik untuk intervensi gizi di lokus prioritas.',
                'bidang_id' => 1, 'jenis_id' => 1, 'tahun_id' => 7, 'penanggung_jawab' => 'Sekda Kota Samarinda',
                'mitra' => 'Dinas Kesehatan, DP2KBP2PA, Dinsos, Bappeda', 'status' => 'published',
            ],
            [
                'judul' => 'Policy Brief: Digitalisasi Layanan Perizinan Bermodal Risiko Rendah melalui OSS-RBA di Kota Samarinda',
                'ringkasan' => 'Rekomendasi kebijakan untuk optimalisasi OSS-RBA dalam percepatan perizinan berusaha dan dampaknya terhadap iklim investasi Kota Samarinda.',
                'tujuan' => 'Menyediakan rekomendasi berbasis data untuk meningkatkan efektivitas OSS-RBA di Kota Samarinda.',
                'latar_belakang' => 'Implementasi PP 5/2021 tentang penyelenggaraan perizinan berusaha berbasis risiko masih menghadapi kendala teknis dan koordinasi di tingkat daerah.',
                'metodologi' => 'Analisis database OSS-RBA, survei kepuasan 150 pelaku usaha, dan wawancara dengan DPMPTSP.',
                'temuan' => 'Rata-rata waktu penyelesaian perizinan: 5,2 hari (masih di atas SPM 3 hari). 28% pemohon mengalami kendala verifikasi dokumen digital.',
                'rekomendasi' => 'Pembentukan helpdesk OSS-RBA terintegrasi, validasi data spasial otomatis, dan insentif fiskal untuk usaha berizin.',
                'bidang_id' => 2, 'jenis_id' => 4, 'tahun_id' => 6, 'penanggung_jawab' => 'Kepala DPMPTSP',
                'mitra' => 'DPMPTSP, BKAD, Dinkominfo', 'status' => 'published',
            ],
            [
                'judul' => 'Studi Baseline Indeks Pembangunan Teknologi Informasi dan Komunikasi (IP-TIK) Kota Samarinda',
                'ringkasan' => 'Pengukuran baseline indeks pembangunan TIK Kota Samarinda sebagai acuan perencanaan dan evaluasi program digitalisasi daerah.',
                'tujuan' => 'Menghitung IP-TIK Samarinda menggunakan kerangka ITU dan menyusun rekomendasi prioritas pengembangan TIK daerah.',
                'latar_belakang' => 'IP-TIK Kaltim (5,82 dari 10) masih di bawah rata-rata nasional (5,99). Data baseline tingkat kota belum tersedia secara akurat.',
                'metodologi' => 'Survei 1.200 rumah tangga dan 60 instansi menggunakan instrumen IP-TIK BPS, dilengkapi data sekunder dari BPS dan Kominfo.',
                'temuan' => 'IP-TIK Samarinda: 6,21 (akses 7,84; infrastruktur 5,45; pemanfaatan 5,02). Kesenjangan digital antar kecamatan cukup lebar.',
                'rekomendasi' => 'Percepatan pembangunan BTS di 3 kecamatan blank spot, pengadaan perangkat TIK sekolah, dan literasi digital massal untuk lansia.',
                'bidang_id' => 4, 'jenis_id' => 2, 'tahun_id' => 7, 'penanggung_jawab' => 'Kadiskominfo',
                'mitra' => 'Dinkominfo, BPS, Kemkominfo', 'status' => 'published',
            ],
        ];

        $keywordPool = Keyword::pluck('id')->toArray();

        foreach ($kajians as $i => $data) {
            $slug = Str::slug($data['judul']);
            $kajian = Kajian::firstOrCreate(
                ['slug' => $slug],
                array_merge($data, [
                    'uuid' => (string) Str::uuid(),
                    'slug' => $slug,
                    'koordinator' => json_encode([
                        'nama' => fake()->name(),
                        'email' => fake()->email(),
                    ]),
                    'tim' => json_encode([
                        ['nama' => fake()->name(), 'peran' => 'Peneliti Utama'],
                        ['nama' => fake()->name(), 'peran' => 'Peneliti Madya'],
                        ['nama' => fake()->name(), 'peran' => 'Asisten Peneliti'],
                    ]),
                    'created_by' => $admin->id,
                    'updated_by' => $admin->id,
                    'published_at' => now()->subDays(rand(1, 365)),
                    'view_count' => 0,
                    'download_count' => 0,
                ])
            );

            $numKeywords = rand(3, 6);
            $selected = array_rand(array_flip($keywordPool), $numKeywords);
            $kajian->keywords()->syncWithoutDetaching((array) $selected);

            // Generate real ViewLog entries
            $viewCount = rand(8, 120);
            for ($v = 0; $v < $viewCount; $v++) {
                ViewLog::create([
                    'user_id' => null,
                    'kajian_id' => $kajian->id,
                    'ip_address' => fake()->ipv4(),
                    'user_agent' => fake()->userAgent(),
                    'created_at' => fake()->dateTimeBetween('-6 months', 'now'),
                ]);
            }

            // Generate real DownloadLog entries
            $downloadCount = rand(2, 60);
            for ($d = 0; $d < $downloadCount; $d++) {
                DownloadLog::create([
                    'user_id' => null,
                    'kajian_id' => $kajian->id,
                    'ip_address' => fake()->ipv4(),
                    'user_agent' => fake()->userAgent(),
                    'created_at' => fake()->dateTimeBetween('-6 months', 'now'),
                ]);
            }

            // Sync counters from logs
            $kajian->update([
                'view_count' => $kajian->viewLogs()->count(),
                'download_count' => $kajian->downloadLogs()->count(),
            ]);

            if ($i % 3 === 0) {
                KajianFile::firstOrCreate(
                    ['kajian_id' => $kajian->id, 'tipe' => 'pdf'],
                    [
                        'uuid' => (string) Str::uuid(),
                        'file_path' => 'kajian/dummy/laporan-' . $kajian->id . '.pdf',
                        'file_name' => 'Laporan_' . Str::slug($data['judul'], '_') . '.pdf',
                        'file_size' => rand(500000, 5000000),
                        'mime_type' => 'application/pdf',
                        'uploaded_by' => $admin->id,
                    ]
                );
                KajianFile::firstOrCreate(
                    ['kajian_id' => $kajian->id, 'tipe' => 'presentasi'],
                    [
                        'uuid' => (string) Str::uuid(),
                        'file_path' => 'kajian/dummy/slide-' . $kajian->id . '.pptx',
                        'file_name' => 'Slide_' . Str::slug($data['judul'], '_') . '.pptx',
                        'file_size' => rand(1000000, 8000000),
                        'mime_type' => 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                        'uploaded_by' => $admin->id,
                    ]
                );
            }
        }

        $this->command->info('Dummy data seeded: ' . count($kajians) . ' kajian, ' . count($keywords) . ' keywords.');
    }
}
