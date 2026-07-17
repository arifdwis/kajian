<script setup>
import { onMounted, onUnmounted } from 'vue';
import { Icon } from '@iconify/vue';

const props = defineProps({
 show: Boolean,
 title: {
 type: String,
 default: 'Konfirmasi Tindakan'
 },
 message: {
 type: String,
 default: 'Apakah Anda yakin ingin melanjutkan tindakan ini?'
 },
 confirmText: {
 type: String,
 default: 'Ya, Lanjutkan'
 },
 cancelText: {
 type: String,
 default: 'Batal'
 },
 type: {
 type: String,
 default: 'danger' // danger, warning, success, info
 }
});

const emit = defineEmits(['confirm', 'cancel', 'close']);

const close = () => {
 emit('cancel');
 emit('close');
};

const confirm = () => {
 emit('confirm');
 emit('close');
};

const handleKeyDown = (e) => {
 if (e.key === 'Escape' && props.show) {
 close();
 }
};

onMounted(() => window.addEventListener('keydown', handleKeyDown));
onUnmounted(() => window.removeEventListener('keydown', handleKeyDown));
</script>

<template>
 <Teleport to="body">
 <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4">
 <div class="absolute inset-0" style="background-color: oklch(0% 0 0 / 0.4);" @click="close"></div>
 
 <div class="relative w-full max-w-sm p-6 space-y-5" style="background-color: var(--color-paper); border: 1px solid var(--color-rule); border-radius: var(--radius-card); box-shadow: var(--shadow-modal);">
 
 <div class="flex items-center gap-4">
 <div
 class="p-3 rounded-md shrink-0"
 :style="{
 backgroundColor: type === 'danger' ? 'oklch(60% 0.2 30 / 0.15)' : type === 'warning' ? 'oklch(70% 0.15 80 / 0.15)' : type === 'success' ? 'oklch(65% 0.15 150 / 0.15)' : 'oklch(77% 0.035 60 / 0.15)',
 color: type === 'danger' ? 'oklch(50% 0.2 30)' : type === 'warning' ? 'oklch(60% 0.15 80)' : type === 'success' ? 'oklch(55% 0.15 150)' : 'var(--color-accent)',
 }"
 >
 <Icon v-if="type === 'danger'" icon="solar:trash-bin-trash-bold-duotone" class="w-5 h-5" />
 <Icon v-else-if="type === 'warning'" icon="solar:shield-warning-bold-duotone" class="w-5 h-5" />
 <Icon v-else-if="type === 'success'" icon="solar:check-square-bold-duotone" class="w-5 h-5" />
 <Icon v-else icon="solar:info-square-bold-duotone" class="w-5 h-5" />
 </div>
 <div>
 <h4 class="font-bold text-sm leading-tight" style="color: var(--color-ink);">{{ title }}</h4>
 <span class="text-[10px] font-medium tracking-wider mt-0.5 block" style="color: var(--color-ink-2);">Verifikasi</span>
 </div>
 </div>

 <p class="text-xs leading-relaxed" style="color: var(--color-ink-2);">
 {{ message }}
 </p>

 <div class="flex justify-end gap-2 pt-4" style="border-top: 1px solid var(--color-rule);">
 <button
 type="button"
 @click="close"
 class="px-3 py-1.5 text-xs font-medium rounded-md transition-colors"
 style="border: 1px solid var(--color-rule); color: var(--color-ink-2);"
 @mouseenter="$event.target.style.backgroundColor = 'var(--color-paper-2)'"
 @mouseleave="$event.target.style.backgroundColor = 'transparent'"
 >
 {{ cancelText }}
 </button>
 <button
 type="button"
 @click="confirm"
 class="px-3 py-1.5 text-xs font-semibold rounded-md transition-colors"
 :style="{
 backgroundColor: type === 'danger' ? 'oklch(50% 0.2 30)' : type === 'warning' ? 'oklch(60% 0.15 80)' : type === 'success' ? 'oklch(55% 0.15 150)' : 'var(--color-accent)',
 color: '#fff',
 }"
 @mouseenter="$event.target.style.filter = 'brightness(0.9)'"
 @mouseleave="$event.target.style.filter = 'none'"
 >
 {{ confirmText }}
 </button>
 </div>
 </div>
 </div>
 </Teleport>
</template>
