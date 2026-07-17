<script setup>
import { Head, useForm } from '@inertiajs/vue3';
import { useToast } from 'vue-toastification';
import GuestLayout from '@/Layouts/GuestLayout.vue';
import InputError from '@/Components/InputError.vue';

const toast = useToast();

const props = defineProps({
 email: {
 type: String,
 required: true,
 },
 token: {
 type: String,
 required: true,
 },
});

const form = useForm({
 token: props.token,
 email: props.email,
 password: '',
 password_confirmation: '',
});

const submit = () => {
 form.post(route('password.store'), {
 onFinish: () => form.reset('password', 'password_confirmation'),
 onSuccess: () => toast.success('Password berhasil diperbarui.'),
 onError: (errors) => {
 Object.values(errors).forEach(err => toast.error(err));
 }
 });
};
</script>

<template>
 <GuestLayout>
 <Head title="Reset Password" />

 <div class="text-center mb-6">
 <h1 class="text-2xl font-semibold text-gray-900 dark:text-white tracking-tight">Atur Ulang Password</h1>
 <p class="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
 Masukkan password baru Anda di bawah ini.
 </p>
 </div>

 <form @submit.prevent="submit" class="space-y-4">
 <div>
 <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
 <input 
 type="email" 
 v-model="form.email" 
 required
 readonly
 class="w-full px-4 py-2.5 rounded-sm border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-400 text-sm focus:ring-0 cursor-not-allowed"
 />
 <InputError class="mt-1" :message="form.errors.email" />
 </div>

 <div>
 <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password Baru</label>
 <input 
 type="password" 
 v-model="form.password" 
 required
 autofocus
 class="w-full px-4 py-2.5 rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
 placeholder="••••••••"
 />
 <InputError class="mt-1" :message="form.errors.password" />
 </div>

 <div>
 <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Konfirmasi Password Baru</label>
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
 <span>Reset Password</span>
 </button>
 </form>
 </GuestLayout>
</template>
