import { onMounted, unref, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { Head } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "CetakDetail",
  __ssrInlineRender: true,
  props: {
    kajian: Object
  },
  setup(__props) {
    onMounted(() => {
      setTimeout(() => {
        window.print();
      }, 800);
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: "Cetak - " + __props.kajian.judul
      }, null, _parent));
      _push(`<div class="min-h-screen bg-paper text-black p-8 max-w-4xl mx-auto print:p-0 font-serif leading-relaxed"><div class="mb-6 p-4 bg-paper-2 border border-slate-200 rounded-card flex justify-between items-center print:hidden"><span class="text-xs font-sans text-slate-500 font-medium">Pratinjau Cetak Dokumen Kajian</span><button class="px-4 py-2 bg-accent text-accent-ink font-sans font-bold text-xs rounded-sm transition-colors duration-150"> Cetak Dokumen (Ctrl+P) </button></div><div class="text-center border-b-4 border-double border-black pb-4 mb-6"><h2 class="text-lg font-bold uppercase font-sans">PEMERINTAH KOTA SAMARINDA</h2><h1 class="text-xl font-semibold uppercase font-sans tracking-tight">BADAN PERENCANAAN PEMBANGUNAN, RISET DAN INOVASI DAERAH</h1><p class="text-xs font-sans text-slate-500 mt-1"> Jl. Dahlia No. 4, Bugis, Kec. Samarinda Kota, Kota Samarinda, Kalimantan Timur 75121 </p></div><div class="text-center space-y-2 mb-8"><h3 class="text-base font-bold uppercase underline font-sans">DOKUMEN REKAPITULASI KAJIAN ILMIAH</h3><p class="text-xs font-sans font-semibold text-slate-500">Nomor Registrasi: SIKAJIAN/${ssrInterpolate(__props.kajian.uuid.substring(0, 8).toUpperCase())}/${ssrInterpolate((_a = __props.kajian.tahun) == null ? void 0 : _a.tahun)}</p></div><table class="w-full text-sm border-collapse border border-slate-300 mb-8 font-sans"><tbody><tr><td class="border border-slate-300 px-4 py-2 font-bold w-1/3 bg-paper-2">Judul Penelitian / Kajian</td><td class="border border-slate-300 px-4 py-2 text-justify">${ssrInterpolate(__props.kajian.judul)}</td></tr><tr><td class="border border-slate-300 px-4 py-2 font-bold bg-paper-2">Rumpun Bidang Bapperida</td><td class="border border-slate-300 px-4 py-2">${ssrInterpolate((_b = __props.kajian.bidang) == null ? void 0 : _b.nama)}</td></tr><tr><td class="border border-slate-300 px-4 py-2 font-bold bg-paper-2">Jenis Kajian</td><td class="border border-slate-300 px-4 py-2">${ssrInterpolate((_c = __props.kajian.jenis_kajian) == null ? void 0 : _c.nama)}</td></tr><tr><td class="border border-slate-300 px-4 py-2 font-bold bg-paper-2">Tahun Pelaksanaan</td><td class="border border-slate-300 px-4 py-2">${ssrInterpolate((_d = __props.kajian.tahun) == null ? void 0 : _d.tahun)}</td></tr><tr><td class="border border-slate-300 px-4 py-2 font-bold bg-paper-2">Penanggung Jawab</td><td class="border border-slate-300 px-4 py-2">${ssrInterpolate(__props.kajian.penanggung_jawab || "-")}</td></tr><tr><td class="border border-slate-300 px-4 py-2 font-bold bg-paper-2">Mitra Kerja / Pihak Ketiga</td><td class="border border-slate-300 px-4 py-2">${ssrInterpolate(__props.kajian.mitra || "-")}</td></tr><tr><td class="border border-slate-300 px-4 py-2 font-bold bg-paper-2">Lokasi Kajian</td><td class="border border-slate-300 px-4 py-2">${ssrInterpolate(__props.kajian.lokasi || "-")}</td></tr></tbody></table><div class="space-y-6 text-sm text-justify">`);
      if (__props.kajian.ringkasan) {
        _push(`<div class="space-y-2"><h4 class="font-bold border-b border-black pb-1 uppercase font-sans text-xs tracking-wider">I. Ringkasan Eksekutif (Abstrak)</h4><p class="indent-8 leading-relaxed">${ssrInterpolate(__props.kajian.ringkasan)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.kajian.tujuan) {
        _push(`<div class="space-y-2"><h4 class="font-bold border-b border-black pb-1 uppercase font-sans text-xs tracking-wider">II. Tujuan Kajian</h4><p class="indent-8 leading-relaxed">${ssrInterpolate(__props.kajian.tujuan)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.kajian.latar_belakang) {
        _push(`<div class="space-y-2"><h4 class="font-bold border-b border-black pb-1 uppercase font-sans text-xs tracking-wider">III. Latar Belakang Masalah</h4><p class="indent-8 leading-relaxed">${ssrInterpolate(__props.kajian.latar_belakang)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.kajian.metodologi) {
        _push(`<div class="space-y-2"><h4 class="font-bold border-b border-black pb-1 uppercase font-sans text-xs tracking-wider">IV. Metodologi Penelitian</h4><p class="indent-8 leading-relaxed">${ssrInterpolate(__props.kajian.metodologi)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.kajian.temuan) {
        _push(`<div class="space-y-2"><h4 class="font-bold border-b border-black pb-1 uppercase font-sans text-xs tracking-wider">V. Temuan Utama (Hasil Kajian)</h4><p class="indent-8 leading-relaxed">${ssrInterpolate(__props.kajian.temuan)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.kajian.rekomendasi) {
        _push(`<div class="space-y-2"><h4 class="font-bold border-b border-black pb-1 uppercase font-sans text-xs tracking-wider">VI. Rekomendasi Kebijakan</h4><p class="indent-8 leading-relaxed">${ssrInterpolate(__props.kajian.rekomendasi)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="mt-12 pt-8 flex justify-end text-sm font-sans print:break-inside-avoid"><div class="w-64 text-center space-y-16"><div><p>Samarinda, ${ssrInterpolate((/* @__PURE__ */ new Date()).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }))}</p><p class="font-semibold mt-1">Kepala BAPPERIDA Kota Samarinda</p></div><div><p class="font-bold underline uppercase">BAPPERIDA SAMARINDA</p><p class="text-xs text-slate-500">NIP. ————————————————</p></div></div></div></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Backend/Laporan/CetakDetail.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
