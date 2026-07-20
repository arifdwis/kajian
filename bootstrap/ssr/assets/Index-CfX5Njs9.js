import { ref, computed, resolveComponent, unref, withCtx, createVNode, createTextVNode, withDirectives, withKeys, vModelText, openBlock, createBlock, createCommentVNode, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { Head, Link, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-Cmsx4Vff.js";
import { _ as _sfc_main$2 } from "./Pagination-DE6AvrVK.js";
import { _ as _sfc_main$3 } from "./ConfirmModal-C43yiw5v.js";
import { useToast } from "vue-toastification";
import "flowbite-vue";
import "./ApplicationLogo-CmsQkCHn.js";
import "@iconify/vue";
import "mitt";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    kajians: Object,
    filters: Object,
    bidangs: Array,
    jenisKajians: Array,
    tahuns: Array
  },
  setup(__props) {
    const toast = useToast();
    const props = __props;
    const search = ref(props.filters.search || "");
    const bidang_id = ref(props.filters.bidang_id || "");
    const jenis_id = ref(props.filters.jenis_id || "");
    const tahun_id = ref(props.filters.tahun_id || "");
    const status = ref(props.filters.status || "");
    const bidangOptions = computed(() => [{ label: "Semua Bidang", value: "" }, ...props.bidangs.map((b) => ({ label: b.nama, value: b.id }))]);
    const jenisOptions = computed(() => [{ label: "Semua Jenis", value: "" }, ...props.jenisKajians.map((j) => ({ label: j.nama, value: j.id }))]);
    const tahunOptions = computed(() => [{ label: "Semua Tahun", value: "" }, ...props.tahuns.map((t) => ({ label: t.tahun, value: t.id }))]);
    const statusOptions = [
      { label: "Semua Status", value: "" },
      { label: "Draft", value: "draft" },
      { label: "Review", value: "review" },
      { label: "Published", value: "published" },
      { label: "Archived", value: "archived" }
    ];
    const handleFilter = () => {
      router.get(route("kajian.index"), {
        search: search.value,
        bidang_id: bidang_id.value,
        jenis_id: jenis_id.value,
        tahun_id: tahun_id.value,
        status: status.value
      }, {
        preserveState: true,
        preserveScroll: true
      });
    };
    const resetFilter = () => {
      search.value = "";
      bidang_id.value = "";
      jenis_id.value = "";
      tahun_id.value = "";
      status.value = "";
      handleFilter();
    };
    const showConfirmModal = ref(false);
    const confirmModalConfig = ref({
      title: "",
      message: "",
      confirmText: "",
      type: "danger",
      onConfirm: () => {
      }
    });
    const openConfirm = (title, message, confirmText, type, onConfirm) => {
      confirmModalConfig.value = {
        title,
        message,
        confirmText,
        type,
        onConfirm
      };
      showConfirmModal.value = true;
    };
    const deleteKajian = (id) => {
      openConfirm(
        "Hapus Dokumen Kajian",
        "Apakah Anda yakin ingin menghapus dokumen kajian ini? Tindakan ini tidak dapat dibatalkan.",
        "Ya, Hapus",
        "danger",
        () => {
          router.delete(route("kajian.destroy", item.uuid), {
            onSuccess: () => {
              showConfirmModal.value = false;
            },
            onError: () => toast.error("Gagal menghapus kajian.")
          });
        }
      );
    };
    const publishKajian = (uuid) => {
      openConfirm(
        "Publikasikan Kajian",
        "Apakah Anda yakin ingin mempublikasikan kajian ini ke portal publik?",
        "Ya, Publikasikan",
        "success",
        () => {
          router.post(route("kajian.publish", uuid), {}, {
            onSuccess: () => {
              showConfirmModal.value = false;
            },
            onError: () => toast.error("Gagal mempublikasikan kajian.")
          });
        }
      );
    };
    const archiveKajian = (uuid) => {
      openConfirm(
        "Arsipkan Kajian",
        "Apakah Anda yakin ingin mengarsipkan kajian ini?",
        "Ya, Arsipkan",
        "warning",
        () => {
          router.post(route("kajian.archive", uuid), {}, {
            onSuccess: () => {
              showConfirmModal.value = false;
            },
            onError: () => toast.error("Gagal mengarsipkan kajian.")
          });
        }
      );
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = resolveComponent("Icon");
      const _component_SearchSelect = resolveComponent("SearchSelect");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Manajemen Kajian" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-6"${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700"${_scopeId}><div${_scopeId}><h3 class="text-xl font-bold text-gray-900 dark:text-white"${_scopeId}>Daftar Dokumen Kajian &amp; Riset</h3><p class="text-xs text-gray-500 mt-1"${_scopeId}>Kelola publikasi, naskah akademik, dan draf kajian OPD.</p></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("kajian.create"),
              class: "inline-flex items-center gap-2 px-5 py-3 bg-accent text-accent-ink font-semibold rounded-card transition-colors duration-150 text-sm shrink-0"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Icon, {
                    icon: "solar:add-circle-bold",
                    class: "w-5 h-5"
                  }, null, _parent3, _scopeId2));
                  _push3(` Tambah Kajian `);
                } else {
                  return [
                    createVNode(_component_Icon, {
                      icon: "solar:add-circle-bold",
                      class: "w-5 h-5"
                    }),
                    createTextVNode(" Tambah Kajian ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700 space-y-4"${_scopeId}><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"${_scopeId}><div${_scopeId}><label class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2"${_scopeId}>Cari</label><input type="text"${ssrRenderAttr("value", search.value)} placeholder="Judul, Penulis..." class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5"${_scopeId}></div><div${_scopeId}><label class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2"${_scopeId}>Bidang</label>`);
            _push2(ssrRenderComponent(_component_SearchSelect, {
              modelValue: bidang_id.value,
              "onUpdate:modelValue": ($event) => bidang_id.value = $event,
              options: bidangOptions.value,
              onChange: handleFilter
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><label class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2"${_scopeId}>Jenis</label>`);
            _push2(ssrRenderComponent(_component_SearchSelect, {
              modelValue: jenis_id.value,
              "onUpdate:modelValue": ($event) => jenis_id.value = $event,
              options: jenisOptions.value,
              onChange: handleFilter
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><label class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2"${_scopeId}>Tahun</label>`);
            _push2(ssrRenderComponent(_component_SearchSelect, {
              modelValue: tahun_id.value,
              "onUpdate:modelValue": ($event) => tahun_id.value = $event,
              options: tahunOptions.value,
              onChange: handleFilter
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><label class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2"${_scopeId}>Status</label>`);
            _push2(ssrRenderComponent(_component_SearchSelect, {
              modelValue: status.value,
              "onUpdate:modelValue": ($event) => status.value = $event,
              options: statusOptions,
              onChange: handleFilter
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex justify-end gap-2 pt-2"${_scopeId}><button class="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-white text-xs font-semibold rounded-sm transition-colors"${_scopeId}> Reset Filter </button><button class="px-4 py-2 bg-accent text-accent-ink text-xs font-semibold rounded-sm transition-colors"${_scopeId}> Terapkan </button></div></div><div class="bg-paper dark:bg-gray-800 rounded-card border border-gray-100 dark:border-gray-700 overflow-hidden"${_scopeId}><div class="overflow-x-auto"${_scopeId}><table class="w-full text-left text-sm"${_scopeId}><thead class="bg-gray-50/70 dark:bg-gray-900/50 text-gray-400 text-xs font-semibold uppercase tracking-wider border-b border-gray-100 dark:border-gray-700"${_scopeId}><tr${_scopeId}><th class="px-6 py-4"${_scopeId}>Informasi Kajian</th><th class="px-6 py-4"${_scopeId}>Bidang / Jenis</th><th class="px-6 py-4"${_scopeId}>Tahun</th><th class="px-6 py-4"${_scopeId}>Status</th><th class="px-6 py-4 text-right"${_scopeId}>Aksi</th></tr></thead><tbody class="divide-y divide-gray-100 dark:divide-gray-700"${_scopeId}>`);
            if (__props.kajians.data.length === 0) {
              _push2(`<tr${_scopeId}><td colspan="5" class="px-6 py-12 text-center text-gray-400 font-medium"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                icon: "solar:folder-error-bold",
                class: "w-12 h-12 mx-auto mb-2 text-gray-300"
              }, null, _parent2, _scopeId));
              _push2(` Tidak ada dokumen kajian yang ditemukan. </td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(__props.kajians.data, (item2) => {
              var _a, _b, _c;
              _push2(`<tr class="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors"${_scopeId}><td class="px-6 py-4 max-w-md"${_scopeId}><div class="font-semibold text-gray-900 dark:text-white line-clamp-2"${_scopeId}>${ssrInterpolate(item2.judul)}</div><div class="text-xs text-gray-400 mt-1 flex items-center gap-2"${_scopeId}><span${_scopeId}>PJ: ${ssrInterpolate(item2.penanggung_jawab || "-")}</span></div></td><td class="px-6 py-4"${_scopeId}><div class="text-xs font-semibold text-gray-700 dark:text-gray-300"${_scopeId}>${ssrInterpolate(((_a = item2.bidang) == null ? void 0 : _a.nama) || "-")}</div><div class="text-[10px] text-gray-400 mt-0.5"${_scopeId}>${ssrInterpolate(((_b = item2.jenis_kajian) == null ? void 0 : _b.nama) || "-")}</div></td><td class="px-6 py-4 text-gray-500 font-medium"${_scopeId}>${ssrInterpolate((_c = item2.tahun) == null ? void 0 : _c.tahun)}</td><td class="px-6 py-4"${_scopeId}><span class="${ssrRenderClass([{
                "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800": item2.status === "published",
                "bg-paper-2 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800": item2.status === "draft",
                "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800": item2.status === "review",
                "bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-950/30 dark:text-gray-400 dark:border-gray-800": item2.status === "archived"
              }, "px-2.5 py-1 rounded-full text-xs font-bold border capitalize"])}"${_scopeId}>${ssrInterpolate(item2.status)}</span></td><td class="px-6 py-4 text-right"${_scopeId}><div class="flex items-center justify-end gap-2"${_scopeId}>`);
              if (item2.status === "review" && _ctx.$page.props.auth.roles.some((r) => ["superadmin", "admin"].includes(r))) {
                _push2(`<button class="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-sm transition-colors duration-150" title="Publish"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_Icon, {
                  icon: "solar:check-square-bold",
                  class: "w-4 h-4"
                }, null, _parent2, _scopeId));
                _push2(`</button>`);
              } else {
                _push2(`<!---->`);
              }
              if (item2.status === "published" && _ctx.$page.props.auth.roles.some((r) => ["superadmin", "admin"].includes(r))) {
                _push2(`<button class="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-sm transition-colors duration-150" title="Archive"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_Icon, {
                  icon: "solar:archive-down-bold",
                  class: "w-4 h-4"
                }, null, _parent2, _scopeId));
                _push2(`</button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("kajian.show", item2.uuid),
                class: "p-2 bg-gray-50 hover:bg-paper-2 text-gray-600 hover:text-blue-600 dark:bg-gray-700 dark:text-gray-300 rounded-sm transition-colors duration-150",
                title: "Detail"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_Icon, {
                      icon: "solar:eye-bold",
                      class: "w-4 h-4"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_Icon, {
                        icon: "solar:eye-bold",
                        class: "w-4 h-4"
                      })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("kajian.edit", item2.uuid),
                class: "p-2 bg-gray-50 hover:bg-amber-50 text-gray-600 hover:text-amber-600 dark:bg-gray-700 dark:text-gray-300 rounded-sm transition-colors duration-150",
                title: "Edit"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_Icon, {
                      icon: "solar:pen-bold",
                      class: "w-4 h-4"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_Icon, {
                        icon: "solar:pen-bold",
                        class: "w-4 h-4"
                      })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`<button class="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-sm transition-colors duration-150" title="Delete"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                icon: "solar:trash-bin-trash-bold",
                class: "w-4 h-4"
              }, null, _parent2, _scopeId));
              _push2(`</button></div></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div><div class="px-6 py-4 border-t border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4"${_scopeId}><p class="text-xs text-gray-400 font-medium"${_scopeId}> Menampilkan ${ssrInterpolate(__props.kajians.from || 0)} sampai ${ssrInterpolate(__props.kajians.to || 0)} dari ${ssrInterpolate(__props.kajians.total)} data </p>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              links: __props.kajians.links
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              show: showConfirmModal.value,
              title: confirmModalConfig.value.title,
              message: confirmModalConfig.value.message,
              "confirm-text": confirmModalConfig.value.confirmText,
              type: confirmModalConfig.value.type,
              onConfirm: confirmModalConfig.value.onConfirm,
              onCancel: ($event) => showConfirmModal.value = false
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-6" }, [
                createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700" }, [
                  createVNode("div", null, [
                    createVNode("h3", { class: "text-xl font-bold text-gray-900 dark:text-white" }, "Daftar Dokumen Kajian & Riset"),
                    createVNode("p", { class: "text-xs text-gray-500 mt-1" }, "Kelola publikasi, naskah akademik, dan draf kajian OPD.")
                  ]),
                  createVNode(unref(Link), {
                    href: _ctx.route("kajian.create"),
                    class: "inline-flex items-center gap-2 px-5 py-3 bg-accent text-accent-ink font-semibold rounded-card transition-colors duration-150 text-sm shrink-0"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Icon, {
                        icon: "solar:add-circle-bold",
                        class: "w-5 h-5"
                      }),
                      createTextVNode(" Tambah Kajian ")
                    ]),
                    _: 1
                  }, 8, ["href"])
                ]),
                createVNode("div", { class: "bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700 space-y-4" }, [
                  createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4" }, [
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2" }, "Cari"),
                      withDirectives(createVNode("input", {
                        type: "text",
                        "onUpdate:modelValue": ($event) => search.value = $event,
                        placeholder: "Judul, Penulis...",
                        class: "w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5",
                        onKeyup: withKeys(handleFilter, ["enter"])
                      }, null, 40, ["onUpdate:modelValue"]), [
                        [vModelText, search.value]
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2" }, "Bidang"),
                      createVNode(_component_SearchSelect, {
                        modelValue: bidang_id.value,
                        "onUpdate:modelValue": ($event) => bidang_id.value = $event,
                        options: bidangOptions.value,
                        onChange: handleFilter
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2" }, "Jenis"),
                      createVNode(_component_SearchSelect, {
                        modelValue: jenis_id.value,
                        "onUpdate:modelValue": ($event) => jenis_id.value = $event,
                        options: jenisOptions.value,
                        onChange: handleFilter
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2" }, "Tahun"),
                      createVNode(_component_SearchSelect, {
                        modelValue: tahun_id.value,
                        "onUpdate:modelValue": ($event) => tahun_id.value = $event,
                        options: tahunOptions.value,
                        onChange: handleFilter
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2" }, "Status"),
                      createVNode(_component_SearchSelect, {
                        modelValue: status.value,
                        "onUpdate:modelValue": ($event) => status.value = $event,
                        options: statusOptions,
                        onChange: handleFilter
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ])
                  ]),
                  createVNode("div", { class: "flex justify-end gap-2 pt-2" }, [
                    createVNode("button", {
                      onClick: resetFilter,
                      class: "px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-white text-xs font-semibold rounded-sm transition-colors"
                    }, " Reset Filter "),
                    createVNode("button", {
                      onClick: handleFilter,
                      class: "px-4 py-2 bg-accent text-accent-ink text-xs font-semibold rounded-sm transition-colors"
                    }, " Terapkan ")
                  ])
                ]),
                createVNode("div", { class: "bg-paper dark:bg-gray-800 rounded-card border border-gray-100 dark:border-gray-700 overflow-hidden" }, [
                  createVNode("div", { class: "overflow-x-auto" }, [
                    createVNode("table", { class: "w-full text-left text-sm" }, [
                      createVNode("thead", { class: "bg-gray-50/70 dark:bg-gray-900/50 text-gray-400 text-xs font-semibold uppercase tracking-wider border-b border-gray-100 dark:border-gray-700" }, [
                        createVNode("tr", null, [
                          createVNode("th", { class: "px-6 py-4" }, "Informasi Kajian"),
                          createVNode("th", { class: "px-6 py-4" }, "Bidang / Jenis"),
                          createVNode("th", { class: "px-6 py-4" }, "Tahun"),
                          createVNode("th", { class: "px-6 py-4" }, "Status"),
                          createVNode("th", { class: "px-6 py-4 text-right" }, "Aksi")
                        ])
                      ]),
                      createVNode("tbody", { class: "divide-y divide-gray-100 dark:divide-gray-700" }, [
                        __props.kajians.data.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                          createVNode("td", {
                            colspan: "5",
                            class: "px-6 py-12 text-center text-gray-400 font-medium"
                          }, [
                            createVNode(_component_Icon, {
                              icon: "solar:folder-error-bold",
                              class: "w-12 h-12 mx-auto mb-2 text-gray-300"
                            }),
                            createTextVNode(" Tidak ada dokumen kajian yang ditemukan. ")
                          ])
                        ])) : createCommentVNode("", true),
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.kajians.data, (item2) => {
                          var _a, _b, _c;
                          return openBlock(), createBlock("tr", {
                            key: item2.id,
                            class: "hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors"
                          }, [
                            createVNode("td", { class: "px-6 py-4 max-w-md" }, [
                              createVNode("div", { class: "font-semibold text-gray-900 dark:text-white line-clamp-2" }, toDisplayString(item2.judul), 1),
                              createVNode("div", { class: "text-xs text-gray-400 mt-1 flex items-center gap-2" }, [
                                createVNode("span", null, "PJ: " + toDisplayString(item2.penanggung_jawab || "-"), 1)
                              ])
                            ]),
                            createVNode("td", { class: "px-6 py-4" }, [
                              createVNode("div", { class: "text-xs font-semibold text-gray-700 dark:text-gray-300" }, toDisplayString(((_a = item2.bidang) == null ? void 0 : _a.nama) || "-"), 1),
                              createVNode("div", { class: "text-[10px] text-gray-400 mt-0.5" }, toDisplayString(((_b = item2.jenis_kajian) == null ? void 0 : _b.nama) || "-"), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 text-gray-500 font-medium" }, toDisplayString((_c = item2.tahun) == null ? void 0 : _c.tahun), 1),
                            createVNode("td", { class: "px-6 py-4" }, [
                              createVNode("span", {
                                class: ["px-2.5 py-1 rounded-full text-xs font-bold border capitalize", {
                                  "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800": item2.status === "published",
                                  "bg-paper-2 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800": item2.status === "draft",
                                  "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800": item2.status === "review",
                                  "bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-950/30 dark:text-gray-400 dark:border-gray-800": item2.status === "archived"
                                }]
                              }, toDisplayString(item2.status), 3)
                            ]),
                            createVNode("td", { class: "px-6 py-4 text-right" }, [
                              createVNode("div", { class: "flex items-center justify-end gap-2" }, [
                                item2.status === "review" && _ctx.$page.props.auth.roles.some((r) => ["superadmin", "admin"].includes(r)) ? (openBlock(), createBlock("button", {
                                  key: 0,
                                  onClick: ($event) => publishKajian(item2.uuid),
                                  class: "p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-sm transition-colors duration-150",
                                  title: "Publish"
                                }, [
                                  createVNode(_component_Icon, {
                                    icon: "solar:check-square-bold",
                                    class: "w-4 h-4"
                                  })
                                ], 8, ["onClick"])) : createCommentVNode("", true),
                                item2.status === "published" && _ctx.$page.props.auth.roles.some((r) => ["superadmin", "admin"].includes(r)) ? (openBlock(), createBlock("button", {
                                  key: 1,
                                  onClick: ($event) => archiveKajian(item2.uuid),
                                  class: "p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-sm transition-colors duration-150",
                                  title: "Archive"
                                }, [
                                  createVNode(_component_Icon, {
                                    icon: "solar:archive-down-bold",
                                    class: "w-4 h-4"
                                  })
                                ], 8, ["onClick"])) : createCommentVNode("", true),
                                createVNode(unref(Link), {
                                  href: _ctx.route("kajian.show", item2.uuid),
                                  class: "p-2 bg-gray-50 hover:bg-paper-2 text-gray-600 hover:text-blue-600 dark:bg-gray-700 dark:text-gray-300 rounded-sm transition-colors duration-150",
                                  title: "Detail"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_Icon, {
                                      icon: "solar:eye-bold",
                                      class: "w-4 h-4"
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["href"]),
                                createVNode(unref(Link), {
                                  href: _ctx.route("kajian.edit", item2.uuid),
                                  class: "p-2 bg-gray-50 hover:bg-amber-50 text-gray-600 hover:text-amber-600 dark:bg-gray-700 dark:text-gray-300 rounded-sm transition-colors duration-150",
                                  title: "Edit"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_Icon, {
                                      icon: "solar:pen-bold",
                                      class: "w-4 h-4"
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["href"]),
                                createVNode("button", {
                                  onClick: ($event) => deleteKajian(item2.id),
                                  class: "p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-sm transition-colors duration-150",
                                  title: "Delete"
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
                  createVNode("div", { class: "px-6 py-4 border-t border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4" }, [
                    createVNode("p", { class: "text-xs text-gray-400 font-medium" }, " Menampilkan " + toDisplayString(__props.kajians.from || 0) + " sampai " + toDisplayString(__props.kajians.to || 0) + " dari " + toDisplayString(__props.kajians.total) + " data ", 1),
                    createVNode(_sfc_main$2, {
                      links: __props.kajians.links
                    }, null, 8, ["links"])
                  ])
                ]),
                createVNode(_sfc_main$3, {
                  show: showConfirmModal.value,
                  title: confirmModalConfig.value.title,
                  message: confirmModalConfig.value.message,
                  "confirm-text": confirmModalConfig.value.confirmText,
                  type: confirmModalConfig.value.type,
                  onConfirm: confirmModalConfig.value.onConfirm,
                  onCancel: ($event) => showConfirmModal.value = false
                }, null, 8, ["show", "title", "message", "confirm-text", "type", "onConfirm", "onCancel"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Backend/Kajian/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
