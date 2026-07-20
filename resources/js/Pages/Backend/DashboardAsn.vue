<script setup>
import { computed } from 'vue';
import { Head, Link, usePage } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';

const props = defineProps({
 popularKajians: Array,
 recentKajians: Array,
});

const page = usePage();
const user = computed(() => page.props.auth.user);
</script>

<template>
 <Head title="Dashboard ASN" />
 
 <AuthenticatedLayout>
 <div class="space-y-8">
 <!-- Top Welcome banner -->
 <div class="relative overflow-hidden rounded-card p-8" style="background: linear-gradient(135deg, #047857 0%, #065F46 100%);">
  <div class="absolute -right-10 -top-10 w-40 h-40 rounded-full blur-2xl" style="background: rgba(255,255,255,0.08);"></div>
  <div class="absolute right-20 bottom-0 w-32 h-32 rounded-full blur-xl" style="background: rgba(255,255,255,0.06);"></div>
  <div class="relative z-10 max-w-xl">
  <span class="font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-full" style="background: rgba(255,255,255,0.15); color: #fff; border: 1px solid rgba(255,255,255,0.25);">
   Pengguna
  </span>
  <h2 class="text-2xl font-bold mt-4 text-white">Selamat Datang, {{ user.name }}</h2>
  <p class="text-sm mt-2 leading-relaxed" style="color: rgba(255,255,255,0.85);">
   Akses pustaka digital kajian, rekomendasi kebijakan, riset strategis, dan data penelitian Pemerintah Kota Samarinda.
  </p>
  </div>
 </div>

 <!-- Search redirection alert card -->
 <div class="bg-paper dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-card p-6 flex flex-col md:flex-row items-center justify-between gap-4">
 <div class="flex items-center gap-4">
 <div class="p-3 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-sm shrink-0">
 <Icon icon="solar:minimalistic-magnifer-bold" class="w-6 h-6" />
 </div>
 <div>
 <h4 class="font-bold text-gray-800 dark:text-white text-base">Cari Kajian & Dokumen Riset</h4>
 <p class="text-xs text-gray-400 mt-0.5">Cari menggunakan kata kunci, judul, penanggung jawab, bidang, atau tahun penelitian.</p>
 </div>
 </div>
 <Link 
 :href="route('portal.kajian')" 
 class="px-5 py-2.5 bg-gray-900 hover:bg-gray-800 dark:bg-paper dark:hover:bg-gray-100 text-white dark:text-gray-950 font-semibold text-xs rounded-sm transition-colors shrink-0"
 >
 Mulai Pencarian
 </Link>
 </div>

 <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
 <!-- Popular list -->
 <div class="lg:col-span-1 bg-paper dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-card p-6 flex flex-col justify-between">
 <div>
 <h4 class="font-bold text-gray-800 dark:text-white text-base mb-1">Rekomendasi Terpopuler</h4>
 <p class="text-xs text-gray-400 mb-6">Paling banyak dibaca & diunduh oleh instansi</p>
 </div>
 <div class="space-y-4">
 <div v-for="item in popularKajians" :key="item.id" class="flex items-start gap-3 border-b border-gray-50 dark:border-gray-700 pb-3 last:border-0 last:pb-0">
 <div class="p-2 bg-teal-50 dark:bg-teal-900/20 text-teal-600 rounded-sm shrink-0">
 <Icon icon="solar:file-text-bold" class="w-5 h-5" />
 </div>
 <div class="min-w-0 flex-1">
 <h5 class="text-xs font-bold text-gray-800 dark:text-gray-200 line-clamp-1 hover:underline">
 <Link :href="route('portal.detail', item.slug)">{{ item.judul }}</Link>
 </h5>
 <p class="text-[10px] text-gray-400 mt-0.5">{{ item.tahun?.tahun }} • {{ item.jenis_kajian?.nama }}</p>
 </div>
 <span class="text-xs font-bold text-teal-600 dark:text-teal-400 flex items-center shrink-0">
 <Icon icon="solar:download-bold" class="w-3.5 h-3.5 mr-1" />
 {{ item.download_count }}
 </span>
 </div>
 </div>
 </div>

 <!-- Recent List -->
 <div class="lg:col-span-2 bg-paper dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-card p-6 flex flex-col justify-between">
 <div>
 <h4 class="font-bold text-gray-800 dark:text-white text-base mb-1">Publikasi Riset Terbaru</h4>
 <p class="text-xs text-gray-400 mb-6 font-medium">Buku, laporan kajian, dan naskah akademik terbaru</p>
 </div>
 <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div v-for="item in recentKajians" :key="item.id" class="p-4 bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800 rounded-card flex flex-col justify-between hover: transition-colors duration-150 duration-200">
 <div>
 <span class="bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded border border-teal-200/30">
 {{ item.jenis_kajian?.nama || 'Kajian' }}
 </span>
 <h5 class="text-xs font-bold text-gray-800 dark:text-gray-200 line-clamp-2 mt-2 leading-relaxed">
 {{ item.judul }}
 </h5>
 </div>
 <div class="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
 <span class="text-[10px] text-gray-400 font-medium">{{ item.tahun?.tahun }} • {{ item.bidang?.nama }}</span>
 <Link 
 :href="route('portal.detail', item.slug)" 
 class="text-xs font-bold text-teal-600 hover:text-teal-800 transition-colors"
 >
 Baca
 </Link>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </AuthenticatedLayout>
</template>
