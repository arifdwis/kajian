<script setup>
import { ref } from 'vue';
import { Head, Link, useForm, router } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import Pagination from '@/Components/Pagination.vue';
import ConfirmModal from '@/Components/ConfirmModal.vue';
import { useToast } from 'vue-toastification';

const toast = useToast();

// Users modal
const showUsersModal = ref(false);
const usersModalLoading = ref(false);
const usersModalRole = ref('');
const usersModalUsers = ref([]);

const openUsersModal = async (role) => {
  showUsersModal.value = true;
  usersModalLoading.value = true;
  usersModalRole.value = role.name;
  usersModalUsers.value = [];

  try {
    const res = await fetch(route('settings.roles.users', role.id));
    const data = await res.json();
    usersModalUsers.value = data.users || [];
  } catch {
    toast.error('Gagal memuat daftar pengguna.');
    showUsersModal.value = false;
  } finally {
    usersModalLoading.value = false;
  }
};

const props = defineProps({
 roles: Object,
 filters: Object,
});

const search = ref(props.filters.search || '');
const showModal = ref(false);
const isEdit = ref(false);
const currentId = ref(null);

const form = useForm({
 name: '',
});

const handleSearch = () => {
 router.get(route('settings.roles.index'), { search: search.value }, {
 preserveState: true,
 preserveScroll: true,
 });
};

const openCreateModal = () => {
 isEdit.value = false;
 form.reset();
 form.clearErrors();
 showModal.value = true;
};

const openEditModal = (role) => {
 isEdit.value = true;
 currentId.value = role.id;
 form.name = role.name;
 form.clearErrors();
 showModal.value = true;
};

const closeModal = () => {
 showModal.value = false;
 form.reset();
};

const submit = () => {
 if (isEdit.value) {
 form.put(route('settings.roles.update', currentId.value), {
 onSuccess: () => {
 closeModal();
 },
 onError: (errors) => {
 Object.values(errors).forEach(err => toast.error(err));
 }
 });
 } else {
 form.post(route('settings.roles.store'), {
 onSuccess: () => {
 closeModal();
 },
 onError: (errors) => {
 Object.values(errors).forEach(err => toast.error(err));
 }
 });
 }
};

const showConfirmDelete = ref(false);
const deleteTargetId = ref(null);

const confirmDeleteRole = (id) => {
 deleteTargetId.value = id;
 showConfirmDelete.value = true;
};

const executeDeleteRole = () => {
 router.delete(route('settings.roles.destroy', deleteTargetId.value), {
 onSuccess: () => {
 showConfirmDelete.value = false;
 },
 onError: (error) => toast.error('Gagal menghapus role.')
 });
};
</script>

<template>
 <Head title="Manajemen Role" />
 
 <AuthenticatedLayout>
 <div class="space-y-6 w-full">
 <!-- Header -->
 <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700 ">
 <div>
 <h3 class="text-xl font-bold text-gray-900 dark:text-white">Manajemen Role</h3>
 <p class="text-xs text-gray-500 mt-1">Kelola peran otorisasi system SIKAJIAN dan setelan perizinan-nya.</p>
 </div>
 <button 
 @click="openCreateModal"
 class="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-accent-ink font-semibold rounded-card transition-colors duration-150 text-sm shrink-0 "
 >
 <Icon icon="solar:add-circle-bold" class="w-5 h-5" />
 Tambah Role
 </button>
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
 placeholder="Cari role..."
 class="w-full text-xs pl-10 pr-4 py-2.5 rounded-sm border border-gray-300 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white"
 />
 </div>
 </div>

 <div class="overflow-x-auto border border-gray-100 dark:border-gray-700 rounded-card">
 <table class="w-full text-left text-sm">
 <thead class="bg-gray-50 dark:bg-gray-900/50 text-gray-400 text-xs font-semibold uppercase tracking-wider border-b border-gray-100 dark:border-gray-700">
 <tr>
 <th class="px-6 py-4">Nama Role</th>
 <th class="px-6 py-4">Slug</th>
 <th class="px-6 py-4 text-center">Users</th>
 <th class="px-6 py-4 text-right">Aksi</th>
 </tr>
 </thead>
 <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
 <tr v-if="roles.data.length === 0">
 <td colspan="4" class="px-6 py-8 text-center text-gray-400">
 Tidak ada data role ditemukan.
 </td>
 </tr>
 <tr v-for="item in roles.data" :key="item.id" class="hover:bg-gray-50/50 dark:hover:bg-gray-800 transition-colors">
 <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
 {{ item.name }}
 </td>
 <td class="px-6 py-4 text-gray-500 font-mono text-xs">
 {{ item.slug }}
 </td>
