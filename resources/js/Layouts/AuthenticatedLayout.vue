<script setup>
import Navbar from "@/Layouts/Partials/Navbar.vue";
import Sidebar from "@/Layouts/Partials/Sidebar.vue";
import Footer from "@/Layouts/Partials/Footer.vue";
import { ref, onMounted, onUnmounted } from "vue";
import { eventBus } from "@/utils/eventBus";

const isCollapsed = ref(JSON.parse(localStorage.getItem("sidebarCollapsed") || "false"));

const handleSidebar = (state) => {
 isCollapsed.value = state;
};

onMounted(() => {
 eventBus.on('toggle-sidebar', handleSidebar);
 
 // Set theme on mount
 const isDark = localStorage.getItem('darkMode') === 'true';
 document.documentElement.classList.toggle('dark', isDark);
});

onUnmounted(() => {
 eventBus.off('toggle-sidebar', handleSidebar);
});
</script>

<template>
 <div class="min-h-screen flex flex-col" :style="{ backgroundColor: 'var(--color-paper)', color: 'var(--color-ink)' }">
 <Navbar />
 
 <div class="flex flex-1 pt-16">
 <Sidebar />
 
 <div 
 class="flex flex-col flex-1 duration-300 transition-all"
 :class="isCollapsed ? 'pl-16' : 'pl-64'"
 >
 <main class="flex-1 p-6 sm:p-8">
 <slot />
 </main>
 
 <Footer />
 </div>
 </div>
 </div>
</template>
