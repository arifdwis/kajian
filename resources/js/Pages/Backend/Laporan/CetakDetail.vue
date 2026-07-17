<script setup>
import { onMounted } from 'vue';
import { Head } from '@inertiajs/vue3';

const props = defineProps({
 kajian: Object,
});

onMounted(() => {
 // Automatically trigger browser print dialog shortly after loading
 setTimeout(() => {
 window.print();
 }, 800);
});

const getFileUrl = (type) => {
 if (!props.kajian.files) return null;
 const file = props.kajian.files.find(f => f.tipe === type);
 return file ? `/storage/${file.file_path}` : null;
};
</script>

<template>
 <Head :title="'Cetak - ' + kajian.judul" />
 
 <div class="min-h-screen bg-paper text-black p-8 max-w-4xl mx-auto print:p-0 font-serif leading-relaxed">
 <!-- Floating controller for screen view -->
 <div class="mb-6 p-4 bg-paper-2 border border-slate-200 rounded-card flex justify-between items-center print:hidden">
 <span class="text-xs font-sans text-slate-500 font-medium">Pratinjau Cetak Dokumen Kajian</span>
 <button 
 @click="window.print()"
 class="px-4 py-2 bg-accent text-accent-ink font-sans font-bold text-xs rounded-sm transition-all "
 >
 Cetak Dokumen (Ctrl+P)
 </button>
 </div>

 <!-- Official Kop Surat Bapperida -->
 <div class="text-center border-b-4 border-double border-black pb-4 mb-6">
 <h2 class="text-lg font-bold uppercase font-sans">PEMERINTAH KOTA SAMARINDA</h2>
 <h1 class="text-xl font-semibold uppercase font-sans tracking-tight">BADAN PERENCANAAN PEMBANGUNAN, RISET DAN INOVASI DAERAH</h1>
 <p class="text-xs font-sans text-slate-500 mt-1">
 Jl. Dahlia No. 4, Bugis, Kec. Samarinda Kota, Kota Samarinda, Kalimantan Timur 75121
 </p>
 </div>

 <!-- Document Title -->
 <div class="text-center space-y-2 mb-8">
 <h3 class="text-base font-bold uppercase underline font-sans">DOKUMEN REKAPITULASI KAJIAN ILMIAH</h3>
 <p class="text-xs font-sans font-semibold text-slate-500">Nomor Registrasi: SIKAJIAN/{{ kajian.uuid.substring(0, 8).toUpperCase() }}/{{ kajian.tahun?.tahun }}</p>
 </div>

 <!-- Technical Metadata -->
 <table class="w-full text-sm border-collapse border border-slate-300 mb-8 font-sans">
 <tbody>
 <tr>
 <td class="border border-slate-300 px-4 py-2 font-bold w-1/3 bg-paper-2">Judul Penelitian / Kajian</td>
 <td class="border border-slate-300 px-4 py-2 text-justify">{{ kajian.judul }}</td>
 </tr>
 <tr>
 <td class="border border-slate-300 px-4 py-2 font-bold bg-paper-2">Rumpun Bidang Bapperida</td>
 <td class="border border-slate-300 px-4 py-2">{{ kajian.bidang?.nama }}</td>
 </tr>
 <tr>
 <td class="border border-slate-300 px-4 py-2 font-bold bg-paper-2">Jenis Kajian</td>
 <td class="border border-slate-300 px-4 py-2">{{ kajian.jenis_kajian?.nama }}</td>
 </tr>
 <tr>
 <td class="border border-slate-300 px-4 py-2 font-bold bg-paper-2">Tahun Pelaksanaan</td>
 <td class="border border-slate-300 px-4 py-2">{{ kajian.tahun?.tahun }}</td>
 </tr>
 <tr>
 <td class="border border-slate-300 px-4 py-2 font-bold bg-paper-2">Penanggung Jawab</td>
 <td class="border border-slate-300 px-4 py-2">{{ kajian.penanggung_jawab || '-' }}</td>
 </tr>
 <tr>
 <td class="border border-slate-300 px-4 py-2 font-bold bg-paper-2">Mitra Kerja / Pihak Ketiga</td>
 <td class="border border-slate-300 px-4 py-2">{{ kajian.mitra || '-' }}</td>
 </tr>
 <tr>
 <td class="border border-slate-300 px-4 py-2 font-bold bg-paper-2">Lokasi Kajian</td>
 <td class="border border-slate-300 px-4 py-2">{{ kajian.lokasi || '-' }}</td>
 </tr>
 </tbody>
 </table>

 <!-- Substantive Sections -->
 <div class="space-y-6 text-sm text-justify">
 <!-- 1. Ringkasan -->
 <div v-if="kajian.ringkasan" class="space-y-2">
 <h4 class="font-bold border-b border-black pb-1 uppercase font-sans text-xs tracking-wider">I. Ringkasan Eksekutif (Abstrak)</h4>
 <p class="indent-8 leading-relaxed">{{ kajian.ringkasan }}</p>
 </div>

 <!-- 2. Tujuan -->
 <div v-if="kajian.tujuan" class="space-y-2">
 <h4 class="font-bold border-b border-black pb-1 uppercase font-sans text-xs tracking-wider">II. Tujuan Kajian</h4>
 <p class="indent-8 leading-relaxed">{{ kajian.tujuan }}</p>
 </div>

 <!-- 3. Latar Belakang -->
 <div v-if="kajian.latar_belakang" class="space-y-2">
 <h4 class="font-bold border-b border-black pb-1 uppercase font-sans text-xs tracking-wider">III. Latar Belakang Masalah</h4>
 <p class="indent-8 leading-relaxed">{{ kajian.latar_belakang }}</p>
 </div>

 <!-- 4. Metodologi -->
 <div v-if="kajian.metodologi" class="space-y-2">
 <h4 class="font-bold border-b border-black pb-1 uppercase font-sans text-xs tracking-wider">IV. Metodologi Penelitian</h4>
 <p class="indent-8 leading-relaxed">{{ kajian.metodologi }}</p>
 </div>

 <!-- 5. Temuan Utama -->
 <div v-if="kajian.temuan" class="space-y-2">
 <h4 class="font-bold border-b border-black pb-1 uppercase font-sans text-xs tracking-wider">V. Temuan Utama (Hasil Kajian)</h4>
 <p class="indent-8 leading-relaxed">{{ kajian.temuan }}</p>
 </div>

 <!-- 6. Rekomendasi -->
 <div v-if="kajian.rekomendasi" class="space-y-2">
 <h4 class="font-bold border-b border-black pb-1 uppercase font-sans text-xs tracking-wider">VI. Rekomendasi Kebijakan</h4>
 <p class="indent-8 leading-relaxed">{{ kajian.rekomendasi }}</p>
 </div>
 </div>

 <!-- Signature Page / Footer print -->
 <div class="mt-12 pt-8 flex justify-end text-sm font-sans print:break-inside-avoid">
 <div class="w-64 text-center space-y-16">
 <div>
 <p>Samarinda, {{ new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) }}</p>
 <p class="font-semibold mt-1">Kepala BAPPERIDA Kota Samarinda</p>
 </div>
 <div>
 <p class="font-bold underline uppercase">BAPPERIDA SAMARINDA</p>
 <p class="text-xs text-slate-500">NIP. ————————————————</p>
 </div>
 </div>
 </div>
 </div>
</template>

<style>
@media print {
 body {
 background-color: white !important;
 color: black !important;
 }
 .print\:p-0 {
 padding: 0 !important;
 }
 .print\:hidden {
 display: none !important;
 }
 .print\:break-inside-avoid {
 break-inside: avoid !important;
 }
}
</style>
