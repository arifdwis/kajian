<script setup>
import { ref, computed, onMounted } from 'vue';
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
 if (props.kajian.keywords) {
  form.keywords = props.kajian.keywords.map(kw => kw.id);
 }
});

const currentStep = ref(1);
const totalSteps = 7;
const stepErrors = ref({});

const steps = [
 { label: 'Informasi Dasar', icon: 'solar:info-square-bold' },
 { label: 'Deskripsi', icon: 'solar:document-text-bold' },
 { label: 'Pelaksanaan', icon: 'solar:users-group-two-rounded-bold' },
 { label: 'Hasil & Rekomendasi', icon: 'solar:diploma-verified-bold' },
 { label: 'Kata Kunci', icon: 'solar:tag-bold' },
 { label: 'Upload Berkas', icon: 'solar:upload-bold' },
 { label: 'Catatan Perubahan', icon: 'solar:history-bold' },
];

const validateStep = (step) => {
 stepErrors.value = {};
 if (step === 1) {
  if (!form.judul) stepErrors.value.judul = 'Judul wajib diisi.';
  if (!form.tahun_id) stepErrors.value.tahun_id = 'Tahun wajib dipilih.';
  if (!form.bidang_id) stepErrors.value.bidang_id = 'Bidang wajib dipilih.';
  if (!form.jenis_id) stepErrors.value.jenis_id = 'Jenis kajian wajib dipilih.';
 }
 if (step === 7) {
  if (!form.changes_summary) stepErrors.value.changes_summary = 'Ringkasan perubahan wajib diisi.';
 }
 return Object.keys(stepErrors.value).length === 0;
};

const nextStep = () => {
 if (!validateStep(currentStep.value)) {
  toast.warning('Harap lengkapi field yang wajib diisi.');
  return;
 }
 if (currentStep.value < totalSteps) currentStep.value++;
};

const prevStep = () => {
 if (currentStep.value > 1) currentStep.value--;
};

const goToStep = (step) => {
 if (step < currentStep.value) currentStep.value = step;
};

const handleFileChange = (e, field) => {
 form[field] = e.target.files[0];
};

const getFileUrl = (type) => {
 if (!props.kajian.files) return null;
 const file = props.kajian.files.find(f => f.tipe === type);
 return file ? `/storage/${file.file_path}` : null;
};

