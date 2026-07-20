<script setup>
import { computed } from 'vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { useToast } from 'vue-toastification';

const toast = useToast();

const props = defineProps({
 roles: Array,
 bidangs: Array,
});

const roleOptions = computed(() => props.roles.map(r => ({ label: r.name, value: r.id })));
const bidangOptions = computed(() => [
  { label: 'Tanpa OPD', value: '' },
  ...props.bidangs.map(b => ({ label: b.nama, value: b.id }))
]);

const form = useForm({
 name: '',
 email: '',
 password: '',
 password_confirmation: '',
 role_id: '',
 id_opd: '',
});

const submit = () => {
 form.post(route('settings.users.store'), {
 onSuccess: () => toast.success('Pengguna baru berhasil dibuat.'),
 onError: (errors) => {
 Object.values(errors).forEach(err => toast.error(err));
 }
 });
};
</script>

<template>
 <Head title="Tambah Pengguna Baru" />
 
 <AuthenticatedLayout>
 <div class="space-y-6">
 <!-- Header bar -->
 <div class="flex items-center gap-3 bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700 ">
 <Link :href="route('settings.users.index')" class="p-2.5 bg-gray-50 dark:bg-gray-700 dark:text-gray-300 hover:bg-paper-2 hover:text-blue-600 rounded-sm transition-colors duration-150">
 <Icon icon="solar:arrow-left-outline" class="w-5 h-5" />
 </Link>
 <div>
 <h3 class="text-lg font-bold text-gray-900 dark:text-white">Tambah Pengguna Baru</h3>
 <p class="text-xs text-gray-500 mt-0.5">Daftarkan akun pengguna baru beserta otorisasi role-nya.</p>
 </div>
 </div>

 <!-- Form Card -->
 <div class="bg-paper dark:bg-gray-800 p-8 rounded-card border border-gray-100 dark:border-gray-700 ">
 <form @submit.prevent="submit" class="space-y-5">
 <div>
 <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Nama Lengkap <span class="text-red-500">*</span></label>
 <input 
 type="text" 
 v-model="form.name"
 required
 placeholder="Nama Lengkap..."
 class="w-full text-sm rounded-sm border border-rule dark:border-rule-dark bg-paper dark:bg-slate-950 text-slate-900 dark:text-white px-4 py-2.5 focus:ring-2 focus:ring-blue-500/20"
 />
 </div>

 <div>
 <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Email Address <span class="text-red-500">*</span></label>
 <input 
 type="email" 
 v-model="form.email"
 required
 placeholder="E.g., arifdwi@samarindakota.go.id"
 class="w-full text-sm rounded-sm border border-rule dark:border-rule-dark bg-paper dark:bg-slate-950 text-slate-900 dark:text-white px-4 py-2.5 focus:ring-2 focus:ring-blue-500/20"
 />
 </div>

 <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div>
 <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Otorisasi Role <span class="text-red-500">*</span></label>
 <SearchSelect
 v-model="form.role_id"
 :options="roleOptions"
 placeholder="Pilih Role"
 :required="true"
 />
 </div>
 <div>
 <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Afiliasi OPD (Operator)</label>
 <SearchSelect
 v-model="form.id_opd"
 :options="bidangOptions"
 placeholder="Tanpa OPD"
 />
 </div>
 </div>

 <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t dark:border-slate-800 pt-5">
 <div>
 <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Password <span class="text-red-500">*</span></label>
 <input 
 type="password" 
 v-model="form.password"
 required
 placeholder="••••••••"
 class="w-full text-sm rounded-sm border border-rule dark:border-rule-dark bg-paper dark:bg-slate-950 text-slate-900 dark:text-white px-4 py-2.5"
 />
 </div>
 <div>
 <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Konfirmasi Password <span class="text-red-500">*</span></label>
 <input 
 type="password" 
 v-model="form.password_confirmation"
 required
 placeholder="••••••••"
 class="w-full text-sm rounded-sm border border-rule dark:border-rule-dark bg-paper dark:bg-slate-950 text-slate-900 dark:text-white px-4 py-2.5"
 />
 </div>
 </div>

 <div class="flex justify-end gap-2 border-t dark:border-slate-800 pt-4">
 <Link 
 :href="route('settings.users.index')"
 class="px-5 py-2.5 border border-rule dark:border-rule-dark text-slate-700 dark:text-slate-400 text-xs font-semibold rounded-sm"
 >
 Batal
 </Link>
 <button 
 type="submit"
 :disabled="form.processing"
 class="px-6 py-2.5 bg-accent text-accent-ink text-xs font-bold rounded-sm transition-colors duration-150 inline-flex items-center gap-1"
 >
 <Icon v-if="form.processing" icon="svg-spinners:ring-resize" class="w-4 h-4 animate-spin" />
 Simpan User
 </button>
 </div>
 </form>
 </div>
 </div>
 </AuthenticatedLayout>
</template>
