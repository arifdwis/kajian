import { resolveComponent, withCtx, unref, createTextVNode, createVNode, withModifiers, withDirectives, vModelText, openBlock, createBlock, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { useToast } from "vue-toastification";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./InputError-BPcHmz-m.js";
import "./ApplicationLogo-CmsQkCHn.js";
const _sfc_main = {
  __name: "Register",
  __ssrInlineRender: true,
  setup(__props) {
    const toast = useToast();
    const form = useForm({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      role: "pengguna"
    });
    const submit = () => {
      form.post(route("register"), {
        onFinish: () => form.reset("password", "password_confirmation"),
        onSuccess: () => toast.success("Registrasi berhasil."),
        onError: (errors) => {
          Object.values(errors).forEach((err) => toast.error(err));
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SearchSelect = resolveComponent("SearchSelect");
      const _component_Icon = resolveComponent("Icon");
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Registrasi Akun Baru" }, null, _parent2, _scopeId));
            _push2(`<div class="text-center mb-8"${_scopeId}><h1 class="text-3xl font-semibold text-gray-900 dark:text-white tracking-tight"${_scopeId}>Daftar Akun</h1><p class="text-sm text-gray-500 dark:text-gray-400 mt-2"${_scopeId}> Pustaka Kajian dan Penelitian Samarinda </p></div><form class="space-y-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"${_scopeId}>Nama Lengkap</label><input type="text"${ssrRenderAttr("value", unref(form).name)} required autofocus class="w-full px-4 py-2.5 rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm" placeholder="Nama Lengkap Beserta Gelar..."${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              class: "mt-1",
              message: unref(form).errors.name
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"${_scopeId}>Email</label><input type="email"${ssrRenderAttr("value", unref(form).email)} required class="w-full px-4 py-2.5 rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm" placeholder="nama@domain.com"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              class: "mt-1",
              message: unref(form).errors.email
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"${_scopeId}>Rumpun Rencana Akses (Role)</label>`);
            _push2(ssrRenderComponent(_component_SearchSelect, {
              modelValue: unref(form).role,
              "onUpdate:modelValue": ($event) => unref(form).role = $event,
              options: [
                { label: "Pengguna (ASN / Akademisi / Mahasiswa)", value: "pengguna" }
              ],
              required: true
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              class: "mt-1",
              message: unref(form).errors.role
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"${_scopeId}>Password</label><input type="password"${ssrRenderAttr("value", unref(form).password)} required class="w-full px-4 py-2.5 rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm" placeholder="••••••••"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              class: "mt-1",
              message: unref(form).errors.password
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"${_scopeId}>Konfirmasi Password</label><input type="password"${ssrRenderAttr("value", unref(form).password_confirmation)} required class="w-full px-4 py-2.5 rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm" placeholder="••••••••"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              class: "mt-1",
              message: unref(form).errors.password_confirmation
            }, null, _parent2, _scopeId));
            _push2(`</div><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="w-full py-3.5 bg-accent text-accent-ink font-semibold rounded-sm disabled:opacity-50 text-sm flex items-center justify-center gap-2"${_scopeId}>`);
            if (unref(form).processing) {
              _push2(ssrRenderComponent(_component_Icon, {
                icon: "svg-spinners:ring-resize",
                class: "w-5 h-5 animate-spin"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`<span${_scopeId}>Daftar Akun</span></button></form><div class="mt-6 text-center"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("login"),
              class: "text-xs text-gray-500 hover:text-gray-950 dark:hover:text-white transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Sudah punya akun? <span class="font-semibold underline text-blue-600 dark:text-blue-400"${_scopeId2}>Login Disini</span>`);
                } else {
                  return [
                    createTextVNode(" Sudah punya akun? "),
                    createVNode("span", { class: "font-semibold underline text-blue-600 dark:text-blue-400" }, "Login Disini")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Registrasi Akun Baru" }),
              createVNode("div", { class: "text-center mb-8" }, [
                createVNode("h1", { class: "text-3xl font-semibold text-gray-900 dark:text-white tracking-tight" }, "Daftar Akun"),
                createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400 mt-2" }, " Pustaka Kajian dan Penelitian Samarinda ")
              ]),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"]),
                class: "space-y-4"
              }, [
                createVNode("div", null, [
                  createVNode("label", { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" }, "Nama Lengkap"),
                  withDirectives(createVNode("input", {
                    type: "text",
                    "onUpdate:modelValue": ($event) => unref(form).name = $event,
                    required: "",
                    autofocus: "",
                    class: "w-full px-4 py-2.5 rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm",
                    placeholder: "Nama Lengkap Beserta Gelar..."
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).name]
                  ]),
                  createVNode(_sfc_main$2, {
                    class: "mt-1",
                    message: unref(form).errors.name
                  }, null, 8, ["message"])
                ]),
                createVNode("div", null, [
                  createVNode("label", { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" }, "Email"),
                  withDirectives(createVNode("input", {
                    type: "email",
                    "onUpdate:modelValue": ($event) => unref(form).email = $event,
                    required: "",
                    class: "w-full px-4 py-2.5 rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm",
                    placeholder: "nama@domain.com"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).email]
                  ]),
                  createVNode(_sfc_main$2, {
                    class: "mt-1",
                    message: unref(form).errors.email
                  }, null, 8, ["message"])
                ]),
                createVNode("div", null, [
                  createVNode("label", { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" }, "Rumpun Rencana Akses (Role)"),
                  createVNode(_component_SearchSelect, {
                    modelValue: unref(form).role,
                    "onUpdate:modelValue": ($event) => unref(form).role = $event,
                    options: [
                      { label: "Pengguna (ASN / Akademisi / Mahasiswa)", value: "pengguna" }
                    ],
                    required: true
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$2, {
                    class: "mt-1",
                    message: unref(form).errors.role
                  }, null, 8, ["message"])
                ]),
                createVNode("div", null, [
                  createVNode("label", { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" }, "Password"),
                  withDirectives(createVNode("input", {
                    type: "password",
                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                    required: "",
                    class: "w-full px-4 py-2.5 rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm",
                    placeholder: "••••••••"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).password]
                  ]),
                  createVNode(_sfc_main$2, {
                    class: "mt-1",
                    message: unref(form).errors.password
                  }, null, 8, ["message"])
                ]),
                createVNode("div", null, [
                  createVNode("label", { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" }, "Konfirmasi Password"),
                  withDirectives(createVNode("input", {
                    type: "password",
                    "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                    required: "",
                    class: "w-full px-4 py-2.5 rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm",
                    placeholder: "••••••••"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).password_confirmation]
                  ]),
                  createVNode(_sfc_main$2, {
                    class: "mt-1",
                    message: unref(form).errors.password_confirmation
                  }, null, 8, ["message"])
                ]),
                createVNode("button", {
                  type: "submit",
                  disabled: unref(form).processing,
                  class: "w-full py-3.5 bg-accent text-accent-ink font-semibold rounded-sm disabled:opacity-50 text-sm flex items-center justify-center gap-2"
                }, [
                  unref(form).processing ? (openBlock(), createBlock(_component_Icon, {
                    key: 0,
                    icon: "svg-spinners:ring-resize",
                    class: "w-5 h-5 animate-spin"
                  })) : createCommentVNode("", true),
                  createVNode("span", null, "Daftar Akun")
                ], 8, ["disabled"])
              ], 32),
              createVNode("div", { class: "mt-6 text-center" }, [
                createVNode(unref(Link), {
                  href: _ctx.route("login"),
                  class: "text-xs text-gray-500 hover:text-gray-950 dark:hover:text-white transition-colors"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Sudah punya akun? "),
                    createVNode("span", { class: "font-semibold underline text-blue-600 dark:text-blue-400" }, "Login Disini")
                  ]),
                  _: 1
                }, 8, ["href"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Frontend/Auth/Register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
