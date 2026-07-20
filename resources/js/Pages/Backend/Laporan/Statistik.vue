<script setup>
import { computed, ref } from 'vue';
import { Head, Link, router } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import Chart from 'primevue/chart';

const props = defineProps({
  summary: Object,
  charts: Object,
  bidangs: Array,
  jenisKajians: Array,
  tahuns: Array,
  filters: Object,
});

const bidang_id = ref(props.filters.bidang_id || '');
const jenis_id = ref(props.filters.jenis_id || '');
const tahun_id = ref(props.filters.tahun_id || '');

const handleFilter = () => {
  router.get(route('laporan.statistik'), {
    bidang_id: bidang_id.value,
    jenis_id: jenis_id.value,
    tahun_id: tahun_id.value,
  }, { preserveState: true, preserveScroll: true });
};

const resetFilter = () => {
  bidang_id.value = '';
  jenis_id.value = '';
  tahun_id.value = '';
  handleFilter();
};

// Computed metrics
const avgViewsPerKajian = computed(() => {
  if (!props.summary.total_published) return 0;
  return Math.round(props.summary.total_views / props.summary.total_published);
});
const avgDownloadsPerKajian = computed(() => {
  if (!props.summary.total_published) return 0;
  return Math.round(props.summary.total_downloads / props.summary.total_published);
});
const conversionRate = computed(() => {
  if (!props.summary.total_views) return 0;
  return ((props.summary.total_downloads / props.summary.total_views) * 100).toFixed(1);
});

// Chart: Tren Unduhan
const lineChartData = computed(() => ({
  labels: (props.charts.downloads_trend || []).map(item => item.label),
  datasets: [{
    label: 'Unduhan',
    data: (props.charts.downloads_trend || []).map(item => item.value),
    fill: false,
    borderColor: '#3B82F6',
    tension: 0.4,
    pointBackgroundColor: '#3B82F6',
    pointHoverRadius: 6
  }]
}));
const lineChartOptions = {
  responsive: true, maintainAspectRatio: false,
  plugins: { legend: { display: false }, tooltip: { mode: 'index', intersect: false } },
  scales: {
    y: { grid: { color: 'rgba(156,163,175,0.15)', drawBorder: false }, ticks: { color: '#9CA3AF' } },
    x: { grid: { display: false }, ticks: { color: '#9CA3AF' } }
  }
};

// Chart: Tren Kunjungan
const viewTrendData = computed(() => ({
  labels: (props.charts.views_trend || []).map(item => item.label),
  datasets: [{
    label: 'Kunjungan',
    data: (props.charts.views_trend || []).map(item => item.value),
    fill: false,
    borderColor: '#10B981',
    tension: 0.4,
    pointBackgroundColor: '#10B981',
    pointHoverRadius: 6
  }]
}));

// Chart: Kombinasi Unduhan + Kunjungan
const comboChartData = computed(() => ({
  labels: (() => {
    const dl = (props.charts.downloads_trend || []).map(i => i.label);
    const vw = (props.charts.views_trend || []).map(i => i.label);
    return [...new Set([...dl, ...vw])].sort();
  })(),
  datasets: [
    {
      label: 'Kunjungan',
      type: 'line',
      data: (() => {
        const labels = comboChartData.value?.labels || [];
        const map = {};
        (props.charts.views_trend || []).forEach(i => map[i.label] = i.value);
        return labels.map(l => map[l] || 0);
      })(),
      borderColor: '#10B981',
      backgroundColor: 'rgba(16,185,129,0.1)',
      tension: 0.4,
      fill: true,
      yAxisID: 'y1',
      pointRadius: 3,
    },
    {
      label: 'Unduhan',
      type: 'bar',
      data: (() => {
        const labels = comboChartData.value?.labels || [];
        const map = {};
        (props.charts.downloads_trend || []).forEach(i => map[i.label] = i.value);
        return labels.map(l => map[l] || 0);
      })(),
      backgroundColor: 'rgba(59,130,246,0.7)',
      borderRadius: 4,
      yAxisID: 'y',
    }
  ]
}));
const comboChartOptions = {
  responsive: true, maintainAspectRatio: false,
  plugins: { legend: { position: 'top', labels: { color: '#9CA3AF', boxWidth: 12, font: { size: 11 } } } },
  scales: {
    y: { position: 'left', grid: { color: 'rgba(156,163,175,0.15)', drawBorder: false }, ticks: { color: '#3B82F6', precision: 0 }, title: { display: true, text: 'Unduhan', color: '#3B82F6' } },
    y1: { position: 'right', grid: { drawOnChartArea: false }, ticks: { color: '#10B981', precision: 0 }, title: { display: true, text: 'Kunjungan', color: '#10B981' } },
    x: { grid: { display: false }, ticks: { color: '#9CA3AF' } }
  }
};

