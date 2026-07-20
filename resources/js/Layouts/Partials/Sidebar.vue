<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { usePage, Link, router } from '@inertiajs/vue3';
import { Icon } from "@iconify/vue";
import { eventBus } from '@/utils/eventBus';

const page = usePage();
const currentUrl = computed(() => page.url);

const isCollapsed = ref(JSON.parse(localStorage.getItem('sidebarCollapsed') || 'false'));
const isDarkMode = ref(false);

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
 isDarkMode.value = localStorage.getItem('darkMode') === 'true';
 
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
  class="fixed top-0 left-0 z-20 flex flex-col flex-shrink-0 h-full pt-16 font-normal transition-[width] duration-300"
  :class="isCollapsed ? 'w-16' : 'w-64'"
  :style="{ backgroundColor: 'var(--color-paper)', borderRight: '1px solid var(--color-rule)' }"
  aria-label="Sidebar"
 >
  <div class="relative flex flex-col flex-1 min-h-0">
   <div class="flex flex-col flex-1 pt-4 overflow-y-auto overflow-x-hidden">
    <div class="flex-1 px-3 space-y-1">
     <ul class="py-2 space-y-2">
      <li v-for="(item, index) in menuItems" :key="item.id || index">
       
       <!-- Menu dropdown -->
       <template v-if="item.children && item.children.length > 0">
        <div 
         @click="toggleDropdown(index)" 
         class="flex items-center py-2.5 px-3 text-sm font-semibold rounded-sm cursor-pointer transition-colors duration-150 group relative"
         :class="isCollapsed ? 'justify-center' : 'justify-between'"
         :style="{
          color: (hasActiveChild(item) || openDropdowns[index]) ? 'var(--color-accent)' : 'var(--color-ink)',
          backgroundColor: (hasActiveChild(item) || openDropdowns[index]) ? 'var(--color-paper-2)' : 'transparent'
         }"
        >
         <div class="flex items-center">
          <Icon 
           class="w-5 h-5 transition duration-75 shrink-0" 
           :style="{ color: (hasActiveChild(item) || openDropdowns[index]) ? 'var(--color-accent)' : 'var(--color-ink-2)' }"
           :icon="item.icon || 'solar:folder-bold-duotone'" 
          />
          <span v-if="!isCollapsed" class="ml-3 whitespace-nowrap">{{ item.title }}</span>
         </div>
         <Icon 
          v-if="!isCollapsed"
          icon="solar:alt-arrow-down-linear"
          class="w-4 h-4 transition-transform duration-200" 
          :style="{ color: 'var(--color-ink-2)' }"
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
           class="flex items-center py-2 px-3 text-[13px] font-semibold border-l-[1.5px] border-dashed transition-colors duration-150 rounded-r-xl"
           :style="{
            borderColor: isActive(child.route) ? 'var(--color-accent)' : 'var(--color-rule)',
            backgroundColor: isActive(child.route) ? 'var(--color-paper-2)' : 'transparent',
            color: isActive(child.route) ? 'var(--color-accent)' : 'var(--color-ink-2)'
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
         class="flex items-center py-2.5 px-3 text-sm font-semibold rounded-sm transition-colors duration-150 group relative border-l-[1.5px]"
         :class="isCollapsed ? 'justify-center' : ''"
         :style="{
          borderColor: isActive(item.route) ? 'var(--color-accent)' : 'transparent',
          color: isActive(item.route) ? '#fff' : 'var(--color-ink)',
          backgroundColor: isActive(item.route) ? 'var(--color-accent)' : 'transparent'
         }"
        >
         <Icon 
          class="w-5 h-5 transition duration-75 shrink-0" 
          :style="{ color: isActive(item.route) ? '#fff' : 'var(--color-ink-2)' }"
          :icon="item.icon || 'solar:widget-bold-duotone'" 
         />
         <span v-if="!isCollapsed" class="ml-3 whitespace-nowrap">{{ item.title }}</span>
        </Link>
       </template>

      </li>
     </ul>
    </div>
    <!-- Sidebar footer branding -->
    <div v-if="!isCollapsed" class="px-3 py-3 border-t" :style="{ borderColor: 'var(--color-rule)' }">
     <div class="flex items-center gap-2 px-2">
      <div class="w-6 h-6 rounded flex items-center justify-center text-[9px] font-black" style="background-color: var(--color-accent); color: var(--color-accent-ink);">SK</div>
      <span class="text-[10px] font-mono tracking-wider" style="color: var(--color-ink-2);">SIKAJIAN v1.0</span>
     </div>
    </div>
   </div>
  </div>
 </aside>
</template>
