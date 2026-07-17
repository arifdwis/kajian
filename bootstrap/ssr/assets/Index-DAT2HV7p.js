import { ref, resolveComponent, unref, withCtx, createVNode, createTextVNode, withDirectives, withKeys, vModelText, openBlock, createBlock, createCommentVNode, Fragment, renderList, toDisplayString, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useForm, Head, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-CCLRqrRv.js";
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
    keywords: Object,
    filters: Object
  },
  setup(__props) {
    const toast = useToast();
    const props = __props;
    const search = ref(props.filters.search || "");
    const showModal = ref(false);
    const isEdit = ref(false);
    const currentId = ref(null);
    const form = useForm({
      nama: ""
    });
    const handleSearch = () => {
      router.get(route("master.kata-kunci.index"), { search: search.value }, {
        preserveState: true,
        preserveScroll: true
      });
    };
    const openCreateModal = () => {
      isEdit.value = false;
      form.reset();
      form.clearErrors();
      showModal.value = true;
    };
    const openEditModal = (kw) => {
      isEdit.value = true;
      currentId.value = kw.id;
      form.nama = kw.nama;
      form.clearErrors();
      showModal.value = true;
    };
    const closeModal = () => {
      showModal.value = false;
      form.reset();
    };
    const submit = () => {
      if (isEdit.value) {
        form.put(route("master.kata-kunci.update", currentId.value), {
          onSuccess: () => {
            closeModal();
          },
          onError: (errors) => {
            Object.values(errors).forEach((err) => toast.error(err));
          }
        });
      } else {
        form.post(route("master.kata-kunci.store"), {
          onSuccess: () => {
            closeModal();
          },
          onError: (errors) => {
            Object.values(errors).forEach((err) => toast.error(err));
          }
        });
      }
    };
    const showConfirmDelete = ref(false);
    const deleteTargetId = ref(null);
    const confirmDeleteKeyword = (id) => {
      deleteTargetId.value = id;
      showConfirmDelete.value = true;
    };
    const executeDeleteKeyword = () => {
      router.delete(route("master.kata-kunci.destroy", deleteTargetId.value), {
        onSuccess: () => {
          showConfirmDelete.value = false;
        },
        onError: (error) => toast.error("Gagal menghapus kata kunci.")
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = resolveComponent("Icon");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Master Kata Kunci" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-6 w-full"${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700"${_scopeId}><div${_scopeId}><h3 class="text-xl font-bold text-gray-900 dark:text-white"${_scopeId}>Master Kata Kunci</h3><p class="text-xs text-gray-500 mt-1"${_scopeId}>Kelola tag kata kunci pencarian kajian ilmiah daerah.</p></div><button class="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-accent-ink font-semibold rounded-card transition-all text-sm shrink-0"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:add-circle-bold",
              class: "w-5 h-5"
            }, null, _parent2, _scopeId));
            _push2(` Tambah Kata Kunci </button></div><div class="bg-paper dark:bg-gray-800 rounded-card border border-gray-100 dark:border-gray-700 overflow-hidden p-6 space-y-4"${_scopeId}><div class="flex justify-between items-center max-w-md"${_scopeId}><div class="relative w-full"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:magnifer-linear",
              class: "absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"
            }, null, _parent2, _scopeId));
            _push2(`<input type="text"${ssrRenderAttr("value", search.value)} placeholder="Cari kata kunci..." class="w-full text-xs pl-10 pr-4 py-2.5 rounded-sm border border-gray-300 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white"${_scopeId}></div></div><div class="overflow-x-auto border border-gray-100 dark:border-gray-700 rounded-card"${_scopeId}><table class="w-full text-left text-sm"${_scopeId}><thead class="bg-gray-50 dark:bg-gray-900/50 text-gray-400 text-xs font-semibold uppercase tracking-wider border-b border-gray-100 dark:border-gray-700"${_scopeId}><tr${_scopeId}><th class="px-6 py-4"${_scopeId}>Nama Tag</th><th class="px-6 py-4"${_scopeId}>Slug</th><th class="px-6 py-4 text-right"${_scopeId}>Aksi</th></tr></thead><tbody class="divide-y divide-gray-200 dark:divide-gray-700"${_scopeId}>`);
            if (__props.keywords.data.length === 0) {
              _push2(`<tr${_scopeId}><td colspan="3" class="px-6 py-8 text-center text-gray-400"${_scopeId}> Tidak ada data kata kunci ditemukan. </td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(__props.keywords.data, (item) => {
              _push2(`<tr class="hover:bg-gray-50/50 dark:hover:bg-gray-800 transition-colors"${_scopeId}><td class="px-6 py-4 font-semibold text-gray-900 dark:text-white"${_scopeId}><span class="inline-block bg-paper-2 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-medium px-2.5 py-1 rounded-sm border border-slate-100 dark:border-slate-600"${_scopeId}> #${ssrInterpolate(item.nama)}</span></td><td class="px-6 py-4 text-gray-500 font-mono text-xs"${_scopeId}>${ssrInterpolate(item.slug)}</td><td class="px-6 py-4 text-right"${_scopeId}><div class="flex items-center justify-end gap-2"${_scopeId}><button class="p-2 bg-gray-50 hover:bg-amber-50 text-gray-600 hover:text-amber-600 dark:bg-gray-600 dark:text-gray-300 rounded-sm transition-all" title="Edit"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                icon: "solar:pen-bold",
                class: "w-4 h-4"
              }, null, _parent2, _scopeId));
              _push2(`</button><button class="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-sm transition-all" title="Hapus"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                icon: "solar:trash-bin-trash-bold",
                class: "w-4 h-4"
              }, null, _parent2, _scopeId));
              _push2(`</button></div></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div><div class="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2"${_scopeId}><p class="text-xs text-gray-400"${_scopeId}> Menampilkan ${ssrInterpolate(__props.keywords.from || 0)} sampai ${ssrInterpolate(__props.keywords.to || 0)} dari ${ssrInterpolate(__props.keywords.total)} data </p>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              links: __props.keywords.links
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
            if (showModal.value) {
              _push2(`<div class="fixed inset-0 z-50 flex items-center justify-center p-4"${_scopeId}><div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"${_scopeId}></div><div class="relative w-full max-w-md bg-paper dark:bg-paper-dark border border-rule dark:border-rule-dark rounded-card p-6 space-y-4"${_scopeId}><div class="flex justify-between items-center border-b dark:border-slate-800 pb-3"${_scopeId}><h4 class="font-bold text-slate-900 dark:text-white"${_scopeId}>${ssrInterpolate(isEdit.value ? "Edit Kata Kunci" : "Tambah Kata Kunci")}</h4><button class="text-slate-400 hover:text-slate-600"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                icon: "solar:close-square-linear",
                class: "w-5 h-5"
              }, null, _parent2, _scopeId));
              _push2(`</button></div><form class="space-y-4"${_scopeId}><div${_scopeId}><label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2"${_scopeId}>Nama Tag <span class="text-red-500"${_scopeId}>*</span></label><input type="text"${ssrRenderAttr("value", unref(form).nama)} required placeholder="E.g., Perkotaan, Lingkungan" class="w-full text-sm rounded-sm border border-rule dark:border-rule-dark bg-paper dark:bg-slate-950 text-slate-900 dark:text-white px-4 py-2.5 focus:ring-2 focus:ring-blue-500/20"${_scopeId}></div><div class="flex justify-end gap-2 border-t dark:border-slate-800 pt-4"${_scopeId}><button type="button" class="px-4 py-2 border border-rule dark:border-rule-dark text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-sm"${_scopeId}> Batal </button><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="px-5 py-2 bg-accent text-accent-ink text-xs font-bold rounded-sm transition-all"${_scopeId}> Simpan </button></div></form></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_sfc_main$3, {
              show: showConfirmDelete.value,
              title: "Hapus Kata Kunci",
              message: "Apakah Anda yakin ingin menghapus kata kunci ini? Tindakan ini tidak dapat dibatalkan.",
              "confirm-text": "Ya, Hapus",
              "cancel-text": "Batal",
              type: "danger",
              onConfirm: executeDeleteKeyword,
              onCancel: ($event) => showConfirmDelete.value = false
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-6 w-full" }, [
                createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700" }, [
                  createVNode("div", null, [
                    createVNode("h3", { class: "text-xl font-bold text-gray-900 dark:text-white" }, "Master Kata Kunci"),
                    createVNode("p", { class: "text-xs text-gray-500 mt-1" }, "Kelola tag kata kunci pencarian kajian ilmiah daerah.")
                  ]),
                  createVNode("button", {
                    onClick: openCreateModal,
                    class: "inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-accent-ink font-semibold rounded-card transition-all text-sm shrink-0"
                  }, [
                    createVNode(_component_Icon, {
                      icon: "solar:add-circle-bold",
                      class: "w-5 h-5"
                    }),
                    createTextVNode(" Tambah Kata Kunci ")
                  ])
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
                        placeholder: "Cari kata kunci...",
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
                          createVNode("th", { class: "px-6 py-4" }, "Nama Tag"),
                          createVNode("th", { class: "px-6 py-4" }, "Slug"),
                          createVNode("th", { class: "px-6 py-4 text-right" }, "Aksi")
                        ])
                      ]),
                      createVNode("tbody", { class: "divide-y divide-gray-200 dark:divide-gray-700" }, [
                        __props.keywords.data.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                          createVNode("td", {
                            colspan: "3",
                            class: "px-6 py-8 text-center text-gray-400"
                          }, " Tidak ada data kata kunci ditemukan. ")
                        ])) : createCommentVNode("", true),
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.keywords.data, (item) => {
                          return openBlock(), createBlock("tr", {
                            key: item.id,
                            class: "hover:bg-gray-50/50 dark:hover:bg-gray-800 transition-colors"
                          }, [
                            createVNode("td", { class: "px-6 py-4 font-semibold text-gray-900 dark:text-white" }, [
                              createVNode("span", { class: "inline-block bg-paper-2 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-medium px-2.5 py-1 rounded-sm border border-slate-100 dark:border-slate-600" }, " #" + toDisplayString(item.nama), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 text-gray-500 font-mono text-xs" }, toDisplayString(item.slug), 1),
                            createVNode("td", { class: "px-6 py-4 text-right" }, [
                              createVNode("div", { class: "flex items-center justify-end gap-2" }, [
                                createVNode("button", {
                                  onClick: ($event) => openEditModal(item),
                                  class: "p-2 bg-gray-50 hover:bg-amber-50 text-gray-600 hover:text-amber-600 dark:bg-gray-600 dark:text-gray-300 rounded-sm transition-all",
                                  title: "Edit"
                                }, [
                                  createVNode(_component_Icon, {
                                    icon: "solar:pen-bold",
                                    class: "w-4 h-4"
                                  })
                                ], 8, ["onClick"]),
                                createVNode("button", {
                                  onClick: ($event) => confirmDeleteKeyword(item.id),
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
                    createVNode("p", { class: "text-xs text-gray-400" }, " Menampilkan " + toDisplayString(__props.keywords.from || 0) + " sampai " + toDisplayString(__props.keywords.to || 0) + " dari " + toDisplayString(__props.keywords.total) + " data ", 1),
                    createVNode(_sfc_main$2, {
                      links: __props.keywords.links
                    }, null, 8, ["links"])
                  ])
                ]),
                showModal.value ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "fixed inset-0 z-50 flex items-center justify-center p-4"
                }, [
                  createVNode("div", {
                    class: "absolute inset-0 bg-slate-900/40 backdrop-blur-sm",
                    onClick: closeModal
                  }),
                  createVNode("div", { class: "relative w-full max-w-md bg-paper dark:bg-paper-dark border border-rule dark:border-rule-dark rounded-card p-6 space-y-4" }, [
                    createVNode("div", { class: "flex justify-between items-center border-b dark:border-slate-800 pb-3" }, [
                      createVNode("h4", { class: "font-bold text-slate-900 dark:text-white" }, toDisplayString(isEdit.value ? "Edit Kata Kunci" : "Tambah Kata Kunci"), 1),
                      createVNode("button", {
                        onClick: closeModal,
                        class: "text-slate-400 hover:text-slate-600"
                      }, [
                        createVNode(_component_Icon, {
                          icon: "solar:close-square-linear",
                          class: "w-5 h-5"
                        })
                      ])
                    ]),
                    createVNode("form", {
                      onSubmit: withModifiers(submit, ["prevent"]),
                      class: "space-y-4"
                    }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2" }, [
                          createTextVNode("Nama Tag "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).nama = $event,
                          required: "",
                          placeholder: "E.g., Perkotaan, Lingkungan",
                          class: "w-full text-sm rounded-sm border border-rule dark:border-rule-dark bg-paper dark:bg-slate-950 text-slate-900 dark:text-white px-4 py-2.5 focus:ring-2 focus:ring-blue-500/20"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).nama]
                        ])
                      ]),
                      createVNode("div", { class: "flex justify-end gap-2 border-t dark:border-slate-800 pt-4" }, [
                        createVNode("button", {
                          type: "button",
                          onClick: closeModal,
                          class: "px-4 py-2 border border-rule dark:border-rule-dark text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-sm"
                        }, " Batal "),
                        createVNode("button", {
                          type: "submit",
                          disabled: unref(form).processing,
                          class: "px-5 py-2 bg-accent text-accent-ink text-xs font-bold rounded-sm transition-all"
                        }, " Simpan ", 8, ["disabled"])
                      ])
                    ], 32)
                  ])
                ])) : createCommentVNode("", true),
                createVNode(_sfc_main$3, {
                  show: showConfirmDelete.value,
                  title: "Hapus Kata Kunci",
                  message: "Apakah Anda yakin ingin menghapus kata kunci ini? Tindakan ini tidak dapat dibatalkan.",
                  "confirm-text": "Ya, Hapus",
                  "cancel-text": "Batal",
                  type: "danger",
                  onConfirm: executeDeleteKeyword,
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Backend/Master/KataKunci/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
