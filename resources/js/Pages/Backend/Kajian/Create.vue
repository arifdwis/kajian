<script setup>
import { ref, computed } from 'vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { useToast } from 'vue-toastification';

const toast = useToast();

const props = defineProps({
 bidangs: Array,
 jenisKajians: Array,
 tahuns: Array,
 keywords: Array,
});

const tahunOptions = computed(() => props.tahuns.map(t => ({ label: t.tahun, value: t.id })));
const bidangOptions = computed(() => props.bidangs.map(b => ({ label: b.nama, value: b.id })));
const jenisOptions = computed(() => props.jenisKajians.map(j => ({ label: j.nama, value: j.id })));

const form = useForm({
 judul: '',
 tahun_id: '',
 bidang_id: '',
 jenis_id: '',
 ringkasan: '',
 tujuan: '',
 latar_belakang: '',
 metodologi: '',
 lokasi: '',
 tanggal: '',
 penanggung_jawab: '',
 koordinator: '',
 mitra: '',
 temuan: '',
 rekomendasi: '',
 implikasi: '',
 status: 'draft',
 keywords: [],
 file_pdf: null,
 file_presentasi: null,
 file_cover: null,
});

const currentStep = ref(1);
const totalSteps = 6;

const steps = [
 { label: 'Informasi Dasar', icon: 'solar:info-square-bold' },
 { label: 'Deskripsi', icon: 'solar:document-text-bold' },
 { label: 'Pelaksanaan', icon: 'solar:users-group-two-rounded-bold' },
 { label: 'Hasil & Rekomendasi', icon: 'solar:diploma-verified-bold' },
 { label: 'Kata Kunci', icon: 'solar:tag-bold' },
 { label: 'Upload Berkas', icon: 'solar:upload-bold' },
];

const stepErrors = ref({});

