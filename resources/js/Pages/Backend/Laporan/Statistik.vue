<script setup>
import { computed } from 'vue';
import { Head, Link } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import apexchart from 'vue3-apexcharts';

const props = defineProps({
 summary: Object,
 charts: Object,
});

// Charts configs
const getLineChartOptions = (categories) => ({
 chart: {
  id: 'downloads-trend-lap',
  toolbar: { show: true },
  zoom: { enabled: true },
  foreColor: '#9CA3AF',
 },
 colors: ['#3B82F6'],
 stroke: { curve: 'smooth', width: 3 },
 xaxis: { categories, axisBorder: { show: false } },
 grid: { borderColor: '#E5E7EB', strokeDashArray: 4 },
 tooltip: {
  theme: 'light',
  style: { fontSize: '12px' },
  y: { formatter: (val) => val + ' unduhan' },
 },
 markers: { size: 5, strokeWidth: 0 },
});

const getBarChartOptions = (categories) => ({
 chart: {
  id: 'bidang-dist-lap',
  toolbar: { show: true },
  foreColor: '#9CA3AF',
 },
 colors: ['#8B5CF6'],
 plotOptions: {
  bar: {
  borderRadius: 6,
  horizontal: true,
  }
 },
 xaxis: { categories },
 tooltip: {
  theme: 'light',
  style: { fontSize: '12px' },
  y: { formatter: (val) => val + ' kajian' },
 },
});

const getPieChartOptions = (labels) => ({
 chart: {
  id: 'jenis-dist-lap',
  foreColor: '#9CA3AF',
 },
 labels,
 colors: ['#10B981', '#F59E0B', '#EF4444', '#3B82F6', '#EC4899'],
 legend: { position: 'bottom' },
 tooltip: {
  theme: 'light',
  style: { fontSize: '12px' },
  y: { formatter: (val) => val + ' kajian' },
 },
 dataLabels: {
  enabled: true,
  style: { fontSize: '11px', fontWeight: 600 },
 },
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

const chartBidangData = computed(() => {
 const list = props.charts.per_bidang || [];
 return [{
 name: 'Jumlah Kajian',
 data: list.map(item => item.value)
 }];
});

const chartBidangCategories = computed(() => {
 return (props.charts.per_bidang || []).map(item => item.label);
});

const chartJenisSeries = computed(() => {
 return (props.charts.per_jenis || []).map(item => item.value);
});

const chartJenisLabels = computed(() => {
 return (props.charts.per_jenis || []).map(item => item.label);
});
</script>

<template>
 <Head title="Statistik & Analisis Kajian" />
 
 <AuthenticatedLayout>
 <div class="space-y-6">
 <!-- Header bar -->
 <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700 ">
 <div class="flex items-center gap-3">
 <Link :href="route('laporan.index')" class="p-2.5 bg-gray-50 dark:bg-gray-700 dark:text-gray-300 hover:bg-paper-2 hover:text-blue-600 rounded-sm transition-all">
 <Icon icon="solar:arrow-left-outline" class="w-5 h-5" />
 </Link>
 <div>
 <h3 class="text-xl font-bold text-gray-900 dark:text-white">Statistik & Analisis Kajian</h3>
 <p class="text-xs text-gray-500 mt-1">Pantau tren pengunggahan, pembagian bidang kajian, dan aktivitas unduhan.</p>
 </div>
 </div>
 </div>

 <!-- Stats Metric Cards -->
 <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
 <!-- 1. Total Kajian -->
 <div class="bg-paper dark:bg-gray-800 rounded-card p-6 border border-gray-100 dark:border-gray-700 transition-shadow">
 <div class="flex items-center justify-between">
 <div>
 <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Kajian</p>
 <h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ summary.total_kajian }}</h3>
 </div>
 <div class="p-3 bg-paper-2 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-sm">
 <Icon icon="solar:folder-open-bold" class="w-6 h-6" />
 </div>
 </div>
 </div>

 <!-- 2. Terbit -->
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

 <!-- 3. Views -->
 <div class="bg-paper dark:bg-gray-800 rounded-card p-6 border border-gray-100 dark:border-gray-700 transition-shadow">
 <div class="flex items-center justify-between">
 <div>
 <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Views</p>
 <h3 class="text-2xl font-bold text-teal-650 mt-1">{{ summary.total_views }}</h3>
 </div>
 <div class="p-3 bg-teal-50 dark:bg-teal-950/30 text-teal-650 rounded-sm">
 <Icon icon="solar:eye-bold" class="w-6 h-6" />
 </div>
 </div>
 </div>

 <!-- 4. Downloads -->
 <div class="bg-paper dark:bg-gray-800 rounded-card p-6 border border-gray-100 dark:border-gray-700 transition-shadow">
 <div class="flex items-center justify-between">
 <div>
 <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Downloads</p>
 <h3 class="text-2xl font-bold text-indigo-650 mt-1">{{ summary.total_downloads }}</h3>
 </div>
 <div class="p-3 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-650 rounded-sm">
 <Icon icon="solar:download-bold" class="w-6 h-6" />
 </div>
 </div>
 </div>
 </div>

 <!-- Charts Section -->
 <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
 <!-- Line Chart: Downloads Trend -->
 <div class="lg:col-span-2 bg-paper dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-card p-6 ">
 <h4 class="font-bold text-gray-800 dark:text-white text-base mb-1">Tren Aktivitas Unduhan</h4>
 <p class="text-xs text-gray-400 mb-6">Aktivitas download log rekam sistem 6 bulan terakhir</p>
 <div class="h-80">
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
 <h4 class="font-bold text-gray-800 dark:text-white text-base mb-1">Komposisi Jenis Penelitian</h4>
 <p class="text-xs text-gray-400 mb-6">Distribusi kajian terbit berdasarkan klasifikasi riset</p>
 </div>
 <div class="h-80 flex items-center justify-center">
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

 <div class="grid grid-cols-1 gap-8">
 <!-- Bar Chart: Bidang Distribution -->
 <div class="bg-paper dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-card p-6 ">
 <h4 class="font-bold text-gray-800 dark:text-white text-base mb-1">Distribusi Bidang / Rumpun OPD</h4>
  <p class="text-xs text-gray-400 mb-6">Jumlah berkas kajian terpublikasi per bidang</p>
 <div class="h-80">
 <apexchart 
 type="bar" 
 height="100%" 
 width="100%"
 :options="getBarChartOptions(chartBidangCategories)" 
 :series="chartBidangData" 
 />
 </div>
 </div>
 </div>
 </div>
 </AuthenticatedLayout>
</template>
