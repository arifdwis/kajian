import { computed, resolveComponent, unref, withCtx, createVNode, createTextVNode, toDisplayString, withModifiers, openBlock, createBlock, Fragment, renderList, withDirectives, vModelCheckbox, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain } from "vue/server-renderer";
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
        if (!groups[groupName]) {
          groups[groupName] = [];
        }
        groups[groupName].push(p);
      });
      return groups;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = resolveComponent("Icon");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: "Akses Role: " + __props.role.name
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-6 max-w-5xl mx-auto"${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700"${_scopeId}><div class="flex items-center gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("settings.roles.index"),
              class: "p-2.5 bg-gray-50 dark:bg-gray-700 dark:text-gray-300 hover:bg-paper-2 hover:text-blue-600 rounded-sm transition-all"
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
            _push2(`<div${_scopeId}><h3 class="text-xl font-bold text-gray-900 dark:text-white"${_scopeId}>Hak Akses Role: ${ssrInterpolate(__props.role.name)}</h3><p class="text-xs text-gray-500 mt-1"${_scopeId}>Sesuaikan permission matrix untuk kewenangan operasional.</p></div></div><div class="flex gap-2"${_scopeId}><button class="px-3.5 py-2 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 text-xs font-semibold rounded-sm hover:bg-gray-50"${_scopeId}> Pilih Semua </button><button class="px-3.5 py-2 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 text-xs font-semibold rounded-sm hover:bg-gray-50"${_scopeId}> Kosongkan </button></div></div><form class="space-y-6"${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId}><!--[-->`);
            ssrRenderList(groupedPermissions.value, (perms, groupName) => {
              _push2(`<div class="bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700 space-y-4"${_scopeId}><h4 class="text-xs font-bold text-gray-400 uppercase tracking-wider border-b dark:border-gray-700 pb-2 capitalize"${_scopeId}> Modul / Kategori: ${ssrInterpolate(groupName)}</h4><div class="space-y-2"${_scopeId}><!--[-->`);
              ssrRenderList(perms, (p) => {
                _push2(`<label class="flex items-center gap-3 p-2.5 rounded-sm border border-gray-100 dark:border-gray-600 hover:bg-gray-50/50 dark:hover:bg-gray-900/50 select-none cursor-pointer"${_scopeId}><input type="checkbox"${ssrRenderAttr("value", p.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).permissions) ? ssrLooseContain(unref(form).permissions, p.id) : unref(form).permissions) ? " checked" : ""} class="rounded text-blue-600 focus:ring-blue-500/20"${_scopeId}><div class="leading-none"${_scopeId}><span class="text-xs font-semibold text-gray-800 dark:text-gray-200 block"${_scopeId}>${ssrInterpolate(p.name)}</span><span class="text-[9px] text-gray-400 font-mono mt-0.5 block"${_scopeId}>${ssrInterpolate(p.slug)}</span></div></label>`);
              });
              _push2(`<!--]--></div></div>`);
            });
            _push2(`<!--]--></div><div class="flex items-center justify-end gap-3 bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("settings.roles.index"),
              class: "px-5 py-2.5 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-sm"
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
            _push2(`<button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="px-6 py-2.5 bg-accent text-accent-ink text-xs font-bold rounded-sm transition-all inline-flex items-center gap-1"${_scopeId}>`);
            if (unref(form).processing) {
              _push2(ssrRenderComponent(_component_Icon, {
                icon: "svg-spinners:ring-resize",
                class: "w-4 h-4 animate-spin"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(` Simpan Setelan Akses </button></div></form></div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-6 max-w-5xl mx-auto" }, [
                createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700" }, [
                  createVNode("div", { class: "flex items-center gap-3" }, [
                    createVNode(unref(Link), {
                      href: _ctx.route("settings.roles.index"),
                      class: "p-2.5 bg-gray-50 dark:bg-gray-700 dark:text-gray-300 hover:bg-paper-2 hover:text-blue-600 rounded-sm transition-all"
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
                      createVNode("h3", { class: "text-xl font-bold text-gray-900 dark:text-white" }, "Hak Akses Role: " + toDisplayString(__props.role.name), 1),
                      createVNode("p", { class: "text-xs text-gray-500 mt-1" }, "Sesuaikan permission matrix untuk kewenangan operasional.")
                    ])
                  ]),
                  createVNode("div", { class: "flex gap-2" }, [
                    createVNode("button", {
                      onClick: selectAll,
                      class: "px-3.5 py-2 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 text-xs font-semibold rounded-sm hover:bg-gray-50"
                    }, " Pilih Semua "),
                    createVNode("button", {
                      onClick: deselectAll,
                      class: "px-3.5 py-2 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 text-xs font-semibold rounded-sm hover:bg-gray-50"
                    }, " Kosongkan ")
                  ])
                ]),
                createVNode("form", {
                  onSubmit: withModifiers(submit, ["prevent"]),
                  class: "space-y-6"
                }, [
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(groupedPermissions.value, (perms, groupName) => {
                      return openBlock(), createBlock("div", {
                        key: groupName,
                        class: "bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700 space-y-4"
                      }, [
                        createVNode("h4", { class: "text-xs font-bold text-gray-400 uppercase tracking-wider border-b dark:border-gray-700 pb-2 capitalize" }, " Modul / Kategori: " + toDisplayString(groupName), 1),
                        createVNode("div", { class: "space-y-2" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(perms, (p) => {
                            return openBlock(), createBlock("label", {
                              key: p.id,
                              class: "flex items-center gap-3 p-2.5 rounded-sm border border-gray-100 dark:border-gray-600 hover:bg-gray-50/50 dark:hover:bg-gray-900/50 select-none cursor-pointer"
                            }, [
                              withDirectives(createVNode("input", {
                                type: "checkbox",
                                value: p.id,
                                "onUpdate:modelValue": ($event) => unref(form).permissions = $event,
                                class: "rounded text-blue-600 focus:ring-blue-500/20"
                              }, null, 8, ["value", "onUpdate:modelValue"]), [
                                [vModelCheckbox, unref(form).permissions]
                              ]),
                              createVNode("div", { class: "leading-none" }, [
                                createVNode("span", { class: "text-xs font-semibold text-gray-800 dark:text-gray-200 block" }, toDisplayString(p.name), 1),
                                createVNode("span", { class: "text-[9px] text-gray-400 font-mono mt-0.5 block" }, toDisplayString(p.slug), 1)
                              ])
                            ]);
                          }), 128))
                        ])
                      ]);
                    }), 128))
                  ]),
                  createVNode("div", { class: "flex items-center justify-end gap-3 bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700" }, [
                    createVNode(unref(Link), {
                      href: _ctx.route("settings.roles.index"),
                      class: "px-5 py-2.5 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-sm"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Batal ")
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode("button", {
                      type: "submit",
                      disabled: unref(form).processing,
                      class: "px-6 py-2.5 bg-accent text-accent-ink text-xs font-bold rounded-sm transition-all inline-flex items-center gap-1"
                    }, [
                      unref(form).processing ? (openBlock(), createBlock(_component_Icon, {
                        key: 0,
                        icon: "svg-spinners:ring-resize",
                        class: "w-4 h-4 animate-spin"
                      })) : createCommentVNode("", true),
                      createTextVNode(" Simpan Setelan Akses ")
                    ], 8, ["disabled"])
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
