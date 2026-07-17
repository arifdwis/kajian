<script setup>
import { ref } from 'vue';
import { Head, router } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import Pagination from '@/Components/Pagination.vue';
import ConfirmModal from '@/Components/ConfirmModal.vue';
import { useToast } from 'vue-toastification';
import axios from 'axios';

const toast = useToast();

const props = defineProps({
 logs: Object,
 filters: Object,
});

const search = ref(props.filters.search || '');
const activeLog = ref(null);
const showModal = ref(false);

const handleSearch = () => {
 router.get(route('settings.log-activity.index'), { search: search.value }, {
 preserveState: true,
 preserveScroll: true,
 });
};

const viewDetails = (id) => {
 axios.get(route('settings.log-activity.show', id))
 .then(res => {
 activeLog.value = res.data;
 showModal.value = true;
 })
 .catch(err => {
 toast.error('Gagal mengambil data log detail.');
 console.error(err);
 });
};

const showConfirmDelete = ref(false);
const deleteTargetId = ref(null);

const confirmDeleteLog = (id) => {
 deleteTargetId.value = id;
 showConfirmDelete.value = true;
};

const executeDeleteLog = () => {
 router.delete(route('settings.log-activity.destroy', deleteTargetId.value), {
 onSuccess: () => {
 showConfirmDelete.value = false;
 },
 onError: (error) => toast.error('Gagal menghapus log.')
 });
};

const formatJson = (json) => {
 if (!json) return '-';
 try {
 const obj = typeof json === 'string' ? JSON.parse(json) : json;
 return JSON.stringify(obj, null, 2);
 } catch(e) {
 return json;
 }
};
</script>

