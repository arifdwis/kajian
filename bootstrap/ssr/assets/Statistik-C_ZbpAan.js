import { ref, computed, resolveComponent, unref, withCtx, createVNode, withDirectives, openBlock, createBlock, Fragment, renderList, toDisplayString, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { Head, Link, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-CCLRqrRv.js";
import Chart from "primevue/chart";
import "flowbite-vue";
import "./ApplicationLogo-CmsQkCHn.js";
import "@iconify/vue";
import "mitt";
const _sfc_main = {
  __name: "Statistik",
  __ssrInlineRender: true,
  props: {
    summary: Object,
    charts: Object,
    bidangs: Array,
    jenisKajians: Array,
    tahuns: Array,
    filters: Object
  },
  setup(__props) {
    const props = __props;
    const bidang_id = ref(props.filters.bidang_id || "");
    const jenis_id = ref(props.filters.jenis_id || "");
    const tahun_id = ref(props.filters.tahun_id || "");
    const handleFilter = () => {
      router.get(route("laporan.statistik"), {
        bidang_id: bidang_id.value,
        jenis_id: jenis_id.value,
        tahun_id: tahun_id.value
      }, {
        preserveState: true,
        preserveScroll: true
      });
    };
    const resetFilter = () => {
      bidang_id.value = "";
      jenis_id.value = "";
      tahun_id.value = "";
      handleFilter();
    };
    const lineChartData = computed(() => ({
      labels: (props.charts.downloads_trend || []).map((item) => item.label),
      datasets: [
        {
          label: "Unduhan",
          data: (props.charts.downloads_trend || []).map((item) => item.value),
          fill: false,
          borderColor: "#3B82F6",
          tension: 0.4,
          pointBackgroundColor: "#3B82F6",
          pointHoverRadius: 6
        }
      ]
    }));
    const lineChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          mode: "index",
          intersect: false
        }
      },
      scales: {
        y: {
          grid: {
            color: "rgba(156, 163, 175, 0.15)",
            drawBorder: false
          },
          ticks: {
            color: "#9CA3AF"
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: "#9CA3AF"
          }
        }
      }
    };
    const doughnutChartData = computed(() => ({
      labels: (props.charts.per_jenis || []).map((item) => item.label),
      datasets: [
        {
          data: (props.charts.per_jenis || []).map((item) => item.value),
          backgroundColor: ["#10B981", "#F59E0B", "#EF4444", "#3B82F6", "#EC4899"],
          hoverBackgroundColor: ["#059669", "#D97706", "#DC2626", "#2563EB", "#DB2777"],
          borderWidth: 0
        }
      ]
    }));
    const doughnutChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: "#9CA3AF",
            boxWidth: 12,
            font: {
              size: 11
            }
          }
        }
      },
      cutout: "65%"
    };
    const barChartData = computed(() => ({
      labels: (props.charts.per_bidang || []).map((item) => item.label),
      datasets: [
        {
          label: "Jumlah Kajian",
          backgroundColor: "#8B5CF6",
          hoverBackgroundColor: "#7C3AED",
          data: (props.charts.per_bidang || []).map((item) => item.value),
          borderRadius: 6
        }
      ]
    }));
    const barChartOptions = {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          grid: {
            color: "rgba(156, 163, 175, 0.15)",
            drawBorder: false
          },
          ticks: {
            color: "#9CA3AF",
            precision: 0
          }
        },
        y: {
          grid: {
            display: false
          },
          ticks: {
            color: "#9CA3AF"
          }
        }
      }
    };
    const annualChartData = computed(() => ({
      labels: (props.charts.per_tahun || []).map((item) => item.label),
      datasets: [
        {
          label: "Jumlah Kajian",
          backgroundColor: "#10B981",
          hoverBackgroundColor: "#059669",
          data: (props.charts.per_tahun || []).map((item) => item.value),
          borderRadius: 6
        }
      ]
    }));
    const annualChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          grid: {
            color: "rgba(156, 163, 175, 0.15)",
            drawBorder: false
          },
          ticks: {
            color: "#9CA3AF",
            precision: 0
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: "#9CA3AF"
          }
        }
      }
    };
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
            _push2(`<div${_scopeId}><h3 class="text-xl font-bold text-gray-900 dark:text-white"${_scopeId}>Statistik &amp; Analisis Kajian</h3><p class="text-xs text-gray-500 mt-1"${_scopeId}>Pantau tren pengunggahan, pembagian bidang kajian, dan aktivitas unduhan secara waktu nyata.</p></div></div></div><div class="bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700"${_scopeId}><div class="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end"${_scopeId}><div class="space-y-2"${_scopeId}><label class="text-xs font-bold text-gray-400 uppercase tracking-wider"${_scopeId}>Filter Bidang</label><select class="w-full text-xs bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-sm text-gray-900 dark:text-white py-2 focus:ring-blue-500 focus:border-blue-500"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(bidang_id.value) ? ssrLooseContain(bidang_id.value, "") : ssrLooseEqual(bidang_id.value, "")) ? " selected" : ""}${_scopeId}>Semua Bidang</option><!--[-->`);
            ssrRenderList(__props.bidangs, (b) => {
              _push2(`<option${ssrRenderAttr("value", b.id)}${ssrIncludeBooleanAttr(Array.isArray(bidang_id.value) ? ssrLooseContain(bidang_id.value, b.id) : ssrLooseEqual(bidang_id.value, b.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(b.nama)}</option>`);
            });
            _push2(`<!--]--></select></div><div class="space-y-2"${_scopeId}><label class="text-xs font-bold text-gray-400 uppercase tracking-wider"${_scopeId}>Filter Jenis Kajian</label><select class="w-full text-xs bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-sm text-gray-900 dark:text-white py-2 focus:ring-blue-500 focus:border-blue-500"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(jenis_id.value) ? ssrLooseContain(jenis_id.value, "") : ssrLooseEqual(jenis_id.value, "")) ? " selected" : ""}${_scopeId}>Semua Jenis</option><!--[-->`);
            ssrRenderList(__props.jenisKajians, (j) => {
              _push2(`<option${ssrRenderAttr("value", j.id)}${ssrIncludeBooleanAttr(Array.isArray(jenis_id.value) ? ssrLooseContain(jenis_id.value, j.id) : ssrLooseEqual(jenis_id.value, j.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(j.nama)}</option>`);
            });
            _push2(`<!--]--></select></div><div class="space-y-2"${_scopeId}><label class="text-xs font-bold text-gray-400 uppercase tracking-wider"${_scopeId}>Filter Tahun</label><select class="w-full text-xs bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-sm text-gray-900 dark:text-white py-2 focus:ring-blue-500 focus:border-blue-500"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(tahun_id.value) ? ssrLooseContain(tahun_id.value, "") : ssrLooseEqual(tahun_id.value, "")) ? " selected" : ""}${_scopeId}>Semua Tahun</option><!--[-->`);
            ssrRenderList(__props.tahuns, (t) => {
              _push2(`<option${ssrRenderAttr("value", t.id)}${ssrIncludeBooleanAttr(Array.isArray(tahun_id.value) ? ssrLooseContain(tahun_id.value, t.id) : ssrLooseEqual(tahun_id.value, t.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(t.tahun)}</option>`);
            });
            _push2(`<!--]--></select></div><div${_scopeId}><button class="w-full text-xs font-bold bg-gray-100 hover:bg-gray-200 dark:bg-gray-750 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 py-2.5 rounded-sm transition-all border border-gray-200 dark:border-gray-600 active:scale-[0.98]"${_scopeId}> Reset Filter </button></div></div></div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"${_scopeId}><div class="bg-paper dark:bg-gray-800 rounded-card p-6 border border-gray-100 dark:border-gray-700 transition-shadow"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><p class="text-xs font-semibold text-gray-400 uppercase tracking-wider"${_scopeId}>Total Kajian</p><h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-1"${_scopeId}>${ssrInterpolate(__props.summary.total_kajian)}</h3></div><div class="p-3 bg-paper-2 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-sm"${_scopeId}>`);
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
            _push2(`</div></div></div></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-8"${_scopeId}><div class="lg:col-span-2 bg-paper dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-card p-6"${_scopeId}><h4 class="font-bold text-gray-800 dark:text-white text-base mb-1"${_scopeId}>Tren Aktivitas Unduhan</h4><p class="text-xs text-gray-400 mb-6"${_scopeId}>Aktivitas download log rekam sistem 6 bulan terakhir</p><div class="h-80 relative"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Chart), {
              type: "line",
              data: lineChartData.value,
              options: lineChartOptions,
              class: "h-full w-full"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="bg-paper dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-card p-6 flex flex-col justify-between"${_scopeId}><div${_scopeId}><h4 class="font-bold text-gray-800 dark:text-white text-base mb-1"${_scopeId}>Komposisi Jenis Penelitian</h4><p class="text-xs text-gray-400 mb-6"${_scopeId}>Distribusi kajian terbit berdasarkan klasifikasi riset</p></div><div class="h-80 flex items-center justify-center relative"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Chart), {
              type: "doughnut",
              data: doughnutChartData.value,
              options: doughnutChartOptions,
              class: "h-full w-full"
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-8"${_scopeId}><div class="bg-paper dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-card p-6"${_scopeId}><h4 class="font-bold text-gray-800 dark:text-white text-base mb-1"${_scopeId}>Distribusi Bidang / Rumpun OPD</h4><p class="text-xs text-gray-400 mb-6"${_scopeId}>Jumlah berkas kajian terpublikasi per bidang</p><div class="h-80 relative"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Chart), {
              type: "bar",
              data: barChartData.value,
              options: barChartOptions,
              class: "h-full w-full"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="bg-paper dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-card p-6"${_scopeId}><h4 class="font-bold text-gray-800 dark:text-white text-base mb-1"${_scopeId}>Tren Publikasi Tahunan</h4><p class="text-xs text-gray-400 mb-6"${_scopeId}>Jumlah berkas kajian terbit per tahun</p><div class="h-80 relative"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Chart), {
              type: "bar",
              data: annualChartData.value,
              options: annualChartOptions,
              class: "h-full w-full"
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
                      createVNode("p", { class: "text-xs text-gray-500 mt-1" }, "Pantau tren pengunggahan, pembagian bidang kajian, dan aktivitas unduhan secara waktu nyata.")
                    ])
                  ])
                ]),
                createVNode("div", { class: "bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700" }, [
                  createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-4 gap-4 items-end" }, [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode("label", { class: "text-xs font-bold text-gray-400 uppercase tracking-wider" }, "Filter Bidang"),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => bidang_id.value = $event,
                        onChange: handleFilter,
                        class: "w-full text-xs bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-sm text-gray-900 dark:text-white py-2 focus:ring-blue-500 focus:border-blue-500"
                      }, [
                        createVNode("option", { value: "" }, "Semua Bidang"),
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.bidangs, (b) => {
                          return openBlock(), createBlock("option", {
                            key: b.id,
                            value: b.id
                          }, toDisplayString(b.nama), 9, ["value"]);
                        }), 128))
                      ], 40, ["onUpdate:modelValue"]), [
                        [vModelSelect, bidang_id.value]
                      ])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode("label", { class: "text-xs font-bold text-gray-400 uppercase tracking-wider" }, "Filter Jenis Kajian"),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => jenis_id.value = $event,
                        onChange: handleFilter,
                        class: "w-full text-xs bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-sm text-gray-900 dark:text-white py-2 focus:ring-blue-500 focus:border-blue-500"
                      }, [
                        createVNode("option", { value: "" }, "Semua Jenis"),
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.jenisKajians, (j) => {
                          return openBlock(), createBlock("option", {
                            key: j.id,
                            value: j.id
                          }, toDisplayString(j.nama), 9, ["value"]);
                        }), 128))
                      ], 40, ["onUpdate:modelValue"]), [
                        [vModelSelect, jenis_id.value]
                      ])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode("label", { class: "text-xs font-bold text-gray-400 uppercase tracking-wider" }, "Filter Tahun"),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => tahun_id.value = $event,
                        onChange: handleFilter,
                        class: "w-full text-xs bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-sm text-gray-900 dark:text-white py-2 focus:ring-blue-500 focus:border-blue-500"
                      }, [
                        createVNode("option", { value: "" }, "Semua Tahun"),
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.tahuns, (t) => {
                          return openBlock(), createBlock("option", {
                            key: t.id,
                            value: t.id
                          }, toDisplayString(t.tahun), 9, ["value"]);
                        }), 128))
                      ], 40, ["onUpdate:modelValue"]), [
                        [vModelSelect, tahun_id.value]
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("button", {
                        onClick: resetFilter,
                        class: "w-full text-xs font-bold bg-gray-100 hover:bg-gray-200 dark:bg-gray-750 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 py-2.5 rounded-sm transition-all border border-gray-200 dark:border-gray-600 active:scale-[0.98]"
                      }, " Reset Filter ")
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
                    createVNode("div", { class: "h-80 relative" }, [
                      createVNode(unref(Chart), {
                        type: "line",
                        data: lineChartData.value,
                        options: lineChartOptions,
                        class: "h-full w-full"
                      }, null, 8, ["data"])
                    ])
                  ]),
                  createVNode("div", { class: "bg-paper dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-card p-6 flex flex-col justify-between" }, [
                    createVNode("div", null, [
                      createVNode("h4", { class: "font-bold text-gray-800 dark:text-white text-base mb-1" }, "Komposisi Jenis Penelitian"),
                      createVNode("p", { class: "text-xs text-gray-400 mb-6" }, "Distribusi kajian terbit berdasarkan klasifikasi riset")
                    ]),
                    createVNode("div", { class: "h-80 flex items-center justify-center relative" }, [
                      createVNode(unref(Chart), {
                        type: "doughnut",
                        data: doughnutChartData.value,
                        options: doughnutChartOptions,
                        class: "h-full w-full"
                      }, null, 8, ["data"])
                    ])
                  ])
                ]),
                createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-8" }, [
                  createVNode("div", { class: "bg-paper dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-card p-6" }, [
                    createVNode("h4", { class: "font-bold text-gray-800 dark:text-white text-base mb-1" }, "Distribusi Bidang / Rumpun OPD"),
                    createVNode("p", { class: "text-xs text-gray-400 mb-6" }, "Jumlah berkas kajian terpublikasi per bidang"),
                    createVNode("div", { class: "h-80 relative" }, [
                      createVNode(unref(Chart), {
                        type: "bar",
                        data: barChartData.value,
                        options: barChartOptions,
                        class: "h-full w-full"
                      }, null, 8, ["data"])
                    ])
                  ]),
                  createVNode("div", { class: "bg-paper dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-card p-6" }, [
                    createVNode("h4", { class: "font-bold text-gray-800 dark:text-white text-base mb-1" }, "Tren Publikasi Tahunan"),
                    createVNode("p", { class: "text-xs text-gray-400 mb-6" }, "Jumlah berkas kajian terbit per tahun"),
                    createVNode("div", { class: "h-80 relative" }, [
                      createVNode(unref(Chart), {
                        type: "bar",
                        data: annualChartData.value,
                        options: annualChartOptions,
                        class: "h-full w-full"
                      }, null, 8, ["data"])
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