<td class="px-6 py-4 text-center">
  <button 
   @click="openUsersModal(item)"
   class="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold rounded-full cursor-pointer transition-colors duration-150 hover:scale-105"
   :class="item.users_count > 0 ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30' : 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500'"
   title="Lihat pengguna"
  >
   <Icon icon="solar:user-bold" class="w-3 h-3" />
   {{ item.users_count }}
  </button>
 </td>
 <td class="px-6 py-4 text-right">
 <div class="flex items-center justify-end gap-2">
 <Link
  :href="route('settings.roles.permission', item.id)"
  class="p-2 bg-paper-2 hover:bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 rounded-sm transition-colors duration-150"
  title="Kelola Hak Akses"
 >
  <Icon icon="solar:shield-keyhole-bold" class="w-4 h-4" />
 </Link>
 <button
  @click="openEditModal(item)"
  class="p-2 bg-gray-50 hover:bg-amber-50 text-gray-600 hover:text-amber-600 dark:bg-gray-600 dark:text-gray-300 rounded-sm transition-colors duration-150"
  title="Edit"
 >
  <Icon icon="solar:pen-bold" class="w-4 h-4" />
 </button>
 <button
  v-if="!['superadmin', 'admin'].includes(item.slug)"
  @click="confirmDeleteRole(item.id)"
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
 Menampilkan {{ roles.from || 0 }} sampai {{ roles.to || 0 }} dari {{ roles.total }} data
 </p>
 <Pagination :links="roles.links" />
 </div>
 </div>

 <!-- Inline Glassmorphic Modal -->
 <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
 <!-- Backdrop -->
 <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" @click="closeModal"></div>
 
 <!-- Modal Content -->
 <div class="relative w-full max-w-md bg-paper dark:bg-paper-dark border border-rule dark:border-rule-dark rounded-card p-6 space-y-4">
 <div class="flex justify-between items-center border-b dark:border-slate-800 pb-3">
 <h4 class="font-bold text-slate-900 dark:text-white">
 {{ isEdit ? 'Edit Role' : 'Tambah Role' }}
 </h4>
 <button @click="closeModal" class="text-slate-400 hover:text-slate-600">
 <Icon icon="solar:close-square-linear" class="w-5 h-5" />
 </button>
 </div>

 <form @submit.prevent="submit" class="space-y-4">
 <div>
 <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Nama Role <span class="text-red-500">*</span></label>
 <input 
 type="text" 
 v-model="form.name"
 required
 placeholder="E.g., Akademisi"
 class="w-full text-sm rounded-sm border border-rule dark:border-rule-dark bg-paper dark:bg-slate-950 text-slate-900 dark:text-white px-4 py-2.5 focus:ring-2 focus:ring-blue-500/20"
 />
 </div>

 <div class="flex justify-end gap-2 border-t dark:border-slate-800 pt-4">
 <button 
 type="button"
 @click="closeModal"
 class="px-4 py-2 border border-rule dark:border-rule-dark text-slate-700 dark:text-slate-400 text-xs font-semibold rounded-sm"
 >
 Batal
 </button>
 <button 
 type="submit"
 :disabled="form.processing"
 class="px-5 py-2 bg-accent text-accent-ink text-xs font-bold rounded-sm transition-colors duration-150"
 >
 Simpan
 </button>
 </div>
 </form>
 </div>
 </div>

 <!-- Users Modal -->
 <div v-if="showUsersModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
  <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" @click="showUsersModal = false"></div>
  
  <div class="relative w-full max-w-lg bg-paper dark:bg-paper-dark border border-rule dark:border-rule-dark rounded-card p-6 space-y-4">
   <div class="flex justify-between items-center border-b dark:border-slate-800 pb-3">
    <h4 class="font-bold text-slate-900 dark:text-white">
     Pengguna: {{ usersModalRole }}
    </h4>
    <button @click="showUsersModal = false" class="text-slate-400 hover:text-slate-600">
     <Icon icon="solar:close-square-linear" class="w-5 h-5" />
    </button>
   </div>

   <div v-if="usersModalLoading" class="py-8 text-center text-gray-400">
    <Icon icon="solar:spinner-bold" class="w-6 h-6 animate-spin mx-auto mb-2" />
    Memuat...
   </div>

   <div v-else-if="usersModalUsers.length === 0" class="py-8 text-center text-gray-400 text-sm">
    Tidak ada pengguna dengan role ini.
   </div>

   <div v-else class="max-h-80 overflow-y-auto space-y-2">
    <div 
     v-for="user in usersModalUsers" 
     :key="user.id"
     class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
    >
     <div class="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm shrink-0">
      {{ user.name?.charAt(0)?.toUpperCase() || '?' }}
     </div>
     <div class="min-w-0">
      <p class="text-sm font-semibold text-gray-900 dark:text-white truncate">{{ user.name }}</p>
      <p class="text-xs text-gray-500 dark:text-gray-400 truncate">{{ user.email }}</p>
     </div>
    </div>
   </div>
  </div>
 </div>

 <!-- Custom Reusable Confirm Modal -->
 <ConfirmModal 
  :show="showConfirmDelete"
 title="Hapus Role Otorisasi"
 message="Apakah Anda yakin ingin menghapus role otorisasi ini? Tindakan ini dapat memengaruhi hak akses pengguna."
 confirm-text="Ya, Hapus"
 cancel-text="Batal"
 type="danger"
 @confirm="executeDeleteRole"
 @cancel="showConfirmDelete = false"
 />
 </div>
 </AuthenticatedLayout>
</template>
