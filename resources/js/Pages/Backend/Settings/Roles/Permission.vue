<script setup>
import { ref, computed } from 'vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { useToast } from 'vue-toastification';

const toast = useToast();

const props = defineProps({
 role: Object,
 permissions: Array,
 rolePermissions: Array,
});

const form = useForm({
 permissions: [...props.rolePermissions],
});

const searchQuery = ref('');

const selectAll = () => {
 form.permissions = props.permissions.map(p => p.id);
};

const deselectAll = () => {
 form.permissions = [];
};

const submit = () => {
 form.put(route('settings.roles.permission.update', props.role.id), {
  onSuccess: () => toast.success('Hak akses role berhasil disinkronkan.'),
  onError: (errors) => {
  Object.values(errors).forEach(err => toast.error(err));
  }
 });
};

const groupedPermissions = computed(() => {
 const groups = {};
 props.permissions.forEach(p => {
  const parts = p.name.split('.');
  const groupName = parts[0] || 'Lainnya';
  if (!groups[groupName]) groups[groupName] = [];
  groups[groupName].push(p);
 });
 return groups;
});

const filteredGroups = computed(() => {
 if (!searchQuery.value) return groupedPermissions.value;
 const q = searchQuery.value.toLowerCase();
 const filtered = {};
 Object.entries(groupedPermissions.value).forEach(([group, perms]) => {
  const matched = perms.filter(p => p.name.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q) || group.toLowerCase().includes(q));
  if (matched.length > 0) filtered[group] = matched;
 });
 return filtered;
});

const selectedCount = computed(() => form.permissions.length);
const totalCount = computed(() => props.permissions.length);
const progress = computed(() => totalCount.value > 0 ? Math.round((selectedCount.value / totalCount.value) * 100) : 0);

const groupSelectedCount = (groupName) => {
 const perms = groupedPermissions.value[groupName] || [];
 return perms.filter(p => form.permissions.includes(p.id)).length;
};

const toggleGroup = (groupName) => {
 const perms = groupedPermissions.value[groupName];
 const allSelected = perms.every(p => form.permissions.includes(p.id));
 perms.forEach(p => {
  if (allSelected) {
  const idx = form.permissions.indexOf(p.id);
  if (idx > -1) form.permissions.splice(idx, 1);
  } else {
  if (!form.permissions.includes(p.id)) form.permissions.push(p.id);
  }
 });
};

const togglePerm = (id) => {
 const idx = form.permissions.indexOf(id);
 if (idx > -1) {
  form.permissions.splice(idx, 1);
 } else {
  form.permissions.push(id);
 }
};
</script>

