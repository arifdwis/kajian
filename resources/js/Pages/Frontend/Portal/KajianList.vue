<!-- Hallmark · genre: modern-minimal · macrostructure: Filter + Index · theme: Samarinda civic green · design-system: design.md · designed-as-app -->
<script setup>
import { ref, computed } from 'vue';
import { Head, Link, router } from '@inertiajs/vue3';
import FrontendLayout from '@/Layouts/FrontendLayout.vue';
import Pagination from '@/Components/Pagination.vue';
import axios from 'axios';
import { useToast } from 'vue-toastification';

const toast = useToast();

const props = defineProps({
  kajians: Object,
  filters: Object,
  bidangs: Array,
  jenisKajians: Array,
  tahuns: Array,
});

const search = ref(props.filters.search || '');
const bidang_id = ref(props.filters.bidang_id || '');
const jenis_id = ref(props.filters.jenis_id || '');
const tahun_id = ref(props.filters.tahun_id || '');
const sort = ref(props.filters.sort || 'terbaru');

const sortOptions = [
  { label: 'Terbaru', value: 'terbaru' },
  { label: 'Terpopuler', value: 'populer' },
  { label: 'Judul A-Z', value: 'a-z' },
];
const bidangOptions = computed(() => [
  { label: 'Semua Bidang', value: '' },
  ...props.bidangs.map(b => ({ label: b.nama, value: b.id }))
]);
const jenisOptions = computed(() => [
  { label: 'Semua Jenis', value: '' },
  ...props.jenisKajians.map(j => ({ label: j.nama, value: j.id }))
]);
const tahunOptions = computed(() => [
  { label: 'Semua Tahun', value: '' },
  ...props.tahuns.map(t => ({ label: t.tahun, value: t.id }))
]);

