<!-- Hallmark · genre: modern-minimal · macrostructure: Content-Detail (2/3+1/3) · theme: Samarinda civic green · design-system: design.md · designed-as-app -->
<script setup>
import { computed } from 'vue';
import { Head, Link } from '@inertiajs/vue3';
import FrontendLayout from '@/Layouts/FrontendLayout.vue';
import axios from 'axios';
import { useToast } from 'vue-toastification';

const toast = useToast();

const props = defineProps({
 kajian: Object,
 relatedKajians: Array,
});

const getFile = (type) => {
 if (!props.kajian.files) return null;
 return props.kajian.files.find(f => f.tipe === type);
};

const filePdf = computed(() => getFile('pdf'));
const filePresentasi = computed(() => getFile('presentasi'));
const fileCover = computed(() => getFile('cover'));

const triggerDownload = (file) => {
 if (!file) return;
 toast.info('Memulai unduhan berkas...');
 axios.post(route('portal.download', props.kajian.slug), {
 file_id: file.id
 }, {
 responseType: 'blob'
 }).then((response) => {
 const url = window.URL.createObjectURL(new Blob([response.data]));
 const link = document.createElement('a');
 link.href = url;
 link.setAttribute('download', file.file_name);
 document.body.appendChild(link);
 link.click();
 link.remove();
 toast.success('Unduhan berhasil.');
 }).catch(err => {
 toast.error('Gagal mengunduh berkas.');
 console.error(err);
 });
};

