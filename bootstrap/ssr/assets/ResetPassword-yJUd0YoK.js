import { resolveComponent, withCtx, unref, createVNode, withModifiers, withDirectives, vModelText, openBlock, createBlock, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useForm, Head } from "@inertiajs/vue3";
import { useToast } from "vue-toastification";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./InputError-BPcHmz-m.js";
import "./ApplicationLogo-CmsQkCHn.js";
const _sfc_main = {
  __name: "ResetPassword",
  __ssrInlineRender: true,
  props: {
    email: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    const toast = useToast();
    const props = __props;
    const form = useForm({
      token: props.token,
      email: props.email,
      password: "",
      password_confirmation: ""
    });
    const submit = () => {
      form.post(route("password.store"), {
        onFinish: () => form.reset("password", "password_confirmation"),
        onSuccess: () => toast.success("Password berhasil diperbarui."),
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
            _push2(ssrRenderComponent(unref(Head), { title: "Reset Password" }, null, _parent2, _scopeId));
            _push2(`<div class="text-center mb-6"${_scopeId}><h1 class="text-2xl font-semibold text-gray-900 dark:text-white tracking-tight"${_scopeId}>Atur Ulang Password</h1><p class="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed"${_scopeId}> Masukkan password baru Anda di bawah ini. </p></div><form class="space-y-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"${_scopeId}>Email</label><input type="email"${ssrRenderAttr("value", unref(form).email)} required readonly class="w-full px-4 py-2.5 rounded-sm border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-400 text-sm focus:ring-0 cursor-not-allowed"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              class: "mt-1",
              message: unref(form).errors.email
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"${_scopeId}>Password Baru</label><input type="password"${ssrRenderAttr("value", unref(form).password)} required autofocus class="w-full px-4 py-2.5 rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm" placeholder="••••••••"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              class: "mt-1",
              message: unref(form).errors.password
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"${_scopeId}>Konfirmasi Password Baru</label><input type="password"${ssrRenderAttr("value", unref(form).password_confirmation)} required class="w-full px-4 py-2.5 rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm" placeholder="••••••••"${_scopeId}>`);
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
            _push2(`<span${_scopeId}>Reset Password</span></button></form>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Reset Password" }),
              createVNode("div", { class: "text-center mb-6" }, [
                createVNode("h1", { class: "text-2xl font-semibold text-gray-900 dark:text-white tracking-tight" }, "Atur Ulang Password"),
                createVNode("p", { class: "text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed" }, " Masukkan password baru Anda di bawah ini. ")
              ]),
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
                    readonly: "",
                    class: "w-full px-4 py-2.5 rounded-sm border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-400 text-sm focus:ring-0 cursor-not-allowed"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).email]
                  ]),
                  createVNode(_sfc_main$2, {
                    class: "mt-1",
                    message: unref(form).errors.email
                  }, null, 8, ["message"])
                ]),
                createVNode("div", null, [
                  createVNode("label", { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" }, "Password Baru"),
                  withDirectives(createVNode("input", {
                    type: "password",
                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                    required: "",
                    autofocus: "",
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
                  createVNode("label", { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" }, "Konfirmasi Password Baru"),
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
                  createVNode("span", null, "Reset Password")
                ], 8, ["disabled"])
              ], 32)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Frontend/Auth/ResetPassword.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
