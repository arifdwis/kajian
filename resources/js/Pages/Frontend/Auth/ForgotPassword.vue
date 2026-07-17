<script setup>
import { Head, useForm, Link } from '@inertiajs/vue3';
import { useToast } from 'vue-toastification';
import GuestLayout from '@/Layouts/GuestLayout.vue';
import InputError from '@/Components/InputError.vue';

const toast = useToast();

defineProps({
 status: {
 type: String,
 },
});

const form = useForm({
 email: '',
});

const submit = () => {
 form.post(route('password.email'), {
 onSuccess: () => toast.success('Tautan reset password telah dikirim ke email Anda.'),
 onError: (errors) => {
 Object.values(errors).forEach(err => toast.error(err));
 }
 });
};
</script>

<template>
 <GuestLayout>
 <Head title="Lupa Password" />

 <div class="text-center mb-6">
 <h1 class="text-2xl font-semibold text-gray-900 dark:text-white tracking-tight">Lupa Password</h1>
 <p class="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
 Masukkan email terdaftar Anda untuk menerima tautan pemulihan kata sandi.
 </p>
 </div>

 <div v-if="status" class="mb-4 text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 p-3 rounded-sm">
 {{ status }}
 </div>

 <form @submit.prevent="submit" class="space-y-4">
 <div>
 <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
 <input 
 type="email" 
 v-model="form.email" 
 required
 autofocus
 class="w-full px-4 py-2.5 rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
 placeholder="nama@domain.com"
 />
 <InputError class="mt-1" :message="form.errors.email" />
 </div>

 <button 
 type="submit" 
 :disabled="form.processing"
 class="w-full py-3.5 bg-accent text-accent-ink font-semibold rounded-sm disabled:opacity-50 text-sm flex items-center justify-center gap-2"
 >
 <Icon v-if="form.processing" icon="svg-spinners:ring-resize" class="w-5 h-5 animate-spin" />
 <span>Kirim Link Reset</span>
 </button>
 </form>

 <div class="mt-6 text-center">
 <Link 
 :href="route('login')"
 class="text-xs text-gray-500 hover:text-gray-950 dark:hover:text-white transition-colors"
 >
 Kembali ke halaman <span class="font-semibold underline text-blue-600 dark:text-blue-400">Login</span>
 </Link>
 </div>
 </GuestLayout>
</template>
