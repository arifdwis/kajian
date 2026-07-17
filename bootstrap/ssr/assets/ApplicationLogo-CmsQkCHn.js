import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center gap-2.5" }, _attrs))}><img src="/img/logo-samarinda.webp" alt="Lambang Kota Samarinda" class="w-8 h-8 object-contain"><div class="flex flex-col"><span class="text-sm leading-none font-semibold tracking-tight" style="${ssrRenderStyle({ "font-family": "var(--font-display)", "color": "var(--color-ink)", "letter-spacing": "-0.02em" })}">SIKAJIAN</span><span class="text-[9px] uppercase tracking-widest font-medium" style="${ssrRenderStyle({ "margin-top": "-1px", "color": "var(--color-ink-2)" })}">BAPPERIDA</span></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ApplicationLogo.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ApplicationLogo = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  ApplicationLogo as A,
  _export_sfc as _
};
