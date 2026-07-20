<script setup>
import { ref, computed, watch } from 'vue';
import { Head, Link, router } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import Pagination from '@/Components/Pagination.vue';
import ConfirmModal from '@/Components/ConfirmModal.vue';
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
const status = ref(props.filters.status || '');

const bidangOptions = computed(() => [{ label: 'Semua Bidang', value: '' }, ...props.bidangs.map(b => ({ label: b.nama, value: b.id }))]);
const jenisOptions = computed(() => [{ label: 'Semua Jenis', value: '' }, ...props.jenisKajians.map(j => ({ label: j.nama, value: j.id }))]);
const tahunOptions = computed(() => [{ label: 'Semua Tahun', value: '' }, ...props.tahuns.map(t => ({ label: t.tahun, value: t.id }))]);
const statusOptions = [
  { label: 'Semua Status', value: '' },
  { label: 'Draft', value: 'draft' },
  { label: 'Review', value: 'review' },
  { label: 'Published', value: 'published' },
  { label: 'Archived', value: 'archived' },
];

const handleFilter = () => {
 router.get(route('kajian.index'), {
 search: search.value,
 bidang_id: bidang_id.value,
 jenis_id: jenis_id.value,
 tahun_id: tahun_id.value,
 status: status.value,
 }, {
 preserveState: true,
 preserveScroll: true,
 });
};

// Reset filters
const resetFilter = () => {
 search.value = '';
 bidang_id.value = '';
 jenis_id.value = '';
 tahun_id.value = '';
 status.value = '';
 handleFilter();
};

const showConfirmModal = ref(false);
const confirmModalConfig = ref({
 title: '',
 message: '',
 confirmText: '',
 type: 'danger',
 onConfirm: () => {}
});

const openConfirm = (title, message, confirmText, type, onConfirm) => {
 confirmModalConfig.value = {
 title,
 message,
 confirmText,
 type,
 onConfirm
 };
 showConfirmModal.value = true;
};

// Delete handler
const deleteKajian = (id) => {
 openConfirm(
 'Hapus Dokumen Kajian',
 'Apakah Anda yakin ingin menghapus dokumen kajian ini? Tindakan ini tidak dapat dibatalkan.',
 'Ya, Hapus',
 'danger',
 () => {
 router.delete(route('kajian.destroy', item.uuid), {
 onSuccess: () => {
 showConfirmModal.value = false;
 },
 onError: () => toast.error('Gagal menghapus kajian.')
 });
 }
 );
};

// Publish handler
const publishKajian = (uuid) => {
 openConfirm(
 'Publikasikan Kajian',
 'Apakah Anda yakin ingin mempublikasikan kajian ini ke portal publik?',
 'Ya, Publikasikan',
 'success',
 () => {
 router.post(route('kajian.publish', uuid), {}, {
 onSuccess: () => {
 showConfirmModal.value = false;
 },
 onError: () => toast.error('Gagal mempublikasikan kajian.')
 });
 }
 );
};

// Archive handler
const archiveKajian = (uuid) => {
 openConfirm(
 'Arsipkan Kajian',
 'Apakah Anda yakin ingin mengarsipkan kajian ini?',
 'Ya, Arsipkan',
 'warning',
 () => {
 router.post(route('kajian.archive', uuid), {}, {
 onSuccess: () => {
 showConfirmModal.value = false;
 },
 onError: () => toast.error('Gagal mengarsipkan kajian.')
 });
 }
 );
};
</script>

