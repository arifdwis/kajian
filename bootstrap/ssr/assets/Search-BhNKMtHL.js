import { ref, resolveComponent, unref, withCtx, createTextVNode, toDisplayString, createVNode, withDirectives, withKeys, vModelText, openBlock, createBlock, Fragment, renderList, vModelSelect, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { Head, Link, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./FrontendLayout-CemJRisx.js";
import { _ as _sfc_main$2 } from "./Pagination-DE6AvrVK.js";
const _sfc_main = {
  __name: "Search",
  __ssrInlineRender: true,
  props: {
    results: Object,
    filters: Object,
    bidangs: Array,
    jenisKajians: Array,
    tahuns: Array
  },
  setup(__props) {
    const props = __props;
    const q = ref(props.filters.q || "");
    const bidang_id = ref(props.filters.bidang_id || "");
    const jenis_id = ref(props.filters.jenis_id || "");
    const tahun_id = ref(props.filters.tahun_id || "");
    const handleSearch = () => {
      router.get(route("portal.search"), {
        q: q.value,
        bidang_id: bidang_id.value,
        jenis_id: jenis_id.value,
        tahun_id: tahun_id.value
      }, {
        preserveState: true,
        preserveScroll: true
      });
    };
    const resetFilter = () => {
      q.value = "";
      bidang_id.value = "";
      jenis_id.value = "";
      tahun_id.value = "";
      handleSearch();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = resolveComponent("Icon");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Pencarian Canggih" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="container mx-auto px-4 xl:px-0 pt-8 pb-16 space-y-10"${_scopeId}><div class="text-center max-w-2xl mx-auto"${_scopeId}><h2 class="text-3xl font-semibold" style="${ssrRenderStyle({ "font-family": "var(--font-display)", "color": "var(--color-ink)", "letter-spacing": "-0.02em" })}"${_scopeId}>Pencarian Dokumen</h2><p class="text-sm mt-2" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}>Gunakan kombinasi kata kunci dan filter untuk penelusuran lebih akurat</p></div><div style="${ssrRenderStyle({ "border": "1px solid var(--color-rule)", "border-radius": "12px", "background-color": "var(--color-paper)", "padding": "32px" })}"${_scopeId}><div class="relative"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:magnifer-linear",
              class: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5",
              style: { "color": "var(--color-ink-2)" }
            }, null, _parent2, _scopeId));
            _push2(`<input type="text"${ssrRenderAttr("value", q.value)} placeholder="Cari judul kajian, abstrak, penulis..." class="w-full pl-12 pr-4 py-3.5 text-sm rounded-md" style="${ssrRenderStyle({ "border": "1px solid var(--color-rule)", "color": "var(--color-ink)", "background-color": "var(--color-paper-2)" })}"${_scopeId}></div><div class="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-6"${_scopeId}><div${_scopeId}><label class="block text-xs font-medium mb-2" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}>Klaster Bidang</label><select class="w-full text-sm px-4 py-2.5 rounded-md" style="${ssrRenderStyle({ "border": "1px solid var(--color-rule)", "color": "var(--color-ink)", "background-color": "var(--color-paper-2)" })}"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(bidang_id.value) ? ssrLooseContain(bidang_id.value, "") : ssrLooseEqual(bidang_id.value, "")) ? " selected" : ""}${_scopeId}>Semua Bidang</option><!--[-->`);
            ssrRenderList(__props.bidangs, (b) => {
              _push2(`<option${ssrRenderAttr("value", b.id)}${ssrIncludeBooleanAttr(Array.isArray(bidang_id.value) ? ssrLooseContain(bidang_id.value, b.id) : ssrLooseEqual(bidang_id.value, b.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(b.nama)}</option>`);
            });
            _push2(`<!--]--></select></div><div${_scopeId}><label class="block text-xs font-medium mb-2" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}>Jenis Penelitian</label><select class="w-full text-sm px-4 py-2.5 rounded-md" style="${ssrRenderStyle({ "border": "1px solid var(--color-rule)", "color": "var(--color-ink)", "background-color": "var(--color-paper-2)" })}"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(jenis_id.value) ? ssrLooseContain(jenis_id.value, "") : ssrLooseEqual(jenis_id.value, "")) ? " selected" : ""}${_scopeId}>Semua Jenis</option><!--[-->`);
            ssrRenderList(__props.jenisKajians, (j) => {
              _push2(`<option${ssrRenderAttr("value", j.id)}${ssrIncludeBooleanAttr(Array.isArray(jenis_id.value) ? ssrLooseContain(jenis_id.value, j.id) : ssrLooseEqual(jenis_id.value, j.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(j.nama)}</option>`);
            });
            _push2(`<!--]--></select></div><div${_scopeId}><label class="block text-xs font-medium mb-2" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}>Tahun</label><select class="w-full text-sm px-4 py-2.5 rounded-md" style="${ssrRenderStyle({ "border": "1px solid var(--color-rule)", "color": "var(--color-ink)", "background-color": "var(--color-paper-2)" })}"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(tahun_id.value) ? ssrLooseContain(tahun_id.value, "") : ssrLooseEqual(tahun_id.value, "")) ? " selected" : ""}${_scopeId}>Semua Tahun</option><!--[-->`);
            ssrRenderList(__props.tahuns, (t) => {
              _push2(`<option${ssrRenderAttr("value", t.id)}${ssrIncludeBooleanAttr(Array.isArray(tahun_id.value) ? ssrLooseContain(tahun_id.value, t.id) : ssrLooseEqual(tahun_id.value, t.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(t.tahun)}</option>`);
            });
            _push2(`<!--]--></select></div></div><div class="flex justify-end gap-3 mt-6 pt-5" style="${ssrRenderStyle({ "border-top": "1px solid var(--color-rule)" })}"${_scopeId}><button class="px-5 py-2.5 text-sm font-medium rounded-md" style="${ssrRenderStyle({ "border": "1px solid var(--color-rule)", "color": "var(--color-ink)" })}"${_scopeId}> Reset </button><button class="px-6 py-2.5 text-sm font-semibold rounded-md" style="${ssrRenderStyle({ "background-color": "var(--color-accent)", "color": "var(--color-accent-ink)" })}"${_scopeId}> Cari </button></div></div><div class="space-y-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><p style="${ssrRenderStyle({ "color": "var(--color-ink-2)", "font-size": "14px" })}"${_scopeId}>Ditemukan <strong style="${ssrRenderStyle({ "color": "var(--color-ink)" })}"${_scopeId}>${ssrInterpolate(__props.results.total)}</strong> hasil pencarian `);
            if (__props.filters.q) {
              _push2(`<span${_scopeId}>untuk &quot;${ssrInterpolate(__props.filters.q)}&quot;</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</p></div>`);
            if (__props.results.data.length === 0) {
              _push2(`<div class="text-center p-12" style="${ssrRenderStyle({ "border": "1px solid var(--color-rule)", "border-radius": "12px", "color": "var(--color-ink-2)", "background-color": "var(--color-paper)" })}"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                icon: "solar:minimalistic-magnifer-zoom-out-bold",
                class: "w-12 h-12 mx-auto mb-3",
                style: { "color": "var(--color-ink-2)" }
              }, null, _parent2, _scopeId));
              _push2(`<p${_scopeId}>Dokumen tidak ditemukan. Silakan ganti kata kunci atau gunakan filter.</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="space-y-4"${_scopeId}><!--[-->`);
            ssrRenderList(__props.results.data, (item) => {
              var _a, _b, _c;
              _push2(`<div class="p-6 transition-colors" style="${ssrRenderStyle({ "border": "1px solid var(--color-rule)", "border-radius": "12px", "background-color": "var(--color-paper)" })}"${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"${_scopeId}><div class="min-w-0 flex-1 space-y-2"${_scopeId}><div class="flex items-center gap-2"${_scopeId}><span class="text-xs font-medium px-2.5 py-1 rounded-md" style="${ssrRenderStyle({ "background-color": "var(--color-paper-2)", "color": "var(--color-accent)", "border": "1px solid var(--color-rule)" })}"${_scopeId}>${ssrInterpolate((_a = item.jenis_kajian) == null ? void 0 : _a.nama)}</span><span style="${ssrRenderStyle({ "font-size": "12px", "color": "var(--color-ink-2)" })}"${_scopeId}>${ssrInterpolate((_b = item.tahun) == null ? void 0 : _b.tahun)}</span></div><h4 class="font-semibold text-sm" style="${ssrRenderStyle({ "color": "var(--color-ink)" })}"${_scopeId}>`);
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
              _push2(`</h4><p class="text-sm line-clamp-2 leading-relaxed" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}>${ssrInterpolate(item.ringkasan)}</p><span style="${ssrRenderStyle({ "font-size": "11px", "color": "var(--color-ink-2)" })}"${_scopeId}>Rumpun: ${ssrInterpolate((_c = item.bidang) == null ? void 0 : _c.nama)}</span></div><div class="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4 shrink-0 sm:pl-6" style="${ssrRenderStyle({ "border-left": "1px solid var(--color-rule)" })}"${_scopeId}><div class="flex items-center gap-4" style="${ssrRenderStyle({ "color": "var(--color-ink-2)", "font-size": "13px" })}"${_scopeId}><span class="flex items-center gap-1"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                icon: "solar:eye-linear",
                class: "w-4 h-4"
              }, null, _parent2, _scopeId));
              _push2(` ${ssrInterpolate(item.view_count || 0)}</span><span class="flex items-center gap-1"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                icon: "solar:download-linear",
                class: "w-4 h-4"
              }, null, _parent2, _scopeId));
              _push2(` ${ssrInterpolate(item.download_count || 0)}</span></div>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("portal.detail", item.slug),
                class: "px-4 py-2 text-sm font-semibold rounded-md",
                style: { "background-color": "var(--color-accent)", "color": "var(--color-accent-ink)" }
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
              _push2(`</div></div></div>`);
            });
            _push2(`<!--]--></div><div class="flex justify-end pt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              links: __props.results.links
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "container mx-auto px-4 xl:px-0 pt-8 pb-16 space-y-10" }, [
                createVNode("div", { class: "text-center max-w-2xl mx-auto" }, [
                  createVNode("h2", {
                    class: "text-3xl font-semibold",
                    style: { "font-family": "var(--font-display)", "color": "var(--color-ink)", "letter-spacing": "-0.02em" }
                  }, "Pencarian Dokumen"),
                  createVNode("p", {
                    class: "text-sm mt-2",
                    style: { "color": "var(--color-ink-2)" }
                  }, "Gunakan kombinasi kata kunci dan filter untuk penelusuran lebih akurat")
                ]),
                createVNode("div", { style: { "border": "1px solid var(--color-rule)", "border-radius": "12px", "background-color": "var(--color-paper)", "padding": "32px" } }, [
                  createVNode("div", { class: "relative" }, [
                    createVNode(_component_Icon, {
                      icon: "solar:magnifer-linear",
                      class: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5",
                      style: { "color": "var(--color-ink-2)" }
                    }),
                    withDirectives(createVNode("input", {
                      type: "text",
                      "onUpdate:modelValue": ($event) => q.value = $event,
                      placeholder: "Cari judul kajian, abstrak, penulis...",
                      class: "w-full pl-12 pr-4 py-3.5 text-sm rounded-md",
                      style: { "border": "1px solid var(--color-rule)", "color": "var(--color-ink)", "background-color": "var(--color-paper-2)" },
                      onKeyup: withKeys(handleSearch, ["enter"])
                    }, null, 40, ["onUpdate:modelValue"]), [
                      [vModelText, q.value]
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-3 gap-5 mt-6" }, [
                    createVNode("div", null, [
                      createVNode("label", {
                        class: "block text-xs font-medium mb-2",
                        style: { "color": "var(--color-ink-2)" }
                      }, "Klaster Bidang"),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => bidang_id.value = $event,
                        class: "w-full text-sm px-4 py-2.5 rounded-md",
                        style: { "border": "1px solid var(--color-rule)", "color": "var(--color-ink)", "background-color": "var(--color-paper-2)" }
                      }, [
                        createVNode("option", { value: "" }, "Semua Bidang"),
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.bidangs, (b) => {
                          return openBlock(), createBlock("option", {
                            key: b.id,
                            value: b.id
                          }, toDisplayString(b.nama), 9, ["value"]);
                        }), 128))
                      ], 8, ["onUpdate:modelValue"]), [
                        [vModelSelect, bidang_id.value]
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", {
                        class: "block text-xs font-medium mb-2",
                        style: { "color": "var(--color-ink-2)" }
                      }, "Jenis Penelitian"),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => jenis_id.value = $event,
                        class: "w-full text-sm px-4 py-2.5 rounded-md",
                        style: { "border": "1px solid var(--color-rule)", "color": "var(--color-ink)", "background-color": "var(--color-paper-2)" }
                      }, [
                        createVNode("option", { value: "" }, "Semua Jenis"),
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.jenisKajians, (j) => {
                          return openBlock(), createBlock("option", {
                            key: j.id,
                            value: j.id
                          }, toDisplayString(j.nama), 9, ["value"]);
                        }), 128))
                      ], 8, ["onUpdate:modelValue"]), [
                        [vModelSelect, jenis_id.value]
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", {
                        class: "block text-xs font-medium mb-2",
                        style: { "color": "var(--color-ink-2)" }
                      }, "Tahun"),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => tahun_id.value = $event,
                        class: "w-full text-sm px-4 py-2.5 rounded-md",
                        style: { "border": "1px solid var(--color-rule)", "color": "var(--color-ink)", "background-color": "var(--color-paper-2)" }
                      }, [
                        createVNode("option", { value: "" }, "Semua Tahun"),
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.tahuns, (t) => {
                          return openBlock(), createBlock("option", {
                            key: t.id,
                            value: t.id
                          }, toDisplayString(t.tahun), 9, ["value"]);
                        }), 128))
                      ], 8, ["onUpdate:modelValue"]), [
                        [vModelSelect, tahun_id.value]
                      ])
                    ])
                  ]),
                  createVNode("div", {
                    class: "flex justify-end gap-3 mt-6 pt-5",
                    style: { "border-top": "1px solid var(--color-rule)" }
                  }, [
                    createVNode("button", {
                      onClick: resetFilter,
                      class: "px-5 py-2.5 text-sm font-medium rounded-md",
                      style: { "border": "1px solid var(--color-rule)", "color": "var(--color-ink)" },
                      onMouseenter: ($event) => $event.target.style.backgroundColor = "var(--color-paper-2)",
                      onMouseleave: ($event) => $event.target.style.backgroundColor = "transparent"
                    }, " Reset ", 40, ["onMouseenter", "onMouseleave"]),
                    createVNode("button", {
                      onClick: handleSearch,
                      class: "px-6 py-2.5 text-sm font-semibold rounded-md",
                      style: { "background-color": "var(--color-accent)", "color": "var(--color-accent-ink)" },
                      onMouseenter: ($event) => $event.target.style.backgroundColor = "oklch(39% 0.055 135)",
                      onMouseleave: ($event) => $event.target.style.backgroundColor = "var(--color-accent)"
                    }, " Cari ", 40, ["onMouseenter", "onMouseleave"])
                  ])
                ]),
                createVNode("div", { class: "space-y-6" }, [
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode("p", { style: { "color": "var(--color-ink-2)", "font-size": "14px" } }, [
                      createTextVNode("Ditemukan "),
                      createVNode("strong", { style: { "color": "var(--color-ink)" } }, toDisplayString(__props.results.total), 1),
                      createTextVNode(" hasil pencarian "),
                      __props.filters.q ? (openBlock(), createBlock("span", { key: 0 }, 'untuk "' + toDisplayString(__props.filters.q) + '"', 1)) : createCommentVNode("", true)
                    ])
                  ]),
                  __props.results.data.length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "text-center p-12",
                    style: { "border": "1px solid var(--color-rule)", "border-radius": "12px", "color": "var(--color-ink-2)", "background-color": "var(--color-paper)" }
                  }, [
                    createVNode(_component_Icon, {
                      icon: "solar:minimalistic-magnifer-zoom-out-bold",
                      class: "w-12 h-12 mx-auto mb-3",
                      style: { "color": "var(--color-ink-2)" }
                    }),
                    createVNode("p", null, "Dokumen tidak ditemukan. Silakan ganti kata kunci atau gunakan filter.")
                  ])) : createCommentVNode("", true),
                  createVNode("div", { class: "space-y-4" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.results.data, (item) => {
                      var _a, _b, _c;
                      return openBlock(), createBlock("div", {
                        key: item.id,
                        class: "p-6 transition-colors",
                        style: { "border": "1px solid var(--color-rule)", "border-radius": "12px", "background-color": "var(--color-paper)" },
                        onMouseenter: ($event) => $event.target.style.borderColor = "var(--color-accent)",
                        onMouseleave: ($event) => $event.target.style.borderColor = "var(--color-rule)"
                      }, [
                        createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6" }, [
                          createVNode("div", { class: "min-w-0 flex-1 space-y-2" }, [
                            createVNode("div", { class: "flex items-center gap-2" }, [
                              createVNode("span", {
                                class: "text-xs font-medium px-2.5 py-1 rounded-md",
                                style: { "background-color": "var(--color-paper-2)", "color": "var(--color-accent)", "border": "1px solid var(--color-rule)" }
                              }, toDisplayString((_a = item.jenis_kajian) == null ? void 0 : _a.nama), 1),
                              createVNode("span", { style: { "font-size": "12px", "color": "var(--color-ink-2)" } }, toDisplayString((_b = item.tahun) == null ? void 0 : _b.tahun), 1)
                            ]),
                            createVNode("h4", {
                              class: "font-semibold text-sm",
                              style: { "color": "var(--color-ink)" }
                            }, [
                              createVNode(unref(Link), {
                                href: _ctx.route("portal.detail", item.slug)
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item.judul), 1)
                                ]),
                                _: 2
                              }, 1032, ["href"])
                            ]),
                            createVNode("p", {
                              class: "text-sm line-clamp-2 leading-relaxed",
                              style: { "color": "var(--color-ink-2)" }
                            }, toDisplayString(item.ringkasan), 1),
                            createVNode("span", { style: { "font-size": "11px", "color": "var(--color-ink-2)" } }, "Rumpun: " + toDisplayString((_c = item.bidang) == null ? void 0 : _c.nama), 1)
                          ]),
                          createVNode("div", {
                            class: "flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4 shrink-0 sm:pl-6",
                            style: { "border-left": "1px solid var(--color-rule)" }
                          }, [
                            createVNode("div", {
                              class: "flex items-center gap-4",
                              style: { "color": "var(--color-ink-2)", "font-size": "13px" }
                            }, [
                              createVNode("span", { class: "flex items-center gap-1" }, [
                                createVNode(_component_Icon, {
                                  icon: "solar:eye-linear",
                                  class: "w-4 h-4"
                                }),
                                createTextVNode(" " + toDisplayString(item.view_count || 0), 1)
                              ]),
                              createVNode("span", { class: "flex items-center gap-1" }, [
                                createVNode(_component_Icon, {
                                  icon: "solar:download-linear",
                                  class: "w-4 h-4"
                                }),
                                createTextVNode(" " + toDisplayString(item.download_count || 0), 1)
                              ])
                            ]),
                            createVNode(unref(Link), {
                              href: _ctx.route("portal.detail", item.slug),
                              class: "px-4 py-2 text-sm font-semibold rounded-md",
                              style: { "background-color": "var(--color-accent)", "color": "var(--color-accent-ink)" }
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Baca ")
                              ]),
                              _: 1
                            }, 8, ["href"])
                          ])
                        ])
                      ], 40, ["onMouseenter", "onMouseleave"]);
                    }), 128))
                  ]),
                  createVNode("div", { class: "flex justify-end pt-4" }, [
                    createVNode(_sfc_main$2, {
                      links: __props.results.links
                    }, null, 8, ["links"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Frontend/Portal/Search.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
