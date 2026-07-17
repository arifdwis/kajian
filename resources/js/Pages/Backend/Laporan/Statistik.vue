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

// Reactive Filters
const bidang_id = ref(props.filters.bidang_id || '');
const jenis_id = ref(props.filters.jenis_id || '');
const tahun_id = ref(props.filters.tahun_id || '');

const handleFilter = () => {
  router.get(route('laporan.statistik'), {
    bidang_id: bidang_id.value,
    jenis_id: jenis_id.value,
    tahun_id: tahun_id.value,
  }, {
    preserveState: true,
    preserveScroll: true,
  });
};

const resetFilter = () => {
  bidang_id.value = '';
  jenis_id.value = '';
  tahun_id.value = '';
  handleFilter();
};

// 1. Line Chart Data & Options (Tren Unduhan)
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

// 2. Doughnut/Donut Chart Data & Options (Jenis Kajian)
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

// 3. Horizontal Bar Chart Data & Options (Kajian per Bidang)
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

// 4. Vertical Bar Chart Data & Options (Tren Kajian per Tahun)
const annualChartData = computed(() => ({
  labels: (props.charts.per_tahun || []).map(item => item.label),
  datasets: [
    {
      label: 'Jumlah Kajian',
      backgroundColor: '#10B981',
      hoverBackgroundColor: '#059669',
      data: (props.charts.per_tahun || []).map(item => item.value),
      borderRadius: 6
    }
  ]
}));

const annualChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    y: {
      grid: {
        color: 'rgba(156, 163, 175, 0.15)',
        drawBorder: false
      },
      ticks: {
        color: '#9CA3AF',
        precision: 0
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
</script>

<template>
  <Head title="Statistik & Analisis Kajian" />
  
  <AuthenticatedLayout>
    <div class="space-y-6">
      <!-- Header bar -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700">
        <div class="flex items-center gap-3">
          <Link :href="route('laporan.index')" class="p-2.5 bg-gray-50 dark:bg-gray-700 dark:text-gray-300 hover:bg-paper-2 hover:text-blue-600 rounded-sm transition-all">
            <Icon icon="solar:arrow-left-outline" class="w-5 h-5" />
          </Link>
          <div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">Statistik & Analisis Kajian</h3>
            <p class="text-xs text-gray-500 mt-1">Pantau tren pengunggahan, pembagian bidang kajian, dan aktivitas unduhan secara waktu nyata.</p>
          </div>
        </div>
      </div>

      <!-- Filter Controls Card -->
      <div class="bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700">
        <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
          <!-- Bidang Filter -->
          <div class="space-y-2">
            <label class="text-xs font-bold text-gray-400 uppercase tracking-wider">Filter Bidang</label>
            <select 
              v-model="bidang_id"
              @change="handleFilter"
              class="w-full text-xs bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-sm text-gray-900 dark:text-white py-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Semua Bidang</option>
              <option v-for="b in bidangs" :key="b.id" :value="b.id">{{ b.nama }}</option>
            </select>
          </div>

          <!-- Jenis Kajian Filter -->
          <div class="space-y-2">
            <label class="text-xs font-bold text-gray-400 uppercase tracking-wider">Filter Jenis Kajian</label>
            <select 
              v-model="jenis_id"
              @change="handleFilter"
              class="w-full text-xs bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-sm text-gray-900 dark:text-white py-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Semua Jenis</option>
              <option v-for="j in jenisKajians" :key="j.id" :value="j.id">{{ j.nama }}</option>
            </select>
          </div>

          <!-- Tahun Filter -->
          <div class="space-y-2">
            <label class="text-xs font-bold text-gray-400 uppercase tracking-wider">Filter Tahun</label>
            <select 
              v-model="tahun_id"
              @change="handleFilter"
              class="w-full text-xs bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-sm text-gray-900 dark:text-white py-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Semua Tahun</option>
              <option v-for="t in tahuns" :key="t.id" :value="t.id">{{ t.tahun }}</option>
            </select>
          </div>

          <!-- Reset Button -->
          <div>
            <button 
              @click="resetFilter"
              class="w-full text-xs font-bold bg-gray-100 hover:bg-gray-200 dark:bg-gray-750 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 py-2.5 rounded-sm transition-all border border-gray-200 dark:border-gray-600 active:scale-[0.98]"
            >
              Reset Filter
            </button>
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

      <!-- Charts Section Row 1 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Line Chart: Downloads Trend -->
        <div class="lg:col-span-2 bg-paper dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-card p-6">
          <h4 class="font-bold text-gray-800 dark:text-white text-base mb-1">Tren Aktivitas Unduhan</h4>
          <p class="text-xs text-gray-400 mb-6">Aktivitas download log rekam sistem 6 bulan terakhir</p>
          <div class="h-80 relative">
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
            <h4 class="font-bold text-gray-800 dark:text-white text-base mb-1">Komposisi Jenis Penelitian</h4>
            <p class="text-xs text-gray-400 mb-6">Distribusi kajian terbit berdasarkan klasifikasi riset</p>
          </div>
          <div class="h-80 flex items-center justify-center relative">
            <Chart 
              type="doughnut" 
              :data="doughnutChartData"
              :options="doughnutChartOptions"
              class="h-full w-full"
            />
          </div>
        </div>
      </div>

      <!-- Charts Section Row 2 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Bar Chart: Bidang Distribution -->
        <div class="bg-paper dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-card p-6">
          <h4 class="font-bold text-gray-800 dark:text-white text-base mb-1">Distribusi Bidang / Rumpun OPD</h4>
          <p class="text-xs text-gray-400 mb-6">Jumlah berkas kajian terpublikasi per bidang</p>
          <div class="h-80 relative">
            <Chart 
              type="bar" 
              :data="barChartData"
              :options="barChartOptions"
              class="h-full w-full"
            />
          </div>
        </div>

        <!-- Bar Chart: Annual Trend -->
        <div class="bg-paper dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-card p-6">
          <h4 class="font-bold text-gray-800 dark:text-white text-base mb-1">Tren Publikasi Tahunan</h4>
          <p class="text-xs text-gray-400 mb-6">Jumlah berkas kajian terbit per tahun</p>
          <div class="h-80 relative">
            <Chart 
              type="bar" 
              :data="annualChartData"
              :options="annualChartOptions"
              class="h-full w-full"
            />
          </div>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>
