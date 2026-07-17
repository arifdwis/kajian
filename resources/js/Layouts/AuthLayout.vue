<script setup>
import { ref, watchEffect } from 'vue';
const isDarkMode = ref(localStorage.getItem('darkMode') === 'true');

watchEffect(() => {
	if(isDarkMode.value) {
		document.documentElement.classList.add('dark');
	} else {
		document.documentElement.classList.remove('dark');
	}
});
</script>

<template>
	<div class="bg-paper-2 dark:bg-paper-2-dark min-h-screen flex flex-col justify-center">
		<slot />
	</div>
</template>
