<script setup>
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import { Link } from '@inertiajs/vue3';
</script>

<template>
 <div class="flex min-h-screen flex-col items-center justify-center bg-paper-2 dark:bg-paper-2-dark px-4 py-8 sm:pt-0">
 <div class="mb-8">
 <Link href="/">
 <ApplicationLogo />
 </Link>
 </div>
 
 <div class="w-full overflow-hidden bg-paper dark:bg-paper-dark px-6 py-8 sm:max-w-md rounded-card border border-gray-100 dark:border-gray-700">
 <slot />
 </div>
 </div>
</template>
