<script setup>
defineProps({
 type: {
 type: String,
 default: 'submit',
 },
});
</script>

<template>
 <button
 :type="type"
 class="inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold rounded-sm transition-colors focus:outline-none focus:ring-2"
 style="background-color: var(--color-accent); color: var(--color-accent-ink);"
 @mouseenter="$event.target.style.backgroundColor = 'oklch(39% 0.055 135)'"
 @mouseleave="$event.target.style.backgroundColor = 'var(--color-accent)'"
 >
 <slot />
 </button>
</template>
