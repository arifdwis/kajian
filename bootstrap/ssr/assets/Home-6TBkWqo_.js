import { ref, resolveComponent, unref, withCtx, createTextVNode, createVNode, toDisplayString, openBlock, createBlock, withModifiers, withDirectives, vModelText, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderAttr, ssrRenderList } from "vue/server-renderer";
import { Head, Link, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./FrontendLayout-DrClc4xA.js";
const _sfc_main = {
  __name: "Home",
  __ssrInlineRender: true,
  props: {
    summary: Object,
    recentKajians: Array,
    popularKajians: Array,
    bidangs: Array,
    jenisKajians: Array,
    tahuns: Array
  },
  setup(__props) {
    const searchQuery = ref("");
    const search = (term) => {
      const query = term || searchQuery.value;
      if (!query) return;
      router.get(route("portal.search"), { q: query });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = resolveComponent("Icon");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Beranda Kajian & Riset" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section style="${ssrRenderStyle({ "background-color": "var(--color-paper)" })}" class="relative overflow-hidden"${_scopeId}><div class="absolute right-0 top-0 w-1/3 h-full pointer-events-none opacity-[0.04] dark:opacity-[0.02] overflow-hidden hidden lg:block"${_scopeId}><svg class="w-full h-full" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="0.3"${_scopeId}><circle cx="50" cy="50" r="40" stroke-dasharray="2 2"${_scopeId}></circle><circle cx="50" cy="50" r="28"${_scopeId}></circle><line x1="10" y1="50" x2="90" y2="50"${_scopeId}></line><line x1="50" y1="10" x2="50" y2="90"${_scopeId}></line><polygon points="50,15 85,50 50,85 15,50" stroke-dasharray="1 1"${_scopeId}></polygon><ellipse cx="50" cy="50" rx="38" ry="12" transform="rotate(30, 50, 50)"${_scopeId}></ellipse><ellipse cx="50" cy="50" rx="38" ry="12" transform="rotate(-30, 50, 50)"${_scopeId}></ellipse></svg></div><div class="container mx-auto px-4 xl:px-0 pt-20 pb-20 md:pt-28 md:pb-24"${_scopeId}><div class="flex flex-wrap items-center gap-3 mb-6"${_scopeId}><div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase border" style="${ssrRenderStyle({ "background-color": "var(--color-paper-2)", "border-color": "var(--color-rule)", "color": "var(--color-ink)" })}"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:globus-bold-duotone",
              class: "w-4 h-4 text-emerald-600 dark:text-emerald-450"
            }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>Portal Kajian &amp; Riset Pembangunan Kota Samarinda</span></div><div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase border" style="${ssrRenderStyle({ "color": "var(--color-ink-2)", "border-color": "var(--color-rule)", "background-color": "var(--color-paper)" })}"${_scopeId}><span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"${_scopeId}></span><span${_scopeId}>LIVE · <strong style="${ssrRenderStyle({ "color": "var(--color-accent)" })}"${_scopeId}>${ssrInterpolate(__props.summary.total_published || 0)}</strong> DOKUMEN TERBIT</span></div></div><div class="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center"${_scopeId}><div class="lg:col-span-3"${_scopeId}><h1 class="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.08] tracking-tight" style="${ssrRenderStyle({ "font-family": "var(--font-display)", "color": "var(--color-ink)", "letter-spacing": "-0.03em" })}"${_scopeId}> Akses Riset &amp; <br${_scopeId}><span style="${ssrRenderStyle({ "color": "var(--color-accent)" })}"${_scopeId}>Kajian Daerah</span></h1><p class="mt-5 text-base sm:text-lg leading-relaxed max-w-lg" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}> Telusuri naskah akademis, rencana penelitian strategis, dan rekomendasi kebijakan daerah untuk transparansi dan perumusan keputusan berbasis bukti. </p><div class="mt-8"${_scopeId}><form class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-1.5 rounded-xl border transition-all shadow-sm focus-within:shadow-md" style="${ssrRenderStyle({ "border-color": "var(--color-rule)", "background-color": "var(--color-paper-2)", "max-width": "30rem" })}"${_scopeId}><div class="flex-1 flex items-center gap-3 px-3 py-2 sm:py-0"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:magnifer-linear",
              class: "w-5 h-5 shrink-0",
              style: { "color": "var(--color-ink-2)" }
            }, null, _parent2, _scopeId));
            _push2(`<input type="text"${ssrRenderAttr("value", searchQuery.value)} placeholder="Cari judul kajian, abstrak, kata kunci..." class="w-full bg-transparent border-0 focus:ring-0 text-sm p-0" style="${ssrRenderStyle({ "color": "var(--color-ink)" })}"${_scopeId}></div><button type="submit" class="px-6 py-3 text-xs font-bold uppercase tracking-wider rounded-lg transition-all shrink-0 active:scale-[0.98]" style="${ssrRenderStyle({ "background-color": "var(--color-accent)", "color": "var(--color-accent-ink)" })}"${_scopeId}> Cari Kajian </button></form><div class="flex flex-wrap items-center gap-2 mt-4 text-xs" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}><span class="font-medium text-[11px] uppercase tracking-wider" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}>Populer:</span><!--[-->`);
            ssrRenderList(["Infrastruktur", "Ekonomi", "Perikanan", "Kebijakan Publik"], (chip) => {
              _push2(`<button class="px-2.5 py-1 rounded-full border text-[11px] transition-colors hover:border-emerald-500 hover:text-emerald-600" style="${ssrRenderStyle({ "border-color": "var(--color-rule)", "background-color": "var(--color-paper)" })}"${_scopeId}>${ssrInterpolate(chip)}</button>`);
            });
            _push2(`<!--]--></div></div><div class="flex items-center gap-6 mt-6 pt-6 border-t text-xs font-mono uppercase tracking-wider" style="${ssrRenderStyle({ "border-color": "var(--color-rule)", "color": "var(--color-ink-2)" })}"${_scopeId}><span class="flex items-center gap-1.5"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:check-circle-bold",
              class: "w-3.5 h-3.5 text-emerald-500"
            }, null, _parent2, _scopeId));
            _push2(` Akses Terbuka</span><span class="flex items-center gap-1.5"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:check-circle-bold",
              class: "w-3.5 h-3.5 text-emerald-500"
            }, null, _parent2, _scopeId));
            _push2(` Tanpa Login</span><span class="flex items-center gap-1.5"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:check-circle-bold",
              class: "w-3.5 h-3.5 text-emerald-500"
            }, null, _parent2, _scopeId));
            _push2(` Berkas Valid</span></div></div><div class="lg:col-span-2"${_scopeId}><div class="p-6 rounded-card border shadow-sm transition-all hover:shadow-md" style="${ssrRenderStyle({ "border-color": "var(--color-rule)", "background-color": "var(--color-paper)" })}"${_scopeId}><div class="flex items-center justify-between pb-4 mb-4 border-b" style="${ssrRenderStyle({ "border-color": "var(--color-rule)" })}"${_scopeId}><div${_scopeId}><span class="font-mono text-[11px] uppercase tracking-wider block" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}>Index Publikasi</span><span class="text-sm font-semibold block" style="${ssrRenderStyle({ "color": "var(--color-ink)" })}"${_scopeId}>BAPPERIDA Samarinda</span></div><span class="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded border font-bold text-emerald-600 border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/30"${_scopeId}>Official</span></div><div class="space-y-4"${_scopeId}><div class="flex justify-between items-center py-2 border-b" style="${ssrRenderStyle({ "border-color": "var(--color-rule)" })}"${_scopeId}><span class="text-xs font-medium" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}>Total Kajian Terbit</span><strong class="text-2xl font-bold font-display" style="${ssrRenderStyle({ "color": "var(--color-ink)" })}"${_scopeId}>${ssrInterpolate(__props.summary.total_published || 0)}</strong></div><div class="flex justify-between items-center py-2 border-b" style="${ssrRenderStyle({ "border-color": "var(--color-rule)" })}"${_scopeId}><span class="text-xs font-medium" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}>Total Kunjungan</span><strong class="text-2xl font-bold font-display" style="${ssrRenderStyle({ "color": "#10B981" })}"${_scopeId}>${ssrInterpolate(__props.summary.total_views || 0)}</strong></div><div class="flex justify-between items-center py-2"${_scopeId}><span class="text-xs font-medium" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}>Total Unduhan Berkas</span><strong class="text-2xl font-bold font-display" style="${ssrRenderStyle({ "color": "#3B82F6" })}"${_scopeId}>${ssrInterpolate(__props.summary.total_downloads || 0)}</strong></div></div><div class="mt-6 pt-4 border-t" style="${ssrRenderStyle({ "border-color": "var(--color-rule)" })}"${_scopeId}><div class="w-full h-2 rounded-full overflow-hidden" style="${ssrRenderStyle({ "background-color": "var(--color-rule)" })}"${_scopeId}><div class="h-full rounded-full transition-all duration-500" style="${ssrRenderStyle({ "width": "78%", "background-color": "var(--color-accent)" })}"${_scopeId}></div></div><p class="text-[11px] font-mono uppercase tracking-wider mt-2.5 flex items-center justify-between" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}><span${_scopeId}>${ssrInterpolate(__props.bidangs.length)} Rumpun Bidang Aktif</span><span${_scopeId}>100% Keterbukaan</span></p></div></div></div></div><div class="mt-16 py-3 border-y overflow-hidden" style="${ssrRenderStyle({ "border-color": "var(--color-rule)" })}"${_scopeId}><div class="flex gap-12 animate-marquee whitespace-nowrap font-mono text-xs uppercase tracking-widest" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}><!--[-->`);
            ssrRenderList(__props.recentKajians, (item, index) => {
              _push2(`<span class="inline-flex items-center gap-3"${_scopeId}><span class="font-semibold" style="${ssrRenderStyle({ "color": "var(--color-ink)" })}"${_scopeId}>${ssrInterpolate(item.judul)}</span><span class="text-emerald-500"${_scopeId}>✦</span></span>`);
            });
            _push2(`<!--]--><!--[-->`);
            ssrRenderList(__props.recentKajians, (item, index) => {
              _push2(`<span class="inline-flex items-center gap-3"${_scopeId}><span class="font-semibold" style="${ssrRenderStyle({ "color": "var(--color-ink)" })}"${_scopeId}>${ssrInterpolate(item.judul)}</span><span class="text-emerald-500"${_scopeId}>✦</span></span>`);
            });
            _push2(`<!--]--></div></div></div></section><section class="py-20 border-b relative" style="${ssrRenderStyle({ "background-color": "var(--color-paper)", "border-color": "var(--color-rule)" })}"${_scopeId}><div class="container mx-auto px-4 xl:px-0"${_scopeId}><div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"${_scopeId}><div class="lg:col-span-5 flex items-start justify-center gap-6 sm:gap-8"${_scopeId}><div class="relative group text-center"${_scopeId}><div class="overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1" style="${ssrRenderStyle({ "width": "175px", "height": "230px", "border-color": "var(--color-rule)", "background-color": "var(--color-paper-2)" })}"${_scopeId}><img src="https://satudata.samarindakota.go.id/img/new-walikota.png" alt="Dr. H. Andi Harun" class="w-full h-full object-cover object-[center_18%] transition-transform duration-500 group-hover:scale-105"${_scopeId}></div><h5 class="mt-3 text-xs font-bold" style="${ssrRenderStyle({ "color": "var(--color-ink)" })}"${_scopeId}>Dr. H. Andi Harun</h5><p class="text-[10px] uppercase font-mono tracking-widest mt-0.5" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}>Walikota Samarinda</p></div><div class="relative group text-center"${_scopeId}><div class="overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1" style="${ssrRenderStyle({ "width": "175px", "height": "230px", "border-color": "var(--color-rule)", "background-color": "var(--color-paper-2)" })}"${_scopeId}><img src="https://satudata.samarindakota.go.id/img/new-wawali.png" alt="H. Saefuddin Zuhri, S.E., M.M." class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" style="${ssrRenderStyle({ "object-position": "-40% 2%" })}"${_scopeId}></div><h5 class="mt-3 text-xs font-bold" style="${ssrRenderStyle({ "color": "var(--color-ink)" })}"${_scopeId}>H. Saefuddin Zuhri, S.E., M.M.</h5><p class="text-[10px] uppercase font-mono tracking-widest mt-0.5" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}>Wakil Walikota Samarinda</p></div></div><div class="lg:col-span-7 space-y-6"${_scopeId}><div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400"${_scopeId}><span class="w-2 h-2 rounded-full bg-emerald-500"${_scopeId}></span> Samarinda Kota Pusat Peradaban </div><h2 class="text-3xl sm:text-4xl font-semibold tracking-tight leading-snug" style="${ssrRenderStyle({ "font-family": "var(--font-display)", "color": "var(--color-ink)", "letter-spacing": "-0.02em" })}"${_scopeId}> Mewujudkan Kebijakan Berbasis <br${_scopeId}><span style="${ssrRenderStyle({ "color": "var(--color-accent)" })}"${_scopeId}>Data &amp; Riset Ilmiah</span></h2><p class="text-sm sm:text-base leading-relaxed" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}> Pemerintah Kota Samarinda berkomitmen meningkatkan kualitas tata kelola pemerintahan yang transparan dan akuntabel. Melalui portal <strong${_scopeId}>SIKAJIAN</strong>, dokumen hasil penelitian, kajian akademis, dan naskah rekomendasi kebijakan dipublikasikan secara luas untuk mendorong kolaborasi antara pemerintah, akademisi, dan masyarakat. </p><div class="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t" style="${ssrRenderStyle({ "border-color": "var(--color-rule)" })}"${_scopeId}><div class="p-4 rounded-xl border" style="${ssrRenderStyle({ "border-color": "var(--color-rule)", "background-color": "var(--color-paper-2)" })}"${_scopeId}><h5 class="text-xs font-bold uppercase font-mono tracking-wider" style="${ssrRenderStyle({ "color": "var(--color-ink)" })}"${_scopeId}>Prinsip Pembangunan</h5><p class="text-xs mt-1.5 leading-relaxed" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}>Objektivitas, Akurasi Data, dan Kemanfaatan Publik secara inklusif.</p></div><div class="p-4 rounded-xl border" style="${ssrRenderStyle({ "border-color": "var(--color-rule)", "background-color": "var(--color-paper-2)" })}"${_scopeId}><h5 class="text-xs font-bold uppercase font-mono tracking-wider" style="${ssrRenderStyle({ "color": "var(--color-ink)" })}"${_scopeId}>Rencana Strategis</h5><p class="text-xs mt-1.5 leading-relaxed" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}>Mendukung RPJMD Kota Samarinda melalui penelitian yang terstruktur dan terukur.</p></div></div></div></div></div></section><section class="py-20 border-b" style="${ssrRenderStyle({ "background-color": "var(--color-paper-2)", "border-color": "var(--color-rule)" })}"${_scopeId}><div class="container mx-auto px-4 xl:px-0"${_scopeId}><div class="flex items-center justify-between mb-12"${_scopeId}><div${_scopeId}><span class="font-mono text-xs uppercase tracking-wider block mb-1" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}>♦ ringkasan kinerja</span><h2 class="text-2xl sm:text-3xl font-semibold" style="${ssrRenderStyle({ "font-family": "var(--font-display)", "color": "var(--color-ink)", "letter-spacing": "-0.02em" })}"${_scopeId}>Capaian <span style="${ssrRenderStyle({ "color": "var(--color-accent)" })}"${_scopeId}>Publikasi</span></h2></div></div><div class="grid grid-cols-1 md:grid-cols-3 gap-6"${_scopeId}><div class="p-8 rounded-card border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md" style="${ssrRenderStyle({ "border-color": "var(--color-rule)", "background-color": "var(--color-paper)" })}"${_scopeId}><div class="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style="${ssrRenderStyle({ "background-color": "var(--color-paper-2)", "color": "var(--color-accent)" })}"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:folder-open-bold-duotone",
              class: "w-6 h-6"
            }, null, _parent2, _scopeId));
            _push2(`</div><span class="font-display text-4xl font-bold block" style="${ssrRenderStyle({ "color": "var(--color-accent)", "letter-spacing": "-0.03em" })}"${_scopeId}>${ssrInterpolate(__props.summary.total_published || 0)}</span><span class="font-mono text-xs uppercase tracking-wider block mt-2" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}>Total Kajian Terbit</span><p class="text-xs mt-3 leading-relaxed" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}>Seluruh dokumen kajian dan penelitian yang telah diverifikasi dan dipublikasikan untuk umum.</p></div><div class="p-8 rounded-card border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md" style="${ssrRenderStyle({ "border-color": "var(--color-rule)", "background-color": "var(--color-paper)" })}"${_scopeId}><div class="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style="${ssrRenderStyle({ "background-color": "rgba(16, 185, 129, 0.1)", "color": "#10B981" })}"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:eye-bold-duotone",
              class: "w-6 h-6"
            }, null, _parent2, _scopeId));
            _push2(`</div><span class="font-display text-4xl font-bold block style=&#39;color: #10B981;&#39; letter-spacing: -0.03em;"${_scopeId}>${ssrInterpolate(__props.summary.total_views || 0)}</span><span class="font-mono text-xs uppercase tracking-wider block mt-2" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}>Total Kunjungan</span><p class="text-xs mt-3 leading-relaxed" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}>Akumulasi penelusuran dan pembacaan dari akademisi, peneliti, dan masyarakat umum.</p></div><div class="p-8 rounded-card border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md" style="${ssrRenderStyle({ "border-color": "var(--color-rule)", "background-color": "var(--color-paper)" })}"${_scopeId}><div class="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style="${ssrRenderStyle({ "background-color": "rgba(59, 130, 246, 0.1)", "color": "#3B82F6" })}"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:download-bold-duotone",
              class: "w-6 h-6"
            }, null, _parent2, _scopeId));
            _push2(`</div><span class="font-display text-4xl font-bold block style=&#39;color: #3B82F6;&#39; letter-spacing: -0.03em;"${_scopeId}>${ssrInterpolate(__props.summary.total_downloads || 0)}</span><span class="font-mono text-xs uppercase tracking-wider block mt-2" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}>Total Unduhan</span><p class="text-xs mt-3 leading-relaxed" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}>Naskah dokumen publikasi yang telah diunduh oleh pengguna portal.</p></div></div></div></section><section class="py-20 border-b" style="${ssrRenderStyle({ "background-color": "var(--color-paper)", "border-color": "var(--color-rule)" })}"${_scopeId}><div class="container mx-auto px-4 xl:px-0"${_scopeId}><div class="flex items-center justify-between mb-12"${_scopeId}><div${_scopeId}><span class="font-mono text-xs uppercase tracking-wider block mb-1" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}>♦ pengelompokan</span><h2 class="text-2xl sm:text-3xl font-semibold" style="${ssrRenderStyle({ "font-family": "var(--font-display)", "color": "var(--color-ink)", "letter-spacing": "-0.02em" })}"${_scopeId}>Klaster Bidang <span style="${ssrRenderStyle({ "color": "var(--color-accent)" })}"${_scopeId}>Penelitian</span></h2></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("portal.kajian"),
              class: "text-xs font-bold uppercase tracking-wider transition-colors shrink-0 flex items-center gap-1",
              style: { "color": "var(--color-accent)" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Lihat semua → `);
                } else {
                  return [
                    createTextVNode(" Lihat semua → ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"${_scopeId}><!--[-->`);
            ssrRenderList(__props.bidangs, (b) => {
              _push2(ssrRenderComponent(unref(Link), {
                key: b.id,
                href: _ctx.route("portal.kajian", { bidang_id: b.id }),
                class: "p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-md group flex flex-col justify-between",
                style: { "border-color": "var(--color-rule)", "background-color": "var(--color-paper-2)" }
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div${_scopeId2}><div class="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110" style="${ssrRenderStyle({ "border": "1px solid var(--color-rule)", "background-color": "var(--color-paper)", "color": "var(--color-accent)" })}"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_Icon, {
                      icon: "solar:folder-with-files-bold-duotone",
                      class: "w-6 h-6"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div><h4 class="font-semibold text-base leading-snug group-hover:text-emerald-600 transition-colors" style="${ssrRenderStyle({ "color": "var(--color-ink)" })}"${_scopeId2}>${ssrInterpolate(b.nama)}</h4><p class="text-xs mt-2.5 leading-relaxed line-clamp-3" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId2}>${ssrInterpolate(b.deskripsi || "Dokumen kajian daerah dalam rumpun " + b.nama)}</p></div><div class="mt-6 pt-4 border-t flex items-center justify-between text-xs font-mono uppercase tracking-wider" style="${ssrRenderStyle({ "border-color": "var(--color-rule)", "color": "var(--color-ink-2)" })}"${_scopeId2}><span${_scopeId2}>Jelajahi Berkas</span><span class="group-hover:translate-x-1 transition-transform"${_scopeId2}>→</span></div>`);
                  } else {
                    return [
                      createVNode("div", null, [
                        createVNode("div", {
                          class: "w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110",
                          style: { "border": "1px solid var(--color-rule)", "background-color": "var(--color-paper)", "color": "var(--color-accent)" }
                        }, [
                          createVNode(_component_Icon, {
                            icon: "solar:folder-with-files-bold-duotone",
                            class: "w-6 h-6"
                          })
                        ]),
                        createVNode("h4", {
                          class: "font-semibold text-base leading-snug group-hover:text-emerald-600 transition-colors",
                          style: { "color": "var(--color-ink)" }
                        }, toDisplayString(b.nama), 1),
                        createVNode("p", {
                          class: "text-xs mt-2.5 leading-relaxed line-clamp-3",
                          style: { "color": "var(--color-ink-2)" }
                        }, toDisplayString(b.deskripsi || "Dokumen kajian daerah dalam rumpun " + b.nama), 1)
                      ]),
                      createVNode("div", {
                        class: "mt-6 pt-4 border-t flex items-center justify-between text-xs font-mono uppercase tracking-wider",
                        style: { "border-color": "var(--color-rule)", "color": "var(--color-ink-2)" }
                      }, [
                        createVNode("span", null, "Jelajahi Berkas"),
                        createVNode("span", { class: "group-hover:translate-x-1 transition-transform" }, "→")
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--></div></div></section><section class="py-20 border-b" style="${ssrRenderStyle({ "background-color": "var(--color-paper-2)", "border-color": "var(--color-rule)" })}"${_scopeId}><div class="container mx-auto px-4 xl:px-0 grid grid-cols-1 lg:grid-cols-3 gap-12"${_scopeId}><div class="lg:col-span-2"${_scopeId}><div class="flex items-center justify-between pb-5 border-b" style="${ssrRenderStyle({ "border-color": "var(--color-rule)" })}"${_scopeId}><div${_scopeId}><span class="font-mono text-xs uppercase tracking-wider block mb-1" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}>♦ publikasi terbaru</span><h3 class="text-xl font-semibold" style="${ssrRenderStyle({ "font-family": "var(--font-display)", "color": "var(--color-ink)", "letter-spacing": "-0.02em" })}"${_scopeId}>Kajian Terbaru</h3></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("portal.kajian"),
              class: "text-xs font-bold uppercase tracking-wider transition-colors",
              style: { "color": "var(--color-accent)" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Lihat Semua →`);
                } else {
                  return [
                    createTextVNode("Lihat Semua →")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"${_scopeId}><!--[-->`);
            ssrRenderList(__props.recentKajians, (item) => {
              var _a, _b;
              _push2(`<div class="p-6 rounded-card border transition-all duration-300 hover:shadow-md flex flex-col justify-between group" style="${ssrRenderStyle({ "border-color": "var(--color-rule)", "background-color": "var(--color-paper)" })}"${_scopeId}><div${_scopeId}><span class="px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50"${_scopeId}>${ssrInterpolate((_a = item.jenis_kajian) == null ? void 0 : _a.nama)}</span><h4 class="font-semibold text-base mt-4 leading-snug line-clamp-2 group-hover:text-emerald-600 transition-colors" style="${ssrRenderStyle({ "color": "var(--color-ink)" })}"${_scopeId}>`);
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
              _push2(`</h4><p class="text-xs mt-3 leading-relaxed line-clamp-2" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}>${ssrInterpolate(item.ringkasan)}</p></div><div class="mt-6 pt-4 border-t flex items-center justify-between text-xs" style="${ssrRenderStyle({ "border-color": "var(--color-rule)", "color": "var(--color-ink-2)" })}"${_scopeId}><span class="font-mono"${_scopeId}>${ssrInterpolate((_b = item.tahun) == null ? void 0 : _b.tahun)}</span>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("portal.detail", item.slug),
                class: "font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform",
                style: { "color": "var(--color-accent)" }
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Selengkapnya → `);
                  } else {
                    return [
                      createTextVNode(" Selengkapnya → ")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div></div>`);
            });
            _push2(`<!--]--></div></div><div${_scopeId}><div class="pb-5 border-b" style="${ssrRenderStyle({ "border-color": "var(--color-rule)" })}"${_scopeId}><span class="font-mono text-xs uppercase tracking-wider block mb-1" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}>♦ paling banyak diunduh</span><h3 class="text-xl font-semibold" style="${ssrRenderStyle({ "font-family": "var(--font-display)", "color": "var(--color-ink)", "letter-spacing": "-0.02em" })}"${_scopeId}>Kajian Populer</h3></div><div class="mt-8 space-y-4"${_scopeId}><!--[-->`);
            ssrRenderList(__props.popularKajians, (item) => {
              var _a, _b;
              _push2(`<div class="p-4 rounded-xl border transition-colors hover:border-emerald-500/50 flex items-start gap-4" style="${ssrRenderStyle({ "border-color": "var(--color-rule)", "background-color": "var(--color-paper)" })}"${_scopeId}><div class="p-3 rounded-lg shrink-0" style="${ssrRenderStyle({ "border": "1px solid var(--color-rule)", "background-color": "var(--color-paper-2)", "color": "var(--color-accent)" })}"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                icon: "solar:document-bold-duotone",
                class: "w-5 h-5"
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="min-w-0 flex-grow"${_scopeId}><h4 class="font-semibold text-xs leading-snug line-clamp-2" style="${ssrRenderStyle({ "color": "var(--color-ink)" })}"${_scopeId}>`);
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
              _push2(`</h4><div class="flex items-center justify-between mt-2.5 text-[11px]" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}><span class="font-mono"${_scopeId}>${ssrInterpolate((_a = item.tahun) == null ? void 0 : _a.tahun)} · ${ssrInterpolate((_b = item.bidang) == null ? void 0 : _b.nama)}</span><span class="font-bold flex items-center gap-1 text-emerald-600 dark:text-emerald-450"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                icon: "solar:download-bold",
                class: "w-3.5 h-3.5"
              }, null, _parent2, _scopeId));
              _push2(`${ssrInterpolate(item.download_count)}</span></div></div></div>`);
            });
            _push2(`<!--]--></div></div></div></section>`);
          } else {
            return [
              createVNode("section", {
                style: { "background-color": "var(--color-paper)" },
                class: "relative overflow-hidden"
              }, [
                createVNode("div", { class: "absolute right-0 top-0 w-1/3 h-full pointer-events-none opacity-[0.04] dark:opacity-[0.02] overflow-hidden hidden lg:block" }, [
                  (openBlock(), createBlock("svg", {
                    class: "w-full h-full",
                    viewBox: "0 0 100 100",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "0.3"
                  }, [
                    createVNode("circle", {
                      cx: "50",
                      cy: "50",
                      r: "40",
                      "stroke-dasharray": "2 2"
                    }),
                    createVNode("circle", {
                      cx: "50",
                      cy: "50",
                      r: "28"
                    }),
                    createVNode("line", {
                      x1: "10",
                      y1: "50",
                      x2: "90",
                      y2: "50"
                    }),
                    createVNode("line", {
                      x1: "50",
                      y1: "10",
                      x2: "50",
                      y2: "90"
                    }),
                    createVNode("polygon", {
                      points: "50,15 85,50 50,85 15,50",
                      "stroke-dasharray": "1 1"
                    }),
                    createVNode("ellipse", {
                      cx: "50",
                      cy: "50",
                      rx: "38",
                      ry: "12",
                      transform: "rotate(30, 50, 50)"
                    }),
                    createVNode("ellipse", {
                      cx: "50",
                      cy: "50",
                      rx: "38",
                      ry: "12",
                      transform: "rotate(-30, 50, 50)"
                    })
                  ]))
                ]),
                createVNode("div", { class: "container mx-auto px-4 xl:px-0 pt-20 pb-20 md:pt-28 md:pb-24" }, [
                  createVNode("div", { class: "flex flex-wrap items-center gap-3 mb-6" }, [
                    createVNode("div", {
                      class: "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase border",
                      style: { "background-color": "var(--color-paper-2)", "border-color": "var(--color-rule)", "color": "var(--color-ink)" }
                    }, [
                      createVNode(_component_Icon, {
                        icon: "solar:globus-bold-duotone",
                        class: "w-4 h-4 text-emerald-600 dark:text-emerald-450"
                      }),
                      createVNode("span", null, "Portal Kajian & Riset Pembangunan Kota Samarinda")
                    ]),
                    createVNode("div", {
                      class: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase border",
                      style: { "color": "var(--color-ink-2)", "border-color": "var(--color-rule)", "background-color": "var(--color-paper)" }
                    }, [
                      createVNode("span", { class: "w-2 h-2 rounded-full bg-emerald-500 animate-pulse" }),
                      createVNode("span", null, [
                        createTextVNode("LIVE · "),
                        createVNode("strong", { style: { "color": "var(--color-accent)" } }, toDisplayString(__props.summary.total_published || 0), 1),
                        createTextVNode(" DOKUMEN TERBIT")
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center" }, [
                    createVNode("div", { class: "lg:col-span-3" }, [
                      createVNode("h1", {
                        class: "text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.08] tracking-tight",
                        style: { "font-family": "var(--font-display)", "color": "var(--color-ink)", "letter-spacing": "-0.03em" }
                      }, [
                        createTextVNode(" Akses Riset & "),
                        createVNode("br"),
                        createVNode("span", { style: { "color": "var(--color-accent)" } }, "Kajian Daerah")
                      ]),
                      createVNode("p", {
                        class: "mt-5 text-base sm:text-lg leading-relaxed max-w-lg",
                        style: { "color": "var(--color-ink-2)" }
                      }, " Telusuri naskah akademis, rencana penelitian strategis, dan rekomendasi kebijakan daerah untuk transparansi dan perumusan keputusan berbasis bukti. "),
                      createVNode("div", { class: "mt-8" }, [
                        createVNode("form", {
                          onSubmit: withModifiers(($event) => search(), ["prevent"]),
                          class: "flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-1.5 rounded-xl border transition-all shadow-sm focus-within:shadow-md",
                          style: { "border-color": "var(--color-rule)", "background-color": "var(--color-paper-2)", "max-width": "30rem" }
                        }, [
                          createVNode("div", { class: "flex-1 flex items-center gap-3 px-3 py-2 sm:py-0" }, [
                            createVNode(_component_Icon, {
                              icon: "solar:magnifer-linear",
                              class: "w-5 h-5 shrink-0",
                              style: { "color": "var(--color-ink-2)" }
                            }),
                            withDirectives(createVNode("input", {
                              type: "text",
                              "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                              placeholder: "Cari judul kajian, abstrak, kata kunci...",
                              class: "w-full bg-transparent border-0 focus:ring-0 text-sm p-0",
                              style: { "color": "var(--color-ink)" }
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, searchQuery.value]
                            ])
                          ]),
                          createVNode("button", {
                            type: "submit",
                            class: "px-6 py-3 text-xs font-bold uppercase tracking-wider rounded-lg transition-all shrink-0 active:scale-[0.98]",
                            style: { "background-color": "var(--color-accent)", "color": "var(--color-accent-ink)" }
                          }, " Cari Kajian ")
                        ], 40, ["onSubmit"]),
                        createVNode("div", {
                          class: "flex flex-wrap items-center gap-2 mt-4 text-xs",
                          style: { "color": "var(--color-ink-2)" }
                        }, [
                          createVNode("span", {
                            class: "font-medium text-[11px] uppercase tracking-wider",
                            style: { "color": "var(--color-ink-2)" }
                          }, "Populer:"),
                          (openBlock(), createBlock(Fragment, null, renderList(["Infrastruktur", "Ekonomi", "Perikanan", "Kebijakan Publik"], (chip) => {
                            return createVNode("button", {
                              key: chip,
                              onClick: ($event) => search(chip),
                              class: "px-2.5 py-1 rounded-full border text-[11px] transition-colors hover:border-emerald-500 hover:text-emerald-600",
                              style: { "border-color": "var(--color-rule)", "background-color": "var(--color-paper)" }
                            }, toDisplayString(chip), 9, ["onClick"]);
                          }), 64))
                        ])
                      ]),
                      createVNode("div", {
                        class: "flex items-center gap-6 mt-6 pt-6 border-t text-xs font-mono uppercase tracking-wider",
                        style: { "border-color": "var(--color-rule)", "color": "var(--color-ink-2)" }
                      }, [
                        createVNode("span", { class: "flex items-center gap-1.5" }, [
                          createVNode(_component_Icon, {
                            icon: "solar:check-circle-bold",
                            class: "w-3.5 h-3.5 text-emerald-500"
                          }),
                          createTextVNode(" Akses Terbuka")
                        ]),
                        createVNode("span", { class: "flex items-center gap-1.5" }, [
                          createVNode(_component_Icon, {
                            icon: "solar:check-circle-bold",
                            class: "w-3.5 h-3.5 text-emerald-500"
                          }),
                          createTextVNode(" Tanpa Login")
                        ]),
                        createVNode("span", { class: "flex items-center gap-1.5" }, [
                          createVNode(_component_Icon, {
                            icon: "solar:check-circle-bold",
                            class: "w-3.5 h-3.5 text-emerald-500"
                          }),
                          createTextVNode(" Berkas Valid")
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "lg:col-span-2" }, [
                      createVNode("div", {
                        class: "p-6 rounded-card border shadow-sm transition-all hover:shadow-md",
                        style: { "border-color": "var(--color-rule)", "background-color": "var(--color-paper)" }
                      }, [
                        createVNode("div", {
                          class: "flex items-center justify-between pb-4 mb-4 border-b",
                          style: { "border-color": "var(--color-rule)" }
                        }, [
                          createVNode("div", null, [
                            createVNode("span", {
                              class: "font-mono text-[11px] uppercase tracking-wider block",
                              style: { "color": "var(--color-ink-2)" }
                            }, "Index Publikasi"),
                            createVNode("span", {
                              class: "text-sm font-semibold block",
                              style: { "color": "var(--color-ink)" }
                            }, "BAPPERIDA Samarinda")
                          ]),
                          createVNode("span", { class: "font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded border font-bold text-emerald-600 border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/30" }, "Official")
                        ]),
                        createVNode("div", { class: "space-y-4" }, [
                          createVNode("div", {
                            class: "flex justify-between items-center py-2 border-b",
                            style: { "border-color": "var(--color-rule)" }
                          }, [
                            createVNode("span", {
                              class: "text-xs font-medium",
                              style: { "color": "var(--color-ink-2)" }
                            }, "Total Kajian Terbit"),
                            createVNode("strong", {
                              class: "text-2xl font-bold font-display",
                              style: { "color": "var(--color-ink)" }
                            }, toDisplayString(__props.summary.total_published || 0), 1)
                          ]),
                          createVNode("div", {
                            class: "flex justify-between items-center py-2 border-b",
                            style: { "border-color": "var(--color-rule)" }
                          }, [
                            createVNode("span", {
                              class: "text-xs font-medium",
                              style: { "color": "var(--color-ink-2)" }
                            }, "Total Kunjungan"),
                            createVNode("strong", {
                              class: "text-2xl font-bold font-display",
                              style: { "color": "#10B981" }
                            }, toDisplayString(__props.summary.total_views || 0), 1)
                          ]),
                          createVNode("div", { class: "flex justify-between items-center py-2" }, [
                            createVNode("span", {
                              class: "text-xs font-medium",
                              style: { "color": "var(--color-ink-2)" }
                            }, "Total Unduhan Berkas"),
                            createVNode("strong", {
                              class: "text-2xl font-bold font-display",
                              style: { "color": "#3B82F6" }
                            }, toDisplayString(__props.summary.total_downloads || 0), 1)
                          ])
                        ]),
                        createVNode("div", {
                          class: "mt-6 pt-4 border-t",
                          style: { "border-color": "var(--color-rule)" }
                        }, [
                          createVNode("div", {
                            class: "w-full h-2 rounded-full overflow-hidden",
                            style: { "background-color": "var(--color-rule)" }
                          }, [
                            createVNode("div", {
                              class: "h-full rounded-full transition-all duration-500",
                              style: { "width": "78%", "background-color": "var(--color-accent)" }
                            })
                          ]),
                          createVNode("p", {
                            class: "text-[11px] font-mono uppercase tracking-wider mt-2.5 flex items-center justify-between",
                            style: { "color": "var(--color-ink-2)" }
                          }, [
                            createVNode("span", null, toDisplayString(__props.bidangs.length) + " Rumpun Bidang Aktif", 1),
                            createVNode("span", null, "100% Keterbukaan")
                          ])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", {
                    class: "mt-16 py-3 border-y overflow-hidden",
                    style: { "border-color": "var(--color-rule)" }
                  }, [
                    createVNode("div", {
                      class: "flex gap-12 animate-marquee whitespace-nowrap font-mono text-xs uppercase tracking-widest",
                      style: { "color": "var(--color-ink-2)" }
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.recentKajians, (item, index) => {
                        return openBlock(), createBlock("span", {
                          key: item.id,
                          class: "inline-flex items-center gap-3"
                        }, [
                          createVNode("span", {
                            class: "font-semibold",
                            style: { "color": "var(--color-ink)" }
                          }, toDisplayString(item.judul), 1),
                          createVNode("span", { class: "text-emerald-500" }, "✦")
                        ]);
                      }), 128)),
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.recentKajians, (item, index) => {
                        return openBlock(), createBlock("span", {
                          key: "dup-" + item.id,
                          class: "inline-flex items-center gap-3"
                        }, [
                          createVNode("span", {
                            class: "font-semibold",
                            style: { "color": "var(--color-ink)" }
                          }, toDisplayString(item.judul), 1),
                          createVNode("span", { class: "text-emerald-500" }, "✦")
                        ]);
                      }), 128))
                    ])
                  ])
                ])
              ]),
              createVNode("section", {
                class: "py-20 border-b relative",
                style: { "background-color": "var(--color-paper)", "border-color": "var(--color-rule)" }
              }, [
                createVNode("div", { class: "container mx-auto px-4 xl:px-0" }, [
                  createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" }, [
                    createVNode("div", { class: "lg:col-span-5 flex items-start justify-center gap-6 sm:gap-8" }, [
                      createVNode("div", { class: "relative group text-center" }, [
                        createVNode("div", {
                          class: "overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1",
                          style: { "width": "175px", "height": "230px", "border-color": "var(--color-rule)", "background-color": "var(--color-paper-2)" }
                        }, [
                          createVNode("img", {
                            src: "https://satudata.samarindakota.go.id/img/new-walikota.png",
                            alt: "Dr. H. Andi Harun",
                            class: "w-full h-full object-cover object-[center_18%] transition-transform duration-500 group-hover:scale-105"
                          })
                        ]),
                        createVNode("h5", {
                          class: "mt-3 text-xs font-bold",
                          style: { "color": "var(--color-ink)" }
                        }, "Dr. H. Andi Harun"),
                        createVNode("p", {
                          class: "text-[10px] uppercase font-mono tracking-widest mt-0.5",
                          style: { "color": "var(--color-ink-2)" }
                        }, "Walikota Samarinda")
                      ]),
                      createVNode("div", { class: "relative group text-center" }, [
                        createVNode("div", {
                          class: "overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1",
                          style: { "width": "175px", "height": "230px", "border-color": "var(--color-rule)", "background-color": "var(--color-paper-2)" }
                        }, [
                          createVNode("img", {
                            src: "https://satudata.samarindakota.go.id/img/new-wawali.png",
                            alt: "H. Saefuddin Zuhri, S.E., M.M.",
                            class: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105",
                            style: { "object-position": "-40% 2%" }
                          })
                        ]),
                        createVNode("h5", {
                          class: "mt-3 text-xs font-bold",
                          style: { "color": "var(--color-ink)" }
                        }, "H. Saefuddin Zuhri, S.E., M.M."),
                        createVNode("p", {
                          class: "text-[10px] uppercase font-mono tracking-widest mt-0.5",
                          style: { "color": "var(--color-ink-2)" }
                        }, "Wakil Walikota Samarinda")
                      ])
                    ]),
                    createVNode("div", { class: "lg:col-span-7 space-y-6" }, [
                      createVNode("div", { class: "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400" }, [
                        createVNode("span", { class: "w-2 h-2 rounded-full bg-emerald-500" }),
                        createTextVNode(" Samarinda Kota Pusat Peradaban ")
                      ]),
                      createVNode("h2", {
                        class: "text-3xl sm:text-4xl font-semibold tracking-tight leading-snug",
                        style: { "font-family": "var(--font-display)", "color": "var(--color-ink)", "letter-spacing": "-0.02em" }
                      }, [
                        createTextVNode(" Mewujudkan Kebijakan Berbasis "),
                        createVNode("br"),
                        createVNode("span", { style: { "color": "var(--color-accent)" } }, "Data & Riset Ilmiah")
                      ]),
                      createVNode("p", {
                        class: "text-sm sm:text-base leading-relaxed",
                        style: { "color": "var(--color-ink-2)" }
                      }, [
                        createTextVNode(" Pemerintah Kota Samarinda berkomitmen meningkatkan kualitas tata kelola pemerintahan yang transparan dan akuntabel. Melalui portal "),
                        createVNode("strong", null, "SIKAJIAN"),
                        createTextVNode(", dokumen hasil penelitian, kajian akademis, dan naskah rekomendasi kebijakan dipublikasikan secara luas untuk mendorong kolaborasi antara pemerintah, akademisi, dan masyarakat. ")
                      ]),
                      createVNode("div", {
                        class: "grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t",
                        style: { "border-color": "var(--color-rule)" }
                      }, [
                        createVNode("div", {
                          class: "p-4 rounded-xl border",
                          style: { "border-color": "var(--color-rule)", "background-color": "var(--color-paper-2)" }
                        }, [
                          createVNode("h5", {
                            class: "text-xs font-bold uppercase font-mono tracking-wider",
                            style: { "color": "var(--color-ink)" }
                          }, "Prinsip Pembangunan"),
                          createVNode("p", {
                            class: "text-xs mt-1.5 leading-relaxed",
                            style: { "color": "var(--color-ink-2)" }
                          }, "Objektivitas, Akurasi Data, dan Kemanfaatan Publik secara inklusif.")
                        ]),
                        createVNode("div", {
                          class: "p-4 rounded-xl border",
                          style: { "border-color": "var(--color-rule)", "background-color": "var(--color-paper-2)" }
                        }, [
                          createVNode("h5", {
                            class: "text-xs font-bold uppercase font-mono tracking-wider",
                            style: { "color": "var(--color-ink)" }
                          }, "Rencana Strategis"),
                          createVNode("p", {
                            class: "text-xs mt-1.5 leading-relaxed",
                            style: { "color": "var(--color-ink-2)" }
                          }, "Mendukung RPJMD Kota Samarinda melalui penelitian yang terstruktur dan terukur.")
                        ])
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode("section", {
                class: "py-20 border-b",
                style: { "background-color": "var(--color-paper-2)", "border-color": "var(--color-rule)" }
              }, [
                createVNode("div", { class: "container mx-auto px-4 xl:px-0" }, [
                  createVNode("div", { class: "flex items-center justify-between mb-12" }, [
                    createVNode("div", null, [
                      createVNode("span", {
                        class: "font-mono text-xs uppercase tracking-wider block mb-1",
                        style: { "color": "var(--color-ink-2)" }
                      }, "♦ ringkasan kinerja"),
                      createVNode("h2", {
                        class: "text-2xl sm:text-3xl font-semibold",
                        style: { "font-family": "var(--font-display)", "color": "var(--color-ink)", "letter-spacing": "-0.02em" }
                      }, [
                        createTextVNode("Capaian "),
                        createVNode("span", { style: { "color": "var(--color-accent)" } }, "Publikasi")
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-6" }, [
                    createVNode("div", {
                      class: "p-8 rounded-card border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md",
                      style: { "border-color": "var(--color-rule)", "background-color": "var(--color-paper)" }
                    }, [
                      createVNode("div", {
                        class: "w-12 h-12 rounded-xl flex items-center justify-center mb-6",
                        style: { "background-color": "var(--color-paper-2)", "color": "var(--color-accent)" }
                      }, [
                        createVNode(_component_Icon, {
                          icon: "solar:folder-open-bold-duotone",
                          class: "w-6 h-6"
                        })
                      ]),
                      createVNode("span", {
                        class: "font-display text-4xl font-bold block",
                        style: { "color": "var(--color-accent)", "letter-spacing": "-0.03em" }
                      }, toDisplayString(__props.summary.total_published || 0), 1),
                      createVNode("span", {
                        class: "font-mono text-xs uppercase tracking-wider block mt-2",
                        style: { "color": "var(--color-ink-2)" }
                      }, "Total Kajian Terbit"),
                      createVNode("p", {
                        class: "text-xs mt-3 leading-relaxed",
                        style: { "color": "var(--color-ink-2)" }
                      }, "Seluruh dokumen kajian dan penelitian yang telah diverifikasi dan dipublikasikan untuk umum.")
                    ]),
                    createVNode("div", {
                      class: "p-8 rounded-card border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md",
                      style: { "border-color": "var(--color-rule)", "background-color": "var(--color-paper)" }
                    }, [
                      createVNode("div", {
                        class: "w-12 h-12 rounded-xl flex items-center justify-center mb-6",
                        style: { "background-color": "rgba(16, 185, 129, 0.1)", "color": "#10B981" }
                      }, [
                        createVNode(_component_Icon, {
                          icon: "solar:eye-bold-duotone",
                          class: "w-6 h-6"
                        })
                      ]),
                      createVNode("span", { class: "font-display text-4xl font-bold block style='color: #10B981;' letter-spacing: -0.03em;" }, toDisplayString(__props.summary.total_views || 0), 1),
                      createVNode("span", {
                        class: "font-mono text-xs uppercase tracking-wider block mt-2",
                        style: { "color": "var(--color-ink-2)" }
                      }, "Total Kunjungan"),
                      createVNode("p", {
                        class: "text-xs mt-3 leading-relaxed",
                        style: { "color": "var(--color-ink-2)" }
                      }, "Akumulasi penelusuran dan pembacaan dari akademisi, peneliti, dan masyarakat umum.")
                    ]),
                    createVNode("div", {
                      class: "p-8 rounded-card border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md",
                      style: { "border-color": "var(--color-rule)", "background-color": "var(--color-paper)" }
                    }, [
                      createVNode("div", {
                        class: "w-12 h-12 rounded-xl flex items-center justify-center mb-6",
                        style: { "background-color": "rgba(59, 130, 246, 0.1)", "color": "#3B82F6" }
                      }, [
                        createVNode(_component_Icon, {
                          icon: "solar:download-bold-duotone",
                          class: "w-6 h-6"
                        })
                      ]),
                      createVNode("span", { class: "font-display text-4xl font-bold block style='color: #3B82F6;' letter-spacing: -0.03em;" }, toDisplayString(__props.summary.total_downloads || 0), 1),
                      createVNode("span", {
                        class: "font-mono text-xs uppercase tracking-wider block mt-2",
                        style: { "color": "var(--color-ink-2)" }
                      }, "Total Unduhan"),
                      createVNode("p", {
                        class: "text-xs mt-3 leading-relaxed",
                        style: { "color": "var(--color-ink-2)" }
                      }, "Naskah dokumen publikasi yang telah diunduh oleh pengguna portal.")
                    ])
                  ])
                ])
              ]),
              createVNode("section", {
                class: "py-20 border-b",
                style: { "background-color": "var(--color-paper)", "border-color": "var(--color-rule)" }
              }, [
                createVNode("div", { class: "container mx-auto px-4 xl:px-0" }, [
                  createVNode("div", { class: "flex items-center justify-between mb-12" }, [
                    createVNode("div", null, [
                      createVNode("span", {
                        class: "font-mono text-xs uppercase tracking-wider block mb-1",
                        style: { "color": "var(--color-ink-2)" }
                      }, "♦ pengelompokan"),
                      createVNode("h2", {
                        class: "text-2xl sm:text-3xl font-semibold",
                        style: { "font-family": "var(--font-display)", "color": "var(--color-ink)", "letter-spacing": "-0.02em" }
                      }, [
                        createTextVNode("Klaster Bidang "),
                        createVNode("span", { style: { "color": "var(--color-accent)" } }, "Penelitian")
                      ])
                    ]),
                    createVNode(unref(Link), {
                      href: _ctx.route("portal.kajian"),
                      class: "text-xs font-bold uppercase tracking-wider transition-colors shrink-0 flex items-center gap-1",
                      style: { "color": "var(--color-accent)" }
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Lihat semua → ")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.bidangs, (b) => {
                      return openBlock(), createBlock(unref(Link), {
                        key: b.id,
                        href: _ctx.route("portal.kajian", { bidang_id: b.id }),
                        class: "p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-md group flex flex-col justify-between",
                        style: { "border-color": "var(--color-rule)", "background-color": "var(--color-paper-2)" }
                      }, {
                        default: withCtx(() => [
                          createVNode("div", null, [
                            createVNode("div", {
                              class: "w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110",
                              style: { "border": "1px solid var(--color-rule)", "background-color": "var(--color-paper)", "color": "var(--color-accent)" }
                            }, [
                              createVNode(_component_Icon, {
                                icon: "solar:folder-with-files-bold-duotone",
                                class: "w-6 h-6"
                              })
                            ]),
                            createVNode("h4", {
                              class: "font-semibold text-base leading-snug group-hover:text-emerald-600 transition-colors",
                              style: { "color": "var(--color-ink)" }
                            }, toDisplayString(b.nama), 1),
                            createVNode("p", {
                              class: "text-xs mt-2.5 leading-relaxed line-clamp-3",
                              style: { "color": "var(--color-ink-2)" }
                            }, toDisplayString(b.deskripsi || "Dokumen kajian daerah dalam rumpun " + b.nama), 1)
                          ]),
                          createVNode("div", {
                            class: "mt-6 pt-4 border-t flex items-center justify-between text-xs font-mono uppercase tracking-wider",
                            style: { "border-color": "var(--color-rule)", "color": "var(--color-ink-2)" }
                          }, [
                            createVNode("span", null, "Jelajahi Berkas"),
                            createVNode("span", { class: "group-hover:translate-x-1 transition-transform" }, "→")
                          ])
                        ]),
                        _: 2
                      }, 1032, ["href"]);
                    }), 128))
                  ])
                ])
              ]),
              createVNode("section", {
                class: "py-20 border-b",
                style: { "background-color": "var(--color-paper-2)", "border-color": "var(--color-rule)" }
              }, [
                createVNode("div", { class: "container mx-auto px-4 xl:px-0 grid grid-cols-1 lg:grid-cols-3 gap-12" }, [
                  createVNode("div", { class: "lg:col-span-2" }, [
                    createVNode("div", {
                      class: "flex items-center justify-between pb-5 border-b",
                      style: { "border-color": "var(--color-rule)" }
                    }, [
                      createVNode("div", null, [
                        createVNode("span", {
                          class: "font-mono text-xs uppercase tracking-wider block mb-1",
                          style: { "color": "var(--color-ink-2)" }
                        }, "♦ publikasi terbaru"),
                        createVNode("h3", {
                          class: "text-xl font-semibold",
                          style: { "font-family": "var(--font-display)", "color": "var(--color-ink)", "letter-spacing": "-0.02em" }
                        }, "Kajian Terbaru")
                      ]),
                      createVNode(unref(Link), {
                        href: _ctx.route("portal.kajian"),
                        class: "text-xs font-bold uppercase tracking-wider transition-colors",
                        style: { "color": "var(--color-accent)" }
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Lihat Semua →")
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ]),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6 mt-8" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.recentKajians, (item) => {
                        var _a, _b;
                        return openBlock(), createBlock("div", {
                          key: item.id,
                          class: "p-6 rounded-card border transition-all duration-300 hover:shadow-md flex flex-col justify-between group",
                          style: { "border-color": "var(--color-rule)", "background-color": "var(--color-paper)" }
                        }, [
                          createVNode("div", null, [
                            createVNode("span", { class: "px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50" }, toDisplayString((_a = item.jenis_kajian) == null ? void 0 : _a.nama), 1),
                            createVNode("h4", {
                              class: "font-semibold text-base mt-4 leading-snug line-clamp-2 group-hover:text-emerald-600 transition-colors",
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
                              class: "text-xs mt-3 leading-relaxed line-clamp-2",
                              style: { "color": "var(--color-ink-2)" }
                            }, toDisplayString(item.ringkasan), 1)
                          ]),
                          createVNode("div", {
                            class: "mt-6 pt-4 border-t flex items-center justify-between text-xs",
                            style: { "border-color": "var(--color-rule)", "color": "var(--color-ink-2)" }
                          }, [
                            createVNode("span", { class: "font-mono" }, toDisplayString((_b = item.tahun) == null ? void 0 : _b.tahun), 1),
                            createVNode(unref(Link), {
                              href: _ctx.route("portal.detail", item.slug),
                              class: "font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform",
                              style: { "color": "var(--color-accent)" }
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Selengkapnya → ")
                              ]),
                              _: 1
                            }, 8, ["href"])
                          ])
                        ]);
                      }), 128))
                    ])
                  ]),
                  createVNode("div", null, [
                    createVNode("div", {
                      class: "pb-5 border-b",
                      style: { "border-color": "var(--color-rule)" }
                    }, [
                      createVNode("span", {
                        class: "font-mono text-xs uppercase tracking-wider block mb-1",
                        style: { "color": "var(--color-ink-2)" }
                      }, "♦ paling banyak diunduh"),
                      createVNode("h3", {
                        class: "text-xl font-semibold",
                        style: { "font-family": "var(--font-display)", "color": "var(--color-ink)", "letter-spacing": "-0.02em" }
                      }, "Kajian Populer")
                    ]),
                    createVNode("div", { class: "mt-8 space-y-4" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.popularKajians, (item) => {
                        var _a, _b;
                        return openBlock(), createBlock("div", {
                          key: item.id,
                          class: "p-4 rounded-xl border transition-colors hover:border-emerald-500/50 flex items-start gap-4",
                          style: { "border-color": "var(--color-rule)", "background-color": "var(--color-paper)" }
                        }, [
                          createVNode("div", {
                            class: "p-3 rounded-lg shrink-0",
                            style: { "border": "1px solid var(--color-rule)", "background-color": "var(--color-paper-2)", "color": "var(--color-accent)" }
                          }, [
                            createVNode(_component_Icon, {
                              icon: "solar:document-bold-duotone",
                              class: "w-5 h-5"
                            })
                          ]),
                          createVNode("div", { class: "min-w-0 flex-grow" }, [
                            createVNode("h4", {
                              class: "font-semibold text-xs leading-snug line-clamp-2",
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
                            createVNode("div", {
                              class: "flex items-center justify-between mt-2.5 text-[11px]",
                              style: { "color": "var(--color-ink-2)" }
                            }, [
                              createVNode("span", { class: "font-mono" }, toDisplayString((_a = item.tahun) == null ? void 0 : _a.tahun) + " · " + toDisplayString((_b = item.bidang) == null ? void 0 : _b.nama), 1),
                              createVNode("span", { class: "font-bold flex items-center gap-1 text-emerald-600 dark:text-emerald-450" }, [
                                createVNode(_component_Icon, {
                                  icon: "solar:download-bold",
                                  class: "w-3.5 h-3.5"
                                }),
                                createTextVNode(toDisplayString(item.download_count), 1)
                              ])
                            ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Frontend/Portal/Home.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
