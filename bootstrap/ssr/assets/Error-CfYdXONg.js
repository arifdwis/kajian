import { computed, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate } from "vue/server-renderer";
import { Head, Link } from "@inertiajs/vue3";
import { Icon } from "@iconify/vue";
const _sfc_main = {
  __name: "Error",
  __ssrInlineRender: true,
  props: {
    status: Number
  },
  setup(__props) {
    const props = __props;
    const title = computed(() => {
      return {
        503: "Layanan Tidak Tersedia",
        500: "Kesalahan Sistem",
        404: "Halaman Tidak Ditemukan",
        403: "Akses Ditolak"
      }[props.status] || "Terjadi Kesalahan";
    });
    const description = computed(() => {
      return {
        503: "Maaf, sistem kami sedang dalam pemeliharaan. Silakan coba beberapa saat lagi.",
        500: "Terjadi kendala pada server kami. Tim teknis sedang berupaya memperbaikinya.",
        404: "Maaf, halaman kajian atau rute yang Anda cari tidak dapat ditemukan.",
        403: "Anda tidak memiliki otorisasi untuk mengakses halaman/tindakan ini."
      }[props.status] || "Maaf, terjadi kesalahan tak terduga pada sistem.";
    });
    const icon = computed(() => {
      return {
        503: "solar:server-square-broken",
        500: "solar:danger-broken",
        404: "solar:magnifer-zoom-out-broken",
        403: "solar:shield-warning-broken"
      }[props.status] || "solar:help-broken";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: title.value }, null, _parent));
      _push(`<div class="min-h-screen bg-paper-2 dark:bg-paper-2-dark flex flex-col justify-center items-center p-6 text-center transition-colors duration-300"><div class="mb-12 flex items-center gap-2 group"><img src="/img/logo-samarinda.webp" alt="Lambang Kota Samarinda" class="w-10 h-10 object-contain"><div class="text-left leading-none"><span class="text-base font-semibold tracking-tight" style="${ssrRenderStyle({ "color": "var(--color-ink)" })}">SIKAJIAN</span><span class="block text-[10px] text-slate-400 font-bold tracking-wider mt-0.5">BAPPERIDA SAMARINDA</span></div></div><div class="relative mb-8"><div class="absolute inset-0 bg-paper-2/10 dark:bg-blue-400/5 blur-3xl rounded-full w-48 h-48 mx-auto -translate-y-6"></div><div class="relative w-36 h-36 rounded-full bg-paper dark:bg-paper-dark border border-rule dark:border-rule-dark flex items-center justify-center mx-auto text-blue-600 dark:text-blue-400">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: icon.value,
        class: "w-16 h-16"
      }, null, _parent));
      _push(`</div><span class="absolute bottom-2 right-1/2 translate-x-12 px-3 py-1 bg-slate-900 dark:bg-paper text-white dark:text-slate-950 text-xs font-semibold rounded-sm font-mono"> CODE ${ssrInterpolate(__props.status)}</span></div><div class="max-w-md space-y-3 mb-8"><h2 class="text-2xl font-semibold text-slate-900 dark:text-white tracking-tight">${ssrInterpolate(title.value)}</h2><p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">${ssrInterpolate(description.value)}</p></div><div class="flex items-center gap-3">`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: "px-5 py-2.5 bg-paper-2 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-sm transition-all"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Portal Publik `);
          } else {
            return [
              createTextVNode(" Portal Publik ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("dashboard"),
        class: "px-5 py-2.5 bg-accent text-accent-ink text-xs font-bold rounded-sm transition-all"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Masuk Dashboard `);
          } else {
            return [
              createTextVNode(" Masuk Dashboard ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><p class="text-[10px] text-slate-400 dark:text-slate-550 mt-16 font-medium"> © ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} BAPPERIDA Kota Samarinda. </p></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Backend/Error.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