const handleFilter = () => {
 router.get(route('portal.kajian'), {
 search: search.value,
 bidang_id: bidang_id.value,
 jenis_id: jenis_id.value,
 tahun_id: tahun_id.value,
 sort: sort.value,
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
 sort.value = 'terbaru';
 handleFilter();
};

const getCoverUrl = (item) => {
 if (!item.files) return null;
 const file = item.files.find(f => f.tipe === 'cover');
 return file ? `/storage/${file.file_path}` : null;
};

const directDownload = (slug) => {
 toast.info('Memulai unduhan...');
 axios.post(route('portal.download', slug), {}, { responseType: 'blob' })
  .then((response) => {
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', slug + '.pdf');
  document.body.appendChild(link);
  link.click();
  link.remove();
  toast.success('Unduhan berhasil.');
  })
  .catch(() => toast.error('Gagal mengunduh berkas.'));
};
</script>

<template>
 <Head title="Daftar Kajian Publik" />
 
  <FrontendLayout>
  <div class="container mx-auto px-4 xl:px-0 pt-8 pb-16">
  <!-- Header -->
  <div class="mb-10 pb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4" style="border-bottom: 1px solid var(--color-rule);">
  <div>
  <h2 class="text-3xl font-semibold" style="font-family: var(--font-display); color: var(--color-ink); letter-spacing: -0.02em;">Arsip Kajian &amp; Penelitian</h2>
  <p class="text-sm mt-2" style="color: var(--color-ink-2);">Browse pustaka publikasi strategis Bapperida Samarinda</p>
  </div>
  <div class="flex items-center gap-3">
  <label class="text-xs font-medium" style="color: var(--color-ink-2);">Urutkan</label>
  <SearchSelect
  v-model="sort"
  :options="sortOptions"
  @change="handleFilter"
  classes="w-40"
  />
  </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-4 gap-10">
  <!-- Sidebar Filters -->
  <div class="lg:col-span-1 p-6" style="border: 1px solid var(--color-rule); border-radius: 12px; background-color: var(--color-paper); height: fit-content;">
  <h4 class="font-semibold mb-6" style="color: var(--color-ink); font-size: 15px;">Filter Pencarian</h4>
  
  <div class="space-y-6">
  <div>
  <label class="block text-xs font-medium mb-2.5" style="color: var(--color-ink-2);">Kata Kunci</label>
  <input 
  type="text" 
  v-model="search" 
  placeholder="Judul, abstrak..."
  class="w-full text-sm px-4 py-2.5 rounded-md" style="border: 1px solid var(--color-rule); color: var(--color-ink); background-color: var(--color-paper-2);"
  @keyup.enter="handleFilter"
  />
  </div>

  <div>
  <label class="block text-xs font-medium mb-2.5" style="color: var(--color-ink-2);">Bidang OPD</label>
  <SearchSelect
  v-model="bidang_id"
  :options="bidangOptions"
  placeholder="Semua Bidang"
  @change="handleFilter"
  />
  </div>

  <div>
  <label class="block text-xs font-medium mb-2.5" style="color: var(--color-ink-2);">Jenis Kajian</label>
  <SearchSelect
  v-model="jenis_id"
  :options="jenisOptions"
  placeholder="Semua Jenis"
  @change="handleFilter"
  />
  </div>

  <div>
  <label class="block text-xs font-medium mb-2.5" style="color: var(--color-ink-2);">Tahun Terbit</label>
  <SearchSelect
  v-model="tahun_id"
  :options="tahunOptions"
  placeholder="Semua Tahun"
  @change="handleFilter"
  />
  </div>
  </div>

  <div class="flex gap-2 mt-6">
  <button 
  @click="resetFilter"
  class="flex-1 py-2.5 text-sm font-medium rounded-md" style="border: 1px solid var(--color-rule); color: var(--color-ink);"
  @mouseenter="$event.target.style.backgroundColor = 'var(--color-paper-2)'"
  @mouseleave="$event.target.style.backgroundColor = 'transparent'"
  >
  Reset
  </button>
  <button 
  @click="handleFilter"
  class="flex-1 py-2.5 text-sm font-semibold rounded-md" style="background-color: var(--color-accent); color: var(--color-accent-ink);"
  @mouseenter="$event.target.style.backgroundColor = 'oklch(39% 0.055 135)'"
  @mouseleave="$event.target.style.backgroundColor = 'var(--color-accent)'"
  >
  Terapkan
  </button>
  </div>
  </div>

  <!-- Kajian Grid list -->
  <div class="lg:col-span-3 space-y-8">
  <div v-if="kajians.data.length === 0" class="text-center p-12" style="border: 1px solid var(--color-rule); border-radius: 12px; color: var(--color-ink-2); background-color: var(--color-paper);">
  <Icon icon="solar:folder-error-bold" class="w-12 h-12 mx-auto mb-3" style="color: var(--color-ink-2);" />
  Belum ada dokumen kajian yang diterbitkan dengan filter ini.
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
  <div 
  v-for="item in kajians.data" 
  :key="item.id"
  class="transition-colors overflow-hidden flex flex-col" style="border: 1px solid var(--color-rule); border-radius: 12px; background-color: var(--color-paper);"
  @mouseenter="$event.target.style.borderColor = 'var(--color-accent)'"
  @mouseleave="$event.target.style.borderColor = 'var(--color-rule)'"
  >
  <div class="aspect-[4/3]" style="background-color: var(--color-paper-2); position: relative; display: flex; align-items: center; justify-content: center; border-bottom: 1px solid var(--color-rule);">
  <img 
  v-if="getCoverUrl(item)" 
  :src="getCoverUrl(item)" 
  alt="Cover Image"
  class="w-full h-full object-cover" 
  />
  <div v-else class="text-center p-4" style="color: var(--color-ink-2);">
  <Icon icon="solar:document-bold" class="w-10 h-10 mx-auto mb-1" />
  <span style="font-size: 12px;">Tidak ada cover</span>
  </div>
  <span class="absolute top-3 left-3 px-2.5 py-1 text-xs font-medium rounded-md" style="background-color: var(--color-accent); color: var(--color-accent-ink);">
  {{ item.jenis_kajian?.nama }}
  </span>
  </div>

  <div class="p-5 flex flex-col flex-1">
  <div class="flex-1">
  <span style="font-size: 11px; color: var(--color-ink-2);">Tahun {{ item.tahun?.tahun }} &middot; {{ item.bidang?.nama }}</span>
  <h4 class="font-semibold text-sm mt-2 leading-snug line-clamp-2" style="color: var(--color-ink);">
  <Link :href="route('portal.detail', item.slug)">{{ item.judul }}</Link>
  </h4>
  <p class="text-xs mt-2 line-clamp-2 leading-relaxed" style="color: var(--color-ink-2);">
  {{ item.ringkasan }}
  </p>
  </div>

  <div class="pt-3.5 mt-auto flex items-center justify-between" style="border-top: 1px solid var(--color-rule);">
  <div class="flex items-center gap-3" style="font-size: 12px; color: var(--color-ink-2);">
  <span class="flex items-center gap-1"><Icon icon="solar:eye-linear" class="w-4 h-4" /> {{ item.view_count || 0 }}</span>
  <span class="flex items-center gap-1"><Icon icon="solar:download-linear" class="w-4 h-4" /> {{ item.download_count || 0 }}</span>
  </div>
  <div class="flex items-center gap-2">
  <Link
  :href="route('portal.detail', item.slug)"
  class="px-3 py-1.5 text-xs font-semibold rounded-md" style="border: 1px solid var(--color-rule); color: var(--color-ink);"
  >
  Baca
  </Link>
  <button
  @click="directDownload(item.slug)"
  class="px-3 py-1.5 text-xs font-semibold rounded-md cursor-pointer" style="background-color: var(--color-accent); color: var(--color-accent-ink);"
  >
  Unduh
  </button>
  </div>
  </div>
  </div>
  </div>
  </div>

  <div class="flex justify-center md:justify-end pt-4">
  <Pagination :links="kajians.links" />
  </div>
  </div>
  </div>
  </div>
  </FrontendLayout>
</template>