<template>
 <Head title="Audit Log Aktivitas" />
 
 <AuthenticatedLayout>
 <div class="space-y-6 w-full">
 <!-- Header -->
 <div class="bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700 ">
 <h3 class="text-xl font-bold text-gray-900 dark:text-white">Audit Trail & Log Aktivitas</h3>
 <p class="text-xs text-gray-500 mt-1">Daftar rekaman jejak audit operasi sistem yang dilakukan oleh pengguna terotentikasi.</p>
 </div>

 <!-- Search and Table -->
 <div class="bg-paper dark:bg-gray-800 rounded-card border border-gray-100 dark:border-gray-700 overflow-hidden p-6 space-y-4">
 <div class="flex justify-between items-center max-w-md">
 <div class="relative w-full">
 <Icon icon="solar:magnifer-linear" class="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
 <input 
 type="text" 
 v-model="search"
 @keyup.enter="handleSearch"
 placeholder="Cari berdasarkan aksi, nama pengguna..."
 class="w-full text-xs pl-10 pr-4 py-2.5 rounded-sm border border-gray-300 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white"
 />
 </div>
 </div>

 <div class="overflow-x-auto border border-gray-100 dark:border-gray-700 rounded-card">
 <table class="w-full text-left text-sm">
 <thead class="bg-gray-50 dark:bg-gray-900/50 text-gray-400 text-xs font-semibold uppercase tracking-wider border-b border-gray-100 dark:border-gray-700">
 <tr>
 <th class="px-6 py-4">Waktu</th>
 <th class="px-6 py-4">Pengguna</th>
 <th class="px-6 py-4">Aksi / Operasi</th>
 <th class="px-6 py-4">IP Address</th>
 <th class="px-6 py-4 text-right">Aksi</th>
 </tr>
 </thead>
 <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
 <tr v-if="logs.data.length === 0">
 <td colspan="5" class="px-6 py-8 text-center text-gray-400">
 Tidak ada catatan log aktivitas ditemukan.
 </td>
 </tr>
 <tr v-for="item in logs.data" :key="item.id" class="hover:bg-gray-50/50 dark:hover:bg-gray-800 transition-colors">
 <td class="px-6 py-4 text-xs font-semibold text-gray-500">
 {{ $formatDateTime(item.created_at) }}
 </td>
 <td class="px-6 py-4 text-gray-900 dark:text-white font-semibold">
 {{ item.user?.name || 'Sistem / Guest' }}
 </td>
 <td class="px-6 py-4 font-mono text-xs text-blue-600 dark:text-blue-400">
 {{ item.action }}
 </td>
 <td class="px-6 py-4 text-xs text-gray-500">
 {{ item.ip_address }}
 </td>
 <td class="px-6 py-4 text-right">
 <div class="flex items-center justify-end gap-2">
 <button 
 @click="viewDetails(item.id)"
 class="p-2 bg-gray-50 hover:bg-paper-2 text-gray-600 hover:text-blue-600 dark:bg-gray-600 dark:text-gray-300 rounded-sm transition-all"
 title="Detail Log"
 >
 <Icon icon="solar:eye-bold" class="w-4 h-4" />
 </button>
 <button 
 @click="confirmDeleteLog(item.id)"
 class="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-sm transition-all"
 title="Hapus"
 >
 <Icon icon="solar:trash-bin-trash-bold" class="w-4 h-4" />
 </button>
 </div>
 </td>
 </tr>
 </tbody>
 </table>
 </div>

 <!-- Pagination -->
 <div class="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2">
 <p class="text-xs text-gray-400">
 Menampilkan {{ logs.from || 0 }} sampai {{ logs.to || 0 }} dari {{ logs.total }} data
 </p>
 <Pagination :links="logs.links" />
 </div>
 </div>

 <!-- Inline Glassmorphic Detail Modal -->
 <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
 <!-- Backdrop -->
 <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" @click="showModal = false"></div>
 
 <!-- Modal Content -->
 <div class="relative w-full max-w-2xl bg-paper dark:bg-paper-dark border border-rule dark:border-rule-dark rounded-card p-6 space-y-4 max-h-[85vh] overflow-y-auto">
 <div class="flex justify-between items-center border-b dark:border-slate-800 pb-3">
 <h4 class="font-bold text-slate-900 dark:text-white">
 Rincian Jejak Audit Log
 </h4>
 <button @click="showModal = false" class="text-slate-400 hover:text-slate-600">
 <Icon icon="solar:close-square-linear" class="w-5 h-5" />
 </button>
 </div>

 <div v-if="activeLog" class="space-y-4 text-xs">
 <div class="grid grid-cols-2 gap-4">
 <div>
 <span class="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Waktu Operasi</span>
 <span class="text-slate-900 dark:text-slate-200 mt-1 block font-semibold">{{ $formatDateTime(activeLog.created_at) }}</span>
 </div>
 <div>
 <span class="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Nama Pengguna</span>
 <span class="text-slate-900 dark:text-slate-200 mt-1 block font-semibold">{{ activeLog.user?.name || 'Sistem / Guest' }}</span>
 </div>
 <div>
 <span class="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">IP Address</span>
 <span class="text-slate-900 dark:text-slate-200 mt-1 block font-mono">{{ activeLog.ip_address }}</span>
 </div>
 <div>
 <span class="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Aksi / Operasi</span>
 <span class="text-blue-600 dark:text-blue-400 mt-1 block font-mono font-bold">{{ activeLog.action }}</span>
 </div>
 </div>

 <div>
 <span class="text-[9px] text-slate-400 font-bold uppercase tracking-wider block mb-1">User Agent</span>
 <span class="text-slate-600 dark:text-slate-300 block font-light font-mono leading-relaxed bg-paper-2 dark:bg-paper-2-dark p-2.5 rounded-sm border border-rule dark:border-rule-dark">
 {{ activeLog.user_agent }}
 </span>
 </div>

 <!-- Diff views -->
 <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div>
 <span class="text-[9px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Nilai Lama (Old Values)</span>
 <pre class="p-3 bg-paper-2 dark:bg-paper-2-dark border dark:border-slate-800 text-slate-700 dark:text-slate-400 font-mono text-[10px] rounded-sm overflow-x-auto max-h-48">{{ formatJson(activeLog.old_values) }}</pre>
 </div>
 <div>
 <span class="text-[9px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Nilai Baru (New Values)</span>
 <pre class="p-3 bg-paper-2 dark:bg-paper-2-dark border dark:border-slate-800 text-slate-700 dark:text-slate-400 font-mono text-[10px] rounded-sm overflow-x-auto max-h-48">{{ formatJson(activeLog.new_values) }}</pre>
 </div>
 </div>
 </div>
 </div>
 </div>

 <!-- Custom Reusable Confirm Modal -->
 <ConfirmModal 
 :show="showConfirmDelete"
 title="Hapus Log Aktivitas"
 message="Apakah Anda yakin ingin menghapus log aktivitas (audit trail) ini?"
 confirm-text="Ya, Hapus"
 cancel-text="Batal"
 type="danger"
 @confirm="executeDeleteLog"
 @cancel="showConfirmDelete = false"
 />
 </div>
 </AuthenticatedLayout>
</template>
