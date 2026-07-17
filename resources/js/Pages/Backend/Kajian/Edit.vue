<script setup>
import { computed, onMounted } from 'vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { useToast } from 'vue-toastification';

const toast = useToast();

const props = defineProps({
 kajian: Object,
 bidangs: Array,
 jenisKajians: Array,
 tahuns: Array,
 keywords: Array,
});

const tahunOptions = computed(() => props.tahuns.map(t => ({ label: t.tahun, value: t.id })));
const bidangOptions = computed(() => props.bidangs.map(b => ({ label: b.nama, value: b.id })));
const jenisOptions = computed(() => props.jenisKajians.map(j => ({ label: j.nama, value: j.id })));

const form = useForm({
 _method: 'PUT',
 judul: props.kajian.judul || '',
 tahun_id: props.kajian.tahun_id || '',
 bidang_id: props.kajian.bidang_id || '',
 jenis_id: props.kajian.jenis_id || '',
 ringkasan: props.kajian.ringkasan || '',
 tujuan: props.kajian.tujuan || '',
 latar_belakang: props.kajian.latar_belakang || '',
 metodologi: props.kajian.metodologi || '',
 lokasi: props.kajian.lokasi || '',
 tanggal: props.kajian.tanggal ? props.kajian.tanggal.substring(0, 10) : '',
 penanggung_jawab: props.kajian.penanggung_jawab || '',
 koordinator: props.kajian.koordinator || '',
 mitra: props.kajian.mitra || '',
 temuan: props.kajian.temuan || '',
 rekomendasi: props.kajian.rekomendasi || '',
 implikasi: props.kajian.implikasi || '',
 status: props.kajian.status || 'draft',
 keywords: [],
 file_pdf: null,
 file_presentasi: null,
 file_cover: null,
 changes_summary: '',
});

onMounted(() => {
 // Fill keywords
 if (props.kajian.keywords) {
 form.keywords = props.kajian.keywords.map(kw => kw.id);
 }
});

const handleFileChange = (e, field) => {
 form[field] = e.target.files[0];
};

const getFileUrl = (type) => {
 if (!props.kajian.files) return null;
 const file = props.kajian.files.find(f => f.tipe === type);
 return file ? `/storage/${file.path}` : null;
};

const submit = () => {
 // Use POST to allow file uploads with spoofed PUT method
 form.post(route('kajian.update', props.kajian.id), {
 onSuccess: () => {
 toast.success('Kajian berhasil diperbarui.');
 },
 onError: (errors) => {
 Object.values(errors).forEach(err => toast.error(err));
 }
 });
};
</script>