const shareLink = (platform) => {
 const url = window.location.href;
 const text = `Baca kajian Bapperida: "${props.kajian.judul}"`;
 
 let shareUrl = '';
 if (platform === 'whatsapp') {
 shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`;
 } else if (platform === 'facebook') {
 shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
 } else if (platform === 'twitter') {
 shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
 } else if (platform === 'copy') {
 navigator.clipboard.writeText(url);
 toast.success('Link tautan disalin ke clipboard.');
 return;
 }
 window.open(shareUrl, '_blank');
};
</script>

<template>
 <Head :title="kajian.judul" />
 
 <FrontendLayout>
 <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
 <!-- Top bar / breadcrumb style back -->
 <div class="mb-8 flex items-center gap-2">
 <Link :href="route('portal.kajian')" class="text-xs font-semibold transition-colors flex items-center gap-1" style="color: var(--color-ink-2);">
 <Icon icon="solar:arrow-left-linear" class="w-4 h-4" />
 Kembali ke Daftar Kajian
 </Link>
 </div>

 <!-- Detail Grid Layout -->
 <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
 <!-- Left 2/3: Title, Metadata, Abstract and description -->
 <div class="lg:col-span-2 space-y-8">
 <!-- Title and badging -->
 <div class="space-y-4">
 <span class="inline-block text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full" style="background-color: var(--color-paper-2); color: var(--color-accent); border: 1px solid var(--color-rule);">
 {{ kajian.jenis_kajian?.nama }}
 </span>
 <h1 class="text-2xl sm:text-3xl font-semibold leading-relaxed" style="color: var(--color-ink);">
 {{ kajian.judul }}
 </h1>
 <p class="text-xs font-medium" style="color: var(--color-ink-2);">
 Dipublikasikan pada: {{ new Date(kajian.published_at || kajian.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) }}
 </p>
 </div>

 <!-- Metadata Grid -->
 <div class="grid grid-cols-2 sm:grid-cols-4 gap-6 p-6 rounded-xl text-xs" style="background-color: var(--color-paper); border: 1px solid var(--color-rule);">
 <div>
 <span class="text-[9px] font-semibold uppercase tracking-wider block" style="color: var(--color-ink-2);">Tahun</span>
 <span class="font-semibold mt-1 block" style="color: var(--color-ink);">{{ kajian.tahun?.tahun }}</span>
 </div>
 <div>
 <span class="text-[9px] font-semibold uppercase tracking-wider block" style="color: var(--color-ink-2);">Rumpun Bidang</span>
 <span class="font-semibold mt-1 block" style="color: var(--color-ink);">{{ kajian.bidang?.nama }}</span>
 </div>
 <div>
 <span class="text-[9px] font-semibold uppercase tracking-wider block" style="color: var(--color-ink-2);">Penanggung Jawab</span>
 <span class="font-semibold mt-1 block" style="color: var(--color-ink);">{{ kajian.penanggung_jawab || '-' }}</span>
 </div>
 <div>
 <span class="text-[9px] font-semibold uppercase tracking-wider block" style="color: var(--color-ink-2);">Mitra Rumpun</span>
 <span class="font-semibold mt-1 block" style="color: var(--color-ink);">{{ kajian.mitra || '-' }}</span>
 </div>
 </div>

 <!-- Abstract / Summary -->
 <div v-if="kajian.ringkasan" class="space-y-3">
 <h4 class="font-semibold text-sm uppercase tracking-wider" style="color: var(--color-ink);">Ringkasan Eksekutif</h4>
 <p class="text-sm leading-relaxed font-light whitespace-pre-line" style="color: var(--color-ink-2);">
 {{ kajian.ringkasan }}
 </p>
 </div>

 <!-- Goals, Methodology and background -->
 <div class="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6" style="border-top: 1px solid var(--color-rule);">
 <div v-if="kajian.tujuan" class="space-y-2">
 <h5 class="font-semibold text-xs uppercase tracking-wider" style="color: var(--color-ink);">Tujuan Kajian</h5>
 <p class="text-xs leading-relaxed whitespace-pre-line" style="color: var(--color-ink-2);">{{ kajian.tujuan }}</p>
 </div>
 <div v-if="kajian.latar_belakang" class="space-y-2">
 <h5 class="font-semibold text-xs uppercase tracking-wider" style="color: var(--color-ink);">Latar Belakang</h5>
 <p class="text-xs leading-relaxed whitespace-pre-line" style="color: var(--color-ink-2);">{{ kajian.latar_belakang }}</p>
 </div>
 <div v-if="kajian.metodologi" class="space-y-2 md:col-span-2 pt-4" style="border-top: 1px solid var(--color-rule);">
 <h5 class="font-semibold text-xs uppercase tracking-wider" style="color: var(--color-ink);">Metode Riset</h5>
 <p class="text-xs leading-relaxed whitespace-pre-line" style="color: var(--color-ink-2);">{{ kajian.metodologi }}</p>
 </div>
 </div>

 <!-- Findings / recommendations -->
 <div class="grid grid-cols-1 gap-6 pt-6" style="border-top: 1px solid var(--color-rule);">
 <div v-if="kajian.temuan" class="space-y-2">
 <h5 class="font-semibold text-xs uppercase tracking-wider" style="color: var(--color-ink);">Temuan Utama</h5>
 <p class="text-xs leading-relaxed whitespace-pre-line" style="color: var(--color-ink-2);">{{ kajian.temuan }}</p>
 </div>
 <div v-if="kajian.rekomendasi" class="space-y-2">
 <h5 class="font-semibold text-xs uppercase tracking-wider" style="color: var(--color-ink);">Rekomendasi Kebijakan</h5>
 <p class="text-xs leading-relaxed whitespace-pre-line" style="color: var(--color-ink-2);">{{ kajian.rekomendasi }}</p>
 </div>
 </div>

 <!-- Keywords tags -->
 <div v-if="kajian.keywords && kajian.keywords.length > 0" class="pt-6 space-y-3" style="border-top: 1px solid var(--color-rule);">
 <h5 class="font-semibold text-xs uppercase tracking-wider" style="color: var(--color-ink);">Kata Kunci</h5>
 <div class="flex flex-wrap gap-2">
 <span 
 v-for="kw in kajian.keywords" 
 :key="kw.id"
 class="text-xs font-semibold px-3 py-1 rounded-sm"
 style="background-color: var(--color-paper-2); color: var(--color-ink-2); border: 1px solid var(--color-rule);"
 >
 {{ kw.nama }}
 </span>
 </div>
 </div>
 </div>

 <!-- Right 1/3: Document actions, Cover art and Related documents -->
 <div class="space-y-8">
 <!-- Files widget -->
 <div class="p-6 rounded-xl space-y-6" style="background-color: var(--color-paper); border: 1px solid var(--color-rule);">
 <h4 class="font-semibold text-sm pb-3" style="color: var(--color-ink); border-bottom: 1px solid var(--color-rule);">Cover & Lampiran Berkas</h4>
 
 <!-- Cover graphic -->
 <div class="aspect-[4/3] rounded-xl overflow-hidden relative flex items-center justify-center" style="background-color: var(--color-paper-2); border: 1px solid var(--color-rule);">
 <img 
 v-if="fileCover" 
 :src="`/storage/${fileCover.file_path}`" 
 alt="Cover File"
 class="w-full h-full object-cover" 
 />
 <div v-else class="text-center p-6" style="color: var(--color-ink-2);">
 <Icon icon="solar:gallery-bold" class="w-12 h-12 mx-auto mb-2" />
 <span class="text-xs">No Cover Image</span>
 </div>
 </div>

 <!-- Action buttons for attachment downloads -->
 <div class="space-y-3">
 <button 
 v-if="filePdf"
 @click="triggerDownload(filePdf)"
 class="w-full flex items-center gap-3 p-3.5 rounded-xl text-left"
 style="border: 1px solid var(--color-rule); background-color: var(--color-paper-2);"
 >
 <div class="p-2 rounded-sm" style="background-color: var(--color-paper); color: var(--color-accent);">
 <Icon icon="solar:file-text-bold" class="w-5 h-5" />
 </div>
 <div class="min-w-0 flex-grow">
 <span class="block text-xs font-semibold" style="color: var(--color-ink);">Laporan Kajian Utama</span>
 <span class="text-[9px] block mt-0.5" style="color: var(--color-ink-2);">{{ (filePdf.size / 1024 / 1024).toFixed(2) }} MB • PDF</span>
 </div>
 <Icon icon="solar:download-linear" class="w-4 h-4" style="color: var(--color-ink-2);" />
 </button>

 <button 
 v-if="filePresentasi"
 @click="triggerDownload(filePresentasi)"
 class="w-full flex items-center gap-3 p-3.5 rounded-xl text-left"
 style="border: 1px solid var(--color-rule); background-color: var(--color-paper-2);"
 >
 <div class="p-2 rounded-sm" style="background-color: var(--color-paper); color: var(--color-accent);">
 <Icon icon="solar:play-bold" class="w-5 h-5" />
 </div>
 <div class="min-w-0 flex-grow">
 <span class="block text-xs font-semibold" style="color: var(--color-ink);">Bahan Presentasi / Slide</span>
 <span class="text-[9px] block mt-0.5" style="color: var(--color-ink-2);">{{ (filePresentasi.size / 1024 / 1024).toFixed(2) }} MB</span>
 </div>
 <Icon icon="solar:download-linear" class="w-4 h-4" style="color: var(--color-ink-2);" />
 </button>
 </div>
 </div>

 <!-- Share Platform -->
 <div class="p-6 rounded-xl space-y-4" style="background-color: var(--color-paper); border: 1px solid var(--color-rule);">
 <h4 class="font-semibold text-sm pb-3" style="color: var(--color-ink); border-bottom: 1px solid var(--color-rule);">Bagikan Dokumen</h4>
 <div class="flex items-center gap-3">
 <button 
 @click="shareLink('whatsapp')"
 class="p-3 rounded-xl transition-colors flex-1 flex justify-center"
 style="background-color: var(--color-paper-2); color: var(--color-accent);"
 title="WhatsApp"
 >
 <Icon icon="solar:phone-calling-rounded-bold" class="w-5 h-5" />
 </button>
 <button 
 @click="shareLink('facebook')"
 class="p-3 rounded-xl transition-colors flex-1 flex justify-center"
 style="background-color: var(--color-paper-2); color: var(--color-accent);"
 title="Facebook"
 >
 <Icon icon="solar:share-circle-bold" class="w-5 h-5" />
 </button>
 <button 
 @click="shareLink('twitter')"
 class="p-3 rounded-xl transition-colors flex-1 flex justify-center"
 style="background-color: var(--color-paper-2); color: var(--color-accent);"
 title="Twitter"
 >
 <Icon icon="solar:globus-bold" class="w-5 h-5" />
 </button>
 <button 
 @click="shareLink('copy')"
 class="p-3 rounded-xl transition-colors flex-1 flex justify-center"
 style="background-color: var(--color-paper-2); color: var(--color-ink-2);"
 title="Copy Link"
 >
 <Icon icon="solar:copy-bold" class="w-5 h-5" />
 </button>
 </div>
 </div>

 <!-- Related items -->
 <div class="space-y-4">
 <h4 class="font-semibold text-sm pb-2" style="color: var(--color-ink); border-bottom: 1px solid var(--color-rule);">Rekomendasi Terkait</h4>
 <div v-if="relatedKajians.length === 0" class="text-xs" style="color: var(--color-ink-2);">
 Tidak ada kajian sejenis yang ditemukan.
 </div>
 <div 
 v-for="rel in relatedKajians" 
 :key="rel.id"
 class="p-4 rounded-xl transition-shadow flex items-start gap-3"
 style="background-color: var(--color-paper); border: 1px solid var(--color-rule);"
 >
 <div class="p-2 rounded-sm shrink-0" style="background-color: var(--color-paper-2); color: var(--color-accent);">
 <Icon icon="solar:document-bold" class="w-5 h-5" />
 </div>
 <div class="min-w-0">
 <h5 class="text-xs font-semibold line-clamp-2 hover:underline" style="color: var(--color-ink);">
 <Link :href="route('portal.detail', rel.slug)">{{ rel.judul }}</Link>
 </h5>
 <span class="text-[9px] mt-1 block" style="color: var(--color-ink-2);">{{ rel.tahun?.tahun }} • {{ rel.bidang?.nama }}</span>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </FrontendLayout>
</template>
