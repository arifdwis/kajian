<script setup>
import { ref } from 'vue';
import { Head, Link, router } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import Pagination from '@/Components/Pagination.vue';
import ConfirmModal from '@/Components/ConfirmModal.vue';
import { useToast } from 'vue-toastification';

const toast = useToast();

const props = defineProps({
 permissions: Object,
 filters: Object,
});

const search = ref(props.filters.search || '');

const handleSearch = () => {
 router.get(route('settings.permissions.index'), { search: search.value }, {
 preserveState: true,
 preserveScroll: true,
 });
};

const showConfirmDelete = ref(false);
const deleteTargetId = ref(null);

const confirmDeletePermission = (id) => {
 deleteTargetId.value = id;
 showConfirmDelete.value = true;
};

const executeDeletePermission = () => {
 router.delete(route('settings.permissions.destroy', deleteTargetId.value), {
 onSuccess: () => {
 showConfirmDelete.value = false;
 },
 onError: (error) => toast.error('Gagal menghapus permission.')
 });
};
</script>

<template>
 <Head title="Manajemen Permission" />
 
 <AuthenticatedLayout>
 <div class="space-y-6 w-full">
 <!-- Header -->
 <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700 ">
 <div>
 <h3 class="text-xl font-bold text-gray-900 dark:text-white">Manajemen Permission</h3>
 <p class="text-xs text-gray-500 mt-1">Daftar perizinan akses sistem granular yang digunakan SIKAJIAN.</p>
 </div>
 <Link 
 :href="route('settings.permissions.create')"
 class="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-accent-ink font-semibold rounded-card transition-colors duration-150 text-sm shrink-0 "
 >
 <Icon icon="solar:add-circle-bold" class="w-5 h-5" />
 Tambah Permission
 </Link>
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
 placeholder="Cari permission..."
 class="w-full text-xs pl-10 pr-4 py-2.5 rounded-sm border border-gray-300 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white"
 />
 </div>
 </div>

 <div class="overflow-x-auto border border-gray-100 dark:border-gray-700 rounded-card">
 <table class="w-full text-left text-sm">
 <thead class="bg-gray-50 dark:bg-gray-900/50 text-gray-400 text-xs font-semibold uppercase tracking-wider border-b border-gray-100 dark:border-gray-700">
 <tr>
 <th class="px-6 py-4">Nama Permission</th>
 <th class="px-6 py-4">Slug</th>
 <th class="px-6 py-4 text-right">Aksi</th>
 </tr>
 </thead>
 <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
 <tr v-if="permissions.data.length === 0">
 <td colspan="3" class="px-6 py-8 text-center text-gray-400">
 Tidak ada data permission ditemukan.
 </td>
 </tr>
 <tr v-for="item in permissions.data" :key="item.id" class="hover:bg-gray-50/50 dark:hover:bg-gray-800 transition-colors">
 <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
 {{ item.name }}
 </td>
 <td class="px-6 py-4 text-gray-500 font-mono text-xs">
 {{ item.slug }}
 </td>
 <td class="px-6 py-4 text-right">
 <div class="flex items-center justify-end gap-2">
 <Link 
 :href="route('settings.permissions.edit', item.id)"
 class="p-2 bg-gray-50 hover:bg-amber-50 text-gray-600 hover:text-amber-600 dark:bg-gray-600 dark:text-gray-300 rounded-sm transition-colors duration-150"
 title="Edit"
 >
 <Icon icon="solar:pen-bold" class="w-4 h-4" />
 </Link>
 <button 
 @click="confirmDeletePermission(item.id)"
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
 Menampilkan {{ permissions.from || 0 }} sampai {{ permissions.to || 0 }} dari {{ permissions.total }} data
 </p>
 <Pagination :links="permissions.links" />
 </div>
 </div>

 <!-- Custom Reusable Confirm Modal -->
 <ConfirmModal 
 :show="showConfirmDelete"
 title="Hapus Hak Akses (Permission)"
 message="Apakah Anda yakin ingin menghapus permission ini secara permanen dari sistem? Tindakan ini dapat memengaruhi otorisasi fitur."
 confirm-text="Ya, Hapus"
 cancel-text="Batal"
 type="danger"
 @confirm="executeDeletePermission"
 @cancel="showConfirmDelete = false"
 />
 </div>
 </AuthenticatedLayout>
</template>
