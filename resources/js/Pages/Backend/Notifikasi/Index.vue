<script setup>
import { ref } from 'vue';
import { Head, Link, router } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import Pagination from '@/Components/Pagination.vue';
import ConfirmModal from '@/Components/ConfirmModal.vue';
import { useToast } from 'vue-toastification';

const toast = useToast();

const props = defineProps({
 notifications: Object,
});

const markAsRead = (uuid) => {
 router.post(route('notifikasi.read', uuid), {}, {
 onError: () => toast.error('Gagal memproses.')
 });
};

const showConfirm = ref(false);

const markAllAsRead = () => {
 showConfirm.value = true;
};

const executeMarkAllAsRead = () => {
 router.post(route('notifikasi.read-all'), {}, {
 onSuccess: () => {
 showConfirm.value = false;
 },
 onError: () => toast.error('Gagal memproses.')
 });
};
</script>

<template>
 <Head title="Kotak Masuk Notifikasi" />
 
 <AuthenticatedLayout>
 <div class="space-y-6 w-full">
 <!-- Header bar -->
 <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700 ">
 <div>
 <h3 class="text-xl font-bold text-gray-900 dark:text-white">Notifikasi Saya</h3>
 <p class="text-xs text-gray-500 mt-1">Kotak masuk info aktivitas, review kajian, dan persetujuan dari sistem.</p>
 </div>
 <button 
 @click="markAllAsRead"
 class="inline-flex items-center gap-1.5 px-4 py-2 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-bold rounded-sm text-xs hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
 >
 <Icon icon="solar:check-square-bold" class="w-4 h-4" />
 Tandai Semua Dibaca
 </button>
 </div>

 <!-- Notifications list -->
 <div class="bg-paper dark:bg-gray-800 rounded-card border border-gray-100 dark:border-gray-700 overflow-hidden p-6 space-y-4">
 <div v-if="notifications.data.length === 0" class="text-center text-gray-400 py-12 text-xs">
 <Icon icon="solar:bell-bing-bold" class="w-12 h-12 mx-auto mb-2 text-gray-350" />
 Tidak ada notifikasi baru untuk Anda.
 </div>

 <div class="divide-y divide-gray-100 dark:divide-gray-700">
 <div 
 v-for="item in notifications.data" 
 :key="item.id"
 class="py-4 first:pt-0 last:pb-0 flex items-start justify-between gap-4"
 :class="{ 'opacity-60': item.is_read }"
 >
 <div class="flex items-start gap-3">
 <div 
 class="p-2.5 rounded-sm shrink-0"
 :class="item.is_read ? 'bg-gray-50 text-gray-450 dark:bg-gray-900/60' : 'bg-paper-2 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'"
 >
 <Icon icon="solar:bell-bold" class="w-5 h-5" />
 </div>
 <div>
 <div class="flex items-center gap-2">
 <span class="text-xs font-semibold text-gray-950 dark:text-white">{{ item.title }}</span>
 <span v-if="!item.is_read" class="w-2 h-2 rounded-full bg-accent shrink-0"></span>
 </div>
 <p class="text-xs text-gray-550 dark:text-gray-300 mt-1 leading-relaxed">{{ item.message }}</p>
 <span class="text-[9px] text-gray-400 mt-2 block font-medium">{{ $diffForHumans(item.created_at) }}</span>
 </div>
 </div>

 <!-- Read trigger -->
 <button 
 v-if="!item.is_read"
 @click="markAsRead(item.uuid)"
 class="text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:underline px-3 py-1.5 hover:bg-paper-2 dark:hover:bg-blue-900/30 rounded-sm shrink-0 transition-colors"
 >
 Tandai Dibaca
 </button>
 </div>
 </div>

 <!-- Pagination footer -->
 <div class="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t dark:border-gray-700">
 <p class="text-xs text-gray-400">
 Menampilkan {{ notifications.from || 0 }} sampai {{ notifications.to || 0 }} dari {{ notifications.total }} data
 </p>
 <Pagination :links="notifications.links" />
 </div>
 </div>

 <!-- Custom Reusable Confirm Modal -->
 <ConfirmModal 
 :show="showConfirm"
 title="Tandai Semua Telah Dibaca"
 message="Apakah Anda yakin ingin menandai semua notifikasi sebagai telah dibaca?"
 confirm-text="Ya, Tandai Dibaca"
 cancel-text="Batal"
 type="info"
 @confirm="executeMarkAllAsRead"
 @cancel="showConfirm = false"
 />
 </div>
 </AuthenticatedLayout>
</template>
