<script setup>
import { computed } from 'vue';
import { Head, Link, usePage } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import Chart from 'primevue/chart';

const props = defineProps({
 summary: Object,
 charts: Object,
 popularKajians: Array,
 recentKajians: Array,
});

const page = usePage();
const user = computed(() => page.props.auth.user);

// 1. Line Chart Data & Options
const lineChartData = computed(() => ({
  labels: (props.charts.downloads_trend || []).map(item => item.label),
  datasets: [
    {
      label: 'Unduhan',
      data: (props.charts.downloads_trend || []).map(item => item.value),
      fill: false,
      borderColor: '#3B82F6',
      tension: 0.4,
      pointBackgroundColor: '#3B82F6',
      pointHoverRadius: 6
    }
  ]
}));

const lineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      mode: 'index',
      intersect: false
    }
  },
  scales: {
    y: {
      grid: {
        color: 'rgba(156, 163, 175, 0.15)',
        drawBorder: false
      },
      ticks: {
        color: '#9CA3AF'
      }
    },
    x: {
      grid: {
        display: false
      },
      ticks: {
        color: '#9CA3AF'
      }
    }
  }
};

// 2. Doughnut/Donut Chart Data & Options
const doughnutChartData = computed(() => ({
  labels: (props.charts.per_jenis || []).map(item => item.label),
  datasets: [
    {
      data: (props.charts.per_jenis || []).map(item => item.value),
      backgroundColor: ['#10B981', '#F59E0B', '#EF4444', '#3B82F6', '#EC4899'],
      hoverBackgroundColor: ['#059669', '#D97706', '#DC2626', '#2563EB', '#DB2777'],
      borderWidth: 0
    }
  ]
}));

const doughnutChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: '#9CA3AF',
        boxWidth: 12,
        font: {
          size: 11
        }
      }
    }
  },
  cutout: '65%'
};

// 3. Horizontal Bar Chart Data & Options
const barChartData = computed(() => ({
  labels: (props.charts.per_bidang || []).map(item => item.label),
  datasets: [
    {
      label: 'Jumlah Kajian',
      backgroundColor: '#8B5CF6',
      hoverBackgroundColor: '#7C3AED',
      data: (props.charts.per_bidang || []).map(item => item.value),
      borderRadius: 6
    }
  ]
}));

const barChartOptions = {
  indexAxis: 'y',
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    x: {
      grid: {
        color: 'rgba(156, 163, 175, 0.15)',
        drawBorder: false
      },
      ticks: {
        color: '#9CA3AF',
        precision: 0
      }
    },
    y: {
      grid: {
        display: false
      },
      ticks: {
        color: '#9CA3AF'
      }
    }
  }
};
</script>

