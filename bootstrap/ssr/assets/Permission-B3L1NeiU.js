import { ref, computed, resolveComponent, unref, withCtx, createVNode, createTextVNode, toDisplayString, withDirectives, vModelText, withModifiers, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderStyle, ssrRenderAttr, ssrRenderList, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-C8eooNFo.js";
import { useToast } from "vue-toastification";
import "flowbite-vue";
import "./ApplicationLogo-CmsQkCHn.js";
import "@iconify/vue";
import "mitt";
const _sfc_main = {
  __name: "Permission",
  __ssrInlineRender: true,
  props: {
    role: Object,
    permissions: Array,
    rolePermissions: Array
  },
  setup(__props) {
    const toast = useToast();
    const props = __props;
    const form = useForm({
      permissions: [...props.rolePermissions]
    });
    const searchQuery = ref("");
    const selectAll = () => {
      form.permissions = props.permissions.map((p) => p.id);
    };
    const deselectAll = () => {
      form.permissions = [];
    };
    const submit = () => {
      form.put(route("settings.roles.permission.update", props.role.id), {
        onSuccess: () => toast.success("Hak akses role berhasil disinkronkan."),
        onError: (errors) => {
          Object.values(errors).forEach((err) => toast.error(err));
        }
      });
    };
    const groupedPermissions = computed(() => {
      const groups = {};
      props.permissions.forEach((p) => {
        const parts = p.name.split(".");
        const groupName = parts[0] || "Lainnya";
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
        const matched = perms.filter((p) => p.name.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q) || group.toLowerCase().includes(q));
        if (matched.length > 0) filtered[group] = matched;
      });
      return filtered;
    });
    const selectedCount = computed(() => form.permissions.length);
    const totalCount = computed(() => props.permissions.length);
    const progress = computed(() => totalCount.value > 0 ? Math.round(selectedCount.value / totalCount.value * 100) : 0);
    const groupSelectedCount = (groupName) => {
      const perms = groupedPermissions.value[groupName] || [];
      return perms.filter((p) => form.permissions.includes(p.id)).length;
    };
    const toggleGroup = (groupName) => {
      const perms = groupedPermissions.value[groupName];
      const allSelected = perms.every((p) => form.permissions.includes(p.id));
      perms.forEach((p) => {
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
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = resolveComponent("Icon");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: "Akses Role: " + __props.role.name
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-4"${_scopeId}><div class="bg-paper dark:bg-gray-800 p-5 rounded-card border border-gray-100 dark:border-gray-700"${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"${_scopeId}><div class="flex items-center gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("settings.roles.index"),
              class: "p-2 bg-gray-50 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-sm transition-all"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Icon, {
                    icon: "solar:arrow-left-outline",
                    class: "w-5 h-5"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Icon, {
                      icon: "solar:arrow-left-outline",
                      class: "w-5 h-5"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div${_scopeId}><h3 class="text-lg font-bold text-gray-900 dark:text-white"${_scopeId}>Hak Akses: ${ssrInterpolate(__props.role.name)}</h3><div class="flex items-center gap-3 mt-1"${_scopeId}><span class="text-[11px] text-gray-500"${_scopeId}>${ssrInterpolate(selectedCount.value)} / ${ssrInterpolate(totalCount.value)} permission</span><span class="text-[11px] text-gray-300 dark:text-gray-600"${_scopeId}>•</span><span class="${ssrRenderClass([progress.value === 100 ? "text-green-500" : "text-blue-500", "text-[11px] font-semibold"])}"${_scopeId}>${ssrInterpolate(progress.value)}%</span></div></div></div><div class="flex gap-2"${_scopeId}><button class="px-3 py-1.5 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 text-[11px] font-semibold rounded-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"${_scopeId}>Pilih Semua</button><button class="px-3 py-1.5 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 text-[11px] font-semibold rounded-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"${_scopeId}>Kosongkan</button></div></div><div class="mt-3 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden"${_scopeId}><div class="${ssrRenderClass([progress.value === 100 ? "bg-green-500" : "bg-blue-500", "h-full rounded-full transition-all duration-300"])}" style="${ssrRenderStyle({ width: progress.value + "%" })}"${_scopeId}></div></div></div><div class="relative"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:magnifer-linear",
              class: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            }, null, _parent2, _scopeId));
            _push2(`<input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Cari permission..." class="w-full pl-9 pr-4 py-2 text-xs rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20"${_scopeId}></div><form${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 items-start"${_scopeId}><!--[-->`);
            ssrRenderList(filteredGroups.value, (perms, groupName) => {
              _push2(`<div class="bg-paper dark:bg-gray-800 rounded-card border border-gray-100 dark:border-gray-700 overflow-hidden"${_scopeId}><div class="flex items-center justify-between px-4 py-2.5 bg-gray-50/50 dark:bg-gray-750 border-b border-gray-100 dark:border-gray-700"${_scopeId}><div class="flex items-center gap-2"${_scopeId}><span class="text-[11px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider capitalize"${_scopeId}>${ssrInterpolate(groupName)}</span><span class="${ssrRenderClass([groupSelectedCount(groupName) === perms.length ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400", "text-[10px] px-1.5 py-0.5 rounded-full font-semibold"])}"${_scopeId}>${ssrInterpolate(groupSelectedCount(groupName))}/${ssrInterpolate(perms.length)}</span></div><button type="button" class="${ssrRenderClass([groupSelectedCount(groupName) === perms.length ? "text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/20" : "text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20", "text-[10px] font-semibold px-2 py-0.5 rounded transition-colors"])}"${_scopeId}>${ssrInterpolate(groupSelectedCount(groupName) === perms.length ? "✓ Terpilih" : "Pilih")}</button></div><div class="p-2 flex flex-wrap gap-1.5"${_scopeId}><!--[-->`);
              ssrRenderList(perms, (p) => {
                _push2(`<button type="button" class="${ssrRenderClass([unref(form).permissions.includes(p.id) ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 shadow-sm" : "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-200 dark:hover:border-gray-600", "inline-flex items-center gap-1 px-2 py-1 rounded text-[11px] border transition-all cursor-pointer select-none"])}"${_scopeId}><span class="${ssrRenderClass([unref(form).permissions.includes(p.id) ? "bg-blue-500 border-blue-500" : "border-gray-300 dark:border-gray-600", "w-3 h-3 rounded-sm border flex items-center justify-center shrink-0 transition-colors"])}"${_scopeId}>`);
                if (unref(form).permissions.includes(p.id)) {
                  _push2(ssrRenderComponent(_component_Icon, {
                    icon: "solar:check-read-bold",
                    class: "w-2.5 h-2.5 text-white"
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</span><span class="font-medium"${_scopeId}>${ssrInterpolate(p.name)}</span></button>`);
              });
              _push2(`<!--]--></div></div>`);
            });
            _push2(`<!--]--></div>`);
            if (Object.keys(filteredGroups.value).length === 0) {
              _push2(`<div class="text-center py-12 text-gray-400 text-sm"${_scopeId}> Tidak ditemukan permission yang cocok. </div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="flex items-center justify-between gap-3 mt-4 bg-paper dark:bg-gray-800 p-4 rounded-card border border-gray-100 dark:border-gray-700 sticky bottom-0"${_scopeId}><span class="text-[11px] text-gray-400"${_scopeId}>${ssrInterpolate(selectedCount.value)} permission akan disimpan</span><div class="flex gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("settings.roles.index"),
              class: "px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-xs font-semibold rounded-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Batal `);
                } else {
                  return [
                    createTextVNode(" Batal ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="px-5 py-2 bg-accent text-accent-ink text-xs font-bold rounded-sm transition-all inline-flex items-center gap-1.5"${_scopeId}>`);
            if (unref(form).processing) {
              _push2(ssrRenderComponent(_component_Icon, {
                icon: "svg-spinners:ring-resize",
                class: "w-4 h-4 animate-spin"
              }, null, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(_component_Icon, {
                icon: "solar:disk-bold",
                class: "w-4 h-4"
              }, null, _parent2, _scopeId));
            }
            _push2(` Simpan </button></div></div></form></div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-4" }, [
                createVNode("div", { class: "bg-paper dark:bg-gray-800 p-5 rounded-card border border-gray-100 dark:border-gray-700" }, [
                  createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" }, [
                    createVNode("div", { class: "flex items-center gap-3" }, [
                      createVNode(unref(Link), {
                        href: _ctx.route("settings.roles.index"),
                        class: "p-2 bg-gray-50 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-sm transition-all"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_Icon, {
                            icon: "solar:arrow-left-outline",
                            class: "w-5 h-5"
                          })
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createVNode("div", null, [
                        createVNode("h3", { class: "text-lg font-bold text-gray-900 dark:text-white" }, "Hak Akses: " + toDisplayString(__props.role.name), 1),
                        createVNode("div", { class: "flex items-center gap-3 mt-1" }, [
                          createVNode("span", { class: "text-[11px] text-gray-500" }, toDisplayString(selectedCount.value) + " / " + toDisplayString(totalCount.value) + " permission", 1),
                          createVNode("span", { class: "text-[11px] text-gray-300 dark:text-gray-600" }, "•"),
                          createVNode("span", {
                            class: ["text-[11px] font-semibold", progress.value === 100 ? "text-green-500" : "text-blue-500"]
                          }, toDisplayString(progress.value) + "%", 3)
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "flex gap-2" }, [
                      createVNode("button", {
                        onClick: selectAll,
                        class: "px-3 py-1.5 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 text-[11px] font-semibold rounded-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      }, "Pilih Semua"),
                      createVNode("button", {
                        onClick: deselectAll,
                        class: "px-3 py-1.5 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 text-[11px] font-semibold rounded-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      }, "Kosongkan")
                    ])
                  ]),
                  createVNode("div", { class: "mt-3 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden" }, [
                    createVNode("div", {
                      class: ["h-full rounded-full transition-all duration-300", progress.value === 100 ? "bg-green-500" : "bg-blue-500"],
                      style: { width: progress.value + "%" }
                    }, null, 6)
                  ])
                ]),
                createVNode("div", { class: "relative" }, [
                  createVNode(_component_Icon, {
                    icon: "solar:magnifer-linear",
                    class: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                  }),
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                    type: "text",
                    placeholder: "Cari permission...",
                    class: "w-full pl-9 pr-4 py-2 text-xs rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, searchQuery.value]
                  ])
                ]),
                createVNode("form", {
                  onSubmit: withModifiers(submit, ["prevent"])
                }, [
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 items-start" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(filteredGroups.value, (perms, groupName) => {
                      return openBlock(), createBlock("div", {
                        key: groupName,
                        class: "bg-paper dark:bg-gray-800 rounded-card border border-gray-100 dark:border-gray-700 overflow-hidden"
                      }, [
                        createVNode("div", { class: "flex items-center justify-between px-4 py-2.5 bg-gray-50/50 dark:bg-gray-750 border-b border-gray-100 dark:border-gray-700" }, [
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode("span", { class: "text-[11px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider capitalize" }, toDisplayString(groupName), 1),
                            createVNode("span", {
                              class: ["text-[10px] px-1.5 py-0.5 rounded-full font-semibold", groupSelectedCount(groupName) === perms.length ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400"]
                            }, toDisplayString(groupSelectedCount(groupName)) + "/" + toDisplayString(perms.length), 3)
                          ]),
                          createVNode("button", {
                            type: "button",
                            onClick: ($event) => toggleGroup(groupName),
                            class: ["text-[10px] font-semibold px-2 py-0.5 rounded transition-colors", groupSelectedCount(groupName) === perms.length ? "text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/20" : "text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20"]
                          }, toDisplayString(groupSelectedCount(groupName) === perms.length ? "✓ Terpilih" : "Pilih"), 11, ["onClick"])
                        ]),
                        createVNode("div", { class: "p-2 flex flex-wrap gap-1.5" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(perms, (p) => {
                            return openBlock(), createBlock("button", {
                              key: p.id,
                              type: "button",
                              onClick: ($event) => togglePerm(p.id),
                              class: ["inline-flex items-center gap-1 px-2 py-1 rounded text-[11px] border transition-all cursor-pointer select-none", unref(form).permissions.includes(p.id) ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 shadow-sm" : "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-200 dark:hover:border-gray-600"]
                            }, [
                              createVNode("span", {
                                class: ["w-3 h-3 rounded-sm border flex items-center justify-center shrink-0 transition-colors", unref(form).permissions.includes(p.id) ? "bg-blue-500 border-blue-500" : "border-gray-300 dark:border-gray-600"]
                              }, [
                                unref(form).permissions.includes(p.id) ? (openBlock(), createBlock(_component_Icon, {
                                  key: 0,
                                  icon: "solar:check-read-bold",
                                  class: "w-2.5 h-2.5 text-white"
                                })) : createCommentVNode("", true)
                              ], 2),
                              createVNode("span", { class: "font-medium" }, toDisplayString(p.name), 1)
                            ], 10, ["onClick"]);
                          }), 128))
                        ])
                      ]);
                    }), 128))
                  ]),
                  Object.keys(filteredGroups.value).length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "text-center py-12 text-gray-400 text-sm"
                  }, " Tidak ditemukan permission yang cocok. ")) : createCommentVNode("", true),
                  createVNode("div", { class: "flex items-center justify-between gap-3 mt-4 bg-paper dark:bg-gray-800 p-4 rounded-card border border-gray-100 dark:border-gray-700 sticky bottom-0" }, [
                    createVNode("span", { class: "text-[11px] text-gray-400" }, toDisplayString(selectedCount.value) + " permission akan disimpan", 1),
                    createVNode("div", { class: "flex gap-2" }, [
                      createVNode(unref(Link), {
                        href: _ctx.route("settings.roles.index"),
                        class: "px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-xs font-semibold rounded-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Batal ")
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createVNode("button", {
                        type: "submit",
                        disabled: unref(form).processing,
                        class: "px-5 py-2 bg-accent text-accent-ink text-xs font-bold rounded-sm transition-all inline-flex items-center gap-1.5"
                      }, [
                        unref(form).processing ? (openBlock(), createBlock(_component_Icon, {
                          key: 0,
                          icon: "svg-spinners:ring-resize",
                          class: "w-4 h-4 animate-spin"
                        })) : (openBlock(), createBlock(_component_Icon, {
                          key: 1,
                          icon: "solar:disk-bold",
                          class: "w-4 h-4"
                        })),
                        createTextVNode(" Simpan ")
                      ], 8, ["disabled"])
                    ])
                  ])
                ], 32)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Backend/Settings/Roles/Permission.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
