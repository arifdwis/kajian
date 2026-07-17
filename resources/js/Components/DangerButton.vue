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
 style="background-color: oklch(50% 0.2 30); color: #fff;"
 @mouseenter="$event.target.style.backgroundColor = 'oklch(45% 0.2 30)'"
 @mouseleave="$event.target.style.backgroundColor = 'oklch(50% 0.2 30)'"
 >
 <slot />
 </button>
</template>
