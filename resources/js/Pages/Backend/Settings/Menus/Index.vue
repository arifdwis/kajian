<script setup>
import { ref, computed } from 'vue';
import { Head, useForm, router } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import ConfirmModal from '@/Components/ConfirmModal.vue';
import { useToast } from 'vue-toastification';

const toast = useToast();

const props = defineProps({
 menus: Array,
 roles: Array,
});

const menuOptions = computed(() => [
  { label: 'Menu Utama (Parent)', value: '' },
  ...props.menus.map(m => ({ label: m.title, value: m.id }))
]);

const showModal = ref(false);
const isEdit = ref(false);
const currentId = ref(null);

const form = useForm({
 title: '',
 route: '',
 icon: '',
 permission_name: '',
 roles: [],
 parent_id: '',
});

const openCreateModal = () => {
 isEdit.value = false;
 form.reset();
 form.clearErrors();
 showModal.value = true;
};

const openEditModal = (menu) => {
 isEdit.value = true;
 currentId.value = menu.id;
 form.title = menu.title || '';
 form.route = menu.route || '';
 form.icon = menu.icon || '';
 form.permission_name = menu.permission_name || '';
 form.roles = menu.roles ? menu.roles.split(',') : [];
 form.parent_id = menu.parent_id || '';
 form.clearErrors();
 showModal.value = true;
};

const closeModal = () => {
 showModal.value = false;
 form.reset();
};

