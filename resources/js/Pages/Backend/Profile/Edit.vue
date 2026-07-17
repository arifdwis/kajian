<script setup>
import { ref, computed } from 'vue';
import { Head, useForm } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { useToast } from 'vue-toastification';

const toast = useToast();

const props = defineProps({
 user: Object,
 bidangs: Array,
});

const institutionMode = ref(props.user.id_opd ? 'opd' : (props.user.institution_name ? 'manual' : 'opd'));

const bidangOptions = computed(() => [
 { label: 'Pilih OPD / Instansi', value: '' },
 ...props.bidangs.map(b => ({ label: b.nama, value: b.id }))
]);

const profileForm = useForm({
 _method: 'PATCH',
 name: props.user.name || '',
 email: props.user.email || '',
 phone: props.user.phone || '',
 address: props.user.address || '',
 id_opd: props.user.id_opd || '',
 institution_name: props.user.institution_name || '',
});

const passwordForm = useForm({
 current_password: '',
 password: '',
 password_confirmation: '',
});

const updateProfile = () => {
 profileForm.post(route('profile.update'), {
 onSuccess: () => toast.success('Profil berhasil diperbarui.'),
 onError: (errors) => {
 Object.values(errors).forEach(err => toast.error(err));
 }
 });
};

const updatePassword = () => {
 passwordForm.put(route('profile.password'), {
 onSuccess: () => {
 toast.success('Password berhasil diubah.');
 passwordForm.reset();
 },
 onError: (errors) => {
 Object.values(errors).forEach(err => toast.error(err));
 }
 });
};
</script>

