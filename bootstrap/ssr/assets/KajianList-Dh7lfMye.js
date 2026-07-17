import { ref, computed, resolveComponent, unref, withCtx, createTextVNode, toDisplayString, createVNode, withDirectives, withKeys, vModelText, openBlock, createBlock, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle, ssrRenderAttr, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { Head, Link, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./FrontendLayout-Cs4D5AFH.js";
import { _ as _sfc_main$2 } from "./Pagination-DE6AvrVK.js";
import axios from "axios";
import { useToast } from "vue-toastification";
const _sfc_main = {
  __name: "KajianList",
  __ssrInlineRender: true,
  props: {
    kajians: Object,
    filters: Object,
    bidangs: Array,
    jenisKajians: Array,
    tahuns: Array
  },
  setup(__props) {
    const toast = useToast();
    const props = __props;
    const search = ref(props.filters.search || "");
    const bidang_id = ref(props.filters.bidang_id || "");
    const jenis_id = ref(props.filters.jenis_id || "");
    const tahun_id = ref(props.filters.tahun_id || "");
    const sort = ref(props.filters.sort || "terbaru");
    const sortOptions = [
      { label: "Terbaru", value: "terbaru" },
      { label: "Terpopuler", value: "populer" },
      { label: "Judul A-Z", value: "a-z" }
    ];
    const bidangOptions = computed(() => [
      { label: "Semua Bidang", value: "" },
      ...props.bidangs.map((b) => ({ label: b.nama, value: b.id }))
    ]);
    const jenisOptions = computed(() => [
      { label: "Semua Jenis", value: "" },
      ...props.jenisKajians.map((j) => ({ label: j.nama, value: j.id }))
    ]);
    const tahunOptions = computed(() => [
      { label: "Semua Tahun", value: "" },
      ...props.tahuns.map((t) => ({ label: t.tahun, value: t.id }))
    ]);
    const handleFilter = () => {
      router.get(route("portal.kajian"), {
        search: search.value,
        bidang_id: bidang_id.value,
        jenis_id: jenis_id.value,
        tahun_id: tahun_id.value,
        sort: sort.value
      }, {
        preserveState: true,
        preserveScroll: true
      });
    };
    const resetFilter = () => {
      search.value = "";
      bidang_id.value = "";
      jenis_id.value = "";
      tahun_id.value = "";
      sort.value = "terbaru";
      handleFilter();
    };
    const getCoverUrl = (item) => {
      if (!item.files) return null;
      const file = item.files.find((f) => f.tipe === "cover");
      return file ? `/storage/${file.file_path}` : null;
    };
    const directDownload = (slug) => {
      toast.info("Memulai unduhan...");
      axios.post(route("portal.download", slug), {}, { responseType: "blob" }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", slug + ".pdf");
        document.body.appendChild(link);
        link.click();
        link.remove();
        toast.success("Unduhan berhasil.");
      }).catch(() => toast.error("Gagal mengunduh berkas."));
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SearchSelect = resolveComponent("SearchSelect");
      const _component_Icon = resolveComponent("Icon");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Daftar Kajian Publik" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="container mx-auto px-4 xl:px-0 pt-8 pb-16"${_scopeId}><div class="mb-10 pb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4" style="${ssrRenderStyle({ "border-bottom": "1px solid var(--color-rule)" })}"${_scopeId}><div${_scopeId}><h2 class="text-3xl font-semibold" style="${ssrRenderStyle({ "font-family": "var(--font-display)", "color": "var(--color-ink)", "letter-spacing": "-0.02em" })}"${_scopeId}>Arsip Kajian &amp; Penelitian</h2><p class="text-sm mt-2" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}>Browse pustaka publikasi strategis Bapperida Samarinda</p></div><div class="flex items-center gap-3"${_scopeId}><label class="text-xs font-medium" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}>Urutkan</label>`);
            _push2(ssrRenderComponent(_component_SearchSelect, {
              modelValue: sort.value,
              "onUpdate:modelValue": ($event) => sort.value = $event,
              options: sortOptions,
              onChange: handleFilter,
              classes: "w-40"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="grid grid-cols-1 lg:grid-cols-4 gap-10"${_scopeId}><div class="lg:col-span-1 p-6" style="${ssrRenderStyle({ "border": "1px solid var(--color-rule)", "border-radius": "12px", "background-color": "var(--color-paper)", "height": "fit-content" })}"${_scopeId}><h4 class="font-semibold mb-6" style="${ssrRenderStyle({ "color": "var(--color-ink)", "font-size": "15px" })}"${_scopeId}>Filter Pencarian</h4><div class="space-y-6"${_scopeId}><div${_scopeId}><label class="block text-xs font-medium mb-2.5" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}>Kata Kunci</label><input type="text"${ssrRenderAttr("value", search.value)} placeholder="Judul, abstrak..." class="w-full text-sm px-4 py-2.5 rounded-md" style="${ssrRenderStyle({ "border": "1px solid var(--color-rule)", "color": "var(--color-ink)", "background-color": "var(--color-paper-2)" })}"${_scopeId}></div><div${_scopeId}><label class="block text-xs font-medium mb-2.5" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}>Bidang</label>`);
            _push2(ssrRenderComponent(_component_SearchSelect, {
              modelValue: bidang_id.value,
              "onUpdate:modelValue": ($event) => bidang_id.value = $event,
              options: bidangOptions.value,
              placeholder: "Semua Bidang",
              onChange: handleFilter
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><label class="block text-xs font-medium mb-2.5" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}>Jenis Kajian</label>`);
            _push2(ssrRenderComponent(_component_SearchSelect, {
              modelValue: jenis_id.value,
              "onUpdate:modelValue": ($event) => jenis_id.value = $event,
              options: jenisOptions.value,
              placeholder: "Semua Jenis",
              onChange: handleFilter
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><label class="block text-xs font-medium mb-2.5" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}>Tahun Terbit</label>`);
            _push2(ssrRenderComponent(_component_SearchSelect, {
              modelValue: tahun_id.value,
              "onUpdate:modelValue": ($event) => tahun_id.value = $event,
              options: tahunOptions.value,
              placeholder: "Semua Tahun",
              onChange: handleFilter
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex gap-2 mt-6"${_scopeId}><button class="flex-1 py-2.5 text-sm font-medium rounded-md" style="${ssrRenderStyle({ "border": "1px solid var(--color-rule)", "color": "var(--color-ink)" })}"${_scopeId}> Reset </button><button class="flex-1 py-2.5 text-sm font-semibold rounded-md" style="${ssrRenderStyle({ "background-color": "var(--color-accent)", "color": "var(--color-accent-ink)" })}"${_scopeId}> Terapkan </button></div></div><div class="lg:col-span-3 space-y-8"${_scopeId}>`);
            if (__props.kajians.data.length === 0) {
              _push2(`<div class="text-center p-12" style="${ssrRenderStyle({ "border": "1px solid var(--color-rule)", "border-radius": "12px", "color": "var(--color-ink-2)", "background-color": "var(--color-paper)" })}"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                icon: "solar:folder-error-bold",
                class: "w-12 h-12 mx-auto mb-3",
                style: { "color": "var(--color-ink-2)" }
              }, null, _parent2, _scopeId));
              _push2(` Belum ada dokumen kajian yang diterbitkan dengan filter ini. </div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="grid grid-cols-1 md:grid-cols-2 gap-5"${_scopeId}><!--[-->`);
            ssrRenderList(__props.kajians.data, (item) => {
              var _a, _b, _c;
              _push2(`<div class="transition-colors overflow-hidden flex flex-col" style="${ssrRenderStyle({ "border": "1px solid var(--color-rule)", "border-radius": "12px", "background-color": "var(--color-paper)" })}"${_scopeId}><div class="aspect-[4/3]" style="${ssrRenderStyle({ "background-color": "var(--color-paper-2)", "position": "relative", "display": "flex", "align-items": "center", "justify-content": "center", "border-bottom": "1px solid var(--color-rule)" })}"${_scopeId}>`);
              if (getCoverUrl(item)) {
                _push2(`<img${ssrRenderAttr("src", getCoverUrl(item))} alt="Cover Image" class="w-full h-full object-cover"${_scopeId}>`);
              } else {
                _push2(`<div class="text-center p-4" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_Icon, {
                  icon: "solar:document-bold",
                  class: "w-10 h-10 mx-auto mb-1"
                }, null, _parent2, _scopeId));
                _push2(`<span style="${ssrRenderStyle({ "font-size": "12px" })}"${_scopeId}>Tidak ada cover</span></div>`);
              }
              _push2(`<span class="absolute top-3 left-3 px-2.5 py-1 text-xs font-medium rounded-md" style="${ssrRenderStyle({ "background-color": "var(--color-accent)", "color": "var(--color-accent-ink)" })}"${_scopeId}>${ssrInterpolate((_a = item.jenis_kajian) == null ? void 0 : _a.nama)}</span></div><div class="p-5 flex flex-col flex-1"${_scopeId}><div class="flex-1"${_scopeId}><span style="${ssrRenderStyle({ "font-size": "11px", "color": "var(--color-ink-2)" })}"${_scopeId}>Tahun ${ssrInterpolate((_b = item.tahun) == null ? void 0 : _b.tahun)} · ${ssrInterpolate((_c = item.bidang) == null ? void 0 : _c.nama)}</span><h4 class="font-semibold text-sm mt-2 leading-snug line-clamp-2" style="${ssrRenderStyle({ "color": "var(--color-ink)" })}"${_scopeId}>`);
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
              _push2(`</h4><p class="text-xs mt-2 line-clamp-2 leading-relaxed" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}>${ssrInterpolate(item.ringkasan)}</p></div><div class="pt-3.5 mt-auto flex items-center justify-between" style="${ssrRenderStyle({ "border-top": "1px solid var(--color-rule)" })}"${_scopeId}><div class="flex items-center gap-3" style="${ssrRenderStyle({ "font-size": "12px", "color": "var(--color-ink-2)" })}"${_scopeId}><span class="flex items-center gap-1"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                icon: "solar:eye-linear",
                class: "w-4 h-4"
              }, null, _parent2, _scopeId));
              _push2(` ${ssrInterpolate(item.view_count || 0)}</span><span class="flex items-center gap-1"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                icon: "solar:download-linear",
                class: "w-4 h-4"
              }, null, _parent2, _scopeId));
              _push2(` ${ssrInterpolate(item.download_count || 0)}</span></div><div class="flex items-center gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("portal.detail", item.slug),
                class: "px-3 py-1.5 text-xs font-semibold rounded-md",
                style: { "border": "1px solid var(--color-rule)", "color": "var(--color-ink)" }
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
              _push2(`<button class="px-3 py-1.5 text-xs font-semibold rounded-md cursor-pointer" style="${ssrRenderStyle({ "background-color": "var(--color-accent)", "color": "var(--color-accent-ink)" })}"${_scopeId}> Unduh </button></div></div></div></div>`);
            });
            _push2(`<!--]--></div><div class="flex justify-center md:justify-end pt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              links: __props.kajians.links
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "container mx-auto px-4 xl:px-0 pt-8 pb-16" }, [
                createVNode("div", {
                  class: "mb-10 pb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4",
                  style: { "border-bottom": "1px solid var(--color-rule)" }
                }, [
                  createVNode("div", null, [
                    createVNode("h2", {
                      class: "text-3xl font-semibold",
                      style: { "font-family": "var(--font-display)", "color": "var(--color-ink)", "letter-spacing": "-0.02em" }
                    }, "Arsip Kajian & Penelitian"),
                    createVNode("p", {
                      class: "text-sm mt-2",
                      style: { "color": "var(--color-ink-2)" }
                    }, "Browse pustaka publikasi strategis Bapperida Samarinda")
                  ]),
                  createVNode("div", { class: "flex items-center gap-3" }, [
                    createVNode("label", {
                      class: "text-xs font-medium",
                      style: { "color": "var(--color-ink-2)" }
                    }, "Urutkan"),
                    createVNode(_component_SearchSelect, {
                      modelValue: sort.value,
                      "onUpdate:modelValue": ($event) => sort.value = $event,
                      options: sortOptions,
                      onChange: handleFilter,
                      classes: "w-40"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-4 gap-10" }, [
                  createVNode("div", {
                    class: "lg:col-span-1 p-6",
                    style: { "border": "1px solid var(--color-rule)", "border-radius": "12px", "background-color": "var(--color-paper)", "height": "fit-content" }
                  }, [
                    createVNode("h4", {
                      class: "font-semibold mb-6",
                      style: { "color": "var(--color-ink)", "font-size": "15px" }
                    }, "Filter Pencarian"),
                    createVNode("div", { class: "space-y-6" }, [
                      createVNode("div", null, [
                        createVNode("label", {
                          class: "block text-xs font-medium mb-2.5",
                          style: { "color": "var(--color-ink-2)" }
                        }, "Kata Kunci"),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => search.value = $event,
                          placeholder: "Judul, abstrak...",
                          class: "w-full text-sm px-4 py-2.5 rounded-md",
                          style: { "border": "1px solid var(--color-rule)", "color": "var(--color-ink)", "background-color": "var(--color-paper-2)" },
                          onKeyup: withKeys(handleFilter, ["enter"])
                        }, null, 40, ["onUpdate:modelValue"]), [
                          [vModelText, search.value]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", {
                          class: "block text-xs font-medium mb-2.5",
                          style: { "color": "var(--color-ink-2)" }
                        }, "Bidang"),
                        createVNode(_component_SearchSelect, {
                          modelValue: bidang_id.value,
                          "onUpdate:modelValue": ($event) => bidang_id.value = $event,
                          options: bidangOptions.value,
                          placeholder: "Semua Bidang",
                          onChange: handleFilter
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", {
                          class: "block text-xs font-medium mb-2.5",
                          style: { "color": "var(--color-ink-2)" }
                        }, "Jenis Kajian"),
                        createVNode(_component_SearchSelect, {
                          modelValue: jenis_id.value,
                          "onUpdate:modelValue": ($event) => jenis_id.value = $event,
                          options: jenisOptions.value,
                          placeholder: "Semua Jenis",
                          onChange: handleFilter
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", {
                          class: "block text-xs font-medium mb-2.5",
                          style: { "color": "var(--color-ink-2)" }
                        }, "Tahun Terbit"),
                        createVNode(_component_SearchSelect, {
                          modelValue: tahun_id.value,
                          "onUpdate:modelValue": ($event) => tahun_id.value = $event,
                          options: tahunOptions.value,
                          placeholder: "Semua Tahun",
                          onChange: handleFilter
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                      ])
                    ]),
                    createVNode("div", { class: "flex gap-2 mt-6" }, [
                      createVNode("button", {
                        onClick: resetFilter,
                        class: "flex-1 py-2.5 text-sm font-medium rounded-md",
                        style: { "border": "1px solid var(--color-rule)", "color": "var(--color-ink)" },
                        onMouseenter: ($event) => $event.target.style.backgroundColor = "var(--color-paper-2)",
                        onMouseleave: ($event) => $event.target.style.backgroundColor = "transparent"
                      }, " Reset ", 40, ["onMouseenter", "onMouseleave"]),
                      createVNode("button", {
                        onClick: handleFilter,
                        class: "flex-1 py-2.5 text-sm font-semibold rounded-md",
                        style: { "background-color": "var(--color-accent)", "color": "var(--color-accent-ink)" },
                        onMouseenter: ($event) => $event.target.style.backgroundColor = "oklch(39% 0.055 135)",
                        onMouseleave: ($event) => $event.target.style.backgroundColor = "var(--color-accent)"
                      }, " Terapkan ", 40, ["onMouseenter", "onMouseleave"])
                    ])
                  ]),
                  createVNode("div", { class: "lg:col-span-3 space-y-8" }, [
                    __props.kajians.data.length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "text-center p-12",
                      style: { "border": "1px solid var(--color-rule)", "border-radius": "12px", "color": "var(--color-ink-2)", "background-color": "var(--color-paper)" }
                    }, [
                      createVNode(_component_Icon, {
                        icon: "solar:folder-error-bold",
                        class: "w-12 h-12 mx-auto mb-3",
                        style: { "color": "var(--color-ink-2)" }
                      }),
                      createTextVNode(" Belum ada dokumen kajian yang diterbitkan dengan filter ini. ")
                    ])) : createCommentVNode("", true),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-5" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.kajians.data, (item) => {
                        var _a, _b, _c;
                        return openBlock(), createBlock("div", {
                          key: item.id,
                          class: "transition-colors overflow-hidden flex flex-col",
                          style: { "border": "1px solid var(--color-rule)", "border-radius": "12px", "background-color": "var(--color-paper)" },
                          onMouseenter: ($event) => $event.target.style.borderColor = "var(--color-accent)",
                          onMouseleave: ($event) => $event.target.style.borderColor = "var(--color-rule)"
                        }, [
                          createVNode("div", {
                            class: "aspect-[4/3]",
                            style: { "background-color": "var(--color-paper-2)", "position": "relative", "display": "flex", "align-items": "center", "justify-content": "center", "border-bottom": "1px solid var(--color-rule)" }
                          }, [
                            getCoverUrl(item) ? (openBlock(), createBlock("img", {
                              key: 0,
                              src: getCoverUrl(item),
                              alt: "Cover Image",
                              class: "w-full h-full object-cover"
                            }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                              key: 1,
                              class: "text-center p-4",
                              style: { "color": "var(--color-ink-2)" }
                            }, [
                              createVNode(_component_Icon, {
                                icon: "solar:document-bold",
                                class: "w-10 h-10 mx-auto mb-1"
                              }),
                              createVNode("span", { style: { "font-size": "12px" } }, "Tidak ada cover")
                            ])),
                            createVNode("span", {
                              class: "absolute top-3 left-3 px-2.5 py-1 text-xs font-medium rounded-md",
                              style: { "background-color": "var(--color-accent)", "color": "var(--color-accent-ink)" }
                            }, toDisplayString((_a = item.jenis_kajian) == null ? void 0 : _a.nama), 1)
                          ]),
                          createVNode("div", { class: "p-5 flex flex-col flex-1" }, [
                            createVNode("div", { class: "flex-1" }, [
                              createVNode("span", { style: { "font-size": "11px", "color": "var(--color-ink-2)" } }, "Tahun " + toDisplayString((_b = item.tahun) == null ? void 0 : _b.tahun) + " · " + toDisplayString((_c = item.bidang) == null ? void 0 : _c.nama), 1),
                              createVNode("h4", {
                                class: "font-semibold text-sm mt-2 leading-snug line-clamp-2",
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
                                class: "text-xs mt-2 line-clamp-2 leading-relaxed",
                                style: { "color": "var(--color-ink-2)" }
                              }, toDisplayString(item.ringkasan), 1)
                            ]),
                            createVNode("div", {
                              class: "pt-3.5 mt-auto flex items-center justify-between",
                              style: { "border-top": "1px solid var(--color-rule)" }
                            }, [
                              createVNode("div", {
                                class: "flex items-center gap-3",
                                style: { "font-size": "12px", "color": "var(--color-ink-2)" }
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
                              createVNode("div", { class: "flex items-center gap-2" }, [
                                createVNode(unref(Link), {
                                  href: _ctx.route("portal.detail", item.slug),
                                  class: "px-3 py-1.5 text-xs font-semibold rounded-md",
                                  style: { "border": "1px solid var(--color-rule)", "color": "var(--color-ink)" }
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Baca ")
                                  ]),
                                  _: 1
                                }, 8, ["href"]),
                                createVNode("button", {
                                  onClick: ($event) => directDownload(item.slug),
                                  class: "px-3 py-1.5 text-xs font-semibold rounded-md cursor-pointer",
                                  style: { "background-color": "var(--color-accent)", "color": "var(--color-accent-ink)" }
                                }, " Unduh ", 8, ["onClick"])
                              ])
                            ])
                          ])
                        ], 40, ["onMouseenter", "onMouseleave"]);
                      }), 128))
                    ]),
                    createVNode("div", { class: "flex justify-center md:justify-end pt-4" }, [
                      createVNode(_sfc_main$2, {
                        links: __props.kajians.links
                      }, null, 8, ["links"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Frontend/Portal/KajianList.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
