<script setup>
import { computed } from 'vue';
import { Head, Link, usePage } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import apexchart from 'vue3-apexcharts';

const props = defineProps({
 summary: Object,
 charts: Object,
 popularKajians: Array,
 recentKajians: Array,
});

const page = usePage();
const user = computed(() => page.props.auth.user);

// Charts settings & themes
const getLineChartOptions = (categories) => ({
 chart: {
 id: 'downloads-trend-op',
 toolbar: { show: false },
 zoom: { enabled: false },
 foreColor: '#9CA3AF',
 },
 colors: ['#8B5CF6'],
 stroke: { curve: 'smooth', width: 3 },
 xaxis: { categories, axisBorder: { show: false } },
 grid: { borderColor: '#E5E7EB', strokeDashArray: 4 },
});

const getPieChartOptions = (labels) => ({
 chart: {
 id: 'jenis-dist-op',
 foreColor: '#9CA3AF',
 },
 labels,
 colors: ['#10B981', '#F59E0B', '#EF4444', '#3B82F6', '#EC4899'],
 legend: { position: 'bottom' }
});

const chartTrendData = computed(() => {
 const list = props.charts.downloads_trend || [];
 return [{
 name: 'Downloads',
 data: list.map(item => item.value)
 }];
});

const chartTrendCategories = computed(() => {
 return (props.charts.downloads_trend || []).map(item => item.label);
});

const chartJenisSeries = computed(() => {
 return (props.charts.per_jenis || []).map(item => item.value);
});

const chartJenisLabels = computed(() => {
 return (props.charts.per_jenis || []).map(item => item.label);
});
</script>

