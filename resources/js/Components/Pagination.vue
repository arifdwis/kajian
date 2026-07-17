<script setup>
import { Link } from '@inertiajs/vue3';

defineProps({
 links: {
 type: Array,
 required: true,
 },
});
</script>

<template>
 <div v-if="links.length > 3">
 <div class="flex flex-wrap -mb-1 justify-center sm:justify-start gap-1">
 <template v-for="(link, key) in links">
 <div
 v-if="link.url === null"
 :key="`null-${key}`"
 class="mr-1 mb-1 px-4 py-2 text-sm leading-4 text-gray-400 border border-gray-200 dark:border-gray-700 rounded-sm"
 v-html="link.label"
 />
 <Link
 v-else
 :key="`link-${key}`"
 class="mr-1 mb-1 px-4 py-2 text-sm leading-4 border rounded-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:border-blue-500 focus:text-blue-500 transition-colors"
 :class="{ 'bg-accent border-blue-600 hover:bg-blue-700 text-white dark:text-white': link.active, 'text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700': !link.active }"
 :href="link.url"
 v-html="link.label"
 />
 </template>
 </div>
 </div>
</template>
