import { ref, resolveComponent, withCtx, unref, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr } from "vue/server-renderer";
import { useForm, Head } from "@inertiajs/vue3";
import { useToast } from "vue-toastification";
import { _ as _sfc_main$1 } from "./InputError-BPcHmz-m.js";
import { _ as _export_sfc } from "./ApplicationLogo-CmsQkCHn.js";
const _sfc_main = {
  __name: "Login",
  __ssrInlineRender: true,
  setup(__props) {
    useToast();
    ref(false);
    useForm({
      email: "",
      password: "",
      remember: false
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = resolveComponent("Icon");
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Login" }, null, _parent2, _scopeId));
            _push2(`<div data-v-5951c89b${_scopeId}><div class="text-center mb-8" data-v-5951c89b${_scopeId}><h1 class="text-3xl font-semibold text-gray-900 dark:text-white tracking-tight" data-v-5951c89b${_scopeId}>SIKAJIAN</h1><p class="text-sm text-gray-500 dark:text-gray-400 mt-2" data-v-5951c89b${_scopeId}> Sistem Informasi Kajian dan Riset </p><p class="text-xs text-gray-400 dark:text-gray-500 font-medium" data-v-5951c89b${_scopeId}>Bapperida Kota Samarinda</p></div><div class="space-y-4" data-v-5951c89b${_scopeId}><a${ssrRenderAttr("href", _ctx.route("sso.login"))} class="w-full flex items-center justify-center gap-3 px-6 py-4 text-white font-semibold rounded-card transition-all text-sm" data-v-5951c89b${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:login-2-bold",
              class: "w-5 h-5"
            }, null, _parent2, _scopeId));
            _push2(` Masuk dengan SSO Samarinda </a><p class="text-[11px] text-center text-gray-400 dark:text-gray-500 leading-normal px-2" data-v-5951c89b${_scopeId}> Aplikasi ini terintegrasi dengan Single Sign On Pemkot Samarinda. Silakan gunakan akun SSO Anda untuk login. </p></div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Login" }),
              createVNode("div", null, [
                createVNode("div", { class: "text-center mb-8" }, [
                  createVNode("h1", { class: "text-3xl font-semibold text-gray-900 dark:text-white tracking-tight" }, "SIKAJIAN"),
                  createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400 mt-2" }, " Sistem Informasi Kajian dan Riset "),
                  createVNode("p", { class: "text-xs text-gray-400 dark:text-gray-500 font-medium" }, "Bapperida Kota Samarinda")
                ]),
                createVNode("div", { class: "space-y-4" }, [
                  createVNode("a", {
                    href: _ctx.route("sso.login"),
                    class: "w-full flex items-center justify-center gap-3 px-6 py-4 text-white font-semibold rounded-card transition-all text-sm"
                  }, [
                    createVNode(_component_Icon, {
                      icon: "solar:login-2-bold",
                      class: "w-5 h-5"
                    }),
                    createTextVNode(" Masuk dengan SSO Samarinda ")
                  ], 8, ["href"]),
                  createVNode("p", { class: "text-[11px] text-center text-gray-400 dark:text-gray-500 leading-normal px-2" }, " Aplikasi ini terintegrasi dengan Single Sign On Pemkot Samarinda. Silakan gunakan akun SSO Anda untuk login. ")
                ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Frontend/Auth/Login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Login = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5951c89b"]]);
export {
  Login as default
};
