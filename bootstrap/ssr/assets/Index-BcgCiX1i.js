import { ref, resolveComponent, unref, withCtx, createVNode, withDirectives, withKeys, vModelText, openBlock, createBlock, createCommentVNode, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { Head, Link, router } from "@inertiajs/vue3";
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
    users: Object,
    filters: Object
  },
  setup(__props) {
    const toast = useToast();
    const props = __props;
    const search = ref(props.filters.search || "");
    const handleSearch = () => {
      router.get(route("settings.users.index"), { search: search.value }, {
        preserveState: true,
        preserveScroll: true
      });
    };
    const showConfirmDelete = ref(false);
    const deleteTargetId = ref(null);
    const confirmDeleteUser = (id) => {
      deleteTargetId.value = id;
      showConfirmDelete.value = true;
    };
    const executeDeleteUser = () => {
      router.delete(route("settings.users.destroy", deleteTargetId.value), {
        onSuccess: () => {
          showConfirmDelete.value = false;
        },
        onError: (error) => toast.error("Gagal menghapus user.")
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = resolveComponent("Icon");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Manajemen Pengguna" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-6 w-full"${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700"${_scopeId}><div${_scopeId}><h3 class="text-xl font-bold text-gray-900 dark:text-white"${_scopeId}>Manajemen Pengguna</h3><p class="text-xs text-gray-500 mt-1"${_scopeId}>Kelola akun pengguna, penugasan role, dan OPD instansi.</p></div></div><div class="bg-paper dark:bg-gray-800 rounded-card border border-gray-100 dark:border-gray-700 overflow-hidden p-6 space-y-4"${_scopeId}><div class="flex justify-between items-center max-w-md"${_scopeId}><div class="relative w-full"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:magnifer-linear",
              class: "absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"
            }, null, _parent2, _scopeId));
            _push2(`<input type="text"${ssrRenderAttr("value", search.value)} placeholder="Cari user (nama, email)..." class="w-full text-xs pl-10 pr-4 py-2.5 rounded-sm border border-gray-300 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white"${_scopeId}></div></div><div class="overflow-x-auto border border-gray-100 dark:border-gray-700 rounded-card"${_scopeId}><table class="w-full text-left text-sm"${_scopeId}><thead class="bg-gray-50 dark:bg-gray-900/50 text-gray-400 text-xs font-semibold uppercase tracking-wider border-b border-gray-100 dark:border-gray-700"${_scopeId}><tr${_scopeId}><th class="px-6 py-4"${_scopeId}>Nama</th><th class="px-6 py-4"${_scopeId}>Email</th><th class="px-6 py-4"${_scopeId}>Role</th><th class="px-6 py-4 text-right"${_scopeId}>Aksi</th></tr></thead><tbody class="divide-y divide-gray-200 dark:divide-gray-700"${_scopeId}>`);
            if (__props.users.data.length === 0) {
              _push2(`<tr${_scopeId}><td colspan="4" class="px-6 py-8 text-center text-gray-400"${_scopeId}> Tidak ada data pengguna ditemukan. </td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(__props.users.data, (item) => {
              _push2(`<tr class="hover:bg-gray-50/50 dark:hover:bg-gray-800 transition-colors"${_scopeId}><td class="px-6 py-4 font-semibold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(item.name)}</td><td class="px-6 py-4 text-gray-550 dark:text-gray-300"${_scopeId}>${ssrInterpolate(item.email)}</td><td class="px-6 py-4"${_scopeId}><div class="flex flex-wrap gap-1"${_scopeId}><!--[-->`);
              ssrRenderList(item.roles, (r) => {
                _push2(`<span class="text-[10px] font-bold bg-paper-2 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800 px-2 py-0.5 rounded-md"${_scopeId}>${ssrInterpolate(r.name)}</span>`);
              });
              _push2(`<!--]--></div></td><td class="px-6 py-4 text-right"${_scopeId}><div class="flex items-center justify-end gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("settings.users.edit", item.id),
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
              if (_ctx.$page.props.auth.user.id !== item.id) {
                _push2(`<button class="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-sm transition-all" title="Hapus"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_Icon, {
                  icon: "solar:trash-bin-trash-bold",
                  class: "w-4 h-4"
                }, null, _parent2, _scopeId));
                _push2(`</button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div><div class="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2"${_scopeId}><p class="text-xs text-gray-400"${_scopeId}> Menampilkan ${ssrInterpolate(__props.users.from || 0)} sampai ${ssrInterpolate(__props.users.to || 0)} dari ${ssrInterpolate(__props.users.total)} data </p>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              links: __props.users.links
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              show: showConfirmDelete.value,
              title: "Hapus Akun User",
              message: "Apakah Anda yakin ingin menghapus user ini secara permanen dari sistem? Tindakan ini tidak dapat dibatalkan.",
              "confirm-text": "Ya, Hapus",
              "cancel-text": "Batal",
              type: "danger",
              onConfirm: executeDeleteUser,
              onCancel: ($event) => showConfirmDelete.value = false
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-6 w-full" }, [
                createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700" }, [
                  createVNode("div", null, [
                    createVNode("h3", { class: "text-xl font-bold text-gray-900 dark:text-white" }, "Manajemen Pengguna"),
                    createVNode("p", { class: "text-xs text-gray-500 mt-1" }, "Kelola akun pengguna, penugasan role, dan OPD instansi.")
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
                        placeholder: "Cari user (nama, email)...",
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
                          createVNode("th", { class: "px-6 py-4" }, "Nama"),
                          createVNode("th", { class: "px-6 py-4" }, "Email"),
                          createVNode("th", { class: "px-6 py-4" }, "Role"),
                          createVNode("th", { class: "px-6 py-4 text-right" }, "Aksi")
                        ])
                      ]),
                      createVNode("tbody", { class: "divide-y divide-gray-200 dark:divide-gray-700" }, [
                        __props.users.data.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                          createVNode("td", {
                            colspan: "4",
                            class: "px-6 py-8 text-center text-gray-400"
                          }, " Tidak ada data pengguna ditemukan. ")
                        ])) : createCommentVNode("", true),
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.users.data, (item) => {
                          return openBlock(), createBlock("tr", {
                            key: item.id,
                            class: "hover:bg-gray-50/50 dark:hover:bg-gray-800 transition-colors"
                          }, [
                            createVNode("td", { class: "px-6 py-4 font-semibold text-gray-900 dark:text-white" }, toDisplayString(item.name), 1),
                            createVNode("td", { class: "px-6 py-4 text-gray-550 dark:text-gray-300" }, toDisplayString(item.email), 1),
                            createVNode("td", { class: "px-6 py-4" }, [
                              createVNode("div", { class: "flex flex-wrap gap-1" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(item.roles, (r) => {
                                  return openBlock(), createBlock("span", {
                                    key: r.id,
                                    class: "text-[10px] font-bold bg-paper-2 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800 px-2 py-0.5 rounded-md"
                                  }, toDisplayString(r.name), 1);
                                }), 128))
                              ])
                            ]),
                            createVNode("td", { class: "px-6 py-4 text-right" }, [
                              createVNode("div", { class: "flex items-center justify-end gap-2" }, [
                                createVNode(unref(Link), {
                                  href: _ctx.route("settings.users.edit", item.id),
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
                                _ctx.$page.props.auth.user.id !== item.id ? (openBlock(), createBlock("button", {
                                  key: 0,
                                  onClick: ($event) => confirmDeleteUser(item.id),
                                  class: "p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-sm transition-all",
                                  title: "Hapus"
                                }, [
                                  createVNode(_component_Icon, {
                                    icon: "solar:trash-bin-trash-bold",
                                    class: "w-4 h-4"
                                  })
                                ], 8, ["onClick"])) : createCommentVNode("", true)
                              ])
                            ])
                          ]);
                        }), 128))
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "flex flex-col sm:flex-row justify-between items-center gap-4 pt-2" }, [
                    createVNode("p", { class: "text-xs text-gray-400" }, " Menampilkan " + toDisplayString(__props.users.from || 0) + " sampai " + toDisplayString(__props.users.to || 0) + " dari " + toDisplayString(__props.users.total) + " data ", 1),
                    createVNode(_sfc_main$2, {
                      links: __props.users.links
                    }, null, 8, ["links"])
                  ])
                ]),
                createVNode(_sfc_main$3, {
                  show: showConfirmDelete.value,
                  title: "Hapus Akun User",
                  message: "Apakah Anda yakin ingin menghapus user ini secara permanen dari sistem? Tindakan ini tidak dapat dibatalkan.",
                  "confirm-text": "Ya, Hapus",
                  "cancel-text": "Batal",
                  type: "danger",
                  onConfirm: executeDeleteUser,
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Backend/Settings/Users/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
