import { ref, computed, resolveComponent, unref, withCtx, createVNode, toDisplayString, withDirectives, openBlock, createBlock, Fragment, renderList, vModelSelect, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
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
      }, { preserveState: true, preserveScroll: true });
    };
    const resetFilter = () => {
      bidang_id.value = "";
      jenis_id.value = "";
      tahun_id.value = "";
      handleFilter();
    };
    const avgViewsPerKajian = computed(() => {
      if (!props.summary.total_published) return 0;
      return Math.round(props.summary.total_views / props.summary.total_published);
    });
    const avgDownloadsPerKajian = computed(() => {
      if (!props.summary.total_published) return 0;
      return Math.round(props.summary.total_downloads / props.summary.total_published);
    });
    const conversionRate = computed(() => {
      if (!props.summary.total_views) return 0;
      return (props.summary.total_downloads / props.summary.total_views * 100).toFixed(1);
    });
    computed(() => ({
      labels: (props.charts.downloads_trend || []).map((item) => item.label),
      datasets: [{
        label: "Unduhan",
        data: (props.charts.downloads_trend || []).map((item) => item.value),
        fill: false,
        borderColor: "#3B82F6",
        tension: 0.4,
        pointBackgroundColor: "#3B82F6",
        pointHoverRadius: 6
      }]
    }));
    computed(() => ({
      labels: (props.charts.views_trend || []).map((item) => item.label),
      datasets: [{
        label: "Kunjungan",
        data: (props.charts.views_trend || []).map((item) => item.value),
        fill: false,
        borderColor: "#10B981",
        tension: 0.4,
        pointBackgroundColor: "#10B981",
        pointHoverRadius: 6
      }]
    }));
    const comboChartData = computed(() => ({
      labels: (() => {
        const dl = (props.charts.downloads_trend || []).map((i) => i.label);
        const vw = (props.charts.views_trend || []).map((i) => i.label);
        return [.../* @__PURE__ */ new Set([...dl, ...vw])].sort();
      })(),
      datasets: [
        {
          label: "Kunjungan",
          type: "line",
          data: (() => {
            var _a;
            const labels = ((_a = comboChartData.value) == null ? void 0 : _a.labels) || [];
            const map = {};
            (props.charts.views_trend || []).forEach((i) => map[i.label] = i.value);
            return labels.map((l) => map[l] || 0);
          })(),
          borderColor: "#10B981",
          backgroundColor: "rgba(16,185,129,0.1)",
          tension: 0.4,
          fill: true,
          yAxisID: "y1",
          pointRadius: 3
        },
        {
          label: "Unduhan",
          type: "bar",
          data: (() => {
            var _a;
            const labels = ((_a = comboChartData.value) == null ? void 0 : _a.labels) || [];
            const map = {};
            (props.charts.downloads_trend || []).forEach((i) => map[i.label] = i.value);
            return labels.map((l) => map[l] || 0);
          })(),
          backgroundColor: "rgba(59,130,246,0.7)",
          borderRadius: 4,
          yAxisID: "y"
        }
      ]
    }));
    const comboChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: "top", labels: { color: "#9CA3AF", boxWidth: 12, font: { size: 11 } } } },
      scales: {
        y: { position: "left", grid: { color: "rgba(156,163,175,0.15)", drawBorder: false }, ticks: { color: "#3B82F6", precision: 0 }, title: { display: true, text: "Unduhan", color: "#3B82F6" } },
        y1: { position: "right", grid: { drawOnChartArea: false }, ticks: { color: "#10B981", precision: 0 }, title: { display: true, text: "Kunjungan", color: "#10B981" } },
        x: { grid: { display: false }, ticks: { color: "#9CA3AF" } }
      }
    };
    const doughnutData = computed(() => ({
      labels: (props.charts.per_jenis || []).map((i) => i.label),
      datasets: [{ data: (props.charts.per_jenis || []).map((i) => i.value), backgroundColor: ["#10B981", "#F59E0B", "#EF4444", "#3B82F6", "#EC4899", "#8B5CF6"], borderWidth: 0 }]
    }));
    const doughnutOpts = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom", labels: { color: "#9CA3AF", boxWidth: 12, font: { size: 11 } } } }, cutout: "65%" };
    const statusData = computed(() => ({
      labels: (props.charts.status_distribution || []).map((i) => i.label),
      datasets: [{ data: (props.charts.status_distribution || []).map((i) => i.value), backgroundColor: ["#10B981", "#9CA3AF", "#F59E0B", "#6B7280"], borderWidth: 0 }]
    }));
    const statusOpts = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom", labels: { color: "#9CA3AF", boxWidth: 12, font: { size: 11 } } } }, cutout: "55%" };
    const barData = computed(() => ({
      labels: (props.charts.per_bidang || []).map((i) => i.label),
      datasets: [{ label: "Jumlah", backgroundColor: "#8B5CF6", data: (props.charts.per_bidang || []).map((i) => i.value), borderRadius: 6 }]
    }));
    const barOpts = {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: "rgba(156,163,175,0.15)", drawBorder: false }, ticks: { color: "#9CA3AF", precision: 0 } },
        y: { grid: { display: false }, ticks: { color: "#9CA3AF", font: { size: 11 } } }
      }
    };
    const annualData = computed(() => ({
      labels: (props.charts.per_tahun || []).map((i) => i.label),
      datasets: [{ label: "Jumlah", backgroundColor: "#10B981", data: (props.charts.per_tahun || []).map((i) => i.value), borderRadius: 6 }]
    }));
    const annualOpts = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { grid: { color: "rgba(156,163,175,0.15)", drawBorder: false }, ticks: { color: "#9CA3AF", precision: 0 } },
        x: { grid: { display: false }, ticks: { color: "#9CA3AF" } }
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = resolveComponent("Icon");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Statistik & Analisis Kajian" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f;
          if (_push2) {
            _push2(`<div class="space-y-6"${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 rounded-card" style="${ssrRenderStyle({ backgroundColor: "var(--color-paper)", border: "1px solid var(--color-rule)" })}"${_scopeId}><div class="flex items-center gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("laporan.index"),
              class: "p-2.5 rounded-sm transition-all",
              style: { backgroundColor: "var(--color-paper-2)", color: "var(--color-ink-2)" }
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
            _push2(`<div${_scopeId}><h3 class="text-xl font-bold" style="${ssrRenderStyle({ color: "var(--color-ink)" })}"${_scopeId}>Statistik &amp; Analisis Kajian</h3><p class="text-xs mt-1" style="${ssrRenderStyle({ color: "var(--color-ink-2)" })}"${_scopeId}>Pantau tren kunjungan, unduhan, distribusi bidang, dan aktivitas kajian secara mendalam.</p></div></div></div><div class="p-6 rounded-card" style="${ssrRenderStyle({ backgroundColor: "var(--color-paper)", border: "1px solid var(--color-rule)" })}"${_scopeId}><div class="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end"${_scopeId}><div class="space-y-2"${_scopeId}><label class="text-xs font-bold uppercase tracking-wider" style="${ssrRenderStyle({ color: "var(--color-ink-2)" })}"${_scopeId}>Bidang</label><select class="w-full text-xs py-2.5 rounded-sm" style="${ssrRenderStyle({ border: "1px solid var(--color-rule)", color: "var(--color-ink)", backgroundColor: "var(--color-paper-2)" })}"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(bidang_id.value) ? ssrLooseContain(bidang_id.value, "") : ssrLooseEqual(bidang_id.value, "")) ? " selected" : ""}${_scopeId}>Semua Bidang</option><!--[-->`);
            ssrRenderList(__props.bidangs, (b) => {
              _push2(`<option${ssrRenderAttr("value", b.id)}${ssrIncludeBooleanAttr(Array.isArray(bidang_id.value) ? ssrLooseContain(bidang_id.value, b.id) : ssrLooseEqual(bidang_id.value, b.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(b.nama)}</option>`);
            });
            _push2(`<!--]--></select></div><div class="space-y-2"${_scopeId}><label class="text-xs font-bold uppercase tracking-wider" style="${ssrRenderStyle({ color: "var(--color-ink-2)" })}"${_scopeId}>Jenis Kajian</label><select class="w-full text-xs py-2.5 rounded-sm" style="${ssrRenderStyle({ border: "1px solid var(--color-rule)", color: "var(--color-ink)", backgroundColor: "var(--color-paper-2)" })}"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(jenis_id.value) ? ssrLooseContain(jenis_id.value, "") : ssrLooseEqual(jenis_id.value, "")) ? " selected" : ""}${_scopeId}>Semua Jenis</option><!--[-->`);
            ssrRenderList(__props.jenisKajians, (j) => {
              _push2(`<option${ssrRenderAttr("value", j.id)}${ssrIncludeBooleanAttr(Array.isArray(jenis_id.value) ? ssrLooseContain(jenis_id.value, j.id) : ssrLooseEqual(jenis_id.value, j.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(j.nama)}</option>`);
            });
            _push2(`<!--]--></select></div><div class="space-y-2"${_scopeId}><label class="text-xs font-bold uppercase tracking-wider" style="${ssrRenderStyle({ color: "var(--color-ink-2)" })}"${_scopeId}>Tahun</label><select class="w-full text-xs py-2.5 rounded-sm" style="${ssrRenderStyle({ border: "1px solid var(--color-rule)", color: "var(--color-ink)", backgroundColor: "var(--color-paper-2)" })}"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(tahun_id.value) ? ssrLooseContain(tahun_id.value, "") : ssrLooseEqual(tahun_id.value, "")) ? " selected" : ""}${_scopeId}>Semua Tahun</option><!--[-->`);
            ssrRenderList(__props.tahuns, (t) => {
              _push2(`<option${ssrRenderAttr("value", t.id)}${ssrIncludeBooleanAttr(Array.isArray(tahun_id.value) ? ssrLooseContain(tahun_id.value, t.id) : ssrLooseEqual(tahun_id.value, t.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(t.tahun)}</option>`);
            });
            _push2(`<!--]--></select></div><button class="text-xs font-bold py-2.5 rounded-sm transition-all" style="${ssrRenderStyle({ border: "1px solid var(--color-rule)", color: "var(--color-ink)" })}"${_scopeId}>Reset Filter</button></div></div><div class="grid grid-cols-2 lg:grid-cols-4 gap-4"${_scopeId}><div class="p-5 rounded-card" style="${ssrRenderStyle({ backgroundColor: "var(--color-paper)", border: "1px solid var(--color-rule)" })}"${_scopeId}><p class="text-xs font-semibold uppercase tracking-wider" style="${ssrRenderStyle({ color: "var(--color-ink-2)" })}"${_scopeId}>Total Kajian</p><h3 class="text-2xl font-bold mt-1" style="${ssrRenderStyle({ color: "var(--color-ink)" })}"${_scopeId}>${ssrInterpolate(__props.summary.total_kajian)}</h3><p class="text-[11px] mt-1" style="${ssrRenderStyle({ color: "var(--color-ink-2)" })}"${_scopeId}>${ssrInterpolate(__props.summary.total_published)} terbit, ${ssrInterpolate(__props.summary.total_draft)} draf</p></div><div class="p-5 rounded-card" style="${ssrRenderStyle({ backgroundColor: "var(--color-paper)", border: "1px solid var(--color-rule)" })}"${_scopeId}><p class="text-xs font-semibold uppercase tracking-wider" style="${ssrRenderStyle({ color: "var(--color-ink-2)" })}"${_scopeId}>Total Kunjungan</p><h3 class="text-2xl font-bold mt-1" style="${ssrRenderStyle({ "color": "#10B981" })}"${_scopeId}>${ssrInterpolate(__props.summary.total_views)}</h3><p class="text-[11px] mt-1" style="${ssrRenderStyle({ color: "var(--color-ink-2)" })}"${_scopeId}>Rata-rata ${ssrInterpolate(avgViewsPerKajian.value)} / kajian</p></div><div class="p-5 rounded-card" style="${ssrRenderStyle({ backgroundColor: "var(--color-paper)", border: "1px solid var(--color-rule)" })}"${_scopeId}><p class="text-xs font-semibold uppercase tracking-wider" style="${ssrRenderStyle({ color: "var(--color-ink-2)" })}"${_scopeId}>Total Unduhan</p><h3 class="text-2xl font-bold mt-1" style="${ssrRenderStyle({ "color": "#3B82F6" })}"${_scopeId}>${ssrInterpolate(__props.summary.total_downloads)}</h3><p class="text-[11px] mt-1" style="${ssrRenderStyle({ color: "var(--color-ink-2)" })}"${_scopeId}>Rata-rata ${ssrInterpolate(avgDownloadsPerKajian.value)} / kajian</p></div><div class="p-5 rounded-card" style="${ssrRenderStyle({ backgroundColor: "var(--color-paper)", border: "1px solid var(--color-rule)" })}"${_scopeId}><p class="text-xs font-semibold uppercase tracking-wider" style="${ssrRenderStyle({ color: "var(--color-ink-2)" })}"${_scopeId}>Conversion Rate</p><h3 class="text-2xl font-bold mt-1" style="${ssrRenderStyle({ "color": "#F59E0B" })}"${_scopeId}>${ssrInterpolate(conversionRate.value)}%</h3><p class="text-[11px] mt-1" style="${ssrRenderStyle({ color: "var(--color-ink-2)" })}"${_scopeId}>Rasio unduhan / kunjungan</p></div></div><div class="p-6 rounded-card" style="${ssrRenderStyle({ backgroundColor: "var(--color-paper)", border: "1px solid var(--color-rule)" })}"${_scopeId}><h4 class="font-bold text-base mb-1" style="${ssrRenderStyle({ color: "var(--color-ink)" })}"${_scopeId}>Tren Kunjungan &amp; Unduhan</h4><p class="text-xs mb-6" style="${ssrRenderStyle({ color: "var(--color-ink-2)" })}"${_scopeId}>Grafik kombinasi aktivitas kunjungan (garis) dan unduhan (bar) 6 bulan terakhir</p><div class="h-80"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Chart), {
              type: "bar",
              data: comboChartData.value,
              options: comboChartOptions,
              class: "h-full w-full"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-6"${_scopeId}><div class="p-6 rounded-card" style="${ssrRenderStyle({ backgroundColor: "var(--color-paper)", border: "1px solid var(--color-rule)" })}"${_scopeId}><h4 class="font-bold text-base mb-1" style="${ssrRenderStyle({ color: "var(--color-ink)" })}"${_scopeId}>Komposisi Jenis Penelitian</h4><p class="text-xs mb-6" style="${ssrRenderStyle({ color: "var(--color-ink-2)" })}"${_scopeId}>Distribusi kajian terbit berdasarkan klasifikasi riset</p><div class="h-72"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Chart), {
              type: "doughnut",
              data: doughnutData.value,
              options: doughnutOpts,
              class: "h-full w-full"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="p-6 rounded-card" style="${ssrRenderStyle({ backgroundColor: "var(--color-paper)", border: "1px solid var(--color-rule)" })}"${_scopeId}><h4 class="font-bold text-base mb-1" style="${ssrRenderStyle({ color: "var(--color-ink)" })}"${_scopeId}>Status Kajian</h4><p class="text-xs mb-6" style="${ssrRenderStyle({ color: "var(--color-ink-2)" })}"${_scopeId}>Distribusi status seluruh kajian dalam sistem</p><div class="h-72"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Chart), {
              type: "doughnut",
              data: statusData.value,
              options: statusOpts,
              class: "h-full w-full"
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-6"${_scopeId}><div class="p-6 rounded-card" style="${ssrRenderStyle({ backgroundColor: "var(--color-paper)", border: "1px solid var(--color-rule)" })}"${_scopeId}><h4 class="font-bold text-base mb-1" style="${ssrRenderStyle({ color: "var(--color-ink)" })}"${_scopeId}>Distribusi Bidang</h4><p class="text-xs mb-6" style="${ssrRenderStyle({ color: "var(--color-ink-2)" })}"${_scopeId}>Jumlah kajian terbit per bidang penelitian</p><div class="h-72"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Chart), {
              type: "bar",
              data: barData.value,
              options: barOpts,
              class: "h-full w-full"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="p-6 rounded-card" style="${ssrRenderStyle({ backgroundColor: "var(--color-paper)", border: "1px solid var(--color-rule)" })}"${_scopeId}><h4 class="font-bold text-base mb-1" style="${ssrRenderStyle({ color: "var(--color-ink)" })}"${_scopeId}>Tren Publikasi Tahunan</h4><p class="text-xs mb-6" style="${ssrRenderStyle({ color: "var(--color-ink-2)" })}"${_scopeId}>Jumlah kajian terbit per tahun</p><div class="h-72"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Chart), {
              type: "bar",
              data: annualData.value,
              options: annualOpts,
              class: "h-full w-full"
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-6"${_scopeId}><div class="p-6 rounded-card" style="${ssrRenderStyle({ backgroundColor: "var(--color-paper)", border: "1px solid var(--color-rule)" })}"${_scopeId}><h4 class="font-bold text-base mb-1" style="${ssrRenderStyle({ color: "var(--color-ink)" })}"${_scopeId}>Kajian Paling Dilihat</h4><p class="text-xs mb-4" style="${ssrRenderStyle({ color: "var(--color-ink-2)" })}"${_scopeId}>5 kajian dengan jumlah kunjungan tertinggi</p><div class="space-y-3"${_scopeId}><!--[-->`);
            ssrRenderList(__props.charts.top_by_views || [], (item, idx) => {
              _push2(ssrRenderComponent(unref(Link), {
                key: idx,
                href: _ctx.route("portal.detail", item.slug),
                class: "flex items-center gap-3 p-3 rounded-sm transition-colors hover:bg-[var(--color-paper-2)]"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style="${ssrRenderStyle(idx === 0 ? { backgroundColor: "var(--color-accent)", color: "#fff" } : { backgroundColor: "var(--color-paper-2)", color: "var(--color-ink-2)" })}"${_scopeId2}>${ssrInterpolate(idx + 1)}</span><div class="min-w-0 flex-1"${_scopeId2}><p class="text-xs font-semibold truncate" style="${ssrRenderStyle({ color: "var(--color-ink)" })}"${_scopeId2}>${ssrInterpolate(item.judul)}</p><p class="text-[10px]" style="${ssrRenderStyle({ color: "var(--color-ink-2)" })}"${_scopeId2}>${ssrInterpolate(item.bidang)}</p></div><div class="text-right shrink-0"${_scopeId2}><span class="text-xs font-bold" style="${ssrRenderStyle({ "color": "#10B981" })}"${_scopeId2}>${ssrInterpolate(item.views)}</span><span class="text-[10px] block" style="${ssrRenderStyle({ color: "var(--color-ink-2)" })}"${_scopeId2}>views</span></div>`);
                  } else {
                    return [
                      createVNode("span", {
                        class: "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0",
                        style: idx === 0 ? { backgroundColor: "var(--color-accent)", color: "#fff" } : { backgroundColor: "var(--color-paper-2)", color: "var(--color-ink-2)" }
                      }, toDisplayString(idx + 1), 5),
                      createVNode("div", { class: "min-w-0 flex-1" }, [
                        createVNode("p", {
                          class: "text-xs font-semibold truncate",
                          style: { color: "var(--color-ink)" }
                        }, toDisplayString(item.judul), 1),
                        createVNode("p", {
                          class: "text-[10px]",
                          style: { color: "var(--color-ink-2)" }
                        }, toDisplayString(item.bidang), 1)
                      ]),
                      createVNode("div", { class: "text-right shrink-0" }, [
                        createVNode("span", {
                          class: "text-xs font-bold",
                          style: { "color": "#10B981" }
                        }, toDisplayString(item.views), 1),
                        createVNode("span", {
                          class: "text-[10px] block",
                          style: { color: "var(--color-ink-2)" }
                        }, "views")
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
            if (!((_a = __props.charts.top_by_views) == null ? void 0 : _a.length)) {
              _push2(`<p class="text-xs text-center py-4" style="${ssrRenderStyle({ color: "var(--color-ink-2)" })}"${_scopeId}>Belum ada data</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="p-6 rounded-card" style="${ssrRenderStyle({ backgroundColor: "var(--color-paper)", border: "1px solid var(--color-rule)" })}"${_scopeId}><h4 class="font-bold text-base mb-1" style="${ssrRenderStyle({ color: "var(--color-ink)" })}"${_scopeId}>Kajian Paling Diunduh</h4><p class="text-xs mb-4" style="${ssrRenderStyle({ color: "var(--color-ink-2)" })}"${_scopeId}>5 kajian dengan jumlah unduhan tertinggi</p><div class="space-y-3"${_scopeId}><!--[-->`);
            ssrRenderList(__props.charts.top_by_downloads || [], (item, idx) => {
              _push2(ssrRenderComponent(unref(Link), {
                key: idx,
                href: _ctx.route("portal.detail", item.slug),
                class: "flex items-center gap-3 p-3 rounded-sm transition-colors hover:bg-[var(--color-paper-2)]"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style="${ssrRenderStyle(idx === 0 ? { backgroundColor: "var(--color-accent)", color: "#fff" } : { backgroundColor: "var(--color-paper-2)", color: "var(--color-ink-2)" })}"${_scopeId2}>${ssrInterpolate(idx + 1)}</span><div class="min-w-0 flex-1"${_scopeId2}><p class="text-xs font-semibold truncate" style="${ssrRenderStyle({ color: "var(--color-ink)" })}"${_scopeId2}>${ssrInterpolate(item.judul)}</p><p class="text-[10px]" style="${ssrRenderStyle({ color: "var(--color-ink-2)" })}"${_scopeId2}>${ssrInterpolate(item.bidang)}</p></div><div class="text-right shrink-0"${_scopeId2}><span class="text-xs font-bold" style="${ssrRenderStyle({ "color": "#3B82F6" })}"${_scopeId2}>${ssrInterpolate(item.downloads)}</span><span class="text-[10px] block" style="${ssrRenderStyle({ color: "var(--color-ink-2)" })}"${_scopeId2}>unduh</span></div>`);
                  } else {
                    return [
                      createVNode("span", {
                        class: "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0",
                        style: idx === 0 ? { backgroundColor: "var(--color-accent)", color: "#fff" } : { backgroundColor: "var(--color-paper-2)", color: "var(--color-ink-2)" }
                      }, toDisplayString(idx + 1), 5),
                      createVNode("div", { class: "min-w-0 flex-1" }, [
                        createVNode("p", {
                          class: "text-xs font-semibold truncate",
                          style: { color: "var(--color-ink)" }
                        }, toDisplayString(item.judul), 1),
                        createVNode("p", {
                          class: "text-[10px]",
                          style: { color: "var(--color-ink-2)" }
                        }, toDisplayString(item.bidang), 1)
                      ]),
                      createVNode("div", { class: "text-right shrink-0" }, [
                        createVNode("span", {
                          class: "text-xs font-bold",
                          style: { "color": "#3B82F6" }
                        }, toDisplayString(item.downloads), 1),
                        createVNode("span", {
                          class: "text-[10px] block",
                          style: { color: "var(--color-ink-2)" }
                        }, "unduh")
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
            if (!((_b = __props.charts.top_by_downloads) == null ? void 0 : _b.length)) {
              _push2(`<p class="text-xs text-center py-4" style="${ssrRenderStyle({ color: "var(--color-ink-2)" })}"${_scopeId}>Belum ada data</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="p-6 rounded-card" style="${ssrRenderStyle({ backgroundColor: "var(--color-paper)", border: "1px solid var(--color-rule)" })}"${_scopeId}><h4 class="font-bold text-base mb-1" style="${ssrRenderStyle({ color: "var(--color-ink)" })}"${_scopeId}>Performa per Bidang</h4><p class="text-xs mb-4" style="${ssrRenderStyle({ color: "var(--color-ink-2)" })}"${_scopeId}>Ringkasan jumlah kajian, kunjungan, dan unduhan per bidang penelitian</p><div class="overflow-x-auto"${_scopeId}><table class="w-full text-xs"${_scopeId}><thead${_scopeId}><tr style="${ssrRenderStyle({ borderBottom: "1px solid var(--color-rule)" })}"${_scopeId}><th class="text-left py-2.5 font-semibold" style="${ssrRenderStyle({ color: "var(--color-ink-2)" })}"${_scopeId}>Bidang</th><th class="text-center py-2.5 font-semibold" style="${ssrRenderStyle({ color: "var(--color-ink-2)" })}"${_scopeId}>Kajian</th><th class="text-center py-2.5 font-semibold" style="${ssrRenderStyle({ color: "var(--color-ink-2)" })}"${_scopeId}>Kunjungan</th><th class="text-center py-2.5 font-semibold" style="${ssrRenderStyle({ color: "var(--color-ink-2)" })}"${_scopeId}>Unduhan</th><th class="text-center py-2.5 font-semibold" style="${ssrRenderStyle({ color: "var(--color-ink-2)" })}"${_scopeId}>Conv. Rate</th></tr></thead><tbody${_scopeId}><!--[-->`);
            ssrRenderList(__props.charts.views_per_bidang || [], (row) => {
              _push2(`<tr class="transition-colors" style="${ssrRenderStyle({ borderBottom: "1px solid var(--color-rule)" })}"${_scopeId}><td class="py-2.5 font-medium" style="${ssrRenderStyle({ color: "var(--color-ink)" })}"${_scopeId}>${ssrInterpolate(row.bidang)}</td><td class="py-2.5 text-center" style="${ssrRenderStyle({ color: "var(--color-ink)" })}"${_scopeId}>${ssrInterpolate(row.kajian)}</td><td class="py-2.5 text-center" style="${ssrRenderStyle({ color: "var(--color-ink)" })}"${_scopeId}>${ssrInterpolate(row.views)}</td><td class="py-2.5 text-center" style="${ssrRenderStyle({ color: "var(--color-ink)" })}"${_scopeId}>${ssrInterpolate(row.downloads)}</td><td class="py-2.5 text-center"${_scopeId}><span class="px-2 py-0.5 rounded-full text-[10px] font-semibold" style="${ssrRenderStyle({ backgroundColor: row.views > 0 ? "rgba(16,185,129,0.1)" : "var(--color-paper-2)", color: row.views > 0 ? "#10B981" : "var(--color-ink-2)" })}"${_scopeId}>${ssrInterpolate(row.views > 0 ? (row.downloads / row.views * 100).toFixed(1) + "%" : "0%")}</span></td></tr>`);
            });
            _push2(`<!--]-->`);
            if (!((_c = __props.charts.views_per_bidang) == null ? void 0 : _c.length)) {
              _push2(`<tr${_scopeId}><td colspan="5" class="py-8 text-center" style="${ssrRenderStyle({ color: "var(--color-ink-2)" })}"${_scopeId}>Belum ada data performa</td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-6" }, [
                createVNode("div", {
                  class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 rounded-card",
                  style: { backgroundColor: "var(--color-paper)", border: "1px solid var(--color-rule)" }
                }, [
                  createVNode("div", { class: "flex items-center gap-3" }, [
                    createVNode(unref(Link), {
                      href: _ctx.route("laporan.index"),
                      class: "p-2.5 rounded-sm transition-all",
                      style: { backgroundColor: "var(--color-paper-2)", color: "var(--color-ink-2)" }
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
                      createVNode("h3", {
                        class: "text-xl font-bold",
                        style: { color: "var(--color-ink)" }
                      }, "Statistik & Analisis Kajian"),
                      createVNode("p", {
                        class: "text-xs mt-1",
                        style: { color: "var(--color-ink-2)" }
                      }, "Pantau tren kunjungan, unduhan, distribusi bidang, dan aktivitas kajian secara mendalam.")
                    ])
                  ])
                ]),
                createVNode("div", {
                  class: "p-6 rounded-card",
                  style: { backgroundColor: "var(--color-paper)", border: "1px solid var(--color-rule)" }
                }, [
                  createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-4 gap-4 items-end" }, [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode("label", {
                        class: "text-xs font-bold uppercase tracking-wider",
                        style: { color: "var(--color-ink-2)" }
                      }, "Bidang"),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => bidang_id.value = $event,
                        onChange: handleFilter,
                        class: "w-full text-xs py-2.5 rounded-sm",
                        style: { border: "1px solid var(--color-rule)", color: "var(--color-ink)", backgroundColor: "var(--color-paper-2)" }
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
                      createVNode("label", {
                        class: "text-xs font-bold uppercase tracking-wider",
                        style: { color: "var(--color-ink-2)" }
                      }, "Jenis Kajian"),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => jenis_id.value = $event,
                        onChange: handleFilter,
                        class: "w-full text-xs py-2.5 rounded-sm",
                        style: { border: "1px solid var(--color-rule)", color: "var(--color-ink)", backgroundColor: "var(--color-paper-2)" }
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
                      createVNode("label", {
                        class: "text-xs font-bold uppercase tracking-wider",
                        style: { color: "var(--color-ink-2)" }
                      }, "Tahun"),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => tahun_id.value = $event,
                        onChange: handleFilter,
                        class: "w-full text-xs py-2.5 rounded-sm",
                        style: { border: "1px solid var(--color-rule)", color: "var(--color-ink)", backgroundColor: "var(--color-paper-2)" }
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
                    createVNode("button", {
                      onClick: resetFilter,
                      class: "text-xs font-bold py-2.5 rounded-sm transition-all",
                      style: { border: "1px solid var(--color-rule)", color: "var(--color-ink)" }
                    }, "Reset Filter")
                  ])
                ]),
                createVNode("div", { class: "grid grid-cols-2 lg:grid-cols-4 gap-4" }, [
                  createVNode("div", {
                    class: "p-5 rounded-card",
                    style: { backgroundColor: "var(--color-paper)", border: "1px solid var(--color-rule)" }
                  }, [
                    createVNode("p", {
                      class: "text-xs font-semibold uppercase tracking-wider",
                      style: { color: "var(--color-ink-2)" }
                    }, "Total Kajian"),
                    createVNode("h3", {
                      class: "text-2xl font-bold mt-1",
                      style: { color: "var(--color-ink)" }
                    }, toDisplayString(__props.summary.total_kajian), 1),
                    createVNode("p", {
                      class: "text-[11px] mt-1",
                      style: { color: "var(--color-ink-2)" }
                    }, toDisplayString(__props.summary.total_published) + " terbit, " + toDisplayString(__props.summary.total_draft) + " draf", 1)
                  ]),
                  createVNode("div", {
                    class: "p-5 rounded-card",
                    style: { backgroundColor: "var(--color-paper)", border: "1px solid var(--color-rule)" }
                  }, [
                    createVNode("p", {
                      class: "text-xs font-semibold uppercase tracking-wider",
                      style: { color: "var(--color-ink-2)" }
                    }, "Total Kunjungan"),
                    createVNode("h3", {
                      class: "text-2xl font-bold mt-1",
                      style: { "color": "#10B981" }
                    }, toDisplayString(__props.summary.total_views), 1),
                    createVNode("p", {
                      class: "text-[11px] mt-1",
                      style: { color: "var(--color-ink-2)" }
                    }, "Rata-rata " + toDisplayString(avgViewsPerKajian.value) + " / kajian", 1)
                  ]),
                  createVNode("div", {
                    class: "p-5 rounded-card",
                    style: { backgroundColor: "var(--color-paper)", border: "1px solid var(--color-rule)" }
                  }, [
                    createVNode("p", {
                      class: "text-xs font-semibold uppercase tracking-wider",
                      style: { color: "var(--color-ink-2)" }
                    }, "Total Unduhan"),
                    createVNode("h3", {
                      class: "text-2xl font-bold mt-1",
                      style: { "color": "#3B82F6" }
                    }, toDisplayString(__props.summary.total_downloads), 1),
                    createVNode("p", {
                      class: "text-[11px] mt-1",
                      style: { color: "var(--color-ink-2)" }
                    }, "Rata-rata " + toDisplayString(avgDownloadsPerKajian.value) + " / kajian", 1)
                  ]),
                  createVNode("div", {
                    class: "p-5 rounded-card",
                    style: { backgroundColor: "var(--color-paper)", border: "1px solid var(--color-rule)" }
                  }, [
                    createVNode("p", {
                      class: "text-xs font-semibold uppercase tracking-wider",
                      style: { color: "var(--color-ink-2)" }
                    }, "Conversion Rate"),
                    createVNode("h3", {
                      class: "text-2xl font-bold mt-1",
                      style: { "color": "#F59E0B" }
                    }, toDisplayString(conversionRate.value) + "%", 1),
                    createVNode("p", {
                      class: "text-[11px] mt-1",
                      style: { color: "var(--color-ink-2)" }
                    }, "Rasio unduhan / kunjungan")
                  ])
                ]),
                createVNode("div", {
                  class: "p-6 rounded-card",
                  style: { backgroundColor: "var(--color-paper)", border: "1px solid var(--color-rule)" }
                }, [
                  createVNode("h4", {
                    class: "font-bold text-base mb-1",
                    style: { color: "var(--color-ink)" }
                  }, "Tren Kunjungan & Unduhan"),
                  createVNode("p", {
                    class: "text-xs mb-6",
                    style: { color: "var(--color-ink-2)" }
                  }, "Grafik kombinasi aktivitas kunjungan (garis) dan unduhan (bar) 6 bulan terakhir"),
                  createVNode("div", { class: "h-80" }, [
                    createVNode(unref(Chart), {
                      type: "bar",
                      data: comboChartData.value,
                      options: comboChartOptions,
                      class: "h-full w-full"
                    }, null, 8, ["data"])
                  ])
                ]),
                createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-6" }, [
                  createVNode("div", {
                    class: "p-6 rounded-card",
                    style: { backgroundColor: "var(--color-paper)", border: "1px solid var(--color-rule)" }
                  }, [
                    createVNode("h4", {
                      class: "font-bold text-base mb-1",
                      style: { color: "var(--color-ink)" }
                    }, "Komposisi Jenis Penelitian"),
                    createVNode("p", {
                      class: "text-xs mb-6",
                      style: { color: "var(--color-ink-2)" }
                    }, "Distribusi kajian terbit berdasarkan klasifikasi riset"),
                    createVNode("div", { class: "h-72" }, [
                      createVNode(unref(Chart), {
                        type: "doughnut",
                        data: doughnutData.value,
                        options: doughnutOpts,
                        class: "h-full w-full"
                      }, null, 8, ["data"])
                    ])
                  ]),
                  createVNode("div", {
                    class: "p-6 rounded-card",
                    style: { backgroundColor: "var(--color-paper)", border: "1px solid var(--color-rule)" }
                  }, [
                    createVNode("h4", {
                      class: "font-bold text-base mb-1",
                      style: { color: "var(--color-ink)" }
                    }, "Status Kajian"),
                    createVNode("p", {
                      class: "text-xs mb-6",
                      style: { color: "var(--color-ink-2)" }
                    }, "Distribusi status seluruh kajian dalam sistem"),
                    createVNode("div", { class: "h-72" }, [
                      createVNode(unref(Chart), {
                        type: "doughnut",
                        data: statusData.value,
                        options: statusOpts,
                        class: "h-full w-full"
                      }, null, 8, ["data"])
                    ])
                  ])
                ]),
                createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-6" }, [
                  createVNode("div", {
                    class: "p-6 rounded-card",
                    style: { backgroundColor: "var(--color-paper)", border: "1px solid var(--color-rule)" }
                  }, [
                    createVNode("h4", {
                      class: "font-bold text-base mb-1",
                      style: { color: "var(--color-ink)" }
                    }, "Distribusi Bidang"),
                    createVNode("p", {
                      class: "text-xs mb-6",
                      style: { color: "var(--color-ink-2)" }
                    }, "Jumlah kajian terbit per bidang penelitian"),
                    createVNode("div", { class: "h-72" }, [
                      createVNode(unref(Chart), {
                        type: "bar",
                        data: barData.value,
                        options: barOpts,
                        class: "h-full w-full"
                      }, null, 8, ["data"])
                    ])
                  ]),
                  createVNode("div", {
                    class: "p-6 rounded-card",
                    style: { backgroundColor: "var(--color-paper)", border: "1px solid var(--color-rule)" }
                  }, [
                    createVNode("h4", {
                      class: "font-bold text-base mb-1",
                      style: { color: "var(--color-ink)" }
                    }, "Tren Publikasi Tahunan"),
                    createVNode("p", {
                      class: "text-xs mb-6",
                      style: { color: "var(--color-ink-2)" }
                    }, "Jumlah kajian terbit per tahun"),
                    createVNode("div", { class: "h-72" }, [
                      createVNode(unref(Chart), {
                        type: "bar",
                        data: annualData.value,
                        options: annualOpts,
                        class: "h-full w-full"
                      }, null, 8, ["data"])
                    ])
                  ])
                ]),
                createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-6" }, [
                  createVNode("div", {
                    class: "p-6 rounded-card",
                    style: { backgroundColor: "var(--color-paper)", border: "1px solid var(--color-rule)" }
                  }, [
                    createVNode("h4", {
                      class: "font-bold text-base mb-1",
                      style: { color: "var(--color-ink)" }
                    }, "Kajian Paling Dilihat"),
                    createVNode("p", {
                      class: "text-xs mb-4",
                      style: { color: "var(--color-ink-2)" }
                    }, "5 kajian dengan jumlah kunjungan tertinggi"),
                    createVNode("div", { class: "space-y-3" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.charts.top_by_views || [], (item, idx) => {
                        return openBlock(), createBlock(unref(Link), {
                          key: idx,
                          href: _ctx.route("portal.detail", item.slug),
                          class: "flex items-center gap-3 p-3 rounded-sm transition-colors hover:bg-[var(--color-paper-2)]"
                        }, {
                          default: withCtx(() => [
                            createVNode("span", {
                              class: "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0",
                              style: idx === 0 ? { backgroundColor: "var(--color-accent)", color: "#fff" } : { backgroundColor: "var(--color-paper-2)", color: "var(--color-ink-2)" }
                            }, toDisplayString(idx + 1), 5),
                            createVNode("div", { class: "min-w-0 flex-1" }, [
                              createVNode("p", {
                                class: "text-xs font-semibold truncate",
                                style: { color: "var(--color-ink)" }
                              }, toDisplayString(item.judul), 1),
                              createVNode("p", {
                                class: "text-[10px]",
                                style: { color: "var(--color-ink-2)" }
                              }, toDisplayString(item.bidang), 1)
                            ]),
                            createVNode("div", { class: "text-right shrink-0" }, [
                              createVNode("span", {
                                class: "text-xs font-bold",
                                style: { "color": "#10B981" }
                              }, toDisplayString(item.views), 1),
                              createVNode("span", {
                                class: "text-[10px] block",
                                style: { color: "var(--color-ink-2)" }
                              }, "views")
                            ])
                          ]),
                          _: 2
                        }, 1032, ["href"]);
                      }), 128)),
                      !((_d = __props.charts.top_by_views) == null ? void 0 : _d.length) ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-xs text-center py-4",
                        style: { color: "var(--color-ink-2)" }
                      }, "Belum ada data")) : createCommentVNode("", true)
                    ])
                  ]),
                  createVNode("div", {
                    class: "p-6 rounded-card",
                    style: { backgroundColor: "var(--color-paper)", border: "1px solid var(--color-rule)" }
                  }, [
                    createVNode("h4", {
                      class: "font-bold text-base mb-1",
                      style: { color: "var(--color-ink)" }
                    }, "Kajian Paling Diunduh"),
                    createVNode("p", {
                      class: "text-xs mb-4",
                      style: { color: "var(--color-ink-2)" }
                    }, "5 kajian dengan jumlah unduhan tertinggi"),
                    createVNode("div", { class: "space-y-3" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.charts.top_by_downloads || [], (item, idx) => {
                        return openBlock(), createBlock(unref(Link), {
                          key: idx,
                          href: _ctx.route("portal.detail", item.slug),
                          class: "flex items-center gap-3 p-3 rounded-sm transition-colors hover:bg-[var(--color-paper-2)]"
                        }, {
                          default: withCtx(() => [
                            createVNode("span", {
                              class: "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0",
                              style: idx === 0 ? { backgroundColor: "var(--color-accent)", color: "#fff" } : { backgroundColor: "var(--color-paper-2)", color: "var(--color-ink-2)" }
                            }, toDisplayString(idx + 1), 5),
                            createVNode("div", { class: "min-w-0 flex-1" }, [
                              createVNode("p", {
                                class: "text-xs font-semibold truncate",
                                style: { color: "var(--color-ink)" }
                              }, toDisplayString(item.judul), 1),
                              createVNode("p", {
                                class: "text-[10px]",
                                style: { color: "var(--color-ink-2)" }
                              }, toDisplayString(item.bidang), 1)
                            ]),
                            createVNode("div", { class: "text-right shrink-0" }, [
                              createVNode("span", {
                                class: "text-xs font-bold",
                                style: { "color": "#3B82F6" }
                              }, toDisplayString(item.downloads), 1),
                              createVNode("span", {
                                class: "text-[10px] block",
                                style: { color: "var(--color-ink-2)" }
                              }, "unduh")
                            ])
                          ]),
                          _: 2
                        }, 1032, ["href"]);
                      }), 128)),
                      !((_e = __props.charts.top_by_downloads) == null ? void 0 : _e.length) ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-xs text-center py-4",
                        style: { color: "var(--color-ink-2)" }
                      }, "Belum ada data")) : createCommentVNode("", true)
                    ])
                  ])
                ]),
                createVNode("div", {
                  class: "p-6 rounded-card",
                  style: { backgroundColor: "var(--color-paper)", border: "1px solid var(--color-rule)" }
                }, [
                  createVNode("h4", {
                    class: "font-bold text-base mb-1",
                    style: { color: "var(--color-ink)" }
                  }, "Performa per Bidang"),
                  createVNode("p", {
                    class: "text-xs mb-4",
                    style: { color: "var(--color-ink-2)" }
                  }, "Ringkasan jumlah kajian, kunjungan, dan unduhan per bidang penelitian"),
                  createVNode("div", { class: "overflow-x-auto" }, [
                    createVNode("table", { class: "w-full text-xs" }, [
                      createVNode("thead", null, [
                        createVNode("tr", { style: { borderBottom: "1px solid var(--color-rule)" } }, [
                          createVNode("th", {
                            class: "text-left py-2.5 font-semibold",
                            style: { color: "var(--color-ink-2)" }
                          }, "Bidang"),
                          createVNode("th", {
                            class: "text-center py-2.5 font-semibold",
                            style: { color: "var(--color-ink-2)" }
                          }, "Kajian"),
                          createVNode("th", {
                            class: "text-center py-2.5 font-semibold",
                            style: { color: "var(--color-ink-2)" }
                          }, "Kunjungan"),
                          createVNode("th", {
                            class: "text-center py-2.5 font-semibold",
                            style: { color: "var(--color-ink-2)" }
                          }, "Unduhan"),
                          createVNode("th", {
                            class: "text-center py-2.5 font-semibold",
                            style: { color: "var(--color-ink-2)" }
                          }, "Conv. Rate")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.charts.views_per_bidang || [], (row) => {
                          return openBlock(), createBlock("tr", {
                            key: row.bidang,
                            class: "transition-colors",
                            style: { borderBottom: "1px solid var(--color-rule)" }
                          }, [
                            createVNode("td", {
                              class: "py-2.5 font-medium",
                              style: { color: "var(--color-ink)" }
                            }, toDisplayString(row.bidang), 1),
                            createVNode("td", {
                              class: "py-2.5 text-center",
                              style: { color: "var(--color-ink)" }
                            }, toDisplayString(row.kajian), 1),
                            createVNode("td", {
                              class: "py-2.5 text-center",
                              style: { color: "var(--color-ink)" }
                            }, toDisplayString(row.views), 1),
                            createVNode("td", {
                              class: "py-2.5 text-center",
                              style: { color: "var(--color-ink)" }
                            }, toDisplayString(row.downloads), 1),
                            createVNode("td", { class: "py-2.5 text-center" }, [
                              createVNode("span", {
                                class: "px-2 py-0.5 rounded-full text-[10px] font-semibold",
                                style: { backgroundColor: row.views > 0 ? "rgba(16,185,129,0.1)" : "var(--color-paper-2)", color: row.views > 0 ? "#10B981" : "var(--color-ink-2)" }
                              }, toDisplayString(row.views > 0 ? (row.downloads / row.views * 100).toFixed(1) + "%" : "0%"), 5)
                            ])
                          ]);
                        }), 128)),
                        !((_f = __props.charts.views_per_bidang) == null ? void 0 : _f.length) ? (openBlock(), createBlock("tr", { key: 0 }, [
                          createVNode("td", {
                            colspan: "5",
                            class: "py-8 text-center",
                            style: { color: "var(--color-ink-2)" }
                          }, "Belum ada data performa")
                        ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Backend/Laporan/Statistik.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
