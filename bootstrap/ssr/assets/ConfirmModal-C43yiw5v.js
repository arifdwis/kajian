import { onMounted, onUnmounted, unref, useSSRContext } from "vue";
import { ssrRenderTeleport, ssrRenderStyle, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { Icon } from "@iconify/vue";
const _sfc_main = {
  __name: "ConfirmModal",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    title: {
      type: String,
      default: "Konfirmasi Tindakan"
    },
    message: {
      type: String,
      default: "Apakah Anda yakin ingin melanjutkan tindakan ini?"
    },
    confirmText: {
      type: String,
      default: "Ya, Lanjutkan"
    },
    cancelText: {
      type: String,
      default: "Batal"
    },
    type: {
      type: String,
      default: "danger"
      // danger, warning, success, info
    }
  },
  emits: ["confirm", "cancel", "close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const close = () => {
      emit("cancel");
      emit("close");
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && props.show) {
        close();
      }
    };
    onMounted(() => window.addEventListener("keydown", handleKeyDown));
    onUnmounted(() => window.removeEventListener("keydown", handleKeyDown));
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.show) {
          _push2(`<div class="fixed inset-0 z-50 flex items-center justify-center p-4"><div class="absolute inset-0" style="${ssrRenderStyle({ "background-color": "oklch(0% 0 0 / 0.4)" })}"></div><div class="relative w-full max-w-sm p-6 space-y-5" style="${ssrRenderStyle({ "background-color": "var(--color-paper)", "border": "1px solid var(--color-rule)", "border-radius": "var(--radius-card)", "box-shadow": "var(--shadow-modal)" })}"><div class="flex items-center gap-4"><div class="p-3 rounded-md shrink-0" style="${ssrRenderStyle({
            backgroundColor: __props.type === "danger" ? "oklch(60% 0.2 30 / 0.15)" : __props.type === "warning" ? "oklch(70% 0.15 80 / 0.15)" : __props.type === "success" ? "oklch(65% 0.15 150 / 0.15)" : "oklch(77% 0.035 60 / 0.15)",
            color: __props.type === "danger" ? "oklch(50% 0.2 30)" : __props.type === "warning" ? "oklch(60% 0.15 80)" : __props.type === "success" ? "oklch(55% 0.15 150)" : "var(--color-accent)"
          })}">`);
          if (__props.type === "danger") {
            _push2(ssrRenderComponent(unref(Icon), {
              icon: "solar:trash-bin-trash-bold-duotone",
              class: "w-5 h-5"
            }, null, _parent));
          } else if (__props.type === "warning") {
            _push2(ssrRenderComponent(unref(Icon), {
              icon: "solar:shield-warning-bold-duotone",
              class: "w-5 h-5"
            }, null, _parent));
          } else if (__props.type === "success") {
            _push2(ssrRenderComponent(unref(Icon), {
              icon: "solar:check-square-bold-duotone",
              class: "w-5 h-5"
            }, null, _parent));
          } else {
            _push2(ssrRenderComponent(unref(Icon), {
              icon: "solar:info-square-bold-duotone",
              class: "w-5 h-5"
            }, null, _parent));
          }
          _push2(`</div><div><h4 class="font-bold text-sm leading-tight" style="${ssrRenderStyle({ "color": "var(--color-ink)" })}">${ssrInterpolate(__props.title)}</h4><span class="text-[10px] font-medium tracking-wider mt-0.5 block" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}">Verifikasi</span></div></div><p class="text-xs leading-relaxed" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}">${ssrInterpolate(__props.message)}</p><div class="flex justify-end gap-2 pt-4" style="${ssrRenderStyle({ "border-top": "1px solid var(--color-rule)" })}"><button type="button" class="px-3 py-1.5 text-xs font-medium rounded-md transition-colors" style="${ssrRenderStyle({ "border": "1px solid var(--color-rule)", "color": "var(--color-ink-2)" })}">${ssrInterpolate(__props.cancelText)}</button><button type="button" class="px-3 py-1.5 text-xs font-semibold rounded-md transition-colors" style="${ssrRenderStyle({
            backgroundColor: __props.type === "danger" ? "oklch(50% 0.2 30)" : __props.type === "warning" ? "oklch(60% 0.15 80)" : __props.type === "success" ? "oklch(55% 0.15 150)" : "var(--color-accent)",
            color: "#fff"
          })}">${ssrInterpolate(__props.confirmText)}</button></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ConfirmModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
