<script setup>
import { ref, watchEffect, onMounted, onUnmounted } from 'vue';
import { FwbAvatar } from 'flowbite-vue';
import { Link, router, usePage } from '@inertiajs/vue3';
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import { Icon } from '@iconify/vue';
import { eventBus } from '@/utils/eventBus';

const page = usePage();
const searchQuery = ref('');
const isCollapsed = ref(localStorage.getItem('sidebarCollapsed') === 'true');
const isDarkMode = ref(localStorage.getItem('darkMode') === 'true');
const isDropdownOpen = ref(false);

const isMobile = ref(window.innerWidth <= 640);
const updateMobileState = () => {
 isMobile.value = window.innerWidth <= 640;
};

const toggleDropdown = () => (isDropdownOpen.value = !isDropdownOpen.value);

const logout = () => router.post(route('logout'));

const toggleDarkMode = () => {
 isDarkMode.value = !isDarkMode.value;
 localStorage.setItem('darkMode', isDarkMode.value);
 document.documentElement.classList.toggle('dark', isDarkMode.value);
};

watchEffect(() => {
 document.documentElement.classList.toggle('dark', isDarkMode.value);
});

const getInitials = (name) => {
 if (!name) return 'US';
 const names = name.split(' ').filter((n) => n);
 return names.length > 1
 ? (names[0][0] + names[1][0]).toUpperCase()
 : names[0][0].toUpperCase();
};

const handleSearch = () => {
 if (searchQuery.value.trim() !== '') {
 router.visit(route('kajian.index', { search: searchQuery.value }));
 }
};

const toggleSidebar = () => {
 isCollapsed.value = !isCollapsed.value;
 localStorage.setItem('sidebarCollapsed', JSON.stringify(isCollapsed.value));
 eventBus.emit('toggle-sidebar', isCollapsed.value);
};

onMounted(() => {
 updateMobileState();
 window.addEventListener('resize', updateMobileState);

 if (isMobile.value && localStorage.getItem('sidebarCollapsed') === null) {
 isCollapsed.value = true;
 localStorage.setItem('sidebarCollapsed', 'true');
 eventBus.emit('toggle-sidebar', true);
 }
});

onUnmounted(() => {
 window.removeEventListener('resize', updateMobileState);
});
</script>

<template>
 <nav class="fixed top-0 left-0 right-0 z-40 h-16 border-b border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700">
 <div class="flex items-center justify-between h-full px-3 sm:px-4">
 
 <!-- Left side: Toggle button and Logo -->
 <div class="flex items-center gap-3">
 <!-- Logo -->
 <Link :href="route('dashboard')" class="flex-shrink-0">
 <ApplicationLogo />
 </Link>

 <!-- Toggle Desktop Sidebar -->
 <button @click="toggleSidebar" class="p-2 text-ink-2 hover:text-gray-900 dark:text-ink-2 dark:hover:text-white rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700">
 <Icon :icon="isCollapsed ? 'solar:hamburger-menu-bold-duotone' : 'solar:double-alt-arrow-left-bold-duotone'" class="w-6 h-6" />
 </button>
 </div>

 <!-- Center side: Quick Search -->
 <div class="hidden md:flex flex-1 max-w-md mx-4">
 <form @submit.prevent="handleSearch" class="w-full">
 <div class="relative">
 <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
 <Icon icon="solar:magnifer-bold-duotone" class="w-5 h-5 text-ink-2" />
 </div>
 <input 
 type="search" 
 v-model="searchQuery"
 class="block w-full pl-10 pr-3 py-2 text-sm rounded-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-400 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" 
 placeholder="Cari dokumen kajian Bapperida..." 
 />
 </div>
 </form>
 </div>

 <!-- Right side: Dark Mode + Portal view + Profile avatar -->
 <div class="flex items-center gap-3">
 
 <!-- Public Portal Link -->
 <Link href="/" class="hidden sm:flex items-center gap-1 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">
 <Icon icon="solar:globus-bold-duotone" class="w-5 h-5" />
 <span>Portal Publik</span>
 </Link>

 <!-- Notification Bell -->
 <Link 
 :href="route('notifikasi.index')" 
 class="relative p-2 text-ink-2 hover:text-gray-900 dark:text-ink-2 dark:hover:text-white rounded-sm"
 title="Notifikasi"
 >
 <Icon icon="solar:bell-bold-duotone" class="w-5 h-5" />
 <span 
 v-if="$page.props.auth.unread_notifications_count > 0" 
 class="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-white dark:border-gray-800"
 >
 {{ $page.props.auth.unread_notifications_count }}
 </span>
 </Link>

 <!-- Dark Mode Toggle -->
 <button @click="toggleDarkMode" class="p-2 text-ink-2 hover:text-gray-900 dark:text-ink-2 dark:hover:text-white rounded-sm">
 <Icon :icon="isDarkMode ? 'solar:sun-2-bold-duotone' : 'solar:moon-bold-duotone'" class="w-5 h-5 text-amber-500" />
 </button>

 <!-- User profile dropdown / trigger -->
 <div class="relative">
 <div @click="toggleDropdown" class="flex items-center gap-2 cursor-pointer p-1 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition">
 <fwb-avatar size="sm" :initials="getInitials($page.props.auth.user.name)" rounded />
 <div v-if="!isMobile" class="flex flex-col items-start pr-2">
 <span class="font-bold text-sm text-gray-700 dark:text-gray-200 leading-tight">
 {{ $page.props.auth.user.name }}
 </span>
 <span class="text-[10px] text-ink-2 capitalize">
 {{ $page.props.auth.role }}
 </span>
 </div>
 </div>

 <!-- Dropdown Options Menu -->
 <div 
 v-if="isDropdownOpen" 
 class="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-rule dark:border-rule-dark rounded-card z-50 py-2 divide-y divide-gray-100 dark:divide-gray-700"
 >
 <div class="px-4 py-2.5">
 <span class="block text-xs font-bold text-gray-900 dark:text-white leading-tight truncate">{{ $page.props.auth.user.name }}</span>
 <span class="block text-[10px] text-ink-2 truncate mt-0.5">{{ $page.props.auth.user.email }}</span>
 </div>
 <div class="py-1">
 <Link 
 :href="route('profile.edit')" 
 @click="isDropdownOpen = false" 
 class="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-gray-700 dark:text-ink-2 bg-paper-2 dark:bg-paper-2-dark transition"
 >
 <Icon icon="solar:user-bold-duotone" class="w-4 h-4 text-blue-500" />
 <span>Edit Profil</span>
 </Link>
 <Link 
 v-if="$page.props.auth.role === 'superadmin' || $page.props.auth.role === 'admin'" 
 :href="route('settings.users.index')" 
 @click="isDropdownOpen = false" 
 class="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-gray-700 dark:text-ink-2 bg-paper-2 dark:bg-paper-2-dark transition"
 >
 <Icon icon="solar:settings-bold-duotone" class="w-4 h-4 text-indigo-500" />
 <span>Pengaturan Sistem</span>
 </Link>
 </div>
 <div class="py-1">
 <button 
 @click="logout" 
 class="flex items-center justify-between w-full px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition"
 >
 <span>Keluar Aplikasi</span>
 <Icon icon="solar:power-bold-duotone" class="w-4 h-4" />
 </button>
 </div>
 </div>

 <!-- Invisible click-outside backdrop -->
 <div v-if="isDropdownOpen" class="fixed inset-0 z-40" @click="isDropdownOpen = false"></div>
 </div>

 </div>
 </div>
 </nav>
</template>