// Chart: Donut Jenis
const doughnutData = computed(() => ({
  labels: (props.charts.per_jenis || []).map(i => i.label),
  datasets: [{ data: (props.charts.per_jenis || []).map(i => i.value), backgroundColor: ['#10B981','#F59E0B','#EF4444','#3B82F6','#EC4899','#8B5CF6'], borderWidth: 0 }]
}));
const doughnutOpts = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { color: '#9CA3AF', boxWidth: 12, font: { size: 11 } } } }, cutout: '65%' };

// Chart: Status Distribution
const statusData = computed(() => ({
  labels: (props.charts.status_distribution || []).map(i => i.label),
  datasets: [{ data: (props.charts.status_distribution || []).map(i => i.value), backgroundColor: ['#10B981','#9CA3AF','#F59E0B','#6B7280'], borderWidth: 0 }]
}));
const statusOpts = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { color: '#9CA3AF', boxWidth: 12, font: { size: 11 } } } }, cutout: '55%' };

// Chart: Bar per Bidang
const barData = computed(() => ({
  labels: (props.charts.per_bidang || []).map(i => i.label),
  datasets: [{ label: 'Jumlah', backgroundColor: '#8B5CF6', data: (props.charts.per_bidang || []).map(i => i.value), borderRadius: 6 }]
}));
const barOpts = {
  indexAxis: 'y', responsive: true, maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    x: { grid: { color: 'rgba(156,163,175,0.15)', drawBorder: false }, ticks: { color: '#9CA3AF', precision: 0 } },
    y: { grid: { display: false }, ticks: { color: '#9CA3AF', font: { size: 11 } } }
  }
};

// Chart: Annual Trend
const annualData = computed(() => ({
  labels: (props.charts.per_tahun || []).map(i => i.label),
  datasets: [{ label: 'Jumlah', backgroundColor: '#10B981', data: (props.charts.per_tahun || []).map(i => i.value), borderRadius: 6 }]
}));
const annualOpts = {
  responsive: true, maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    y: { grid: { color: 'rgba(156,163,175,0.15)', drawBorder: false }, ticks: { color: '#9CA3AF', precision: 0 } },
    x: { grid: { display: false }, ticks: { color: '#9CA3AF' } }
  }
};
</script>