const submit = () => {
 if (isEdit.value) {
 form.put(route('settings.menu.update', currentId.value), {
 onSuccess: () => {
 closeModal();
 },
 onError: (errors) => {
 Object.values(errors).forEach(err => toast.error(err));
 }
 });
 } else {
 form.post(route('settings.menu.store'), {
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

const confirmDeleteMenu = (id) => {
 deleteTargetId.value = id;
 showConfirmDelete.value = true;
};

const executeDeleteMenu = () => {
 router.delete(route('settings.menu.destroy', deleteTargetId.value), {
 onSuccess: () => {
 showConfirmDelete.value = false;
 },
 onError: (error) => toast.error('Gagal menghapus menu.')
 });
};
</script>

<template>
 <Head title="Manajemen Menu Sidebar" />
 
 <AuthenticatedLayout>
 <div class="space-y-6 w-full">
 <!-- Header -->
 <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700 ">
 <div>
 <h3 class="text-xl font-bold text-gray-900 dark:text-white">Pengaturan Menu Sidebar</h3>
 <p class="text-xs text-gray-500 mt-1">Konfigurasi menu navigasi sidebar, hak akses peran, dan ikon navigasi.</p>
 </div>
 <button 
 @click="openCreateModal"
 class="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-accent-ink font-semibold rounded-card transition-all text-sm shrink-0 "
 >
 <Icon icon="solar:add-circle-bold" class="w-5 h-5" />
 Tambah Menu
 </button>
 </div>

 <!-- Menus Hierarchical List -->
 <div class="bg-paper dark:bg-gray-800 rounded-card border border-gray-100 dark:border-gray-700 p-6 space-y-4">
 <h4 class="font-bold text-sm text-gray-800 dark:text-white border-b dark:border-gray-700 pb-3">Struktur Menu Aktif</h4>
 
 <div v-if="menus.length === 0" class="text-center text-xs text-gray-400 py-12">
 Belum ada menu yang dibuat. Klik tombol diatas untuk menambahkan.
 </div>

 <div class="space-y-3">
 <div 
 v-for="menu in menus" 
 :key="menu.id" 
 class="border border-gray-100 dark:border-gray-600 rounded-card p-4 bg-gray-50/50 dark:bg-gray-900/20"
 >
 <div class="flex items-center justify-between">
 <div class="flex items-center gap-3">
 <div class="p-2 bg-paper dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-sm text-blue-600 dark:text-blue-400 shrink-0">
 <Icon v-if="menu.icon" :icon="menu.icon" class="w-5 h-5" />
 <Icon v-else icon="solar:document-bold" class="w-5 h-5" />
 </div>
 <div>
 <span class="text-xs font-semibold text-gray-900 dark:text-white">{{ menu.title }}</span>
 <span v-if="menu.route" class="block text-[10px] text-gray-400 font-mono mt-0.5">{{ menu.route }}</span>
 </div>
 </div>

 <div class="flex items-center gap-2">
 <button 
 @click="openEditModal(menu)"
 class="p-2 bg-paper dark:bg-gray-800 border dark:border-gray-600 text-gray-600 hover:text-amber-500 rounded-sm transition-all"
 title="Edit"
 >
 <Icon icon="solar:pen-bold" class="w-4 h-4" />
 </button>
 <button 
 @click="confirmDeleteMenu(menu.id)"
 class="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-sm transition-all"
 title="Hapus"
 >
 <Icon icon="solar:trash-bin-trash-bold" class="w-4 h-4" />
 </button>
 </div>
 </div>

 <!-- Render Children -->
 <div v-if="menu.children && menu.children.length > 0" class="mt-3 pl-8 space-y-2 border-l border-dashed border-gray-200 dark:border-gray-700">
 <div 
 v-for="child in menu.children" 
 :key="child.id"
 class="flex items-center justify-between p-3 bg-paper dark:bg-gray-900/60 border border-gray-100 dark:border-gray-600 rounded-sm"
 >
 <div class="flex items-center gap-2.5">
 <Icon v-if="child.icon" :icon="child.icon" class="w-4 h-4 text-gray-400" />
 <div class="leading-none">
 <span class="text-xs font-semibold text-gray-800 dark:text-gray-200">{{ child.title }}</span>
 <span class="block text-[9px] text-gray-400 font-mono mt-0.5">{{ child.route }}</span>
 </div>
 </div>

 <div class="flex items-center gap-2">
 <button 
 @click="openEditModal(child)"
 class="p-1.5 hover:bg-paper-2 dark:hover:bg-slate-800 border dark:border-slate-800 rounded-sm text-slate-550 transition-colors"
 title="Edit"
 >
 <Icon icon="solar:pen-bold" class="w-3.5 h-3.5" />
 </button>
 <button 
 @click="confirmDeleteMenu(child.id)"
 class="p-1.5 hover:bg-red-50 text-red-500 rounded-sm transition-colors"
 title="Hapus"
 >
 <Icon icon="solar:trash-bin-trash-bold" class="w-3.5 h-3.5" />
 </button>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>

 <!-- Inline Glassmorphic Modal -->
 <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
 <!-- Backdrop -->
 <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" @click="closeModal"></div>
 
 <!-- Modal Content -->
 <div class="relative w-full max-w-lg bg-paper dark:bg-paper-dark border border-rule dark:border-rule-dark rounded-card p-6 space-y-4">
 <div class="flex justify-between items-center border-b dark:border-slate-800 pb-3">
 <h4 class="font-bold text-slate-900 dark:text-white">
 {{ isEdit ? 'Edit Menu' : 'Tambah Menu' }}
 </h4>
 <button @click="closeModal" class="text-slate-400 hover:text-slate-600">
 <Icon icon="solar:close-square-linear" class="w-5 h-5" />
 </button>
 </div>

 <form @submit.prevent="submit" class="space-y-4">
 <div class="grid grid-cols-2 gap-4">
 <div>
 <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Judul Menu <span class="text-red-500">*</span></label>
 <input 
 type="text" 
 v-model="form.title"
 required
 placeholder="E.g., Dashboard"
 class="w-full text-sm rounded-sm border border-rule dark:border-rule-dark bg-paper dark:bg-slate-955 text-slate-900 dark:text-white px-4 py-2.5"
 />
 </div>
 <div>
 <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Route / URL</label>
 <input 
 type="text" 
 v-model="form.route"
 placeholder="E.g., dashboard"
 class="w-full text-sm rounded-sm border border-rule dark:border-rule-dark bg-paper dark:bg-slate-955 text-slate-900 dark:text-white px-4 py-2.5"
 />
 </div>
 </div>

 <div class="grid grid-cols-2 gap-4">
 <div>
 <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Icon (Solar/Iconify)</label>
 <input 
 type="text" 
 v-model="form.icon"
 placeholder="E.g., solar:home-bold"
 class="w-full text-sm rounded-sm border border-rule dark:border-rule-dark bg-paper dark:bg-slate-955 text-slate-900 dark:text-white px-4 py-2.5"
 />
 </div>
 <div>
 <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Parent Menu</label>
 <SearchSelect
 v-model="form.parent_id"
 :options="menuOptions"
 placeholder="Menu Utama (Parent)"
 />
 </div>
 </div>

 <div>
 <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Permission Required</label>
 <input 
 type="text" 
 v-model="form.permission_name"
 placeholder="E.g., dashboard"
 class="w-full text-sm rounded-sm border border-rule dark:border-rule-dark bg-paper dark:bg-slate-955 text-slate-900 dark:text-white px-4 py-2.5"
 />
 </div>

 <div>
 <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Batasi Peran (Role)</label>
 <div class="flex flex-wrap gap-2.5">
 <label 
 v-for="r in roles" 
 :key="r.id"
 class="inline-flex items-center gap-1.5 px-3 py-1.5 border border-rule dark:border-rule-dark rounded-sm cursor-pointer hover:bg-paper-2 dark:hover:bg-slate-800 select-none text-xs"
 >
 <input 
 type="checkbox" 
 :value="r.slug" 
 v-model="form.roles"
 class="rounded text-blue-600 focus:ring-blue-500/20"
 />
 <span class="text-slate-800 dark:text-slate-200 font-semibold">{{ r.name }}</span>
 </label>
 </div>
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
 class="px-5 py-2 bg-accent text-accent-ink text-xs font-bold rounded-sm transition-all"
 >
 Simpan
 </button>
 </div>
 </form>
 </div>
 </div>

 <!-- Custom Reusable Confirm Modal -->
 <ConfirmModal 
 :show="showConfirmDelete"
 title="Hapus Menu Sidebar"
 message="Apakah Anda yakin ingin menghapus menu navigasi ini beserta seluruh submenu di dalamnya?"
 confirm-text="Ya, Hapus"
 cancel-text="Batal"
 type="danger"
 @confirm="executeDeleteMenu"
 @cancel="showConfirmDelete = false"
 />
 </div>
 </AuthenticatedLayout>
</template>
