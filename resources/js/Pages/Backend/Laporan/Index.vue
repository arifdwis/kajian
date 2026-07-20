<script setup>
import { ref, computed } from 'vue';
import { Head, Link, router } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';

const props = defineProps({
 data: Array,
 summary: Object,
 filters: Object,
 bidangs: Array,
 jenisKajians: Array,
 tahuns: Array,
});

const search = ref(props.filters.search || '');
const bidang_id = ref(props.filters.bidang_id || '');
const jenis_id = ref(props.filters.jenis_id || '');
const tahun_id = ref(props.filters.tahun_id || '');

const bidangOptions = computed(() => [{ label: 'Semua Bidang', value: '' }, ...props.bidangs.map(b => ({ label: b.nama, value: b.id }))]);
const jenisOptions = computed(() => [{ label: 'Semua Jenis', value: '' }, ...props.jenisKajians.map(j => ({ label: j.nama, value: j.id }))]);
const tahunOptions = computed(() => [{ label: 'Semua Tahun', value: '' }, ...props.tahuns.map(t => ({ label: t.tahun, value: t.id }))]);

const handleFilter = () => {
 router.get(route('laporan.index'), {
 search: search.value,
 bidang_id: bidang_id.value,
 jenis_id: jenis_id.value,
 tahun_id: tahun_id.value,
 }, {
 preserveState: true,
 preserveScroll: true,
 });
};

const resetFilter = () => {
 search.value = '';
 bidang_id.value = '';
 jenis_id.value = '';
 tahun_id.value = '';
 handleFilter();
};

const exportExcel = () => {
 const params = new URLSearchParams({
 search: search.value,
 bidang_id: bidang_id.value,
 jenis_id: jenis_id.value,
 tahun_id: tahun_id.value,
 }).toString();
 
 window.open(`${route('laporan.export.excel')}?${params}`, '_blank');
};
</script>

