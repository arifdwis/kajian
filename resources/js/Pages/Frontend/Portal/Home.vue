<!-- Hallmark · genre: modern-minimal (civic) · macrostructure: Government Portal (search-first) · theme: Samarinda civic green · design-system: design.md · designed-as-app -->
<script setup>
import { ref } from 'vue';
import { Head, Link, router } from '@inertiajs/vue3';
import FrontendLayout from '@/Layouts/FrontendLayout.vue';

const props = defineProps({
  summary: Object,
  recentKajians: Array,
  popularKajians: Array,
  bidangs: Array,
  jenisKajians: Array,
  tahuns: Array,
});

const searchQuery = ref('');

const search = (term) => {
  const query = term || searchQuery.value;
  if (!query) return;
  router.get(route('portal.search'), { q: query });
};
</script>

<template>
  <Head title="Beranda Kajian & Riset" />
  
  <FrontendLayout>
    <!-- Hero Section -->
    <section style="background-color: var(--color-paper);" class="relative overflow-hidden">
      <!-- Background Blueprint Pattern -->
      <div class="absolute right-0 top-0 w-1/3 h-full pointer-events-none opacity-[0.04] dark:opacity-[0.02] overflow-hidden hidden lg:block">
        <svg class="w-full h-full" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="0.3">
          <circle cx="50" cy="50" r="40" stroke-dasharray="2 2" />
          <circle cx="50" cy="50" r="28" />
          <line x1="10" y1="50" x2="90" y2="50" />
          <line x1="50" y1="10" x2="50" y2="90" />
          <polygon points="50,15 85,50 50,85 15,50" stroke-dasharray="1 1" />
          <ellipse cx="50" cy="50" rx="38" ry="12" transform="rotate(30, 50, 50)" />
          <ellipse cx="50" cy="50" rx="38" ry="12" transform="rotate(-30, 50, 50)" />
        </svg>
      </div>

      <div class="container mx-auto px-4 xl:px-0 pt-20 pb-20 md:pt-28 md:pb-24">
        <!-- Badges Header -->
        <div class="flex flex-wrap items-center gap-3 mb-6">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase border" style="background-color: var(--color-paper-2); border-color: var(--color-rule); color: var(--color-ink);">
            <Icon icon="solar:globus-bold-duotone" class="w-4 h-4 text-emerald-600 dark:text-emerald-450" />
            <span>Portal Kajian &amp; Riset Pembangunan Kota Samarinda</span>
          </div>

          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase border" style="color: var(--color-ink-2); border-color: var(--color-rule); background-color: var(--color-paper);">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>LIVE &middot; <strong style="color: var(--color-accent);">{{ summary.total_published || 0 }}</strong> DOKUMEN TERBIT</span>
          </div>
        </div>

        <!-- Hero Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          <!-- Left Column -->
          <div class="lg:col-span-3">
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.08] tracking-tight" style="font-family: var(--font-display); color: var(--color-ink); letter-spacing: -0.03em;">
              Akses Riset &amp; <br/>
              <span style="color: var(--color-accent);">Kajian Daerah</span>
            </h1>
            
            <p class="mt-5 text-base sm:text-lg leading-relaxed max-w-lg" style="color: var(--color-ink-2);">
              Telusuri naskah akademis, rencana penelitian strategis, dan rekomendasi kebijakan daerah untuk transparansi dan perumusan keputusan berbasis bukti.
            </p>

            <!-- Search Form -->
            <div class="mt-8">
              <form @submit.prevent="search()" class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-1.5 rounded-xl border transition-all shadow-sm focus-within:shadow-md" style="border-color: var(--color-rule); background-color: var(--color-paper-2); max-width: 30rem;">
                <div class="flex-1 flex items-center gap-3 px-3 py-2 sm:py-0">
                  <Icon icon="solar:magnifer-linear" class="w-5 h-5 shrink-0" style="color: var(--color-ink-2);" />
                  <input 
                    type="text" 
                    v-model="searchQuery" 
                    placeholder="Cari judul kajian, abstrak, kata kunci..." 
                    class="w-full bg-transparent border-0 focus:ring-0 text-sm p-0" 
                    style="color: var(--color-ink);" 
                  />
                </div>
                <button 
                  type="submit" 
                  class="px-6 py-3 text-xs font-bold uppercase tracking-wider rounded-lg transition-all shrink-0 active:scale-[0.98]" 
                  style="background-color: var(--color-accent); color: var(--color-accent-ink);"
                >
                  Cari Kajian
                </button>
              </form>

              <!-- Quick Search Chips -->
              <div class="flex flex-wrap items-center gap-2 mt-4 text-xs" style="color: var(--color-ink-2);">
                <span class="font-medium text-[11px] uppercase tracking-wider" style="color: var(--color-ink-2);">Populer:</span>
                <button 
                  v-for="chip in ['Infrastruktur', 'Ekonomi', 'Perikanan', 'Kebijakan Publik']" 
                  :key="chip"
                  @click="search(chip)"
                  class="px-2.5 py-1 rounded-full border text-[11px] transition-colors hover:border-emerald-500 hover:text-emerald-600"
                  style="border-color: var(--color-rule); background-color: var(--color-paper);"
                >
                  {{ chip }}
                </button>
              </div>
            </div>

            <!-- Features badging -->
            <div class="flex items-center gap-6 mt-6 pt-6 border-t text-xs font-mono uppercase tracking-wider" style="border-color: var(--color-rule); color: var(--color-ink-2);">
              <span class="flex items-center gap-1.5"><Icon icon="solar:check-circle-bold" class="w-3.5 h-3.5 text-emerald-500" /> Akses Terbuka</span>
              <span class="flex items-center gap-1.5"><Icon icon="solar:check-circle-bold" class="w-3.5 h-3.5 text-emerald-500" /> Tanpa Login</span>
              <span class="flex items-center gap-1.5"><Icon icon="solar:check-circle-bold" class="w-3.5 h-3.5 text-emerald-500" /> Berkas Valid</span>
            </div>
          </div>

          <!-- Right Column: Index Card -->
          <div class="lg:col-span-2">
            <div class="p-6 rounded-card border shadow-sm transition-all hover:shadow-md" style="border-color: var(--color-rule); background-color: var(--color-paper);">
              <div class="flex items-center justify-between pb-4 mb-4 border-b" style="border-color: var(--color-rule);">
                <div>
                  <span class="font-mono text-[11px] uppercase tracking-wider block" style="color: var(--color-ink-2);">Index Publikasi</span>
                  <span class="text-sm font-semibold block" style="color: var(--color-ink);">BAPPERIDA Samarinda</span>
                </div>
                <span class="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded border font-bold text-emerald-600 border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/30">Official</span>
              </div>

              <div class="space-y-4">
                <div class="flex justify-between items-center py-2 border-b" style="border-color: var(--color-rule);">
                  <span class="text-xs font-medium" style="color: var(--color-ink-2);">Total Kajian Terbit</span>
                  <strong class="text-2xl font-bold font-display" style="color: var(--color-ink);">{{ summary.total_published || 0 }}</strong>
                </div>

                <div class="flex justify-between items-center py-2 border-b" style="border-color: var(--color-rule);">
                  <span class="text-xs font-medium" style="color: var(--color-ink-2);">Total Kunjungan</span>
                  <strong class="text-2xl font-bold font-display" style="color: #10B981;">{{ summary.total_views || 0 }}</strong>
                </div>

                <div class="flex justify-between items-center py-2">
                  <span class="text-xs font-medium" style="color: var(--color-ink-2);">Total Unduhan Berkas</span>
                  <strong class="text-2xl font-bold font-display" style="color: #3B82F6;">{{ summary.total_downloads || 0 }}</strong>
                </div>
              </div>

              <div class="mt-6 pt-4 border-t" style="border-color: var(--color-rule);">
                <div class="w-full h-2 rounded-full overflow-hidden" style="background-color: var(--color-rule);">
                  <div class="h-full rounded-full transition-all duration-500" style="width: 78%; background-color: var(--color-accent);"></div>
                </div>
                <p class="text-[11px] font-mono uppercase tracking-wider mt-2.5 flex items-center justify-between" style="color: var(--color-ink-2);">
                  <span>{{ bidangs.length }} Rumpun Bidang Aktif</span>
                  <span>100% Keterbukaan</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Marquee Banner -->
        <div class="mt-16 py-3 border-y overflow-hidden" style="border-color: var(--color-rule);">
          <div class="flex gap-12 animate-marquee whitespace-nowrap font-mono text-xs uppercase tracking-widest" style="color: var(--color-ink-2);">
            <span v-for="(item, index) in recentKajians" :key="item.id" class="inline-flex items-center gap-3">
              <span class="font-semibold" style="color: var(--color-ink);">{{ item.judul }}</span>
              <span class="text-emerald-500">✦</span>
            </span>
            <span v-for="(item, index) in recentKajians" :key="'dup-' + item.id" class="inline-flex items-center gap-3">
              <span class="font-semibold" style="color: var(--color-ink);">{{ item.judul }}</span>
              <span class="text-emerald-500">✦</span>
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Pimpinan Kota Samarinda Section -->
    <section class="py-20 border-b relative" style="background-color: var(--color-paper); border-color: var(--color-rule);">
      <div class="container mx-auto px-4 xl:px-0">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <!-- Photos of Walikota & Wawali -->
          <div class="lg:col-span-5 flex items-start justify-center gap-6 sm:gap-8">
            <div class="relative group text-center">
              <div class="overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1" style="width: 175px; height: 230px; border-color: var(--color-rule); background-color: var(--color-paper-2);">
                <img src="https://satudata.samarindakota.go.id/img/new-walikota.png" alt="Dr. H. Andi Harun" class="w-full h-full object-cover object-[center_18%] transition-transform duration-500 group-hover:scale-105" />
              </div>
              <h5 class="mt-3 text-xs font-bold" style="color: var(--color-ink);">Dr. H. Andi Harun</h5>
              <p class="text-[10px] uppercase font-mono tracking-widest mt-0.5" style="color: var(--color-ink-2);">Walikota Samarinda</p>
            </div>
            
            <div class="relative group text-center">
              <div class="overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1" style="width: 175px; height: 230px; border-color: var(--color-rule); background-color: var(--color-paper-2);">
                <img src="https://satudata.samarindakota.go.id/img/new-wawali.png" alt="H. Saefuddin Zuhri, S.E., M.M." class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" style="object-position: -40% 2%;" />
              </div>
              <h5 class="mt-3 text-xs font-bold" style="color: var(--color-ink);">H. Saefuddin Zuhri, S.E., M.M.</h5>
              <p class="text-[10px] uppercase font-mono tracking-widest mt-0.5" style="color: var(--color-ink-2);">Wakil Walikota Samarinda</p>
            </div>
          </div>

          <!-- Narrative Statement -->
          <div class="lg:col-span-7 space-y-6">
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400">
              <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
              Samarinda Kota Pusat Peradaban
            </div>

            <h2 class="text-3xl sm:text-4xl font-semibold tracking-tight leading-snug" style="font-family: var(--font-display); color: var(--color-ink); letter-spacing: -0.02em;">
              Mewujudkan Kebijakan Berbasis <br/>
              <span style="color: var(--color-accent);">Data &amp; Riset Ilmiah</span>
            </h2>

            <p class="text-sm sm:text-base leading-relaxed" style="color: var(--color-ink-2);">
              Pemerintah Kota Samarinda berkomitmen meningkatkan kualitas tata kelola pemerintahan yang transparan dan akuntabel. Melalui portal <strong>SIKAJIAN</strong>, dokumen hasil penelitian, kajian akademis, dan naskah rekomendasi kebijakan dipublikasikan secara luas untuk mendorong kolaborasi antara pemerintah, akademisi, dan masyarakat.
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t" style="border-color: var(--color-rule);">
              <div class="p-4 rounded-xl border" style="border-color: var(--color-rule); background-color: var(--color-paper-2);">
                <h5 class="text-xs font-bold uppercase font-mono tracking-wider" style="color: var(--color-ink);">Prinsip Pembangunan</h5>
                <p class="text-xs mt-1.5 leading-relaxed" style="color: var(--color-ink-2);">Objektivitas, Akurasi Data, dan Kemanfaatan Publik secara inklusif.</p>
              </div>
              <div class="p-4 rounded-xl border" style="border-color: var(--color-rule); background-color: var(--color-paper-2);">
                <h5 class="text-xs font-bold uppercase font-mono tracking-wider" style="color: var(--color-ink);">Rencana Strategis</h5>
                <p class="text-xs mt-1.5 leading-relaxed" style="color: var(--color-ink-2);">Mendukung RPJMD Kota Samarinda melalui penelitian yang terstruktur dan terukur.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Capaian Publikasi Stats Section -->
    <section class="py-20 border-b" style="background-color: var(--color-paper-2); border-color: var(--color-rule);">
      <div class="container mx-auto px-4 xl:px-0">
        <div class="flex items-center justify-between mb-12">
          <div>
            <span class="font-mono text-xs uppercase tracking-wider block mb-1" style="color: var(--color-ink-2);">&diams; ringkasan kinerja</span>
            <h2 class="text-2xl sm:text-3xl font-semibold" style="font-family: var(--font-display); color: var(--color-ink); letter-spacing: -0.02em;">Capaian <span style="color: var(--color-accent);">Publikasi</span></h2>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="p-8 rounded-card border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md" style="border-color: var(--color-rule); background-color: var(--color-paper);">
            <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style="background-color: var(--color-paper-2); color: var(--color-accent);">
              <Icon icon="solar:folder-open-bold-duotone" class="w-6 h-6" />
            </div>
            <span class="font-display text-4xl font-bold block" style="color: var(--color-accent); letter-spacing: -0.03em;">{{ summary.total_published || 0 }}</span>
            <span class="font-mono text-xs uppercase tracking-wider block mt-2" style="color: var(--color-ink-2);">Total Kajian Terbit</span>
            <p class="text-xs mt-3 leading-relaxed" style="color: var(--color-ink-2);">Seluruh dokumen kajian dan penelitian yang telah diverifikasi dan dipublikasikan untuk umum.</p>
          </div>

          <div class="p-8 rounded-card border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md" style="border-color: var(--color-rule); background-color: var(--color-paper);">
            <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style="background-color: rgba(16, 185, 129, 0.1); color: #10B981;">
              <Icon icon="solar:eye-bold-duotone" class="w-6 h-6" />
            </div>
            <span class="font-display text-4xl font-bold block style='color: #10B981;' letter-spacing: -0.03em;">{{ summary.total_views || 0 }}</span>
            <span class="font-mono text-xs uppercase tracking-wider block mt-2" style="color: var(--color-ink-2);">Total Kunjungan</span>
            <p class="text-xs mt-3 leading-relaxed" style="color: var(--color-ink-2);">Akumulasi penelusuran dan pembacaan dari akademisi, peneliti, dan masyarakat umum.</p>
          </div>

          <div class="p-8 rounded-card border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md" style="border-color: var(--color-rule); background-color: var(--color-paper);">
            <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style="background-color: rgba(59, 130, 246, 0.1); color: #3B82F6;">
              <Icon icon="solar:download-bold-duotone" class="w-6 h-6" />
            </div>
            <span class="font-display text-4xl font-bold block style='color: #3B82F6;' letter-spacing: -0.03em;">{{ summary.total_downloads || 0 }}</span>
            <span class="font-mono text-xs uppercase tracking-wider block mt-2" style="color: var(--color-ink-2);">Total Unduhan</span>
            <p class="text-xs mt-3 leading-relaxed" style="color: var(--color-ink-2);">Naskah dokumen publikasi yang telah diunduh oleh pengguna portal.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Klaster Bidang Section -->
    <section class="py-20 border-b" style="background-color: var(--color-paper); border-color: var(--color-rule);">
      <div class="container mx-auto px-4 xl:px-0">
        <div class="flex items-center justify-between mb-12">
          <div>
            <span class="font-mono text-xs uppercase tracking-wider block mb-1" style="color: var(--color-ink-2);">&diams; pengelompokan</span>
            <h2 class="text-2xl sm:text-3xl font-semibold" style="font-family: var(--font-display); color: var(--color-ink); letter-spacing: -0.02em;">Klaster Bidang <span style="color: var(--color-accent);">Penelitian</span></h2>
          </div>
          <Link :href="route('portal.kajian')" class="text-xs font-bold uppercase tracking-wider transition-colors shrink-0 flex items-center gap-1" style="color: var(--color-accent);">
            Lihat semua &rarr;
          </Link>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link 
            v-for="b in bidangs" 
            :key="b.id" 
            :href="route('portal.kajian', { bidang_id: b.id })" 
            class="p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-md group flex flex-col justify-between" 
            style="border-color: var(--color-rule); background-color: var(--color-paper-2);"
          >
            <div>
              <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110" style="border: 1px solid var(--color-rule); background-color: var(--color-paper); color: var(--color-accent);">
                <Icon icon="solar:folder-with-files-bold-duotone" class="w-6 h-6" />
              </div>
              <h4 class="font-semibold text-base leading-snug group-hover:text-emerald-600 transition-colors" style="color: var(--color-ink);">{{ b.nama }}</h4>
              <p class="text-xs mt-2.5 leading-relaxed line-clamp-3" style="color: var(--color-ink-2);">{{ b.deskripsi || 'Dokumen kajian daerah dalam rumpun ' + b.nama }}</p>
            </div>
            <div class="mt-6 pt-4 border-t flex items-center justify-between text-xs font-mono uppercase tracking-wider" style="border-color: var(--color-rule); color: var(--color-ink-2);">
              <span>Jelajahi Berkas</span>
              <span class="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </div>
          </Link>
        </div>
      </div>
    </section>

    <!-- Recent + Popular Section -->
    <section class="py-20 border-b" style="background-color: var(--color-paper-2); border-color: var(--color-rule);">
      <div class="container mx-auto px-4 xl:px-0 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <!-- Recent Kajian -->
        <div class="lg:col-span-2">
          <div class="flex items-center justify-between pb-5 border-b" style="border-color: var(--color-rule);">
            <div>
              <span class="font-mono text-xs uppercase tracking-wider block mb-1" style="color: var(--color-ink-2);">&diams; publikasi terbaru</span>
              <h3 class="text-xl font-semibold" style="font-family: var(--font-display); color: var(--color-ink); letter-spacing: -0.02em;">Kajian Terbaru</h3>
            </div>
            <Link :href="route('portal.kajian')" class="text-xs font-bold uppercase tracking-wider transition-colors" style="color: var(--color-accent);">Lihat Semua &rarr;</Link>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div 
              v-for="item in recentKajians" 
              :key="item.id" 
              class="p-6 rounded-card border transition-all duration-300 hover:shadow-md flex flex-col justify-between group" 
              style="border-color: var(--color-rule); background-color: var(--color-paper);"
            >
              <div>
                <span class="px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50">
                  {{ item.jenis_kajian?.nama }}
                </span>
                <h4 class="font-semibold text-base mt-4 leading-snug line-clamp-2 group-hover:text-emerald-600 transition-colors" style="color: var(--color-ink);">
                  <Link :href="route('portal.detail', item.slug)">{{ item.judul }}</Link>
                </h4>
                <p class="text-xs mt-3 leading-relaxed line-clamp-2" style="color: var(--color-ink-2);">{{ item.ringkasan }}</p>
              </div>
              <div class="mt-6 pt-4 border-t flex items-center justify-between text-xs" style="border-color: var(--color-rule); color: var(--color-ink-2);">
                <span class="font-mono">{{ item.tahun?.tahun }}</span>
                <Link :href="route('portal.detail', item.slug)" class="font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform" style="color: var(--color-accent);">
                  Selengkapnya &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>

        <!-- Popular Kajian -->
        <div>
          <div class="pb-5 border-b" style="border-color: var(--color-rule);">
            <span class="font-mono text-xs uppercase tracking-wider block mb-1" style="color: var(--color-ink-2);">&diams; paling banyak diunduh</span>
            <h3 class="text-xl font-semibold" style="font-family: var(--font-display); color: var(--color-ink); letter-spacing: -0.02em;">Kajian Populer</h3>
          </div>

          <div class="mt-8 space-y-4">
            <div 
              v-for="item in popularKajians" 
              :key="item.id" 
              class="p-4 rounded-xl border transition-colors hover:border-emerald-500/50 flex items-start gap-4" 
              style="border-color: var(--color-rule); background-color: var(--color-paper);"
            >
              <div class="p-3 rounded-lg shrink-0" style="border: 1px solid var(--color-rule); background-color: var(--color-paper-2); color: var(--color-accent);">
                <Icon icon="solar:document-bold-duotone" class="w-5 h-5" />
              </div>
              <div class="min-w-0 flex-grow">
                <h4 class="font-semibold text-xs leading-snug line-clamp-2" style="color: var(--color-ink);">
                  <Link :href="route('portal.detail', item.slug)">{{ item.judul }}</Link>
                </h4>
                <div class="flex items-center justify-between mt-2.5 text-[11px]" style="color: var(--color-ink-2);">
                  <span class="font-mono">{{ item.tahun?.tahun }} &middot; {{ item.bidang?.nama }}</span>
                  <span class="font-bold flex items-center gap-1 text-emerald-600 dark:text-emerald-450">
                    <Icon icon="solar:download-bold" class="w-3.5 h-3.5" />{{ item.download_count }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </FrontendLayout>
</template>