<template>
 <Head title="Dashboard Admin" />
 
 <AuthenticatedLayout>
 <div class="space-y-8">
 <!-- Top Welcome banner -->
 <div class="relative overflow-hidden rounded-card p-8" style="background: linear-gradient(135deg, var(--color-accent) 0%, oklch(35% 0.06 135) 100%);">
  <div class="absolute -right-10 -top-10 w-40 h-40 rounded-full blur-2xl" style="background: rgba(255,255,255,0.08);"></div>
  <div class="absolute right-20 bottom-0 w-32 h-32 rounded-full blur-xl" style="background: rgba(255,255,255,0.06);"></div>
  <div class="relative z-10 max-w-xl">
  <span class="font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-full" style="background: rgba(255,255,255,0.15); color: #fff; border: 1px solid rgba(255,255,255,0.25);">
   Admin Bapperida
  </span>
  <h2 class="text-2xl font-bold mt-4 text-white">Selamat Datang Kembali, {{ user.name }}</h2>
  <p class="text-sm mt-2 leading-relaxed" style="color: rgba(255,255,255,0.85);">
   Kelola data penelitian, riset, dan kajian strategis Pemerintah Kota Samarinda secara terpadu melalui panel SIKAJIAN.
  </p>
  </div>
 </div>

 <!-- Stats Summary Cards -->
 <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

 <!-- 2. Published -->
 <div class="bg-paper dark:bg-gray-800 rounded-card p-6 border border-gray-100 dark:border-gray-700 transition-shadow">
 <div class="flex items-center justify-between">
 <div>
 <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Dipublikasikan</p>
 <h3 class="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{{ summary.total_published }}</h3>
 </div>
 <div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-sm">
 <Icon icon="solar:check-square-bold" class="w-6 h-6" />
 </div>
 </div>
 </div>

 <!-- 3. Menunggu Review -->
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

 <!-- 4. Downloads -->
 <div class="bg-paper dark:bg-gray-800 rounded-card p-6 border border-gray-100 dark:border-gray-700 transition-shadow">
 <div class="flex items-center justify-between">
 <div>
 <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Unduhan</p>
 <h3 class="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">{{ summary.total_downloads }}</h3>
 </div>
 <div class="p-3 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 rounded-sm">
 <Icon icon="solar:download-bold" class="w-6 h-6" />
 </div>
 </div>
 </div>
 </div>

  <!-- Charts Section -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <!-- Line Chart: Downloads Trend -->
    <div class="lg:col-span-2 bg-paper dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-card p-6">
      <h4 class="font-bold text-gray-800 dark:text-white text-base mb-1">Tren Unduhan Kajian</h4>
      <p class="text-xs text-gray-400 mb-6">Aktivitas download 6 bulan terakhir</p>
      <div class="h-72 relative">
        <Chart 
          type="line" 
          :data="lineChartData"
          :options="lineChartOptions"
          class="h-full w-full"
        />
      </div>
    </div>

    <!-- Pie Chart: Distribution by Jenis -->
    <div class="bg-paper dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-card p-6 flex flex-col justify-between">
      <div>
        <h4 class="font-bold text-gray-800 dark:text-white text-base mb-1">Persentase Jenis Kajian</h4>
        <p class="text-xs text-gray-400 mb-6">Berdasarkan klasifikasi riset</p>
      </div>
      <div class="h-72 flex items-center justify-center relative">
        <Chart 
          type="doughnut" 
          :data="doughnutChartData"
          :options="doughnutChartOptions"
          class="h-full w-full"
        />
      </div>
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <!-- Bar Chart: Bidang Distribution -->
    <div class="lg:col-span-2 bg-paper dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-card p-6">
      <h4 class="font-bold text-gray-800 dark:text-white text-base mb-1">Kajian per Bidang</h4>
      <p class="text-xs text-gray-400 mb-6">Jumlah publikasi terbit per unit</p>
      <div class="h-72 relative">
        <Chart 
          type="bar" 
          :data="barChartData"
          :options="barChartOptions"
          class="h-full w-full"
        />
      </div>
    </div>

 <!-- Popular list -->
 <div class="bg-paper dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-card p-6 flex flex-col justify-between">
 <div>
 <h4 class="font-bold text-gray-800 dark:text-white text-base mb-1">Kajian Terpopuler</h4>
 <p class="text-xs text-gray-400 mb-6">Paling sering diunduh oleh pemohon</p>
 </div>
 <div class="flex-1 overflow-y-auto space-y-4 max-h-[280px]">
 <div v-for="item in popularKajians" :key="item.id" class="flex items-start gap-3 border-b border-gray-50 dark:border-gray-700 pb-3 last:border-0 last:pb-0">
 <div class="p-2 bg-paper-2 dark:bg-blue-900/20 text-blue-600 rounded-sm shrink-0">
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
 </div>

 <!-- Recent list Table -->
 <div class="bg-paper dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-card overflow-hidden ">
 <div class="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50">
 <div>
 <h4 class="font-bold text-gray-800 dark:text-white text-base">Unggahan Terbaru</h4>
 <p class="text-xs text-gray-400 mt-0.5">Daftar kajian yang baru dimasukkan sistem</p>
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
 <th class="px-6 py-4">Bidang</th>
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
 <td class="px-6 py-4 text-gray-500">{{ item.bidang?.nama }}</td>
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
