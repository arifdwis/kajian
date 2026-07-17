import { computed, resolveComponent, unref, withCtx, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { usePage, Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-C8eooNFo.js";
import "flowbite-vue";
import "./ApplicationLogo-CmsQkCHn.js";
import "@iconify/vue";
import "mitt";
const _sfc_main = {
  __name: "DashboardAsn",
  __ssrInlineRender: true,
  props: {
    popularKajians: Array,
    recentKajians: Array
  },
  setup(__props) {
    const page = usePage();
    const user = computed(() => page.props.auth.user);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = resolveComponent("Icon");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Dashboard ASN" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-8"${_scopeId}><div class="relative overflow-hidden rounded-card p-8" style="${ssrRenderStyle({ "background": "linear-gradient(135deg, #047857 0%, #065F46 100%)" })}"${_scopeId}><div class="absolute -right-10 -top-10 w-40 h-40 rounded-full blur-2xl" style="${ssrRenderStyle({ "background": "rgba(255,255,255,0.08)" })}"${_scopeId}></div><div class="absolute right-20 bottom-0 w-32 h-32 rounded-full blur-xl" style="${ssrRenderStyle({ "background": "rgba(255,255,255,0.06)" })}"${_scopeId}></div><div class="relative z-10 max-w-xl"${_scopeId}><span class="font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-full" style="${ssrRenderStyle({ "background": "rgba(255,255,255,0.15)", "color": "#fff", "border": "1px solid rgba(255,255,255,0.25)" })}"${_scopeId}> Pengguna </span><h2 class="text-2xl font-bold mt-4 text-white"${_scopeId}>Selamat Datang, ${ssrInterpolate(user.value.name)}</h2><p class="text-sm mt-2 leading-relaxed" style="${ssrRenderStyle({ "color": "rgba(255,255,255,0.85)" })}"${_scopeId}> Akses pustaka digital kajian, rekomendasi kebijakan, riset strategis, dan data penelitian Pemerintah Kota Samarinda. </p></div></div><div class="bg-paper dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-card p-6 flex flex-col md:flex-row items-center justify-between gap-4"${_scopeId}><div class="flex items-center gap-4"${_scopeId}><div class="p-3 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-sm shrink-0"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:minimalistic-magnifer-bold",
              class: "w-6 h-6"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><h4 class="font-bold text-gray-800 dark:text-white text-base"${_scopeId}>Cari Kajian &amp; Dokumen Riset</h4><p class="text-xs text-gray-400 mt-0.5"${_scopeId}>Cari menggunakan kata kunci, judul, penanggung jawab, bidang, atau tahun penelitian.</p></div></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("portal.kajian"),
              class: "px-5 py-2.5 bg-gray-900 hover:bg-gray-800 dark:bg-paper dark:hover:bg-gray-100 text-white dark:text-gray-950 font-semibold text-xs rounded-sm transition-colors shrink-0"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Mulai Pencarian `);
                } else {
                  return [
                    createTextVNode(" Mulai Pencarian ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="grid grid-cols-1 lg:grid-cols-3 gap-8"${_scopeId}><div class="lg:col-span-1 bg-paper dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-card p-6 flex flex-col justify-between"${_scopeId}><div${_scopeId}><h4 class="font-bold text-gray-800 dark:text-white text-base mb-1"${_scopeId}>Rekomendasi Terpopuler</h4><p class="text-xs text-gray-400 mb-6"${_scopeId}>Paling banyak dibaca &amp; diunduh oleh instansi</p></div><div class="space-y-4"${_scopeId}><!--[-->`);
            ssrRenderList(__props.popularKajians, (item) => {
              var _a, _b;
              _push2(`<div class="flex items-start gap-3 border-b border-gray-50 dark:border-gray-700 pb-3 last:border-0 last:pb-0"${_scopeId}><div class="p-2 bg-teal-50 dark:bg-teal-900/20 text-teal-600 rounded-sm shrink-0"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                icon: "solar:file-text-bold",
                class: "w-5 h-5"
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="min-w-0 flex-1"${_scopeId}><h5 class="text-xs font-bold text-gray-800 dark:text-gray-200 line-clamp-1 hover:underline"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("portal.detail", item.slug)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(item.judul)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(item.judul), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</h5><p class="text-[10px] text-gray-400 mt-0.5"${_scopeId}>${ssrInterpolate((_a = item.tahun) == null ? void 0 : _a.tahun)} • ${ssrInterpolate((_b = item.jenis_kajian) == null ? void 0 : _b.nama)}</p></div><span class="text-xs font-bold text-teal-600 dark:text-teal-400 flex items-center shrink-0"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                icon: "solar:download-bold",
                class: "w-3.5 h-3.5 mr-1"
              }, null, _parent2, _scopeId));
              _push2(` ${ssrInterpolate(item.download_count)}</span></div>`);
            });
            _push2(`<!--]--></div></div><div class="lg:col-span-2 bg-paper dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-card p-6 flex flex-col justify-between"${_scopeId}><div${_scopeId}><h4 class="font-bold text-gray-800 dark:text-white text-base mb-1"${_scopeId}>Publikasi Riset Terbaru</h4><p class="text-xs text-gray-400 mb-6 font-medium"${_scopeId}>Buku, laporan kajian, dan naskah akademik terbaru</p></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><!--[-->`);
            ssrRenderList(__props.recentKajians, (item) => {
              var _a, _b, _c;
              _push2(`<div class="p-4 bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800 rounded-card flex flex-col justify-between hover: transition-all duration-200"${_scopeId}><div${_scopeId}><span class="bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded border border-teal-200/30"${_scopeId}>${ssrInterpolate(((_a = item.jenis_kajian) == null ? void 0 : _a.nama) || "Kajian")}</span><h5 class="text-xs font-bold text-gray-800 dark:text-gray-200 line-clamp-2 mt-2 leading-relaxed"${_scopeId}>${ssrInterpolate(item.judul)}</h5></div><div class="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between"${_scopeId}><span class="text-[10px] text-gray-400 font-medium"${_scopeId}>${ssrInterpolate((_b = item.tahun) == null ? void 0 : _b.tahun)} • ${ssrInterpolate((_c = item.bidang) == null ? void 0 : _c.nama)}</span>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("portal.detail", item.slug),
                class: "text-xs font-bold text-teal-600 hover:text-teal-800 transition-colors"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Baca `);
                  } else {
                    return [
                      createTextVNode(" Baca ")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div></div>`);
            });
            _push2(`<!--]--></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-8" }, [
                createVNode("div", {
                  class: "relative overflow-hidden rounded-card p-8",
                  style: { "background": "linear-gradient(135deg, #047857 0%, #065F46 100%)" }
                }, [
                  createVNode("div", {
                    class: "absolute -right-10 -top-10 w-40 h-40 rounded-full blur-2xl",
                    style: { "background": "rgba(255,255,255,0.08)" }
                  }),
                  createVNode("div", {
                    class: "absolute right-20 bottom-0 w-32 h-32 rounded-full blur-xl",
                    style: { "background": "rgba(255,255,255,0.06)" }
                  }),
                  createVNode("div", { class: "relative z-10 max-w-xl" }, [
                    createVNode("span", {
                      class: "font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-full",
                      style: { "background": "rgba(255,255,255,0.15)", "color": "#fff", "border": "1px solid rgba(255,255,255,0.25)" }
                    }, " Pengguna "),
                    createVNode("h2", { class: "text-2xl font-bold mt-4 text-white" }, "Selamat Datang, " + toDisplayString(user.value.name), 1),
                    createVNode("p", {
                      class: "text-sm mt-2 leading-relaxed",
                      style: { "color": "rgba(255,255,255,0.85)" }
                    }, " Akses pustaka digital kajian, rekomendasi kebijakan, riset strategis, dan data penelitian Pemerintah Kota Samarinda. ")
                  ])
                ]),
                createVNode("div", { class: "bg-paper dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-card p-6 flex flex-col md:flex-row items-center justify-between gap-4" }, [
                  createVNode("div", { class: "flex items-center gap-4" }, [
                    createVNode("div", { class: "p-3 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-sm shrink-0" }, [
                      createVNode(_component_Icon, {
                        icon: "solar:minimalistic-magnifer-bold",
                        class: "w-6 h-6"
                      })
                    ]),
                    createVNode("div", null, [
                      createVNode("h4", { class: "font-bold text-gray-800 dark:text-white text-base" }, "Cari Kajian & Dokumen Riset"),
                      createVNode("p", { class: "text-xs text-gray-400 mt-0.5" }, "Cari menggunakan kata kunci, judul, penanggung jawab, bidang, atau tahun penelitian.")
                    ])
                  ]),
                  createVNode(unref(Link), {
                    href: _ctx.route("portal.kajian"),
                    class: "px-5 py-2.5 bg-gray-900 hover:bg-gray-800 dark:bg-paper dark:hover:bg-gray-100 text-white dark:text-gray-950 font-semibold text-xs rounded-sm transition-colors shrink-0"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Mulai Pencarian ")
                    ]),
                    _: 1
                  }, 8, ["href"])
                ]),
                createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-3 gap-8" }, [
                  createVNode("div", { class: "lg:col-span-1 bg-paper dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-card p-6 flex flex-col justify-between" }, [
                    createVNode("div", null, [
                      createVNode("h4", { class: "font-bold text-gray-800 dark:text-white text-base mb-1" }, "Rekomendasi Terpopuler"),
                      createVNode("p", { class: "text-xs text-gray-400 mb-6" }, "Paling banyak dibaca & diunduh oleh instansi")
                    ]),
                    createVNode("div", { class: "space-y-4" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.popularKajians, (item) => {
                        var _a, _b;
                        return openBlock(), createBlock("div", {
                          key: item.id,
                          class: "flex items-start gap-3 border-b border-gray-50 dark:border-gray-700 pb-3 last:border-0 last:pb-0"
                        }, [
                          createVNode("div", { class: "p-2 bg-teal-50 dark:bg-teal-900/20 text-teal-600 rounded-sm shrink-0" }, [
                            createVNode(_component_Icon, {
                              icon: "solar:file-text-bold",
                              class: "w-5 h-5"
                            })
                          ]),
                          createVNode("div", { class: "min-w-0 flex-1" }, [
                            createVNode("h5", { class: "text-xs font-bold text-gray-800 dark:text-gray-200 line-clamp-1 hover:underline" }, [
                              createVNode(unref(Link), {
                                href: _ctx.route("portal.detail", item.slug)
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item.judul), 1)
                                ]),
                                _: 2
                              }, 1032, ["href"])
                            ]),
                            createVNode("p", { class: "text-[10px] text-gray-400 mt-0.5" }, toDisplayString((_a = item.tahun) == null ? void 0 : _a.tahun) + " • " + toDisplayString((_b = item.jenis_kajian) == null ? void 0 : _b.nama), 1)
                          ]),
                          createVNode("span", { class: "text-xs font-bold text-teal-600 dark:text-teal-400 flex items-center shrink-0" }, [
                            createVNode(_component_Icon, {
                              icon: "solar:download-bold",
                              class: "w-3.5 h-3.5 mr-1"
                            }),
                            createTextVNode(" " + toDisplayString(item.download_count), 1)
                          ])
                        ]);
                      }), 128))
                    ])
                  ]),
                  createVNode("div", { class: "lg:col-span-2 bg-paper dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-card p-6 flex flex-col justify-between" }, [
                    createVNode("div", null, [
                      createVNode("h4", { class: "font-bold text-gray-800 dark:text-white text-base mb-1" }, "Publikasi Riset Terbaru"),
                      createVNode("p", { class: "text-xs text-gray-400 mb-6 font-medium" }, "Buku, laporan kajian, dan naskah akademik terbaru")
                    ]),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.recentKajians, (item) => {
                        var _a, _b, _c;
                        return openBlock(), createBlock("div", {
                          key: item.id,
                          class: "p-4 bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800 rounded-card flex flex-col justify-between hover: transition-all duration-200"
                        }, [
                          createVNode("div", null, [
                            createVNode("span", { class: "bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded border border-teal-200/30" }, toDisplayString(((_a = item.jenis_kajian) == null ? void 0 : _a.nama) || "Kajian"), 1),
                            createVNode("h5", { class: "text-xs font-bold text-gray-800 dark:text-gray-200 line-clamp-2 mt-2 leading-relaxed" }, toDisplayString(item.judul), 1)
                          ]),
                          createVNode("div", { class: "mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between" }, [
                            createVNode("span", { class: "text-[10px] text-gray-400 font-medium" }, toDisplayString((_b = item.tahun) == null ? void 0 : _b.tahun) + " • " + toDisplayString((_c = item.bidang) == null ? void 0 : _c.nama), 1),
                            createVNode(unref(Link), {
                              href: _ctx.route("portal.detail", item.slug),
                              class: "text-xs font-bold text-teal-600 hover:text-teal-800 transition-colors"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Baca ")
                              ]),
                              _: 1
                            }, 8, ["href"])
                          ])
                        ]);
                      }), 128))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Backend/DashboardAsn.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
