<script setup>
import { computed, ref } from 'vue';
import { Head, Link, router, usePage } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import ConfirmModal from '@/Components/ConfirmModal.vue';
import { useToast } from 'vue-toastification';

const toast = useToast();

const props = defineProps({
 kajian: Object,
});

const page = usePage();
const roles = computed(() => page.props.auth.roles || []);
const isAdmin = computed(() => roles.value.some(r => ['superadmin', 'admin'].includes(r)));

const getFile = (type) => {
 if (!props.kajian.files) return null;
 return props.kajian.files.find(f => f.tipe === type);
};

const filePdf = computed(() => getFile('pdf'));
const filePresentasi = computed(() => getFile('presentasi'));
const fileCover = computed(() => getFile('cover'));

const showConfirmModal = ref(false);
const confirmModalConfig = ref({
 title: '',
 message: '',
 confirmText: '',
 type: 'danger',
 onConfirm: () => {}
});

const openConfirm = (title, message, confirmText, type, onConfirm) => {
 confirmModalConfig.value = {
 title,
 message,
 confirmText,
 type,
 onConfirm
 };
 showConfirmModal.value = true;
};

const publishKajian = () => {
 openConfirm(
 'Publikasikan Kajian',
 'Apakah Anda yakin ingin mempublikasikan kajian ini?',
 'Ya, Publikasikan',
 'success',
 () => {
 router.post(route('kajian.publish', props.kajian.uuid), {}, {
 onSuccess: () => {
 showConfirmModal.value = false;
 },
 onError: () => toast.error('Gagal mempublikasikan kajian.')
 });
 }
 );
};

const archiveKajian = () => {
 openConfirm(
 'Arsipkan Kajian',
 'Apakah Anda yakin ingin mengarsipkan kajian ini?',
 'Ya, Arsipkan',
 'warning',
 () => {
 router.post(route('kajian.archive', props.kajian.uuid), {}, {
 onSuccess: () => {
 showConfirmModal.value = false;
 },
 onError: () => toast.error('Gagal mengarsipkan kajian.')
 });
 }
 );
};

const toDraftKajian = () => {
 openConfirm(
 'Kembalikan ke Draft',
 'Apakah Anda yakin ingin mengembalikan status kajian ini ke draft?',
 'Ya, Set ke Draft',
 'warning',
 () => {
 router.post(route('kajian.draft', props.kajian.uuid), {}, {
 onSuccess: () => {
 showConfirmModal.value = false;
 },
 onError: () => toast.error('Gagal memproses.')
 });
 }
 );
};

const deleteKajian = () => {
 openConfirm(
 'Hapus Kajian',
 'Apakah Anda yakin ingin menghapus kajian ini? Tindakan ini tidak dapat dibatalkan.',
 'Ya, Hapus',
 'danger',
 () => {
 router.delete(route('kajian.destroy', props.kajian.id), {
 onSuccess: () => {
 showConfirmModal.value = false;
 },
 onError: () => toast.error('Gagal menghapus kajian.')
 });
 }
 );
};
</script>

