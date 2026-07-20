import { computed, ref, onMounted, resolveComponent, mergeProps, unref, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrRenderSlot, ssrInterpolate } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "FrontendLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const user = computed(() => {
      var _a;
      return (_a = page.props.auth) == null ? void 0 : _a.user;
    });
    const isDarkMode = ref(false);
    ref(false);
    onMounted(() => {
      isDarkMode.value = localStorage.getItem("darkMode") === "true";
      document.documentElement.classList.toggle("dark", isDarkMode.value);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = resolveComponent("Icon");
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "min-h-screen flex flex-col",
        style: { "background-color": "var(--color-paper)", "color": "var(--color-ink)" }
      }, _attrs))}><nav class="fixed top-[18px] left-1/2 -translate-x-1/2 z-50 flex items-center h-[46px] pl-[18px] pr-2 gap-3" style="${ssrRenderStyle({ "border-radius": "9999px", "background-color": "color-mix(in oklch, var(--color-paper) 78%, transparent)", "backdrop-filter": "blur(20px)", "-webkit-backdrop-filter": "blur(20px)", "border": "1px solid color-mix(in oklch, var(--color-ink) 8%, transparent)", "box-shadow": "0 1px 0 rgba(255,255,255,0.6) inset, 0 8px 30px -12px rgba(20,30,80,0.18)" })}">`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: "flex items-center gap-2 shrink-0 mr-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img src="/img/logo-samarinda.webp" alt="Lambang Kota Samarinda" class="w-[22px] h-[22px] object-contain"${_scopeId}><span class="text-[15px] font-semibold" style="${ssrRenderStyle({ "font-family": "var(--font-display)", "color": "var(--color-ink)", "letter-spacing": "-0.02em" })}"${_scopeId}>SIKAJIAN</span>`);
          } else {
            return [
              createVNode("img", {
                src: "/img/logo-samarinda.webp",
                alt: "Lambang Kota Samarinda",
                class: "w-[22px] h-[22px] object-contain"
              }),
              createVNode("span", {
                class: "text-[15px] font-semibold",
                style: { "font-family": "var(--font-display)", "color": "var(--color-ink)", "letter-spacing": "-0.02em" }
              }, "SIKAJIAN")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="hidden md:flex items-center gap-3">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("home"),
        class: ["px-3.5 py-2 text-[13px] font-medium rounded-full transition-colors", _ctx.$page.component === "Frontend/Portal/Home" ? "text-[var(--color-ink)]" : "text-[var(--color-ink-2)]"],
        style: _ctx.$page.component === "Frontend/Portal/Home" ? "background-color: var(--color-paper-2); color: var(--color-ink);" : "",
        onMouseenter: ($event) => {
          $event.target.style.backgroundColor = "var(--color-paper-2)";
          $event.target.style.color = "var(--color-ink)";
        },
        onMouseleave: ($event) => {
          if (_ctx.$page.component !== "Frontend/Portal/Home") {
            $event.target.style.backgroundColor = "transparent";
            $event.target.style.color = "";
          }
        }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Beranda `);
          } else {
            return [
              createTextVNode(" Beranda ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("portal.kajian"),
        class: ["px-3.5 py-2 text-[13px] font-medium rounded-full transition-colors", _ctx.$page.component === "Frontend/Portal/KajianList" ? "text-[var(--color-ink)]" : "text-[var(--color-ink-2)]"],
        style: _ctx.$page.component === "Frontend/Portal/KajianList" ? "background-color: var(--color-paper-2); color: var(--color-ink);" : "",
        onMouseenter: ($event) => {
          $event.target.style.backgroundColor = "var(--color-paper-2)";
          $event.target.style.color = "var(--color-ink)";
        },
        onMouseleave: ($event) => {
          if (_ctx.$page.component !== "Frontend/Portal/KajianList") {
            $event.target.style.backgroundColor = "transparent";
            $event.target.style.color = "";
          }
        }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Daftar Kajian `);
          } else {
            return [
              createTextVNode(" Daftar Kajian ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("portal.search"),
        class: ["px-3.5 py-2 text-[13px] font-medium rounded-full transition-colors", _ctx.$page.component === "Frontend/Portal/Search" ? "text-[var(--color-ink)]" : "text-[var(--color-ink-2)]"],
        style: _ctx.$page.component === "Frontend/Portal/Search" ? "background-color: var(--color-paper-2); color: var(--color-ink);" : "",
        onMouseenter: ($event) => {
          $event.target.style.backgroundColor = "var(--color-paper-2)";
          $event.target.style.color = "var(--color-ink)";
        },
        onMouseleave: ($event) => {
          if (_ctx.$page.component !== "Frontend/Portal/Search") {
            $event.target.style.backgroundColor = "transparent";
            $event.target.style.color = "";
          }
        }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Pencarian `);
          } else {
            return [
              createTextVNode(" Pencarian ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex items-center gap-2"><button class="p-2 rounded-full transition-colors" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}">`);
      if (isDarkMode.value) {
        _push(ssrRenderComponent(_component_Icon, {
          icon: "solar:sun-bold-duotone",
          class: "w-4 h-4"
        }, null, _parent));
      } else {
        _push(ssrRenderComponent(_component_Icon, {
          icon: "solar:moon-bold-duotone",
          class: "w-4 h-4"
        }, null, _parent));
      }
      _push(`</button>`);
      if (user.value) {
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("dashboard"),
          class: "px-3.5 py-2 text-[13px] font-medium rounded-full transition-colors",
          style: { "background-color": "var(--color-ink)", "color": "var(--color-paper)", "border": "1px solid var(--color-ink)" },
          onMouseenter: ($event) => {
            $event.target.style.backgroundColor = "var(--color-accent)";
            $event.target.style.borderColor = "var(--color-accent)";
          },
          onMouseleave: ($event) => {
            $event.target.style.backgroundColor = "var(--color-ink)";
            $event.target.style.borderColor = "var(--color-ink)";
          }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Dashboard `);
            } else {
              return [
                createTextVNode(" Dashboard ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("login"),
          class: "px-3.5 py-2 text-[13px] font-medium rounded-full transition-colors",
          style: { "background-color": "var(--color-ink)", "color": "var(--color-paper)", "border": "1px solid var(--color-ink)" },
          onMouseenter: ($event) => {
            $event.target.style.backgroundColor = "var(--color-accent)";
            $event.target.style.borderColor = "var(--color-accent)";
          },
          onMouseleave: ($event) => {
            $event.target.style.backgroundColor = "var(--color-ink)";
            $event.target.style.borderColor = "var(--color-ink)";
          }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Login `);
            } else {
              return [
                createTextVNode(" Login ")
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(`</div></nav><main class="flex-1 pt-[82px]">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main><footer style="${ssrRenderStyle({ "border-top": "1px solid var(--color-rule)", "background-color": "var(--color-paper-2)" })}"><div class="container mx-auto px-4 xl:px-0 py-16 md:py-20"><div class="grid grid-cols-2 md:grid-cols-5 gap-8 pb-14" style="${ssrRenderStyle({ "border-bottom": "1px solid var(--color-rule)" })}"><div><h5 class="text-xs font-semibold mb-5" style="${ssrRenderStyle({ "color": "var(--color-ink)" })}">Akses Cepat</h5><ul class="space-y-3"><li>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: "text-sm transition-colors hover:underline",
        style: { "color": "var(--color-ink-2)" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Beranda`);
          } else {
            return [
              createTextVNode("Beranda")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("portal.kajian"),
        class: "text-sm transition-colors hover:underline",
        style: { "color": "var(--color-ink-2)" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Daftar Kajian`);
          } else {
            return [
              createTextVNode("Daftar Kajian")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("portal.search"),
        class: "text-sm transition-colors hover:underline",
        style: { "color": "var(--color-ink-2)" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Pencarian`);
          } else {
            return [
              createTextVNode("Pencarian")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></div><div><h5 class="text-xs font-semibold mb-5" style="${ssrRenderStyle({ "color": "var(--color-ink)" })}">Ekosistem Samarinda</h5><ul class="space-y-3"><li><a href="https://samarindakota.go.id" target="_blank" rel="noopener" class="text-sm transition-colors hover:underline flex items-center gap-1" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}">Portal Samarinda `);
      _push(ssrRenderComponent(_component_Icon, {
        icon: "solar:export-linear",
        class: "w-3.5 h-3.5"
      }, null, _parent));
      _push(`</a></li><li><a href="https://satudata.samarindakota.go.id" target="_blank" rel="noopener" class="text-sm transition-colors hover:underline flex items-center gap-1" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}">Satu Data Samarinda `);
      _push(ssrRenderComponent(_component_Icon, {
        icon: "solar:export-linear",
        class: "w-3.5 h-3.5"
      }, null, _parent));
      _push(`</a></li><li><a href="https://ppid.samarindakota.go.id" target="_blank" rel="noopener" class="text-sm transition-colors hover:underline flex items-center gap-1" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}">PPID Kota Samarinda `);
      _push(ssrRenderComponent(_component_Icon, {
        icon: "solar:export-linear",
        class: "w-3.5 h-3.5"
      }, null, _parent));
      _push(`</a></li><li><a href="https://lpse.samarindakota.go.id" target="_blank" rel="noopener" class="text-sm transition-colors hover:underline flex items-center gap-1" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}">LPSE Kota Samarinda `);
      _push(ssrRenderComponent(_component_Icon, {
        icon: "solar:export-linear",
        class: "w-3.5 h-3.5"
      }, null, _parent));
      _push(`</a></li></ul></div><div><h5 class="text-xs font-semibold mb-5" style="${ssrRenderStyle({ "color": "var(--color-ink)" })}">Layanan</h5><ul class="space-y-3"><li>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("login"),
        class: "text-sm transition-colors hover:underline",
        style: { "color": "var(--color-ink-2)" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Login Admin`);
          } else {
            return [
              createTextVNode("Login Admin")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li><a href="#" class="text-sm transition-colors hover:underline" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}">Panduan Pengguna</a></li><li><a href="#" class="text-sm transition-colors hover:underline" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}">Syarat &amp; Ketentuan</a></li></ul></div><div><h5 class="text-xs font-semibold mb-5" style="${ssrRenderStyle({ "color": "var(--color-ink)" })}">Kontak BAPPERIDA</h5><ul class="space-y-3"><li class="text-sm" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}">Jl. Dahlia No.81, Kel. Bugis</li><li class="text-sm" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}">Kec. Samarinda Kota, Kota Samarinda</li><li class="text-sm" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}">Kalimantan Timur 75121</li><li class="text-sm" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}">Telp: 0541-203785</li><li><a href="mailto:bappedalitbang@samarindakota.go.id" class="text-sm" style="${ssrRenderStyle({ "color": "var(--color-accent)" })}">bappedalitbang@samarindakota.go.id</a></li></ul></div><div><h5 class="text-xs font-semibold mb-5" style="${ssrRenderStyle({ "color": "var(--color-ink)" })}">Ikuti Kami</h5><div class="flex items-center gap-3"><a href="https://www.instagram.com/bapperida_smd/" target="_blank" class="w-9 h-9 flex items-center justify-center rounded-lg transition-colors" style="${ssrRenderStyle({ "border": "1px solid var(--color-rule)", "color": "var(--color-ink-2)" })}">`);
      _push(ssrRenderComponent(_component_Icon, {
        icon: "solar:gallery-bold",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`</a><a href="https://www.youtube.com/@bapperidasamarinda" target="_blank" class="w-9 h-9 flex items-center justify-center rounded-lg transition-colors" style="${ssrRenderStyle({ "border": "1px solid var(--color-rule)", "color": "var(--color-ink-2)" })}">`);
      _push(ssrRenderComponent(_component_Icon, {
        icon: "solar:play-bold",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`</a><a href="mailto:bappedalitbang@samarindakota.go.id" class="w-9 h-9 flex items-center justify-center rounded-lg transition-colors" style="${ssrRenderStyle({ "border": "1px solid var(--color-rule)", "color": "var(--color-ink-2)" })}">`);
      _push(ssrRenderComponent(_component_Icon, {
        icon: "solar:letter-bold",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`</a></div></div></div><div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"><div class="flex items-center gap-3"><img src="/img/logo-samarinda.webp" alt="Lambang Kota Samarinda" class="w-8 h-8 object-contain"><div><span class="text-sm font-semibold" style="${ssrRenderStyle({ "font-family": "var(--font-display)", "color": "var(--color-ink)", "letter-spacing": "-0.02em" })}">SIKAJIAN</span><span class="text-xs block" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}">© ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} BAPPEDA Litbang Kota Samarinda</span></div></div><span class="text-xs" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}">Dibangun untuk pelayanan publik</span></div></div></footer></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/FrontendLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
