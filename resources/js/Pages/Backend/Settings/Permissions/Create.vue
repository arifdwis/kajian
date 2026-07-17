<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { useToast } from 'vue-toastification';

const toast = useToast();

const form = useForm({
 name: '',
});

const submit = () => {
 form.post(route('settings.permissions.store'), {
 onSuccess: () => toast.success('Permission berhasil dibuat.'),
 onError: (errors) => {
 Object.values(errors).forEach(err => toast.error(err));
 }
 });
};
</script>

<template>
 <Head title="Tambah Permission Baru" />
 
 <AuthenticatedLayout>
 <div class="space-y-6">
 <!-- Header bar -->
 <div class="flex items-center gap-3 bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700 ">
 <Link :href="route('settings.permissions.index')" class="p-2.5 bg-gray-50 dark:bg-gray-700 dark:text-gray-300 hover:bg-paper-2 hover:text-blue-600 rounded-sm transition-all">
 <Icon icon="solar:arrow-left-outline" class="w-5 h-5" />
 </Link>
 <div>
 <h3 class="text-lg font-bold text-gray-900 dark:text-white">Tambah Permission</h3>
 <p class="text-xs text-gray-500 mt-0.5">Daftarkan parameter permission akses baru.</p>
 </div>
 </div>

 <!-- Form Card -->
 <div class="bg-paper dark:bg-gray-800 p-8 rounded-card border border-gray-100 dark:border-gray-700 ">
 <form @submit.prevent="submit" class="space-y-5">
 <div>
 <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Nama Permission <span class="text-red-500">*</span></label>
 <input 
 type="text" 
 v-model="form.name"
 required
 placeholder="E.g., settings.users.index"
 class="w-full text-sm rounded-sm border border-rule dark:border-rule-dark bg-paper dark:bg-slate-950 text-slate-900 dark:text-white px-4 py-2.5 focus:ring-2 focus:ring-blue-500/20"
 />
 </div>

 <div class="flex justify-end gap-2 border-t dark:border-slate-800 pt-4">
 <Link 
 :href="route('settings.permissions.index')"
 class="px-5 py-2.5 border border-rule dark:border-rule-dark text-slate-700 dark:text-slate-400 text-xs font-semibold rounded-sm"
 >
 Batal
 </Link>
 <button 
 type="submit"
 :disabled="form.processing"
 class="px-6 py-2.5 bg-accent text-accent-ink text-xs font-bold rounded-sm transition-all inline-flex items-center gap-1"
 >
 <Icon v-if="form.processing" icon="svg-spinners:ring-resize" class="w-4 h-4 animate-spin" />
 Simpan
 </button>
 </div>
 </form>
 </div>
 </div>
 </AuthenticatedLayout>
</template>
