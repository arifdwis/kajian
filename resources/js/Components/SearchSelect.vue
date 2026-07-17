<script setup>
import Select from 'primevue/select';

const props = defineProps({
  modelValue: { default: '' },
  options: { type: Array, default: () => [] },
  optionLabel: { type: String, default: 'label' },
  optionValue: { type: String, default: 'value' },
  placeholder: { type: String, default: 'Pilih...' },
  disabled: { type: Boolean, default: false },
  required: { type: Boolean, default: false },
  filterPlaceholder: { type: String, default: 'Ketik untuk mencari...' },
  classes: { type: String, default: '' },
});

const emit = defineEmits(['update:modelValue', 'change']);
</script>

<template>
  <Select
    :modelValue="modelValue"
    :options="options"
    :optionLabel="optionLabel"
    :optionValue="optionValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :filter="true"
    :filterPlaceholder="filterPlaceholder"
    :showClear="!required"
    :pt="{
      root: { class: 'w-full' },
      input: { class: 'text-sm' },
    }"
    :class="classes"
    @update:modelValue="emit('update:modelValue', $event)"
    @change="emit('change', $event)"
  />
</template>
