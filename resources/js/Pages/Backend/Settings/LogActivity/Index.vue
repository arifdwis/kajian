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

const modelLabels = {
 'App\\Models\\Kajian': 'Kajian',
 'App\\Models\\User': 'User',
 'App\\Models\\Role': 'Role',
 'App\\Models\\Permission': 'Permission',
 'App\\Models\\Opd': 'OPD',
 'App\\Models\\Menu': 'Menu',
 'App\\Models\\Bidang': 'Bidang',
 'App\\Models\\Tahun': 'Tahun',
 'App\\Models\\JenisKajian': 'Jenis Kajian',
 'App\\Models\\Keyword': 'Kata Kunci',
 'App\\Models\\KajianFile': 'File Kajian',
 'App\\Models\\KajianVersion': 'Versi Kajian',
 'App\\Models\\KajianGallery': 'Galeri Kajian',
 'App\\Models\\Notifikasi': 'Notifikasi',
};

const modelIcons = {
 'App\\Models\\Kajian': 'solar:document-text-bold',
 'App\\Models\\User': 'solar:user-bold',
 'App\\Models\\Role': 'solar:shield-user-bold',
 'App\\Models\\Permission': 'solar:shield-check-bold',
 'App\\Models\\Opd': 'solar:building-bold',
 'App\\Models\\Menu': 'solar:menu-dots-bold',
 'App\\Models\\Bidang': 'solar:layers-bold',
 'App\\Models\\Tahun': 'solar:calendar-bold',
 'App\\Models\\JenisKajian': 'solar:bookmark-bold',
 'App\\Models\\Keyword': 'solar:magnifer-bold',
 'App\\Models\\KajianFile': 'solar:file-bold',
 'App\\Models\\KajianVersion': 'solar:history-bold',
 'App\\Models\\KajianGallery': 'solar:gallery-bold',
 'App\\Models\\Notifikasi': 'solar:bell-bold',
};

