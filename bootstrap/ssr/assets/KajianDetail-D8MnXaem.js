import { computed, ref, resolveComponent, unref, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./FrontendLayout-DrClc4xA.js";
import axios from "axios";
import { useToast } from "vue-toastification";
const _sfc_main = {
  __name: "KajianDetail",
  __ssrInlineRender: true,
  props: {
    kajian: Object,
    relatedKajians: Array
  },
  setup(__props) {
    const toast = useToast();
    const props = __props;
    const getFile = (type) => {
      if (!props.kajian.files) return null;
      return props.kajian.files.find((f) => f.tipe === type);
    };
    const filePdf = computed(() => getFile("pdf"));
    const filePresentasi = computed(() => getFile("presentasi"));
    const fileCover = computed(() => getFile("cover"));
    const hasAnyFiles = computed(() => filePdf.value || filePresentasi.value || fileCover.value);
    const getFileUrl = (file) => {
      if (!file) return null;
      return `https://d3dyajxapape7i.cloudfront.net/${file.file_path}`;
    };
    ref(false);
    ref(null);
    const formatSize = (bytes) => {
      if (!bytes || isNaN(bytes)) return "Dokumen PDF";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };
    const triggerDownload = (file) => {
      if (!file) return;
      toast.info("Memulai unduhan berkas...");
      axios.post(route("portal.download", props.kajian.slug), {
        file_id: file.id
      }, {
        responseType: "blob"
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", file.file_name);
        document.body.appendChild(link);
        link.click();
        link.remove();
        toast.success("Unduhan berhasil.");
      }).catch((err) => {
        toast.error("Gagal mengunduh berkas.");
        console.error(err);
      });
    };
    const shareLink = (platform) => {
      const url = window.location.href;
      const text = `Baca kajian Bapperida: "${props.kajian.judul}"`;
      let shareUrl = "";
      if (platform === "whatsapp") {
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text + " " + url)}`;
      } else if (platform === "facebook") {
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
      } else if (platform === "twitter") {
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
      } else if (platform === "copy") {
        navigator.clipboard.writeText(url);
        toast.success("Link tautan disalin ke clipboard.");
        return;
      }
      window.open(shareUrl, "_blank");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = resolveComponent("Icon");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: __props.kajian.judul
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f;
          if (_push2) {
            _push2(`<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12"${_scopeId}><div class="mb-8 flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("portal.kajian"),
              class: "text-xs font-semibold transition-colors flex items-center gap-1",
              style: { "color": "var(--color-ink-2)" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Icon, {
                    icon: "solar:arrow-left-linear",
                    class: "w-4 h-4"
                  }, null, _parent3, _scopeId2));
                  _push3(` Kembali ke Daftar Kajian `);
                } else {
                  return [
                    createVNode(_component_Icon, {
                      icon: "solar:arrow-left-linear",
                      class: "w-4 h-4"
                    }),
                    createTextVNode(" Kembali ke Daftar Kajian ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="grid grid-cols-1 lg:grid-cols-3 gap-12"${_scopeId}><div class="lg:col-span-2 space-y-8"${_scopeId}><div class="space-y-4"${_scopeId}><span class="inline-block text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full" style="${ssrRenderStyle({ "background-color": "var(--color-paper-2)", "color": "var(--color-accent)", "border": "1px solid var(--color-rule)" })}"${_scopeId}>${ssrInterpolate((_a = __props.kajian.jenis_kajian) == null ? void 0 : _a.nama)}</span><h1 class="text-2xl sm:text-3xl font-semibold leading-relaxed" style="${ssrRenderStyle({ "color": "var(--color-ink)" })}"${_scopeId}>${ssrInterpolate(__props.kajian.judul)}</h1><p class="text-xs font-medium" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}> Dipublikasikan pada: ${ssrInterpolate(new Date(__props.kajian.published_at || __props.kajian.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }))}</p></div><div class="grid grid-cols-2 sm:grid-cols-4 gap-6 p-6 rounded-xl text-xs" style="${ssrRenderStyle({ "background-color": "var(--color-paper)", "border": "1px solid var(--color-rule)" })}"${_scopeId}><div${_scopeId}><span class="text-[9px] font-semibold uppercase tracking-wider block" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}>Tahun</span><span class="font-semibold mt-1 block" style="${ssrRenderStyle({ "color": "var(--color-ink)" })}"${_scopeId}>${ssrInterpolate((_b = __props.kajian.tahun) == null ? void 0 : _b.tahun)}</span></div><div${_scopeId}><span class="text-[9px] font-semibold uppercase tracking-wider block" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}>Rumpun Bidang</span><span class="font-semibold mt-1 block" style="${ssrRenderStyle({ "color": "var(--color-ink)" })}"${_scopeId}>${ssrInterpolate((_c = __props.kajian.bidang) == null ? void 0 : _c.nama)}</span></div><div${_scopeId}><span class="text-[9px] font-semibold uppercase tracking-wider block" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}>Penanggung Jawab</span><span class="font-semibold mt-1 block" style="${ssrRenderStyle({ "color": "var(--color-ink)" })}"${_scopeId}>${ssrInterpolate(__props.kajian.penanggung_jawab || "-")}</span></div><div${_scopeId}><span class="text-[9px] font-semibold uppercase tracking-wider block" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}>Mitra Rumpun</span><span class="font-semibold mt-1 block" style="${ssrRenderStyle({ "color": "var(--color-ink)" })}"${_scopeId}>${ssrInterpolate(__props.kajian.mitra || "-")}</span></div></div>`);
            if (__props.kajian.ringkasan) {
              _push2(`<div class="space-y-3"${_scopeId}><h4 class="font-semibold text-sm uppercase tracking-wider" style="${ssrRenderStyle({ "color": "var(--color-ink)" })}"${_scopeId}>Ringkasan Eksekutif</h4><p class="text-sm leading-relaxed font-light whitespace-pre-line" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}>${ssrInterpolate(__props.kajian.ringkasan)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6" style="${ssrRenderStyle({ "border-top": "1px solid var(--color-rule)" })}"${_scopeId}>`);
            if (__props.kajian.tujuan) {
              _push2(`<div class="space-y-2"${_scopeId}><h5 class="font-semibold text-xs uppercase tracking-wider" style="${ssrRenderStyle({ "color": "var(--color-ink)" })}"${_scopeId}>Tujuan Kajian</h5><p class="text-xs leading-relaxed whitespace-pre-line" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}>${ssrInterpolate(__props.kajian.tujuan)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.kajian.latar_belakang) {
              _push2(`<div class="space-y-2"${_scopeId}><h5 class="font-semibold text-xs uppercase tracking-wider" style="${ssrRenderStyle({ "color": "var(--color-ink)" })}"${_scopeId}>Latar Belakang</h5><p class="text-xs leading-relaxed whitespace-pre-line" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}>${ssrInterpolate(__props.kajian.latar_belakang)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.kajian.metodologi) {
              _push2(`<div class="space-y-2 md:col-span-2 pt-4" style="${ssrRenderStyle({ "border-top": "1px solid var(--color-rule)" })}"${_scopeId}><h5 class="font-semibold text-xs uppercase tracking-wider" style="${ssrRenderStyle({ "color": "var(--color-ink)" })}"${_scopeId}>Metode Riset</h5><p class="text-xs leading-relaxed whitespace-pre-line" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}>${ssrInterpolate(__props.kajian.metodologi)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="grid grid-cols-1 gap-6 pt-6" style="${ssrRenderStyle({ "border-top": "1px solid var(--color-rule)" })}"${_scopeId}>`);
            if (__props.kajian.temuan) {
              _push2(`<div class="space-y-2"${_scopeId}><h5 class="font-semibold text-xs uppercase tracking-wider" style="${ssrRenderStyle({ "color": "var(--color-ink)" })}"${_scopeId}>Temuan Utama</h5><p class="text-xs leading-relaxed whitespace-pre-line" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}>${ssrInterpolate(__props.kajian.temuan)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.kajian.rekomendasi) {
              _push2(`<div class="space-y-2"${_scopeId}><h5 class="font-semibold text-xs uppercase tracking-wider" style="${ssrRenderStyle({ "color": "var(--color-ink)" })}"${_scopeId}>Rekomendasi Kebijakan</h5><p class="text-xs leading-relaxed whitespace-pre-line" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}>${ssrInterpolate(__props.kajian.rekomendasi)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (__props.kajian.keywords && __props.kajian.keywords.length > 0) {
              _push2(`<div class="pt-6 space-y-3" style="${ssrRenderStyle({ "border-top": "1px solid var(--color-rule)" })}"${_scopeId}><h5 class="font-semibold text-xs uppercase tracking-wider" style="${ssrRenderStyle({ "color": "var(--color-ink)" })}"${_scopeId}>Kata Kunci</h5><div class="flex flex-wrap gap-2"${_scopeId}><!--[-->`);
              ssrRenderList(__props.kajian.keywords, (kw) => {
                _push2(`<span class="text-xs font-semibold px-3 py-1 rounded-sm" style="${ssrRenderStyle({ "background-color": "var(--color-paper-2)", "color": "var(--color-ink-2)", "border": "1px solid var(--color-rule)" })}"${_scopeId}>${ssrInterpolate(kw.nama)}</span>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="space-y-8"${_scopeId}><div class="p-6 rounded-xl space-y-6" style="${ssrRenderStyle({ "background-color": "var(--color-paper)", "border": "1px solid var(--color-rule)" })}"${_scopeId}><h4 class="font-semibold text-sm pb-3" style="${ssrRenderStyle({ "color": "var(--color-ink)", "border-bottom": "1px solid var(--color-rule)" })}"${_scopeId}>Cover &amp; Lampiran Berkas</h4>`);
            if (!hasAnyFiles.value) {
              _push2(`<div class="text-center py-8"${_scopeId}><div class="w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center" style="${ssrRenderStyle({ "background-color": "var(--color-paper-2)" })}"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                icon: "solar:file-corrupt-bold",
                class: "w-8 h-8",
                style: { "color": "var(--color-ink-2)" }
              }, null, _parent2, _scopeId));
              _push2(`</div><p class="text-xs font-semibold" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}>Belum ada berkas</p><p class="text-[10px] mt-1" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}>Dokumen cover, laporan, dan presentasi belum tersedia.</p></div>`);
            } else {
              _push2(`<!--[--><div class="aspect-[4/3] rounded-xl overflow-hidden relative flex items-center justify-center" style="${ssrRenderStyle({ "background-color": "var(--color-paper-2)", "border": "1px solid var(--color-rule)" })}"${_scopeId}>`);
              if (fileCover.value) {
                _push2(`<img${ssrRenderAttr("src", getFileUrl(fileCover.value))} alt="Cover File" class="w-full h-full object-cover"${_scopeId}>`);
              } else {
                _push2(`<div class="text-center p-6" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_Icon, {
                  icon: "solar:gallery-bold",
                  class: "w-12 h-12 mx-auto mb-2"
                }, null, _parent2, _scopeId));
                _push2(`<span class="text-xs"${_scopeId}>Tidak ada cover</span></div>`);
              }
              _push2(`</div><div class="space-y-3"${_scopeId}>`);
              if (filePdf.value) {
                _push2(`<div class="p-3.5 rounded-xl border space-y-3" style="${ssrRenderStyle({ "border-color": "var(--color-rule)", "background-color": "var(--color-paper-2)" })}"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><div class="p-2 rounded-lg shrink-0" style="${ssrRenderStyle({ "background-color": "var(--color-paper)", "color": "var(--color-accent)" })}"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_Icon, {
                  icon: "solar:file-text-bold",
                  class: "w-5 h-5"
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="min-w-0 flex-grow"${_scopeId}><span class="block text-xs font-bold" style="${ssrRenderStyle({ "color": "var(--color-ink)" })}"${_scopeId}>Laporan Kajian Utama</span><span class="text-[10px] block mt-0.5" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}>${ssrInterpolate(formatSize(filePdf.value.file_size))} · PDF</span></div></div><div class="grid grid-cols-2 gap-2 pt-2 border-t" style="${ssrRenderStyle({ "border-color": "var(--color-rule)" })}"${_scopeId}><a${ssrRenderAttr("href", _ctx.route("portal.preview", { slug: __props.kajian.slug, file_uuid: filePdf.value.uuid }))} target="_blank" class="flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold transition-colors" style="${ssrRenderStyle({ "background-color": "var(--color-paper)", "color": "var(--color-accent)", "border": "1px solid var(--color-rule)" })}"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_Icon, {
                  icon: "solar:eye-bold",
                  class: "w-4 h-4"
                }, null, _parent2, _scopeId));
                _push2(`<span${_scopeId}>Baca</span></a><button class="flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold transition-colors" style="${ssrRenderStyle({ "background-color": "var(--color-accent)", "color": "var(--color-accent-ink)" })}"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_Icon, {
                  icon: "solar:download-bold",
                  class: "w-4 h-4"
                }, null, _parent2, _scopeId));
                _push2(`<span${_scopeId}>Unduh</span></button></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (filePresentasi.value) {
                _push2(`<div class="p-3.5 rounded-xl border space-y-3" style="${ssrRenderStyle({ "border-color": "var(--color-rule)", "background-color": "var(--color-paper-2)" })}"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><div class="p-2 rounded-lg shrink-0" style="${ssrRenderStyle({ "background-color": "var(--color-paper)", "color": "var(--color-accent)" })}"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_Icon, {
                  icon: "solar:play-bold",
                  class: "w-5 h-5"
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="min-w-0 flex-grow"${_scopeId}><span class="block text-xs font-bold" style="${ssrRenderStyle({ "color": "var(--color-ink)" })}"${_scopeId}>Bahan Presentasi / Slide</span><span class="text-[10px] block mt-0.5" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}>${ssrInterpolate(formatSize(filePresentasi.value.file_size))}</span></div></div><div class="grid grid-cols-2 gap-2 pt-2 border-t" style="${ssrRenderStyle({ "border-color": "var(--color-rule)" })}"${_scopeId}><a${ssrRenderAttr("href", _ctx.route("portal.preview", { slug: __props.kajian.slug, file_uuid: filePresentasi.value.uuid }))} target="_blank" class="flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold transition-colors" style="${ssrRenderStyle({ "background-color": "var(--color-paper)", "color": "var(--color-accent)", "border": "1px solid var(--color-rule)" })}"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_Icon, {
                  icon: "solar:eye-bold",
                  class: "w-4 h-4"
                }, null, _parent2, _scopeId));
                _push2(`<span${_scopeId}>Baca</span></a><button class="flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold transition-colors" style="${ssrRenderStyle({ "background-color": "var(--color-accent)", "color": "var(--color-accent-ink)" })}"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_Icon, {
                  icon: "solar:download-bold",
                  class: "w-4 h-4"
                }, null, _parent2, _scopeId));
                _push2(`<span${_scopeId}>Unduh</span></button></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (!filePdf.value && !filePresentasi.value) {
                _push2(`<div class="flex items-center gap-2.5 p-3 rounded-lg" style="${ssrRenderStyle({ "background-color": "var(--color-paper-2)" })}"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_Icon, {
                  icon: "solar:info-circle-bold",
                  class: "w-4 h-4 shrink-0",
                  style: { "color": "var(--color-ink-2)" }
                }, null, _parent2, _scopeId));
                _push2(`<span class="text-[11px]" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}>Laporan dan presentasi belum tersedia.</span></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><!--]-->`);
            }
            _push2(`</div><div class="p-6 rounded-xl space-y-4" style="${ssrRenderStyle({ "background-color": "var(--color-paper)", "border": "1px solid var(--color-rule)" })}"${_scopeId}><h4 class="font-semibold text-sm pb-3" style="${ssrRenderStyle({ "color": "var(--color-ink)", "border-bottom": "1px solid var(--color-rule)" })}"${_scopeId}>Bagikan Dokumen</h4><div class="flex items-center gap-3"${_scopeId}><button class="p-3 rounded-xl transition-colors flex-1 flex justify-center" style="${ssrRenderStyle({ "background-color": "var(--color-paper-2)", "color": "var(--color-accent)" })}" title="WhatsApp"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:phone-calling-rounded-bold",
              class: "w-5 h-5"
            }, null, _parent2, _scopeId));
            _push2(`</button><button class="p-3 rounded-xl transition-colors flex-1 flex justify-center" style="${ssrRenderStyle({ "background-color": "var(--color-paper-2)", "color": "var(--color-accent)" })}" title="Facebook"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:share-circle-bold",
              class: "w-5 h-5"
            }, null, _parent2, _scopeId));
            _push2(`</button><button class="p-3 rounded-xl transition-colors flex-1 flex justify-center" style="${ssrRenderStyle({ "background-color": "var(--color-paper-2)", "color": "var(--color-accent)" })}" title="Twitter"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:globus-bold",
              class: "w-5 h-5"
            }, null, _parent2, _scopeId));
            _push2(`</button><button class="p-3 rounded-xl transition-colors flex-1 flex justify-center" style="${ssrRenderStyle({ "background-color": "var(--color-paper-2)", "color": "var(--color-ink-2)" })}" title="Copy Link"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:copy-bold",
              class: "w-5 h-5"
            }, null, _parent2, _scopeId));
            _push2(`</button></div></div><div class="space-y-4"${_scopeId}><h4 class="font-semibold text-sm pb-2" style="${ssrRenderStyle({ "color": "var(--color-ink)", "border-bottom": "1px solid var(--color-rule)" })}"${_scopeId}>Rekomendasi Terkait</h4>`);
            if (__props.relatedKajians.length === 0) {
              _push2(`<div class="text-xs" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}> Tidak ada kajian sejenis yang ditemukan. </div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(__props.relatedKajians, (rel) => {
              var _a2, _b2;
              _push2(`<div class="p-4 rounded-xl transition-shadow flex items-start gap-3" style="${ssrRenderStyle({ "background-color": "var(--color-paper)", "border": "1px solid var(--color-rule)" })}"${_scopeId}><div class="p-2 rounded-sm shrink-0" style="${ssrRenderStyle({ "background-color": "var(--color-paper-2)", "color": "var(--color-accent)" })}"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                icon: "solar:document-bold",
                class: "w-5 h-5"
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="min-w-0"${_scopeId}><h5 class="text-xs font-semibold line-clamp-2 hover:underline" style="${ssrRenderStyle({ "color": "var(--color-ink)" })}"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("portal.detail", rel.slug)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(rel.judul)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(rel.judul), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</h5><span class="text-[9px] mt-1 block" style="${ssrRenderStyle({ "color": "var(--color-ink-2)" })}"${_scopeId}>${ssrInterpolate((_a2 = rel.tahun) == null ? void 0 : _a2.tahun)} • ${ssrInterpolate((_b2 = rel.bidang) == null ? void 0 : _b2.nama)}</span></div></div>`);
            });
            _push2(`<!--]--></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12" }, [
                createVNode("div", { class: "mb-8 flex items-center gap-2" }, [
                  createVNode(unref(Link), {
                    href: _ctx.route("portal.kajian"),
                    class: "text-xs font-semibold transition-colors flex items-center gap-1",
                    style: { "color": "var(--color-ink-2)" }
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Icon, {
                        icon: "solar:arrow-left-linear",
                        class: "w-4 h-4"
                      }),
                      createTextVNode(" Kembali ke Daftar Kajian ")
                    ]),
                    _: 1
                  }, 8, ["href"])
                ]),
                createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-3 gap-12" }, [
                  createVNode("div", { class: "lg:col-span-2 space-y-8" }, [
                    createVNode("div", { class: "space-y-4" }, [
                      createVNode("span", {
                        class: "inline-block text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full",
                        style: { "background-color": "var(--color-paper-2)", "color": "var(--color-accent)", "border": "1px solid var(--color-rule)" }
                      }, toDisplayString((_d = __props.kajian.jenis_kajian) == null ? void 0 : _d.nama), 1),
                      createVNode("h1", {
                        class: "text-2xl sm:text-3xl font-semibold leading-relaxed",
                        style: { "color": "var(--color-ink)" }
                      }, toDisplayString(__props.kajian.judul), 1),
                      createVNode("p", {
                        class: "text-xs font-medium",
                        style: { "color": "var(--color-ink-2)" }
                      }, " Dipublikasikan pada: " + toDisplayString(new Date(__props.kajian.published_at || __props.kajian.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })), 1)
                    ]),
                    createVNode("div", {
                      class: "grid grid-cols-2 sm:grid-cols-4 gap-6 p-6 rounded-xl text-xs",
                      style: { "background-color": "var(--color-paper)", "border": "1px solid var(--color-rule)" }
                    }, [
                      createVNode("div", null, [
                        createVNode("span", {
                          class: "text-[9px] font-semibold uppercase tracking-wider block",
                          style: { "color": "var(--color-ink-2)" }
                        }, "Tahun"),
                        createVNode("span", {
                          class: "font-semibold mt-1 block",
                          style: { "color": "var(--color-ink)" }
                        }, toDisplayString((_e = __props.kajian.tahun) == null ? void 0 : _e.tahun), 1)
                      ]),
                      createVNode("div", null, [
                        createVNode("span", {
                          class: "text-[9px] font-semibold uppercase tracking-wider block",
                          style: { "color": "var(--color-ink-2)" }
                        }, "Rumpun Bidang"),
                        createVNode("span", {
                          class: "font-semibold mt-1 block",
                          style: { "color": "var(--color-ink)" }
                        }, toDisplayString((_f = __props.kajian.bidang) == null ? void 0 : _f.nama), 1)
                      ]),
                      createVNode("div", null, [
                        createVNode("span", {
                          class: "text-[9px] font-semibold uppercase tracking-wider block",
                          style: { "color": "var(--color-ink-2)" }
                        }, "Penanggung Jawab"),
                        createVNode("span", {
                          class: "font-semibold mt-1 block",
                          style: { "color": "var(--color-ink)" }
                        }, toDisplayString(__props.kajian.penanggung_jawab || "-"), 1)
                      ]),
                      createVNode("div", null, [
                        createVNode("span", {
                          class: "text-[9px] font-semibold uppercase tracking-wider block",
                          style: { "color": "var(--color-ink-2)" }
                        }, "Mitra Rumpun"),
                        createVNode("span", {
                          class: "font-semibold mt-1 block",
                          style: { "color": "var(--color-ink)" }
                        }, toDisplayString(__props.kajian.mitra || "-"), 1)
                      ])
                    ]),
                    __props.kajian.ringkasan ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "space-y-3"
                    }, [
                      createVNode("h4", {
                        class: "font-semibold text-sm uppercase tracking-wider",
                        style: { "color": "var(--color-ink)" }
                      }, "Ringkasan Eksekutif"),
                      createVNode("p", {
                        class: "text-sm leading-relaxed font-light whitespace-pre-line",
                        style: { "color": "var(--color-ink-2)" }
                      }, toDisplayString(__props.kajian.ringkasan), 1)
                    ])) : createCommentVNode("", true),
                    createVNode("div", {
                      class: "grid grid-cols-1 md:grid-cols-2 gap-8 pt-6",
                      style: { "border-top": "1px solid var(--color-rule)" }
                    }, [
                      __props.kajian.tujuan ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "space-y-2"
                      }, [
                        createVNode("h5", {
                          class: "font-semibold text-xs uppercase tracking-wider",
                          style: { "color": "var(--color-ink)" }
                        }, "Tujuan Kajian"),
                        createVNode("p", {
                          class: "text-xs leading-relaxed whitespace-pre-line",
                          style: { "color": "var(--color-ink-2)" }
                        }, toDisplayString(__props.kajian.tujuan), 1)
                      ])) : createCommentVNode("", true),
                      __props.kajian.latar_belakang ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "space-y-2"
                      }, [
                        createVNode("h5", {
                          class: "font-semibold text-xs uppercase tracking-wider",
                          style: { "color": "var(--color-ink)" }
                        }, "Latar Belakang"),
                        createVNode("p", {
                          class: "text-xs leading-relaxed whitespace-pre-line",
                          style: { "color": "var(--color-ink-2)" }
                        }, toDisplayString(__props.kajian.latar_belakang), 1)
                      ])) : createCommentVNode("", true),
                      __props.kajian.metodologi ? (openBlock(), createBlock("div", {
                        key: 2,
                        class: "space-y-2 md:col-span-2 pt-4",
                        style: { "border-top": "1px solid var(--color-rule)" }
                      }, [
                        createVNode("h5", {
                          class: "font-semibold text-xs uppercase tracking-wider",
                          style: { "color": "var(--color-ink)" }
                        }, "Metode Riset"),
                        createVNode("p", {
                          class: "text-xs leading-relaxed whitespace-pre-line",
                          style: { "color": "var(--color-ink-2)" }
                        }, toDisplayString(__props.kajian.metodologi), 1)
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode("div", {
                      class: "grid grid-cols-1 gap-6 pt-6",
                      style: { "border-top": "1px solid var(--color-rule)" }
                    }, [
                      __props.kajian.temuan ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "space-y-2"
                      }, [
                        createVNode("h5", {
                          class: "font-semibold text-xs uppercase tracking-wider",
                          style: { "color": "var(--color-ink)" }
                        }, "Temuan Utama"),
                        createVNode("p", {
                          class: "text-xs leading-relaxed whitespace-pre-line",
                          style: { "color": "var(--color-ink-2)" }
                        }, toDisplayString(__props.kajian.temuan), 1)
                      ])) : createCommentVNode("", true),
                      __props.kajian.rekomendasi ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "space-y-2"
                      }, [
                        createVNode("h5", {
                          class: "font-semibold text-xs uppercase tracking-wider",
                          style: { "color": "var(--color-ink)" }
                        }, "Rekomendasi Kebijakan"),
                        createVNode("p", {
                          class: "text-xs leading-relaxed whitespace-pre-line",
                          style: { "color": "var(--color-ink-2)" }
                        }, toDisplayString(__props.kajian.rekomendasi), 1)
                      ])) : createCommentVNode("", true)
                    ]),
                    __props.kajian.keywords && __props.kajian.keywords.length > 0 ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "pt-6 space-y-3",
                      style: { "border-top": "1px solid var(--color-rule)" }
                    }, [
                      createVNode("h5", {
                        class: "font-semibold text-xs uppercase tracking-wider",
                        style: { "color": "var(--color-ink)" }
                      }, "Kata Kunci"),
                      createVNode("div", { class: "flex flex-wrap gap-2" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.kajian.keywords, (kw) => {
                          return openBlock(), createBlock("span", {
                            key: kw.id,
                            class: "text-xs font-semibold px-3 py-1 rounded-sm",
                            style: { "background-color": "var(--color-paper-2)", "color": "var(--color-ink-2)", "border": "1px solid var(--color-rule)" }
                          }, toDisplayString(kw.nama), 1);
                        }), 128))
                      ])
                    ])) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "space-y-8" }, [
                    createVNode("div", {
                      class: "p-6 rounded-xl space-y-6",
                      style: { "background-color": "var(--color-paper)", "border": "1px solid var(--color-rule)" }
                    }, [
                      createVNode("h4", {
                        class: "font-semibold text-sm pb-3",
                        style: { "color": "var(--color-ink)", "border-bottom": "1px solid var(--color-rule)" }
                      }, "Cover & Lampiran Berkas"),
                      !hasAnyFiles.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-center py-8"
                      }, [
                        createVNode("div", {
                          class: "w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center",
                          style: { "background-color": "var(--color-paper-2)" }
                        }, [
                          createVNode(_component_Icon, {
                            icon: "solar:file-corrupt-bold",
                            class: "w-8 h-8",
                            style: { "color": "var(--color-ink-2)" }
                          })
                        ]),
                        createVNode("p", {
                          class: "text-xs font-semibold",
                          style: { "color": "var(--color-ink-2)" }
                        }, "Belum ada berkas"),
                        createVNode("p", {
                          class: "text-[10px] mt-1",
                          style: { "color": "var(--color-ink-2)" }
                        }, "Dokumen cover, laporan, dan presentasi belum tersedia.")
                      ])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                        createVNode("div", {
                          class: "aspect-[4/3] rounded-xl overflow-hidden relative flex items-center justify-center",
                          style: { "background-color": "var(--color-paper-2)", "border": "1px solid var(--color-rule)" }
                        }, [
                          fileCover.value ? (openBlock(), createBlock("img", {
                            key: 0,
                            src: getFileUrl(fileCover.value),
                            alt: "Cover File",
                            class: "w-full h-full object-cover"
                          }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "text-center p-6",
                            style: { "color": "var(--color-ink-2)" }
                          }, [
                            createVNode(_component_Icon, {
                              icon: "solar:gallery-bold",
                              class: "w-12 h-12 mx-auto mb-2"
                            }),
                            createVNode("span", { class: "text-xs" }, "Tidak ada cover")
                          ]))
                        ]),
                        createVNode("div", { class: "space-y-3" }, [
                          filePdf.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "p-3.5 rounded-xl border space-y-3",
                            style: { "border-color": "var(--color-rule)", "background-color": "var(--color-paper-2)" }
                          }, [
                            createVNode("div", { class: "flex items-center gap-3" }, [
                              createVNode("div", {
                                class: "p-2 rounded-lg shrink-0",
                                style: { "background-color": "var(--color-paper)", "color": "var(--color-accent)" }
                              }, [
                                createVNode(_component_Icon, {
                                  icon: "solar:file-text-bold",
                                  class: "w-5 h-5"
                                })
                              ]),
                              createVNode("div", { class: "min-w-0 flex-grow" }, [
                                createVNode("span", {
                                  class: "block text-xs font-bold",
                                  style: { "color": "var(--color-ink)" }
                                }, "Laporan Kajian Utama"),
                                createVNode("span", {
                                  class: "text-[10px] block mt-0.5",
                                  style: { "color": "var(--color-ink-2)" }
                                }, toDisplayString(formatSize(filePdf.value.file_size)) + " · PDF", 1)
                              ])
                            ]),
                            createVNode("div", {
                              class: "grid grid-cols-2 gap-2 pt-2 border-t",
                              style: { "border-color": "var(--color-rule)" }
                            }, [
                              createVNode("a", {
                                href: _ctx.route("portal.preview", { slug: __props.kajian.slug, file_uuid: filePdf.value.uuid }),
                                target: "_blank",
                                class: "flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold transition-colors",
                                style: { "background-color": "var(--color-paper)", "color": "var(--color-accent)", "border": "1px solid var(--color-rule)" }
                              }, [
                                createVNode(_component_Icon, {
                                  icon: "solar:eye-bold",
                                  class: "w-4 h-4"
                                }),
                                createVNode("span", null, "Baca")
                              ], 8, ["href"]),
                              createVNode("button", {
                                onClick: ($event) => triggerDownload(filePdf.value),
                                class: "flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold transition-colors",
                                style: { "background-color": "var(--color-accent)", "color": "var(--color-accent-ink)" }
                              }, [
                                createVNode(_component_Icon, {
                                  icon: "solar:download-bold",
                                  class: "w-4 h-4"
                                }),
                                createVNode("span", null, "Unduh")
                              ], 8, ["onClick"])
                            ])
                          ])) : createCommentVNode("", true),
                          filePresentasi.value ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "p-3.5 rounded-xl border space-y-3",
                            style: { "border-color": "var(--color-rule)", "background-color": "var(--color-paper-2)" }
                          }, [
                            createVNode("div", { class: "flex items-center gap-3" }, [
                              createVNode("div", {
                                class: "p-2 rounded-lg shrink-0",
                                style: { "background-color": "var(--color-paper)", "color": "var(--color-accent)" }
                              }, [
                                createVNode(_component_Icon, {
                                  icon: "solar:play-bold",
                                  class: "w-5 h-5"
                                })
                              ]),
                              createVNode("div", { class: "min-w-0 flex-grow" }, [
                                createVNode("span", {
                                  class: "block text-xs font-bold",
                                  style: { "color": "var(--color-ink)" }
                                }, "Bahan Presentasi / Slide"),
                                createVNode("span", {
                                  class: "text-[10px] block mt-0.5",
                                  style: { "color": "var(--color-ink-2)" }
                                }, toDisplayString(formatSize(filePresentasi.value.file_size)), 1)
                              ])
                            ]),
                            createVNode("div", {
                              class: "grid grid-cols-2 gap-2 pt-2 border-t",
                              style: { "border-color": "var(--color-rule)" }
                            }, [
                              createVNode("a", {
                                href: _ctx.route("portal.preview", { slug: __props.kajian.slug, file_uuid: filePresentasi.value.uuid }),
                                target: "_blank",
                                class: "flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold transition-colors",
                                style: { "background-color": "var(--color-paper)", "color": "var(--color-accent)", "border": "1px solid var(--color-rule)" }
                              }, [
                                createVNode(_component_Icon, {
                                  icon: "solar:eye-bold",
                                  class: "w-4 h-4"
                                }),
                                createVNode("span", null, "Baca")
                              ], 8, ["href"]),
                              createVNode("button", {
                                onClick: ($event) => triggerDownload(filePresentasi.value),
                                class: "flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold transition-colors",
                                style: { "background-color": "var(--color-accent)", "color": "var(--color-accent-ink)" }
                              }, [
                                createVNode(_component_Icon, {
                                  icon: "solar:download-bold",
                                  class: "w-4 h-4"
                                }),
                                createVNode("span", null, "Unduh")
                              ], 8, ["onClick"])
                            ])
                          ])) : createCommentVNode("", true),
                          !filePdf.value && !filePresentasi.value ? (openBlock(), createBlock("div", {
                            key: 2,
                            class: "flex items-center gap-2.5 p-3 rounded-lg",
                            style: { "background-color": "var(--color-paper-2)" }
                          }, [
                            createVNode(_component_Icon, {
                              icon: "solar:info-circle-bold",
                              class: "w-4 h-4 shrink-0",
                              style: { "color": "var(--color-ink-2)" }
                            }),
                            createVNode("span", {
                              class: "text-[11px]",
                              style: { "color": "var(--color-ink-2)" }
                            }, "Laporan dan presentasi belum tersedia.")
                          ])) : createCommentVNode("", true)
                        ])
                      ], 64))
                    ]),
                    createVNode("div", {
                      class: "p-6 rounded-xl space-y-4",
                      style: { "background-color": "var(--color-paper)", "border": "1px solid var(--color-rule)" }
                    }, [
                      createVNode("h4", {
                        class: "font-semibold text-sm pb-3",
                        style: { "color": "var(--color-ink)", "border-bottom": "1px solid var(--color-rule)" }
                      }, "Bagikan Dokumen"),
                      createVNode("div", { class: "flex items-center gap-3" }, [
                        createVNode("button", {
                          onClick: ($event) => shareLink("whatsapp"),
                          class: "p-3 rounded-xl transition-colors flex-1 flex justify-center",
                          style: { "background-color": "var(--color-paper-2)", "color": "var(--color-accent)" },
                          title: "WhatsApp"
                        }, [
                          createVNode(_component_Icon, {
                            icon: "solar:phone-calling-rounded-bold",
                            class: "w-5 h-5"
                          })
                        ], 8, ["onClick"]),
                        createVNode("button", {
                          onClick: ($event) => shareLink("facebook"),
                          class: "p-3 rounded-xl transition-colors flex-1 flex justify-center",
                          style: { "background-color": "var(--color-paper-2)", "color": "var(--color-accent)" },
                          title: "Facebook"
                        }, [
                          createVNode(_component_Icon, {
                            icon: "solar:share-circle-bold",
                            class: "w-5 h-5"
                          })
                        ], 8, ["onClick"]),
                        createVNode("button", {
                          onClick: ($event) => shareLink("twitter"),
                          class: "p-3 rounded-xl transition-colors flex-1 flex justify-center",
                          style: { "background-color": "var(--color-paper-2)", "color": "var(--color-accent)" },
                          title: "Twitter"
                        }, [
                          createVNode(_component_Icon, {
                            icon: "solar:globus-bold",
                            class: "w-5 h-5"
                          })
                        ], 8, ["onClick"]),
                        createVNode("button", {
                          onClick: ($event) => shareLink("copy"),
                          class: "p-3 rounded-xl transition-colors flex-1 flex justify-center",
                          style: { "background-color": "var(--color-paper-2)", "color": "var(--color-ink-2)" },
                          title: "Copy Link"
                        }, [
                          createVNode(_component_Icon, {
                            icon: "solar:copy-bold",
                            class: "w-5 h-5"
                          })
                        ], 8, ["onClick"])
                      ])
                    ]),
                    createVNode("div", { class: "space-y-4" }, [
                      createVNode("h4", {
                        class: "font-semibold text-sm pb-2",
                        style: { "color": "var(--color-ink)", "border-bottom": "1px solid var(--color-rule)" }
                      }, "Rekomendasi Terkait"),
                      __props.relatedKajians.length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-xs",
                        style: { "color": "var(--color-ink-2)" }
                      }, " Tidak ada kajian sejenis yang ditemukan. ")) : createCommentVNode("", true),
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.relatedKajians, (rel) => {
                        var _a2, _b2;
                        return openBlock(), createBlock("div", {
                          key: rel.id,
                          class: "p-4 rounded-xl transition-shadow flex items-start gap-3",
                          style: { "background-color": "var(--color-paper)", "border": "1px solid var(--color-rule)" }
                        }, [
                          createVNode("div", {
                            class: "p-2 rounded-sm shrink-0",
                            style: { "background-color": "var(--color-paper-2)", "color": "var(--color-accent)" }
                          }, [
                            createVNode(_component_Icon, {
                              icon: "solar:document-bold",
                              class: "w-5 h-5"
                            })
                          ]),
                          createVNode("div", { class: "min-w-0" }, [
                            createVNode("h5", {
                              class: "text-xs font-semibold line-clamp-2 hover:underline",
                              style: { "color": "var(--color-ink)" }
                            }, [
                              createVNode(unref(Link), {
                                href: _ctx.route("portal.detail", rel.slug)
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(rel.judul), 1)
                                ]),
                                _: 2
                              }, 1032, ["href"])
                            ]),
                            createVNode("span", {
                              class: "text-[9px] mt-1 block",
                              style: { "color": "var(--color-ink-2)" }
                            }, toDisplayString((_a2 = rel.tahun) == null ? void 0 : _a2.tahun) + " • " + toDisplayString((_b2 = rel.bidang) == null ? void 0 : _b2.nama), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Frontend/Portal/KajianDetail.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
