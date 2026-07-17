import { ref, resolveComponent, unref, withCtx, createVNode, createTextVNode, withDirectives, withKeys, vModelText, openBlock, createBlock, createCommentVNode, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { Head, Link, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-C8eooNFo.js";
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
    permissions: Object,
    filters: Object
  },
  setup(__props) {
    const toast = useToast();
    const props = __props;
    const search = ref(props.filters.search || "");
    const handleSearch = () => {
      router.get(route("settings.permissions.index"), { search: search.value }, {
        preserveState: true,
        preserveScroll: true
      });
    };
    const showConfirmDelete = ref(false);
    const deleteTargetId = ref(null);
    const confirmDeletePermission = (id) => {
      deleteTargetId.value = id;
      showConfirmDelete.value = true;
    };
    const executeDeletePermission = () => {
      router.delete(route("settings.permissions.destroy", deleteTargetId.value), {
        onSuccess: () => {
          showConfirmDelete.value = false;
        },
        onError: (error) => toast.error("Gagal menghapus permission.")
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = resolveComponent("Icon");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Manajemen Permission" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-6 w-full"${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700"${_scopeId}><div${_scopeId}><h3 class="text-xl font-bold text-gray-900 dark:text-white"${_scopeId}>Manajemen Permission</h3><p class="text-xs text-gray-500 mt-1"${_scopeId}>Daftar perizinan akses sistem granular yang digunakan SIKAJIAN.</p></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("settings.permissions.create"),
              class: "inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-accent-ink font-semibold rounded-card transition-all text-sm shrink-0"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Icon, {
                    icon: "solar:add-circle-bold",
                    class: "w-5 h-5"
                  }, null, _parent3, _scopeId2));
                  _push3(` Tambah Permission `);
                } else {
                  return [
                    createVNode(_component_Icon, {
                      icon: "solar:add-circle-bold",
                      class: "w-5 h-5"
                    }),
                    createTextVNode(" Tambah Permission ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="bg-paper dark:bg-gray-800 rounded-card border border-gray-100 dark:border-gray-700 overflow-hidden p-6 space-y-4"${_scopeId}><div class="flex justify-between items-center max-w-md"${_scopeId}><div class="relative w-full"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:magnifer-linear",
              class: "absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"
            }, null, _parent2, _scopeId));
            _push2(`<input type="text"${ssrRenderAttr("value", search.value)} placeholder="Cari permission..." class="w-full text-xs pl-10 pr-4 py-2.5 rounded-sm border border-gray-300 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white"${_scopeId}></div></div><div class="overflow-x-auto border border-gray-100 dark:border-gray-700 rounded-card"${_scopeId}><table class="w-full text-left text-sm"${_scopeId}><thead class="bg-gray-50 dark:bg-gray-900/50 text-gray-400 text-xs font-semibold uppercase tracking-wider border-b border-gray-100 dark:border-gray-700"${_scopeId}><tr${_scopeId}><th class="px-6 py-4"${_scopeId}>Nama Permission</th><th class="px-6 py-4"${_scopeId}>Slug</th><th class="px-6 py-4 text-right"${_scopeId}>Aksi</th></tr></thead><tbody class="divide-y divide-gray-200 dark:divide-gray-700"${_scopeId}>`);
            if (__props.permissions.data.length === 0) {
              _push2(`<tr${_scopeId}><td colspan="3" class="px-6 py-8 text-center text-gray-400"${_scopeId}> Tidak ada data permission ditemukan. </td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(__props.permissions.data, (item) => {
              _push2(`<tr class="hover:bg-gray-50/50 dark:hover:bg-gray-800 transition-colors"${_scopeId}><td class="px-6 py-4 font-semibold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(item.name)}</td><td class="px-6 py-4 text-gray-500 font-mono text-xs"${_scopeId}>${ssrInterpolate(item.slug)}</td><td class="px-6 py-4 text-right"${_scopeId}><div class="flex items-center justify-end gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("settings.permissions.edit", item.id),
                class: "p-2 bg-gray-50 hover:bg-amber-50 text-gray-600 hover:text-amber-600 dark:bg-gray-600 dark:text-gray-300 rounded-sm transition-all",
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
              _push2(`<button class="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-sm transition-all" title="Hapus"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                icon: "solar:trash-bin-trash-bold",
                class: "w-4 h-4"
              }, null, _parent2, _scopeId));
              _push2(`</button></div></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div><div class="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2"${_scopeId}><p class="text-xs text-gray-400"${_scopeId}> Menampilkan ${ssrInterpolate(__props.permissions.from || 0)} sampai ${ssrInterpolate(__props.permissions.to || 0)} dari ${ssrInterpolate(__props.permissions.total)} data </p>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              links: __props.permissions.links
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              show: showConfirmDelete.value,
              title: "Hapus Hak Akses (Permission)",
              message: "Apakah Anda yakin ingin menghapus permission ini secara permanen dari sistem? Tindakan ini dapat memengaruhi otorisasi fitur.",
              "confirm-text": "Ya, Hapus",
              "cancel-text": "Batal",
              type: "danger",
              onConfirm: executeDeletePermission,
              onCancel: ($event) => showConfirmDelete.value = false
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-6 w-full" }, [
                createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700" }, [
                  createVNode("div", null, [
                    createVNode("h3", { class: "text-xl font-bold text-gray-900 dark:text-white" }, "Manajemen Permission"),
                    createVNode("p", { class: "text-xs text-gray-500 mt-1" }, "Daftar perizinan akses sistem granular yang digunakan SIKAJIAN.")
                  ]),
                  createVNode(unref(Link), {
                    href: _ctx.route("settings.permissions.create"),
                    class: "inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-accent-ink font-semibold rounded-card transition-all text-sm shrink-0"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Icon, {
                        icon: "solar:add-circle-bold",
                        class: "w-5 h-5"
                      }),
                      createTextVNode(" Tambah Permission ")
                    ]),
                    _: 1
                  }, 8, ["href"])
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
                        placeholder: "Cari permission...",
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
                          createVNode("th", { class: "px-6 py-4" }, "Nama Permission"),
                          createVNode("th", { class: "px-6 py-4" }, "Slug"),
                          createVNode("th", { class: "px-6 py-4 text-right" }, "Aksi")
                        ])
                      ]),
                      createVNode("tbody", { class: "divide-y divide-gray-200 dark:divide-gray-700" }, [
                        __props.permissions.data.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                          createVNode("td", {
                            colspan: "3",
                            class: "px-6 py-8 text-center text-gray-400"
                          }, " Tidak ada data permission ditemukan. ")
                        ])) : createCommentVNode("", true),
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.permissions.data, (item) => {
                          return openBlock(), createBlock("tr", {
                            key: item.id,
                            class: "hover:bg-gray-50/50 dark:hover:bg-gray-800 transition-colors"
                          }, [
                            createVNode("td", { class: "px-6 py-4 font-semibold text-gray-900 dark:text-white" }, toDisplayString(item.name), 1),
                            createVNode("td", { class: "px-6 py-4 text-gray-500 font-mono text-xs" }, toDisplayString(item.slug), 1),
                            createVNode("td", { class: "px-6 py-4 text-right" }, [
                              createVNode("div", { class: "flex items-center justify-end gap-2" }, [
                                createVNode(unref(Link), {
                                  href: _ctx.route("settings.permissions.edit", item.id),
                                  class: "p-2 bg-gray-50 hover:bg-amber-50 text-gray-600 hover:text-amber-600 dark:bg-gray-600 dark:text-gray-300 rounded-sm transition-all",
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
                                  onClick: ($event) => confirmDeletePermission(item.id),
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
                    createVNode("p", { class: "text-xs text-gray-400" }, " Menampilkan " + toDisplayString(__props.permissions.from || 0) + " sampai " + toDisplayString(__props.permissions.to || 0) + " dari " + toDisplayString(__props.permissions.total) + " data ", 1),
                    createVNode(_sfc_main$2, {
                      links: __props.permissions.links
                    }, null, 8, ["links"])
                  ])
                ]),
                createVNode(_sfc_main$3, {
                  show: showConfirmDelete.value,
                  title: "Hapus Hak Akses (Permission)",
                  message: "Apakah Anda yakin ingin menghapus permission ini secara permanen dari sistem? Tindakan ini dapat memengaruhi otorisasi fitur.",
                  "confirm-text": "Ya, Hapus",
                  "cancel-text": "Batal",
                  type: "danger",
                  onConfirm: executeDeletePermission,
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Backend/Settings/Permissions/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
