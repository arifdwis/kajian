<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { usePage, Link, router } from '@inertiajs/vue3';
import { Icon } from "@iconify/vue";
import { eventBus } from '@/utils/eventBus';

const page = usePage();
const currentUrl = computed(() => page.url);

const isCollapsed = ref(JSON.parse(localStorage.getItem('sidebarCollapsed') || 'false'));

const menuItems = computed(() => {
 return page.props.auth?.menu || [];
});

const openDropdowns = ref({});

const isActive = (routeName) => {
 if (!routeName) return false;
 if (routeName.startsWith('/')) {
 const normalizedRoute = routeName.replace(/\/$/, '');
 const normalizedCurrentUrl = currentUrl.value.split('?')[0].replace(/\/$/, '');
 return normalizedCurrentUrl === normalizedRoute || normalizedCurrentUrl.startsWith(normalizedRoute + '/');
 }
 try {
 return route().current(routeName + '*');
 } catch (e) {
 return false;
 }
};

const hasActiveChild = (item) => {
 if (!item.children) return false;
 return item.children.some(child => isActive(child.route));
};

const toggleDropdown = (index) => {
 if (isCollapsed.value) return; 
 openDropdowns.value[index] = !openDropdowns.value[index];
};

const getHref = (routeName) => {
 if (!routeName) return '#';
 if (routeName.startsWith('/')) return routeName;
 try {
 return route(routeName);
 } catch (e) {
 if (import.meta.env.DEV) console.warn('Invalid route:', routeName);
 return '#';
 }
};

const handleSidebar = (state) => {
 isCollapsed.value = state;
};

onMounted(() => {
 eventBus.on('toggle-sidebar', handleSidebar);
 
 if (menuItems.value && Array.isArray(menuItems.value)) {
 menuItems.value.forEach((item, index) => {
 if (item && item.children && hasActiveChild(item)) {
 openDropdowns.value[index] = true;
 }
 });
 }
});

onUnmounted(() => {
 eventBus.off('toggle-sidebar', handleSidebar);
});
</script>

<template>
 <aside 
 class="fixed top-0 left-0 z-20 flex flex-col flex-shrink-0 h-full pt-16 font-normal duration-300 transition-all bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700" 
 :class="isCollapsed ? 'w-16' : 'w-64'"
 aria-label="Sidebar"
 >
 <div class="relative flex flex-col flex-1 min-h-0 pt-0">
 <div class="flex flex-col flex-1 pt-4 overflow-y-auto overflow-x-hidden">
 <div class="flex-1 px-3 space-y-1 divide-dashed divide-y divide-gray-200 dark:divide-gray-700">
 <ul class="py-2 space-y-2">
 <li v-for="(item, index) in menuItems" :key="item.id || index">
 
 <!-- Menu dropdown -->
 <template v-if="item.children && item.children.length > 0">
 <div 
 @click="toggleDropdown(index)" 
 class="flex items-center py-2.5 px-3 text-sm font-semibold rounded-sm cursor-pointer transition-all duration-150 group relative"
 :class="[
 isCollapsed ? 'justify-center' : 'justify-between',
 {
 'bg-paper-2 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400': hasActiveChild(item) || openDropdowns[index],
 'bg-paper-2 dark:bg-paper-2-dark/50 text-ink dark:text-ink-dark': !hasActiveChild(item) && !openDropdowns[index],
 }
 ]"
 >
 <div class="flex items-center">
 <Icon 
 class="w-5 h-5 transition duration-75 shrink-0" 
 :class="{
 'text-blue-600 dark:text-blue-400': hasActiveChild(item) || openDropdowns[index],
 'text-ink-2 group-hover:text-gray-700 dark:group-hover:text-white': !hasActiveChild(item) && !openDropdowns[index],
 }" 
 :icon="item.icon || 'solar:folder-bold-duotone'" 
 />
 <span v-if="!isCollapsed" class="ml-3 whitespace-nowrap">{{ item.title }}</span>
 </div>
 <Icon 
 v-if="!isCollapsed"
 icon="solar:alt-arrow-down-linear"
 class="w-4 h-4 transition-transform duration-200" 
 :class="{ 'rotate-180': openDropdowns[index] }"
 />
 </div>
 
 <!-- Dropdown children -->
 <ul 
 v-if="!isCollapsed"
 v-show="openDropdowns[index]" 
 class="py-1.5 space-y-1.5 pl-4"
 >
 <li v-for="child in item.children" :key="child.route">
 <Link 
 :href="getHref(child.route)" 
 class="flex items-center py-2 px-3 text-[13px] font-semibold border-l-[1.5px] border-dashed transition-all duration-150 rounded-r-xl"
 :class="{
 'border-blue-600 bg-paper-2/50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400': isActive(child.route),
 'border-rule dark:border-rule-dark hover:border-blue-400 text-gray-600 dark:text-ink-2 hover:text-blue-600 dark:hover:text-blue-400': !isActive(child.route),
 }"
 >
 <span class="whitespace-nowrap">{{ child.title }}</span>
 </Link>
 </li>
 </ul>
 </template>

 <!-- Single Menu Item -->
 <template v-else>
 <Link 
 :href="getHref(item.route)" 
 class="flex items-center py-2.5 px-3 text-sm font-semibold rounded-sm transition-all duration-150 group relative"
 :class="[
 isCollapsed ? 'justify-center' : '',
 {
 'bg-accent text-white ': isActive(item.route),
 'bg-paper-2 dark:bg-paper-2-dark/50 text-ink dark:text-ink-dark': !isActive(item.route),
 }
 ]"
 >
 <Icon 
 class="w-5 h-5 transition duration-75 shrink-0" 
 :class="{
 'text-white': isActive(item.route),
 'text-ink-2 group-hover:text-gray-700 dark:group-hover:text-white': !isActive(item.route),
 }" 
 :icon="item.icon || 'solar:widget-bold-duotone'" 
 />
 <span v-if="!isCollapsed" class="ml-3 whitespace-nowrap">{{ item.title }}</span>
 </Link>
 </template>

 </li>
 </ul>
 </div>
 </div>
 </div>
 </aside>
</template>