<template>
 <Head title="Manajemen Kajian" />
 
 <AuthenticatedLayout>
 <div class="space-y-6">
 <!-- Header bar -->
 <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700 ">
 <div>
 <h3 class="text-xl font-bold text-gray-900 dark:text-white">Daftar Dokumen Kajian & Riset</h3>
 <p class="text-xs text-gray-500 mt-1">Kelola publikasi, naskah akademik, dan draf kajian OPD.</p>
 </div>
 <Link 
 :href="route('kajian.create')" 
 class="inline-flex items-center gap-2 px-5 py-3 bg-accent text-accent-ink font-semibold rounded-card transition-colors duration-150 text-sm shrink-0 "
 >
 <Icon icon="solar:add-circle-bold" class="w-5 h-5" />
 Tambah Kajian
 </Link>
 </div>

 <!-- Filter Card -->
 <div class="bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700 space-y-4">
 <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
 <div>
 <label class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Cari</label>
 <input 
 type="text" 
 v-model="search" 
 placeholder="Judul, Penulis..."
 class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5"
 @keyup.enter="handleFilter"
 />
 </div>

 <div>
 <label class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Bidang</label>
 <SearchSelect
 v-model="bidang_id"
 :options="bidangOptions"
 @change="handleFilter"
 />
 </div>

 <div>
 <label class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Jenis</label>
 <SearchSelect
 v-model="jenis_id"
 :options="jenisOptions"
 @change="handleFilter"
 />
 </div>

 <div>
 <label class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Tahun</label>
 <SearchSelect
 v-model="tahun_id"
 :options="tahunOptions"
 @change="handleFilter"
 />
 </div>

 <div>
 <label class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Status</label>
 <SearchSelect
 v-model="status"
 :options="statusOptions"
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

 <!-- Table Card -->
 <div class="bg-paper dark:bg-gray-800 rounded-card border border-gray-100 dark:border-gray-700 overflow-hidden">
 <div class="overflow-x-auto">
 <table class="w-full text-left text-sm">
 <thead class="bg-gray-50/70 dark:bg-gray-900/50 text-gray-400 text-xs font-semibold uppercase tracking-wider border-b border-gray-100 dark:border-gray-700">
 <tr>
 <th class="px-6 py-4">Informasi Kajian</th>
 <th class="px-6 py-4">Bidang / Jenis</th>
 <th class="px-6 py-4">Tahun</th>
 <th class="px-6 py-4">Status</th>
 <th class="px-6 py-4 text-right">Aksi</th>
 </tr>
 </thead>
 <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
 <tr v-if="kajians.data.length === 0">
 <td colspan="5" class="px-6 py-12 text-center text-gray-400 font-medium">
 <Icon icon="solar:folder-error-bold" class="w-12 h-12 mx-auto mb-2 text-gray-300" />
 Tidak ada dokumen kajian yang ditemukan.
 </td>
 </tr>
 <tr v-for="item in kajians.data" :key="item.id" class="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
 <td class="px-6 py-4 max-w-md">
 <div class="font-semibold text-gray-900 dark:text-white line-clamp-2">
 {{ item.judul }}
 </div>
 <div class="text-xs text-gray-400 mt-1 flex items-center gap-2">
 <span>PJ: {{ item.penanggung_jawab || '-' }}</span>
 </div>
 </td>
 <td class="px-6 py-4">
 <div class="text-xs font-semibold text-gray-700 dark:text-gray-300">
 {{ item.bidang?.nama || '-' }}
 </div>
 <div class="text-[10px] text-gray-400 mt-0.5">
 {{ item.jenis_kajian?.nama || '-' }}
 </div>
 </td>
 <td class="px-6 py-4 text-gray-500 font-medium">
 {{ item.tahun?.tahun }}
 </td>
 <td class="px-6 py-4">
 <span 
 class="px-2.5 py-1 rounded-full text-xs font-bold border capitalize"
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
 <div class="flex items-center justify-end gap-2">
 <!-- Actions per role / status -->
 <button 
 v-if="item.status === 'review' && $page.props.auth.roles.some(r => ['superadmin', 'admin'].includes(r))"
 @click="publishKajian(item.uuid)"
 class="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-sm transition-colors duration-150"
 title="Publish"
 >
 <Icon icon="solar:check-square-bold" class="w-4 h-4" />
 </button>
 <button 
 v-if="item.status === 'published' && $page.props.auth.roles.some(r => ['superadmin', 'admin'].includes(r))"
 @click="archiveKajian(item.uuid)"
 class="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-sm transition-colors duration-150"
 title="Archive"
 >
 <Icon icon="solar:archive-down-bold" class="w-4 h-4" />
 </button>
 
 <Link 
 :href="route('kajian.show', item.uuid)" 
 class="p-2 bg-gray-50 hover:bg-paper-2 text-gray-600 hover:text-blue-600 dark:bg-gray-700 dark:text-gray-300 rounded-sm transition-colors duration-150"
 title="Detail"
 >
 <Icon icon="solar:eye-bold" class="w-4 h-4" />
 </Link>

 <Link 
 :href="route('kajian.edit', item.uuid)" 
 class="p-2 bg-gray-50 hover:bg-amber-50 text-gray-600 hover:text-amber-600 dark:bg-gray-700 dark:text-gray-300 rounded-sm transition-colors duration-150"
 title="Edit"
 >
 <Icon icon="solar:pen-bold" class="w-4 h-4" />
 </Link>

 <button 
 @click="deleteKajian(item.id)"
 class="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-sm transition-colors duration-150"
 title="Delete"
 >
 <Icon icon="solar:trash-bin-trash-bold" class="w-4 h-4" />
 </button>
 </div>
 </td>
 </tr>
 </tbody>
 </table>
 </div>

 <!-- Footer Pagination -->
 <div class="px-6 py-4 border-t border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4">
 <p class="text-xs text-gray-400 font-medium">
 Menampilkan {{ kajians.from || 0 }} sampai {{ kajians.to || 0 }} dari {{ kajians.total }} data
 </p>
 <Pagination :links="kajians.links" />
 </div>
 </div>

 <!-- Custom Reusable Confirm Modal -->
 <ConfirmModal 
 :show="showConfirmModal"
 :title="confirmModalConfig.title"
 :message="confirmModalConfig.message"
 :confirm-text="confirmModalConfig.confirmText"
 :type="confirmModalConfig.type"
 @confirm="confirmModalConfig.onConfirm"
 @cancel="showConfirmModal = false"
 />
 </div>
 </AuthenticatedLayout>
</template>