<template>
 <Head title="Laporan & Rekapitulasi Kajian" />
 
 <AuthenticatedLayout>
 <div class="space-y-6">
 <!-- Header banner -->
 <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700 ">
 <div>
 <h3 class="text-xl font-bold text-gray-900 dark:text-white">Laporan & Rekapitulasi Kajian</h3>
 <p class="text-xs text-gray-500 mt-1">Cetak rekapitulasi data penelitian terbit dan rekapitulasi file kajian Bapperida.</p>
 </div>
 <div class="flex gap-2">
 <Link 
 :href="route('laporan.statistik')"
 class="px-4 py-2.5 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-bold rounded-sm text-xs transition-colors duration-150 inline-flex items-center gap-1.5 border border-gray-200 dark:border-gray-600"
 >
 <Icon icon="solar:chart-square-bold" class="w-4 h-4" />
 Statistik Kajian
 </Link>
 <button 
 @click="exportExcel"
 class="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-sm text-xs transition-colors duration-150 inline-flex items-center gap-1.5 "
 >
 <Icon icon="solar:document-bold" class="w-4 h-4" />
 Export Excel
 </button>
 </div>
 </div>

 <!-- Stats metric summary row -->
 <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
 <div class="bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700 flex items-center justify-between">
 <div>
 <span class="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Kajian Terbit</span>
 <h4 class="text-2xl font-semibold text-gray-900 dark:text-white mt-1">{{ summary.total_published || 0 }}</h4>
 </div>
 <div class="p-3.5 bg-paper-2 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-card">
 <Icon icon="solar:check-square-bold" class="w-6 h-6" />
 </div>
 </div>
 <div class="bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700 flex items-center justify-between">
 <div>
 <span class="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Total Kunjungan</span>
 <h4 class="text-2xl font-semibold text-gray-900 dark:text-white mt-1">{{ summary.total_views || 0 }}</h4>
 </div>
 <div class="p-3.5 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-card">
 <Icon icon="solar:eye-bold" class="w-6 h-6" />
 </div>
 </div>
 <div class="bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700 flex items-center justify-between">
 <div>
 <span class="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Total Unduhan</span>
 <h4 class="text-2xl font-semibold text-gray-900 dark:text-white mt-1">{{ summary.total_downloads || 0 }}</h4>
 </div>
 <div class="p-3.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-card">
 <Icon icon="solar:download-bold" class="w-6 h-6" />
 </div>
 </div>
 </div>

 <!-- Filters -->
 <div class="bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700 space-y-4">
 <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
 <div>
 <label class="block text-xs font-bold text-gray-450 uppercase tracking-wider mb-2">Cari Judul</label>
 <input 
 type="text" 
 v-model="search" 
 placeholder="Kata kunci..."
 class="w-full text-xs rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5"
 @keyup.enter="handleFilter"
 />
 </div>
 <div>
 <label class="block text-xs font-bold text-gray-450 uppercase tracking-wider mb-2">Bidang</label>
 <SearchSelect
 v-model="bidang_id"
 :options="bidangOptions"
 @change="handleFilter"
 />
 </div>
 <div>
 <label class="block text-xs font-bold text-gray-450 uppercase tracking-wider mb-2">Jenis Kajian</label>
 <SearchSelect
 v-model="jenis_id"
 :options="jenisOptions"
 @change="handleFilter"
 />
 </div>
 <div>
 <label class="block text-xs font-bold text-gray-450 uppercase tracking-wider mb-2">Tahun</label>
 <SearchSelect
 v-model="tahun_id"
 :options="tahunOptions"
 @change="handleFilter"
 />
 </div>
 </div>

 <div class="flex justify-end gap-2 pt-2">
 <button 
 @click="resetFilter"
 class="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-white text-xs font-semibold rounded-sm transition-colors"
 >
 Reset Filter
 </button>
 <button 
 @click="handleFilter"
 class="px-4 py-2 bg-accent text-accent-ink text-xs font-semibold rounded-sm transition-colors"
 >
 Terapkan
 </button>
 </div>
 </div>

 <!-- List Table -->
 <div class="bg-paper dark:bg-gray-800 rounded-card border border-gray-100 dark:border-gray-700 overflow-hidden">
 <div class="overflow-x-auto">
 <table class="w-full text-left text-sm">
 <thead class="bg-gray-50/70 dark:bg-gray-900/50 text-gray-400 text-xs font-semibold uppercase tracking-wider border-b border-gray-100 dark:border-gray-700">
 <tr>
 <th class="px-6 py-4">Judul Kajian</th>
 <th class="px-6 py-4">Bidang / Jenis</th>
 <th class="px-6 py-4">Tahun</th>
 <th class="px-6 py-4">Views / Downloads</th>
 <th class="px-6 py-4 text-right">Aksi</th>
 </tr>
 </thead>
 <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
 <tr v-if="data.length === 0">
 <td colspan="5" class="px-6 py-12 text-center text-gray-400">
 Tidak ada data rekapitulasi kajian.
 </td>
 </tr>
 <tr v-for="item in data" :key="item.id" class="hover:bg-gray-50/50 dark:hover:bg-gray-800 transition-colors">
 <td class="px-6 py-4 max-w-sm truncate font-semibold text-gray-900 dark:text-white" :title="item.judul">
 {{ item.judul }}
 </td>
 <td class="px-6 py-4">
 <div class="text-xs text-gray-600 dark:text-gray-300 font-medium">{{ item.bidang?.nama }}</div>
 <div class="text-[10px] text-gray-400 mt-0.5">{{ item.jenis_kajian?.nama }}</div>
 </td>
 <td class="px-6 py-4 text-gray-500 font-medium">
 {{ item.tahun?.tahun }}
 </td>
 <td class="px-6 py-4 text-xs text-gray-500">
 <span class="flex items-center gap-3">
 <span class="flex items-center gap-1"><Icon icon="solar:eye-linear" class="w-3.5 h-3.5 text-gray-400" /> {{ item.view_count }}</span>
 <span class="flex items-center gap-1"><Icon icon="solar:download-linear" class="w-3.5 h-3.5 text-gray-400" /> {{ item.download_count }}</span>
 </span>
 </td>
 <td class="px-6 py-4 text-right">
 <Link 
 :href="route('laporan.cetak-detail', item.uuid)" 
 target="_blank"
 class="px-3 py-1.5 bg-paper-2 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-sm hover:bg-blue-100 transition-colors text-xs font-bold inline-flex items-center gap-1"
 >
 <Icon icon="solar:printer-bold" class="w-3.5 h-3.5" />
 Cetak
 </Link>
 </td>
 </tr>
 </tbody>
 </table>
 </div>
 </div>
 </div>
 </AuthenticatedLayout>
</template>