<template>
 <Head title="Pengaturan Profil Saya" />
 
 <AuthenticatedLayout>
 <div class="space-y-6">
 <!-- Header banner -->
 <div class="bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700 ">
 <h3 class="text-xl font-bold text-gray-900 dark:text-white">Pengaturan Profil Pengguna</h3>
 <p class="text-xs text-gray-500 mt-1">Kelola data informasi personal, kontak, dan ganti password akun Anda.</p>
 </div>

 <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
 <!-- Left column: Profile overview -->
 <div class="bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center space-y-4">
 <div class="w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-3xl">
 {{ user.name.charAt(0).toUpperCase() }}
 </div>
 <div>
 <h4 class="font-semibold text-gray-900 dark:text-white text-base">{{ user.name }}</h4>
 <span class="text-xs text-gray-400 font-mono block mt-0.5">{{ user.email }}</span>
 </div>
 </div>

 <!-- Right 2/3 column: Form settings -->
 <div class="md:col-span-2 space-y-6">
 <!-- Update Profile Form -->
 <div class="bg-paper dark:bg-gray-800 p-8 rounded-card border border-gray-100 dark:border-gray-700 ">
 <h4 class="text-xs font-bold text-gray-400 uppercase tracking-wider border-b dark:border-gray-700 pb-3 mb-5">Informasi Pribadi</h4>
 <form @submit.prevent="updateProfile" class="space-y-4">
 <div>
 <label class="block text-xs font-semibold text-slate-450 uppercase tracking-wider mb-2">Nama Lengkap</label>
 <input 
 type="text" 
 v-model="profileForm.name"
 required
 class="w-full text-sm rounded-sm border border-rule dark:border-rule-dark bg-paper dark:bg-slate-950 text-slate-900 dark:text-white px-4 py-2.5 focus:ring-2 focus:ring-blue-500/20"
 />
 </div>
 <div>
 <label class="block text-xs font-semibold text-slate-455 uppercase tracking-wider mb-2">Email Address</label>
 <input 
 type="email" 
 v-model="profileForm.email"
 required
 class="w-full text-sm rounded-sm border border-rule dark:border-rule-dark bg-paper dark:bg-slate-950 text-slate-900 dark:text-white px-4 py-2.5 focus:ring-2 focus:ring-blue-500/20"
 />
 </div>
 <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div>
 <label class="block text-xs font-semibold text-slate-455 uppercase tracking-wider mb-2">No. Handphone / WA</label>
 <input
  type="text"
  v-model="profileForm.phone"
  placeholder="0812..."
  class="w-full text-sm rounded-sm border border-rule dark:border-rule-dark bg-paper dark:bg-slate-955 text-slate-900 dark:text-white px-4 py-2.5"
 />
 </div>
 <div>
 <label class="block text-xs font-semibold text-slate-455 uppercase tracking-wider mb-2">Alamat Tinggal</label>
 <input
  type="text"
  v-model="profileForm.address"
  placeholder="Alamat Lengkap..."
  class="w-full text-sm rounded-sm border border-rule dark:border-rule-dark bg-paper dark:bg-slate-955 text-slate-900 dark:text-white px-4 py-2.5"
 />
 </div>
 </div>

 <!-- Institusi / OPD -->
 <div>
 <label class="block text-xs font-semibold text-slate-450 uppercase tracking-wider mb-2">Asal Instansi / OPD</label>
 <div class="flex gap-2 mb-3">
  <button
  type="button"
  @click="institutionMode = 'opd'; profileForm.id_opd = ''; profileForm.institution_name = '';"
  class="px-3 py-1.5 text-xs font-semibold rounded-sm transition-colors"
  :class="institutionMode === 'opd' ? 'bg-blue-600 text-white' : 'border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50'"
  >
  Pilih dari OPD
  </button>
  <button
  type="button"
  @click="institutionMode = 'manual'; profileForm.id_opd = ''; profileForm.institution_name = '';"
  class="px-3 py-1.5 text-xs font-semibold rounded-sm transition-colors"
  :class="institutionMode === 'manual' ? 'bg-blue-600 text-white' : 'border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50'"
  >
  Tulis Manual
  </button>
 </div>
 <SearchSelect
  v-if="institutionMode === 'opd'"
  v-model="profileForm.id_opd"
  :options="bidangOptions"
  placeholder="Pilih OPD / Instansi"
 />
 <input
  v-else
  type="text"
  v-model="profileForm.institution_name"
  placeholder="Tuliskan nama instansi / perguruan tinggi / organisasi..."
  class="w-full text-sm rounded-sm border border-rule dark:border-rule-dark bg-paper dark:bg-slate-950 text-slate-900 dark:text-white px-4 py-2.5"
 />
 </div>

 <div class="flex justify-end pt-2">
 <button 
 type="submit"
 :disabled="profileForm.processing"
 class="px-5 py-2.5 bg-accent text-accent-ink text-xs font-bold rounded-sm transition-all inline-flex items-center gap-1 "
 >
 <Icon v-if="profileForm.processing" icon="svg-spinners:ring-resize" class="w-4 h-4 animate-spin" />
 Simpan Perubahan
 </button>
 </div>
 </form>
 </div>

 <!-- Change Password Form -->
 <div class="bg-paper dark:bg-gray-800 p-8 rounded-card border border-gray-100 dark:border-gray-700 ">
 <h4 class="text-xs font-bold text-gray-400 uppercase tracking-wider border-b dark:border-gray-700 pb-3 mb-5">Ganti Password Keamanan</h4>
 <form @submit.prevent="updatePassword" class="space-y-4">
 <div>
 <label class="block text-xs font-semibold text-slate-455 uppercase tracking-wider mb-2">Password Saat Ini</label>
 <input 
 type="password" 
 v-model="passwordForm.current_password"
 required
 placeholder="••••••••"
 class="w-full text-sm rounded-sm border border-rule dark:border-rule-dark bg-paper dark:bg-slate-955 text-slate-900 dark:text-white px-4 py-2.5"
 />
 </div>
 <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div>
 <label class="block text-xs font-semibold text-slate-455 uppercase tracking-wider mb-2">Password Baru</label>
 <input 
 type="password" 
 v-model="passwordForm.password"
 required
 placeholder="••••••••"
 class="w-full text-sm rounded-sm border border-rule dark:border-rule-dark bg-paper dark:bg-slate-955 text-slate-900 dark:text-white px-4 py-2.5"
 />
 </div>
 <div>
 <label class="block text-xs font-semibold text-slate-455 uppercase tracking-wider mb-2">Konfirmasi Password Baru</label>
 <input 
 type="password" 
 v-model="passwordForm.password_confirmation"
 required
 placeholder="••••••••"
 class="w-full text-sm rounded-sm border border-rule dark:border-rule-dark bg-paper dark:bg-slate-955 text-slate-900 dark:text-white px-4 py-2.5"
 />
 </div>
 </div>

 <div class="flex justify-end pt-2">
 <button 
 type="submit"
 :disabled="passwordForm.processing"
 class="px-5 py-2.5 bg-accent text-accent-ink text-xs font-bold rounded-sm transition-all inline-flex items-center gap-1 "
 >
 <Icon v-if="passwordForm.processing" icon="svg-spinners:ring-resize" class="w-4 h-4 animate-spin" />
 Ubah Password
 </button>
 </div>
 </form>
 </div>
 </div>
 </div>
 </div>
 </AuthenticatedLayout>
</template>
