import { ref, computed, resolveComponent, unref, withCtx, createVNode, withDirectives, withKeys, vModelText, openBlock, createBlock, createTextVNode, createCommentVNode, toDisplayString, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { Head, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-Cmsx4Vff.js";
import { _ as _sfc_main$2 } from "./Pagination-DE6AvrVK.js";
import { _ as _sfc_main$3 } from "./ConfirmModal-C43yiw5v.js";
import { useToast } from "vue-toastification";
import axios from "axios";
import "flowbite-vue";
import "./ApplicationLogo-CmsQkCHn.js";
import "@iconify/vue";
import "mitt";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    logs: Object,
    filters: Object
  },
  setup(__props) {
    const toast = useToast();
    const props = __props;
    const search = ref(props.filters.search || "");
    const filterAction = ref(props.filters.action || "");
    const filterModel = ref(props.filters.model_type || "");
    const filterDateFrom = ref(props.filters.date_from || "");
    const filterDateTo = ref(props.filters.date_to || "");
    const activeLog = ref(null);
    const showModal = ref(false);
    const hasActiveFilters = computed(() => {
      return search.value || filterAction.value || filterModel.value || filterDateFrom.value || filterDateTo.value;
    });
    const applyFilters = () => {
      const params = {};
      if (search.value) params.search = search.value;
      if (filterAction.value) params.action = filterAction.value;
      if (filterModel.value) params.model_type = filterModel.value;
      if (filterDateFrom.value) params.date_from = filterDateFrom.value;
      if (filterDateTo.value) params.date_to = filterDateTo.value;
      router.get(route("settings.log-activity.index"), params, {
        preserveState: true,
        preserveScroll: true
      });
    };
    const handleSearch = () => applyFilters();
    const clearFilters = () => {
      search.value = "";
      filterAction.value = "";
      filterModel.value = "";
      filterDateFrom.value = "";
      filterDateTo.value = "";
      router.get(route("settings.log-activity.index"), {}, {
        preserveState: true,
        preserveScroll: true
      });
    };
    const setQuickDate = (range) => {
      const today = /* @__PURE__ */ new Date();
      const fmt = (d) => d.toISOString().split("T")[0];
      if (range === "today") {
        filterDateFrom.value = fmt(today);
        filterDateTo.value = fmt(today);
      } else if (range === "yesterday") {
        const y = new Date(today);
        y.setDate(y.getDate() - 1);
        filterDateFrom.value = fmt(y);
        filterDateTo.value = fmt(y);
      } else if (range === "this_week") {
        const first = new Date(today);
        first.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1));
        filterDateFrom.value = fmt(first);
        filterDateTo.value = fmt(today);
      } else if (range === "this_month") {
        const first = new Date(today.getFullYear(), today.getMonth(), 1);
        filterDateFrom.value = fmt(first);
        filterDateTo.value = fmt(today);
      } else if (range === "this_year") {
        const first = new Date(today.getFullYear(), 0, 1);
        filterDateFrom.value = fmt(first);
        filterDateTo.value = fmt(today);
      }
      applyFilters();
    };
    const modelLabels = {
      "App\\Models\\Kajian": "Kajian",
      "App\\Models\\User": "User",
      "App\\Models\\Role": "Role",
      "App\\Models\\Permission": "Permission",
      "App\\Models\\Opd": "OPD",
      "App\\Models\\Menu": "Menu",
      "App\\Models\\Bidang": "Bidang",
      "App\\Models\\Tahun": "Tahun",
      "App\\Models\\JenisKajian": "Jenis Kajian",
      "App\\Models\\Keyword": "Kata Kunci",
      "App\\Models\\KajianFile": "File Kajian",
      "App\\Models\\KajianVersion": "Versi Kajian",
      "App\\Models\\KajianGallery": "Galeri Kajian",
      "App\\Models\\Notifikasi": "Notifikasi"
    };
    const modelIcons = {
      "App\\Models\\Kajian": "solar:document-text-bold",
      "App\\Models\\User": "solar:user-bold",
      "App\\Models\\Role": "solar:shield-user-bold",
      "App\\Models\\Permission": "solar:shield-check-bold",
      "App\\Models\\Opd": "solar:building-bold",
      "App\\Models\\Menu": "solar:menu-dots-bold",
      "App\\Models\\Bidang": "solar:layers-bold",
      "App\\Models\\Tahun": "solar:calendar-bold",
      "App\\Models\\JenisKajian": "solar:bookmark-bold",
      "App\\Models\\Keyword": "solar:magnifer-bold",
      "App\\Models\\KajianFile": "solar:file-bold",
      "App\\Models\\KajianVersion": "solar:history-bold",
      "App\\Models\\KajianGallery": "solar:gallery-bold",
      "App\\Models\\Notifikasi": "solar:bell-bold"
    };
    const modelColors = {
      "App\\Models\\Kajian": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      "App\\Models\\User": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
      "App\\Models\\Role": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
      "App\\Models\\Permission": "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
      "App\\Models\\Opd": "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
      "App\\Models\\Menu": "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
      "App\\Models\\Bidang": "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
      "App\\Models\\Tahun": "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
      "App\\Models\\JenisKajian": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
      "App\\Models\\Keyword": "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
      "App\\Models\\KajianFile": "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400",
      "App\\Models\\KajianVersion": "bg-lime-100 text-lime-700 dark:bg-lime-900/30 dark:text-lime-400",
      "App\\Models\\KajianGallery": "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
      "App\\Models\\Notifikasi": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
    };
    const getModelLabel = (type) => modelLabels[type] || (type == null ? void 0 : type.split("\\").pop()) || "-";
    const getModelIcon = (type) => modelIcons[type] || "solar:hashtag-bold";
    const getModelColor = (type) => modelColors[type] || "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400";
    const actionLabels = {
      create: "Dibuat",
      update: "Diperbarui",
      delete: "Dihapus"
    };
    const actionColors = {
      create: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
      update: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      delete: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
    };
    const getRecordName = (log) => {
      const nv = log.new_values || log.old_values || {};
      return nv.name || nv.judul || nv.nama || nv.title || null;
    };
    const formatJson = (json) => {
      if (!json) return null;
      try {
        const obj = typeof json === "string" ? JSON.parse(json) : json;
        return obj;
      } catch (e) {
        return null;
      }
    };
    const formatCellValue = (key, val) => {
      if (val === null || val === void 0) return "-";
      if (key === "password") return "***";
      if (typeof val === "boolean") return val ? "Ya" : "Tidak";
      if (Array.isArray(val)) return val.length ? val.join(", ") : "-";
      if (typeof val === "string" && val.length > 80) return val.substring(0, 80) + "...";
      return String(val);
    };
    const getDiffFields = (oldVals, newVals) => {
      const oldObj = formatJson(oldVals);
      const newObj = formatJson(newVals);
      if (!oldObj && !newObj) return [];
      const fields = [];
      const allKeys = /* @__PURE__ */ new Set([...Object.keys(oldObj || {}), ...Object.keys(newObj || {})]);
      for (const key of allKeys) {
        const ov = (oldObj == null ? void 0 : oldObj[key]) ?? null;
        const nv = (newObj == null ? void 0 : newObj[key]) ?? null;
        if (JSON.stringify(ov) !== JSON.stringify(nv)) {
          fields.push({ key, old: ov, new: nv });
        }
      }
      return fields;
    };
    const skippedFields = ["updated_at", "created_at", "updated_by", "created_by"];
    const viewDetails = (id) => {
      axios.get(route("settings.log-activity.show", id)).then((res) => {
        activeLog.value = res.data;
        showModal.value = true;
      }).catch((err) => {
        toast.error("Gagal mengambil data log detail.");
        console.error(err);
      });
    };
    const showConfirmDelete = ref(false);
    const deleteTargetId = ref(null);
    const confirmDeleteLog = (id) => {
      deleteTargetId.value = id;
      showConfirmDelete.value = true;
    };
    const executeDeleteLog = () => {
      router.delete(route("settings.log-activity.destroy", deleteTargetId.value), {
        onSuccess: () => {
          showConfirmDelete.value = false;
        },
        onError: (error) => toast.error("Gagal menghapus log.")
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = resolveComponent("Icon");
      const _component_SearchSelect = resolveComponent("SearchSelect");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Audit Log Aktivitas" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<div class="space-y-6 w-full"${_scopeId}><div class="bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700"${_scopeId}><h3 class="text-xl font-bold text-gray-900 dark:text-white"${_scopeId}>Audit Trail &amp; Log Aktivitas</h3><p class="text-xs text-gray-500 mt-1"${_scopeId}>Daftar rekaman jejak audit operasi sistem yang dilakukan oleh pengguna terotentikasi.</p></div><div class="bg-paper dark:bg-gray-800 rounded-card border border-gray-100 dark:border-gray-700 p-6 space-y-4"${_scopeId}><div class="grid grid-cols-1 md:grid-cols-4 gap-3"${_scopeId}><div class="relative"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:magnifer-linear",
              class: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"
            }, null, _parent2, _scopeId));
            _push2(`<input type="text"${ssrRenderAttr("value", search.value)} placeholder="Cari..." class="w-full text-xs pl-9 pr-3 py-2.5 rounded-sm border border-gray-300 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white"${_scopeId}></div>`);
            _push2(ssrRenderComponent(_component_SearchSelect, {
              modelValue: filterAction.value,
              "onUpdate:modelValue": ($event) => filterAction.value = $event,
              options: [
                { label: "Semua Aksi", value: "" },
                { label: "Dibuat", value: "create" },
                { label: "Diperbarui", value: "update" },
                { label: "Dihapus", value: "delete" }
              ],
              optionLabel: "label",
              optionValue: "value",
              placeholder: "Semua Aksi",
              onChange: applyFilters
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_SearchSelect, {
              modelValue: filterModel.value,
              "onUpdate:modelValue": ($event) => filterModel.value = $event,
              options: [
                { label: "Semua Objek", value: "" },
                ...Object.entries(modelLabels).map(([k, v]) => ({ label: v, value: k }))
              ],
              optionLabel: "label",
              optionValue: "value",
              placeholder: "Semua Objek",
              onChange: applyFilters
            }, null, _parent2, _scopeId));
            if (hasActiveFilters.value) {
              _push2(`<button class="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30 rounded-sm transition-colors duration-150"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                icon: "solar:close-circle-bold",
                class: "w-4 h-4"
              }, null, _parent2, _scopeId));
              _push2(` Reset Filter </button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex flex-col md:flex-row md:items-center gap-3"${_scopeId}><div class="flex flex-wrap gap-1.5"${_scopeId}><button class="${ssrRenderClass([filterDateFrom.value === filterDateTo.value && filterDateFrom.value ? "bg-accent text-accent-ink border-accent" : "border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800", "px-3 py-1.5 text-[11px] font-semibold rounded-full border transition-colors duration-150"])}"${_scopeId}> Hari Ini </button><button class="${ssrRenderClass([filterDateFrom.value !== filterDateTo.value && filterDateFrom.value ? "bg-accent text-accent-ink border-accent" : "border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800", "px-3 py-1.5 text-[11px] font-semibold rounded-full border transition-colors duration-150"])}"${_scopeId}> Kemarin </button><button class="${ssrRenderClass([filterDateFrom.value !== filterDateTo.value && filterDateFrom.value ? "bg-accent text-accent-ink border-accent" : "border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800", "px-3 py-1.5 text-[11px] font-semibold rounded-full border transition-colors duration-150"])}"${_scopeId}> Minggu Ini </button><button class="${ssrRenderClass([filterDateFrom.value !== filterDateTo.value && filterDateFrom.value ? "bg-accent text-accent-ink border-accent" : "border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800", "px-3 py-1.5 text-[11px] font-semibold rounded-full border transition-colors duration-150"])}"${_scopeId}> Bulan Ini </button><button class="${ssrRenderClass([filterDateFrom.value !== filterDateTo.value && filterDateFrom.value ? "bg-accent text-accent-ink border-accent" : "border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800", "px-3 py-1.5 text-[11px] font-semibold rounded-full border transition-colors duration-150"])}"${_scopeId}> Tahun Ini </button></div><div class="hidden md:block w-px h-6 bg-gray-200 dark:bg-gray-700"${_scopeId}></div><div class="flex items-center gap-2"${_scopeId}><div class="relative"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:calendar-bold",
              class: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5"
            }, null, _parent2, _scopeId));
            _push2(`<input type="date"${ssrRenderAttr("value", filterDateFrom.value)} class="text-xs pl-9 pr-3 py-2 rounded-sm border border-gray-300 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white"${_scopeId}></div><span class="text-gray-400 text-xs"${_scopeId}>—</span><div class="relative"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:calendar-bold",
              class: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5"
            }, null, _parent2, _scopeId));
            _push2(`<input type="date"${ssrRenderAttr("value", filterDateTo.value)} class="text-xs pl-9 pr-3 py-2 rounded-sm border border-gray-300 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white"${_scopeId}></div></div></div>`);
            if (hasActiveFilters.value) {
              _push2(`<div class="flex items-center gap-2 text-[11px] text-gray-400"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                icon: "solar:filter-bold",
                class: "w-3 h-3"
              }, null, _parent2, _scopeId));
              _push2(` Filter aktif: `);
              if (filterAction.value) {
                _push2(`<span class="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full font-semibold"${_scopeId}>${ssrInterpolate(actionLabels[filterAction.value] || filterAction.value)} <button class="hover:text-blue-800"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_Icon, {
                  icon: "solar:close-circle-bold",
                  class: "w-3 h-3"
                }, null, _parent2, _scopeId));
                _push2(`</button></span>`);
              } else {
                _push2(`<!---->`);
              }
              if (filterModel.value) {
                _push2(`<span class="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-full font-semibold"${_scopeId}>${ssrInterpolate(getModelLabel(filterModel.value))} <button class="hover:text-purple-800"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_Icon, {
                  icon: "solar:close-circle-bold",
                  class: "w-3 h-3"
                }, null, _parent2, _scopeId));
                _push2(`</button></span>`);
              } else {
                _push2(`<!---->`);
              }
              if (filterDateFrom.value || filterDateTo.value) {
                _push2(`<span class="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-full font-semibold"${_scopeId}>${ssrInterpolate(filterDateFrom.value || "...")} — ${ssrInterpolate(filterDateTo.value || "...")} <button class="hover:text-amber-800"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_Icon, {
                  icon: "solar:close-circle-bold",
                  class: "w-3 h-3"
                }, null, _parent2, _scopeId));
                _push2(`</button></span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="bg-paper dark:bg-gray-800 rounded-card border border-gray-100 dark:border-gray-700 overflow-hidden"${_scopeId}><div class="overflow-x-auto"${_scopeId}><table class="w-full text-left text-sm"${_scopeId}><thead class="bg-gray-50 dark:bg-gray-900/50 text-gray-400 text-xs font-semibold uppercase tracking-wider border-b border-gray-100 dark:border-gray-700"${_scopeId}><tr${_scopeId}><th class="px-6 py-4"${_scopeId}>Waktu</th><th class="px-6 py-4"${_scopeId}>Pengguna</th><th class="px-6 py-4"${_scopeId}>Objek</th><th class="px-6 py-4"${_scopeId}>Aksi</th><th class="px-6 py-4"${_scopeId}>Rincian</th><th class="px-6 py-4 text-right"${_scopeId}>Aksi</th></tr></thead><tbody class="divide-y divide-gray-200 dark:divide-gray-700"${_scopeId}>`);
            if (__props.logs.data.length === 0) {
              _push2(`<tr${_scopeId}><td colspan="6" class="px-6 py-8 text-center text-gray-400"${_scopeId}> Tidak ada catatan log aktivitas ditemukan. </td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(__props.logs.data, (item) => {
              var _a2;
              _push2(`<tr class="hover:bg-gray-50/50 dark:hover:bg-gray-800 transition-colors"${_scopeId}><td class="px-6 py-4 text-xs font-semibold text-gray-500 whitespace-nowrap"${_scopeId}>${ssrInterpolate(_ctx.$formatDateTime(item.created_at))}</td><td class="px-6 py-4 text-gray-900 dark:text-white font-semibold text-xs"${_scopeId}>${ssrInterpolate(((_a2 = item.user) == null ? void 0 : _a2.name) || "Sistem / Guest")}</td><td class="px-6 py-4"${_scopeId}><span class="${ssrRenderClass([getModelColor(item.model_type), "inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-bold rounded-full"])}"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                icon: getModelIcon(item.model_type),
                class: "w-3 h-3"
              }, null, _parent2, _scopeId));
              _push2(` ${ssrInterpolate(getModelLabel(item.model_type))}</span></td><td class="px-6 py-4"${_scopeId}><span class="${ssrRenderClass([actionColors[item.action], "inline-flex items-center px-2 py-0.5 text-[10px] font-bold rounded-full"])}"${_scopeId}>${ssrInterpolate(actionLabels[item.action] || item.action)}</span></td><td class="px-6 py-4 text-xs text-gray-500 max-w-[200px] truncate"${_scopeId}>${ssrInterpolate(getRecordName(item) || "#" + item.model_id)}</td><td class="px-6 py-4 text-right"${_scopeId}><div class="flex items-center justify-end gap-2"${_scopeId}><button class="p-2 bg-gray-50 hover:bg-paper-2 text-gray-600 hover:text-blue-600 dark:bg-gray-600 dark:text-gray-300 rounded-sm transition-colors duration-150" title="Detail Log"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                icon: "solar:eye-bold",
                class: "w-4 h-4"
              }, null, _parent2, _scopeId));
              _push2(`</button><button class="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-sm transition-colors duration-150" title="Hapus"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                icon: "solar:trash-bin-trash-bold",
                class: "w-4 h-4"
              }, null, _parent2, _scopeId));
              _push2(`</button></div></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div><div class="flex flex-col sm:flex-row justify-between items-center gap-4 px-6 py-4 border-t border-gray-100 dark:border-gray-700"${_scopeId}><p class="text-xs text-gray-400"${_scopeId}> Menampilkan ${ssrInterpolate(__props.logs.from || 0)} sampai ${ssrInterpolate(__props.logs.to || 0)} dari ${ssrInterpolate(__props.logs.total)} data </p>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              links: __props.logs.links
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
            if (showModal.value) {
              _push2(`<div class="fixed inset-0 z-50 flex items-center justify-center p-4"${_scopeId}><div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"${_scopeId}></div><div class="relative w-full max-w-2xl bg-paper dark:bg-paper-dark border border-rule dark:border-rule-dark rounded-card p-6 space-y-4 max-h-[85vh] overflow-y-auto"${_scopeId}><div class="flex justify-between items-center border-b dark:border-slate-800 pb-3"${_scopeId}><h4 class="font-bold text-slate-900 dark:text-white"${_scopeId}> Rincian Jejak Audit Log </h4><button class="text-slate-400 hover:text-slate-600"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                icon: "solar:close-square-linear",
                class: "w-5 h-5"
              }, null, _parent2, _scopeId));
              _push2(`</button></div>`);
              if (activeLog.value) {
                _push2(`<div class="space-y-4 text-xs"${_scopeId}><div class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700"${_scopeId}><span class="${ssrRenderClass([getModelColor(activeLog.value.model_type), "inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold rounded-full"])}"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_Icon, {
                  icon: getModelIcon(activeLog.value.model_type),
                  class: "w-3.5 h-3.5"
                }, null, _parent2, _scopeId));
                _push2(` ${ssrInterpolate(getModelLabel(activeLog.value.model_type))}</span><span class="text-gray-400"${_scopeId}>#${ssrInterpolate(activeLog.value.model_id)}</span>`);
                if (getRecordName(activeLog.value)) {
                  _push2(`<span class="text-gray-900 dark:text-white font-semibold truncate"${_scopeId}> — ${ssrInterpolate(getRecordName(activeLog.value))}</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<span class="${ssrRenderClass([actionColors[activeLog.value.action], "ml-auto inline-flex items-center px-2 py-0.5 text-[10px] font-bold rounded-full"])}"${_scopeId}>${ssrInterpolate(actionLabels[activeLog.value.action] || activeLog.value.action)}</span></div><div class="grid grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><span class="text-[9px] text-slate-400 font-bold uppercase tracking-wider block"${_scopeId}>Waktu Operasi</span><span class="text-slate-900 dark:text-slate-200 mt-1 block font-semibold"${_scopeId}>${ssrInterpolate(_ctx.$formatDateTime(activeLog.value.created_at))}</span></div><div${_scopeId}><span class="text-[9px] text-slate-400 font-bold uppercase tracking-wider block"${_scopeId}>Nama Pengguna</span><span class="text-slate-900 dark:text-slate-200 mt-1 block font-semibold"${_scopeId}>${ssrInterpolate(((_a = activeLog.value.user) == null ? void 0 : _a.name) || "Sistem / Guest")}</span></div><div${_scopeId}><span class="text-[9px] text-slate-400 font-bold uppercase tracking-wider block"${_scopeId}>IP Address</span><span class="text-slate-900 dark:text-slate-200 mt-1 block font-mono"${_scopeId}>${ssrInterpolate(activeLog.value.ip_address)}</span></div><div${_scopeId}><span class="text-[9px] text-slate-400 font-bold uppercase tracking-wider block"${_scopeId}>Aksi / Operasi</span><span class="text-blue-600 dark:text-blue-400 mt-1 block font-mono font-bold"${_scopeId}>${ssrInterpolate(activeLog.value.action)}</span></div></div><div${_scopeId}><span class="text-[9px] text-slate-400 font-bold uppercase tracking-wider block mb-1"${_scopeId}>User Agent</span><span class="text-slate-600 dark:text-slate-300 block font-light font-mono leading-relaxed bg-paper-2 dark:bg-paper-2-dark p-2.5 rounded-sm border border-rule dark:border-rule-dark text-[10px]"${_scopeId}>${ssrInterpolate(activeLog.value.user_agent)}</span></div>`);
                if (activeLog.value.action === "update") {
                  _push2(`<div${_scopeId}><span class="text-[9px] text-slate-400 font-bold uppercase tracking-wider block mb-2"${_scopeId}>Perubahan Data</span><div class="border dark:border-slate-800 rounded-sm overflow-hidden"${_scopeId}><table class="w-full text-[11px]"${_scopeId}><thead class="bg-gray-50 dark:bg-slate-800"${_scopeId}><tr${_scopeId}><th class="px-3 py-2 text-left font-bold text-slate-500 w-1/4"${_scopeId}>Field</th><th class="px-3 py-2 text-left font-bold text-red-500/80 w-[37.5%]"${_scopeId}>Sebelum</th><th class="px-3 py-2 text-left font-bold text-emerald-600 dark:text-emerald-400 w-[37.5%]"${_scopeId}>Sesudah</th></tr></thead><tbody class="divide-y divide-gray-100 dark:divide-slate-800"${_scopeId}><!--[-->`);
                  ssrRenderList(getDiffFields(activeLog.value.old_values, activeLog.value.new_values).filter((d) => !skippedFields.includes(d.key)), (d) => {
                    _push2(`<tr class="hover:bg-gray-50/50 dark:hover:bg-slate-800/50"${_scopeId}><td class="px-3 py-2 font-mono font-semibold text-slate-700 dark:text-slate-300"${_scopeId}>${ssrInterpolate(d.key)}</td><td class="px-3 py-2 font-mono text-red-500/80 bg-red-50/30 dark:bg-red-900/10"${_scopeId}>${ssrInterpolate(formatCellValue(d.key, d.old))}</td><td class="px-3 py-2 font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50/30 dark:bg-emerald-900/10"${_scopeId}>${ssrInterpolate(formatCellValue(d.key, d.new))}</td></tr>`);
                  });
                  _push2(`<!--]-->`);
                  if (getDiffFields(activeLog.value.old_values, activeLog.value.new_values).filter((d) => !skippedFields.includes(d.key)).length === 0) {
                    _push2(`<tr${_scopeId}><td colspan="3" class="px-3 py-4 text-center text-gray-400 italic"${_scopeId}>Tidak ada perubahan data yang terdeteksi.</td></tr>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</tbody></table></div></div>`);
                } else {
                  _push2(`<!---->`);
                }
                if (activeLog.value.action === "create" || activeLog.value.action === "delete") {
                  _push2(`<div${_scopeId}><span class="text-[9px] text-slate-400 font-bold uppercase tracking-wider block mb-2"${_scopeId}>${ssrInterpolate(activeLog.value.action === "create" ? "Data yang Dibuat" : "Data yang Dihapus")}</span><div class="border dark:border-slate-800 rounded-sm overflow-hidden"${_scopeId}><table class="w-full text-[11px]"${_scopeId}><thead class="bg-gray-50 dark:bg-slate-800"${_scopeId}><tr${_scopeId}><th class="px-3 py-2 text-left font-bold text-slate-500 w-1/3"${_scopeId}>Field</th><th class="px-3 py-2 text-left font-bold text-slate-500 w-2/3"${_scopeId}>Nilai</th></tr></thead><tbody class="divide-y divide-gray-100 dark:divide-slate-800"${_scopeId}><!--[-->`);
                  ssrRenderList(formatJson(activeLog.value.action === "create" ? activeLog.value.new_values : activeLog.value.old_values), (val, key) => {
                    _push2(`<tr class="hover:bg-gray-50/50 dark:hover:bg-slate-800/50"${_scopeId}><td class="px-3 py-2 font-mono font-semibold text-slate-700 dark:text-slate-300"${_scopeId}>${ssrInterpolate(key)}</td><td class="px-3 py-2 font-mono text-slate-600 dark:text-slate-400"${_scopeId}>${ssrInterpolate(formatCellValue(key, val))}</td></tr>`);
                  });
                  _push2(`<!--]--></tbody></table></div></div>`);
                } else {
                  _push2(`<!---->`);
                }
                if (activeLog.value.action !== "update" && activeLog.value.action !== "create" && activeLog.value.action !== "delete") {
                  _push2(`<div${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><span class="text-[9px] text-slate-400 font-bold uppercase tracking-wider block mb-1"${_scopeId}>Nilai Lama (Old Values)</span><pre class="p-3 bg-paper-2 dark:bg-paper-2-dark border dark:border-slate-800 text-slate-700 dark:text-slate-400 font-mono text-[10px] rounded-sm overflow-x-auto max-h-48"${_scopeId}>${ssrInterpolate(formatJson(activeLog.value.old_values) ? JSON.stringify(formatJson(activeLog.value.old_values), null, 2) : "-")}</pre></div><div${_scopeId}><span class="text-[9px] text-slate-400 font-bold uppercase tracking-wider block mb-1"${_scopeId}>Nilai Baru (New Values)</span><pre class="p-3 bg-paper-2 dark:bg-paper-2-dark border dark:border-slate-800 text-slate-700 dark:text-slate-400 font-mono text-[10px] rounded-sm overflow-x-auto max-h-48"${_scopeId}>${ssrInterpolate(formatJson(activeLog.value.new_values) ? JSON.stringify(formatJson(activeLog.value.new_values), null, 2) : "-")}</pre></div></div></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_sfc_main$3, {
              show: showConfirmDelete.value,
              title: "Hapus Log Aktivitas",
              message: "Apakah Anda yakin ingin menghapus log aktivitas (audit trail) ini?",
              "confirm-text": "Ya, Hapus",
              "cancel-text": "Batal",
              type: "danger",
              onConfirm: executeDeleteLog,
              onCancel: ($event) => showConfirmDelete.value = false
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-6 w-full" }, [
                createVNode("div", { class: "bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700" }, [
                  createVNode("h3", { class: "text-xl font-bold text-gray-900 dark:text-white" }, "Audit Trail & Log Aktivitas"),
                  createVNode("p", { class: "text-xs text-gray-500 mt-1" }, "Daftar rekaman jejak audit operasi sistem yang dilakukan oleh pengguna terotentikasi.")
                ]),
                createVNode("div", { class: "bg-paper dark:bg-gray-800 rounded-card border border-gray-100 dark:border-gray-700 p-6 space-y-4" }, [
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-4 gap-3" }, [
                    createVNode("div", { class: "relative" }, [
                      createVNode(_component_Icon, {
                        icon: "solar:magnifer-linear",
                        class: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"
                      }),
                      withDirectives(createVNode("input", {
                        type: "text",
                        "onUpdate:modelValue": ($event) => search.value = $event,
                        onKeyup: withKeys(handleSearch, ["enter"]),
                        placeholder: "Cari...",
                        class: "w-full text-xs pl-9 pr-3 py-2.5 rounded-sm border border-gray-300 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white"
                      }, null, 40, ["onUpdate:modelValue"]), [
                        [vModelText, search.value]
                      ])
                    ]),
                    createVNode(_component_SearchSelect, {
                      modelValue: filterAction.value,
                      "onUpdate:modelValue": ($event) => filterAction.value = $event,
                      options: [
                        { label: "Semua Aksi", value: "" },
                        { label: "Dibuat", value: "create" },
                        { label: "Diperbarui", value: "update" },
                        { label: "Dihapus", value: "delete" }
                      ],
                      optionLabel: "label",
                      optionValue: "value",
                      placeholder: "Semua Aksi",
                      onChange: applyFilters
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_SearchSelect, {
                      modelValue: filterModel.value,
                      "onUpdate:modelValue": ($event) => filterModel.value = $event,
                      options: [
                        { label: "Semua Objek", value: "" },
                        ...Object.entries(modelLabels).map(([k, v]) => ({ label: v, value: k }))
                      ],
                      optionLabel: "label",
                      optionValue: "value",
                      placeholder: "Semua Objek",
                      onChange: applyFilters
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                    hasActiveFilters.value ? (openBlock(), createBlock("button", {
                      key: 0,
                      onClick: clearFilters,
                      class: "inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30 rounded-sm transition-colors duration-150"
                    }, [
                      createVNode(_component_Icon, {
                        icon: "solar:close-circle-bold",
                        class: "w-4 h-4"
                      }),
                      createTextVNode(" Reset Filter ")
                    ])) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "flex flex-col md:flex-row md:items-center gap-3" }, [
                    createVNode("div", { class: "flex flex-wrap gap-1.5" }, [
                      createVNode("button", {
                        onClick: ($event) => setQuickDate("today"),
                        class: ["px-3 py-1.5 text-[11px] font-semibold rounded-full border transition-colors duration-150", filterDateFrom.value === filterDateTo.value && filterDateFrom.value ? "bg-accent text-accent-ink border-accent" : "border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"]
                      }, " Hari Ini ", 10, ["onClick"]),
                      createVNode("button", {
                        onClick: ($event) => setQuickDate("yesterday"),
                        class: ["px-3 py-1.5 text-[11px] font-semibold rounded-full border transition-colors duration-150", filterDateFrom.value !== filterDateTo.value && filterDateFrom.value ? "bg-accent text-accent-ink border-accent" : "border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"]
                      }, " Kemarin ", 10, ["onClick"]),
                      createVNode("button", {
                        onClick: ($event) => setQuickDate("this_week"),
                        class: ["px-3 py-1.5 text-[11px] font-semibold rounded-full border transition-colors duration-150", filterDateFrom.value !== filterDateTo.value && filterDateFrom.value ? "bg-accent text-accent-ink border-accent" : "border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"]
                      }, " Minggu Ini ", 10, ["onClick"]),
                      createVNode("button", {
                        onClick: ($event) => setQuickDate("this_month"),
                        class: ["px-3 py-1.5 text-[11px] font-semibold rounded-full border transition-colors duration-150", filterDateFrom.value !== filterDateTo.value && filterDateFrom.value ? "bg-accent text-accent-ink border-accent" : "border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"]
                      }, " Bulan Ini ", 10, ["onClick"]),
                      createVNode("button", {
                        onClick: ($event) => setQuickDate("this_year"),
                        class: ["px-3 py-1.5 text-[11px] font-semibold rounded-full border transition-colors duration-150", filterDateFrom.value !== filterDateTo.value && filterDateFrom.value ? "bg-accent text-accent-ink border-accent" : "border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"]
                      }, " Tahun Ini ", 10, ["onClick"])
                    ]),
                    createVNode("div", { class: "hidden md:block w-px h-6 bg-gray-200 dark:bg-gray-700" }),
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      createVNode("div", { class: "relative" }, [
                        createVNode(_component_Icon, {
                          icon: "solar:calendar-bold",
                          class: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5"
                        }),
                        withDirectives(createVNode("input", {
                          type: "date",
                          "onUpdate:modelValue": ($event) => filterDateFrom.value = $event,
                          onChange: applyFilters,
                          class: "text-xs pl-9 pr-3 py-2 rounded-sm border border-gray-300 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white"
                        }, null, 40, ["onUpdate:modelValue"]), [
                          [vModelText, filterDateFrom.value]
                        ])
                      ]),
                      createVNode("span", { class: "text-gray-400 text-xs" }, "—"),
                      createVNode("div", { class: "relative" }, [
                        createVNode(_component_Icon, {
                          icon: "solar:calendar-bold",
                          class: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5"
                        }),
                        withDirectives(createVNode("input", {
                          type: "date",
                          "onUpdate:modelValue": ($event) => filterDateTo.value = $event,
                          onChange: applyFilters,
                          class: "text-xs pl-9 pr-3 py-2 rounded-sm border border-gray-300 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white"
                        }, null, 40, ["onUpdate:modelValue"]), [
                          [vModelText, filterDateTo.value]
                        ])
                      ])
                    ])
                  ]),
                  hasActiveFilters.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "flex items-center gap-2 text-[11px] text-gray-400"
                  }, [
                    createVNode(_component_Icon, {
                      icon: "solar:filter-bold",
                      class: "w-3 h-3"
                    }),
                    createTextVNode(" Filter aktif: "),
                    filterAction.value ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full font-semibold"
                    }, [
                      createTextVNode(toDisplayString(actionLabels[filterAction.value] || filterAction.value) + " ", 1),
                      createVNode("button", {
                        onClick: ($event) => {
                          filterAction.value = "";
                          applyFilters();
                        },
                        class: "hover:text-blue-800"
                      }, [
                        createVNode(_component_Icon, {
                          icon: "solar:close-circle-bold",
                          class: "w-3 h-3"
                        })
                      ], 8, ["onClick"])
                    ])) : createCommentVNode("", true),
                    filterModel.value ? (openBlock(), createBlock("span", {
                      key: 1,
                      class: "inline-flex items-center gap-1 px-2 py-0.5 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-full font-semibold"
                    }, [
                      createTextVNode(toDisplayString(getModelLabel(filterModel.value)) + " ", 1),
                      createVNode("button", {
                        onClick: ($event) => {
                          filterModel.value = "";
                          applyFilters();
                        },
                        class: "hover:text-purple-800"
                      }, [
                        createVNode(_component_Icon, {
                          icon: "solar:close-circle-bold",
                          class: "w-3 h-3"
                        })
                      ], 8, ["onClick"])
                    ])) : createCommentVNode("", true),
                    filterDateFrom.value || filterDateTo.value ? (openBlock(), createBlock("span", {
                      key: 2,
                      class: "inline-flex items-center gap-1 px-2 py-0.5 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-full font-semibold"
                    }, [
                      createTextVNode(toDisplayString(filterDateFrom.value || "...") + " — " + toDisplayString(filterDateTo.value || "...") + " ", 1),
                      createVNode("button", {
                        onClick: ($event) => {
                          filterDateFrom.value = "";
                          filterDateTo.value = "";
                          applyFilters();
                        },
                        class: "hover:text-amber-800"
                      }, [
                        createVNode(_component_Icon, {
                          icon: "solar:close-circle-bold",
                          class: "w-3 h-3"
                        })
                      ], 8, ["onClick"])
                    ])) : createCommentVNode("", true)
                  ])) : createCommentVNode("", true)
                ]),
                createVNode("div", { class: "bg-paper dark:bg-gray-800 rounded-card border border-gray-100 dark:border-gray-700 overflow-hidden" }, [
                  createVNode("div", { class: "overflow-x-auto" }, [
                    createVNode("table", { class: "w-full text-left text-sm" }, [
                      createVNode("thead", { class: "bg-gray-50 dark:bg-gray-900/50 text-gray-400 text-xs font-semibold uppercase tracking-wider border-b border-gray-100 dark:border-gray-700" }, [
                        createVNode("tr", null, [
                          createVNode("th", { class: "px-6 py-4" }, "Waktu"),
                          createVNode("th", { class: "px-6 py-4" }, "Pengguna"),
                          createVNode("th", { class: "px-6 py-4" }, "Objek"),
                          createVNode("th", { class: "px-6 py-4" }, "Aksi"),
                          createVNode("th", { class: "px-6 py-4" }, "Rincian"),
                          createVNode("th", { class: "px-6 py-4 text-right" }, "Aksi")
                        ])
                      ]),
                      createVNode("tbody", { class: "divide-y divide-gray-200 dark:divide-gray-700" }, [
                        __props.logs.data.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                          createVNode("td", {
                            colspan: "6",
                            class: "px-6 py-8 text-center text-gray-400"
                          }, " Tidak ada catatan log aktivitas ditemukan. ")
                        ])) : createCommentVNode("", true),
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.logs.data, (item) => {
                          var _a2;
                          return openBlock(), createBlock("tr", {
                            key: item.id,
                            class: "hover:bg-gray-50/50 dark:hover:bg-gray-800 transition-colors"
                          }, [
                            createVNode("td", { class: "px-6 py-4 text-xs font-semibold text-gray-500 whitespace-nowrap" }, toDisplayString(_ctx.$formatDateTime(item.created_at)), 1),
                            createVNode("td", { class: "px-6 py-4 text-gray-900 dark:text-white font-semibold text-xs" }, toDisplayString(((_a2 = item.user) == null ? void 0 : _a2.name) || "Sistem / Guest"), 1),
                            createVNode("td", { class: "px-6 py-4" }, [
                              createVNode("span", {
                                class: ["inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-bold rounded-full", getModelColor(item.model_type)]
                              }, [
                                createVNode(_component_Icon, {
                                  icon: getModelIcon(item.model_type),
                                  class: "w-3 h-3"
                                }, null, 8, ["icon"]),
                                createTextVNode(" " + toDisplayString(getModelLabel(item.model_type)), 1)
                              ], 2)
                            ]),
                            createVNode("td", { class: "px-6 py-4" }, [
                              createVNode("span", {
                                class: ["inline-flex items-center px-2 py-0.5 text-[10px] font-bold rounded-full", actionColors[item.action]]
                              }, toDisplayString(actionLabels[item.action] || item.action), 3)
                            ]),
                            createVNode("td", { class: "px-6 py-4 text-xs text-gray-500 max-w-[200px] truncate" }, toDisplayString(getRecordName(item) || "#" + item.model_id), 1),
                            createVNode("td", { class: "px-6 py-4 text-right" }, [
                              createVNode("div", { class: "flex items-center justify-end gap-2" }, [
                                createVNode("button", {
                                  onClick: ($event) => viewDetails(item.id),
                                  class: "p-2 bg-gray-50 hover:bg-paper-2 text-gray-600 hover:text-blue-600 dark:bg-gray-600 dark:text-gray-300 rounded-sm transition-colors duration-150",
                                  title: "Detail Log"
                                }, [
                                  createVNode(_component_Icon, {
                                    icon: "solar:eye-bold",
                                    class: "w-4 h-4"
                                  })
                                ], 8, ["onClick"]),
                                createVNode("button", {
                                  onClick: ($event) => confirmDeleteLog(item.id),
                                  class: "p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-sm transition-colors duration-150",
                                  title: "Hapus"
                                }, [
                                  createVNode(_component_Icon, {
                                    icon: "solar:trash-bin-trash-bold",
                                    class: "w-4 h-4"
                                  })
                                ], 8, ["onClick"])
                              ])
                            ])
                          ]);
                        }), 128))
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "flex flex-col sm:flex-row justify-between items-center gap-4 px-6 py-4 border-t border-gray-100 dark:border-gray-700" }, [
                    createVNode("p", { class: "text-xs text-gray-400" }, " Menampilkan " + toDisplayString(__props.logs.from || 0) + " sampai " + toDisplayString(__props.logs.to || 0) + " dari " + toDisplayString(__props.logs.total) + " data ", 1),
                    createVNode(_sfc_main$2, {
                      links: __props.logs.links
                    }, null, 8, ["links"])
                  ])
                ]),
                showModal.value ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "fixed inset-0 z-50 flex items-center justify-center p-4"
                }, [
                  createVNode("div", {
                    class: "absolute inset-0 bg-slate-900/40 backdrop-blur-sm",
                    onClick: ($event) => showModal.value = false
                  }, null, 8, ["onClick"]),
                  createVNode("div", { class: "relative w-full max-w-2xl bg-paper dark:bg-paper-dark border border-rule dark:border-rule-dark rounded-card p-6 space-y-4 max-h-[85vh] overflow-y-auto" }, [
                    createVNode("div", { class: "flex justify-between items-center border-b dark:border-slate-800 pb-3" }, [
                      createVNode("h4", { class: "font-bold text-slate-900 dark:text-white" }, " Rincian Jejak Audit Log "),
                      createVNode("button", {
                        onClick: ($event) => showModal.value = false,
                        class: "text-slate-400 hover:text-slate-600"
                      }, [
                        createVNode(_component_Icon, {
                          icon: "solar:close-square-linear",
                          class: "w-5 h-5"
                        })
                      ], 8, ["onClick"])
                    ]),
                    activeLog.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "space-y-4 text-xs"
                    }, [
                      createVNode("div", { class: "flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700" }, [
                        createVNode("span", {
                          class: ["inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold rounded-full", getModelColor(activeLog.value.model_type)]
                        }, [
                          createVNode(_component_Icon, {
                            icon: getModelIcon(activeLog.value.model_type),
                            class: "w-3.5 h-3.5"
                          }, null, 8, ["icon"]),
                          createTextVNode(" " + toDisplayString(getModelLabel(activeLog.value.model_type)), 1)
                        ], 2),
                        createVNode("span", { class: "text-gray-400" }, "#" + toDisplayString(activeLog.value.model_id), 1),
                        getRecordName(activeLog.value) ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "text-gray-900 dark:text-white font-semibold truncate"
                        }, " — " + toDisplayString(getRecordName(activeLog.value)), 1)) : createCommentVNode("", true),
                        createVNode("span", {
                          class: ["ml-auto inline-flex items-center px-2 py-0.5 text-[10px] font-bold rounded-full", actionColors[activeLog.value.action]]
                        }, toDisplayString(actionLabels[activeLog.value.action] || activeLog.value.action), 3)
                      ]),
                      createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                        createVNode("div", null, [
                          createVNode("span", { class: "text-[9px] text-slate-400 font-bold uppercase tracking-wider block" }, "Waktu Operasi"),
                          createVNode("span", { class: "text-slate-900 dark:text-slate-200 mt-1 block font-semibold" }, toDisplayString(_ctx.$formatDateTime(activeLog.value.created_at)), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("span", { class: "text-[9px] text-slate-400 font-bold uppercase tracking-wider block" }, "Nama Pengguna"),
                          createVNode("span", { class: "text-slate-900 dark:text-slate-200 mt-1 block font-semibold" }, toDisplayString(((_b = activeLog.value.user) == null ? void 0 : _b.name) || "Sistem / Guest"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("span", { class: "text-[9px] text-slate-400 font-bold uppercase tracking-wider block" }, "IP Address"),
                          createVNode("span", { class: "text-slate-900 dark:text-slate-200 mt-1 block font-mono" }, toDisplayString(activeLog.value.ip_address), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("span", { class: "text-[9px] text-slate-400 font-bold uppercase tracking-wider block" }, "Aksi / Operasi"),
                          createVNode("span", { class: "text-blue-600 dark:text-blue-400 mt-1 block font-mono font-bold" }, toDisplayString(activeLog.value.action), 1)
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("span", { class: "text-[9px] text-slate-400 font-bold uppercase tracking-wider block mb-1" }, "User Agent"),
                        createVNode("span", { class: "text-slate-600 dark:text-slate-300 block font-light font-mono leading-relaxed bg-paper-2 dark:bg-paper-2-dark p-2.5 rounded-sm border border-rule dark:border-rule-dark text-[10px]" }, toDisplayString(activeLog.value.user_agent), 1)
                      ]),
                      activeLog.value.action === "update" ? (openBlock(), createBlock("div", { key: 0 }, [
                        createVNode("span", { class: "text-[9px] text-slate-400 font-bold uppercase tracking-wider block mb-2" }, "Perubahan Data"),
                        createVNode("div", { class: "border dark:border-slate-800 rounded-sm overflow-hidden" }, [
                          createVNode("table", { class: "w-full text-[11px]" }, [
                            createVNode("thead", { class: "bg-gray-50 dark:bg-slate-800" }, [
                              createVNode("tr", null, [
                                createVNode("th", { class: "px-3 py-2 text-left font-bold text-slate-500 w-1/4" }, "Field"),
                                createVNode("th", { class: "px-3 py-2 text-left font-bold text-red-500/80 w-[37.5%]" }, "Sebelum"),
                                createVNode("th", { class: "px-3 py-2 text-left font-bold text-emerald-600 dark:text-emerald-400 w-[37.5%]" }, "Sesudah")
                              ])
                            ]),
                            createVNode("tbody", { class: "divide-y divide-gray-100 dark:divide-slate-800" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(getDiffFields(activeLog.value.old_values, activeLog.value.new_values).filter((d) => !skippedFields.includes(d.key)), (d) => {
                                return openBlock(), createBlock("tr", {
                                  key: d.key,
                                  class: "hover:bg-gray-50/50 dark:hover:bg-slate-800/50"
                                }, [
                                  createVNode("td", { class: "px-3 py-2 font-mono font-semibold text-slate-700 dark:text-slate-300" }, toDisplayString(d.key), 1),
                                  createVNode("td", { class: "px-3 py-2 font-mono text-red-500/80 bg-red-50/30 dark:bg-red-900/10" }, toDisplayString(formatCellValue(d.key, d.old)), 1),
                                  createVNode("td", { class: "px-3 py-2 font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50/30 dark:bg-emerald-900/10" }, toDisplayString(formatCellValue(d.key, d.new)), 1)
                                ]);
                              }), 128)),
                              getDiffFields(activeLog.value.old_values, activeLog.value.new_values).filter((d) => !skippedFields.includes(d.key)).length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                                createVNode("td", {
                                  colspan: "3",
                                  class: "px-3 py-4 text-center text-gray-400 italic"
                                }, "Tidak ada perubahan data yang terdeteksi.")
                              ])) : createCommentVNode("", true)
                            ])
                          ])
                        ])
                      ])) : createCommentVNode("", true),
                      activeLog.value.action === "create" || activeLog.value.action === "delete" ? (openBlock(), createBlock("div", { key: 1 }, [
                        createVNode("span", { class: "text-[9px] text-slate-400 font-bold uppercase tracking-wider block mb-2" }, toDisplayString(activeLog.value.action === "create" ? "Data yang Dibuat" : "Data yang Dihapus"), 1),
                        createVNode("div", { class: "border dark:border-slate-800 rounded-sm overflow-hidden" }, [
                          createVNode("table", { class: "w-full text-[11px]" }, [
                            createVNode("thead", { class: "bg-gray-50 dark:bg-slate-800" }, [
                              createVNode("tr", null, [
                                createVNode("th", { class: "px-3 py-2 text-left font-bold text-slate-500 w-1/3" }, "Field"),
                                createVNode("th", { class: "px-3 py-2 text-left font-bold text-slate-500 w-2/3" }, "Nilai")
                              ])
                            ]),
                            createVNode("tbody", { class: "divide-y divide-gray-100 dark:divide-slate-800" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(formatJson(activeLog.value.action === "create" ? activeLog.value.new_values : activeLog.value.old_values), (val, key) => {
                                return openBlock(), createBlock("tr", {
                                  key,
                                  class: "hover:bg-gray-50/50 dark:hover:bg-slate-800/50"
                                }, [
                                  createVNode("td", { class: "px-3 py-2 font-mono font-semibold text-slate-700 dark:text-slate-300" }, toDisplayString(key), 1),
                                  createVNode("td", { class: "px-3 py-2 font-mono text-slate-600 dark:text-slate-400" }, toDisplayString(formatCellValue(key, val)), 1)
                                ]);
                              }), 128))
                            ])
                          ])
                        ])
                      ])) : createCommentVNode("", true),
                      activeLog.value.action !== "update" && activeLog.value.action !== "create" && activeLog.value.action !== "delete" ? (openBlock(), createBlock("div", { key: 2 }, [
                        createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                          createVNode("div", null, [
                            createVNode("span", { class: "text-[9px] text-slate-400 font-bold uppercase tracking-wider block mb-1" }, "Nilai Lama (Old Values)"),
                            createVNode("pre", { class: "p-3 bg-paper-2 dark:bg-paper-2-dark border dark:border-slate-800 text-slate-700 dark:text-slate-400 font-mono text-[10px] rounded-sm overflow-x-auto max-h-48" }, toDisplayString(formatJson(activeLog.value.old_values) ? JSON.stringify(formatJson(activeLog.value.old_values), null, 2) : "-"), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("span", { class: "text-[9px] text-slate-400 font-bold uppercase tracking-wider block mb-1" }, "Nilai Baru (New Values)"),
                            createVNode("pre", { class: "p-3 bg-paper-2 dark:bg-paper-2-dark border dark:border-slate-800 text-slate-700 dark:text-slate-400 font-mono text-[10px] rounded-sm overflow-x-auto max-h-48" }, toDisplayString(formatJson(activeLog.value.new_values) ? JSON.stringify(formatJson(activeLog.value.new_values), null, 2) : "-"), 1)
                          ])
                        ])
                      ])) : createCommentVNode("", true)
                    ])) : createCommentVNode("", true)
                  ])
                ])) : createCommentVNode("", true),
                createVNode(_sfc_main$3, {
                  show: showConfirmDelete.value,
                  title: "Hapus Log Aktivitas",
                  message: "Apakah Anda yakin ingin menghapus log aktivitas (audit trail) ini?",
                  "confirm-text": "Ya, Hapus",
                  "cancel-text": "Batal",
                  type: "danger",
                  onConfirm: executeDeleteLog,
                  onCancel: ($event) => showConfirmDelete.value = false
                }, null, 8, ["show", "onCancel"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Backend/Settings/LogActivity/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
