import { computed, onMounted, resolveComponent, unref, withCtx, createVNode, createTextVNode, withModifiers, withDirectives, vModelText, openBlock, createBlock, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-Cmsx4Vff.js";
import { useToast } from "vue-toastification";
import "flowbite-vue";
import "./ApplicationLogo-CmsQkCHn.js";
import "@iconify/vue";
import "mitt";
const _sfc_main = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    user: Object,
    roles: Array,
    bidangs: Array
  },
  setup(__props) {
    const toast = useToast();
    const props = __props;
    const roleOptions = computed(() => props.roles.map((r) => ({ label: r.name, value: r.id })));
    const bidangOptions = computed(() => [
      { label: "Tanpa OPD", value: "" },
      ...props.bidangs.map((b) => ({ label: b.nama, value: b.id }))
    ]);
    const form = useForm({
      _method: "PUT",
      name: props.user.name || "",
      email: props.user.email || "",
      password: "",
      password_confirmation: "",
      role_id: "",
      id_opd: props.user.id_opd || ""
    });
    onMounted(() => {
      if (props.user.roles && props.user.roles.length > 0) {
        form.role_id = props.user.roles[0].id;
      }
    });
    const submit = () => {
      form.post(route("settings.users.update", props.user.id), {
        onSuccess: () => toast.success("Data pengguna berhasil diperbarui."),
        onError: (errors) => {
          Object.values(errors).forEach((err) => toast.error(err));
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = resolveComponent("Icon");
      const _component_SearchSelect = resolveComponent("SearchSelect");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Edit Pengguna" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-6"${_scopeId}><div class="flex items-center gap-3 bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("settings.users.index"),
              class: "p-2.5 bg-gray-50 dark:bg-gray-700 dark:text-gray-300 hover:bg-paper-2 hover:text-blue-600 rounded-sm transition-colors duration-150"
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
            _push2(`<div${_scopeId}><h3 class="text-lg font-bold text-gray-900 dark:text-white"${_scopeId}>Edit Pengguna</h3><p class="text-xs text-gray-500 mt-0.5"${_scopeId}>Perbarui rincian otorisasi, afilliasi OPD, or password pengguna.</p></div></div><div class="bg-paper dark:bg-gray-800 p-8 rounded-card border border-gray-100 dark:border-gray-700"${_scopeId}><form class="space-y-5"${_scopeId}><div${_scopeId}><label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2"${_scopeId}>Nama Lengkap <span class="text-red-500"${_scopeId}>*</span></label><input type="text"${ssrRenderAttr("value", unref(form).name)} required placeholder="Nama Lengkap..." class="w-full text-sm rounded-sm border border-rule dark:border-rule-dark bg-paper dark:bg-slate-950 text-slate-900 dark:text-white px-4 py-2.5 focus:ring-2 focus:ring-blue-500/20"${_scopeId}></div><div${_scopeId}><label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2"${_scopeId}>Email Address <span class="text-red-500"${_scopeId}>*</span></label><input type="email"${ssrRenderAttr("value", unref(form).email)} required placeholder="E.g., arifdwi@samarindakota.go.id" class="w-full text-sm rounded-sm border border-rule dark:border-rule-dark bg-paper dark:bg-slate-950 text-slate-900 dark:text-white px-4 py-2.5 focus:ring-2 focus:ring-blue-500/20"${_scopeId}></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2"${_scopeId}>Otorisasi Role <span class="text-red-500"${_scopeId}>*</span></label>`);
            _push2(ssrRenderComponent(_component_SearchSelect, {
              modelValue: unref(form).role_id,
              "onUpdate:modelValue": ($event) => unref(form).role_id = $event,
              options: roleOptions.value,
              placeholder: "Pilih Role",
              required: true
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2"${_scopeId}>Afiliasi OPD (Operator)</label>`);
            _push2(ssrRenderComponent(_component_SearchSelect, {
              modelValue: unref(form).id_opd,
              "onUpdate:modelValue": ($event) => unref(form).id_opd = $event,
              options: bidangOptions.value,
              placeholder: "Tanpa OPD"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t dark:border-slate-800 pt-5"${_scopeId}><div class="sm:col-span-2"${_scopeId}><h5 class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1"${_scopeId}>Ganti Password (Opsional)</h5><p class="text-[10px] text-slate-400"${_scopeId}>Biarkan kosong jika tidak ingin mengubah kata sandi lama.</p></div><div${_scopeId}><label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2"${_scopeId}>Password Baru</label><input type="password"${ssrRenderAttr("value", unref(form).password)} placeholder="••••••••" class="w-full text-sm rounded-sm border border-rule dark:border-rule-dark bg-paper dark:bg-slate-950 text-slate-900 dark:text-white px-4 py-2.5"${_scopeId}></div><div${_scopeId}><label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2"${_scopeId}>Konfirmasi Password Baru</label><input type="password"${ssrRenderAttr("value", unref(form).password_confirmation)} placeholder="••••••••" class="w-full text-sm rounded-sm border border-rule dark:border-rule-dark bg-paper dark:bg-slate-950 text-slate-900 dark:text-white px-4 py-2.5"${_scopeId}></div></div><div class="flex justify-end gap-2 border-t dark:border-slate-800 pt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("settings.users.index"),
              class: "px-5 py-2.5 border border-rule dark:border-rule-dark text-slate-700 dark:text-slate-400 text-xs font-semibold rounded-sm"
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
            _push2(`<button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="px-6 py-2.5 bg-accent text-accent-ink text-xs font-bold rounded-sm transition-colors duration-150 inline-flex items-center gap-1"${_scopeId}>`);
            if (unref(form).processing) {
              _push2(ssrRenderComponent(_component_Icon, {
                icon: "svg-spinners:ring-resize",
                class: "w-4 h-4 animate-spin"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(` Simpan Perubahan </button></div></form></div></div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-6" }, [
                createVNode("div", { class: "flex items-center gap-3 bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700" }, [
                  createVNode(unref(Link), {
                    href: _ctx.route("settings.users.index"),
                    class: "p-2.5 bg-gray-50 dark:bg-gray-700 dark:text-gray-300 hover:bg-paper-2 hover:text-blue-600 rounded-sm transition-colors duration-150"
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
                    createVNode("h3", { class: "text-lg font-bold text-gray-900 dark:text-white" }, "Edit Pengguna"),
                    createVNode("p", { class: "text-xs text-gray-500 mt-0.5" }, "Perbarui rincian otorisasi, afilliasi OPD, or password pengguna.")
                  ])
                ]),
                createVNode("div", { class: "bg-paper dark:bg-gray-800 p-8 rounded-card border border-gray-100 dark:border-gray-700" }, [
                  createVNode("form", {
                    onSubmit: withModifiers(submit, ["prevent"]),
                    class: "space-y-5"
                  }, [
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2" }, [
                        createTextVNode("Nama Lengkap "),
                        createVNode("span", { class: "text-red-500" }, "*")
                      ]),
                      withDirectives(createVNode("input", {
                        type: "text",
                        "onUpdate:modelValue": ($event) => unref(form).name = $event,
                        required: "",
                        placeholder: "Nama Lengkap...",
                        class: "w-full text-sm rounded-sm border border-rule dark:border-rule-dark bg-paper dark:bg-slate-950 text-slate-900 dark:text-white px-4 py-2.5 focus:ring-2 focus:ring-blue-500/20"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).name]
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2" }, [
                        createTextVNode("Email Address "),
                        createVNode("span", { class: "text-red-500" }, "*")
                      ]),
                      withDirectives(createVNode("input", {
                        type: "email",
                        "onUpdate:modelValue": ($event) => unref(form).email = $event,
                        required: "",
                        placeholder: "E.g., arifdwi@samarindakota.go.id",
                        class: "w-full text-sm rounded-sm border border-rule dark:border-rule-dark bg-paper dark:bg-slate-950 text-slate-900 dark:text-white px-4 py-2.5 focus:ring-2 focus:ring-blue-500/20"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).email]
                      ])
                    ]),
                    createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-4" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2" }, [
                          createTextVNode("Otorisasi Role "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        createVNode(_component_SearchSelect, {
                          modelValue: unref(form).role_id,
                          "onUpdate:modelValue": ($event) => unref(form).role_id = $event,
                          options: roleOptions.value,
                          placeholder: "Pilih Role",
                          required: true
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2" }, "Afiliasi OPD (Operator)"),
                        createVNode(_component_SearchSelect, {
                          modelValue: unref(form).id_opd,
                          "onUpdate:modelValue": ($event) => unref(form).id_opd = $event,
                          options: bidangOptions.value,
                          placeholder: "Tanpa OPD"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                      ])
                    ]),
                    createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-4 border-t dark:border-slate-800 pt-5" }, [
                      createVNode("div", { class: "sm:col-span-2" }, [
                        createVNode("h5", { class: "text-xs font-bold text-slate-500 uppercase tracking-wider mb-1" }, "Ganti Password (Opsional)"),
                        createVNode("p", { class: "text-[10px] text-slate-400" }, "Biarkan kosong jika tidak ingin mengubah kata sandi lama.")
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2" }, "Password Baru"),
                        withDirectives(createVNode("input", {
                          type: "password",
                          "onUpdate:modelValue": ($event) => unref(form).password = $event,
                          placeholder: "••••••••",
                          class: "w-full text-sm rounded-sm border border-rule dark:border-rule-dark bg-paper dark:bg-slate-950 text-slate-900 dark:text-white px-4 py-2.5"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).password]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2" }, "Konfirmasi Password Baru"),
                        withDirectives(createVNode("input", {
                          type: "password",
                          "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                          placeholder: "••••••••",
                          class: "w-full text-sm rounded-sm border border-rule dark:border-rule-dark bg-paper dark:bg-slate-950 text-slate-900 dark:text-white px-4 py-2.5"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).password_confirmation]
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "flex justify-end gap-2 border-t dark:border-slate-800 pt-4" }, [
                      createVNode(unref(Link), {
                        href: _ctx.route("settings.users.index"),
                        class: "px-5 py-2.5 border border-rule dark:border-rule-dark text-slate-700 dark:text-slate-400 text-xs font-semibold rounded-sm"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Batal ")
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createVNode("button", {
                        type: "submit",
                        disabled: unref(form).processing,
                        class: "px-6 py-2.5 bg-accent text-accent-ink text-xs font-bold rounded-sm transition-colors duration-150 inline-flex items-center gap-1"
                      }, [
                        unref(form).processing ? (openBlock(), createBlock(_component_Icon, {
                          key: 0,
                          icon: "svg-spinners:ring-resize",
                          class: "w-4 h-4 animate-spin"
                        })) : createCommentVNode("", true),
                        createTextVNode(" Simpan Perubahan ")
                      ], 8, ["disabled"])
                    ])
                  ], 32)
                ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Backend/Settings/Users/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