const submit = () => {
 form.post(route('kajian.update', props.kajian.uuid), {
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
 <div class="space-y-4">
  <!-- Header -->
  <div class="bg-paper dark:bg-gray-800 p-5 rounded-card border border-gray-100 dark:border-gray-700">
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
   <div class="flex items-center gap-3">
   <Link :href="route('kajian.show', kajian.uuid)" class="p-2 bg-gray-50 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-sm transition-all">
    <Icon icon="solar:arrow-left-outline" class="w-5 h-5" />
   </Link>
   <div>
    <h3 class="text-lg font-bold text-gray-900 dark:text-white">Edit: {{ kajian.judul }}</h3>
    <p class="text-[11px] text-gray-500 mt-0.5">Langkah {{ currentStep }} dari {{ totalSteps }}: {{ steps[currentStep - 1].label }}</p>
   </div>
   </div>
  </div>
  <!-- Stepper -->
  <div class="flex items-center justify-between mt-4">
   <template v-for="(step, index) in steps" :key="index">
   <button @click="goToStep(index + 1)" class="flex items-center gap-1.5 px-2 py-1.5 rounded-lg transition-all text-[11px] font-semibold" :class="currentStep === index + 1 ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : currentStep > index + 1 ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700'">
    <span class="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0" :class="currentStep === index + 1 ? 'bg-blue-600 text-white' : currentStep > index + 1 ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400'">
    <Icon v-if="currentStep > index + 1" icon="solar:check-read-bold" class="w-3 h-3" />
    <span v-else>{{ index + 1 }}</span>
    </span>
    <span class="hidden xl:inline">{{ step.label }}</span>
   </button>
   <div v-if="index < steps.length - 1" class="flex-1 h-0.5 mx-1" :class="currentStep > index + 1 ? 'bg-green-400' : 'bg-gray-200 dark:bg-gray-700'" />
   </template>
  </div>
  </div>

  <!-- Form -->
  <form @submit.prevent="submit">
  <!-- Step 1 -->
  <div v-show="currentStep === 1" class="bg-paper dark:bg-gray-800 p-8 rounded-card border border-gray-100 dark:border-gray-700 space-y-6">
   <h4 class="text-sm font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 pb-3 flex items-center gap-2"><Icon icon="solar:info-square-bold" class="w-5 h-5 text-blue-500" /> Informasi Dasar</h4>
   <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
   <div class="md:col-span-3">
    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Judul Kajian <span class="text-red-500">*</span></label>
    <input type="text" v-model="form.judul" required class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5 focus:ring-2 focus:ring-blue-500/20" :class="stepErrors.judul ? 'border-red-400' : ''" />
    <span v-if="stepErrors.judul" class="text-[11px] text-red-500 mt-1 block">{{ stepErrors.judul }}</span>
   </div>
   <div>
    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Tahun <span class="text-red-500">*</span></label>
    <SearchSelect v-model="form.tahun_id" :options="tahunOptions" placeholder="Pilih Tahun" :required="true" />
    <span v-if="stepErrors.tahun_id" class="text-[11px] text-red-500 mt-1 block">{{ stepErrors.tahun_id }}</span>
   </div>
   <div>
    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Bidang <span class="text-red-500">*</span></label>
    <SearchSelect v-model="form.bidang_id" :options="bidangOptions" placeholder="Pilih Bidang" :required="true" />
    <span v-if="stepErrors.bidang_id" class="text-[11px] text-red-500 mt-1 block">{{ stepErrors.bidang_id }}</span>
   </div>
   <div>
    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Jenis Kajian <span class="text-red-500">*</span></label>
    <SearchSelect v-model="form.jenis_id" :options="jenisOptions" placeholder="Pilih Jenis" :required="true" />
    <span v-if="stepErrors.jenis_id" class="text-[11px] text-red-500 mt-1 block">{{ stepErrors.jenis_id }}</span>
   </div>
   </div>
  </div>

  <!-- Step 2 -->
  <div v-show="currentStep === 2" class="bg-paper dark:bg-gray-800 p-8 rounded-card border border-gray-100 dark:border-gray-700 space-y-6">
   <h4 class="text-sm font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 pb-3 flex items-center gap-2"><Icon icon="solar:document-text-bold" class="w-5 h-5 text-blue-500" /> Deskripsi & Substansi</h4>
   <div class="space-y-5">
   <div><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Ringkasan Eksekutif</label><textarea v-model="form.ringkasan" rows="4" class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5 focus:ring-2 focus:ring-blue-500/20" /></div>
   <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
    <div><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Tujuan Kajian</label><textarea v-model="form.tujuan" rows="3" class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5" /></div>
    <div><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Latar Belakang</label><textarea v-model="form.latar_belakang" rows="3" class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5" /></div>
   </div>
   <div><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Metodologi</label><textarea v-model="form.metodologi" rows="3" class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5" /></div>
   </div>
  </div>

  <!-- Step 3 -->
  <div v-show="currentStep === 3" class="bg-paper dark:bg-gray-800 p-8 rounded-card border border-gray-100 dark:border-gray-700 space-y-6">
   <h4 class="text-sm font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 pb-3 flex items-center gap-2"><Icon icon="solar:users-group-two-rounded-bold" class="w-5 h-5 text-blue-500" /> Pelaksanaan & Kemitraan</h4>
   <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
   <div><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Lokasi</label><input type="text" v-model="form.lokasi" class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5" /></div>
   <div><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Tanggal</label><input type="date" v-model="form.tanggal" class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5" /></div>
   <div><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Penanggung Jawab</label><input type="text" v-model="form.penanggung_jawab" class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5" /></div>
   <div><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Mitra</label><input type="text" v-model="form.mitra" class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5" /></div>
   </div>
  </div>

  <!-- Step 4 -->
  <div v-show="currentStep === 4" class="bg-paper dark:bg-gray-800 p-8 rounded-card border border-gray-100 dark:border-gray-700 space-y-6">
   <h4 class="text-sm font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 pb-3 flex items-center gap-2"><Icon icon="solar:diploma-verified-bold" class="w-5 h-5 text-blue-500" /> Hasil & Rekomendasi</h4>
   <div class="space-y-5">
   <div><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Temuan Utama</label><textarea v-model="form.temuan" rows="4" class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5" /></div>
   <div><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Rekomendasi Strategis</label><textarea v-model="form.rekomendasi" rows="4" class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5" /></div>
   </div>
  </div>

  <!-- Step 5 -->
  <div v-show="currentStep === 5" class="bg-paper dark:bg-gray-800 p-8 rounded-card border border-gray-100 dark:border-gray-700 space-y-6">
   <h4 class="text-sm font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 pb-3 flex items-center gap-2"><Icon icon="solar:tag-bold" class="w-5 h-5 text-blue-500" /> Kata Kunci</h4>
   <div class="flex flex-wrap gap-2">
   <label v-for="kw in keywords" :key="kw.id" class="inline-flex items-center gap-1.5 px-2 py-1 rounded text-[11px] border cursor-pointer select-none transition-colors" :class="form.keywords.includes(kw.id) ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300' : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-700 text-gray-500 dark:text-gray-400'">
    <input type="checkbox" :value="kw.id" v-model="form.keywords" class="sr-only" />
    <span class="w-3 h-3 rounded-sm border flex items-center justify-center shrink-0" :class="form.keywords.includes(kw.id) ? 'bg-blue-500 border-blue-500' : 'border-gray-300 dark:border-gray-600'"><Icon v-if="form.keywords.includes(kw.id)" icon="solar:check-read-bold" class="w-2.5 h-2.5 text-white" /></span>
    <span class="font-medium">{{ kw.nama }}</span>
   </label>
   </div>
  </div>

  <!-- Step 6 -->
  <div v-show="currentStep === 6" class="bg-paper dark:bg-gray-800 p-8 rounded-card border border-gray-100 dark:border-gray-700 space-y-6">
   <h4 class="text-sm font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 pb-3 flex items-center gap-2"><Icon icon="solar:upload-bold" class="w-5 h-5 text-blue-500" /> Upload Berkas <span class="text-[10px] font-normal normal-case tracking-normal text-gray-400">(Kosongkan jika tidak diubah)</span></h4>
   <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
   <div class="p-6 border border-dashed border-gray-200 dark:border-gray-700 rounded-card flex flex-col items-center text-center hover:border-blue-400 hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors">
    <div class="w-14 h-14 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-3"><Icon icon="solar:gallery-bold" class="w-7 h-7 text-blue-500" /></div>
    <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">Gambar Cover</span>
    <span class="text-[11px] text-gray-400 mt-1">JPG, PNG (Maks 5MB)</span>
    <a v-if="getFileUrl('cover')" :href="getFileUrl('cover')" target="_blank" class="text-[10px] text-blue-500 font-semibold underline mt-2">Lihat File Aktif</a>
    <label class="mt-3 px-4 py-2 text-xs font-semibold rounded-lg border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"><Icon icon="solar:upload-minimalistic-bold" class="w-4 h-4 inline-block mr-1" />Pilih Berkas</label>
    <input type="file" class="hidden" @change="handleFileChange($event, 'file_cover')" accept="image/*" />
    <span class="text-[10px] text-gray-400 mt-2" v-if="form.file_cover">{{ form.file_cover.name }}</span>
    <span class="text-[10px] text-gray-300 dark:text-gray-600 mt-2" v-else>Belum ada berkas baru</span>
   </div>
   <div class="p-6 border-2 border-dashed border-red-200 dark:border-red-900/40 rounded-card flex flex-col items-center text-center hover:border-red-400 hover:bg-red-50/30 dark:hover:bg-red-900/10 transition-colors">
    <div class="w-14 h-14 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center mb-3"><Icon icon="solar:file-text-bold" class="w-7 h-7 text-red-500" /></div>
    <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">Dokumen Utama</span>
    <span class="text-[11px] text-gray-400 mt-1">PDF Only (Maks 20MB)</span>
    <a v-if="getFileUrl('pdf')" :href="getFileUrl('pdf')" target="_blank" class="text-[10px] text-blue-500 font-semibold underline mt-2">Lihat File Aktif</a>
    <label class="mt-3 px-4 py-2 text-xs font-semibold rounded-lg border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"><Icon icon="solar:upload-minimalistic-bold" class="w-4 h-4 inline-block mr-1" />Pilih Berkas</label>
    <input type="file" class="hidden" @change="handleFileChange($event, 'file_pdf')" accept="application/pdf" />
    <span class="text-[10px] text-gray-400 mt-2" v-if="form.file_pdf">{{ form.file_pdf.name }}</span>
    <span class="text-[10px] text-gray-300 dark:text-gray-600 mt-2" v-else>Belum ada berkas baru</span>
   </div>
   <div class="p-6 border border-dashed border-gray-200 dark:border-gray-700 rounded-card flex flex-col items-center text-center hover:border-amber-400 hover:bg-amber-50/30 dark:hover:bg-amber-900/10 transition-colors">
    <div class="w-14 h-14 rounded-full bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center mb-3"><Icon icon="solar:play-bold" class="w-7 h-7 text-amber-500" /></div>
    <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">Presentasi / Slide</span>
    <span class="text-[11px] text-gray-400 mt-1">PPT, PPTX, PDF (Maks 20MB)</span>
    <a v-if="getFileUrl('presentasi')" :href="getFileUrl('presentasi')" target="_blank" class="text-[10px] text-blue-500 font-semibold underline mt-2">Lihat File Aktif</a>
    <label class="mt-3 px-4 py-2 text-xs font-semibold rounded-lg border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"><Icon icon="solar:upload-minimalistic-bold" class="w-4 h-4 inline-block mr-1" />Pilih Berkas</label>
    <input type="file" class="hidden" @change="handleFileChange($event, 'file_presentasi')" accept=".ppt,.pptx,application/pdf" />
    <span class="text-[10px] text-gray-400 mt-2" v-if="form.file_presentasi">{{ form.file_presentasi.name }}</span>
    <span class="text-[10px] text-gray-300 dark:text-gray-600 mt-2" v-else>Belum ada berkas baru</span>
   </div>
   </div>
  </div>

  <!-- Step 7 -->
  <div v-show="currentStep === 7" class="bg-paper dark:bg-gray-800 p-8 rounded-card border border-gray-100 dark:border-gray-700 space-y-6">
   <h4 class="text-sm font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 pb-3 flex items-center gap-2"><Icon icon="solar:history-bold" class="w-5 h-5 text-blue-500" /> Catatan Perubahan</h4>
   <div>
   <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Ringkasan Perubahan <span class="text-red-500">*</span></label>
   <input type="text" v-model="form.changes_summary" required class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5 focus:ring-2 focus:ring-blue-500/20" :class="stepErrors.changes_summary ? 'border-red-400' : ''" placeholder="Contoh: Mengoreksi temuan utama, Memperbarui berkas presentasi..." />
   <span v-if="stepErrors.changes_summary" class="text-[11px] text-red-500 mt-1 block">{{ stepErrors.changes_summary }}</span>
   </div>
  </div>

  <!-- Navigation -->
  <div class="flex items-center justify-between mt-4">
   <div>
   <Link v-if="currentStep === 1" :href="route('kajian.show', kajian.uuid)" class="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-card text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Batal</Link>
   <button v-else type="button" @click="prevStep" class="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-card text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"><Icon icon="solar:arrow-left-outline" class="w-4 h-4 inline-block mr-1" />Sebelumnya</button>
   </div>
   <div class="flex gap-2">
   <button v-if="currentStep < totalSteps" type="button" @click="nextStep" class="px-5 py-2 bg-blue-600 text-white font-bold rounded-card text-sm hover:bg-blue-700 transition-colors inline-flex items-center gap-1">Selanjutnya<Icon icon="solar:arrow-right-outline" class="w-4 h-4" /></button>
   <button v-else type="submit" :disabled="form.processing" class="px-5 py-2 bg-accent text-accent-ink font-bold rounded-card text-sm disabled:opacity-50 inline-flex items-center gap-2"><Icon v-if="form.processing" icon="svg-spinners:ring-resize" class="w-4 h-4 animate-spin" /><Icon v-else icon="solar:disk-bold" class="w-4 h-4" />Simpan Perubahan</button>
   </div>
  </div>
  </form>
 </div>
 </AuthenticatedLayout>
</template>
