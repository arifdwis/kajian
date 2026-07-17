<script setup>
import { ref } from 'vue';
import { Head, useForm, Link } from '@inertiajs/vue3';
import { useToast } from 'vue-toastification';
import GuestLayout from '@/Layouts/GuestLayout.vue';
import InputError from '@/Components/InputError.vue';

const toast = useToast();
const disabled = ref(false);

const form = useForm({
 email: '',
 password: '',
 remember: false,
});

const submit = () => {
 form.post(route('login'), {
 onFinish: () => form.reset('password'),
 onError: (errors) => {
 Object.values(errors).forEach(err => {
 toast.error(err);
 });
 disabled.value = true;
 setTimeout(() => {
 disabled.value = false;
 }, 1500);
 }
 });
};
</script>

<template>
 <GuestLayout>
 <Head title="Login" />
 
 <div>
 <div class="text-center mb-8">
 <h1 class="text-3xl font-semibold text-gray-900 dark:text-white tracking-tight">SIKAJIAN</h1>
 <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
 Sistem Informasi Kajian dan Riset
 </p>
 <p class="text-xs text-gray-400 dark:text-gray-500 font-medium">Bapperida Kota Samarinda</p>
 </div>

 <!-- SSO Login -->
 <div class="space-y-4">
 <a 
 :href="route('sso.login')"
 class="w-full flex items-center justify-center gap-3 px-6 py-4 text-white font-semibold rounded-card transition-all text-sm"
 >
 <Icon icon="solar:login-2-bold" class="w-5 h-5" />
 Masuk dengan SSO Samarinda
 </a>
 <p class="text-[11px] text-center text-gray-400 dark:text-gray-500 leading-normal px-2">
 Aplikasi ini terintegrasi dengan Single Sign On Pemkot Samarinda. Silakan gunakan akun SSO Anda untuk login.
 </p>
 </div>
 </div>
 </GuestLayout>
</template>

<style scoped>
.shake {
 animation: shake 0.5s;
}
@keyframes shake {
 0%, 100% { transform: translateX(0); }
 10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
 20%, 40%, 60%, 80% { transform: translateX(5px); }
}
</style>
