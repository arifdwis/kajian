<script setup>
import { ref } from 'vue';
import { Head, Link, router } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import Pagination from '@/Components/Pagination.vue';
import ConfirmModal from '@/Components/ConfirmModal.vue';
import { useToast } from 'vue-toastification';

const toast = useToast();

const props = defineProps({
 users: Object,
 filters: Object,
});

const search = ref(props.filters.search || '');

const handleSearch = () => {
 router.get(route('settings.users.index'), { search: search.value }, {
 preserveState: true,
 preserveScroll: true,
 });
};

const showConfirmDelete = ref(false);
const deleteTargetId = ref(null);

const confirmDeleteUser = (id) => {
 deleteTargetId.value = id;
 showConfirmDelete.value = true;
};

const executeDeleteUser = () => {
 router.delete(route('settings.users.destroy', deleteTargetId.value), {
 onSuccess: () => {
 showConfirmDelete.value = false;
 },
 onError: (error) => toast.error('Gagal menghapus user.')
 });
};
</script>

<template>
 <Head title="Manajemen Pengguna" />
 
 <AuthenticatedLayout>
 <div class="space-y-6 w-full">
 <!-- Header -->
 <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700 ">
  <div>
  <h3 class="text-xl font-bold text-gray-900 dark:text-white">Manajemen Pengguna</h3>
  <p class="text-xs text-gray-500 mt-1">Kelola akun pengguna, penugasan role, dan OPD instansi.</p>
  </div>
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
 placeholder="Cari user (nama, email)..."
 class="w-full text-xs pl-10 pr-4 py-2.5 rounded-sm border border-gray-300 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white"
 />
 </div>
 </div>

 <div class="overflow-x-auto border border-gray-100 dark:border-gray-700 rounded-card">
 <table class="w-full text-left text-sm">
 <thead class="bg-gray-50 dark:bg-gray-900/50 text-gray-400 text-xs font-semibold uppercase tracking-wider border-b border-gray-100 dark:border-gray-700">
 <tr>
 <th class="px-6 py-4">Nama</th>
 <th class="px-6 py-4">Email</th>
 <th class="px-6 py-4">Role</th>
 <th class="px-6 py-4 text-right">Aksi</th>
 </tr>
 </thead>
 <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
 <tr v-if="users.data.length === 0">
 <td colspan="4" class="px-6 py-8 text-center text-gray-400">
 Tidak ada data pengguna ditemukan.
 </td>
 </tr>
 <tr v-for="item in users.data" :key="item.id" class="hover:bg-gray-50/50 dark:hover:bg-gray-800 transition-colors">
 <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
 {{ item.name }}
 </td>
 <td class="px-6 py-4 text-gray-550 dark:text-gray-300">
 {{ item.email }}
 </td>
 <td class="px-6 py-4">
 <div class="flex flex-wrap gap-1">
 <span 
 v-for="r in item.roles" 
 :key="r.id"
 class="text-[10px] font-bold bg-paper-2 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800 px-2 py-0.5 rounded-md"
 >
 {{ r.name }}
 </span>
 </div>
 </td>
 <td class="px-6 py-4 text-right">
 <div class="flex items-center justify-end gap-2">
 <Link 
 :href="route('settings.users.edit', item.id)"
 class="p-2 bg-gray-50 hover:bg-amber-50 text-gray-600 hover:text-amber-600 dark:bg-gray-600 dark:text-gray-300 rounded-sm transition-colors duration-150"
 title="Edit"
 >
 <Icon icon="solar:pen-bold" class="w-4 h-4" />
 </Link>
 <button 
 v-if="$page.props.auth.user.id !== item.id"
 @click="confirmDeleteUser(item.id)"
 class="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-sm transition-colors duration-150"
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
 Menampilkan {{ users.from || 0 }} sampai {{ users.to || 0 }} dari {{ users.total }} data
 </p>
 <Pagination :links="users.links" />
 </div>
 </div>

 <!-- Custom Reusable Confirm Modal -->
 <ConfirmModal 
 :show="showConfirmDelete"
 title="Hapus Akun User"
 message="Apakah Anda yakin ingin menghapus user ini secara permanen dari sistem? Tindakan ini tidak dapat dibatalkan."
 confirm-text="Ya, Hapus"
 cancel-text="Batal"
 type="danger"
 @confirm="executeDeleteUser"
 @cancel="showConfirmDelete = false"
 />
 </div>
 </AuthenticatedLayout>
</template>
