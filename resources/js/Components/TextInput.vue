<script setup>
import { onMounted, ref } from 'vue';

defineProps({
 modelValue: {
 type: String,
 required: true,
 },
});

defineEmits(['update:modelValue']);

const input = ref(null);

onMounted(() => {
 if (input.value.hasAttribute('autofocus')) {
 input.value.focus();
 }
});

defineExpose({ focus: () => input.value.focus() });
</script>

<template>
 <input
 class="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500/20 rounded-sm px-4 py-2.5 transition-colors text-sm w-full"
 :value="modelValue"
 @input="$emit('update:modelValue', $event.target.value)"
 ref="input"
 />
</template>