const validateStep = (step) => {
 stepErrors.value = {};
 if (step === 1) {
  if (!form.judul) stepErrors.value.judul = 'Judul wajib diisi.';
  if (!form.tahun_id) stepErrors.value.tahun_id = 'Tahun wajib dipilih.';
  if (!form.bidang_id) stepErrors.value.bidang_id = 'Bidang wajib dipilih.';
  if (!form.jenis_id) stepErrors.value.jenis_id = 'Jenis kajian wajib dipilih.';
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
 if (step < currentStep.value) {
  currentStep.value = step;
 }
};

const handleFileChange = (e, field) => {
 form[field] = e.target.files[0];
};

const submit = () => {
 form.post(route('kajian.store'), {
 onSuccess: () => {
  toast.success('Kajian berhasil disimpan sebagai draf.');
 },
 onError: (errors) => {
  Object.values(errors).forEach(err => toast.error(err));
 }
 });
};
</script>

<template>
 <Head title="Tambah Kajian Baru" />
 
 <AuthenticatedLayout>
 <div class="space-y-6">
 <!-- Header -->
 <div class="flex items-center justify-between bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700">
  <div class="flex items-center gap-3">
  <Link :href="route('kajian.index')" class="p-2.5 bg-gray-50 dark:bg-gray-700 dark:text-gray-300 hover:bg-paper-2 hover:text-blue-600 rounded-sm transition-all">
  <Icon icon="solar:arrow-left-outline" class="w-5 h-5" />
  </Link>
  <div>
  <h3 class="text-xl font-bold text-gray-900 dark:text-white">Tambah Dokumen Kajian Baru</h3>
  <p class="text-xs text-gray-500 mt-1">Langkah {{ currentStep }} dari {{ totalSteps }}: {{ steps[currentStep - 1].label }}</p>
  </div>
  </div>
 </div>

 <!-- Stepper -->
 <div class="bg-paper dark:bg-gray-800 p-4 rounded-card border border-gray-100 dark:border-gray-700">
  <div class="flex items-center justify-between">
  <template v-for="(step, index) in steps" :key="index">
   <!-- Step circle -->
   <button
   @click="goToStep(index + 1)"
   class="flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-xs font-semibold"
   :class="[
    currentStep === index + 1
    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
    : currentStep > index + 1
    ? 'text-green-600 dark:text-green-400'
    : 'text-gray-400 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700'
   ]"
   >
   <span
    class="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0"
    :class="[
    currentStep === index + 1
     ? 'bg-blue-600 text-white'
     : currentStep > index + 1
     ? 'bg-green-500 text-white'
     : 'bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400'
    ]"
   >
    <Icon v-if="currentStep > index + 1" icon="solar:check-read-bold" class="w-4 h-4" />
    <span v-else>{{ index + 1 }}</span>
   </span>
   <span class="hidden lg:inline">{{ step.label }}</span>
   </button>

   <!-- Connector line -->
   <div
   v-if="index < steps.length - 1"
   class="flex-1 h-0.5 mx-2"
   :class="currentStep > index + 1 ? 'bg-green-400' : 'bg-gray-200 dark:bg-gray-700'"
   />
  </template>
  </div>
 </div>

 <!-- Form -->
 <form @submit.prevent="submit">
  <!-- Step 1: Informasi Dasar -->
  <div v-show="currentStep === 1" class="bg-paper dark:bg-gray-800 p-8 rounded-card border border-gray-100 dark:border-gray-700 space-y-6">
  <h4 class="text-sm font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 pb-3 flex items-center gap-2">
   <Icon icon="solar:info-square-bold" class="w-5 h-5 text-blue-500" />
   Informasi Dasar
  </h4>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
   <div class="md:col-span-3">
   <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Judul Kajian / Penelitian <span class="text-red-500">*</span></label>
   <input type="text" v-model="form.judul" required
    class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5 focus:ring-2 focus:ring-blue-500/20"
    :class="stepErrors.judul ? 'border-red-400' : ''"
    placeholder="Masukkan Judul Kajian Secara Lengkap..." />
   <span v-if="stepErrors.judul" class="text-[11px] text-red-500 mt-1 block">{{ stepErrors.judul }}</span>
   </div>
   <div>
   <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Tahun Kajian <span class="text-red-500">*</span></label>
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

  <!-- Step 2: Deskripsi & Substansi -->
  <div v-show="currentStep === 2" class="bg-paper dark:bg-gray-800 p-8 rounded-card border border-gray-100 dark:border-gray-700 space-y-6">
  <h4 class="text-sm font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 pb-3 flex items-center gap-2">
   <Icon icon="solar:document-text-bold" class="w-5 h-5 text-blue-500" />
   Deskripsi & Substansi Kajian
  </h4>
  <div class="space-y-5">
   <div>
   <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Ringkasan Eksekutif (Abstrak)</label>
   <textarea v-model="form.ringkasan" rows="4"
    class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5 focus:ring-2 focus:ring-blue-500/20"
    placeholder="Tuliskan intisari atau abstrak ringkas..." />
   </div>
   <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
   <div>
    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Tujuan Kajian</label>
    <textarea v-model="form.tujuan" rows="3"
    class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5"
    placeholder="Apa tujuan penelitian ini..." />
   </div>
   <div>
    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Latar Belakang</label>
    <textarea v-model="form.latar_belakang" rows="3"
    class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5"
    placeholder="Masalah/dasar hukum/fenomena yang melatarbelakangi..." />
   </div>
   </div>
   <div>
   <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Metodologi Penelitian</label>
   <textarea v-model="form.metodologi" rows="3"
    class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5"
    placeholder="Metode pengumpulan data, analisis, rancangan riset..." />
   </div>
  </div>
  </div>

  <!-- Step 3: Pelaksanaan & Kemitraan -->
  <div v-show="currentStep === 3" class="bg-paper dark:bg-gray-800 p-8 rounded-card border border-gray-100 dark:border-gray-700 space-y-6">
  <h4 class="text-sm font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 pb-3 flex items-center gap-2">
   <Icon icon="solar:users-group-two-rounded-bold" class="w-5 h-5 text-blue-500" />
   Pelaksanaan & Kemitraan
  </h4>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
   <div>
   <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Lokasi Penelitian</label>
   <input type="text" v-model="form.lokasi"
    class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5"
    placeholder="Kelurahan, Kecamatan, Kota..." />
   </div>
   <div>
   <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Tanggal Publikasi / Selesai</label>
   <input type="date" v-model="form.tanggal"
    class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5" />
   </div>
   <div>
   <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Penanggung Jawab (PJ)</label>
   <input type="text" v-model="form.penanggung_jawab"
    class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5"
    placeholder="Kepala Bidang / PPTK..." />
   </div>
   <div>
   <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Mitra Peneliti / Pihak Ketiga</label>
   <input type="text" v-model="form.mitra"
    class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5"
    placeholder="Universitas Mulawarman, Konsultan..." />
   </div>
  </div>
  </div>

  <!-- Step 4: Hasil & Rekomendasi -->
  <div v-show="currentStep === 4" class="bg-paper dark:bg-gray-800 p-8 rounded-card border border-gray-100 dark:border-gray-700 space-y-6">
  <h4 class="text-sm font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 pb-3 flex items-center gap-2">
   <Icon icon="solar:diploma-verified-bold" class="w-5 h-5 text-blue-500" />
   Hasil & Rekomendasi Kebijakan
  </h4>
  <div class="space-y-5">
   <div>
   <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Temuan Utama</label>
   <textarea v-model="form.temuan" rows="4"
    class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5"
    placeholder="Fakta-fakta penting yang ditemukan selama riset..." />
   </div>
   <div>
   <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Rekomendasi Strategis</label>
   <textarea v-model="form.rekomendasi" rows="4"
    class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5"
    placeholder="Saran kebijakan bagi Pemerintah Kota..." />
   </div>
  </div>
  </div>

  <!-- Step 5: Kata Kunci -->
  <div v-show="currentStep === 5" class="bg-paper dark:bg-gray-800 p-8 rounded-card border border-gray-100 dark:border-gray-700 space-y-6">
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
    <input type="checkbox" :value="kw.id" v-model="form.keywords" class="rounded text-blue-600 focus:ring-blue-500/20" />
    <span class="text-gray-700 dark:text-gray-300 font-medium">{{ kw.nama }}</span>
   </label>
   </div>
  </div>
  </div>

  <!-- Step 6: Upload Berkas -->
  <div v-show="currentStep === 6" class="bg-paper dark:bg-gray-800 p-8 rounded-card border border-gray-100 dark:border-gray-700 space-y-6">
  <h4 class="text-sm font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 pb-3 flex items-center gap-2">
   <Icon icon="solar:upload-bold" class="w-5 h-5 text-blue-500" />
   Upload Berkas Riset
  </h4>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
   <!-- Cover -->
   <div class="p-6 border border-dashed border-gray-200 dark:border-gray-700 rounded-card flex flex-col items-center text-center hover:border-blue-400 hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors">
   <div class="w-14 h-14 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-3">
    <Icon icon="solar:gallery-bold" class="w-7 h-7 text-blue-500" />
   </div>
   <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">Gambar Cover</span>
   <span class="text-[11px] text-gray-400 mt-1">JPG, PNG (Maks 5MB)</span>
   <label class="mt-4 px-4 py-2 text-xs font-semibold rounded-lg border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors">
    <Icon icon="solar:upload-minimalistic-bold" class="w-4 h-4 inline-block mr-1" />Pilih Berkas
   </label>
   <input type="file" class="hidden" @change="handleFileChange($event, 'file_cover')" accept="image/*" />
   <span class="text-[10px] text-gray-400 mt-2" v-if="form.file_cover">{{ form.file_cover.name }}</span>
   <span class="text-[10px] text-gray-300 dark:text-gray-600 mt-2" v-else>Belum ada berkas</span>
   </div>
   <!-- PDF -->
   <div class="p-6 border-2 border-dashed border-red-200 dark:border-red-900/40 rounded-card flex flex-col items-center text-center hover:border-red-400 hover:bg-red-50/30 dark:hover:bg-red-900/10 transition-colors">
   <div class="w-14 h-14 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center mb-3">
    <Icon icon="solar:file-text-bold" class="w-7 h-7 text-red-500" />
   </div>
   <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">Dokumen Utama <span class="text-red-500">*</span></span>
   <span class="text-[11px] text-gray-400 mt-1">PDF Only (Maks 20MB)</span>
   <label class="mt-4 px-4 py-2 text-xs font-semibold rounded-lg border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors">
    <Icon icon="solar:upload-minimalistic-bold" class="w-4 h-4 inline-block mr-1" />Pilih Berkas
   </label>
   <input type="file" class="hidden" @change="handleFileChange($event, 'file_pdf')" accept="application/pdf" />
   <span class="text-[10px] text-gray-400 mt-2" v-if="form.file_pdf">{{ form.file_pdf.name }}</span>
   <span class="text-[10px] text-gray-300 dark:text-gray-600 mt-2" v-else>Belum ada berkas</span>
   </div>
   <!-- PPT -->
   <div class="p-6 border border-dashed border-gray-200 dark:border-gray-700 rounded-card flex flex-col items-center text-center hover:border-amber-400 hover:bg-amber-50/30 dark:hover:bg-amber-900/10 transition-colors">
   <div class="w-14 h-14 rounded-full bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center mb-3">
    <Icon icon="solar:play-bold" class="w-7 h-7 text-amber-500" />
   </div>
   <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">Presentasi / Slide</span>
   <span class="text-[11px] text-gray-400 mt-1">PPT, PPTX, PDF (Maks 20MB)</span>
   <label class="mt-4 px-4 py-2 text-xs font-semibold rounded-lg border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors">
    <Icon icon="solar:upload-minimalistic-bold" class="w-4 h-4 inline-block mr-1" />Pilih Berkas
   </label>
   <input type="file" class="hidden" @change="handleFileChange($event, 'file_presentasi')" accept=".ppt,.pptx,application/pdf" />
   <span class="text-[10px] text-gray-400 mt-2" v-if="form.file_presentasi">{{ form.file_presentasi.name }}</span>
   <span class="text-[10px] text-gray-300 dark:text-gray-600 mt-2" v-else>Belum ada berkas</span>
   </div>
  </div>
  </div>

  <!-- Navigation Buttons -->
  <div class="flex items-center justify-between mt-6">
  <div>
   <Link
   v-if="currentStep === 1"
   :href="route('kajian.index')"
   class="px-5 py-3 border border-gray-200 dark:border-gray-700 rounded-card text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
   >
   Batal
   </Link>
   <button
   v-else
   type="button"
   @click="prevStep"
   class="px-5 py-3 border border-gray-200 dark:border-gray-700 rounded-card text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
   >
   <Icon icon="solar:arrow-left-outline" class="w-4 h-4 inline-block mr-1" />Sebelumnya
   </button>
  </div>
  <div class="flex gap-3">
   <button
   v-if="currentStep < totalSteps"
   type="button"
   @click="nextStep"
   class="px-6 py-3 bg-blue-600 text-white font-bold rounded-card text-sm hover:bg-blue-700 transition-colors inline-flex items-center gap-1"
   >
   Selanjutnya<Icon icon="solar:arrow-right-outline" class="w-4 h-4" />
   </button>
   <button
   v-else
   type="submit"
   :disabled="form.processing"
   class="px-6 py-3 bg-accent text-accent-ink font-bold rounded-card transition-colors text-sm disabled:opacity-50 inline-flex items-center gap-2"
   >
   <Icon v-if="form.processing" icon="svg-spinners:ring-resize" class="w-5 h-5 animate-spin" />
   <span>Simpan Kajian</span>
   </button>
  </div>
  </div>
 </form>
 </div>
 </AuthenticatedLayout>
</template>