<template>
 <Head title="Dashboard Operator" />
 
 <AuthenticatedLayout>
 <div class="space-y-8">
 <!-- Top Welcome banner -->
 <div class="relative overflow-hidden from-purple-700 via-indigo-700 to-indigo-800 rounded-card p-8 text-white shadow-purple-500/10">
 <div class="absolute -right-10 -top-10 w-40 h-40 bg-paper/10 rounded-full blur-2xl"></div>
 <div class="absolute right-20 bottom-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-xl"></div>
 <div class="relative z-10 max-w-xl">
 <span class="bg-paper/10 text-white font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-full border border-white/20">
 Operator Bidang
 </span>
 <h2 class="text-3xl font-semibold mt-4">Selamat Datang, {{ user.name }}</h2>
 <p class="text-purple-100/90 text-sm mt-2 leading-relaxed">
 Kelola draf, usulan kajian baru, lampiran, dan publikasi penelitian khusus untuk Bidang Anda.
 </p>
 </div>
 </div>

 <!-- Stats Summary Cards -->
 <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
 <!-- 1. Total Kajian -->
 <div class="bg-paper dark:bg-gray-800 rounded-card p-6 border border-gray-100 dark:border-gray-700 transition-shadow">
 <div class="flex items-center justify-between">
 <div>
 <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Kajian Bidang</p>
 <h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ summary.total_kajian }}</h3>
 </div>
 <div class="p-3 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-sm">
 <Icon icon="solar:folder-open-bold" class="w-6 h-6" />
 </div>
 </div>
 </div>

 <!-- 2. Published -->
 <div class="bg-paper dark:bg-gray-800 rounded-card p-6 border border-gray-100 dark:border-gray-700 transition-shadow">
 <div class="flex items-center justify-between">
 <div>
 <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Telah Terbit</p>
 <h3 class="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{{ summary.total_published }}</h3>
 </div>
 <div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-sm">
 <Icon icon="solar:check-square-bold" class="w-6 h-6" />
 </div>
 </div>
 </div>

 <!-- 3. Draf Kajian -->
 <div class="bg-paper dark:bg-gray-800 rounded-card p-6 border border-gray-100 dark:border-gray-700 transition-shadow">
 <div class="flex items-center justify-between">
 <div>
 <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Draf internal</p>
 <h3 class="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">{{ summary.total_draft }}</h3>
 </div>
 <div class="p-3 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 rounded-sm">
 <Icon icon="solar:notes-bold" class="w-6 h-6" />
 </div>
 </div>
 </div>

 <!-- 4. Menunggu Review -->
 <div class="bg-paper dark:bg-gray-800 rounded-card p-6 border border-gray-100 dark:border-gray-700 transition-shadow">
 <div class="flex items-center justify-between">
 <div>
 <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Menunggu Review</p>
 <h3 class="text-2xl font-bold text-amber-500 dark:text-amber-400 mt-1">{{ summary.total_review }}</h3>
 </div>
 <div class="p-3 bg-amber-50 dark:bg-amber-950/30 text-amber-500 dark:text-amber-400 rounded-sm">
 <Icon icon="solar:clock-circle-bold" class="w-6 h-6" />
 </div>
 </div>
 </div>
 </div>

 <!-- Charts Section -->
 <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
 <!-- Line Chart: Downloads Trend -->
 <div class="lg:col-span-2 bg-paper dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-card p-6 ">
 <h4 class="font-bold text-gray-800 dark:text-white text-base mb-1">Unduhan Kajian Bidang</h4>
 <p class="text-xs text-gray-400 mb-6">Tren download 6 bulan terakhir</p>
 <div class="h-72">
 <apexchart 
 type="line" 
 height="100%" 
 width="100%"
 :options="getLineChartOptions(chartTrendCategories)" 
 :series="chartTrendData" 
 />
 </div>
 </div>

 <!-- Pie Chart: Distribution by Jenis -->
 <div class="bg-paper dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-card p-6 flex flex-col justify-between">
 <div>
 <h4 class="font-bold text-gray-800 dark:text-white text-base mb-1">Jenis Riset Bidang</h4>
 <p class="text-xs text-gray-400 mb-6">Distribusi per kategori kajian</p>
 </div>
 <div class="h-72 flex items-center justify-center">
 <apexchart 
 type="donut" 
 height="100%" 
 width="100%"
 :options="getPieChartOptions(chartJenisLabels)" 
 :series="chartJenisSeries" 
 />
 </div>
 </div>
 </div>

 <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
 <!-- Popular list -->
 <div class="lg:col-span-2 bg-paper dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-card p-6 flex flex-col justify-between">
 <div>
 <h4 class="font-bold text-gray-800 dark:text-white text-base mb-1">Kajian Bidang Terpopuler</h4>
 <p class="text-xs text-gray-400 mb-6">Paling banyak dicari & didownload oleh pemohon</p>
 </div>
 <div class="space-y-4">
 <div v-for="item in popularKajians" :key="item.id" class="flex items-start gap-3 border-b border-gray-50 dark:border-gray-700 pb-3 last:border-0 last:pb-0">
 <div class="p-2 bg-purple-50 dark:bg-purple-900/20 text-purple-600 rounded-sm shrink-0">
 <Icon icon="solar:file-text-bold" class="w-5 h-5" />
 </div>
 <div class="min-w-0 flex-1">
 <h5 class="text-xs font-bold text-gray-800 dark:text-gray-200 line-clamp-1 hover:underline">
 <Link :href="route('kajian.show', item.uuid)">{{ item.judul }}</Link>
 </h5>
 <p class="text-[10px] text-gray-400 mt-0.5">{{ item.tahun?.tahun }} • {{ item.jenis_kajian?.nama }}</p>
 </div>
 <span class="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center shrink-0">
 <Icon icon="solar:download-bold" class="w-3.5 h-3.5 mr-1" />
 {{ item.download_count }}
 </span>
 </div>
 </div>
 </div>

 <!-- Add quick links or summary info -->
 <div class="bg-paper dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-card p-6 flex flex-col justify-between">
 <div>
 <h4 class="font-bold text-gray-800 dark:text-white text-base mb-1">Menu Cepat</h4>
 <p class="text-xs text-gray-400 mb-6">Aksi cepat pengoperasian kajian</p>
 </div>
 <div class="space-y-3">
 <Link 
 :href="route('kajian.create')" 
 class="w-full flex items-center justify-between p-4 text-white rounded-card transition-all font-semibold text-sm "
 >
 <span>Buat Kajian Baru</span>
 <Icon icon="solar:add-circle-bold" class="w-5 h-5" />
 </Link>
 <Link 
 :href="route('kajian.index', { status: 'draft' })" 
 class="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-white rounded-card transition-all font-semibold text-sm"
 >
 <span>Lihat Draf</span>
 <span class="bg-gray-200 dark:bg-gray-800 text-xs px-2 py-0.5 rounded-full">{{ summary.total_draft }}</span>
 </Link>
 </div>
 </div>
 </div>

 <!-- Recent list Table -->
 <div class="bg-paper dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-card overflow-hidden ">
 <div class="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50">
 <div>
 <h4 class="font-bold text-gray-800 dark:text-white text-base">Unggahan Terbaru Bidang</h4>
 <p class="text-xs text-gray-400 mt-0.5">Daftar kajian yang baru dimasukkan oleh Bidang Anda</p>
 </div>
 <Link :href="route('kajian.index')" class="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors">
 Lihat Semua
 </Link>
 </div>
 <div class="overflow-x-auto">
 <table class="w-full text-left text-sm">
 <thead class="bg-gray-50/70 dark:bg-gray-900/50 text-gray-400 text-xs font-semibold uppercase tracking-wider">
 <tr>
 <th class="px-6 py-4">Judul Kajian</th>
 <th class="px-6 py-4">Tahun</th>
 <th class="px-6 py-4">Status</th>
 <th class="px-6 py-4 text-right">Aksi</th>
 </tr>
 </thead>
 <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
 <tr v-for="item in recentKajians" :key="item.id" class="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
 <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white max-w-sm truncate">
 {{ item.judul }}
 </td>
 <td class="px-6 py-4 text-gray-500">{{ item.tahun?.tahun }}</td>
 <td class="px-6 py-4">
 <span 
 class="px-2.5 py-1 rounded-full text-xs font-bold border"
 :class="{
 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800': item.status === 'published',
 'bg-paper-2 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800': item.status === 'draft',
 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800': item.status === 'review',
 'bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-950/30 dark:text-gray-400 dark:border-gray-800': item.status === 'archived',
 }"
 >
 {{ item.status }}
 </span>
 </td>
 <td class="px-6 py-4 text-right">
 <Link 
 :href="route('kajian.show', item.uuid)" 
 class="px-3 py-1.5 bg-gray-100 hover:bg-paper-2 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-blue-600 rounded-sm transition-all inline-flex items-center text-xs font-bold"
 >
 Detail
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