const modelColors = {
 'App\\Models\\Kajian': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
 'App\\Models\\User': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
 'App\\Models\\Role': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
 'App\\Models\\Permission': 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
 'App\\Models\\Opd': 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400',
 'App\\Models\\Menu': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
 'App\\Models\\Bidang': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
 'App\\Models\\Tahun': 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
 'App\\Models\\JenisKajian': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
 'App\\Models\\Keyword': 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
 'App\\Models\\KajianFile': 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400',
 'App\\Models\\KajianVersion': 'bg-lime-100 text-lime-700 dark:bg-lime-900/30 dark:text-lime-400',
 'App\\Models\\KajianGallery': 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
 'App\\Models\\Notifikasi': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

const getModelLabel = (type) => modelLabels[type] || type?.split('\\').pop() || '-';
const getModelIcon = (type) => modelIcons[type] || 'solar:hashtag-bold';
const getModelColor = (type) => modelColors[type] || 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400';

const actionLabels = {
 create: 'Dibuat',
 update: 'Diperbarui',
 delete: 'Dihapus',
};

const getRecordName = (log) => {
 const nv = log.new_values || log.old_values || {};
 return nv.name || nv.judul || nv.nama || nv.title || null;
};

const formatJson = (json) => {
 if (!json) return null;
 try {
  const obj = typeof json === 'string' ? JSON.parse(json) : json;
  return obj;
 } catch(e) {
  return null;
 }
};

const formatCellValue = (key, val) => {
 if (val === null || val === undefined) return '-';
 if (key === 'password') return '***';
 if (typeof val === 'boolean') return val ? 'Ya' : 'Tidak';
 if (Array.isArray(val)) return val.length ? val.join(', ') : '-';
 if (typeof val === 'string' && val.length > 80) return val.substring(0, 80) + '...';
 return String(val);
};

const getDiffFields = (oldVals, newVals) => {
 const oldObj = formatJson(oldVals);
 const newObj = formatJson(newVals);
 if (!oldObj && !newObj) return [];

 const fields = [];
 const allKeys = new Set([...Object.keys(oldObj || {}), ...Object.keys(newObj || {})]);

 for (const key of allKeys) {
  const ov = oldObj?.[key] ?? null;
  const nv = newObj?.[key] ?? null;
  if (JSON.stringify(ov) !== JSON.stringify(nv)) {
   fields.push({ key, old: ov, new: nv });
  }
 }
 return fields;
};

const skippedFields = ['updated_at', 'created_at', 'updated_by', 'created_by'];
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
  placeholder="Cari berdasarkan aksi, nama pengguna, model..."
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
 <th class="px-6 py-4">Objek</th>
 <th class="px-6 py-4">Aksi</th>
 <th class="px-6 py-4">Rincian</th>
 <th class="px-6 py-4 text-right">Aksi</th>
 </tr>
 </thead>
 <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
 <tr v-if="logs.data.length === 0">
 <td colspan="6" class="px-6 py-8 text-center text-gray-400">
  Tidak ada catatan log aktivitas ditemukan.
 </td>
 </tr>
 <tr v-for="item in logs.data" :key="item.id" class="hover:bg-gray-50/50 dark:hover:bg-gray-800 transition-colors">
 <td class="px-6 py-4 text-xs font-semibold text-gray-500">
  {{ $formatDateTime(item.created_at) }}
 </td>
 <td class="px-6 py-4 text-gray-900 dark:text-white font-semibold text-xs">
  {{ item.user?.name || 'Sistem / Guest' }}
 </td>
 <td class="px-6 py-4">
  <span class="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-bold rounded-full" :class="getModelColor(item.model_type)">
   <Icon :icon="getModelIcon(item.model_type)" class="w-3 h-3" />
   {{ getModelLabel(item.model_type) }}
  </span>
 </td>
 <td class="px-6 py-4">
  <span class="inline-flex items-center px-2 py-0.5 text-[10px] font-bold rounded-full"
   :class="{
    'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400': item.action === 'create',
    'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400': item.action === 'update',
    'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400': item.action === 'delete',
   }">
   {{ actionLabels[item.action] || item.action }}
  </span>
 </td>
 <td class="px-6 py-4 text-xs text-gray-500 max-w-[200px] truncate">
  {{ getRecordName(item) || '#' + item.model_id }}
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

 <!-- Detail Modal -->
 <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
 <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" @click="showModal = false"></div>
 
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
  <!-- Object info banner -->
  <div class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
   <span class="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold rounded-full" :class="getModelColor(activeLog.model_type)">
    <Icon :icon="getModelIcon(activeLog.model_type)" class="w-3.5 h-3.5" />
    {{ getModelLabel(activeLog.model_type) }}
   </span>
   <span class="text-gray-400">#{{ activeLog.model_id }}</span>
   <span v-if="getRecordName(activeLog)" class="text-gray-900 dark:text-white font-semibold truncate">
    — {{ getRecordName(activeLog) }}
   </span>
   <span class="ml-auto inline-flex items-center px-2 py-0.5 text-[10px] font-bold rounded-full"
    :class="{
     'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400': activeLog.action === 'create',
     'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400': activeLog.action === 'update',
     'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400': activeLog.action === 'delete',
    }">
    {{ actionLabels[activeLog.action] || activeLog.action }}
   </span>
  </div>

  <!-- Metadata -->
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
   <span class="text-slate-600 dark:text-slate-300 block font-light font-mono leading-relaxed bg-paper-2 dark:bg-paper-2-dark p-2.5 rounded-sm border border-rule dark:border-rule-dark text-[10px]">
    {{ activeLog.user_agent }}
   </span>
  </div>

  <!-- Field-by-field diff -->
  <div v-if="activeLog.action === 'update'">
   <span class="text-[9px] text-slate-400 font-bold uppercase tracking-wider block mb-2">Perubahan Data</span>
   <div class="border dark:border-slate-800 rounded-sm overflow-hidden">
    <table class="w-full text-[11px]">
     <thead class="bg-gray-50 dark:bg-slate-800">
      <tr>
       <th class="px-3 py-2 text-left font-bold text-slate-500 w-1/4">Field</th>
       <th class="px-3 py-2 text-left font-bold text-red-500/80 w-[37.5%]">Sebelum</th>
       <th class="px-3 py-2 text-left font-bold text-emerald-600 dark:text-emerald-400 w-[37.5%]">Sesudah</th>
      </tr>
     </thead>
     <tbody class="divide-y divide-gray-100 dark:divide-slate-800">
      <tr v-for="d in getDiffFields(activeLog.old_values, activeLog.new_values).filter(d => !skippedFields.includes(d.key))" :key="d.key" class="hover:bg-gray-50/50 dark:hover:bg-slate-800/50">
       <td class="px-3 py-2 font-mono font-semibold text-slate-700 dark:text-slate-300">{{ d.key }}</td>
       <td class="px-3 py-2 font-mono text-red-500/80 bg-red-50/30 dark:bg-red-900/10">{{ formatCellValue(d.key, d.old) }}</td>
       <td class="px-3 py-2 font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50/30 dark:bg-emerald-900/10">{{ formatCellValue(d.key, d.new) }}</td>
      </tr>
      <tr v-if="getDiffFields(activeLog.old_values, activeLog.new_values).filter(d => !skippedFields.includes(d.key)).length === 0">
       <td colspan="3" class="px-3 py-4 text-center text-gray-400 italic">Tidak ada perubahan data yang terdeteksi.</td>
      </tr>
     </tbody>
    </table>
   </div>
  </div>

  <!-- Create / Delete: show all fields -->
  <div v-if="activeLog.action === 'create' || activeLog.action === 'delete'">
   <span class="text-[9px] text-slate-400 font-bold uppercase tracking-wider block mb-2">
    {{ activeLog.action === 'create' ? 'Data yang Dibuat' : 'Data yang Dihapus' }}
   </span>
   <div class="border dark:border-slate-800 rounded-sm overflow-hidden">
    <table class="w-full text-[11px]">
     <thead class="bg-gray-50 dark:bg-slate-800">
      <tr>
       <th class="px-3 py-2 text-left font-bold text-slate-500 w-1/3">Field</th>
       <th class="px-3 py-2 text-left font-bold text-slate-500 w-2/3">Nilai</th>
      </tr>
     </thead>
     <tbody class="divide-y divide-gray-100 dark:divide-slate-800">
      <tr v-for="(val, key) in formatJson(activeLog.action === 'create' ? activeLog.new_values : activeLog.old_values)" :key="key" class="hover:bg-gray-50/50 dark:hover:bg-slate-800/50">
       <td class="px-3 py-2 font-mono font-semibold text-slate-700 dark:text-slate-300">{{ key }}</td>
       <td class="px-3 py-2 font-mono text-slate-600 dark:text-slate-400">{{ formatCellValue(key, val) }}</td>
      </tr>
     </tbody>
    </table>
   </div>
  </div>

  <!-- Fallback: raw JSON for unknown actions -->
  <div v-if="activeLog.action !== 'update' && activeLog.action !== 'create' && activeLog.action !== 'delete'">
   <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
     <span class="text-[9px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Nilai Lama (Old Values)</span>
     <pre class="p-3 bg-paper-2 dark:bg-paper-2-dark border dark:border-slate-800 text-slate-700 dark:text-slate-400 font-mono text-[10px] rounded-sm overflow-x-auto max-h-48">{{ formatJson(activeLog.old_values) ? JSON.stringify(formatJson(activeLog.old_values), null, 2) : '-' }}</pre>
    </div>
    <div>
     <span class="text-[9px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Nilai Baru (New Values)</span>
     <pre class="p-3 bg-paper-2 dark:bg-paper-2-dark border dark:border-slate-800 text-slate-700 dark:text-slate-400 font-mono text-[10px] rounded-sm overflow-x-auto max-h-48">{{ formatJson(activeLog.new_values) ? JSON.stringify(formatJson(activeLog.new_values), null, 2) : '-' }}</pre>
    </div>
   </div>
  </div>
 </div>
 </div>
 </div>

 <!-- Confirm Delete Modal -->
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
