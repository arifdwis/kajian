import { onMounted, resolveComponent, unref, withCtx, createVNode, createTextVNode, withModifiers, withDirectives, vModelText, openBlock, createBlock, Fragment, renderList, toDisplayString, vModelSelect, vModelCheckbox, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-C8eooNFo.js";
import { useToast } from "vue-toastification";
import "flowbite-vue";
import "./ApplicationLogo-CmsQkCHn.js";
import "@iconify/vue";
import "mitt";
const _sfc_main = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    kajian: Object,
    bidangs: Array,
    jenisKajians: Array,
    tahuns: Array,
    keywords: Array
  },
  setup(__props) {
    const toast = useToast();
    const props = __props;
    const form = useForm({
      _method: "PUT",
      judul: props.kajian.judul || "",
      tahun_id: props.kajian.tahun_id || "",
      bidang_id: props.kajian.bidang_id || "",
      jenis_id: props.kajian.jenis_id || "",
      ringkasan: props.kajian.ringkasan || "",
      tujuan: props.kajian.tujuan || "",
      latar_belakang: props.kajian.latar_belakang || "",
      metodologi: props.kajian.metodologi || "",
      lokasi: props.kajian.lokasi || "",
      tanggal: props.kajian.tanggal ? props.kajian.tanggal.substring(0, 10) : "",
      penanggung_jawab: props.kajian.penanggung_jawab || "",
      koordinator: props.kajian.koordinator || "",
      mitra: props.kajian.mitra || "",
      temuan: props.kajian.temuan || "",
      rekomendasi: props.kajian.rekomendasi || "",
      implikasi: props.kajian.implikasi || "",
      status: props.kajian.status || "draft",
      keywords: [],
      file_pdf: null,
      file_presentasi: null,
      file_cover: null,
      changes_summary: ""
    });
    onMounted(() => {
      if (props.kajian.keywords) {
        form.keywords = props.kajian.keywords.map((kw) => kw.id);
      }
    });
    const handleFileChange = (e, field) => {
      form[field] = e.target.files[0];
    };
    const getFileUrl = (type) => {
      if (!props.kajian.files) return null;
      const file = props.kajian.files.find((f) => f.tipe === type);
      return file ? `/storage/${file.path}` : null;
    };
    const submit = () => {
      form.post(route("kajian.update", props.kajian.id), {
        onSuccess: () => {
          toast.success("Kajian berhasil diperbarui.");
        },
        onError: (errors) => {
          Object.values(errors).forEach((err) => toast.error(err));
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = resolveComponent("Icon");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Edit Kajian" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="max-w-5xl mx-auto space-y-6"${_scopeId}><div class="flex items-center justify-between bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700"${_scopeId}><div class="flex items-center gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("kajian.show", __props.kajian.id),
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
            _push2(`<div${_scopeId}><h3 class="text-xl font-bold text-gray-900 dark:text-white"${_scopeId}>Edit Dokumen Kajian</h3><p class="text-xs text-gray-500 mt-1"${_scopeId}>Perbarui rincian riset dan ubah berkas lampiran.</p></div></div></div><form class="space-y-6"${_scopeId}><div class="bg-paper dark:bg-gray-800 p-8 rounded-card border border-gray-100 dark:border-gray-700 space-y-6"${_scopeId}><h4 class="text-sm font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 pb-3 flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:info-square-bold",
              class: "w-5 h-5 text-blue-500"
            }, null, _parent2, _scopeId));
            _push2(` Informasi Dasar </h4><div class="grid grid-cols-1 md:grid-cols-3 gap-6"${_scopeId}><div class="md:col-span-3"${_scopeId}><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"${_scopeId}>Judul Kajian / Penelitian <span class="text-red-500"${_scopeId}>*</span></label><input type="text"${ssrRenderAttr("value", unref(form).judul)} required class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5 focus:ring-2 focus:ring-blue-500/20"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"${_scopeId}>Tahun Kajian <span class="text-red-500"${_scopeId}>*</span></label><select required class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5 focus:ring-2 focus:ring-blue-500/20"${_scopeId}><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(unref(form).tahun_id) ? ssrLooseContain(unref(form).tahun_id, "") : ssrLooseEqual(unref(form).tahun_id, "")) ? " selected" : ""}${_scopeId}>Pilih Tahun</option><!--[-->`);
            ssrRenderList(__props.tahuns, (t) => {
              _push2(`<option${ssrRenderAttr("value", t.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).tahun_id) ? ssrLooseContain(unref(form).tahun_id, t.id) : ssrLooseEqual(unref(form).tahun_id, t.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(t.tahun)}</option>`);
            });
            _push2(`<!--]--></select></div><div${_scopeId}><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"${_scopeId}>Bidang OPD <span class="text-red-500"${_scopeId}>*</span></label><select required class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5 focus:ring-2 focus:ring-blue-500/20"${_scopeId}><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(unref(form).bidang_id) ? ssrLooseContain(unref(form).bidang_id, "") : ssrLooseEqual(unref(form).bidang_id, "")) ? " selected" : ""}${_scopeId}>Pilih Bidang</option><!--[-->`);
            ssrRenderList(__props.bidangs, (b) => {
              _push2(`<option${ssrRenderAttr("value", b.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).bidang_id) ? ssrLooseContain(unref(form).bidang_id, b.id) : ssrLooseEqual(unref(form).bidang_id, b.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(b.nama)}</option>`);
            });
            _push2(`<!--]--></select></div><div${_scopeId}><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"${_scopeId}>Jenis Kajian <span class="text-red-500"${_scopeId}>*</span></label><select required class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5 focus:ring-2 focus:ring-blue-500/20"${_scopeId}><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(unref(form).jenis_id) ? ssrLooseContain(unref(form).jenis_id, "") : ssrLooseEqual(unref(form).jenis_id, "")) ? " selected" : ""}${_scopeId}>Pilih Jenis</option><!--[-->`);
            ssrRenderList(__props.jenisKajians, (j) => {
              _push2(`<option${ssrRenderAttr("value", j.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).jenis_id) ? ssrLooseContain(unref(form).jenis_id, j.id) : ssrLooseEqual(unref(form).jenis_id, j.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(j.nama)}</option>`);
            });
            _push2(`<!--]--></select></div></div></div><div class="bg-paper dark:bg-gray-800 p-8 rounded-card border border-gray-100 dark:border-gray-700 space-y-6"${_scopeId}><h4 class="text-sm font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 pb-3 flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:document-text-bold",
              class: "w-5 h-5 text-blue-500"
            }, null, _parent2, _scopeId));
            _push2(` Deskripsi &amp; Substansi Kajian </h4><div class="space-y-5"${_scopeId}><div${_scopeId}><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"${_scopeId}>Ringkasan Eksekutif (Abstrak)</label><textarea rows="4" class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5 focus:ring-2 focus:ring-blue-500/20"${_scopeId}>${ssrInterpolate(unref(form).ringkasan)}</textarea></div><div class="grid grid-cols-1 md:grid-cols-2 gap-5"${_scopeId}><div${_scopeId}><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"${_scopeId}>Tujuan Kajian</label><textarea rows="3" class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5"${_scopeId}>${ssrInterpolate(unref(form).tujuan)}</textarea></div><div${_scopeId}><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"${_scopeId}>Latar Belakang</label><textarea rows="3" class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5"${_scopeId}>${ssrInterpolate(unref(form).latar_belakang)}</textarea></div></div><div${_scopeId}><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"${_scopeId}>Metodologi Penelitian</label><textarea rows="3" class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5"${_scopeId}>${ssrInterpolate(unref(form).metodologi)}</textarea></div></div></div><div class="bg-paper dark:bg-gray-800 p-8 rounded-card border border-gray-100 dark:border-gray-700 space-y-6"${_scopeId}><h4 class="text-sm font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 pb-3 flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:users-group-two-rounded-bold",
              class: "w-5 h-5 text-blue-500"
            }, null, _parent2, _scopeId));
            _push2(` Pelaksanaan &amp; Kemitraan </h4><div class="grid grid-cols-1 md:grid-cols-2 gap-5"${_scopeId}><div${_scopeId}><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"${_scopeId}>Lokasi Penelitian</label><input type="text"${ssrRenderAttr("value", unref(form).lokasi)} class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"${_scopeId}>Tanggal Publikasi / Selesai</label><input type="date"${ssrRenderAttr("value", unref(form).tanggal)} class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"${_scopeId}>Penanggung Jawab (PJ)</label><input type="text"${ssrRenderAttr("value", unref(form).penanggung_jawab)} class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"${_scopeId}>Mitra Peneliti / Pihak Ketiga</label><input type="text"${ssrRenderAttr("value", unref(form).mitra)} class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5"${_scopeId}></div></div></div><div class="bg-paper dark:bg-gray-800 p-8 rounded-card border border-gray-100 dark:border-gray-700 space-y-6"${_scopeId}><h4 class="text-sm font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 pb-3 flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:diploma-verified-bold",
              class: "w-5 h-5 text-blue-500"
            }, null, _parent2, _scopeId));
            _push2(` Hasil &amp; Rekomendasi Kebijakan </h4><div class="space-y-5"${_scopeId}><div${_scopeId}><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"${_scopeId}>Temuan Utama</label><textarea rows="3" class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5"${_scopeId}>${ssrInterpolate(unref(form).temuan)}</textarea></div><div${_scopeId}><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"${_scopeId}>Rekomendasi Strategis</label><textarea rows="3" class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5"${_scopeId}>${ssrInterpolate(unref(form).rekomendasi)}</textarea></div></div></div><div class="bg-paper dark:bg-gray-800 p-8 rounded-card border border-gray-100 dark:border-gray-700 space-y-6"${_scopeId}><h4 class="text-sm font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 pb-3 flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:tag-bold",
              class: "w-5 h-5 text-blue-500"
            }, null, _parent2, _scopeId));
            _push2(` Tagging Kata Kunci </h4><div${_scopeId}><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3"${_scopeId}>Pilih Kata Kunci Relevan</label><div class="flex flex-wrap gap-3"${_scopeId}><!--[-->`);
            ssrRenderList(__props.keywords, (kw) => {
              _push2(`<label class="inline-flex items-center gap-2 px-3 py-1.5 border border-gray-200 dark:border-gray-700 rounded-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 select-none text-xs"${_scopeId}><input type="checkbox"${ssrRenderAttr("value", kw.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).keywords) ? ssrLooseContain(unref(form).keywords, kw.id) : unref(form).keywords) ? " checked" : ""} class="rounded text-blue-600 focus:ring-blue-500/20"${_scopeId}><span class="text-gray-700 dark:text-gray-300 font-medium"${_scopeId}>${ssrInterpolate(kw.nama)}</span></label>`);
            });
            _push2(`<!--]--></div></div></div><div class="bg-paper dark:bg-gray-800 p-8 rounded-card border border-gray-100 dark:border-gray-700 space-y-6"${_scopeId}><h4 class="text-sm font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 pb-3 flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:upload-bold",
              class: "w-5 h-5 text-blue-500"
            }, null, _parent2, _scopeId));
            _push2(` Upload Berkas Riset (Biarkan kosong jika tidak ingin mengubah berkas) </h4><div class="grid grid-cols-1 md:grid-cols-3 gap-6"${_scopeId}><div class="p-5 border border-dashed border-gray-200 dark:border-gray-700 rounded-card flex flex-col justify-between items-center text-center"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:gallery-bold",
              class: "w-8 h-8 text-blue-500 mx-auto mb-2"
            }, null, _parent2, _scopeId));
            _push2(`<span class="block text-xs font-semibold text-gray-700 dark:text-gray-300"${_scopeId}>Gambar Cover</span><span class="text-[10px] text-gray-400 mt-1 block"${_scopeId}>JPG, PNG (Maks 5MB)</span>`);
            if (getFileUrl("cover")) {
              _push2(`<a${ssrRenderAttr("href", getFileUrl("cover"))} target="_blank" class="text-[10px] text-blue-500 font-semibold underline mt-2 block"${_scopeId}> Lihat File Aktif </a>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><input type="file" class="mt-4 text-xs w-full" accept="image/*"${_scopeId}></div><div class="p-5 border border-dashed border-gray-200 dark:border-gray-700 rounded-card flex flex-col justify-between items-center text-center"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:file-text-bold",
              class: "w-8 h-8 text-red-500 mx-auto mb-2"
            }, null, _parent2, _scopeId));
            _push2(`<span class="block text-xs font-semibold text-gray-700 dark:text-gray-300"${_scopeId}>Dokumen Utama PDF</span><span class="text-[10px] text-gray-400 mt-1 block"${_scopeId}>PDF Only (Maks 20MB)</span>`);
            if (getFileUrl("pdf")) {
              _push2(`<a${ssrRenderAttr("href", getFileUrl("pdf"))} target="_blank" class="text-[10px] text-blue-500 font-semibold underline mt-2 block"${_scopeId}> Lihat File Aktif </a>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><input type="file" class="mt-4 text-xs w-full" accept="application/pdf"${_scopeId}></div><div class="p-5 border border-dashed border-gray-200 dark:border-gray-700 rounded-card flex flex-col justify-between items-center text-center"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:play-bold",
              class: "w-8 h-8 text-amber-500 mx-auto mb-2"
            }, null, _parent2, _scopeId));
            _push2(`<span class="block text-xs font-semibold text-gray-700 dark:text-gray-300"${_scopeId}>Presentasi / Slide</span><span class="text-[10px] text-gray-400 mt-1 block"${_scopeId}>PPT, PPTX, PDF (Maks 20MB)</span>`);
            if (getFileUrl("presentasi")) {
              _push2(`<a${ssrRenderAttr("href", getFileUrl("presentasi"))} target="_blank" class="text-[10px] text-blue-500 font-semibold underline mt-2 block"${_scopeId}> Lihat File Aktif </a>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><input type="file" class="mt-4 text-xs w-full" accept=".ppt,.pptx,application/pdf"${_scopeId}></div></div></div><div class="bg-paper dark:bg-gray-800 p-8 rounded-card border border-gray-100 dark:border-gray-700 space-y-6"${_scopeId}><h4 class="text-sm font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 pb-3 flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:history-bold",
              class: "w-5 h-5 text-blue-500"
            }, null, _parent2, _scopeId));
            _push2(` Catatan Perubahan (Version Control) </h4><div${_scopeId}><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"${_scopeId}>Ringkasan Perubahan <span class="text-red-500"${_scopeId}>*</span></label><input type="text"${ssrRenderAttr("value", unref(form).changes_summary)} required class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5 focus:ring-2 focus:ring-blue-500/20" placeholder="Contoh: Mengoreksi temuan utama, Memperbarui berkas presentasi..."${_scopeId}></div></div><div class="flex items-center justify-end gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("kajian.show", __props.kajian.id),
              class: "px-5 py-3 border border-gray-200 dark:border-gray-700 rounded-card text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Batal `);
                } else {
                  return [
                    createTextVNode(" Batal ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="px-6 py-3 bg-accent text-accent-ink font-bold rounded-card transition-colors text-sm disabled:opacity-50 inline-flex items-center gap-2"${_scopeId}>`);
            if (unref(form).processing) {
              _push2(ssrRenderComponent(_component_Icon, {
                icon: "svg-spinners:ring-resize",
                class: "w-5 h-5 animate-spin"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`<span${_scopeId}>Simpan Perubahan</span></button></div></form></div>`);
          } else {
            return [
              createVNode("div", { class: "max-w-5xl mx-auto space-y-6" }, [
                createVNode("div", { class: "flex items-center justify-between bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700" }, [
                  createVNode("div", { class: "flex items-center gap-3" }, [
                    createVNode(unref(Link), {
                      href: _ctx.route("kajian.show", __props.kajian.id),
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
                      createVNode("h3", { class: "text-xl font-bold text-gray-900 dark:text-white" }, "Edit Dokumen Kajian"),
                      createVNode("p", { class: "text-xs text-gray-500 mt-1" }, "Perbarui rincian riset dan ubah berkas lampiran.")
                    ])
                  ])
                ]),
                createVNode("form", {
                  onSubmit: withModifiers(submit, ["prevent"]),
                  class: "space-y-6"
                }, [
                  createVNode("div", { class: "bg-paper dark:bg-gray-800 p-8 rounded-card border border-gray-100 dark:border-gray-700 space-y-6" }, [
                    createVNode("h4", { class: "text-sm font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 pb-3 flex items-center gap-2" }, [
                      createVNode(_component_Icon, {
                        icon: "solar:info-square-bold",
                        class: "w-5 h-5 text-blue-500"
                      }),
                      createTextVNode(" Informasi Dasar ")
                    ]),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-6" }, [
                      createVNode("div", { class: "md:col-span-3" }, [
                        createVNode("label", { class: "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2" }, [
                          createTextVNode("Judul Kajian / Penelitian "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).judul = $event,
                          required: "",
                          class: "w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5 focus:ring-2 focus:ring-blue-500/20"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).judul]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2" }, [
                          createTextVNode("Tahun Kajian "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(form).tahun_id = $event,
                          required: "",
                          class: "w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5 focus:ring-2 focus:ring-blue-500/20"
                        }, [
                          createVNode("option", {
                            value: "",
                            disabled: ""
                          }, "Pilih Tahun"),
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.tahuns, (t) => {
                            return openBlock(), createBlock("option", {
                              key: t.id,
                              value: t.id
                            }, toDisplayString(t.tahun), 9, ["value"]);
                          }), 128))
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(form).tahun_id]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2" }, [
                          createTextVNode("Bidang OPD "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(form).bidang_id = $event,
                          required: "",
                          class: "w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5 focus:ring-2 focus:ring-blue-500/20"
                        }, [
                          createVNode("option", {
                            value: "",
                            disabled: ""
                          }, "Pilih Bidang"),
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.bidangs, (b) => {
                            return openBlock(), createBlock("option", {
                              key: b.id,
                              value: b.id
                            }, toDisplayString(b.nama), 9, ["value"]);
                          }), 128))
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(form).bidang_id]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2" }, [
                          createTextVNode("Jenis Kajian "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(form).jenis_id = $event,
                          required: "",
                          class: "w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5 focus:ring-2 focus:ring-blue-500/20"
                        }, [
                          createVNode("option", {
                            value: "",
                            disabled: ""
                          }, "Pilih Jenis"),
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.jenisKajians, (j) => {
                            return openBlock(), createBlock("option", {
                              key: j.id,
                              value: j.id
                            }, toDisplayString(j.nama), 9, ["value"]);
                          }), 128))
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(form).jenis_id]
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-paper dark:bg-gray-800 p-8 rounded-card border border-gray-100 dark:border-gray-700 space-y-6" }, [
                    createVNode("h4", { class: "text-sm font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 pb-3 flex items-center gap-2" }, [
                      createVNode(_component_Icon, {
                        icon: "solar:document-text-bold",
                        class: "w-5 h-5 text-blue-500"
                      }),
                      createTextVNode(" Deskripsi & Substansi Kajian ")
                    ]),
                    createVNode("div", { class: "space-y-5" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2" }, "Ringkasan Eksekutif (Abstrak)"),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(form).ringkasan = $event,
                          rows: "4",
                          class: "w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5 focus:ring-2 focus:ring-blue-500/20"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).ringkasan]
                        ])
                      ]),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-5" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2" }, "Tujuan Kajian"),
                          withDirectives(createVNode("textarea", {
                            "onUpdate:modelValue": ($event) => unref(form).tujuan = $event,
                            rows: "3",
                            class: "w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).tujuan]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2" }, "Latar Belakang"),
                          withDirectives(createVNode("textarea", {
                            "onUpdate:modelValue": ($event) => unref(form).latar_belakang = $event,
                            rows: "3",
                            class: "w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).latar_belakang]
                          ])
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2" }, "Metodologi Penelitian"),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(form).metodologi = $event,
                          rows: "3",
                          class: "w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).metodologi]
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-paper dark:bg-gray-800 p-8 rounded-card border border-gray-100 dark:border-gray-700 space-y-6" }, [
                    createVNode("h4", { class: "text-sm font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 pb-3 flex items-center gap-2" }, [
                      createVNode(_component_Icon, {
                        icon: "solar:users-group-two-rounded-bold",
                        class: "w-5 h-5 text-blue-500"
                      }),
                      createTextVNode(" Pelaksanaan & Kemitraan ")
                    ]),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-5" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2" }, "Lokasi Penelitian"),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).lokasi = $event,
                          class: "w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).lokasi]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2" }, "Tanggal Publikasi / Selesai"),
                        withDirectives(createVNode("input", {
                          type: "date",
                          "onUpdate:modelValue": ($event) => unref(form).tanggal = $event,
                          class: "w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).tanggal]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2" }, "Penanggung Jawab (PJ)"),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).penanggung_jawab = $event,
                          class: "w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).penanggung_jawab]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2" }, "Mitra Peneliti / Pihak Ketiga"),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).mitra = $event,
                          class: "w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).mitra]
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-paper dark:bg-gray-800 p-8 rounded-card border border-gray-100 dark:border-gray-700 space-y-6" }, [
                    createVNode("h4", { class: "text-sm font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 pb-3 flex items-center gap-2" }, [
                      createVNode(_component_Icon, {
                        icon: "solar:diploma-verified-bold",
                        class: "w-5 h-5 text-blue-500"
                      }),
                      createTextVNode(" Hasil & Rekomendasi Kebijakan ")
                    ]),
                    createVNode("div", { class: "space-y-5" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2" }, "Temuan Utama"),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(form).temuan = $event,
                          rows: "3",
                          class: "w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).temuan]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2" }, "Rekomendasi Strategis"),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(form).rekomendasi = $event,
                          rows: "3",
                          class: "w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).rekomendasi]
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-paper dark:bg-gray-800 p-8 rounded-card border border-gray-100 dark:border-gray-700 space-y-6" }, [
                    createVNode("h4", { class: "text-sm font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 pb-3 flex items-center gap-2" }, [
                      createVNode(_component_Icon, {
                        icon: "solar:tag-bold",
                        class: "w-5 h-5 text-blue-500"
                      }),
                      createTextVNode(" Tagging Kata Kunci ")
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3" }, "Pilih Kata Kunci Relevan"),
                      createVNode("div", { class: "flex flex-wrap gap-3" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.keywords, (kw) => {
                          return openBlock(), createBlock("label", {
                            key: kw.id,
                            class: "inline-flex items-center gap-2 px-3 py-1.5 border border-gray-200 dark:border-gray-700 rounded-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 select-none text-xs"
                          }, [
                            withDirectives(createVNode("input", {
                              type: "checkbox",
                              value: kw.id,
                              "onUpdate:modelValue": ($event) => unref(form).keywords = $event,
                              class: "rounded text-blue-600 focus:ring-blue-500/20"
                            }, null, 8, ["value", "onUpdate:modelValue"]), [
                              [vModelCheckbox, unref(form).keywords]
                            ]),
                            createVNode("span", { class: "text-gray-700 dark:text-gray-300 font-medium" }, toDisplayString(kw.nama), 1)
                          ]);
                        }), 128))
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-paper dark:bg-gray-800 p-8 rounded-card border border-gray-100 dark:border-gray-700 space-y-6" }, [
                    createVNode("h4", { class: "text-sm font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 pb-3 flex items-center gap-2" }, [
                      createVNode(_component_Icon, {
                        icon: "solar:upload-bold",
                        class: "w-5 h-5 text-blue-500"
                      }),
                      createTextVNode(" Upload Berkas Riset (Biarkan kosong jika tidak ingin mengubah berkas) ")
                    ]),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-6" }, [
                      createVNode("div", { class: "p-5 border border-dashed border-gray-200 dark:border-gray-700 rounded-card flex flex-col justify-between items-center text-center" }, [
                        createVNode("div", null, [
                          createVNode(_component_Icon, {
                            icon: "solar:gallery-bold",
                            class: "w-8 h-8 text-blue-500 mx-auto mb-2"
                          }),
                          createVNode("span", { class: "block text-xs font-semibold text-gray-700 dark:text-gray-300" }, "Gambar Cover"),
                          createVNode("span", { class: "text-[10px] text-gray-400 mt-1 block" }, "JPG, PNG (Maks 5MB)"),
                          getFileUrl("cover") ? (openBlock(), createBlock("a", {
                            key: 0,
                            href: getFileUrl("cover"),
                            target: "_blank",
                            class: "text-[10px] text-blue-500 font-semibold underline mt-2 block"
                          }, " Lihat File Aktif ", 8, ["href"])) : createCommentVNode("", true)
                        ]),
                        createVNode("input", {
                          type: "file",
                          class: "mt-4 text-xs w-full",
                          onChange: ($event) => handleFileChange($event, "file_cover"),
                          accept: "image/*"
                        }, null, 40, ["onChange"])
                      ]),
                      createVNode("div", { class: "p-5 border border-dashed border-gray-200 dark:border-gray-700 rounded-card flex flex-col justify-between items-center text-center" }, [
                        createVNode("div", null, [
                          createVNode(_component_Icon, {
                            icon: "solar:file-text-bold",
                            class: "w-8 h-8 text-red-500 mx-auto mb-2"
                          }),
                          createVNode("span", { class: "block text-xs font-semibold text-gray-700 dark:text-gray-300" }, "Dokumen Utama PDF"),
                          createVNode("span", { class: "text-[10px] text-gray-400 mt-1 block" }, "PDF Only (Maks 20MB)"),
                          getFileUrl("pdf") ? (openBlock(), createBlock("a", {
                            key: 0,
                            href: getFileUrl("pdf"),
                            target: "_blank",
                            class: "text-[10px] text-blue-500 font-semibold underline mt-2 block"
                          }, " Lihat File Aktif ", 8, ["href"])) : createCommentVNode("", true)
                        ]),
                        createVNode("input", {
                          type: "file",
                          class: "mt-4 text-xs w-full",
                          onChange: ($event) => handleFileChange($event, "file_pdf"),
                          accept: "application/pdf"
                        }, null, 40, ["onChange"])
                      ]),
                      createVNode("div", { class: "p-5 border border-dashed border-gray-200 dark:border-gray-700 rounded-card flex flex-col justify-between items-center text-center" }, [
                        createVNode("div", null, [
                          createVNode(_component_Icon, {
                            icon: "solar:play-bold",
                            class: "w-8 h-8 text-amber-500 mx-auto mb-2"
                          }),
                          createVNode("span", { class: "block text-xs font-semibold text-gray-700 dark:text-gray-300" }, "Presentasi / Slide"),
                          createVNode("span", { class: "text-[10px] text-gray-400 mt-1 block" }, "PPT, PPTX, PDF (Maks 20MB)"),
                          getFileUrl("presentasi") ? (openBlock(), createBlock("a", {
                            key: 0,
                            href: getFileUrl("presentasi"),
                            target: "_blank",
                            class: "text-[10px] text-blue-500 font-semibold underline mt-2 block"
                          }, " Lihat File Aktif ", 8, ["href"])) : createCommentVNode("", true)
                        ]),
                        createVNode("input", {
                          type: "file",
                          class: "mt-4 text-xs w-full",
                          onChange: ($event) => handleFileChange($event, "file_presentasi"),
                          accept: ".ppt,.pptx,application/pdf"
                        }, null, 40, ["onChange"])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-paper dark:bg-gray-800 p-8 rounded-card border border-gray-100 dark:border-gray-700 space-y-6" }, [
                    createVNode("h4", { class: "text-sm font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 pb-3 flex items-center gap-2" }, [
                      createVNode(_component_Icon, {
                        icon: "solar:history-bold",
                        class: "w-5 h-5 text-blue-500"
                      }),
                      createTextVNode(" Catatan Perubahan (Version Control) ")
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2" }, [
                        createTextVNode("Ringkasan Perubahan "),
                        createVNode("span", { class: "text-red-500" }, "*")
                      ]),
                      withDirectives(createVNode("input", {
                        type: "text",
                        "onUpdate:modelValue": ($event) => unref(form).changes_summary = $event,
                        required: "",
                        class: "w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5 focus:ring-2 focus:ring-blue-500/20",
                        placeholder: "Contoh: Mengoreksi temuan utama, Memperbarui berkas presentasi..."
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).changes_summary]
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "flex items-center justify-end gap-3" }, [
                    createVNode(unref(Link), {
                      href: _ctx.route("kajian.show", __props.kajian.id),
                      class: "px-5 py-3 border border-gray-200 dark:border-gray-700 rounded-card text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Batal ")
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode("button", {
                      type: "submit",
                      disabled: unref(form).processing,
                      class: "px-6 py-3 bg-accent text-accent-ink font-bold rounded-card transition-colors text-sm disabled:opacity-50 inline-flex items-center gap-2"
                    }, [
                      unref(form).processing ? (openBlock(), createBlock(_component_Icon, {
                        key: 0,
                        icon: "svg-spinners:ring-resize",
                        class: "w-5 h-5 animate-spin"
                      })) : createCommentVNode("", true),
                      createVNode("span", null, "Simpan Perubahan")
                    ], 8, ["disabled"])
                  ])
                ], 32)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Backend/Kajian/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
