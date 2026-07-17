<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import { useToast } from 'vue-toastification';
import GuestLayout from '@/Layouts/GuestLayout.vue';
import InputError from '@/Components/InputError.vue';

const toast = useToast();

const form = useForm({
 name: '',
 email: '',
 password: '',
 password_confirmation: '',
 role: 'pengguna',
});

const submit = () => {
 form.post(route('register'), {
 onFinish: () => form.reset('password', 'password_confirmation'),
 onSuccess: () => toast.success('Registrasi berhasil.'),
 onError: (errors) => {
 Object.values(errors).forEach(err => toast.error(err));
 }
 });
};
</script>

<template>
 <GuestLayout>
 <Head title="Registrasi Akun Baru" />

 <div class="text-center mb-8">
 <h1 class="text-3xl font-semibold text-gray-900 dark:text-white tracking-tight">Daftar Akun</h1>
 <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
 Pustaka Kajian dan Penelitian Samarinda
 </p>
 </div>

 <form @submit.prevent="submit" class="space-y-4">
 <div>
 <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Lengkap</label>
 <input 
 type="text" 
 v-model="form.name" 
 required
 autofocus
 class="w-full px-4 py-2.5 rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
 placeholder="Nama Lengkap Beserta Gelar..."
 />
 <InputError class="mt-1" :message="form.errors.name" />
 </div>

 <div>
 <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
 <input 
 type="email" 
 v-model="form.email" 
 required
 class="w-full px-4 py-2.5 rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
 placeholder="nama@domain.com"
 />
 <InputError class="mt-1" :message="form.errors.email" />
 </div>

  <div>
  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rumpun Rencana Akses (Role)</label>
  <SearchSelect
  v-model="form.role"
  :options="[
    { label: 'Pengguna (ASN / Akademisi / Mahasiswa)', value: 'pengguna' },
  ]"
  :required="true"
  />
  <InputError class="mt-1" :message="form.errors.role" />
  </div>

 <div>
 <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
 <input 
 type="password" 
 v-model="form.password" 
 required
 class="w-full px-4 py-2.5 rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
 placeholder="••••••••"
 />
 <InputError class="mt-1" :message="form.errors.password" />
 </div>

 <div>
 <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Konfirmasi Password</label>
 <input 
 type="password" 
 v-model="form.password_confirmation" 
 required
 class="w-full px-4 py-2.5 rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
 placeholder="••••••••"
 />
 <InputError class="mt-1" :message="form.errors.password_confirmation" />
 </div>

 <button 
 type="submit" 
 :disabled="form.processing"
 class="w-full py-3.5 bg-accent text-accent-ink font-semibold rounded-sm disabled:opacity-50 text-sm flex items-center justify-center gap-2"
 >
 <Icon v-if="form.processing" icon="svg-spinners:ring-resize" class="w-5 h-5 animate-spin" />
 <span>Daftar Akun</span>
 </button>
 </form>

 <div class="mt-6 text-center">
 <Link 
 :href="route('login')"
 class="text-xs text-gray-500 hover:text-gray-950 dark:hover:text-white transition-colors"
 >
 Sudah punya akun? <span class="font-semibold underline text-blue-600 dark:text-blue-400">Login Disini</span>
 </Link>
 </div>
 </GuestLayout>
</template>