<template>
 <Head :title="kajian.judul" />
 
 <AuthenticatedLayout>
 <div class="space-y-6">
 <!-- Header bar with Breadcrumb -->
 <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700 ">
 <div class="flex items-center gap-3">
 <Link :href="route('kajian.index')" class="p-2.5 bg-gray-50 dark:bg-gray-700 dark:text-gray-300 hover:bg-paper-2 hover:text-blue-600 rounded-sm transition-all">
 <Icon icon="solar:arrow-left-outline" class="w-5 h-5" />
 </Link>
 <div>
 <span class="text-xs font-semibold text-blue-600 dark:text-blue-400 capitalize bg-paper-2 dark:bg-blue-900/30 px-2.5 py-1 rounded-full border border-blue-100 dark:border-blue-800">
 {{ kajian.jenis_kajian?.nama }}
 </span>
 <h3 class="text-lg font-bold text-gray-900 dark:text-white mt-2 max-w-2xl line-clamp-1" :title="kajian.judul">
 {{ kajian.judul }}
 </h3>
 </div>
 </div>

 <!-- Action group -->
 <div class="flex flex-wrap gap-2">
 <Link 
 :href="route('kajian.edit', kajian.id)"
 class="px-4 py-2.5 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 text-gray-700 font-bold rounded-sm text-xs transition-all inline-flex items-center gap-2"
 >
 <Icon icon="solar:pen-bold" class="w-4 h-4" />
 Edit
 </Link>

 <button 
 v-if="kajian.status === 'draft' && isAdmin"
 @click="publishKajian"
 class="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-sm text-xs transition-all inline-flex items-center gap-2"
 >
 <Icon icon="solar:check-square-bold" class="w-4 h-4" />
 Publish
 </button>

 <button 
 v-if="kajian.status === 'published' && isAdmin"
 @click="archiveKajian"
 class="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-sm text-xs transition-all inline-flex items-center gap-2"
 >
 <Icon icon="solar:archive-down-bold" class="w-4 h-4" />
 Arsipkan
 </button>

 <button 
 v-if="['published', 'archived', 'review'].includes(kajian.status)"
 @click="toDraftKajian"
 class="px-4 py-2.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-bold rounded-sm text-xs transition-all inline-flex items-center gap-2 border border-indigo-100 dark:border-indigo-800"
 >
 <Icon icon="solar:notes-bold" class="w-4 h-4" />
 Kembalikan ke Draft
 </button>

 <button 
 @click="deleteKajian"
 class="px-4 py-2.5 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 hover:bg-red-100 font-bold rounded-sm text-xs transition-all inline-flex items-center gap-2 border border-red-100 dark:border-red-900/50"
 >
 <Icon icon="solar:trash-bin-trash-bold" class="w-4 h-4" />
 Hapus
 </button>
 </div>
 </div>

 <!-- Content Layout: Left main information, Right files and versions -->
 <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
 <!-- Left Grid: Kajian detail fields -->
 <div class="lg:col-span-2 space-y-6">
 <!-- General details card -->
 <div class="bg-paper dark:bg-gray-800 p-8 rounded-card border border-gray-100 dark:border-gray-700 space-y-6">
 <div class="flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-4">
 <h4 class="font-bold text-gray-800 dark:text-white">Rincian Dokumen</h4>
 <span 
 class="ml-auto px-2.5 py-0.5 rounded-full text-xs font-bold border capitalize"
 :class="{
 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800': kajian.status === 'published',
 'bg-paper-2 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800': kajian.status === 'draft',
 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800': kajian.status === 'review',
 'bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-950/30 dark:text-gray-400 dark:border-gray-800': kajian.status === 'archived',
 }"
 >
 Status: {{ kajian.status }}
 </span>
 </div>

 <!-- Metadata Table -->
 <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
 <div>
 <span class="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Tahun Terbit</span>
 <span class="text-sm font-semibold text-gray-700 dark:text-gray-200 mt-1 block">{{ kajian.tahun?.tahun }}</span>
 </div>
 <div>
  <span class="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Bidang</span>
 <span class="text-sm font-semibold text-gray-700 dark:text-gray-200 mt-1 block">{{ kajian.bidang?.nama }}</span>
 </div>
 <div>
 <span class="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Penanggung Jawab</span>
 <span class="text-sm font-semibold text-gray-700 dark:text-gray-200 mt-1 block">{{ kajian.penanggung_jawab || '-' }}</span>
 </div>
 <div>
 <span class="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Mitra Peneliti</span>
 <span class="text-sm font-semibold text-gray-700 dark:text-gray-200 mt-1 block">{{ kajian.mitra || '-' }}</span>
 </div>
 </div>

 <!-- Abstract / Summary -->
 <div v-if="kajian.ringkasan" class="space-y-2 pt-4 border-t border-gray-100 dark:border-gray-700">
 <span class="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Ringkasan Eksekutif (Abstrak)</span>
 <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-light whitespace-pre-line">
 {{ kajian.ringkasan }}
 </p>
 </div>

 <!-- Research parameters -->
 <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100 dark:border-gray-700">
 <div v-if="kajian.tujuan" class="space-y-1">
 <span class="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Tujuan Penelitian</span>
 <p class="text-xs text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">{{ kajian.tujuan }}</p>
 </div>
 <div v-if="kajian.latar_belakang" class="space-y-1">
 <span class="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Latar Belakang</span>
 <p class="text-xs text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">{{ kajian.latar_belakang }}</p>
 </div>
 <div v-if="kajian.metodologi" class="space-y-1 md:col-span-2">
 <span class="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Metodologi</span>
 <p class="text-xs text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">{{ kajian.metodologi }}</p>
 </div>
 </div>

 <!-- Results/Conclusion -->
 <div class="grid grid-cols-1 gap-6 pt-4 border-t border-gray-100 dark:border-gray-700">
 <div v-if="kajian.temuan" class="space-y-1">
 <span class="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Temuan Utama</span>
 <p class="text-xs text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">{{ kajian.temuan }}</p>
 </div>
 <div v-if="kajian.rekomendasi" class="space-y-1">
 <span class="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Rekomendasi Kebijakan</span>
 <p class="text-xs text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">{{ kajian.rekomendasi }}</p>
 </div>
 </div>

 <!-- Keywords tags -->
 <div v-if="kajian.keywords && kajian.keywords.length > 0" class="pt-4 border-t border-gray-100 dark:border-gray-700 space-y-2">
 <span class="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Kata Kunci</span>
 <div class="flex flex-wrap gap-2">
 <span 
 v-for="kw in kajian.keywords" 
 :key="kw.id"
 class="text-xs bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-medium px-3 py-1 rounded-sm border border-gray-100 dark:border-gray-600"
 >
 {{ kw.nama }}
 </span>
 </div>
 </div>
 </div>
 </div>

 <!-- Right Grid: Files, statistics and version history -->
 <div class="space-y-6">
 <!-- Files & Cover image -->
 <div class="bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700 space-y-6">
 <h4 class="font-bold text-gray-800 dark:text-white text-sm border-b border-gray-50 dark:border-gray-700 pb-3">Cover & Lampiran Berkas</h4>
 
 <!-- Cover preview -->
 <div class="aspect-[4/3] bg-gray-100 dark:bg-gray-900 rounded-card overflow-hidden border border-gray-200 dark:border-gray-700 relative flex items-center justify-center">
 <img 
 v-if="fileCover" 
 :src="`/storage/${fileCover.path}`" 
 alt="Cover"
 class="w-full h-full object-cover" 
 />
 <div v-else class="text-center p-6 text-gray-300">
 <Icon icon="solar:gallery-bold" class="w-12 h-12 mx-auto mb-2" />
 <span class="text-xs">Tidak ada cover</span>
 </div>
 </div>

 <!-- PDF & Slide downloads -->
 <div class="space-y-3">
 <a 
 v-if="filePdf"
 :href="`/storage/${filePdf.path}`" 
 target="_blank"
 class="w-full flex items-center gap-3 p-3 border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-sm transition-all"
 >
 <div class="p-2 bg-red-50 text-red-500 rounded-sm">
 <Icon icon="solar:file-text-bold" class="w-5 h-5" />
 </div>
 <div class="min-w-0 flex-1">
 <span class="block text-xs font-bold text-gray-800 dark:text-gray-200 truncate">Laporan Kajian Utama</span>
 <span class="text-[10px] text-gray-400 block mt-0.5">{{ (filePdf.size / 1024 / 1024).toFixed(2) }} MB • PDF</span>
 </div>
 <Icon icon="solar:download-bold" class="w-4 h-4 text-gray-400" />
 </a>

 <a 
 v-if="filePresentasi"
 :href="`/storage/${filePresentasi.path}`" 
 target="_blank"
 class="w-full flex items-center gap-3 p-3 border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-sm transition-all"
 >
 <div class="p-2 bg-amber-50 text-amber-500 rounded-sm">
 <Icon icon="solar:play-bold" class="w-5 h-5" />
 </div>
 <div class="min-w-0 flex-1">
 <span class="block text-xs font-bold text-gray-800 dark:text-gray-200 truncate">Bahan Presentasi / Slide</span>
 <span class="text-[10px] text-gray-400 block mt-0.5">{{ (filePresentasi.size / 1024 / 1024).toFixed(2) }} MB</span>
 </div>
 <Icon icon="solar:download-bold" class="w-4 h-4 text-gray-400" />
 </a>
 </div>
 </div>

 <!-- Version Control snaps -->
 <div class="bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700 space-y-6">
 <h4 class="font-bold text-gray-800 dark:text-white text-sm border-b border-gray-50 dark:border-gray-700 pb-3 flex items-center justify-between">
 <span>Riwayat Versi</span>
 <span class="bg-paper-2 text-blue-600 dark:bg-blue-900/30 text-[10px] font-bold px-2 py-0.5 rounded-full">v{{ kajian.version }}</span>
 </h4>

 <div class="space-y-4 max-h-[300px] overflow-y-auto">
 <div v-if="!kajian.versions || kajian.versions.length === 0" class="text-center text-xs text-gray-400 py-6">
 Belum ada riwayat perubahan terekam.
 </div>
 <div 
 v-for="ver in kajian.versions" 
 :key="ver.id"
 class="relative pl-5 border-l-2 border-gray-100 dark:border-gray-700 pb-4 last:pb-0"
 >
 <!-- Timeline node dot -->
 <div class="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-paper-20"></div>

 <div class="flex items-center justify-between">
 <span class="text-[10px] font-bold text-blue-600 bg-paper-2 dark:bg-blue-900/30 px-2 py-0.5 rounded">
 Versi {{ ver.version_number }}
 </span>
 <span class="text-[9px] text-gray-400">{{ new Date(ver.created_at).toLocaleDateString('id-ID') }}</span>
 </div>
 <p class="text-xs text-gray-600 dark:text-gray-300 mt-2 font-medium leading-relaxed">
 {{ ver.description }}
 </p>
 <span class="text-[9px] text-gray-400 mt-1 block">Oleh: {{ ver.creator?.name || 'Sistem' }}</span>
 </div>
 </div>
 </div>
 </div>
 </div>

 <!-- Custom Reusable Confirm Modal -->
 <ConfirmModal 
 :show="showConfirmModal"
 :title="confirmModalConfig.title"
 :message="confirmModalConfig.message"
 :confirm-text="confirmModalConfig.confirmText"
 :type="confirmModalConfig.type"
 @confirm="confirmModalConfig.onConfirm"
 @cancel="showConfirmModal = false"
 />
 </div>
 </AuthenticatedLayout>
</template>