<template>
 <Head title="Statistik & Analisis Kajian" />
 <AuthenticatedLayout>
  <div class="space-y-6">
   <!-- Header -->
   <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 rounded-card" :style="{ backgroundColor: 'var(--color-paper)', border: '1px solid var(--color-rule)' }">
    <div class="flex items-center gap-3">
     <Link :href="route('laporan.index')" class="p-2.5 rounded-sm transition-colors duration-150" :style="{ backgroundColor: 'var(--color-paper-2)', color: 'var(--color-ink-2)' }">
      <Icon icon="solar:arrow-left-outline" class="w-5 h-5" />
     </Link>
     <div>
      <h3 class="text-xl font-bold" :style="{ color: 'var(--color-ink)' }">Statistik & Analisis Kajian</h3>
      <p class="text-xs mt-1" :style="{ color: 'var(--color-ink-2)' }">Pantau tren kunjungan, unduhan, distribusi bidang, dan aktivitas kajian secara mendalam.</p>
     </div>
    </div>
   </div>

   <!-- Filter -->
   <div class="p-6 rounded-card" :style="{ backgroundColor: 'var(--color-paper)', border: '1px solid var(--color-rule)' }">
    <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
     <div class="space-y-2">
      <label class="text-xs font-bold uppercase tracking-wider" :style="{ color: 'var(--color-ink-2)' }">Bidang</label>
      <select v-model="bidang_id" @change="handleFilter" class="w-full text-xs py-2.5 rounded-sm" :style="{ border: '1px solid var(--color-rule)', color: 'var(--color-ink)', backgroundColor: 'var(--color-paper-2)' }">
       <option value="">Semua Bidang</option>
       <option v-for="b in bidangs" :key="b.id" :value="b.id">{{ b.nama }}</option>
      </select>
     </div>
     <div class="space-y-2">
      <label class="text-xs font-bold uppercase tracking-wider" :style="{ color: 'var(--color-ink-2)' }">Jenis Kajian</label>
      <select v-model="jenis_id" @change="handleFilter" class="w-full text-xs py-2.5 rounded-sm" :style="{ border: '1px solid var(--color-rule)', color: 'var(--color-ink)', backgroundColor: 'var(--color-paper-2)' }">
       <option value="">Semua Jenis</option>
       <option v-for="j in jenisKajians" :key="j.id" :value="j.id">{{ j.nama }}</option>
      </select>
     </div>
     <div class="space-y-2">
      <label class="text-xs font-bold uppercase tracking-wider" :style="{ color: 'var(--color-ink-2)' }">Tahun</label>
      <select v-model="tahun_id" @change="handleFilter" class="w-full text-xs py-2.5 rounded-sm" :style="{ border: '1px solid var(--color-rule)', color: 'var(--color-ink)', backgroundColor: 'var(--color-paper-2)' }">
       <option value="">Semua Tahun</option>
       <option v-for="t in tahuns" :key="t.id" :value="t.id">{{ t.tahun }}</option>
      </select>
     </div>
     <button @click="resetFilter" class="text-xs font-bold py-2.5 rounded-sm transition-colors duration-150" :style="{ border: '1px solid var(--color-rule)', color: 'var(--color-ink)' }">Reset Filter</button>
    </div>
   </div>

   <!-- Summary Cards -->
   <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
    <div class="p-5 rounded-card" :style="{ backgroundColor: 'var(--color-paper)', border: '1px solid var(--color-rule)' }">
     <p class="text-xs font-semibold uppercase tracking-wider" :style="{ color: 'var(--color-ink-2)' }">Total Kajian</p>
     <h3 class="text-2xl font-bold mt-1" :style="{ color: 'var(--color-ink)' }">{{ summary.total_kajian }}</h3>
     <p class="text-[11px] mt-1" :style="{ color: 'var(--color-ink-2)' }">{{ summary.total_published }} terbit, {{ summary.total_draft }} draf</p>
    </div>
    <div class="p-5 rounded-card" :style="{ backgroundColor: 'var(--color-paper)', border: '1px solid var(--color-rule)' }">
     <p class="text-xs font-semibold uppercase tracking-wider" :style="{ color: 'var(--color-ink-2)' }">Total Kunjungan</p>
     <h3 class="text-2xl font-bold mt-1" style="color: #10B981;">{{ summary.total_views }}</h3>
     <p class="text-[11px] mt-1" :style="{ color: 'var(--color-ink-2)' }">Rata-rata {{ avgViewsPerKajian }} / kajian</p>
    </div>
    <div class="p-5 rounded-card" :style="{ backgroundColor: 'var(--color-paper)', border: '1px solid var(--color-rule)' }">
     <p class="text-xs font-semibold uppercase tracking-wider" :style="{ color: 'var(--color-ink-2)' }">Total Unduhan</p>
     <h3 class="text-2xl font-bold mt-1" style="color: #3B82F6;">{{ summary.total_downloads }}</h3>
     <p class="text-[11px] mt-1" :style="{ color: 'var(--color-ink-2)' }">Rata-rata {{ avgDownloadsPerKajian }} / kajian</p>
    </div>
    <div class="p-5 rounded-card" :style="{ backgroundColor: 'var(--color-paper)', border: '1px solid var(--color-rule)' }">
     <p class="text-xs font-semibold uppercase tracking-wider" :style="{ color: 'var(--color-ink-2)' }">Conversion Rate</p>
     <h3 class="text-2xl font-bold mt-1" style="color: #F59E0B;">{{ conversionRate }}%</h3>
     <p class="text-[11px] mt-1" :style="{ color: 'var(--color-ink-2)' }">Rasio unduhan / kunjungan</p>
    </div>
   </div>

   <!-- Combo Chart: Views + Downloads Trend -->
   <div class="p-6 rounded-card" :style="{ backgroundColor: 'var(--color-paper)', border: '1px solid var(--color-rule)' }">
    <h4 class="font-bold text-base mb-1" :style="{ color: 'var(--color-ink)' }">Tren Kunjungan & Unduhan</h4>
    <p class="text-xs mb-6" :style="{ color: 'var(--color-ink-2)' }">Grafik kombinasi aktivitas kunjungan (garis) dan unduhan (bar) 6 bulan terakhir</p>
    <div class="h-80"><Chart type="bar" :data="comboChartData" :options="comboChartOptions" class="h-full w-full" /></div>
   </div>

   <!-- Row: Donut Jenis + Status -->
   <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <div class="p-6 rounded-card" :style="{ backgroundColor: 'var(--color-paper)', border: '1px solid var(--color-rule)' }">
     <h4 class="font-bold text-base mb-1" :style="{ color: 'var(--color-ink)' }">Komposisi Jenis Penelitian</h4>
     <p class="text-xs mb-6" :style="{ color: 'var(--color-ink-2)' }">Distribusi kajian terbit berdasarkan klasifikasi riset</p>
     <div class="h-72"><Chart type="doughnut" :data="doughnutData" :options="doughnutOpts" class="h-full w-full" /></div>
    </div>
    <div class="p-6 rounded-card" :style="{ backgroundColor: 'var(--color-paper)', border: '1px solid var(--color-rule)' }">
     <h4 class="font-bold text-base mb-1" :style="{ color: 'var(--color-ink)' }">Status Kajian</h4>
     <p class="text-xs mb-6" :style="{ color: 'var(--color-ink-2)' }">Distribusi status seluruh kajian dalam sistem</p>
     <div class="h-72"><Chart type="doughnut" :data="statusData" :options="statusOpts" class="h-full w-full" /></div>
    </div>
   </div>

   <!-- Row: Bar Bidang + Annual -->
   <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <div class="p-6 rounded-card" :style="{ backgroundColor: 'var(--color-paper)', border: '1px solid var(--color-rule)' }">
     <h4 class="font-bold text-base mb-1" :style="{ color: 'var(--color-ink)' }">Distribusi Bidang</h4>
     <p class="text-xs mb-6" :style="{ color: 'var(--color-ink-2)' }">Jumlah kajian terbit per bidang penelitian</p>
     <div class="h-72"><Chart type="bar" :data="barData" :options="barOpts" class="h-full w-full" /></div>
    </div>
    <div class="p-6 rounded-card" :style="{ backgroundColor: 'var(--color-paper)', border: '1px solid var(--color-rule)' }">
     <h4 class="font-bold text-base mb-1" :style="{ color: 'var(--color-ink)' }">Tren Publikasi Tahunan</h4>
     <p class="text-xs mb-6" :style="{ color: 'var(--color-ink-2)' }">Jumlah kajian terbit per tahun</p>
     <div class="h-72"><Chart type="bar" :data="annualData" :options="annualOpts" class="h-full w-full" /></div>
    </div>
   </div>

   <!-- Row: Top Kajian by Views + Downloads -->
   <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <!-- Top by Views -->
    <div class="p-6 rounded-card" :style="{ backgroundColor: 'var(--color-paper)', border: '1px solid var(--color-rule)' }">
     <h4 class="font-bold text-base mb-1" :style="{ color: 'var(--color-ink)' }">Kajian Paling Dilihat</h4>
     <p class="text-xs mb-4" :style="{ color: 'var(--color-ink-2)' }">5 kajian dengan jumlah kunjungan tertinggi</p>
     <div class="space-y-3">
      <Link v-for="(item, idx) in (charts.top_by_views || [])" :key="idx" :href="route('portal.detail', item.slug)" class="flex items-center gap-3 p-3 rounded-sm transition-colors hover:bg-[var(--color-paper-2)]">
       <span class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0" :style="idx === 0 ? { backgroundColor: 'var(--color-accent)', color: '#fff' } : { backgroundColor: 'var(--color-paper-2)', color: 'var(--color-ink-2)' }">{{ idx + 1 }}</span>
       <div class="min-w-0 flex-1">
        <p class="text-xs font-semibold truncate" :style="{ color: 'var(--color-ink)' }">{{ item.judul }}</p>
        <p class="text-[10px]" :style="{ color: 'var(--color-ink-2)' }">{{ item.bidang }}</p>
       </div>
       <div class="text-right shrink-0">
        <span class="text-xs font-bold" style="color: #10B981;">{{ item.views }}</span>
        <span class="text-[10px] block" :style="{ color: 'var(--color-ink-2)' }">views</span>
       </div>
      </Link>
      <p v-if="!charts.top_by_views?.length" class="text-xs text-center py-4" :style="{ color: 'var(--color-ink-2)' }">Belum ada data</p>
     </div>
    </div>

    <!-- Top by Downloads -->
    <div class="p-6 rounded-card" :style="{ backgroundColor: 'var(--color-paper)', border: '1px solid var(--color-rule)' }">
     <h4 class="font-bold text-base mb-1" :style="{ color: 'var(--color-ink)' }">Kajian Paling Diunduh</h4>
     <p class="text-xs mb-4" :style="{ color: 'var(--color-ink-2)' }">5 kajian dengan jumlah unduhan tertinggi</p>
     <div class="space-y-3">
      <Link v-for="(item, idx) in (charts.top_by_downloads || [])" :key="idx" :href="route('portal.detail', item.slug)" class="flex items-center gap-3 p-3 rounded-sm transition-colors hover:bg-[var(--color-paper-2)]">
       <span class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0" :style="idx === 0 ? { backgroundColor: 'var(--color-accent)', color: '#fff' } : { backgroundColor: 'var(--color-paper-2)', color: 'var(--color-ink-2)' }">{{ idx + 1 }}</span>
       <div class="min-w-0 flex-1">
        <p class="text-xs font-semibold truncate" :style="{ color: 'var(--color-ink)' }">{{ item.judul }}</p>
        <p class="text-[10px]" :style="{ color: 'var(--color-ink-2)' }">{{ item.bidang }}</p>
       </div>
       <div class="text-right shrink-0">
        <span class="text-xs font-bold" style="color: #3B82F6;">{{ item.downloads }}</span>
        <span class="text-[10px] block" :style="{ color: 'var(--color-ink-2)' }">unduh</span>
       </div>
      </Link>
      <p v-if="!charts.top_by_downloads?.length" class="text-xs text-center py-4" :style="{ color: 'var(--color-ink-2)' }">Belum ada data</p>
     </div>
    </div>
   </div>

   <!-- Row: Views per Bidang Table -->
   <div class="p-6 rounded-card" :style="{ backgroundColor: 'var(--color-paper)', border: '1px solid var(--color-rule)' }">
    <h4 class="font-bold text-base mb-1" :style="{ color: 'var(--color-ink)' }">Performa per Bidang</h4>
    <p class="text-xs mb-4" :style="{ color: 'var(--color-ink-2)' }">Ringkasan jumlah kajian, kunjungan, dan unduhan per bidang penelitian</p>
    <div class="overflow-x-auto">
     <table class="w-full text-xs">
      <thead>
       <tr :style="{ borderBottom: '1px solid var(--color-rule)' }">
        <th class="text-left py-2.5 font-semibold" :style="{ color: 'var(--color-ink-2)' }">Bidang</th>
        <th class="text-center py-2.5 font-semibold" :style="{ color: 'var(--color-ink-2)' }">Kajian</th>
        <th class="text-center py-2.5 font-semibold" :style="{ color: 'var(--color-ink-2)' }">Kunjungan</th>
        <th class="text-center py-2.5 font-semibold" :style="{ color: 'var(--color-ink-2)' }">Unduhan</th>
        <th class="text-center py-2.5 font-semibold" :style="{ color: 'var(--color-ink-2)' }">Conv. Rate</th>
       </tr>
      </thead>
      <tbody>
       <tr v-for="row in (charts.views_per_bidang || [])" :key="row.bidang" class="transition-colors" :style="{ borderBottom: '1px solid var(--color-rule)' }">
        <td class="py-2.5 font-medium" :style="{ color: 'var(--color-ink)' }">{{ row.bidang }}</td>
        <td class="py-2.5 text-center" :style="{ color: 'var(--color-ink)' }">{{ row.kajian }}</td>
        <td class="py-2.5 text-center" :style="{ color: 'var(--color-ink)' }">{{ row.views }}</td>
        <td class="py-2.5 text-center" :style="{ color: 'var(--color-ink)' }">{{ row.downloads }}</td>
        <td class="py-2.5 text-center">
         <span class="px-2 py-0.5 rounded-full text-[10px] font-semibold" :style="{ backgroundColor: row.views > 0 ? 'rgba(16,185,129,0.1)' : 'var(--color-paper-2)', color: row.views > 0 ? '#10B981' : 'var(--color-ink-2)' }">
          {{ row.views > 0 ? ((row.downloads / row.views) * 100).toFixed(1) + '%' : '0%' }}
         </span>
        </td>
       </tr>
       <tr v-if="!charts.views_per_bidang?.length">
        <td colspan="5" class="py-8 text-center" :style="{ color: 'var(--color-ink-2)' }">Belum ada data performa</td>
       </tr>
      </tbody>
     </table>
    </div>
   </div>
  </div>
 </AuthenticatedLayout>
</template>
