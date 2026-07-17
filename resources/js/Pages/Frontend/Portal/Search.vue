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
  results: Object,
  filters: Object,
  bidangs: Array,
  jenisKajians: Array,
  tahuns: Array,
});

const q = ref(props.filters.q || '');
const bidang_id = ref(props.filters.bidang_id || '');
const jenis_id = ref(props.filters.jenis_id || '');
const tahun_id = ref(props.filters.tahun_id || '');

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

const handleSearch = () => {
 router.get(route('portal.search'), {
 q: q.value,
 bidang_id: bidang_id.value,
 jenis_id: jenis_id.value,
 tahun_id: tahun_id.value,
 }, {
 preserveState: true,
 preserveScroll: true,
 });
};

const resetFilter = () => {
 q.value = '';
 bidang_id.value = '';
 jenis_id.value = '';
 tahun_id.value = '';
 handleSearch();
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
 <Head title="Pencarian Canggih" />
 
  <FrontendLayout>
  <div class="container mx-auto px-4 xl:px-0 pt-8 pb-16 space-y-10">
  <!-- Header -->
  <div class="text-center max-w-2xl mx-auto">
  <h2 class="text-3xl font-semibold" style="font-family: var(--font-display); color: var(--color-ink); letter-spacing: -0.02em;">Pencarian Dokumen</h2>
  <p class="text-sm mt-2" style="color: var(--color-ink-2);">Gunakan kombinasi kata kunci dan filter untuk penelusuran lebih akurat</p>
  </div>

  <div style="border: 1px solid var(--color-rule); border-radius: 12px; background-color: var(--color-paper); padding: 32px;">
  <div class="relative">
  <Icon icon="solar:magnifer-linear" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style="color: var(--color-ink-2);" />
  <input 
  type="text" 
  v-model="q"
  placeholder="Cari judul kajian, abstrak, penulis..."
  class="w-full pl-12 pr-4 py-3.5 text-sm rounded-md" style="border: 1px solid var(--color-rule); color: var(--color-ink); background-color: var(--color-paper-2);"
  @keyup.enter="handleSearch"
  />
  </div>

  <div class="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-6">
  <div>
  <label class="block text-xs font-medium mb-2.5" style="color: var(--color-ink-2);">Klaster Bidang</label>
  <SearchSelect
  v-model="bidang_id"
  :options="bidangOptions"
  placeholder="Semua Bidang"
  @change="handleSearch"
  />
  </div>
  <div>
  <label class="block text-xs font-medium mb-2.5" style="color: var(--color-ink-2);">Jenis Penelitian</label>
  <SearchSelect
  v-model="jenis_id"
  :options="jenisOptions"
  placeholder="Semua Jenis"
  @change="handleSearch"
  />
  </div>
  <div>
  <label class="block text-xs font-medium mb-2.5" style="color: var(--color-ink-2);">Tahun</label>
  <SearchSelect
  v-model="tahun_id"
  :options="tahunOptions"
  placeholder="Semua Tahun"
  @change="handleSearch"
  />
  </div>
  </div>

  <div class="flex justify-end gap-3 mt-6 pt-5" style="border-top: 1px solid var(--color-rule);">
  <button 
  @click="resetFilter"
  class="px-5 py-2.5 text-sm font-medium rounded-md" style="border: 1px solid var(--color-rule); color: var(--color-ink);"
  @mouseenter="$event.target.style.backgroundColor = 'var(--color-paper-2)'"
  @mouseleave="$event.target.style.backgroundColor = 'transparent'"
  >
  Reset
  </button>
  <button 
  @click="handleSearch"
  class="px-6 py-2.5 text-sm font-semibold rounded-md" style="background-color: var(--color-accent); color: var(--color-accent-ink);"
  @mouseenter="$event.target.style.backgroundColor = 'oklch(39% 0.055 135)'"
  @mouseleave="$event.target.style.backgroundColor = 'var(--color-accent)'"
  >
  Cari
  </button>
  </div>
  </div>

  <div class="space-y-6">
  <div class="flex items-center justify-between">
  <p style="color: var(--color-ink-2); font-size: 14px;">Ditemukan <strong style="color: var(--color-ink);">{{ results.total }}</strong> hasil pencarian <span v-if="filters.q">untuk "{{ filters.q }}"</span></p>
  </div>

  <div v-if="results.data.length === 0" class="text-center p-12" style="border: 1px solid var(--color-rule); border-radius: 12px; color: var(--color-ink-2); background-color: var(--color-paper);">
  <Icon icon="solar:minimalistic-magnifer-zoom-out-bold" class="w-12 h-12 mx-auto mb-3" style="color: var(--color-ink-2);" />
  <p>Dokumen tidak ditemukan. Silakan ganti kata kunci atau gunakan filter.</p>
  </div>

  <div class="space-y-4">
  <div 
  v-for="item in results.data" 
  :key="item.id"
  class="p-6 transition-colors" style="border: 1px solid var(--color-rule); border-radius: 12px; background-color: var(--color-paper);"
  @mouseenter="$event.target.style.borderColor = 'var(--color-accent)'"
  @mouseleave="$event.target.style.borderColor = 'var(--color-rule)'"
  >
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
  <div class="min-w-0 flex-1 space-y-2">
  <div class="flex items-center gap-2">
  <span class="text-xs font-medium px-2.5 py-1 rounded-md" style="background-color: var(--color-paper-2); color: var(--color-accent); border: 1px solid var(--color-rule);">
  {{ item.jenis_kajian?.nama }}
  </span>
  <span style="font-size: 12px; color: var(--color-ink-2);">{{ item.tahun?.tahun }}</span>
  </div>
  <h4 class="font-semibold text-sm" style="color: var(--color-ink);">
  <Link :href="route('portal.detail', item.slug)">{{ item.judul }}</Link>
  </h4>
  <p class="text-sm line-clamp-2 leading-relaxed" style="color: var(--color-ink-2);">
  {{ item.ringkasan }}
  </p>
  <span style="font-size: 11px; color: var(--color-ink-2);">Rumpun: {{ item.bidang?.nama }}</span>
  </div>

  <div class="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 shrink-0 sm:pl-6" style="border-left: 1px solid var(--color-rule);">
  <div class="flex items-center gap-4" style="color: var(--color-ink-2); font-size: 13px;">
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

  <div class="flex justify-end pt-4">
  <Pagination :links="results.links" />
  </div>
  </div>
  </div>
  </FrontendLayout>
</template>
