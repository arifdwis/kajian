import { ref, computed, resolveComponent, unref, withCtx, createVNode, toDisplayString, withModifiers, withDirectives, vModelText, openBlock, createBlock, createCommentVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useForm, Head } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-CCLRqrRv.js";
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
    bidangs: Array
  },
  setup(__props) {
    const toast = useToast();
    const props = __props;
    const institutionMode = ref(props.user.id_opd ? "opd" : props.user.institution_name ? "manual" : "opd");
    const bidangOptions = computed(() => [
      { label: "Pilih OPD / Instansi", value: "" },
      ...props.bidangs.map((b) => ({ label: b.nama, value: b.id }))
    ]);
    const profileForm = useForm({
      _method: "PATCH",
      name: props.user.name || "",
      email: props.user.email || "",
      phone: props.user.phone || "",
      address: props.user.address || "",
      id_opd: props.user.id_opd || "",
      institution_name: props.user.institution_name || ""
    });
    const passwordForm = useForm({
      current_password: "",
      password: "",
      password_confirmation: ""
    });
    const updateProfile = () => {
      profileForm.post(route("profile.update"), {
        onSuccess: () => toast.success("Profil berhasil diperbarui."),
        onError: (errors) => {
          Object.values(errors).forEach((err) => toast.error(err));
        }
      });
    };
    const updatePassword = () => {
      passwordForm.put(route("profile.password"), {
        onSuccess: () => {
          toast.success("Password berhasil diubah.");
          passwordForm.reset();
        },
        onError: (errors) => {
          Object.values(errors).forEach((err) => toast.error(err));
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SearchSelect = resolveComponent("SearchSelect");
      const _component_Icon = resolveComponent("Icon");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Pengaturan Profil Saya" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-6"${_scopeId}><div class="bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700"${_scopeId}><h3 class="text-xl font-bold text-gray-900 dark:text-white"${_scopeId}>Pengaturan Profil Pengguna</h3><p class="text-xs text-gray-500 mt-1"${_scopeId}>Kelola data informasi personal, kontak, dan ganti password akun Anda.</p></div><div class="grid grid-cols-1 md:grid-cols-3 gap-6"${_scopeId}><div class="bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center space-y-4"${_scopeId}><div class="w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-3xl"${_scopeId}>${ssrInterpolate(__props.user.name.charAt(0).toUpperCase())}</div><div${_scopeId}><h4 class="font-semibold text-gray-900 dark:text-white text-base"${_scopeId}>${ssrInterpolate(__props.user.name)}</h4><span class="text-xs text-gray-400 font-mono block mt-0.5"${_scopeId}>${ssrInterpolate(__props.user.email)}</span></div></div><div class="md:col-span-2 space-y-6"${_scopeId}><div class="bg-paper dark:bg-gray-800 p-8 rounded-card border border-gray-100 dark:border-gray-700"${_scopeId}><h4 class="text-xs font-bold text-gray-400 uppercase tracking-wider border-b dark:border-gray-700 pb-3 mb-5"${_scopeId}>Informasi Pribadi</h4><form class="space-y-4"${_scopeId}><div${_scopeId}><label class="block text-xs font-semibold text-slate-450 uppercase tracking-wider mb-2"${_scopeId}>Nama Lengkap</label><input type="text"${ssrRenderAttr("value", unref(profileForm).name)} required class="w-full text-sm rounded-sm border border-rule dark:border-rule-dark bg-paper dark:bg-slate-950 text-slate-900 dark:text-white px-4 py-2.5 focus:ring-2 focus:ring-blue-500/20"${_scopeId}></div><div${_scopeId}><label class="block text-xs font-semibold text-slate-455 uppercase tracking-wider mb-2"${_scopeId}>Email Address</label><input type="email"${ssrRenderAttr("value", unref(profileForm).email)} required class="w-full text-sm rounded-sm border border-rule dark:border-rule-dark bg-paper dark:bg-slate-950 text-slate-900 dark:text-white px-4 py-2.5 focus:ring-2 focus:ring-blue-500/20"${_scopeId}></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label class="block text-xs font-semibold text-slate-455 uppercase tracking-wider mb-2"${_scopeId}>No. Handphone / WA</label><input type="text"${ssrRenderAttr("value", unref(profileForm).phone)} placeholder="0812..." class="w-full text-sm rounded-sm border border-rule dark:border-rule-dark bg-paper dark:bg-slate-955 text-slate-900 dark:text-white px-4 py-2.5"${_scopeId}></div><div${_scopeId}><label class="block text-xs font-semibold text-slate-455 uppercase tracking-wider mb-2"${_scopeId}>Alamat Tinggal</label><input type="text"${ssrRenderAttr("value", unref(profileForm).address)} placeholder="Alamat Lengkap..." class="w-full text-sm rounded-sm border border-rule dark:border-rule-dark bg-paper dark:bg-slate-955 text-slate-900 dark:text-white px-4 py-2.5"${_scopeId}></div></div><div${_scopeId}><label class="block text-xs font-semibold text-slate-450 uppercase tracking-wider mb-2"${_scopeId}>Asal Instansi / OPD</label><div class="flex gap-2 mb-3"${_scopeId}><button type="button" class="${ssrRenderClass([institutionMode.value === "opd" ? "bg-blue-600 text-white" : "border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50", "px-3 py-1.5 text-xs font-semibold rounded-sm transition-colors"])}"${_scopeId}> Pilih dari OPD </button><button type="button" class="${ssrRenderClass([institutionMode.value === "manual" ? "bg-blue-600 text-white" : "border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50", "px-3 py-1.5 text-xs font-semibold rounded-sm transition-colors"])}"${_scopeId}> Tulis Manual </button></div>`);
            if (institutionMode.value === "opd") {
              _push2(ssrRenderComponent(_component_SearchSelect, {
                modelValue: unref(profileForm).id_opd,
                "onUpdate:modelValue": ($event) => unref(profileForm).id_opd = $event,
                options: bidangOptions.value,
                placeholder: "Pilih OPD / Instansi"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<input type="text"${ssrRenderAttr("value", unref(profileForm).institution_name)} placeholder="Tuliskan nama instansi / perguruan tinggi / organisasi..." class="w-full text-sm rounded-sm border border-rule dark:border-rule-dark bg-paper dark:bg-slate-950 text-slate-900 dark:text-white px-4 py-2.5"${_scopeId}>`);
            }
            _push2(`</div><div class="flex justify-end pt-2"${_scopeId}><button type="submit"${ssrIncludeBooleanAttr(unref(profileForm).processing) ? " disabled" : ""} class="px-5 py-2.5 bg-accent text-accent-ink text-xs font-bold rounded-sm transition-all inline-flex items-center gap-1"${_scopeId}>`);
            if (unref(profileForm).processing) {
              _push2(ssrRenderComponent(_component_Icon, {
                icon: "svg-spinners:ring-resize",
                class: "w-4 h-4 animate-spin"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(` Simpan Perubahan </button></div></form></div><div class="bg-paper dark:bg-gray-800 p-8 rounded-card border border-gray-100 dark:border-gray-700"${_scopeId}><h4 class="text-xs font-bold text-gray-400 uppercase tracking-wider border-b dark:border-gray-700 pb-3 mb-5"${_scopeId}>Ganti Password Keamanan</h4><form class="space-y-4"${_scopeId}><div${_scopeId}><label class="block text-xs font-semibold text-slate-455 uppercase tracking-wider mb-2"${_scopeId}>Password Saat Ini</label><input type="password"${ssrRenderAttr("value", unref(passwordForm).current_password)} required placeholder="••••••••" class="w-full text-sm rounded-sm border border-rule dark:border-rule-dark bg-paper dark:bg-slate-955 text-slate-900 dark:text-white px-4 py-2.5"${_scopeId}></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label class="block text-xs font-semibold text-slate-455 uppercase tracking-wider mb-2"${_scopeId}>Password Baru</label><input type="password"${ssrRenderAttr("value", unref(passwordForm).password)} required placeholder="••••••••" class="w-full text-sm rounded-sm border border-rule dark:border-rule-dark bg-paper dark:bg-slate-955 text-slate-900 dark:text-white px-4 py-2.5"${_scopeId}></div><div${_scopeId}><label class="block text-xs font-semibold text-slate-455 uppercase tracking-wider mb-2"${_scopeId}>Konfirmasi Password Baru</label><input type="password"${ssrRenderAttr("value", unref(passwordForm).password_confirmation)} required placeholder="••••••••" class="w-full text-sm rounded-sm border border-rule dark:border-rule-dark bg-paper dark:bg-slate-955 text-slate-900 dark:text-white px-4 py-2.5"${_scopeId}></div></div><div class="flex justify-end pt-2"${_scopeId}><button type="submit"${ssrIncludeBooleanAttr(unref(passwordForm).processing) ? " disabled" : ""} class="px-5 py-2.5 bg-accent text-accent-ink text-xs font-bold rounded-sm transition-all inline-flex items-center gap-1"${_scopeId}>`);
            if (unref(passwordForm).processing) {
              _push2(ssrRenderComponent(_component_Icon, {
                icon: "svg-spinners:ring-resize",
                class: "w-4 h-4 animate-spin"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(` Ubah Password </button></div></form></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-6" }, [
                createVNode("div", { class: "bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700" }, [
                  createVNode("h3", { class: "text-xl font-bold text-gray-900 dark:text-white" }, "Pengaturan Profil Pengguna"),
                  createVNode("p", { class: "text-xs text-gray-500 mt-1" }, "Kelola data informasi personal, kontak, dan ganti password akun Anda.")
                ]),
                createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-6" }, [
                  createVNode("div", { class: "bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center space-y-4" }, [
                    createVNode("div", { class: "w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-3xl" }, toDisplayString(__props.user.name.charAt(0).toUpperCase()), 1),
                    createVNode("div", null, [
                      createVNode("h4", { class: "font-semibold text-gray-900 dark:text-white text-base" }, toDisplayString(__props.user.name), 1),
                      createVNode("span", { class: "text-xs text-gray-400 font-mono block mt-0.5" }, toDisplayString(__props.user.email), 1)
                    ])
                  ]),
                  createVNode("div", { class: "md:col-span-2 space-y-6" }, [
                    createVNode("div", { class: "bg-paper dark:bg-gray-800 p-8 rounded-card border border-gray-100 dark:border-gray-700" }, [
                      createVNode("h4", { class: "text-xs font-bold text-gray-400 uppercase tracking-wider border-b dark:border-gray-700 pb-3 mb-5" }, "Informasi Pribadi"),
                      createVNode("form", {
                        onSubmit: withModifiers(updateProfile, ["prevent"]),
                        class: "space-y-4"
                      }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-xs font-semibold text-slate-450 uppercase tracking-wider mb-2" }, "Nama Lengkap"),
                          withDirectives(createVNode("input", {
                            type: "text",
                            "onUpdate:modelValue": ($event) => unref(profileForm).name = $event,
                            required: "",
                            class: "w-full text-sm rounded-sm border border-rule dark:border-rule-dark bg-paper dark:bg-slate-950 text-slate-900 dark:text-white px-4 py-2.5 focus:ring-2 focus:ring-blue-500/20"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(profileForm).name]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-xs font-semibold text-slate-455 uppercase tracking-wider mb-2" }, "Email Address"),
                          withDirectives(createVNode("input", {
                            type: "email",
                            "onUpdate:modelValue": ($event) => unref(profileForm).email = $event,
                            required: "",
                            class: "w-full text-sm rounded-sm border border-rule dark:border-rule-dark bg-paper dark:bg-slate-950 text-slate-900 dark:text-white px-4 py-2.5 focus:ring-2 focus:ring-blue-500/20"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(profileForm).email]
                          ])
                        ]),
                        createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-4" }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-xs font-semibold text-slate-455 uppercase tracking-wider mb-2" }, "No. Handphone / WA"),
                            withDirectives(createVNode("input", {
                              type: "text",
                              "onUpdate:modelValue": ($event) => unref(profileForm).phone = $event,
                              placeholder: "0812...",
                              class: "w-full text-sm rounded-sm border border-rule dark:border-rule-dark bg-paper dark:bg-slate-955 text-slate-900 dark:text-white px-4 py-2.5"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(profileForm).phone]
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-xs font-semibold text-slate-455 uppercase tracking-wider mb-2" }, "Alamat Tinggal"),
                            withDirectives(createVNode("input", {
                              type: "text",
                              "onUpdate:modelValue": ($event) => unref(profileForm).address = $event,
                              placeholder: "Alamat Lengkap...",
                              class: "w-full text-sm rounded-sm border border-rule dark:border-rule-dark bg-paper dark:bg-slate-955 text-slate-900 dark:text-white px-4 py-2.5"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(profileForm).address]
                            ])
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-xs font-semibold text-slate-450 uppercase tracking-wider mb-2" }, "Asal Instansi / OPD"),
                          createVNode("div", { class: "flex gap-2 mb-3" }, [
                            createVNode("button", {
                              type: "button",
                              onClick: ($event) => {
                                institutionMode.value = "opd";
                                unref(profileForm).id_opd = "";
                                unref(profileForm).institution_name = "";
                              },
                              class: ["px-3 py-1.5 text-xs font-semibold rounded-sm transition-colors", institutionMode.value === "opd" ? "bg-blue-600 text-white" : "border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50"]
                            }, " Pilih dari OPD ", 10, ["onClick"]),
                            createVNode("button", {
                              type: "button",
                              onClick: ($event) => {
                                institutionMode.value = "manual";
                                unref(profileForm).id_opd = "";
                                unref(profileForm).institution_name = "";
                              },
                              class: ["px-3 py-1.5 text-xs font-semibold rounded-sm transition-colors", institutionMode.value === "manual" ? "bg-blue-600 text-white" : "border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50"]
                            }, " Tulis Manual ", 10, ["onClick"])
                          ]),
                          institutionMode.value === "opd" ? (openBlock(), createBlock(_component_SearchSelect, {
                            key: 0,
                            modelValue: unref(profileForm).id_opd,
                            "onUpdate:modelValue": ($event) => unref(profileForm).id_opd = $event,
                            options: bidangOptions.value,
                            placeholder: "Pilih OPD / Instansi"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])) : withDirectives((openBlock(), createBlock("input", {
                            key: 1,
                            type: "text",
                            "onUpdate:modelValue": ($event) => unref(profileForm).institution_name = $event,
                            placeholder: "Tuliskan nama instansi / perguruan tinggi / organisasi...",
                            class: "w-full text-sm rounded-sm border border-rule dark:border-rule-dark bg-paper dark:bg-slate-950 text-slate-900 dark:text-white px-4 py-2.5"
                          }, null, 8, ["onUpdate:modelValue"])), [
                            [vModelText, unref(profileForm).institution_name]
                          ])
                        ]),
                        createVNode("div", { class: "flex justify-end pt-2" }, [
                          createVNode("button", {
                            type: "submit",
                            disabled: unref(profileForm).processing,
                            class: "px-5 py-2.5 bg-accent text-accent-ink text-xs font-bold rounded-sm transition-all inline-flex items-center gap-1"
                          }, [
                            unref(profileForm).processing ? (openBlock(), createBlock(_component_Icon, {
                              key: 0,
                              icon: "svg-spinners:ring-resize",
                              class: "w-4 h-4 animate-spin"
                            })) : createCommentVNode("", true),
                            createTextVNode(" Simpan Perubahan ")
                          ], 8, ["disabled"])
                        ])
                      ], 32)
                    ]),
                    createVNode("div", { class: "bg-paper dark:bg-gray-800 p-8 rounded-card border border-gray-100 dark:border-gray-700" }, [
                      createVNode("h4", { class: "text-xs font-bold text-gray-400 uppercase tracking-wider border-b dark:border-gray-700 pb-3 mb-5" }, "Ganti Password Keamanan"),
                      createVNode("form", {
                        onSubmit: withModifiers(updatePassword, ["prevent"]),
                        class: "space-y-4"
                      }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-xs font-semibold text-slate-455 uppercase tracking-wider mb-2" }, "Password Saat Ini"),
                          withDirectives(createVNode("input", {
                            type: "password",
                            "onUpdate:modelValue": ($event) => unref(passwordForm).current_password = $event,
                            required: "",
                            placeholder: "••••••••",
                            class: "w-full text-sm rounded-sm border border-rule dark:border-rule-dark bg-paper dark:bg-slate-955 text-slate-900 dark:text-white px-4 py-2.5"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(passwordForm).current_password]
                          ])
                        ]),
                        createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-4" }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-xs font-semibold text-slate-455 uppercase tracking-wider mb-2" }, "Password Baru"),
                            withDirectives(createVNode("input", {
                              type: "password",
                              "onUpdate:modelValue": ($event) => unref(passwordForm).password = $event,
                              required: "",
                              placeholder: "••••••••",
                              class: "w-full text-sm rounded-sm border border-rule dark:border-rule-dark bg-paper dark:bg-slate-955 text-slate-900 dark:text-white px-4 py-2.5"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(passwordForm).password]
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-xs font-semibold text-slate-455 uppercase tracking-wider mb-2" }, "Konfirmasi Password Baru"),
                            withDirectives(createVNode("input", {
                              type: "password",
                              "onUpdate:modelValue": ($event) => unref(passwordForm).password_confirmation = $event,
                              required: "",
                              placeholder: "••••••••",
                              class: "w-full text-sm rounded-sm border border-rule dark:border-rule-dark bg-paper dark:bg-slate-955 text-slate-900 dark:text-white px-4 py-2.5"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(passwordForm).password_confirmation]
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "flex justify-end pt-2" }, [
                          createVNode("button", {
                            type: "submit",
                            disabled: unref(passwordForm).processing,
                            class: "px-5 py-2.5 bg-accent text-accent-ink text-xs font-bold rounded-sm transition-all inline-flex items-center gap-1"
                          }, [
                            unref(passwordForm).processing ? (openBlock(), createBlock(_component_Icon, {
                              key: 0,
                              icon: "svg-spinners:ring-resize",
                              class: "w-4 h-4 animate-spin"
                            })) : createCommentVNode("", true),
                            createTextVNode(" Ubah Password ")
                          ], 8, ["disabled"])
                        ])
                      ], 32)
                    ])
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Backend/Profile/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
