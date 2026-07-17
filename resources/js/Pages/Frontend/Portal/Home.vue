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

const search = () => {
 router.get(route('portal.search'), { q: searchQuery.value });
};
</script>

<template>
 <Head title="Beranda Kajian & Riset" />
 
  <FrontendLayout>
  <!-- Hero -->
  <section style="background-color: var(--color-paper);">
    <div class="container mx-auto px-4 xl:px-0 pt-28 pb-24 md:pt-32 md:pb-28">
      <!-- LIVE label -->
      <div class="flex items-center gap-2 mb-8" style="color: var(--color-ink-2); font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.06em; text-transform: uppercase;">
        <span style="width: 7px; height: 7px; border-radius: 50%; background-color: var(--color-accent); display: inline-block;"></span>
        <span>LIVE &middot; <strong style="color: var(--color-accent);">{{ summary.total_published || 0 }}</strong> DOKUMEN TERBIT</span>
      </div>

      <!-- Hero grid -->
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-16">
        <div class="lg:col-span-3">
          <h1 class="text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight" style="font-family: var(--font-display); color: var(--color-ink); letter-spacing: -0.03em;">
            Akses Riset &amp; <br/><span style="color: var(--color-accent);">Kajian Daerah</span>
          </h1>
          <p class="mt-6 text-base lg:text-lg leading-relaxed max-w-lg" style="color: var(--color-ink-2);">
            Telusuri dokumen kajian akademis, rencana penelitian strategis, dan data inovasi daerah guna mendukung transparansi dan perumusan kebijakan yang akurat.
          </p>
          <div class="flex items-center gap-3 mt-8">
            <form @submit.prevent="search" class="flex-1 flex items-center" style="border: 1px solid var(--color-rule); border-radius: 8px; max-width: 28rem;">
              <div class="flex-1 flex items-center gap-3 px-4">
                <Icon icon="solar:magnifer-linear" class="w-5 h-5 shrink-0" style="color: var(--color-ink-2);" />
                <input type="text" v-model="searchQuery" placeholder="Cari judul kajian, abstrak..." class="w-full bg-transparent border-0 focus:ring-0 py-3.5" style="color: var(--color-ink); font-size: 15px;" />
              </div>
              <button type="submit" class="px-5 py-3 text-sm font-semibold shrink-0 transition-colors" style="border-radius: 6px; background-color: var(--color-accent); color: var(--color-accent-ink);" @mouseenter="$event.target.style.backgroundColor = 'oklch(39% 0.055 135)'" @mouseleave="$event.target.style.backgroundColor = 'var(--color-accent)'">Cari</button>
            </form>
            <Link :href="route('portal.kajian')" class="px-4 py-3 text-sm font-medium shrink-0 transition-colors" style="border: 1px solid var(--color-rule); border-radius: 6px; color: var(--color-ink);">Jelajahi</Link>
          </div>
          <div class="flex items-center gap-6 mt-4" style="color: var(--color-ink-2); font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.04em; text-transform: uppercase;">
            <span>tanpa login</span>
            <span>akses terbuka</span>
            <span>semua dokumen</span>
          </div>
        </div>

        <!-- Right: stats card (like Tally invoice card) -->
        <div class="lg:col-span-2">
          <div style="border: 1px solid var(--color-rule); border-radius: 12px; background-color: var(--color-paper);">
            <div style="padding: 20px 24px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--color-rule);">
              <div>
                <div style="font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--color-ink-2);">Index Publikasi</div>
                <div style="font-size: 14px; color: var(--color-ink-2); margin-top: 2px;">BAPPERIDA Samarinda</div>
              </div>
              <span style="font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; border: 1px solid var(--color-rule); border-radius: 4px; padding: 3px 8px; color: var(--color-accent);">live</span>
            </div>
            <div style="padding: 20px 24px;">
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 14px 0; border-bottom: 1px solid var(--color-rule);">
                <span style="font-size: 15px; color: var(--color-ink-2);">Total Kajian</span>
                <strong style="font-family: var(--font-display); font-size: 28px; color: var(--color-ink); letter-spacing: -0.02em;">{{ summary.total_published || 0 }}</strong>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 14px 0; border-bottom: 1px solid var(--color-rule);">
                <span style="font-size: 15px; color: var(--color-ink-2);">Kunjungan</span>
                <strong style="font-family: var(--font-display); font-size: 28px; color: var(--color-ink); letter-spacing: -0.02em;">{{ summary.total_views || 0 }}</strong>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 14px 0;">
                <span style="font-size: 15px; color: var(--color-ink-2);">Unduhan</span>
                <strong style="font-family: var(--font-display); font-size: 28px; color: var(--color-ink); letter-spacing: -0.02em;">{{ summary.total_downloads || 0 }}</strong>
              </div>
            </div>
            <div style="padding: 0 24px 20px;">
              <div style="height: 6px; border-radius: 3px; background-color: var(--color-rule); overflow: hidden;">
                <div style="height: 100%; width: 64%; border-radius: 3px; background-color: var(--color-accent);"></div>
              </div>
              <div style="font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--color-ink-2); margin-top: 8px;">{{ bidangs.length }} bidang penelitian aktif</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Marquee: Kajian Terbaru -->
      <div style="margin-top: 60px; border-top: 1px solid var(--color-rule); border-bottom: 1px solid var(--color-rule); overflow: hidden; padding: 14px 0;">
        <div style="display: flex; gap: 56px; animation: marquee 40s linear infinite; white-space: nowrap; font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.1em; color: var(--color-ink-2); text-transform: uppercase;">
          <span v-for="(item, index) in recentKajians" :key="item.id">
            {{ item.judul }}
            <span v-if="index < recentKajians.length - 1" style="color: var(--color-accent); margin: 0 8px;">✦</span>
          </span>
          <span v-for="(item, index) in recentKajians" :key="'dup-' + item.id">
            {{ item.judul }}
            <span v-if="index < recentKajians.length - 1" style="color: var(--color-accent); margin: 0 8px;">✦</span>
          </span>
        </div>
      </div>
    </div>
  </section>

  <!-- Stats triplet -->
  <section style="background-color: var(--color-paper-2); border-top: 1px solid var(--color-rule); padding: 80px 0;">
    <div class="container mx-auto px-4 xl:px-0">
      <div class="flex items-center justify-between mb-12">
        <div>
          <span style="font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--color-ink-2); display: block; margin-bottom: 4px;">&diams; ringkasan</span>
          <h2 class="text-2xl font-semibold" style="font-family: var(--font-display); color: var(--color-ink); letter-spacing: -0.02em;">Capaian <span style="color: var(--color-accent);">Publikasi</span></h2>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div class="p-8" style="border: 1px solid var(--color-rule); border-radius: 12px; background-color: var(--color-paper);">
          <span style="font-family: var(--font-display); font-size: 44px; font-weight: 600; color: var(--color-accent); letter-spacing: -0.03em;">{{ summary.total_published || 0 }}</span>
          <span style="font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--color-ink-2); display: block; margin-top: 4px;">Total Kajian</span>
          <p style="font-size: 14px; color: var(--color-ink-2); margin-top: 10px; line-height: 1.6;">Seluruh dokumen kajian dan penelitian yang telah diterbitkan dan dapat diakses publik.</p>
        </div>
        <div class="p-8" style="border: 1px solid var(--color-rule); border-radius: 12px; background-color: var(--color-paper);">
          <span style="font-family: var(--font-display); font-size: 44px; font-weight: 600; color: var(--color-accent); letter-spacing: -0.03em;">{{ summary.total_views || 0 }}</span>
          <span style="font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--color-ink-2); display: block; margin-top: 4px;">Total Kunjungan</span>
          <p style="font-size: 14px; color: var(--color-ink-2); margin-top: 10px; line-height: 1.6;">Akumulasi kunjungan dari akademisi, peneliti, dan masyarakat umum.</p>
        </div>
        <div class="p-8" style="border: 1px solid var(--color-rule); border-radius: 12px; background-color: var(--color-paper);">
          <span style="font-family: var(--font-display); font-size: 44px; font-weight: 600; color: var(--color-accent); letter-spacing: -0.03em;">{{ summary.total_downloads || 0 }}</span>
          <span style="font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--color-ink-2); display: block; margin-top: 4px;">Total Unduhan</span>
          <p style="font-size: 14px; color: var(--color-ink-2); margin-top: 10px; line-height: 1.6;">Dokumen kajian yang telah diunduh oleh pengguna portal.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Category Grid / Bidang -->
  <section style="padding: 80px 0;">
    <div class="container mx-auto px-4 xl:px-0">
      <div class="flex items-center justify-between mb-12">
        <div>
          <span style="font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--color-ink-2); display: block; margin-bottom: 4px;">&diams; bidang</span>
          <h2 class="text-2xl font-semibold" style="font-family: var(--font-display); color: var(--color-ink); letter-spacing: -0.02em;">Klaster Bidang <span style="color: var(--color-accent);">Penelitian</span></h2>
        </div>
        <Link :href="route('portal.kajian')" class="text-sm font-medium transition-colors shrink-0" style="color: var(--color-accent);">Lihat semua &rarr;</Link>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link v-for="b in bidangs" :key="b.id" :href="route('portal.kajian', { bidang_id: b.id })" class="p-6 transition-colors" style="border: 1px solid var(--color-rule); border-radius: 12px; background-color: var(--color-paper-2);" @mouseenter="$event.target.style.borderColor = 'var(--color-accent)'" @mouseleave="$event.target.style.borderColor = 'var(--color-rule)'">
          <div class="w-12 h-12 flex items-center justify-center mb-4" style="border-radius: 8px; border: 1px solid var(--color-rule); background-color: var(--color-paper); color: var(--color-accent);">
            <Icon icon="solar:folder-with-files-bold-duotone" class="w-6 h-6" />
          </div>
          <h4 class="font-semibold text-base leading-snug" style="color: var(--color-ink);">{{ b.nama }}</h4>
          <p class="text-sm mt-2 leading-relaxed" style="color: var(--color-ink-2);">{{ b.deskripsi || 'Dokumen kajian daerah dalam rumpun ' + b.nama }}</p>
        </Link>
      </div>
    </div>
  </section>

  <!-- Recent + Popular -->
  <section style="background-color: var(--color-paper-2); border-top: 1px solid var(--color-rule); padding: 80px 0;">
    <div class="container mx-auto px-4 xl:px-0 grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div class="lg:col-span-2">
        <div class="flex items-center justify-between pb-5" style="border-bottom: 1px solid var(--color-rule);">
          <div>
            <span style="font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--color-ink-2); display: block; margin-bottom: 2px;">&diams; publikasi</span>
            <h3 class="text-xl font-semibold" style="font-family: var(--font-display); color: var(--color-ink); letter-spacing: -0.02em;">Terbaru</h3>
          </div>
          <Link :href="route('portal.kajian')" class="text-sm font-medium transition-colors" style="color: var(--color-accent);">Lihat semua &rarr;</Link>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <div v-for="item in recentKajians" :key="item.id" class="p-6 flex flex-col justify-between" style="border: 1px solid var(--color-rule); border-radius: 12px; background-color: var(--color-paper);">
            <div>
              <span style="font-size: 11px; font-weight: 500; color: var(--color-ink-2); font-family: var(--font-mono); letter-spacing: 0.04em; text-transform: uppercase;">{{ item.jenis_kajian?.nama }}</span>
              <h4 class="font-semibold text-base mt-3 leading-snug line-clamp-2" style="color: var(--color-ink);"><Link :href="route('portal.detail', item.slug)">{{ item.judul }}</Link></h4>
              <p class="text-sm mt-2.5 leading-relaxed line-clamp-2" style="color: var(--color-ink-2);">{{ item.ringkasan }}</p>
            </div>
            <div class="mt-6 pt-4 flex items-center justify-between" style="border-top: 1px solid var(--color-rule); color: var(--color-ink-2); font-size: 13px;">
              <span>Tahun {{ item.tahun?.tahun }}</span>
              <Link :href="route('portal.detail', item.slug)" class="font-medium" style="color: var(--color-accent);">Selengkapnya &rarr;</Link>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="pb-5" style="border-bottom: 1px solid var(--color-rule);">
          <span style="font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--color-ink-2); display: block; margin-bottom: 2px;">&diams; populer</span>
          <h3 class="text-xl font-semibold" style="font-family: var(--font-display); color: var(--color-ink); letter-spacing: -0.02em;">Banyak Dicari</h3>
        </div>
        <div class="mt-8 space-y-5">
          <div v-for="item in popularKajians" :key="item.id" class="flex items-start gap-4 pb-5" style="border-bottom: 1px solid var(--color-rule);">
            <div class="p-3 shrink-0" style="border-radius: 8px; border: 1px solid var(--color-rule); background-color: var(--color-paper); color: var(--color-accent);">
              <Icon icon="solar:document-bold" class="w-5 h-5" />
            </div>
            <div class="min-w-0 flex-grow">
              <h4 class="font-semibold text-sm leading-snug line-clamp-2" style="color: var(--color-ink);"><Link :href="route('portal.detail', item.slug)">{{ item.judul }}</Link></h4>
              <div class="flex items-center justify-between mt-2" style="color: var(--color-ink-2); font-size: 13px;">
                <span>{{ item.tahun?.tahun }} &middot; {{ item.bidang?.nama }}</span>
                <span class="font-medium flex items-center gap-1" style="color: var(--color-accent);">
                  <Icon icon="solar:download-bold" class="w-4 h-4" />{{ item.download_count }}
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
