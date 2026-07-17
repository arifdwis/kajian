import { computed, resolveComponent, unref, withCtx, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { usePage, Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-C8eooNFo.js";
import apexchart from "vue3-apexcharts";
import "flowbite-vue";
import "./ApplicationLogo-CmsQkCHn.js";
import "@iconify/vue";
import "mitt";
const _sfc_main = {
  __name: "DashboardOperator",
  __ssrInlineRender: true,
  props: {
    summary: Object,
    charts: Object,
    popularKajians: Array,
    recentKajians: Array
  },
  setup(__props) {
    const props = __props;
    const page = usePage();
    const user = computed(() => page.props.auth.user);
    const getLineChartOptions = (categories) => ({
      chart: {
        id: "downloads-trend-op",
        toolbar: { show: false },
        zoom: { enabled: false },
        foreColor: "#9CA3AF"
      },
      colors: ["#8B5CF6"],
      stroke: { curve: "smooth", width: 3 },
      xaxis: { categories, axisBorder: { show: false } },
      grid: { borderColor: "#E5E7EB", strokeDashArray: 4 },
      tooltip: {
        theme: "light",
        style: { fontSize: "12px" },
        y: { formatter: (val) => val + " unduhan" }
      },
      markers: { size: 5, strokeWidth: 0 }
    });
    const getPieChartOptions = (labels) => ({
      chart: {
        id: "jenis-dist-op",
        foreColor: "#9CA3AF"
      },
      labels,
      colors: ["#10B981", "#F59E0B", "#EF4444", "#3B82F6", "#EC4899"],
      legend: { position: "bottom" },
      tooltip: {
        theme: "light",
        style: { fontSize: "12px" },
        y: { formatter: (val) => val + " kajian" }
      },
      dataLabels: {
        enabled: true,
        style: { fontSize: "11px", fontWeight: 600 }
      }
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
    const chartJenisSeries = computed(() => {
      return (props.charts.per_jenis || []).map((item) => item.value);
    });
    const chartJenisLabels = computed(() => {
      return (props.charts.per_jenis || []).map((item) => item.label);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = resolveComponent("Icon");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Dashboard Operator" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-8"${_scopeId}><div class="relative overflow-hidden rounded-card p-8" style="${ssrRenderStyle({ "background": "linear-gradient(135deg, #6B46C1 0%, #4C51BF 100%)" })}"${_scopeId}><div class="absolute -right-10 -top-10 w-40 h-40 rounded-full blur-2xl" style="${ssrRenderStyle({ "background": "rgba(255,255,255,0.08)" })}"${_scopeId}></div><div class="absolute right-20 bottom-0 w-32 h-32 rounded-full blur-xl" style="${ssrRenderStyle({ "background": "rgba(255,255,255,0.06)" })}"${_scopeId}></div><div class="relative z-10 max-w-xl"${_scopeId}><span class="font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-full" style="${ssrRenderStyle({ "background": "rgba(255,255,255,0.15)", "color": "#fff", "border": "1px solid rgba(255,255,255,0.25)" })}"${_scopeId}> Operator Bidang </span><h2 class="text-2xl font-bold mt-4 text-white"${_scopeId}>Selamat Datang, ${ssrInterpolate(user.value.name)}</h2><p class="text-sm mt-2 leading-relaxed" style="${ssrRenderStyle({ "color": "rgba(255,255,255,0.85)" })}"${_scopeId}> Kelola draf, usulan kajian baru, lampiran, dan publikasi penelitian khusus untuk Bidang Anda. </p></div></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"${_scopeId}><div class="bg-paper dark:bg-gray-800 rounded-card p-6 border border-gray-100 dark:border-gray-700 transition-shadow"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><p class="text-xs font-semibold text-gray-400 uppercase tracking-wider"${_scopeId}>Total Kajian Bidang</p><h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-1"${_scopeId}>${ssrInterpolate(__props.summary.total_kajian)}</h3></div><div class="p-3 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-sm"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:folder-open-bold",
              class: "w-6 h-6"
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div class="bg-paper dark:bg-gray-800 rounded-card p-6 border border-gray-100 dark:border-gray-700 transition-shadow"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><p class="text-xs font-semibold text-gray-400 uppercase tracking-wider"${_scopeId}>Telah Terbit</p><h3 class="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1"${_scopeId}>${ssrInterpolate(__props.summary.total_published)}</h3></div><div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-sm"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:check-square-bold",
              class: "w-6 h-6"
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div class="bg-paper dark:bg-gray-800 rounded-card p-6 border border-gray-100 dark:border-gray-700 transition-shadow"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><p class="text-xs font-semibold text-gray-400 uppercase tracking-wider"${_scopeId}>Draf internal</p><h3 class="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-1"${_scopeId}>${ssrInterpolate(__props.summary.total_draft)}</h3></div><div class="p-3 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 rounded-sm"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:notes-bold",
              class: "w-6 h-6"
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div class="bg-paper dark:bg-gray-800 rounded-card p-6 border border-gray-100 dark:border-gray-700 transition-shadow"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><p class="text-xs font-semibold text-gray-400 uppercase tracking-wider"${_scopeId}>Menunggu Review</p><h3 class="text-2xl font-bold text-amber-500 dark:text-amber-400 mt-1"${_scopeId}>${ssrInterpolate(__props.summary.total_review)}</h3></div><div class="p-3 bg-amber-50 dark:bg-amber-950/30 text-amber-500 dark:text-amber-400 rounded-sm"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:clock-circle-bold",
              class: "w-6 h-6"
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-8"${_scopeId}><div class="lg:col-span-2 bg-paper dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-card p-6"${_scopeId}><h4 class="font-bold text-gray-800 dark:text-white text-base mb-1"${_scopeId}>Unduhan Kajian Bidang</h4><p class="text-xs text-gray-400 mb-6"${_scopeId}>Tren download 6 bulan terakhir</p><div class="h-72"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(apexchart), {
              type: "line",
              height: "100%",
              width: "100%",
              options: getLineChartOptions(chartTrendCategories.value),
              series: chartTrendData.value
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="bg-paper dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-card p-6 flex flex-col justify-between"${_scopeId}><div${_scopeId}><h4 class="font-bold text-gray-800 dark:text-white text-base mb-1"${_scopeId}>Jenis Riset Bidang</h4><p class="text-xs text-gray-400 mb-6"${_scopeId}>Distribusi per kategori kajian</p></div><div class="h-72 flex items-center justify-center"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(apexchart), {
              type: "donut",
              height: "100%",
              width: "100%",
              options: getPieChartOptions(chartJenisLabels.value),
              series: chartJenisSeries.value
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-8"${_scopeId}><div class="lg:col-span-2 bg-paper dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-card p-6 flex flex-col justify-between"${_scopeId}><div${_scopeId}><h4 class="font-bold text-gray-800 dark:text-white text-base mb-1"${_scopeId}>Kajian Bidang Terpopuler</h4><p class="text-xs text-gray-400 mb-6"${_scopeId}>Paling banyak dicari &amp; didownload oleh pemohon</p></div><div class="space-y-4"${_scopeId}><!--[-->`);
            ssrRenderList(__props.popularKajians, (item) => {
              var _a, _b;
              _push2(`<div class="flex items-start gap-3 border-b border-gray-50 dark:border-gray-700 pb-3 last:border-0 last:pb-0"${_scopeId}><div class="p-2 bg-purple-50 dark:bg-purple-900/20 text-purple-600 rounded-sm shrink-0"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                icon: "solar:file-text-bold",
                class: "w-5 h-5"
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="min-w-0 flex-1"${_scopeId}><h5 class="text-xs font-bold text-gray-800 dark:text-gray-200 line-clamp-1 hover:underline"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("kajian.show", item.uuid)
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
              _push2(`</h5><p class="text-[10px] text-gray-400 mt-0.5"${_scopeId}>${ssrInterpolate((_a = item.tahun) == null ? void 0 : _a.tahun)} • ${ssrInterpolate((_b = item.jenis_kajian) == null ? void 0 : _b.nama)}</p></div><span class="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center shrink-0"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                icon: "solar:download-bold",
                class: "w-3.5 h-3.5 mr-1"
              }, null, _parent2, _scopeId));
              _push2(` ${ssrInterpolate(item.download_count)}</span></div>`);
            });
            _push2(`<!--]--></div></div><div class="bg-paper dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-card p-6 flex flex-col justify-between"${_scopeId}><div${_scopeId}><h4 class="font-bold text-gray-800 dark:text-white text-base mb-1"${_scopeId}>Menu Cepat</h4><p class="text-xs text-gray-400 mb-6"${_scopeId}>Aksi cepat pengoperasian kajian</p></div><div class="space-y-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("kajian.create"),
              class: "w-full flex items-center justify-between p-4 text-white rounded-card transition-all font-semibold text-sm"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span${_scopeId2}>Buat Kajian Baru</span>`);
                  _push3(ssrRenderComponent(_component_Icon, {
                    icon: "solar:add-circle-bold",
                    class: "w-5 h-5"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("span", null, "Buat Kajian Baru"),
                    createVNode(_component_Icon, {
                      icon: "solar:add-circle-bold",
                      class: "w-5 h-5"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("kajian.index", { status: "draft" }),
              class: "w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-white rounded-card transition-all font-semibold text-sm"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span${_scopeId2}>Lihat Draf</span><span class="bg-gray-200 dark:bg-gray-800 text-xs px-2 py-0.5 rounded-full"${_scopeId2}>${ssrInterpolate(__props.summary.total_draft)}</span>`);
                } else {
                  return [
                    createVNode("span", null, "Lihat Draf"),
                    createVNode("span", { class: "bg-gray-200 dark:bg-gray-800 text-xs px-2 py-0.5 rounded-full" }, toDisplayString(__props.summary.total_draft), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div><div class="bg-paper dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-card overflow-hidden"${_scopeId}><div class="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50"${_scopeId}><div${_scopeId}><h4 class="font-bold text-gray-800 dark:text-white text-base"${_scopeId}>Unggahan Terbaru Bidang</h4><p class="text-xs text-gray-400 mt-0.5"${_scopeId}>Daftar kajian yang baru dimasukkan oleh Bidang Anda</p></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("kajian.index"),
              class: "text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Lihat Semua `);
                } else {
                  return [
                    createTextVNode(" Lihat Semua ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="overflow-x-auto"${_scopeId}><table class="w-full text-left text-sm"${_scopeId}><thead class="bg-gray-50/70 dark:bg-gray-900/50 text-gray-400 text-xs font-semibold uppercase tracking-wider"${_scopeId}><tr${_scopeId}><th class="px-6 py-4"${_scopeId}>Judul Kajian</th><th class="px-6 py-4"${_scopeId}>Tahun</th><th class="px-6 py-4"${_scopeId}>Status</th><th class="px-6 py-4 text-right"${_scopeId}>Aksi</th></tr></thead><tbody class="divide-y divide-gray-100 dark:divide-gray-700"${_scopeId}><!--[-->`);
            ssrRenderList(__props.recentKajians, (item) => {
              var _a;
              _push2(`<tr class="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors"${_scopeId}><td class="px-6 py-4 font-semibold text-gray-900 dark:text-white max-w-sm truncate"${_scopeId}>${ssrInterpolate(item.judul)}</td><td class="px-6 py-4 text-gray-500"${_scopeId}>${ssrInterpolate((_a = item.tahun) == null ? void 0 : _a.tahun)}</td><td class="px-6 py-4"${_scopeId}><span class="${ssrRenderClass([{
                "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800": item.status === "published",
                "bg-paper-2 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800": item.status === "draft",
                "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800": item.status === "review",
                "bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-950/30 dark:text-gray-400 dark:border-gray-800": item.status === "archived"
              }, "px-2.5 py-1 rounded-full text-xs font-bold border"])}"${_scopeId}>${ssrInterpolate(item.status)}</span></td><td class="px-6 py-4 text-right"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("kajian.show", item.uuid),
                class: "px-3 py-1.5 bg-gray-100 hover:bg-paper-2 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-blue-600 rounded-sm transition-all inline-flex items-center text-xs font-bold"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Detail `);
                  } else {
                    return [
                      createTextVNode(" Detail ")
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
              createVNode("div", { class: "space-y-8" }, [
                createVNode("div", {
                  class: "relative overflow-hidden rounded-card p-8",
                  style: { "background": "linear-gradient(135deg, #6B46C1 0%, #4C51BF 100%)" }
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
                    }, " Operator Bidang "),
                    createVNode("h2", { class: "text-2xl font-bold mt-4 text-white" }, "Selamat Datang, " + toDisplayString(user.value.name), 1),
                    createVNode("p", {
                      class: "text-sm mt-2 leading-relaxed",
                      style: { "color": "rgba(255,255,255,0.85)" }
                    }, " Kelola draf, usulan kajian baru, lampiran, dan publikasi penelitian khusus untuk Bidang Anda. ")
                  ])
                ]),
                createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" }, [
                  createVNode("div", { class: "bg-paper dark:bg-gray-800 rounded-card p-6 border border-gray-100 dark:border-gray-700 transition-shadow" }, [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", null, [
                        createVNode("p", { class: "text-xs font-semibold text-gray-400 uppercase tracking-wider" }, "Total Kajian Bidang"),
                        createVNode("h3", { class: "text-2xl font-bold text-gray-900 dark:text-white mt-1" }, toDisplayString(__props.summary.total_kajian), 1)
                      ]),
                      createVNode("div", { class: "p-3 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-sm" }, [
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
                        createVNode("p", { class: "text-xs font-semibold text-gray-400 uppercase tracking-wider" }, "Draf internal"),
                        createVNode("h3", { class: "text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-1" }, toDisplayString(__props.summary.total_draft), 1)
                      ]),
                      createVNode("div", { class: "p-3 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 rounded-sm" }, [
                        createVNode(_component_Icon, {
                          icon: "solar:notes-bold",
                          class: "w-6 h-6"
                        })
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-paper dark:bg-gray-800 rounded-card p-6 border border-gray-100 dark:border-gray-700 transition-shadow" }, [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", null, [
                        createVNode("p", { class: "text-xs font-semibold text-gray-400 uppercase tracking-wider" }, "Menunggu Review"),
                        createVNode("h3", { class: "text-2xl font-bold text-amber-500 dark:text-amber-400 mt-1" }, toDisplayString(__props.summary.total_review), 1)
                      ]),
                      createVNode("div", { class: "p-3 bg-amber-50 dark:bg-amber-950/30 text-amber-500 dark:text-amber-400 rounded-sm" }, [
                        createVNode(_component_Icon, {
                          icon: "solar:clock-circle-bold",
                          class: "w-6 h-6"
                        })
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-3 gap-8" }, [
                  createVNode("div", { class: "lg:col-span-2 bg-paper dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-card p-6" }, [
                    createVNode("h4", { class: "font-bold text-gray-800 dark:text-white text-base mb-1" }, "Unduhan Kajian Bidang"),
                    createVNode("p", { class: "text-xs text-gray-400 mb-6" }, "Tren download 6 bulan terakhir"),
                    createVNode("div", { class: "h-72" }, [
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
                      createVNode("h4", { class: "font-bold text-gray-800 dark:text-white text-base mb-1" }, "Jenis Riset Bidang"),
                      createVNode("p", { class: "text-xs text-gray-400 mb-6" }, "Distribusi per kategori kajian")
                    ]),
                    createVNode("div", { class: "h-72 flex items-center justify-center" }, [
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
                createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-3 gap-8" }, [
                  createVNode("div", { class: "lg:col-span-2 bg-paper dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-card p-6 flex flex-col justify-between" }, [
                    createVNode("div", null, [
                      createVNode("h4", { class: "font-bold text-gray-800 dark:text-white text-base mb-1" }, "Kajian Bidang Terpopuler"),
                      createVNode("p", { class: "text-xs text-gray-400 mb-6" }, "Paling banyak dicari & didownload oleh pemohon")
                    ]),
                    createVNode("div", { class: "space-y-4" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.popularKajians, (item) => {
                        var _a, _b;
                        return openBlock(), createBlock("div", {
                          key: item.id,
                          class: "flex items-start gap-3 border-b border-gray-50 dark:border-gray-700 pb-3 last:border-0 last:pb-0"
                        }, [
                          createVNode("div", { class: "p-2 bg-purple-50 dark:bg-purple-900/20 text-purple-600 rounded-sm shrink-0" }, [
                            createVNode(_component_Icon, {
                              icon: "solar:file-text-bold",
                              class: "w-5 h-5"
                            })
                          ]),
                          createVNode("div", { class: "min-w-0 flex-1" }, [
                            createVNode("h5", { class: "text-xs font-bold text-gray-800 dark:text-gray-200 line-clamp-1 hover:underline" }, [
                              createVNode(unref(Link), {
                                href: _ctx.route("kajian.show", item.uuid)
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item.judul), 1)
                                ]),
                                _: 2
                              }, 1032, ["href"])
                            ]),
                            createVNode("p", { class: "text-[10px] text-gray-400 mt-0.5" }, toDisplayString((_a = item.tahun) == null ? void 0 : _a.tahun) + " • " + toDisplayString((_b = item.jenis_kajian) == null ? void 0 : _b.nama), 1)
                          ]),
                          createVNode("span", { class: "text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center shrink-0" }, [
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
                  createVNode("div", { class: "bg-paper dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-card p-6 flex flex-col justify-between" }, [
                    createVNode("div", null, [
                      createVNode("h4", { class: "font-bold text-gray-800 dark:text-white text-base mb-1" }, "Menu Cepat"),
                      createVNode("p", { class: "text-xs text-gray-400 mb-6" }, "Aksi cepat pengoperasian kajian")
                    ]),
                    createVNode("div", { class: "space-y-3" }, [
                      createVNode(unref(Link), {
                        href: _ctx.route("kajian.create"),
                        class: "w-full flex items-center justify-between p-4 text-white rounded-card transition-all font-semibold text-sm"
                      }, {
                        default: withCtx(() => [
                          createVNode("span", null, "Buat Kajian Baru"),
                          createVNode(_component_Icon, {
                            icon: "solar:add-circle-bold",
                            class: "w-5 h-5"
                          })
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createVNode(unref(Link), {
                        href: _ctx.route("kajian.index", { status: "draft" }),
                        class: "w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-white rounded-card transition-all font-semibold text-sm"
                      }, {
                        default: withCtx(() => [
                          createVNode("span", null, "Lihat Draf"),
                          createVNode("span", { class: "bg-gray-200 dark:bg-gray-800 text-xs px-2 py-0.5 rounded-full" }, toDisplayString(__props.summary.total_draft), 1)
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ])
                  ])
                ]),
                createVNode("div", { class: "bg-paper dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-card overflow-hidden" }, [
                  createVNode("div", { class: "p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50" }, [
                    createVNode("div", null, [
                      createVNode("h4", { class: "font-bold text-gray-800 dark:text-white text-base" }, "Unggahan Terbaru Bidang"),
                      createVNode("p", { class: "text-xs text-gray-400 mt-0.5" }, "Daftar kajian yang baru dimasukkan oleh Bidang Anda")
                    ]),
                    createVNode(unref(Link), {
                      href: _ctx.route("kajian.index"),
                      class: "text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Lihat Semua ")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ]),
                  createVNode("div", { class: "overflow-x-auto" }, [
                    createVNode("table", { class: "w-full text-left text-sm" }, [
                      createVNode("thead", { class: "bg-gray-50/70 dark:bg-gray-900/50 text-gray-400 text-xs font-semibold uppercase tracking-wider" }, [
                        createVNode("tr", null, [
                          createVNode("th", { class: "px-6 py-4" }, "Judul Kajian"),
                          createVNode("th", { class: "px-6 py-4" }, "Tahun"),
                          createVNode("th", { class: "px-6 py-4" }, "Status"),
                          createVNode("th", { class: "px-6 py-4 text-right" }, "Aksi")
                        ])
                      ]),
                      createVNode("tbody", { class: "divide-y divide-gray-100 dark:divide-gray-700" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.recentKajians, (item) => {
                          var _a;
                          return openBlock(), createBlock("tr", {
                            key: item.id,
                            class: "hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors"
                          }, [
                            createVNode("td", { class: "px-6 py-4 font-semibold text-gray-900 dark:text-white max-w-sm truncate" }, toDisplayString(item.judul), 1),
                            createVNode("td", { class: "px-6 py-4 text-gray-500" }, toDisplayString((_a = item.tahun) == null ? void 0 : _a.tahun), 1),
                            createVNode("td", { class: "px-6 py-4" }, [
                              createVNode("span", {
                                class: ["px-2.5 py-1 rounded-full text-xs font-bold border", {
                                  "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800": item.status === "published",
                                  "bg-paper-2 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800": item.status === "draft",
                                  "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800": item.status === "review",
                                  "bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-950/30 dark:text-gray-400 dark:border-gray-800": item.status === "archived"
                                }]
                              }, toDisplayString(item.status), 3)
                            ]),
                            createVNode("td", { class: "px-6 py-4 text-right" }, [
                              createVNode(unref(Link), {
                                href: _ctx.route("kajian.show", item.uuid),
                                class: "px-3 py-1.5 bg-gray-100 hover:bg-paper-2 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-blue-600 rounded-sm transition-all inline-flex items-center text-xs font-bold"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Detail ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Backend/DashboardOperator.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
