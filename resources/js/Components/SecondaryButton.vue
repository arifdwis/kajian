<script setup>
defineProps({
 type: {
 type: String,
 default: 'button',
 },
});
</script>

<template>
 <button
 :type="type"
 class="inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold rounded-sm transition-colors focus:outline-none focus:ring-2"
 style="border: 1px solid var(--color-rule); color: var(--color-ink);"
 @mouseenter="$event.target.style.backgroundColor = 'var(--color-paper-2)'"
 @mouseleave="$event.target.style.backgroundColor = 'transparent'"
 >
 <slot />
 </button>
</template>
