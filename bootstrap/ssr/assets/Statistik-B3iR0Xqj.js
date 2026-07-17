import { computed, resolveComponent, unref, withCtx, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-C8eooNFo.js";
import apexchart from "vue3-apexcharts";
import "flowbite-vue";
import "./ApplicationLogo-CmsQkCHn.js";
import "@iconify/vue";
import "mitt";
const _sfc_main = {
  __name: "Statistik",
  __ssrInlineRender: true,
  props: {
    summary: Object,
    charts: Object
  },
  setup(__props) {
    const props = __props;
    const getLineChartOptions = (categories) => ({
      chart: {
        id: "downloads-trend-lap",
        toolbar: { show: true },
        zoom: { enabled: true },
        foreColor: "#9CA3AF"
      },
      colors: ["#3B82F6"],
      stroke: { curve: "smooth", width: 3 },
      xaxis: { categories, axisBorder: { show: false } },
      grid: { borderColor: "#E5E7EB", strokeDashArray: 4 }
    });
    const getBarChartOptions = (categories) => ({
      chart: {
        id: "bidang-dist-lap",
        toolbar: { show: true },
        foreColor: "#9CA3AF"
      },
      colors: ["#8B5CF6"],
      plotOptions: {
        bar: {
          borderRadius: 6,
          horizontal: true
        }
      },
      xaxis: { categories }
    });
    const getPieChartOptions = (labels) => ({
      chart: {
        id: "jenis-dist-lap",
        foreColor: "#9CA3AF"
      },
      labels,
      colors: ["#10B981", "#F59E0B", "#EF4444", "#3B82F6", "#EC4899"],
      legend: { position: "bottom" }
    });
    const chartTrendData = computed(() => {
      const list = props.charts.downloads_trend || [];
      return [{
        name: "Downloads",
        data: list.map((item) => item.value)
      }];
    });
    const chartTrendCategories = computed(() => {
      return (props.charts.downloads_trend || []).map((item) => item.label);
    });
    const chartBidangData = computed(() => {
      const list = props.charts.per_bidang || [];
      return [{
        name: "Jumlah Kajian",
        data: list.map((item) => item.value)
      }];
    });
    const chartBidangCategories = computed(() => {
      return (props.charts.per_bidang || []).map((item) => item.label);
    });
    const chartJenisSeries = computed(() => {
      return (props.charts.per_jenis || []).map((item) => item.value);
    });
    const chartJenisLabels = computed(() => {
      return (props.charts.per_jenis || []).map((item) => item.label);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = resolveComponent("Icon");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Statistik & Analisis Kajian" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-6"${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700"${_scopeId}><div class="flex items-center gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("laporan.index"),
              class: "p-2.5 bg-gray-50 dark:bg-gray-700 dark:text-gray-300 hover:bg-paper-2 hover:text-blue-600 rounded-sm transition-all"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Icon, {
                    icon: "solar:arrow-left-outline",
                    class: "w-5 h-5"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Icon, {
                      icon: "solar:arrow-left-outline",
                      class: "w-5 h-5"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div${_scopeId}><h3 class="text-xl font-bold text-gray-900 dark:text-white"${_scopeId}>Statistik &amp; Analisis Kajian</h3><p class="text-xs text-gray-500 mt-1"${_scopeId}>Pantau tren pengunggahan, pembagian bidang kajian, dan aktivitas unduhan.</p></div></div></div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"${_scopeId}><div class="bg-paper dark:bg-gray-800 rounded-card p-6 border border-gray-100 dark:border-gray-700 transition-shadow"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><p class="text-xs font-semibold text-gray-400 uppercase tracking-wider"${_scopeId}>Total Kajian</p><h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-1"${_scopeId}>${ssrInterpolate(__props.summary.total_kajian)}</h3></div><div class="p-3 bg-paper-2 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-sm"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:folder-open-bold",
              class: "w-6 h-6"
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div class="bg-paper dark:bg-gray-800 rounded-card p-6 border border-gray-100 dark:border-gray-700 transition-shadow"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><p class="text-xs font-semibold text-gray-400 uppercase tracking-wider"${_scopeId}>Telah Terbit</p><h3 class="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1"${_scopeId}>${ssrInterpolate(__props.summary.total_published)}</h3></div><div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-sm"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:check-square-bold",
              class: "w-6 h-6"
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div class="bg-paper dark:bg-gray-800 rounded-card p-6 border border-gray-100 dark:border-gray-700 transition-shadow"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><p class="text-xs font-semibold text-gray-400 uppercase tracking-wider"${_scopeId}>Total Views</p><h3 class="text-2xl font-bold text-teal-650 mt-1"${_scopeId}>${ssrInterpolate(__props.summary.total_views)}</h3></div><div class="p-3 bg-teal-50 dark:bg-teal-950/30 text-teal-650 rounded-sm"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:eye-bold",
              class: "w-6 h-6"
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div class="bg-paper dark:bg-gray-800 rounded-card p-6 border border-gray-100 dark:border-gray-700 transition-shadow"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><p class="text-xs font-semibold text-gray-400 uppercase tracking-wider"${_scopeId}>Total Downloads</p><h3 class="text-2xl font-bold text-indigo-650 mt-1"${_scopeId}>${ssrInterpolate(__props.summary.total_downloads)}</h3></div><div class="p-3 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-650 rounded-sm"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:download-bold",
              class: "w-6 h-6"
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-8"${_scopeId}><div class="lg:col-span-2 bg-paper dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-card p-6"${_scopeId}><h4 class="font-bold text-gray-800 dark:text-white text-base mb-1"${_scopeId}>Tren Aktivitas Unduhan</h4><p class="text-xs text-gray-400 mb-6"${_scopeId}>Aktivitas download log rekam sistem 6 bulan terakhir</p><div class="h-80"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(apexchart), {
              type: "line",
              height: "100%",
              width: "100%",
              options: getLineChartOptions(chartTrendCategories.value),
              series: chartTrendData.value
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="bg-paper dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-card p-6 flex flex-col justify-between"${_scopeId}><div${_scopeId}><h4 class="font-bold text-gray-800 dark:text-white text-base mb-1"${_scopeId}>Komposisi Jenis Penelitian</h4><p class="text-xs text-gray-400 mb-6"${_scopeId}>Distribusi kajian terbit berdasarkan klasifikasi riset</p></div><div class="h-80 flex items-center justify-center"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(apexchart), {
              type: "donut",
              height: "100%",
              width: "100%",
              options: getPieChartOptions(chartJenisLabels.value),
              series: chartJenisSeries.value
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div class="grid grid-cols-1 gap-8"${_scopeId}><div class="bg-paper dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-card p-6"${_scopeId}><h4 class="font-bold text-gray-800 dark:text-white text-base mb-1"${_scopeId}>Distribusi Bidang / Rumpun OPD</h4><p class="text-xs text-gray-400 mb-6"${_scopeId}>Jumlah berkas kajian terpublikasi per OPD pelaksana</p><div class="h-80"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(apexchart), {
              type: "bar",
              height: "100%",
              width: "100%",
              options: getBarChartOptions(chartBidangCategories.value),
              series: chartBidangData.value
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-6" }, [
                createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700" }, [
                  createVNode("div", { class: "flex items-center gap-3" }, [
                    createVNode(unref(Link), {
                      href: _ctx.route("laporan.index"),
                      class: "p-2.5 bg-gray-50 dark:bg-gray-700 dark:text-gray-300 hover:bg-paper-2 hover:text-blue-600 rounded-sm transition-all"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, {
                          icon: "solar:arrow-left-outline",
                          class: "w-5 h-5"
                        })
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode("div", null, [
                      createVNode("h3", { class: "text-xl font-bold text-gray-900 dark:text-white" }, "Statistik & Analisis Kajian"),
                      createVNode("p", { class: "text-xs text-gray-500 mt-1" }, "Pantau tren pengunggahan, pembagian bidang kajian, dan aktivitas unduhan.")
                    ])
                  ])
                ]),
                createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" }, [
                  createVNode("div", { class: "bg-paper dark:bg-gray-800 rounded-card p-6 border border-gray-100 dark:border-gray-700 transition-shadow" }, [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", null, [
                        createVNode("p", { class: "text-xs font-semibold text-gray-400 uppercase tracking-wider" }, "Total Kajian"),
                        createVNode("h3", { class: "text-2xl font-bold text-gray-900 dark:text-white mt-1" }, toDisplayString(__props.summary.total_kajian), 1)
                      ]),
                      createVNode("div", { class: "p-3 bg-paper-2 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-sm" }, [
                        createVNode(_component_Icon, {
                          icon: "solar:folder-open-bold",
                          class: "w-6 h-6"
                        })
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-paper dark:bg-gray-800 rounded-card p-6 border border-gray-100 dark:border-gray-700 transition-shadow" }, [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", null, [
                        createVNode("p", { class: "text-xs font-semibold text-gray-400 uppercase tracking-wider" }, "Telah Terbit"),
                        createVNode("h3", { class: "text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1" }, toDisplayString(__props.summary.total_published), 1)
                      ]),
                      createVNode("div", { class: "p-3 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-sm" }, [
                        createVNode(_component_Icon, {
                          icon: "solar:check-square-bold",
                          class: "w-6 h-6"
                        })
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-paper dark:bg-gray-800 rounded-card p-6 border border-gray-100 dark:border-gray-700 transition-shadow" }, [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", null, [
                        createVNode("p", { class: "text-xs font-semibold text-gray-400 uppercase tracking-wider" }, "Total Views"),
                        createVNode("h3", { class: "text-2xl font-bold text-teal-650 mt-1" }, toDisplayString(__props.summary.total_views), 1)
                      ]),
                      createVNode("div", { class: "p-3 bg-teal-50 dark:bg-teal-950/30 text-teal-650 rounded-sm" }, [
                        createVNode(_component_Icon, {
                          icon: "solar:eye-bold",
                          class: "w-6 h-6"
                        })
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-paper dark:bg-gray-800 rounded-card p-6 border border-gray-100 dark:border-gray-700 transition-shadow" }, [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", null, [
                        createVNode("p", { class: "text-xs font-semibold text-gray-400 uppercase tracking-wider" }, "Total Downloads"),
                        createVNode("h3", { class: "text-2xl font-bold text-indigo-650 mt-1" }, toDisplayString(__props.summary.total_downloads), 1)
                      ]),
                      createVNode("div", { class: "p-3 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-650 rounded-sm" }, [
                        createVNode(_component_Icon, {
                          icon: "solar:download-bold",
                          class: "w-6 h-6"
                        })
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-3 gap-8" }, [
                  createVNode("div", { class: "lg:col-span-2 bg-paper dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-card p-6" }, [
                    createVNode("h4", { class: "font-bold text-gray-800 dark:text-white text-base mb-1" }, "Tren Aktivitas Unduhan"),
                    createVNode("p", { class: "text-xs text-gray-400 mb-6" }, "Aktivitas download log rekam sistem 6 bulan terakhir"),
                    createVNode("div", { class: "h-80" }, [
                      createVNode(unref(apexchart), {
                        type: "line",
                        height: "100%",
                        width: "100%",
                        options: getLineChartOptions(chartTrendCategories.value),
                        series: chartTrendData.value
                      }, null, 8, ["options", "series"])
                    ])
                  ]),
                  createVNode("div", { class: "bg-paper dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-card p-6 flex flex-col justify-between" }, [
                    createVNode("div", null, [
                      createVNode("h4", { class: "font-bold text-gray-800 dark:text-white text-base mb-1" }, "Komposisi Jenis Penelitian"),
                      createVNode("p", { class: "text-xs text-gray-400 mb-6" }, "Distribusi kajian terbit berdasarkan klasifikasi riset")
                    ]),
                    createVNode("div", { class: "h-80 flex items-center justify-center" }, [
                      createVNode(unref(apexchart), {
                        type: "donut",
                        height: "100%",
                        width: "100%",
                        options: getPieChartOptions(chartJenisLabels.value),
                        series: chartJenisSeries.value
                      }, null, 8, ["options", "series"])
                    ])
                  ])
                ]),
                createVNode("div", { class: "grid grid-cols-1 gap-8" }, [
                  createVNode("div", { class: "bg-paper dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-card p-6" }, [
                    createVNode("h4", { class: "font-bold text-gray-800 dark:text-white text-base mb-1" }, "Distribusi Bidang / Rumpun OPD"),
                    createVNode("p", { class: "text-xs text-gray-400 mb-6" }, "Jumlah berkas kajian terpublikasi per OPD pelaksana"),
                    createVNode("div", { class: "h-80" }, [
                      createVNode(unref(apexchart), {
                        type: "bar",
                        height: "100%",
                        width: "100%",
                        options: getBarChartOptions(chartBidangCategories.value),
                        series: chartBidangData.value
                      }, null, 8, ["options", "series"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Backend/Laporan/Statistik.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