<template>
 <Head :title="'Akses Role: ' + role.name" />

 <AuthenticatedLayout>
 <div class="space-y-4">
  <!-- Header -->
  <div class="bg-paper dark:bg-gray-800 p-5 rounded-card border border-gray-100 dark:border-gray-700">
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
   <div class="flex items-center gap-3">
   <Link :href="route('settings.roles.index')" class="p-2 bg-gray-50 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-sm transition-all">
    <Icon icon="solar:arrow-left-outline" class="w-5 h-5" />
   </Link>
   <div>
    <h3 class="text-lg font-bold text-gray-900 dark:text-white">Hak Akses: {{ role.name }}</h3>
    <div class="flex items-center gap-3 mt-1">
     <span class="text-[11px] text-gray-500">{{ selectedCount }} / {{ totalCount }} permission</span>
     <span class="text-[11px] text-gray-300 dark:text-gray-600">•</span>
     <span class="text-[11px] font-semibold" :class="progress === 100 ? 'text-green-500' : 'text-blue-500'">{{ progress }}%</span>
    </div>
   </div>
   </div>
   <div class="flex gap-2">
   <button @click="selectAll" class="px-3 py-1.5 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 text-[11px] font-semibold rounded-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Pilih Semua</button>
   <button @click="deselectAll" class="px-3 py-1.5 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 text-[11px] font-semibold rounded-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Kosongkan</button>
   </div>
  </div>
  <!-- Progress bar -->
  <div class="mt-3 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
   <div class="h-full rounded-full transition-all duration-300" :class="progress === 100 ? 'bg-green-500' : 'bg-blue-500'" :style="{ width: progress + '%' }" />
  </div>
  </div>

  <!-- Search -->
  <div class="relative">
  <Icon icon="solar:magnifer-linear" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
  <input
   v-model="searchQuery"
   type="text"
   placeholder="Cari permission..."
   class="w-full pl-9 pr-4 py-2 text-xs rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20"
  />
  </div>

  <!-- Permission groups -->
  <form @submit.prevent="submit">
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 items-start">
   <div
   v-for="(perms, groupName) in filteredGroups"
   :key="groupName"
   class="bg-paper dark:bg-gray-800 rounded-card border border-gray-100 dark:border-gray-700 overflow-hidden"
   >
   <!-- Group header -->
   <div class="flex items-center justify-between px-4 py-2.5 bg-gray-50/50 dark:bg-gray-750 border-b border-gray-100 dark:border-gray-700">
    <div class="flex items-center gap-2">
    <span class="text-[11px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider capitalize">{{ groupName }}</span>
    <span class="text-[10px] px-1.5 py-0.5 rounded-full font-semibold"
     :class="groupSelectedCount(groupName) === perms.length ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'">
     {{ groupSelectedCount(groupName) }}/{{ perms.length }}
    </span>
    </div>
    <button
     type="button"
     @click="toggleGroup(groupName)"
     class="text-[10px] font-semibold px-2 py-0.5 rounded transition-colors"
     :class="groupSelectedCount(groupName) === perms.length ? 'text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/20' : 'text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20'"
    >
     {{ groupSelectedCount(groupName) === perms.length ? '✓ Terpilih' : 'Pilih' }}
    </button>
   </div>

   <!-- Permission items -->
   <div class="p-2 flex flex-wrap gap-1.5">
    <button
     v-for="p in perms"
     :key="p.id"
     type="button"
     @click="togglePerm(p.id)"
     class="inline-flex items-center gap-1 px-2 py-1 rounded text-[11px] border transition-all cursor-pointer select-none"
     :class="form.permissions.includes(p.id)
     ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 shadow-sm'
     : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-200 dark:hover:border-gray-600'"
    >
     <span class="w-3 h-3 rounded-sm border flex items-center justify-center shrink-0 transition-colors"
     :class="form.permissions.includes(p.id) ? 'bg-blue-500 border-blue-500' : 'border-gray-300 dark:border-gray-600'">
     <Icon v-if="form.permissions.includes(p.id)" icon="solar:check-read-bold" class="w-2.5 h-2.5 text-white" />
     </span>
     <span class="font-medium">{{ p.name }}</span>
    </button>
   </div>
   </div>
  </div>

  <!-- Empty state -->
  <div v-if="Object.keys(filteredGroups).length === 0" class="text-center py-12 text-gray-400 text-sm">
   Tidak ditemukan permission yang cocok.
  </div>

  <!-- Submit bar -->
  <div class="flex items-center justify-between gap-3 mt-4 bg-paper dark:bg-gray-800 p-4 rounded-card border border-gray-100 dark:border-gray-700 sticky bottom-0">
   <span class="text-[11px] text-gray-400">{{ selectedCount }} permission akan disimpan</span>
   <div class="flex gap-2">
   <Link :href="route('settings.roles.index')" class="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-xs font-semibold rounded-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
    Batal
   </Link>
   <button
    type="submit"
    :disabled="form.processing"
    class="px-5 py-2 bg-accent text-accent-ink text-xs font-bold rounded-sm transition-all inline-flex items-center gap-1.5"
   >
    <Icon v-if="form.processing" icon="svg-spinners:ring-resize" class="w-4 h-4 animate-spin" />
    <Icon v-else icon="solar:disk-bold" class="w-4 h-4" />
    Simpan
   </button>
   </div>
  </div>
  </form>
 </div>
 </AuthenticatedLayout>
</template>
