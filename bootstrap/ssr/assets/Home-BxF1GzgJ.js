import { ref, resolveComponent, unref, withCtx, createTextVNode, createVNode, toDisplayString, openBlock, createBlock, withModifiers, withDirectives, vModelText, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
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
    const search = () => {
      router.get(route("portal.search"), { q: searchQuery.value });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = resolveComponent("Icon");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Beranda Kajian & Riset" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section style="${ssrRenderStyle({ "background-color": "var(--color-paper)" })}" class="relative overflow-hidden"${_scopeId}><div class="absolute right-0 top-0 w-1/3 h-full pointer-events-none opacity-[0.04] dark:opacity-[0.02] overflow-hidden hidden lg:block"${_scopeId}><svg class="w-full h-full" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="0.3"${_scopeId}><circle cx="50" cy="50" r="40" stroke-dasharray="2 2"${_scopeId}></circle><circle cx="50" cy="50" r="28"${_scopeId}></circle><line x1="10" y1="50" x2="90" y2="50"${_scopeId}></line><line x1="50" y1="10" x2="50" y2="90"${_scopeId}></line><polygon points="50,15 85,50 50,85 15,50" stroke-dasharray="1 1"${_scopeId}></polygon><ellipse cx="50" cy="50" rx="38" ry="12" transform="rotate(30, 50, 50)"${_scopeId}></ellipse><ellipse cx="50" cy="50" rx="38" ry="12" transform="rotate(-30, 50, 50)"${_scopeId}></ellipse></svg></div><div class="container mx-auto px-4 xl:px-0 pt-28 pb-24 md:pt-32 md:pb-28"${_scopeId}><div class="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase mb-8 border" style="${ssrRenderStyle({ "background-color": "var(--color-paper-2)", "border-color": "var(--color-rule)", "color": "var(--color-ink)" })}"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:globus-bold-duotone",
              class: "w-4.5 h-4.5 text-emerald-600 dark:text-emerald-450"
            }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>Portal Kajian &amp; Riset Pembangunan Kota Samarinda</span></div><div class="flex items-center gap-2 mb-8" style="${ssrRenderStyle({ "color": "var(--color-ink-2)", "font-family": "var(--font-mono)", "font-size": "12px", "letter-spacing": "0.06em", "text-transform": "uppercase" })}"${_scopeId}><span style="${ssrRenderStyle({ "width": "7px", "height": "7px", "border-radius": "50%", "background-color": "var(--color-accent)", "display": "inline-block" })}"${_scopeId}></span><span${_scopeId}>LIVE · <strong style="${ssrRenderStyle({ "color": "var(--color-accent)" })}"${_scopeId}>${ssrInterpolate(__props.summary.total_published || 0)}</strong> DOKUMEN TERBIT</span></div><div class="grid grid-cols-1 lg:grid-cols-5 gap-16"${_scopeId}><div class="lg:col-span-3"${_scopeId}><h1 class="text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight" style="${ssrRenderStyle({ "font-family": "var(--font-display)", "color": "var(--color-ink)", "letter-spacing": "-0.03em" })}"${_scopeId}> Akses Riset &amp; <br${_scopeId}><span style="${ssrRenderStyle({ "color": "var(--color-accent)" })}"${_scopeId}>Kajian Daerah</span></h1><p class="mt-6 text-base lg:text-lg leading-relaxed max-w-lg" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}> Telusuri dokumen kajian akademis, rencana penelitian strategis, dan data inovasi daerah guna mendukung transparansi dan perumusan kebijakan yang akurat. </p><div class="flex items-center gap-3 mt-8"${_scopeId}><form class="flex-1 flex items-center" style="${ssrRenderStyle({ "border": "1px solid var(--color-rule)", "border-radius": "8px", "max-width": "28rem" })}"${_scopeId}><div class="flex-1 flex items-center gap-3 px-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:magnifer-linear",
              class: "w-5 h-5 shrink-0",
              style: { "color": "var(--color-ink-2)" }
            }, null, _parent2, _scopeId));
            _push2(`<input type="text"${ssrRenderAttr("value", searchQuery.value)} placeholder="Cari judul kajian, abstrak..." class="w-full bg-transparent border-0 focus:ring-0 py-3.5" style="${ssrRenderStyle({ "color": "var(--color-ink)", "font-size": "15px" })}"${_scopeId}></div><button type="submit" class="px-5 py-3 text-sm font-semibold shrink-0 transition-colors" style="${ssrRenderStyle({ "border-radius": "6px", "background-color": "var(--color-accent)", "color": "var(--color-accent-ink)" })}"${_scopeId}>Cari</button></form>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("portal.kajian"),
              class: "px-4 py-3 text-sm font-medium shrink-0 transition-colors",
              style: { "border": "1px solid var(--color-rule)", "border-radius": "6px", "color": "var(--color-ink)" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Jelajahi`);
                } else {
                  return [
                    createTextVNode("Jelajahi")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="flex items-center gap-6 mt-4" style="${ssrRenderStyle({ "color": "var(--color-ink-2)", "font-family": "var(--font-mono)", "font-size": "11px", "letter-spacing": "0.04em", "text-transform": "uppercase" })}"${_scopeId}><span${_scopeId}>tanpa login</span><span${_scopeId}>akses terbuka</span><span${_scopeId}>semua dokumen</span></div></div><div class="lg:col-span-2"${_scopeId}><div style="${ssrRenderStyle({ "border": "1px solid var(--color-rule)", "border-radius": "12px", "background-color": "var(--color-paper)" })}"${_scopeId}><div style="${ssrRenderStyle({ "padding": "20px 24px", "display": "flex", "align-items": "center", "justify-content": "space-between", "border-bottom": "1px solid var(--color-rule)" })}"${_scopeId}><div${_scopeId}><div style="${ssrRenderStyle({ "font-family": "var(--font-mono)", "font-size": "11px", "letter-spacing": "0.06em", "text-transform": "uppercase", "color": "var(--color-ink-2)" })}"${_scopeId}>Index Publikasi</div><div style="${ssrRenderStyle({ "font-size": "14px", "color": "var(--color-ink-2)", "margin-top": "2px" })}"${_scopeId}>BAPPERIDA Samarinda</div></div><span style="${ssrRenderStyle({ "font-family": "var(--font-mono)", "font-size": "10px", "letter-spacing": "0.06em", "text-transform": "uppercase", "border": "1px solid var(--color-rule)", "border-radius": "4px", "padding": "3px 8px", "color": "var(--color-accent)" })}"${_scopeId}>live</span></div><div style="${ssrRenderStyle({ "padding": "20px 24px" })}"${_scopeId}><div style="${ssrRenderStyle({ "display": "flex", "justify-content": "space-between", "align-items": "center", "padding": "14px 0", "border-bottom": "1px solid var(--color-rule)" })}"${_scopeId}><span style="${ssrRenderStyle({ "font-size": "15px", "color": "var(--color-ink-2)" })}"${_scopeId}>Total Kajian</span><strong style="${ssrRenderStyle({ "font-family": "var(--font-display)", "font-size": "28px", "color": "var(--color-ink)", "letter-spacing": "-0.02em" })}"${_scopeId}>${ssrInterpolate(__props.summary.total_published || 0)}</strong></div><div style="${ssrRenderStyle({ "display": "flex", "justify-content": "space-between", "align-items": "center", "padding": "14px 0", "border-bottom": "1px solid var(--color-rule)" })}"${_scopeId}><span style="${ssrRenderStyle({ "font-size": "15px", "color": "var(--color-ink-2)" })}"${_scopeId}>Kunjungan</span><strong style="${ssrRenderStyle({ "font-family": "var(--font-display)", "font-size": "28px", "color": "var(--color-ink)", "letter-spacing": "-0.02em" })}"${_scopeId}>${ssrInterpolate(__props.summary.total_views || 0)}</strong></div><div style="${ssrRenderStyle({ "display": "flex", "justify-content": "space-between", "align-items": "center", "padding": "14px 0" })}"${_scopeId}><span style="${ssrRenderStyle({ "font-size": "15px", "color": "var(--color-ink-2)" })}"${_scopeId}>Unduhan</span><strong style="${ssrRenderStyle({ "font-family": "var(--font-display)", "font-size": "28px", "color": "var(--color-ink)", "letter-spacing": "-0.02em" })}"${_scopeId}>${ssrInterpolate(__props.summary.total_downloads || 0)}</strong></div></div><div style="${ssrRenderStyle({ "padding": "0 24px 20px" })}"${_scopeId}><div style="${ssrRenderStyle({ "height": "6px", "border-radius": "3px", "background-color": "var(--color-rule)", "overflow": "hidden" })}"${_scopeId}><div style="${ssrRenderStyle({ "height": "100%", "width": "64%", "border-radius": "3px", "background-color": "var(--color-accent)" })}"${_scopeId}></div></div><div style="${ssrRenderStyle({ "font-family": "var(--font-mono)", "font-size": "11px", "letter-spacing": "0.06em", "text-transform": "uppercase", "color": "var(--color-ink-2)", "margin-top": "8px" })}"${_scopeId}>${ssrInterpolate(__props.bidangs.length)} bidang penelitian aktif</div></div></div></div></div><div style="${ssrRenderStyle({ "margin-top": "60px", "border-top": "1px solid var(--color-rule)", "border-bottom": "1px solid var(--color-rule)", "overflow": "hidden", "padding": "14px 0" })}"${_scopeId}><div style="${ssrRenderStyle({ "display": "flex", "gap": "56px", "animation": "marquee 40s linear infinite", "white-space": "nowrap", "font-family": "var(--font-mono)", "font-size": "12px", "letter-spacing": "0.1em", "color": "var(--color-ink-2)", "text-transform": "uppercase" })}"${_scopeId}><!--[-->`);
            ssrRenderList(__props.recentKajians, (item, index) => {
              _push2(`<span${_scopeId}>${ssrInterpolate(item.judul)} `);
              if (index < __props.recentKajians.length - 1) {
                _push2(`<span style="${ssrRenderStyle({ "color": "var(--color-accent)", "margin": "0 8px" })}"${_scopeId}>✦</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</span>`);
            });
            _push2(`<!--]--><!--[-->`);
            ssrRenderList(__props.recentKajians, (item, index) => {
              _push2(`<span${_scopeId}>${ssrInterpolate(item.judul)} `);
              if (index < __props.recentKajians.length - 1) {
                _push2(`<span style="${ssrRenderStyle({ "color": "var(--color-accent)", "margin": "0 8px" })}"${_scopeId}>✦</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</span>`);
            });
            _push2(`<!--]--></div></div></div></section><section style="${ssrRenderStyle({ "background-color": "var(--color-paper)", "padding": "80px 0", "border-top": "1px solid var(--color-rule)", "border-bottom": "1px solid var(--color-rule)" })}"${_scopeId}><div class="container mx-auto px-4 xl:px-0"${_scopeId}><div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"${_scopeId}><div class="lg:col-span-5 flex items-end justify-center gap-6"${_scopeId}><div class="relative group text-center"${_scopeId}><div class="overflow-hidden rounded-card border border-gray-150 dark:border-gray-700 bg-gray-50 dark:bg-gray-800" style="${ssrRenderStyle({ "width": "170px", "height": "230px" })}"${_scopeId}><img src="https://satudata.samarindakota.go.id/img/new-walikota.png" alt="Dr. H. Andi Harun" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"${_scopeId}></div><p class="mt-3 text-xs font-bold" style="${ssrRenderStyle({ "color": "var(--color-ink)" })}"${_scopeId}>Dr. H. Andi Harun</p><p class="text-[10px] uppercase tracking-widest" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}>Walikota Samarinda</p></div><div class="relative group text-center"${_scopeId}><div class="overflow-hidden rounded-card border border-gray-150 dark:border-gray-700 bg-gray-50 dark:bg-gray-800" style="${ssrRenderStyle({ "width": "170px", "height": "230px" })}"${_scopeId}><img src="https://satudata.samarindakota.go.id/img/new-wawali.png" alt="Dr. H. Rusmadi, M.S." class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"${_scopeId}></div><p class="mt-3 text-xs font-bold" style="${ssrRenderStyle({ "color": "var(--color-ink)" })}"${_scopeId}>Dr. H. Rusmadi, M.S.</p><p class="text-[10px] uppercase tracking-widest" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}>Wakil Walikota Samarinda</p></div></div><div class="lg:col-span-7 space-y-6"${_scopeId}><div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase" style="${ssrRenderStyle({ "background-color": "rgba(16, 185, 129, 0.08)", "border": "1px solid rgba(16, 185, 129, 0.15)", "color": "#10B981" })}"${_scopeId}><span style="${ssrRenderStyle({ "width": "6px", "height": "6px", "border-radius": "50%", "background-color": "#10B981", "display": "inline-block" })}"${_scopeId}></span> Samarinda Kota Pusat Peradaban </div><h3 class="text-3xl font-semibold tracking-tight" style="${ssrRenderStyle({ "font-family": "var(--font-display)", "color": "var(--color-ink)", "letter-spacing": "-0.02em" })}"${_scopeId}> Mewujudkan Kebijakan Berbasis <span style="${ssrRenderStyle({ "color": "var(--color-accent)" })}"${_scopeId}>Data &amp; Riset Ilmiah</span></h3><p class="text-sm leading-relaxed" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}> Pemerintah Kota Samarinda berkomitmen untuk terus meningkatkan kualitas tata kelola pemerintahan yang transparan dan akuntabel. Melalui portal <strong${_scopeId}>SIKAJIAN</strong>, setiap dokumen hasil penelitian, kajian akademis, dan naskah rekomendasi kebijakan dipublikasikan secara luas untuk mendorong kolaborasi antara pemerintah, akademisi, dan masyarakat guna membangun Samarinda sebagai Kota Pusat Peradaban. </p><div class="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t" style="${ssrRenderStyle({ "border-color": "var(--color-rule)" })}"${_scopeId}><div${_scopeId}><h5 class="text-xs font-bold uppercase tracking-wider" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}>Prinsip Pembangunan</h5><p class="text-xs mt-1" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}>Objektivitas, Akurasi Data, dan Kemanfaatan Publik secara inklusif.</p></div><div${_scopeId}><h5 class="text-xs font-bold uppercase tracking-wider" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}>Rencana Strategis</h5><p class="text-xs mt-1" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}>Mendukung RPJMD Kota Samarinda melalui kajian yang terstruktur dan terukur.</p></div></div></div></div></div></section><section style="${ssrRenderStyle({ "background-color": "var(--color-paper-2)", "border-top": "1px solid var(--color-rule)", "padding": "80px 0" })}"${_scopeId}><div class="container mx-auto px-4 xl:px-0"${_scopeId}><div class="flex items-center justify-between mb-12"${_scopeId}><div${_scopeId}><span style="${ssrRenderStyle({ "font-family": "var(--font-mono)", "font-size": "12px", "letter-spacing": "0.06em", "text-transform": "uppercase", "color": "var(--color-ink-2)", "display": "block", "margin-bottom": "4px" })}"${_scopeId}>♦ ringkasan</span><h2 class="text-2xl font-semibold" style="${ssrRenderStyle({ "font-family": "var(--font-display)", "color": "var(--color-ink)", "letter-spacing": "-0.02em" })}"${_scopeId}>Capaian <span style="${ssrRenderStyle({ "color": "var(--color-accent)" })}"${_scopeId}>Publikasi</span></h2></div></div><div class="grid grid-cols-1 md:grid-cols-3 gap-5"${_scopeId}><div class="p-8" style="${ssrRenderStyle({ "border": "1px solid var(--color-rule)", "border-radius": "12px", "background-color": "var(--color-paper)" })}"${_scopeId}><span style="${ssrRenderStyle({ "font-family": "var(--font-display)", "font-size": "44px", "font-weight": "600", "color": "var(--color-accent)", "letter-spacing": "-0.03em" })}"${_scopeId}>${ssrInterpolate(__props.summary.total_published || 0)}</span><span style="${ssrRenderStyle({ "font-family": "var(--font-mono)", "font-size": "12px", "letter-spacing": "0.06em", "text-transform": "uppercase", "color": "var(--color-ink-2)", "display": "block", "margin-top": "4px" })}"${_scopeId}>Total Kajian</span><p style="${ssrRenderStyle({ "font-size": "14px", "color": "var(--color-ink-2)", "margin-top": "10px", "line-height": "1.6" })}"${_scopeId}>Seluruh dokumen kajian dan penelitian yang telah diterbitkan dan dapat diakses publik.</p></div><div class="p-8" style="${ssrRenderStyle({ "border": "1px solid var(--color-rule)", "border-radius": "12px", "background-color": "var(--color-paper)" })}"${_scopeId}><span style="${ssrRenderStyle({ "font-family": "var(--font-display)", "font-size": "44px", "font-weight": "600", "color": "var(--color-accent)", "letter-spacing": "-0.03em" })}"${_scopeId}>${ssrInterpolate(__props.summary.total_views || 0)}</span><span style="${ssrRenderStyle({ "font-family": "var(--font-mono)", "font-size": "12px", "letter-spacing": "0.06em", "text-transform": "uppercase", "color": "var(--color-ink-2)", "display": "block", "margin-top": "4px" })}"${_scopeId}>Total Kunjungan</span><p style="${ssrRenderStyle({ "font-size": "14px", "color": "var(--color-ink-2)", "margin-top": "10px", "line-height": "1.6" })}"${_scopeId}>Akumulasi kunjungan dari akademisi, peneliti, dan masyarakat umum.</p></div><div class="p-8" style="${ssrRenderStyle({ "border": "1px solid var(--color-rule)", "border-radius": "12px", "background-color": "var(--color-paper)" })}"${_scopeId}><span style="${ssrRenderStyle({ "font-family": "var(--font-display)", "font-size": "44px", "font-weight": "600", "color": "var(--color-accent)", "letter-spacing": "-0.03em" })}"${_scopeId}>${ssrInterpolate(__props.summary.total_downloads || 0)}</span><span style="${ssrRenderStyle({ "font-family": "var(--font-mono)", "font-size": "12px", "letter-spacing": "0.06em", "text-transform": "uppercase", "color": "var(--color-ink-2)", "display": "block", "margin-top": "4px" })}"${_scopeId}>Total Unduhan</span><p style="${ssrRenderStyle({ "font-size": "14px", "color": "var(--color-ink-2)", "margin-top": "10px", "line-height": "1.6" })}"${_scopeId}>Dokumen kajian yang telah diunduh oleh pengguna portal.</p></div></div></div></section><section style="${ssrRenderStyle({ "padding": "80px 0" })}"${_scopeId}><div class="container mx-auto px-4 xl:px-0"${_scopeId}><div class="flex items-center justify-between mb-12"${_scopeId}><div${_scopeId}><span style="${ssrRenderStyle({ "font-family": "var(--font-mono)", "font-size": "12px", "letter-spacing": "0.06em", "text-transform": "uppercase", "color": "var(--color-ink-2)", "display": "block", "margin-bottom": "4px" })}"${_scopeId}>♦ bidang</span><h2 class="text-2xl font-semibold" style="${ssrRenderStyle({ "font-family": "var(--font-display)", "color": "var(--color-ink)", "letter-spacing": "-0.02em" })}"${_scopeId}>Klaster Bidang <span style="${ssrRenderStyle({ "color": "var(--color-accent)" })}"${_scopeId}>Penelitian</span></h2></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("portal.kajian"),
              class: "text-sm font-medium transition-colors shrink-0",
              style: { "color": "var(--color-accent)" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Lihat semua →`);
                } else {
                  return [
                    createTextVNode("Lihat semua →")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"${_scopeId}><!--[-->`);
            ssrRenderList(__props.bidangs, (b) => {
              _push2(ssrRenderComponent(unref(Link), {
                key: b.id,
                href: _ctx.route("portal.kajian", { bidang_id: b.id }),
                class: "p-6 transition-colors",
                style: { "border": "1px solid var(--color-rule)", "border-radius": "12px", "background-color": "var(--color-paper-2)" },
                onMouseenter: ($event) => $event.target.style.borderColor = "var(--color-accent)",
                onMouseleave: ($event) => $event.target.style.borderColor = "var(--color-rule)"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="w-12 h-12 flex items-center justify-center mb-4" style="${ssrRenderStyle({ "border-radius": "8px", "border": "1px solid var(--color-rule)", "background-color": "var(--color-paper)", "color": "var(--color-accent)" })}"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_Icon, {
                      icon: "solar:folder-with-files-bold-duotone",
                      class: "w-6 h-6"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div><h4 class="font-semibold text-base leading-snug" style="${ssrRenderStyle({ "color": "var(--color-ink)" })}"${_scopeId2}>${ssrInterpolate(b.nama)}</h4><p class="text-sm mt-2 leading-relaxed" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId2}>${ssrInterpolate(b.deskripsi || "Dokumen kajian daerah dalam rumpun " + b.nama)}</p>`);
                  } else {
                    return [
                      createVNode("div", {
                        class: "w-12 h-12 flex items-center justify-center mb-4",
                        style: { "border-radius": "8px", "border": "1px solid var(--color-rule)", "background-color": "var(--color-paper)", "color": "var(--color-accent)" }
                      }, [
                        createVNode(_component_Icon, {
                          icon: "solar:folder-with-files-bold-duotone",
                          class: "w-6 h-6"
                        })
                      ]),
                      createVNode("h4", {
                        class: "font-semibold text-base leading-snug",
                        style: { "color": "var(--color-ink)" }
                      }, toDisplayString(b.nama), 1),
                      createVNode("p", {
                        class: "text-sm mt-2 leading-relaxed",
                        style: { "color": "var(--color-ink-2)" }
                      }, toDisplayString(b.deskripsi || "Dokumen kajian daerah dalam rumpun " + b.nama), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--></div></div></section><section style="${ssrRenderStyle({ "background-color": "var(--color-paper-2)", "border-top": "1px solid var(--color-rule)", "padding": "80px 0" })}"${_scopeId}><div class="container mx-auto px-4 xl:px-0 grid grid-cols-1 lg:grid-cols-3 gap-12"${_scopeId}><div class="lg:col-span-2"${_scopeId}><div class="flex items-center justify-between pb-5" style="${ssrRenderStyle({ "border-bottom": "1px solid var(--color-rule)" })}"${_scopeId}><div${_scopeId}><span style="${ssrRenderStyle({ "font-family": "var(--font-mono)", "font-size": "12px", "letter-spacing": "0.06em", "text-transform": "uppercase", "color": "var(--color-ink-2)", "display": "block", "margin-bottom": "2px" })}"${_scopeId}>♦ publikasi</span><h3 class="text-xl font-semibold" style="${ssrRenderStyle({ "font-family": "var(--font-display)", "color": "var(--color-ink)", "letter-spacing": "-0.02em" })}"${_scopeId}>Terbaru</h3></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("portal.kajian"),
              class: "text-sm font-medium transition-colors",
              style: { "color": "var(--color-accent)" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Lihat semua →`);
                } else {
                  return [
                    createTextVNode("Lihat semua →")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8"${_scopeId}><!--[-->`);
            ssrRenderList(__props.recentKajians, (item) => {
              var _a, _b;
              _push2(`<div class="p-6 flex flex-col justify-between" style="${ssrRenderStyle({ "border": "1px solid var(--color-rule)", "border-radius": "12px", "background-color": "var(--color-paper)" })}"${_scopeId}><div${_scopeId}><span style="${ssrRenderStyle({ "font-size": "11px", "font-weight": "500", "color": "var(--color-ink-2)", "font-family": "var(--font-mono)", "letter-spacing": "0.04em", "text-transform": "uppercase" })}"${_scopeId}>${ssrInterpolate((_a = item.jenis_kajian) == null ? void 0 : _a.nama)}</span><h4 class="font-semibold text-base mt-3 leading-snug line-clamp-2" style="${ssrRenderStyle({ "color": "var(--color-ink)" })}"${_scopeId}>`);
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
              _push2(`</h4><p class="text-sm mt-2.5 leading-relaxed line-clamp-2" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}>${ssrInterpolate(item.ringkasan)}</p></div><div class="mt-6 pt-4 flex items-center justify-between" style="${ssrRenderStyle({ "border-top": "1px solid var(--color-rule)", "color": "var(--color-ink-2)", "font-size": "13px" })}"${_scopeId}><span${_scopeId}>Tahun ${ssrInterpolate((_b = item.tahun) == null ? void 0 : _b.tahun)}</span>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("portal.detail", item.slug),
                class: "font-medium",
                style: { "color": "var(--color-accent)" }
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Selengkapnya →`);
                  } else {
                    return [
                      createTextVNode("Selengkapnya →")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div></div>`);
            });
            _push2(`<!--]--></div></div><div${_scopeId}><div class="pb-5" style="${ssrRenderStyle({ "border-bottom": "1px solid var(--color-rule)" })}"${_scopeId}><span style="${ssrRenderStyle({ "font-family": "var(--font-mono)", "font-size": "12px", "letter-spacing": "0.06em", "text-transform": "uppercase", "color": "var(--color-ink-2)", "display": "block", "margin-bottom": "2px" })}"${_scopeId}>♦ populer</span><h3 class="text-xl font-semibold" style="${ssrRenderStyle({ "font-family": "var(--font-display)", "color": "var(--color-ink)", "letter-spacing": "-0.02em" })}"${_scopeId}>Banyak Dicari</h3></div><div class="mt-8 space-y-5"${_scopeId}><!--[-->`);
            ssrRenderList(__props.popularKajians, (item) => {
              var _a, _b;
              _push2(`<div class="flex items-start gap-4 pb-5" style="${ssrRenderStyle({ "border-bottom": "1px solid var(--color-rule)" })}"${_scopeId}><div class="p-3 shrink-0" style="${ssrRenderStyle({ "border-radius": "8px", "border": "1px solid var(--color-rule)", "background-color": "var(--color-paper)", "color": "var(--color-accent)" })}"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                icon: "solar:document-bold",
                class: "w-5 h-5"
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="min-w-0 flex-grow"${_scopeId}><h4 class="font-semibold text-sm leading-snug line-clamp-2" style="${ssrRenderStyle({ "color": "var(--color-ink)" })}"${_scopeId}>`);
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
              _push2(`</h4><div class="flex items-center justify-between mt-2" style="${ssrRenderStyle({ "color": "var(--color-ink-2)", "font-size": "13px" })}"${_scopeId}><span${_scopeId}>${ssrInterpolate((_a = item.tahun) == null ? void 0 : _a.tahun)} · ${ssrInterpolate((_b = item.bidang) == null ? void 0 : _b.nama)}</span><span class="font-medium flex items-center gap-1" style="${ssrRenderStyle({ "color": "var(--color-accent)" })}"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                icon: "solar:download-bold",
                class: "w-4 h-4"
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
                createVNode("div", { class: "container mx-auto px-4 xl:px-0 pt-28 pb-24 md:pt-32 md:pb-28" }, [
                  createVNode("div", {
                    class: "inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase mb-8 border",
                    style: { "background-color": "var(--color-paper-2)", "border-color": "var(--color-rule)", "color": "var(--color-ink)" }
                  }, [
                    createVNode(_component_Icon, {
                      icon: "solar:globus-bold-duotone",
                      class: "w-4.5 h-4.5 text-emerald-600 dark:text-emerald-450"
                    }),
                    createVNode("span", null, "Portal Kajian & Riset Pembangunan Kota Samarinda")
                  ]),
                  createVNode("div", {
                    class: "flex items-center gap-2 mb-8",
                    style: { "color": "var(--color-ink-2)", "font-family": "var(--font-mono)", "font-size": "12px", "letter-spacing": "0.06em", "text-transform": "uppercase" }
                  }, [
                    createVNode("span", { style: { "width": "7px", "height": "7px", "border-radius": "50%", "background-color": "var(--color-accent)", "display": "inline-block" } }),
                    createVNode("span", null, [
                      createTextVNode("LIVE · "),
                      createVNode("strong", { style: { "color": "var(--color-accent)" } }, toDisplayString(__props.summary.total_published || 0), 1),
                      createTextVNode(" DOKUMEN TERBIT")
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-5 gap-16" }, [
                    createVNode("div", { class: "lg:col-span-3" }, [
                      createVNode("h1", {
                        class: "text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight",
                        style: { "font-family": "var(--font-display)", "color": "var(--color-ink)", "letter-spacing": "-0.03em" }
                      }, [
                        createTextVNode(" Akses Riset & "),
                        createVNode("br"),
                        createVNode("span", { style: { "color": "var(--color-accent)" } }, "Kajian Daerah")
                      ]),
                      createVNode("p", {
                        class: "mt-6 text-base lg:text-lg leading-relaxed max-w-lg",
                        style: { "color": "var(--color-ink-2)" }
                      }, " Telusuri dokumen kajian akademis, rencana penelitian strategis, dan data inovasi daerah guna mendukung transparansi dan perumusan kebijakan yang akurat. "),
                      createVNode("div", { class: "flex items-center gap-3 mt-8" }, [
                        createVNode("form", {
                          onSubmit: withModifiers(search, ["prevent"]),
                          class: "flex-1 flex items-center",
                          style: { "border": "1px solid var(--color-rule)", "border-radius": "8px", "max-width": "28rem" }
                        }, [
                          createVNode("div", { class: "flex-1 flex items-center gap-3 px-4" }, [
                            createVNode(_component_Icon, {
                              icon: "solar:magnifer-linear",
                              class: "w-5 h-5 shrink-0",
                              style: { "color": "var(--color-ink-2)" }
                            }),
                            withDirectives(createVNode("input", {
                              type: "text",
                              "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                              placeholder: "Cari judul kajian, abstrak...",
                              class: "w-full bg-transparent border-0 focus:ring-0 py-3.5",
                              style: { "color": "var(--color-ink)", "font-size": "15px" }
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, searchQuery.value]
                            ])
                          ]),
                          createVNode("button", {
                            type: "submit",
                            class: "px-5 py-3 text-sm font-semibold shrink-0 transition-colors",
                            style: { "border-radius": "6px", "background-color": "var(--color-accent)", "color": "var(--color-accent-ink)" },
                            onMouseenter: ($event) => $event.target.style.backgroundColor = "oklch(39% 0.055 135)",
                            onMouseleave: ($event) => $event.target.style.backgroundColor = "var(--color-accent)"
                          }, "Cari", 40, ["onMouseenter", "onMouseleave"])
                        ], 32),
                        createVNode(unref(Link), {
                          href: _ctx.route("portal.kajian"),
                          class: "px-4 py-3 text-sm font-medium shrink-0 transition-colors",
                          style: { "border": "1px solid var(--color-rule)", "border-radius": "6px", "color": "var(--color-ink)" }
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Jelajahi")
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ]),
                      createVNode("div", {
                        class: "flex items-center gap-6 mt-4",
                        style: { "color": "var(--color-ink-2)", "font-family": "var(--font-mono)", "font-size": "11px", "letter-spacing": "0.04em", "text-transform": "uppercase" }
                      }, [
                        createVNode("span", null, "tanpa login"),
                        createVNode("span", null, "akses terbuka"),
                        createVNode("span", null, "semua dokumen")
                      ])
                    ]),
                    createVNode("div", { class: "lg:col-span-2" }, [
                      createVNode("div", { style: { "border": "1px solid var(--color-rule)", "border-radius": "12px", "background-color": "var(--color-paper)" } }, [
                        createVNode("div", { style: { "padding": "20px 24px", "display": "flex", "align-items": "center", "justify-content": "space-between", "border-bottom": "1px solid var(--color-rule)" } }, [
                          createVNode("div", null, [
                            createVNode("div", { style: { "font-family": "var(--font-mono)", "font-size": "11px", "letter-spacing": "0.06em", "text-transform": "uppercase", "color": "var(--color-ink-2)" } }, "Index Publikasi"),
                            createVNode("div", { style: { "font-size": "14px", "color": "var(--color-ink-2)", "margin-top": "2px" } }, "BAPPERIDA Samarinda")
                          ]),
                          createVNode("span", { style: { "font-family": "var(--font-mono)", "font-size": "10px", "letter-spacing": "0.06em", "text-transform": "uppercase", "border": "1px solid var(--color-rule)", "border-radius": "4px", "padding": "3px 8px", "color": "var(--color-accent)" } }, "live")
                        ]),
                        createVNode("div", { style: { "padding": "20px 24px" } }, [
                          createVNode("div", { style: { "display": "flex", "justify-content": "space-between", "align-items": "center", "padding": "14px 0", "border-bottom": "1px solid var(--color-rule)" } }, [
                            createVNode("span", { style: { "font-size": "15px", "color": "var(--color-ink-2)" } }, "Total Kajian"),
                            createVNode("strong", { style: { "font-family": "var(--font-display)", "font-size": "28px", "color": "var(--color-ink)", "letter-spacing": "-0.02em" } }, toDisplayString(__props.summary.total_published || 0), 1)
                          ]),
                          createVNode("div", { style: { "display": "flex", "justify-content": "space-between", "align-items": "center", "padding": "14px 0", "border-bottom": "1px solid var(--color-rule)" } }, [
                            createVNode("span", { style: { "font-size": "15px", "color": "var(--color-ink-2)" } }, "Kunjungan"),
                            createVNode("strong", { style: { "font-family": "var(--font-display)", "font-size": "28px", "color": "var(--color-ink)", "letter-spacing": "-0.02em" } }, toDisplayString(__props.summary.total_views || 0), 1)
                          ]),
                          createVNode("div", { style: { "display": "flex", "justify-content": "space-between", "align-items": "center", "padding": "14px 0" } }, [
                            createVNode("span", { style: { "font-size": "15px", "color": "var(--color-ink-2)" } }, "Unduhan"),
                            createVNode("strong", { style: { "font-family": "var(--font-display)", "font-size": "28px", "color": "var(--color-ink)", "letter-spacing": "-0.02em" } }, toDisplayString(__props.summary.total_downloads || 0), 1)
                          ])
                        ]),
                        createVNode("div", { style: { "padding": "0 24px 20px" } }, [
                          createVNode("div", { style: { "height": "6px", "border-radius": "3px", "background-color": "var(--color-rule)", "overflow": "hidden" } }, [
                            createVNode("div", { style: { "height": "100%", "width": "64%", "border-radius": "3px", "background-color": "var(--color-accent)" } })
                          ]),
                          createVNode("div", { style: { "font-family": "var(--font-mono)", "font-size": "11px", "letter-spacing": "0.06em", "text-transform": "uppercase", "color": "var(--color-ink-2)", "margin-top": "8px" } }, toDisplayString(__props.bidangs.length) + " bidang penelitian aktif", 1)
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { style: { "margin-top": "60px", "border-top": "1px solid var(--color-rule)", "border-bottom": "1px solid var(--color-rule)", "overflow": "hidden", "padding": "14px 0" } }, [
                    createVNode("div", { style: { "display": "flex", "gap": "56px", "animation": "marquee 40s linear infinite", "white-space": "nowrap", "font-family": "var(--font-mono)", "font-size": "12px", "letter-spacing": "0.1em", "color": "var(--color-ink-2)", "text-transform": "uppercase" } }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.recentKajians, (item, index) => {
                        return openBlock(), createBlock("span", {
                          key: item.id
                        }, [
                          createTextVNode(toDisplayString(item.judul) + " ", 1),
                          index < __props.recentKajians.length - 1 ? (openBlock(), createBlock("span", {
                            key: 0,
                            style: { "color": "var(--color-accent)", "margin": "0 8px" }
                          }, "✦")) : createCommentVNode("", true)
                        ]);
                      }), 128)),
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.recentKajians, (item, index) => {
                        return openBlock(), createBlock("span", {
                          key: "dup-" + item.id
                        }, [
                          createTextVNode(toDisplayString(item.judul) + " ", 1),
                          index < __props.recentKajians.length - 1 ? (openBlock(), createBlock("span", {
                            key: 0,
                            style: { "color": "var(--color-accent)", "margin": "0 8px" }
                          }, "✦")) : createCommentVNode("", true)
                        ]);
                      }), 128))
                    ])
                  ])
                ])
              ]),
              createVNode("section", { style: { "background-color": "var(--color-paper)", "padding": "80px 0", "border-top": "1px solid var(--color-rule)", "border-bottom": "1px solid var(--color-rule)" } }, [
                createVNode("div", { class: "container mx-auto px-4 xl:px-0" }, [
                  createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" }, [
                    createVNode("div", { class: "lg:col-span-5 flex items-end justify-center gap-6" }, [
                      createVNode("div", { class: "relative group text-center" }, [
                        createVNode("div", {
                          class: "overflow-hidden rounded-card border border-gray-150 dark:border-gray-700 bg-gray-50 dark:bg-gray-800",
                          style: { "width": "170px", "height": "230px" }
                        }, [
                          createVNode("img", {
                            src: "https://satudata.samarindakota.go.id/img/new-walikota.png",
                            alt: "Dr. H. Andi Harun",
                            class: "w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          })
                        ]),
                        createVNode("p", {
                          class: "mt-3 text-xs font-bold",
                          style: { "color": "var(--color-ink)" }
                        }, "Dr. H. Andi Harun"),
                        createVNode("p", {
                          class: "text-[10px] uppercase tracking-widest",
                          style: { "color": "var(--color-ink-2)" }
                        }, "Walikota Samarinda")
                      ]),
                      createVNode("div", { class: "relative group text-center" }, [
                        createVNode("div", {
                          class: "overflow-hidden rounded-card border border-gray-150 dark:border-gray-700 bg-gray-50 dark:bg-gray-800",
                          style: { "width": "170px", "height": "230px" }
                        }, [
                          createVNode("img", {
                            src: "https://satudata.samarindakota.go.id/img/new-wawali.png",
                            alt: "Dr. H. Rusmadi, M.S.",
                            class: "w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          })
                        ]),
                        createVNode("p", {
                          class: "mt-3 text-xs font-bold",
                          style: { "color": "var(--color-ink)" }
                        }, "Dr. H. Rusmadi, M.S."),
                        createVNode("p", {
                          class: "text-[10px] uppercase tracking-widest",
                          style: { "color": "var(--color-ink-2)" }
                        }, "Wakil Walikota Samarinda")
                      ])
                    ]),
                    createVNode("div", { class: "lg:col-span-7 space-y-6" }, [
                      createVNode("div", {
                        class: "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase",
                        style: { "background-color": "rgba(16, 185, 129, 0.08)", "border": "1px solid rgba(16, 185, 129, 0.15)", "color": "#10B981" }
                      }, [
                        createVNode("span", { style: { "width": "6px", "height": "6px", "border-radius": "50%", "background-color": "#10B981", "display": "inline-block" } }),
                        createTextVNode(" Samarinda Kota Pusat Peradaban ")
                      ]),
                      createVNode("h3", {
                        class: "text-3xl font-semibold tracking-tight",
                        style: { "font-family": "var(--font-display)", "color": "var(--color-ink)", "letter-spacing": "-0.02em" }
                      }, [
                        createTextVNode(" Mewujudkan Kebijakan Berbasis "),
                        createVNode("span", { style: { "color": "var(--color-accent)" } }, "Data & Riset Ilmiah")
                      ]),
                      createVNode("p", {
                        class: "text-sm leading-relaxed",
                        style: { "color": "var(--color-ink-2)" }
                      }, [
                        createTextVNode(" Pemerintah Kota Samarinda berkomitmen untuk terus meningkatkan kualitas tata kelola pemerintahan yang transparan dan akuntabel. Melalui portal "),
                        createVNode("strong", null, "SIKAJIAN"),
                        createTextVNode(", setiap dokumen hasil penelitian, kajian akademis, dan naskah rekomendasi kebijakan dipublikasikan secara luas untuk mendorong kolaborasi antara pemerintah, akademisi, dan masyarakat guna membangun Samarinda sebagai Kota Pusat Peradaban. ")
                      ]),
                      createVNode("div", {
                        class: "grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t",
                        style: { "border-color": "var(--color-rule)" }
                      }, [
                        createVNode("div", null, [
                          createVNode("h5", {
                            class: "text-xs font-bold uppercase tracking-wider",
                            style: { "color": "var(--color-ink-2)" }
                          }, "Prinsip Pembangunan"),
                          createVNode("p", {
                            class: "text-xs mt-1",
                            style: { "color": "var(--color-ink-2)" }
                          }, "Objektivitas, Akurasi Data, dan Kemanfaatan Publik secara inklusif.")
                        ]),
                        createVNode("div", null, [
                          createVNode("h5", {
                            class: "text-xs font-bold uppercase tracking-wider",
                            style: { "color": "var(--color-ink-2)" }
                          }, "Rencana Strategis"),
                          createVNode("p", {
                            class: "text-xs mt-1",
                            style: { "color": "var(--color-ink-2)" }
                          }, "Mendukung RPJMD Kota Samarinda melalui kajian yang terstruktur dan terukur.")
                        ])
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode("section", { style: { "background-color": "var(--color-paper-2)", "border-top": "1px solid var(--color-rule)", "padding": "80px 0" } }, [
                createVNode("div", { class: "container mx-auto px-4 xl:px-0" }, [
                  createVNode("div", { class: "flex items-center justify-between mb-12" }, [
                    createVNode("div", null, [
                      createVNode("span", { style: { "font-family": "var(--font-mono)", "font-size": "12px", "letter-spacing": "0.06em", "text-transform": "uppercase", "color": "var(--color-ink-2)", "display": "block", "margin-bottom": "4px" } }, "♦ ringkasan"),
                      createVNode("h2", {
                        class: "text-2xl font-semibold",
                        style: { "font-family": "var(--font-display)", "color": "var(--color-ink)", "letter-spacing": "-0.02em" }
                      }, [
                        createTextVNode("Capaian "),
                        createVNode("span", { style: { "color": "var(--color-accent)" } }, "Publikasi")
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-5" }, [
                    createVNode("div", {
                      class: "p-8",
                      style: { "border": "1px solid var(--color-rule)", "border-radius": "12px", "background-color": "var(--color-paper)" }
                    }, [
                      createVNode("span", { style: { "font-family": "var(--font-display)", "font-size": "44px", "font-weight": "600", "color": "var(--color-accent)", "letter-spacing": "-0.03em" } }, toDisplayString(__props.summary.total_published || 0), 1),
                      createVNode("span", { style: { "font-family": "var(--font-mono)", "font-size": "12px", "letter-spacing": "0.06em", "text-transform": "uppercase", "color": "var(--color-ink-2)", "display": "block", "margin-top": "4px" } }, "Total Kajian"),
                      createVNode("p", { style: { "font-size": "14px", "color": "var(--color-ink-2)", "margin-top": "10px", "line-height": "1.6" } }, "Seluruh dokumen kajian dan penelitian yang telah diterbitkan dan dapat diakses publik.")
                    ]),
                    createVNode("div", {
                      class: "p-8",
                      style: { "border": "1px solid var(--color-rule)", "border-radius": "12px", "background-color": "var(--color-paper)" }
                    }, [
                      createVNode("span", { style: { "font-family": "var(--font-display)", "font-size": "44px", "font-weight": "600", "color": "var(--color-accent)", "letter-spacing": "-0.03em" } }, toDisplayString(__props.summary.total_views || 0), 1),
                      createVNode("span", { style: { "font-family": "var(--font-mono)", "font-size": "12px", "letter-spacing": "0.06em", "text-transform": "uppercase", "color": "var(--color-ink-2)", "display": "block", "margin-top": "4px" } }, "Total Kunjungan"),
                      createVNode("p", { style: { "font-size": "14px", "color": "var(--color-ink-2)", "margin-top": "10px", "line-height": "1.6" } }, "Akumulasi kunjungan dari akademisi, peneliti, dan masyarakat umum.")
                    ]),
                    createVNode("div", {
                      class: "p-8",
                      style: { "border": "1px solid var(--color-rule)", "border-radius": "12px", "background-color": "var(--color-paper)" }
                    }, [
                      createVNode("span", { style: { "font-family": "var(--font-display)", "font-size": "44px", "font-weight": "600", "color": "var(--color-accent)", "letter-spacing": "-0.03em" } }, toDisplayString(__props.summary.total_downloads || 0), 1),
                      createVNode("span", { style: { "font-family": "var(--font-mono)", "font-size": "12px", "letter-spacing": "0.06em", "text-transform": "uppercase", "color": "var(--color-ink-2)", "display": "block", "margin-top": "4px" } }, "Total Unduhan"),
                      createVNode("p", { style: { "font-size": "14px", "color": "var(--color-ink-2)", "margin-top": "10px", "line-height": "1.6" } }, "Dokumen kajian yang telah diunduh oleh pengguna portal.")
                    ])
                  ])
                ])
              ]),
              createVNode("section", { style: { "padding": "80px 0" } }, [
                createVNode("div", { class: "container mx-auto px-4 xl:px-0" }, [
                  createVNode("div", { class: "flex items-center justify-between mb-12" }, [
                    createVNode("div", null, [
                      createVNode("span", { style: { "font-family": "var(--font-mono)", "font-size": "12px", "letter-spacing": "0.06em", "text-transform": "uppercase", "color": "var(--color-ink-2)", "display": "block", "margin-bottom": "4px" } }, "♦ bidang"),
                      createVNode("h2", {
                        class: "text-2xl font-semibold",
                        style: { "font-family": "var(--font-display)", "color": "var(--color-ink)", "letter-spacing": "-0.02em" }
                      }, [
                        createTextVNode("Klaster Bidang "),
                        createVNode("span", { style: { "color": "var(--color-accent)" } }, "Penelitian")
                      ])
                    ]),
                    createVNode(unref(Link), {
                      href: _ctx.route("portal.kajian"),
                      class: "text-sm font-medium transition-colors shrink-0",
                      style: { "color": "var(--color-accent)" }
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Lihat semua →")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.bidangs, (b) => {
                      return openBlock(), createBlock(unref(Link), {
                        key: b.id,
                        href: _ctx.route("portal.kajian", { bidang_id: b.id }),
                        class: "p-6 transition-colors",
                        style: { "border": "1px solid var(--color-rule)", "border-radius": "12px", "background-color": "var(--color-paper-2)" },
                        onMouseenter: ($event) => $event.target.style.borderColor = "var(--color-accent)",
                        onMouseleave: ($event) => $event.target.style.borderColor = "var(--color-rule)"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", {
                            class: "w-12 h-12 flex items-center justify-center mb-4",
                            style: { "border-radius": "8px", "border": "1px solid var(--color-rule)", "background-color": "var(--color-paper)", "color": "var(--color-accent)" }
                          }, [
                            createVNode(_component_Icon, {
                              icon: "solar:folder-with-files-bold-duotone",
                              class: "w-6 h-6"
                            })
                          ]),
                          createVNode("h4", {
                            class: "font-semibold text-base leading-snug",
                            style: { "color": "var(--color-ink)" }
                          }, toDisplayString(b.nama), 1),
                          createVNode("p", {
                            class: "text-sm mt-2 leading-relaxed",
                            style: { "color": "var(--color-ink-2)" }
                          }, toDisplayString(b.deskripsi || "Dokumen kajian daerah dalam rumpun " + b.nama), 1)
                        ]),
                        _: 2
                      }, 1032, ["href", "onMouseenter", "onMouseleave"]);
                    }), 128))
                  ])
                ])
              ]),
              createVNode("section", { style: { "background-color": "var(--color-paper-2)", "border-top": "1px solid var(--color-rule)", "padding": "80px 0" } }, [
                createVNode("div", { class: "container mx-auto px-4 xl:px-0 grid grid-cols-1 lg:grid-cols-3 gap-12" }, [
                  createVNode("div", { class: "lg:col-span-2" }, [
                    createVNode("div", {
                      class: "flex items-center justify-between pb-5",
                      style: { "border-bottom": "1px solid var(--color-rule)" }
                    }, [
                      createVNode("div", null, [
                        createVNode("span", { style: { "font-family": "var(--font-mono)", "font-size": "12px", "letter-spacing": "0.06em", "text-transform": "uppercase", "color": "var(--color-ink-2)", "display": "block", "margin-bottom": "2px" } }, "♦ publikasi"),
                        createVNode("h3", {
                          class: "text-xl font-semibold",
                          style: { "font-family": "var(--font-display)", "color": "var(--color-ink)", "letter-spacing": "-0.02em" }
                        }, "Terbaru")
                      ]),
                      createVNode(unref(Link), {
                        href: _ctx.route("portal.kajian"),
                        class: "text-sm font-medium transition-colors",
                        style: { "color": "var(--color-accent)" }
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Lihat semua →")
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ]),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4 mt-8" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.recentKajians, (item) => {
                        var _a, _b;
                        return openBlock(), createBlock("div", {
                          key: item.id,
                          class: "p-6 flex flex-col justify-between",
                          style: { "border": "1px solid var(--color-rule)", "border-radius": "12px", "background-color": "var(--color-paper)" }
                        }, [
                          createVNode("div", null, [
                            createVNode("span", { style: { "font-size": "11px", "font-weight": "500", "color": "var(--color-ink-2)", "font-family": "var(--font-mono)", "letter-spacing": "0.04em", "text-transform": "uppercase" } }, toDisplayString((_a = item.jenis_kajian) == null ? void 0 : _a.nama), 1),
                            createVNode("h4", {
                              class: "font-semibold text-base mt-3 leading-snug line-clamp-2",
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
                              class: "text-sm mt-2.5 leading-relaxed line-clamp-2",
                              style: { "color": "var(--color-ink-2)" }
                            }, toDisplayString(item.ringkasan), 1)
                          ]),
                          createVNode("div", {
                            class: "mt-6 pt-4 flex items-center justify-between",
                            style: { "border-top": "1px solid var(--color-rule)", "color": "var(--color-ink-2)", "font-size": "13px" }
                          }, [
                            createVNode("span", null, "Tahun " + toDisplayString((_b = item.tahun) == null ? void 0 : _b.tahun), 1),
                            createVNode(unref(Link), {
                              href: _ctx.route("portal.detail", item.slug),
                              class: "font-medium",
                              style: { "color": "var(--color-accent)" }
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Selengkapnya →")
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
                      class: "pb-5",
                      style: { "border-bottom": "1px solid var(--color-rule)" }
                    }, [
                      createVNode("span", { style: { "font-family": "var(--font-mono)", "font-size": "12px", "letter-spacing": "0.06em", "text-transform": "uppercase", "color": "var(--color-ink-2)", "display": "block", "margin-bottom": "2px" } }, "♦ populer"),
                      createVNode("h3", {
                        class: "text-xl font-semibold",
                        style: { "font-family": "var(--font-display)", "color": "var(--color-ink)", "letter-spacing": "-0.02em" }
                      }, "Banyak Dicari")
                    ]),
                    createVNode("div", { class: "mt-8 space-y-5" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.popularKajians, (item) => {
                        var _a, _b;
                        return openBlock(), createBlock("div", {
                          key: item.id,
                          class: "flex items-start gap-4 pb-5",
                          style: { "border-bottom": "1px solid var(--color-rule)" }
                        }, [
                          createVNode("div", {
                            class: "p-3 shrink-0",
                            style: { "border-radius": "8px", "border": "1px solid var(--color-rule)", "background-color": "var(--color-paper)", "color": "var(--color-accent)" }
                          }, [
                            createVNode(_component_Icon, {
                              icon: "solar:document-bold",
                              class: "w-5 h-5"
                            })
                          ]),
                          createVNode("div", { class: "min-w-0 flex-grow" }, [
                            createVNode("h4", {
                              class: "font-semibold text-sm leading-snug line-clamp-2",
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
                              class: "flex items-center justify-between mt-2",
                              style: { "color": "var(--color-ink-2)", "font-size": "13px" }
                            }, [
                              createVNode("span", null, toDisplayString((_a = item.tahun) == null ? void 0 : _a.tahun) + " · " + toDisplayString((_b = item.bidang) == null ? void 0 : _b.nama), 1),
                              createVNode("span", {
                                class: "font-medium flex items-center gap-1",
                                style: { "color": "var(--color-accent)" }
                              }, [
                                createVNode(_component_Icon, {
                                  icon: "solar:download-bold",
                                  class: "w-4 h-4"
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