<template>
 <Head title="Edit Kajian" />
 
 <AuthenticatedLayout>
 <div class="space-y-6">
 <!-- Header section -->
 <div class="flex items-center justify-between bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700 ">
 <div class="flex items-center gap-3">
 <Link :href="route('kajian.show', kajian.id)" class="p-2.5 bg-gray-50 dark:bg-gray-700 dark:text-gray-300 hover:bg-paper-2 hover:text-blue-600 rounded-sm transition-all">
 <Icon icon="solar:arrow-left-outline" class="w-5 h-5" />
 </Link>
 <div>
 <h3 class="text-xl font-bold text-gray-900 dark:text-white">Edit Dokumen Kajian</h3>
 <p class="text-xs text-gray-500 mt-1">Perbarui rincian riset dan ubah berkas lampiran.</p>
 </div>
 </div>
 </div>

 <!-- Form -->
 <form @submit.prevent="submit" class="space-y-6">
 <!-- Section 1: Informasi Dasar -->
 <div class="bg-paper dark:bg-gray-800 p-8 rounded-card border border-gray-100 dark:border-gray-700 space-y-6">
 <h4 class="text-sm font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 pb-3 flex items-center gap-2">
 <Icon icon="solar:info-square-bold" class="w-5 h-5 text-blue-500" />
 Informasi Dasar
 </h4>

 <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
 <div class="md:col-span-3">
 <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Judul Kajian / Penelitian <span class="text-red-500">*</span></label>
 <input 
 type="text" 
 v-model="form.judul" 
 required
 class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5 focus:ring-2 focus:ring-blue-500/20"
 />
 </div>

 <div>
 <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Tahun Kajian <span class="text-red-500">*</span></label>
 <SearchSelect
 v-model="form.tahun_id"
 :options="tahunOptions"
 placeholder="Pilih Tahun"
 :required="true"
 />
 </div>

 <div>
  <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Bidang <span class="text-red-500">*</span></label>
 <SearchSelect
 v-model="form.bidang_id"
 :options="bidangOptions"
 placeholder="Pilih Bidang"
 :required="true"
 />
 </div>

 <div>
 <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Jenis Kajian <span class="text-red-500">*</span></label>
 <SearchSelect
 v-model="form.jenis_id"
 :options="jenisOptions"
 placeholder="Pilih Jenis"
 :required="true"
 />
 </div>
 </div>
 </div>

 <!-- Section 2: Deskripsi & Substansi -->
 <div class="bg-paper dark:bg-gray-800 p-8 rounded-card border border-gray-100 dark:border-gray-700 space-y-6">
 <h4 class="text-sm font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 pb-3 flex items-center gap-2">
 <Icon icon="solar:document-text-bold" class="w-5 h-5 text-blue-500" />
 Deskripsi & Substansi Kajian
 </h4>

 <div class="space-y-5">
 <div>
 <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Ringkasan Eksekutif (Abstrak)</label>
 <textarea 
 v-model="form.ringkasan" 
 rows="4"
 class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5 focus:ring-2 focus:ring-blue-500/20"
 ></textarea>
 </div>

 <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
 <div>
 <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Tujuan Kajian</label>
 <textarea 
 v-model="form.tujuan" 
 rows="3"
 class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5"
 ></textarea>
 </div>
 <div>
 <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Latar Belakang</label>
 <textarea 
 v-model="form.latar_belakang" 
 rows="3"
 class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5"
 ></textarea>
 </div>
 </div>

 <div>
 <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Metodologi Penelitian</label>
 <textarea 
 v-model="form.metodologi" 
 rows="3"
 class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5"
 ></textarea>
 </div>
 </div>
 </div>

 <!-- Section 3: Pelaksanaan & Kemitraan -->
 <div class="bg-paper dark:bg-gray-800 p-8 rounded-card border border-gray-100 dark:border-gray-700 space-y-6">
 <h4 class="text-sm font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 pb-3 flex items-center gap-2">
 <Icon icon="solar:users-group-two-rounded-bold" class="w-5 h-5 text-blue-500" />
 Pelaksanaan & Kemitraan
 </h4>

 <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
 <div>
 <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Lokasi Penelitian</label>
 <input 
 type="text" 
 v-model="form.lokasi" 
 class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5"
 />
 </div>
 <div>
 <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Tanggal Publikasi / Selesai</label>
 <input 
 type="date" 
 v-model="form.tanggal" 
 class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5"
 />
 </div>
 <div>
 <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Penanggung Jawab (PJ)</label>
 <input 
 type="text" 
 v-model="form.penanggung_jawab" 
 class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5"
 />
 </div>
 <div>
 <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Mitra Peneliti / Pihak Ketiga</label>
 <input 
 type="text" 
 v-model="form.mitra" 
 class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5"
 />
 </div>
 </div>
 </div>

 <!-- Section 4: Hasil & Kesimpulan -->
 <div class="bg-paper dark:bg-gray-800 p-8 rounded-card border border-gray-100 dark:border-gray-700 space-y-6">
 <h4 class="text-sm font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 pb-3 flex items-center gap-2">
 <Icon icon="solar:diploma-verified-bold" class="w-5 h-5 text-blue-500" />
 Hasil & Rekomendasi Kebijakan
 </h4>

 <div class="space-y-5">
 <div>
 <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Temuan Utama</label>
 <textarea 
 v-model="form.temuan" 
 rows="3"
 class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5"
 ></textarea>
 </div>
 <div>
 <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Rekomendasi Strategis</label>
 <textarea 
 v-model="form.rekomendasi" 
 rows="3"
 class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5"
 ></textarea>
 </div>
 </div>
 </div>

 <!-- Section 5: Kata Kunci (Keywords) -->
 <div class="bg-paper dark:bg-gray-800 p-8 rounded-card border border-gray-100 dark:border-gray-700 space-y-6">
 <h4 class="text-sm font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 pb-3 flex items-center gap-2">
 <Icon icon="solar:tag-bold" class="w-5 h-5 text-blue-500" />
 Tagging Kata Kunci
 </h4>
 
 <div>
 <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Pilih Kata Kunci Relevan</label>
 <div class="flex flex-wrap gap-3">
 <label 
 v-for="kw in keywords" 
 :key="kw.id" 
 class="inline-flex items-center gap-2 px-3 py-1.5 border border-gray-200 dark:border-gray-700 rounded-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 select-none text-xs"
 >
 <input 
 type="checkbox" 
 :value="kw.id" 
 v-model="form.keywords" 
 class="rounded text-blue-600 focus:ring-blue-500/20"
 />
 <span class="text-gray-700 dark:text-gray-300 font-medium">{{ kw.nama }}</span>
 </label>
 </div>
 </div>
 </div>

 <!-- Section 6: Upload Berkas -->
 <div class="bg-paper dark:bg-gray-800 p-8 rounded-card border border-gray-100 dark:border-gray-700 space-y-6">
 <h4 class="text-sm font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 pb-3 flex items-center gap-2">
 <Icon icon="solar:upload-bold" class="w-5 h-5 text-blue-500" />
 Upload Berkas Riset
 <span class="text-[10px] font-normal normal-case tracking-normal text-gray-400">(Biarkan kosong jika tidak ingin mengubah)</span>
 </h4>

 <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
 <!-- Cover Image -->
 <div class="p-6 border border-dashed border-gray-200 dark:border-gray-700 rounded-card flex flex-col items-center text-center hover:border-blue-400 hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors">
 <div class="w-14 h-14 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-3">
 <Icon icon="solar:gallery-bold" class="w-7 h-7 text-blue-500" />
 </div>
 <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">Gambar Cover</span>
 <span class="text-[11px] text-gray-400 mt-1">JPG, PNG (Maks 5MB)</span>
 <a v-if="getFileUrl('cover')" :href="getFileUrl('cover')" target="_blank" class="text-[10px] text-blue-500 font-semibold underline mt-2">Lihat File Aktif</a>
 <label class="mt-3 px-4 py-2 text-xs font-semibold rounded-lg border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors">
 <Icon icon="solar:upload-minimalistic-bold" class="w-4 h-4 inline-block mr-1" />
 Pilih Berkas
 </label>
 <input type="file" class="hidden" @change="handleFileChange($event, 'file_cover')" accept="image/*" />
 <span class="text-[10px] text-gray-400 mt-2" v-if="form.file_cover">{{ form.file_cover.name }}</span>
 <span class="text-[10px] text-gray-300 dark:text-gray-600 mt-2" v-else>Belum ada berkas baru</span>
 </div>

 <!-- PDF Laporan Utama -->
 <div class="p-6 border-2 border-dashed border-red-200 dark:border-red-900/40 rounded-card flex flex-col items-center text-center hover:border-red-400 hover:bg-red-50/30 dark:hover:bg-red-900/10 transition-colors">
 <div class="w-14 h-14 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center mb-3">
 <Icon icon="solar:file-text-bold" class="w-7 h-7 text-red-500" />
 </div>
 <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">Dokumen Utama</span>
 <span class="text-[11px] text-gray-400 mt-1">PDF Only (Maks 20MB)</span>
 <a v-if="getFileUrl('pdf')" :href="getFileUrl('pdf')" target="_blank" class="text-[10px] text-blue-500 font-semibold underline mt-2">Lihat File Aktif</a>
 <label class="mt-3 px-4 py-2 text-xs font-semibold rounded-lg border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors">
 <Icon icon="solar:upload-minimalistic-bold" class="w-4 h-4 inline-block mr-1" />
 Pilih Berkas
 </label>
 <input type="file" class="hidden" @change="handleFileChange($event, 'file_pdf')" accept="application/pdf" />
 <span class="text-[10px] text-gray-400 mt-2" v-if="form.file_pdf">{{ form.file_pdf.name }}</span>
 <span class="text-[10px] text-gray-300 dark:text-gray-600 mt-2" v-else>Belum ada berkas baru</span>
 </div>

 <!-- PPT Bahan Tayang -->
 <div class="p-6 border border-dashed border-gray-200 dark:border-gray-700 rounded-card flex flex-col items-center text-center hover:border-amber-400 hover:bg-amber-50/30 dark:hover:bg-amber-900/10 transition-colors">
 <div class="w-14 h-14 rounded-full bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center mb-3">
 <Icon icon="solar:play-bold" class="w-7 h-7 text-amber-500" />
 </div>
 <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">Presentasi / Slide</span>
 <span class="text-[11px] text-gray-400 mt-1">PPT, PPTX, PDF (Maks 20MB)</span>
 <a v-if="getFileUrl('presentasi')" :href="getFileUrl('presentasi')" target="_blank" class="text-[10px] text-blue-500 font-semibold underline mt-2">Lihat File Aktif</a>
 <label class="mt-3 px-4 py-2 text-xs font-semibold rounded-lg border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors">
 <Icon icon="solar:upload-minimalistic-bold" class="w-4 h-4 inline-block mr-1" />
 Pilih Berkas
 </label>
 <input type="file" class="hidden" @change="handleFileChange($event, 'file_presentasi')" accept=".ppt,.pptx,application/pdf" />
 <span class="text-[10px] text-gray-400 mt-2" v-if="form.file_presentasi">{{ form.file_presentasi.name }}</span>
 <span class="text-[10px] text-gray-300 dark:text-gray-600 mt-2" v-else>Belum ada berkas baru</span>
 </div>
 </div>
 </div>

 <!-- Section 7: Version Control Diff Summary -->
 <div class="bg-paper dark:bg-gray-800 p-8 rounded-card border border-gray-100 dark:border-gray-700 space-y-6">
 <h4 class="text-sm font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 pb-3 flex items-center gap-2">
 <Icon icon="solar:history-bold" class="w-5 h-5 text-blue-500" />
 Catatan Perubahan (Version Control)
 </h4>

 <div>
 <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Ringkasan Perubahan <span class="text-red-500">*</span></label>
 <input 
 type="text" 
 v-model="form.changes_summary" 
 required
 class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5 focus:ring-2 focus:ring-blue-500/20"
 placeholder="Contoh: Mengoreksi temuan utama, Memperbarui berkas presentasi..."
 />
 </div>
 </div>

 <!-- Submit / Buttons -->
 <div class="flex items-center justify-end gap-3">
 <Link 
 :href="route('kajian.show', kajian.id)"
 class="px-5 py-3 border border-gray-200 dark:border-gray-700 rounded-card text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
 >
 Batal
 </Link>
 <button 
 type="submit"
 :disabled="form.processing"
 class="px-6 py-3 bg-accent text-accent-ink font-bold rounded-card transition-colors text-sm disabled:opacity-50 inline-flex items-center gap-2"
 >
 <Icon v-if="form.processing" icon="svg-spinners:ring-resize" class="w-5 h-5 animate-spin" />
 <span>Simpan Perubahan</span>
 </button>
 </div>
 </form>
 </div>
 </AuthenticatedLayout>
</template>
