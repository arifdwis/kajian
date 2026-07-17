<!-- Hallmark · genre: modern-minimal (civic) · macrostructure: Government Portal · theme: Samarinda civic green · design-system: design.md · designed-as-app -->
<script setup>
import { computed, onMounted, ref } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';

const page = usePage();
const user = computed(() => page.props.auth?.user);

const isDarkMode = ref(false);
const mobileMenuOpen = ref(false);

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  document.documentElement.classList.toggle('dark', isDarkMode.value);
  localStorage.setItem('darkMode', isDarkMode.value ? 'true' : 'false');
};

onMounted(() => {
  isDarkMode.value = localStorage.getItem('darkMode') === 'true';
  document.documentElement.classList.toggle('dark', isDarkMode.value);
});
</script>

<template>
  <div class="min-h-screen flex flex-col" style="background-color: var(--color-paper); color: var(--color-ink);">
    <!-- N5 Floating pill nav -->
    <nav
      class="fixed top-[18px] left-1/2 -translate-x-1/2 z-50 flex items-center h-[46px] pl-[18px] pr-2 gap-3"
      style="border-radius: 9999px; background-color: color-mix(in oklch, var(--color-paper) 78%, transparent); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid color-mix(in oklch, var(--color-ink) 8%, transparent); box-shadow: 0 1px 0 rgba(255,255,255,0.6) inset, 0 8px 30px -12px rgba(20,30,80,0.18);"
    >
        <!-- Brand -->
        <Link href="/" class="flex items-center gap-2 shrink-0 mr-2">
          <img src="/img/logo-samarinda.webp" alt="Lambang Kota Samarinda" class="w-[22px] h-[22px] object-contain" />
          <span class="text-[15px] font-semibold" style="font-family: var(--font-display); color: var(--color-ink); letter-spacing: -0.02em;">SIKAJIAN</span>
        </Link>

        <!-- Nav links -->
        <div class="hidden md:flex items-center gap-3">
          <Link
            :href="route('home')"
            class="px-3.5 py-2 text-[13px] font-medium rounded-full transition-colors"
            :class="$page.component === 'Frontend/Portal/Home' ? 'text-[var(--color-ink)]' : 'text-[var(--color-ink-2)]'"
            :style="$page.component === 'Frontend/Portal/Home' ? 'background-color: var(--color-paper-2); color: var(--color-ink);' : ''"
            @mouseenter="$event.target.style.backgroundColor = 'var(--color-paper-2)'; $event.target.style.color = 'var(--color-ink)'"
            @mouseleave="if ($page.component !== 'Frontend/Portal/Home') { $event.target.style.backgroundColor = 'transparent'; $event.target.style.color = ''; }"
          >
            Beranda
          </Link>
          <Link
            :href="route('portal.kajian')"
            class="px-3.5 py-2 text-[13px] font-medium rounded-full transition-colors"
            :class="$page.component === 'Frontend/Portal/KajianList' ? 'text-[var(--color-ink)]' : 'text-[var(--color-ink-2)]'"
            :style="$page.component === 'Frontend/Portal/KajianList' ? 'background-color: var(--color-paper-2); color: var(--color-ink);' : ''"
            @mouseenter="$event.target.style.backgroundColor = 'var(--color-paper-2)'; $event.target.style.color = 'var(--color-ink)'"
            @mouseleave="if ($page.component !== 'Frontend/Portal/KajianList') { $event.target.style.backgroundColor = 'transparent'; $event.target.style.color = ''; }"
          >
            Daftar Kajian
          </Link>
          <Link
            :href="route('portal.search')"
            class="px-3.5 py-2 text-[13px] font-medium rounded-full transition-colors"
            :class="$page.component === 'Frontend/Portal/Search' ? 'text-[var(--color-ink)]' : 'text-[var(--color-ink-2)]'"
            :style="$page.component === 'Frontend/Portal/Search' ? 'background-color: var(--color-paper-2); color: var(--color-ink);' : ''"
            @mouseenter="$event.target.style.backgroundColor = 'var(--color-paper-2)'; $event.target.style.color = 'var(--color-ink)'"
            @mouseleave="if ($page.component !== 'Frontend/Portal/Search') { $event.target.style.backgroundColor = 'transparent'; $event.target.style.color = ''; }"
          >
            Pencarian
          </Link>
        </div>

        <!-- Right side: dark mode + CTA -->
        <div class="flex items-center gap-2">
          <button
            @click="toggleDarkMode"
            class="p-2 rounded-full transition-colors"
            style="color: var(--color-ink-2);"
            @mouseenter="$event.target.style.backgroundColor = 'var(--color-paper-2)'"
            @mouseleave="$event.target.style.backgroundColor = 'transparent'"
          >
            <Icon v-if="isDarkMode" icon="solar:sun-bold-duotone" class="w-4 h-4" />
            <Icon v-else icon="solar:moon-bold-duotone" class="w-4 h-4" />
          </button>

          <Link
            v-if="user"
            :href="route('dashboard')"
            class="px-3.5 py-2 text-[13px] font-medium rounded-full transition-colors"
            style="background-color: var(--color-ink); color: var(--color-paper); border: 1px solid var(--color-ink);"
            @mouseenter="$event.target.style.backgroundColor = 'var(--color-accent)'; $event.target.style.borderColor = 'var(--color-accent)'"
            @mouseleave="$event.target.style.backgroundColor = 'var(--color-ink)'; $event.target.style.borderColor = 'var(--color-ink)'"
          >
            Dashboard
          </Link>
          <Link
            v-else
            :href="route('login')"
            class="px-3.5 py-2 text-[13px] font-medium rounded-full transition-colors"
            style="background-color: var(--color-ink); color: var(--color-paper); border: 1px solid var(--color-ink);"
            @mouseenter="$event.target.style.backgroundColor = 'var(--color-accent)'; $event.target.style.borderColor = 'var(--color-accent)'"
            @mouseleave="$event.target.style.backgroundColor = 'var(--color-ink)'; $event.target.style.borderColor = 'var(--color-ink)'"
          >
            Login
          </Link>
        </div>
      </nav>
    <main class="flex-1 pt-[82px]">
      <slot />
    </main>

  <!-- Footer -->
  <footer style="border-top: 1px solid var(--color-rule); background-color: var(--color-paper-2);">
    <div class="container mx-auto px-4 xl:px-0 py-16 md:py-20">
      <!-- Link columns -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-10 pb-14" style="border-bottom: 1px solid var(--color-rule);">
        <div>
          <h5 class="text-xs font-semibold mb-5" style="color: var(--color-ink);">Akses Cepat</h5>
          <ul class="space-y-3">
            <li><Link href="/" class="text-sm transition-colors hover:underline" style="color: var(--color-ink-2);">Beranda</Link></li>
            <li><Link :href="route('portal.kajian')" class="text-sm transition-colors hover:underline" style="color: var(--color-ink-2);">Daftar Kajian</Link></li>
            <li><Link :href="route('portal.search')" class="text-sm transition-colors hover:underline" style="color: var(--color-ink-2);">Pencarian</Link></li>
          </ul>
        </div>
        <div>
          <h5 class="text-xs font-semibold mb-5" style="color: var(--color-ink);">Layanan</h5>
          <ul class="space-y-3">
            <li><Link :href="route('login')" class="text-sm transition-colors hover:underline" style="color: var(--color-ink-2);">Login Admin</Link></li>
            <li><a href="#" class="text-sm transition-colors hover:underline" style="color: var(--color-ink-2);">Panduan Pengguna</a></li>
            <li><a href="#" class="text-sm transition-colors hover:underline" style="color: var(--color-ink-2);">Syarat &amp; Ketentuan</a></li>
          </ul>
        </div>
        <div>
          <h5 class="text-xs font-semibold mb-5" style="color: var(--color-ink);">Kontak</h5>
          <ul class="space-y-3">
            <li class="text-sm" style="color: var(--color-ink-2);">Jl. Dahlia No.81, Kel. Bugis</li>
            <li class="text-sm" style="color: var(--color-ink-2);">Kec. Samarinda Kota, Kota Samarinda</li>
            <li class="text-sm" style="color: var(--color-ink-2);">Kalimantan Timur 75121</li>
            <li class="text-sm" style="color: var(--color-ink-2);">Telp: 0541-203785</li>
            <li><a href="mailto:bappedalitbang@samarindakota.go.id" class="text-sm" style="color: var(--color-accent);">bappedalitbang@samarindakota.go.id</a></li>
          </ul>
        </div>
        <div>
          <h5 class="text-xs font-semibold mb-5" style="color: var(--color-ink);">Ikuti Kami</h5>
          <div class="flex items-center gap-3">
            <a href="https://www.instagram.com/bapperida_smd/" target="_blank" class="w-9 h-9 flex items-center justify-center rounded-lg transition-colors" style="border: 1px solid var(--color-rule); color: var(--color-ink-2);" @mouseenter="$event.target.style.color = 'var(--color-accent)'" @mouseleave="$event.target.style.color = 'var(--color-ink-2)'">
              <Icon icon="solar:gallery-bold" class="w-4 h-4" />
            </a>
            <a href="https://www.youtube.com/@bapperidasamarinda" target="_blank" class="w-9 h-9 flex items-center justify-center rounded-lg transition-colors" style="border: 1px solid var(--color-rule); color: var(--color-ink-2);" @mouseenter="$event.target.style.color = 'var(--color-accent)'" @mouseleave="$event.target.style.color = 'var(--color-ink-2)'">
              <Icon icon="solar:play-bold" class="w-4 h-4" />
            </a>
            <a href="mailto:bappedalitbang@samarindakota.go.id" class="w-9 h-9 flex items-center justify-center rounded-lg transition-colors" style="border: 1px solid var(--color-rule); color: var(--color-ink-2);" @mouseenter="$event.target.style.color = 'var(--color-accent)'" @mouseleave="$event.target.style.color = 'var(--color-ink-2)'">
              <Icon icon="solar:letter-bold" class="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      <!-- Legal -->
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
        <div class="flex items-center gap-3">
          <img src="/img/logo-samarinda.webp" alt="Lambang Kota Samarinda" class="w-8 h-8 object-contain" />
          <div>
            <span class="text-sm font-semibold" style="font-family: var(--font-display); color: var(--color-ink); letter-spacing: -0.02em;">SIKAJIAN</span>
            <span class="text-xs block" style="color: var(--color-ink-2);">&copy; {{ new Date().getFullYear() }} BAPPEDA Litbang Kota Samarinda</span>
          </div>
        </div>
        <span class="text-xs" style="color: var(--color-ink-2);">Dibangun untuk pelayanan publik</span>
      </div>
    </div>
  </footer>
 </div>
</template>
