import { ref, resolveComponent, unref, withCtx, createVNode, withDirectives, withKeys, vModelText, openBlock, createBlock, createCommentVNode, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { Head, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-CCLRqrRv.js";
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
    const activeLog = ref(null);
    const showModal = ref(false);
    const handleSearch = () => {
      router.get(route("settings.log-activity.index"), { search: search.value }, {
        preserveState: true,
        preserveScroll: true
      });
    };
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
    const formatJson = (json) => {
      if (!json) return "-";
      try {
        const obj = typeof json === "string" ? JSON.parse(json) : json;
        return JSON.stringify(obj, null, 2);
      } catch (e) {
        return json;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = resolveComponent("Icon");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Audit Log Aktivitas" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<div class="space-y-6 w-full"${_scopeId}><div class="bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700"${_scopeId}><h3 class="text-xl font-bold text-gray-900 dark:text-white"${_scopeId}>Audit Trail &amp; Log Aktivitas</h3><p class="text-xs text-gray-500 mt-1"${_scopeId}>Daftar rekaman jejak audit operasi sistem yang dilakukan oleh pengguna terotentikasi.</p></div><div class="bg-paper dark:bg-gray-800 rounded-card border border-gray-100 dark:border-gray-700 overflow-hidden p-6 space-y-4"${_scopeId}><div class="flex justify-between items-center max-w-md"${_scopeId}><div class="relative w-full"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:magnifer-linear",
              class: "absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"
            }, null, _parent2, _scopeId));
            _push2(`<input type="text"${ssrRenderAttr("value", search.value)} placeholder="Cari berdasarkan aksi, nama pengguna..." class="w-full text-xs pl-10 pr-4 py-2.5 rounded-sm border border-gray-300 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white"${_scopeId}></div></div><div class="overflow-x-auto border border-gray-100 dark:border-gray-700 rounded-card"${_scopeId}><table class="w-full text-left text-sm"${_scopeId}><thead class="bg-gray-50 dark:bg-gray-900/50 text-gray-400 text-xs font-semibold uppercase tracking-wider border-b border-gray-100 dark:border-gray-700"${_scopeId}><tr${_scopeId}><th class="px-6 py-4"${_scopeId}>Waktu</th><th class="px-6 py-4"${_scopeId}>Pengguna</th><th class="px-6 py-4"${_scopeId}>Aksi / Operasi</th><th class="px-6 py-4"${_scopeId}>IP Address</th><th class="px-6 py-4 text-right"${_scopeId}>Aksi</th></tr></thead><tbody class="divide-y divide-gray-200 dark:divide-gray-700"${_scopeId}>`);
            if (__props.logs.data.length === 0) {
              _push2(`<tr${_scopeId}><td colspan="5" class="px-6 py-8 text-center text-gray-400"${_scopeId}> Tidak ada catatan log aktivitas ditemukan. </td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(__props.logs.data, (item) => {
              var _a2;
              _push2(`<tr class="hover:bg-gray-50/50 dark:hover:bg-gray-800 transition-colors"${_scopeId}><td class="px-6 py-4 text-xs font-semibold text-gray-500"${_scopeId}>${ssrInterpolate(_ctx.$formatDateTime(item.created_at))}</td><td class="px-6 py-4 text-gray-900 dark:text-white font-semibold"${_scopeId}>${ssrInterpolate(((_a2 = item.user) == null ? void 0 : _a2.name) || "Sistem / Guest")}</td><td class="px-6 py-4 font-mono text-xs text-blue-600 dark:text-blue-400"${_scopeId}>${ssrInterpolate(item.action)}</td><td class="px-6 py-4 text-xs text-gray-500"${_scopeId}>${ssrInterpolate(item.ip_address)}</td><td class="px-6 py-4 text-right"${_scopeId}><div class="flex items-center justify-end gap-2"${_scopeId}><button class="p-2 bg-gray-50 hover:bg-paper-2 text-gray-600 hover:text-blue-600 dark:bg-gray-600 dark:text-gray-300 rounded-sm transition-all" title="Detail Log"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                icon: "solar:eye-bold",
                class: "w-4 h-4"
              }, null, _parent2, _scopeId));
              _push2(`</button><button class="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-sm transition-all" title="Hapus"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                icon: "solar:trash-bin-trash-bold",
                class: "w-4 h-4"
              }, null, _parent2, _scopeId));
              _push2(`</button></div></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div><div class="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2"${_scopeId}><p class="text-xs text-gray-400"${_scopeId}> Menampilkan ${ssrInterpolate(__props.logs.from || 0)} sampai ${ssrInterpolate(__props.logs.to || 0)} dari ${ssrInterpolate(__props.logs.total)} data </p>`);
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
                _push2(`<div class="space-y-4 text-xs"${_scopeId}><div class="grid grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><span class="text-[9px] text-slate-400 font-bold uppercase tracking-wider block"${_scopeId}>Waktu Operasi</span><span class="text-slate-900 dark:text-slate-200 mt-1 block font-semibold"${_scopeId}>${ssrInterpolate(_ctx.$formatDateTime(activeLog.value.created_at))}</span></div><div${_scopeId}><span class="text-[9px] text-slate-400 font-bold uppercase tracking-wider block"${_scopeId}>Nama Pengguna</span><span class="text-slate-900 dark:text-slate-200 mt-1 block font-semibold"${_scopeId}>${ssrInterpolate(((_a = activeLog.value.user) == null ? void 0 : _a.name) || "Sistem / Guest")}</span></div><div${_scopeId}><span class="text-[9px] text-slate-400 font-bold uppercase tracking-wider block"${_scopeId}>IP Address</span><span class="text-slate-900 dark:text-slate-200 mt-1 block font-mono"${_scopeId}>${ssrInterpolate(activeLog.value.ip_address)}</span></div><div${_scopeId}><span class="text-[9px] text-slate-400 font-bold uppercase tracking-wider block"${_scopeId}>Aksi / Operasi</span><span class="text-blue-600 dark:text-blue-400 mt-1 block font-mono font-bold"${_scopeId}>${ssrInterpolate(activeLog.value.action)}</span></div></div><div${_scopeId}><span class="text-[9px] text-slate-400 font-bold uppercase tracking-wider block mb-1"${_scopeId}>User Agent</span><span class="text-slate-600 dark:text-slate-300 block font-light font-mono leading-relaxed bg-paper-2 dark:bg-paper-2-dark p-2.5 rounded-sm border border-rule dark:border-rule-dark"${_scopeId}>${ssrInterpolate(activeLog.value.user_agent)}</span></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><span class="text-[9px] text-slate-400 font-bold uppercase tracking-wider block mb-1"${_scopeId}>Nilai Lama (Old Values)</span><pre class="p-3 bg-paper-2 dark:bg-paper-2-dark border dark:border-slate-800 text-slate-700 dark:text-slate-400 font-mono text-[10px] rounded-sm overflow-x-auto max-h-48"${_scopeId}>${ssrInterpolate(formatJson(activeLog.value.old_values))}</pre></div><div${_scopeId}><span class="text-[9px] text-slate-400 font-bold uppercase tracking-wider block mb-1"${_scopeId}>Nilai Baru (New Values)</span><pre class="p-3 bg-paper-2 dark:bg-paper-2-dark border dark:border-slate-800 text-slate-700 dark:text-slate-400 font-mono text-[10px] rounded-sm overflow-x-auto max-h-48"${_scopeId}>${ssrInterpolate(formatJson(activeLog.value.new_values))}</pre></div></div></div>`);
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
                createVNode("div", { class: "bg-paper dark:bg-gray-800 rounded-card border border-gray-100 dark:border-gray-700 overflow-hidden p-6 space-y-4" }, [
                  createVNode("div", { class: "flex justify-between items-center max-w-md" }, [
                    createVNode("div", { class: "relative w-full" }, [
                      createVNode(_component_Icon, {
                        icon: "solar:magnifer-linear",
                        class: "absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"
                      }),
                      withDirectives(createVNode("input", {
                        type: "text",
                        "onUpdate:modelValue": ($event) => search.value = $event,
                        onKeyup: withKeys(handleSearch, ["enter"]),
                        placeholder: "Cari berdasarkan aksi, nama pengguna...",
                        class: "w-full text-xs pl-10 pr-4 py-2.5 rounded-sm border border-gray-300 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white"
                      }, null, 40, ["onUpdate:modelValue"]), [
                        [vModelText, search.value]
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "overflow-x-auto border border-gray-100 dark:border-gray-700 rounded-card" }, [
                    createVNode("table", { class: "w-full text-left text-sm" }, [
                      createVNode("thead", { class: "bg-gray-50 dark:bg-gray-900/50 text-gray-400 text-xs font-semibold uppercase tracking-wider border-b border-gray-100 dark:border-gray-700" }, [
                        createVNode("tr", null, [
                          createVNode("th", { class: "px-6 py-4" }, "Waktu"),
                          createVNode("th", { class: "px-6 py-4" }, "Pengguna"),
                          createVNode("th", { class: "px-6 py-4" }, "Aksi / Operasi"),
                          createVNode("th", { class: "px-6 py-4" }, "IP Address"),
                          createVNode("th", { class: "px-6 py-4 text-right" }, "Aksi")
                        ])
                      ]),
                      createVNode("tbody", { class: "divide-y divide-gray-200 dark:divide-gray-700" }, [
                        __props.logs.data.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                          createVNode("td", {
                            colspan: "5",
                            class: "px-6 py-8 text-center text-gray-400"
                          }, " Tidak ada catatan log aktivitas ditemukan. ")
                        ])) : createCommentVNode("", true),
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.logs.data, (item) => {
                          var _a2;
                          return openBlock(), createBlock("tr", {
                            key: item.id,
                            class: "hover:bg-gray-50/50 dark:hover:bg-gray-800 transition-colors"
                          }, [
                            createVNode("td", { class: "px-6 py-4 text-xs font-semibold text-gray-500" }, toDisplayString(_ctx.$formatDateTime(item.created_at)), 1),
                            createVNode("td", { class: "px-6 py-4 text-gray-900 dark:text-white font-semibold" }, toDisplayString(((_a2 = item.user) == null ? void 0 : _a2.name) || "Sistem / Guest"), 1),
                            createVNode("td", { class: "px-6 py-4 font-mono text-xs text-blue-600 dark:text-blue-400" }, toDisplayString(item.action), 1),
                            createVNode("td", { class: "px-6 py-4 text-xs text-gray-500" }, toDisplayString(item.ip_address), 1),
                            createVNode("td", { class: "px-6 py-4 text-right" }, [
                              createVNode("div", { class: "flex items-center justify-end gap-2" }, [
                                createVNode("button", {
                                  onClick: ($event) => viewDetails(item.id),
                                  class: "p-2 bg-gray-50 hover:bg-paper-2 text-gray-600 hover:text-blue-600 dark:bg-gray-600 dark:text-gray-300 rounded-sm transition-all",
                                  title: "Detail Log"
                                }, [
                                  createVNode(_component_Icon, {
                                    icon: "solar:eye-bold",
                                    class: "w-4 h-4"
                                  })
                                ], 8, ["onClick"]),
                                createVNode("button", {
                                  onClick: ($event) => confirmDeleteLog(item.id),
                                  class: "p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-sm transition-all",
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
                  createVNode("div", { class: "flex flex-col sm:flex-row justify-between items-center gap-4 pt-2" }, [
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
                        createVNode("span", { class: "text-slate-600 dark:text-slate-300 block font-light font-mono leading-relaxed bg-paper-2 dark:bg-paper-2-dark p-2.5 rounded-sm border border-rule dark:border-rule-dark" }, toDisplayString(activeLog.value.user_agent), 1)
                      ]),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                        createVNode("div", null, [
                          createVNode("span", { class: "text-[9px] text-slate-400 font-bold uppercase tracking-wider block mb-1" }, "Nilai Lama (Old Values)"),
                          createVNode("pre", { class: "p-3 bg-paper-2 dark:bg-paper-2-dark border dark:border-slate-800 text-slate-700 dark:text-slate-400 font-mono text-[10px] rounded-sm overflow-x-auto max-h-48" }, toDisplayString(formatJson(activeLog.value.old_values)), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("span", { class: "text-[9px] text-slate-400 font-bold uppercase tracking-wider block mb-1" }, "Nilai Baru (New Values)"),
                          createVNode("pre", { class: "p-3 bg-paper-2 dark:bg-paper-2-dark border dark:border-slate-800 text-slate-700 dark:text-slate-400 font-mono text-[10px] rounded-sm overflow-x-auto max-h-48" }, toDisplayString(formatJson(activeLog.value.new_values)), 1)
                        ])
                      ])
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
