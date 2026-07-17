import { ref, computed, resolveComponent, unref, withCtx, createVNode, createTextVNode, toDisplayString, withDirectives, withKeys, vModelText, openBlock, createBlock, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList } from "vue/server-renderer";
import { Head, Link, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-CCLRqrRv.js";
import "flowbite-vue";
import "./ApplicationLogo-CmsQkCHn.js";
import "@iconify/vue";
import "mitt";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    data: Array,
    summary: Object,
    filters: Object,
    bidangs: Array,
    jenisKajians: Array,
    tahuns: Array
  },
  setup(__props) {
    const props = __props;
    const search = ref(props.filters.search || "");
    const bidang_id = ref(props.filters.bidang_id || "");
    const jenis_id = ref(props.filters.jenis_id || "");
    const tahun_id = ref(props.filters.tahun_id || "");
    const bidangOptions = computed(() => [{ label: "Semua Bidang", value: "" }, ...props.bidangs.map((b) => ({ label: b.nama, value: b.id }))]);
    const jenisOptions = computed(() => [{ label: "Semua Jenis", value: "" }, ...props.jenisKajians.map((j) => ({ label: j.nama, value: j.id }))]);
    const tahunOptions = computed(() => [{ label: "Semua Tahun", value: "" }, ...props.tahuns.map((t) => ({ label: t.tahun, value: t.id }))]);
    const handleFilter = () => {
      router.get(route("laporan.index"), {
        search: search.value,
        bidang_id: bidang_id.value,
        jenis_id: jenis_id.value,
        tahun_id: tahun_id.value
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
      handleFilter();
    };
    const exportExcel = () => {
      const params = new URLSearchParams({
        search: search.value,
        bidang_id: bidang_id.value,
        jenis_id: jenis_id.value,
        tahun_id: tahun_id.value
      }).toString();
      window.open(`${route("laporan.export.excel")}?${params}`, "_blank");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = resolveComponent("Icon");
      const _component_SearchSelect = resolveComponent("SearchSelect");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Laporan & Rekapitulasi Kajian" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-6"${_scopeId}><div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700"${_scopeId}><div${_scopeId}><h3 class="text-xl font-bold text-gray-900 dark:text-white"${_scopeId}>Laporan &amp; Rekapitulasi Kajian</h3><p class="text-xs text-gray-500 mt-1"${_scopeId}>Cetak rekapitulasi data penelitian terbit dan rekapitulasi file kajian Bapperida.</p></div><div class="flex gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("laporan.statistik"),
              class: "px-4 py-2.5 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-bold rounded-sm text-xs transition-all inline-flex items-center gap-1.5 border border-gray-200 dark:border-gray-600"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Icon, {
                    icon: "solar:chart-square-bold",
                    class: "w-4 h-4"
                  }, null, _parent3, _scopeId2));
                  _push3(` Statistik Kajian `);
                } else {
                  return [
                    createVNode(_component_Icon, {
                      icon: "solar:chart-square-bold",
                      class: "w-4 h-4"
                    }),
                    createTextVNode(" Statistik Kajian ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<button class="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-sm text-xs transition-all inline-flex items-center gap-1.5"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:document-bold",
              class: "w-4 h-4"
            }, null, _parent2, _scopeId));
            _push2(` Export Excel </button></div></div><div class="grid grid-cols-1 md:grid-cols-3 gap-6"${_scopeId}><div class="bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700 flex items-center justify-between"${_scopeId}><div${_scopeId}><span class="text-[10px] text-gray-400 font-bold uppercase tracking-wider block"${_scopeId}>Kajian Terbit</span><h4 class="text-2xl font-semibold text-gray-900 dark:text-white mt-1"${_scopeId}>${ssrInterpolate(__props.summary.total_published || 0)}</h4></div><div class="p-3.5 bg-paper-2 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-card"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:check-square-bold",
              class: "w-6 h-6"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700 flex items-center justify-between"${_scopeId}><div${_scopeId}><span class="text-[10px] text-gray-400 font-bold uppercase tracking-wider block"${_scopeId}>Total Kunjungan</span><h4 class="text-2xl font-semibold text-gray-900 dark:text-white mt-1"${_scopeId}>${ssrInterpolate(__props.summary.total_views || 0)}</h4></div><div class="p-3.5 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-card"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:eye-bold",
              class: "w-6 h-6"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700 flex items-center justify-between"${_scopeId}><div${_scopeId}><span class="text-[10px] text-gray-400 font-bold uppercase tracking-wider block"${_scopeId}>Total Unduhan</span><h4 class="text-2xl font-semibold text-gray-900 dark:text-white mt-1"${_scopeId}>${ssrInterpolate(__props.summary.total_downloads || 0)}</h4></div><div class="p-3.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-card"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:download-bold",
              class: "w-6 h-6"
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div class="bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700 space-y-4"${_scopeId}><div class="grid grid-cols-1 sm:grid-cols-4 gap-4"${_scopeId}><div${_scopeId}><label class="block text-xs font-bold text-gray-450 uppercase tracking-wider mb-2"${_scopeId}>Cari Judul</label><input type="text"${ssrRenderAttr("value", search.value)} placeholder="Kata kunci..." class="w-full text-xs rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5"${_scopeId}></div><div${_scopeId}><label class="block text-xs font-bold text-gray-450 uppercase tracking-wider mb-2"${_scopeId}>Bidang</label>`);
            _push2(ssrRenderComponent(_component_SearchSelect, {
              modelValue: bidang_id.value,
              "onUpdate:modelValue": ($event) => bidang_id.value = $event,
              options: bidangOptions.value,
              onChange: handleFilter
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><label class="block text-xs font-bold text-gray-450 uppercase tracking-wider mb-2"${_scopeId}>Jenis Kajian</label>`);
            _push2(ssrRenderComponent(_component_SearchSelect, {
              modelValue: jenis_id.value,
              "onUpdate:modelValue": ($event) => jenis_id.value = $event,
              options: jenisOptions.value,
              onChange: handleFilter
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><label class="block text-xs font-bold text-gray-450 uppercase tracking-wider mb-2"${_scopeId}>Tahun</label>`);
            _push2(ssrRenderComponent(_component_SearchSelect, {
              modelValue: tahun_id.value,
              "onUpdate:modelValue": ($event) => tahun_id.value = $event,
              options: tahunOptions.value,
              onChange: handleFilter
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex justify-end gap-2 pt-2"${_scopeId}><button class="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-white text-xs font-semibold rounded-sm transition-colors"${_scopeId}> Reset Filter </button><button class="px-4 py-2 bg-accent text-accent-ink text-xs font-semibold rounded-sm transition-colors"${_scopeId}> Terapkan </button></div></div><div class="bg-paper dark:bg-gray-800 rounded-card border border-gray-100 dark:border-gray-700 overflow-hidden"${_scopeId}><div class="overflow-x-auto"${_scopeId}><table class="w-full text-left text-sm"${_scopeId}><thead class="bg-gray-50/70 dark:bg-gray-900/50 text-gray-400 text-xs font-semibold uppercase tracking-wider border-b border-gray-100 dark:border-gray-700"${_scopeId}><tr${_scopeId}><th class="px-6 py-4"${_scopeId}>Judul Kajian</th><th class="px-6 py-4"${_scopeId}>Bidang / Jenis</th><th class="px-6 py-4"${_scopeId}>Tahun</th><th class="px-6 py-4"${_scopeId}>Views / Downloads</th><th class="px-6 py-4 text-right"${_scopeId}>Aksi</th></tr></thead><tbody class="divide-y divide-gray-100 dark:divide-gray-700"${_scopeId}>`);
            if (__props.data.length === 0) {
              _push2(`<tr${_scopeId}><td colspan="5" class="px-6 py-12 text-center text-gray-400"${_scopeId}> Tidak ada data rekapitulasi kajian. </td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(__props.data, (item) => {
              var _a, _b, _c;
              _push2(`<tr class="hover:bg-gray-50/50 dark:hover:bg-gray-800 transition-colors"${_scopeId}><td class="px-6 py-4 max-w-sm truncate font-semibold text-gray-900 dark:text-white"${ssrRenderAttr("title", item.judul)}${_scopeId}>${ssrInterpolate(item.judul)}</td><td class="px-6 py-4"${_scopeId}><div class="text-xs text-gray-600 dark:text-gray-300 font-medium"${_scopeId}>${ssrInterpolate((_a = item.bidang) == null ? void 0 : _a.nama)}</div><div class="text-[10px] text-gray-400 mt-0.5"${_scopeId}>${ssrInterpolate((_b = item.jenis_kajian) == null ? void 0 : _b.nama)}</div></td><td class="px-6 py-4 text-gray-500 font-medium"${_scopeId}>${ssrInterpolate((_c = item.tahun) == null ? void 0 : _c.tahun)}</td><td class="px-6 py-4 text-xs text-gray-500"${_scopeId}><span class="flex items-center gap-3"${_scopeId}><span class="flex items-center gap-1"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                icon: "solar:eye-linear",
                class: "w-3.5 h-3.5 text-gray-400"
              }, null, _parent2, _scopeId));
              _push2(` ${ssrInterpolate(item.view_count)}</span><span class="flex items-center gap-1"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                icon: "solar:download-linear",
                class: "w-3.5 h-3.5 text-gray-400"
              }, null, _parent2, _scopeId));
              _push2(` ${ssrInterpolate(item.download_count)}</span></span></td><td class="px-6 py-4 text-right"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("laporan.cetak-detail", item.uuid),
                target: "_blank",
                class: "px-3 py-1.5 bg-paper-2 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-sm hover:bg-blue-100 transition-colors text-xs font-bold inline-flex items-center gap-1"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_Icon, {
                      icon: "solar:printer-bold",
                      class: "w-3.5 h-3.5"
                    }, null, _parent3, _scopeId2));
                    _push3(` Cetak `);
                  } else {
                    return [
                      createVNode(_component_Icon, {
                        icon: "solar:printer-bold",
                        class: "w-3.5 h-3.5"
                      }),
                      createTextVNode(" Cetak ")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-6" }, [
                createVNode("div", { class: "flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700" }, [
                  createVNode("div", null, [
                    createVNode("h3", { class: "text-xl font-bold text-gray-900 dark:text-white" }, "Laporan & Rekapitulasi Kajian"),
                    createVNode("p", { class: "text-xs text-gray-500 mt-1" }, "Cetak rekapitulasi data penelitian terbit dan rekapitulasi file kajian Bapperida.")
                  ]),
                  createVNode("div", { class: "flex gap-2" }, [
                    createVNode(unref(Link), {
                      href: _ctx.route("laporan.statistik"),
                      class: "px-4 py-2.5 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-bold rounded-sm text-xs transition-all inline-flex items-center gap-1.5 border border-gray-200 dark:border-gray-600"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, {
                          icon: "solar:chart-square-bold",
                          class: "w-4 h-4"
                        }),
                        createTextVNode(" Statistik Kajian ")
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode("button", {
                      onClick: exportExcel,
                      class: "px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-sm text-xs transition-all inline-flex items-center gap-1.5"
                    }, [
                      createVNode(_component_Icon, {
                        icon: "solar:document-bold",
                        class: "w-4 h-4"
                      }),
                      createTextVNode(" Export Excel ")
                    ])
                  ])
                ]),
                createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-6" }, [
                  createVNode("div", { class: "bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700 flex items-center justify-between" }, [
                    createVNode("div", null, [
                      createVNode("span", { class: "text-[10px] text-gray-400 font-bold uppercase tracking-wider block" }, "Kajian Terbit"),
                      createVNode("h4", { class: "text-2xl font-semibold text-gray-900 dark:text-white mt-1" }, toDisplayString(__props.summary.total_published || 0), 1)
                    ]),
                    createVNode("div", { class: "p-3.5 bg-paper-2 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-card" }, [
                      createVNode(_component_Icon, {
                        icon: "solar:check-square-bold",
                        class: "w-6 h-6"
                      })
                    ])
                  ]),
                  createVNode("div", { class: "bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700 flex items-center justify-between" }, [
                    createVNode("div", null, [
                      createVNode("span", { class: "text-[10px] text-gray-400 font-bold uppercase tracking-wider block" }, "Total Kunjungan"),
                      createVNode("h4", { class: "text-2xl font-semibold text-gray-900 dark:text-white mt-1" }, toDisplayString(__props.summary.total_views || 0), 1)
                    ]),
                    createVNode("div", { class: "p-3.5 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-card" }, [
                      createVNode(_component_Icon, {
                        icon: "solar:eye-bold",
                        class: "w-6 h-6"
                      })
                    ])
                  ]),
                  createVNode("div", { class: "bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700 flex items-center justify-between" }, [
                    createVNode("div", null, [
                      createVNode("span", { class: "text-[10px] text-gray-400 font-bold uppercase tracking-wider block" }, "Total Unduhan"),
                      createVNode("h4", { class: "text-2xl font-semibold text-gray-900 dark:text-white mt-1" }, toDisplayString(__props.summary.total_downloads || 0), 1)
                    ]),
                    createVNode("div", { class: "p-3.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-card" }, [
                      createVNode(_component_Icon, {
                        icon: "solar:download-bold",
                        class: "w-6 h-6"
                      })
                    ])
                  ])
                ]),
                createVNode("div", { class: "bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700 space-y-4" }, [
                  createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-4 gap-4" }, [
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-xs font-bold text-gray-450 uppercase tracking-wider mb-2" }, "Cari Judul"),
                      withDirectives(createVNode("input", {
                        type: "text",
                        "onUpdate:modelValue": ($event) => search.value = $event,
                        placeholder: "Kata kunci...",
                        class: "w-full text-xs rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5",
                        onKeyup: withKeys(handleFilter, ["enter"])
                      }, null, 40, ["onUpdate:modelValue"]), [
                        [vModelText, search.value]
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-xs font-bold text-gray-450 uppercase tracking-wider mb-2" }, "Bidang"),
                      createVNode(_component_SearchSelect, {
                        modelValue: bidang_id.value,
                        "onUpdate:modelValue": ($event) => bidang_id.value = $event,
                        options: bidangOptions.value,
                        onChange: handleFilter
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-xs font-bold text-gray-450 uppercase tracking-wider mb-2" }, "Jenis Kajian"),
                      createVNode(_component_SearchSelect, {
                        modelValue: jenis_id.value,
                        "onUpdate:modelValue": ($event) => jenis_id.value = $event,
                        options: jenisOptions.value,
                        onChange: handleFilter
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-xs font-bold text-gray-450 uppercase tracking-wider mb-2" }, "Tahun"),
                      createVNode(_component_SearchSelect, {
                        modelValue: tahun_id.value,
                        "onUpdate:modelValue": ($event) => tahun_id.value = $event,
                        options: tahunOptions.value,
                        onChange: handleFilter
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                    ])
                  ]),
                  createVNode("div", { class: "flex justify-end gap-2 pt-2" }, [
                    createVNode("button", {
                      onClick: resetFilter,
                      class: "px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-white text-xs font-semibold rounded-sm transition-colors"
                    }, " Reset Filter "),
                    createVNode("button", {
                      onClick: handleFilter,
                      class: "px-4 py-2 bg-accent text-accent-ink text-xs font-semibold rounded-sm transition-colors"
                    }, " Terapkan ")
                  ])
                ]),
                createVNode("div", { class: "bg-paper dark:bg-gray-800 rounded-card border border-gray-100 dark:border-gray-700 overflow-hidden" }, [
                  createVNode("div", { class: "overflow-x-auto" }, [
                    createVNode("table", { class: "w-full text-left text-sm" }, [
                      createVNode("thead", { class: "bg-gray-50/70 dark:bg-gray-900/50 text-gray-400 text-xs font-semibold uppercase tracking-wider border-b border-gray-100 dark:border-gray-700" }, [
                        createVNode("tr", null, [
                          createVNode("th", { class: "px-6 py-4" }, "Judul Kajian"),
                          createVNode("th", { class: "px-6 py-4" }, "Bidang / Jenis"),
                          createVNode("th", { class: "px-6 py-4" }, "Tahun"),
                          createVNode("th", { class: "px-6 py-4" }, "Views / Downloads"),
                          createVNode("th", { class: "px-6 py-4 text-right" }, "Aksi")
                        ])
                      ]),
                      createVNode("tbody", { class: "divide-y divide-gray-100 dark:divide-gray-700" }, [
                        __props.data.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                          createVNode("td", {
                            colspan: "5",
                            class: "px-6 py-12 text-center text-gray-400"
                          }, " Tidak ada data rekapitulasi kajian. ")
                        ])) : createCommentVNode("", true),
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.data, (item) => {
                          var _a, _b, _c;
                          return openBlock(), createBlock("tr", {
                            key: item.id,
                            class: "hover:bg-gray-50/50 dark:hover:bg-gray-800 transition-colors"
                          }, [
                            createVNode("td", {
                              class: "px-6 py-4 max-w-sm truncate font-semibold text-gray-900 dark:text-white",
                              title: item.judul
                            }, toDisplayString(item.judul), 9, ["title"]),
                            createVNode("td", { class: "px-6 py-4" }, [
                              createVNode("div", { class: "text-xs text-gray-600 dark:text-gray-300 font-medium" }, toDisplayString((_a = item.bidang) == null ? void 0 : _a.nama), 1),
                              createVNode("div", { class: "text-[10px] text-gray-400 mt-0.5" }, toDisplayString((_b = item.jenis_kajian) == null ? void 0 : _b.nama), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 text-gray-500 font-medium" }, toDisplayString((_c = item.tahun) == null ? void 0 : _c.tahun), 1),
                            createVNode("td", { class: "px-6 py-4 text-xs text-gray-500" }, [
                              createVNode("span", { class: "flex items-center gap-3" }, [
                                createVNode("span", { class: "flex items-center gap-1" }, [
                                  createVNode(_component_Icon, {
                                    icon: "solar:eye-linear",
                                    class: "w-3.5 h-3.5 text-gray-400"
                                  }),
                                  createTextVNode(" " + toDisplayString(item.view_count), 1)
                                ]),
                                createVNode("span", { class: "flex items-center gap-1" }, [
                                  createVNode(_component_Icon, {
                                    icon: "solar:download-linear",
                                    class: "w-3.5 h-3.5 text-gray-400"
                                  }),
                                  createTextVNode(" " + toDisplayString(item.download_count), 1)
                                ])
                              ])
                            ]),
                            createVNode("td", { class: "px-6 py-4 text-right" }, [
                              createVNode(unref(Link), {
                                href: _ctx.route("laporan.cetak-detail", item.uuid),
                                target: "_blank",
                                class: "px-3 py-1.5 bg-paper-2 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-sm hover:bg-blue-100 transition-colors text-xs font-bold inline-flex items-center gap-1"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_Icon, {
                                    icon: "solar:printer-bold",
                                    class: "w-3.5 h-3.5"
                                  }),
                                  createTextVNode(" Cetak ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Backend/Laporan/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
