import { resolveComponent, withCtx, unref, createTextVNode, createVNode, openBlock, createBlock, toDisplayString, createCommentVNode, withModifiers, withDirectives, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { useToast } from "vue-toastification";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./InputError-BPcHmz-m.js";
import "./ApplicationLogo-CmsQkCHn.js";
const _sfc_main = {
  __name: "ForgotPassword",
  __ssrInlineRender: true,
  props: {
    status: {
      type: String
    }
  },
  setup(__props) {
    const toast = useToast();
    const form = useForm({
      email: ""
    });
    const submit = () => {
      form.post(route("password.email"), {
        onSuccess: () => toast.success("Tautan reset password telah dikirim ke email Anda."),
        onError: (errors) => {
          Object.values(errors).forEach((err) => toast.error(err));
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = resolveComponent("Icon");
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Lupa Password" }, null, _parent2, _scopeId));
            _push2(`<div class="text-center mb-6"${_scopeId}><h1 class="text-2xl font-semibold text-gray-900 dark:text-white tracking-tight"${_scopeId}>Lupa Password</h1><p class="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed"${_scopeId}> Masukkan email terdaftar Anda untuk menerima tautan pemulihan kata sandi. </p></div>`);
            if (__props.status) {
              _push2(`<div class="mb-4 text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 p-3 rounded-sm"${_scopeId}>${ssrInterpolate(__props.status)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<form class="space-y-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"${_scopeId}>Email</label><input type="email"${ssrRenderAttr("value", unref(form).email)} required autofocus class="w-full px-4 py-2.5 rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm" placeholder="nama@domain.com"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              class: "mt-1",
              message: unref(form).errors.email
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
            _push2(`<span${_scopeId}>Kirim Link Reset</span></button></form><div class="mt-6 text-center"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("login"),
              class: "text-xs text-gray-500 hover:text-gray-950 dark:hover:text-white transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Kembali ke halaman <span class="font-semibold underline text-blue-600 dark:text-blue-400"${_scopeId2}>Login</span>`);
                } else {
                  return [
                    createTextVNode(" Kembali ke halaman "),
                    createVNode("span", { class: "font-semibold underline text-blue-600 dark:text-blue-400" }, "Login")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Lupa Password" }),
              createVNode("div", { class: "text-center mb-6" }, [
                createVNode("h1", { class: "text-2xl font-semibold text-gray-900 dark:text-white tracking-tight" }, "Lupa Password"),
                createVNode("p", { class: "text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed" }, " Masukkan email terdaftar Anda untuk menerima tautan pemulihan kata sandi. ")
              ]),
              __props.status ? (openBlock(), createBlock("div", {
                key: 0,
                class: "mb-4 text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 p-3 rounded-sm"
              }, toDisplayString(__props.status), 1)) : createCommentVNode("", true),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"]),
                class: "space-y-4"
              }, [
                createVNode("div", null, [
                  createVNode("label", { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" }, "Email"),
                  withDirectives(createVNode("input", {
                    type: "email",
                    "onUpdate:modelValue": ($event) => unref(form).email = $event,
                    required: "",
                    autofocus: "",
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
                  createVNode("span", null, "Kirim Link Reset")
                ], 8, ["disabled"])
              ], 32),
              createVNode("div", { class: "mt-6 text-center" }, [
                createVNode(unref(Link), {
                  href: _ctx.route("login"),
                  class: "text-xs text-gray-500 hover:text-gray-950 dark:hover:text-white transition-colors"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Kembali ke halaman "),
                    createVNode("span", { class: "font-semibold underline text-blue-600 dark:text-blue-400" }, "Login")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Frontend/Auth/ForgotPassword.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
