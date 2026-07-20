import { computed, onMounted, ref, resolveComponent, unref, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, createCommentVNode, withModifiers, withDirectives, vModelText, vShow, vModelCheckbox, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderStyle, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain } from "vue/server-renderer";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-CCLRqrRv.js";
import { useToast } from "vue-toastification";
import "flowbite-vue";
import "./ApplicationLogo-CmsQkCHn.js";
import "@iconify/vue";
import "mitt";
const totalSteps = 7;
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
    const tahunOptions = computed(() => props.tahuns.map((t) => ({ label: t.tahun, value: t.id })));
    const bidangOptions = computed(() => props.bidangs.map((b) => ({ label: b.nama, value: b.id })));
    const jenisOptions = computed(() => props.jenisKajians.map((j) => ({ label: j.nama, value: j.id })));
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
    const currentStep = ref(1);
    const stepErrors = ref({});
    const steps = [
      { label: "Informasi Dasar", icon: "solar:info-square-bold" },
      { label: "Deskripsi", icon: "solar:document-text-bold" },
      { label: "Pelaksanaan", icon: "solar:users-group-two-rounded-bold" },
      { label: "Hasil & Rekomendasi", icon: "solar:diploma-verified-bold" },
      { label: "Kata Kunci", icon: "solar:tag-bold" },
      { label: "Upload Berkas", icon: "solar:upload-bold" },
      { label: "Catatan Perubahan", icon: "solar:history-bold" }
    ];
    const validateStep = (step) => {
      stepErrors.value = {};
      if (step === 1) {
        if (!form.judul) stepErrors.value.judul = "Judul wajib diisi.";
        if (!form.tahun_id) stepErrors.value.tahun_id = "Tahun wajib dipilih.";
        if (!form.bidang_id) stepErrors.value.bidang_id = "Bidang wajib dipilih.";
        if (!form.jenis_id) stepErrors.value.jenis_id = "Jenis kajian wajib dipilih.";
      }
      if (step === 7) {
        if (!form.changes_summary) stepErrors.value.changes_summary = "Ringkasan perubahan wajib diisi.";
      }
      return Object.keys(stepErrors.value).length === 0;
    };
    const nextStep = () => {
      if (!validateStep(currentStep.value)) {
        toast.warning("Harap lengkapi field yang wajib diisi.");
        return;
      }
      if (currentStep.value < totalSteps) currentStep.value++;
    };
    const prevStep = () => {
      if (currentStep.value > 1) currentStep.value--;
    };
    const goToStep = (step) => {
      if (step < currentStep.value) currentStep.value = step;
    };
    const handleFileChange = (e, field) => {
      form[field] = e.target.files[0];
    };
    const getFileUrl = (type) => {
      if (!props.kajian.files) return null;
      const file = props.kajian.files.find((f) => f.tipe === type);
      return file ? `/storage/${file.file_path}` : null;
    };
    const submit = () => {
      form.post(route("kajian.update", props.kajian.uuid), {
        onError: (errors) => {
          Object.values(errors).forEach((err) => toast.error(err));
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = resolveComponent("Icon");
      const _component_SearchSelect = resolveComponent("SearchSelect");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Edit Kajian" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-4"${_scopeId}><div class="bg-paper dark:bg-gray-800 p-5 rounded-card border border-gray-100 dark:border-gray-700"${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"${_scopeId}><div class="flex items-center gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("kajian.show", __props.kajian.uuid),
              class: "p-2 bg-gray-50 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-sm transition-all"
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
            _push2(`<div${_scopeId}><h3 class="text-lg font-bold text-gray-900 dark:text-white"${_scopeId}>Edit: ${ssrInterpolate(__props.kajian.judul)}</h3><p class="text-[11px] text-gray-500 mt-0.5"${_scopeId}>Langkah ${ssrInterpolate(currentStep.value)} dari ${ssrInterpolate(totalSteps)}: ${ssrInterpolate(steps[currentStep.value - 1].label)}</p></div></div></div><div class="flex items-center justify-between mt-4"${_scopeId}><!--[-->`);
            ssrRenderList(steps, (step, index) => {
              _push2(`<!--[--><button class="${ssrRenderClass([currentStep.value === index + 1 ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" : currentStep.value > index + 1 ? "text-green-600 dark:text-green-400" : "text-gray-400 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700", "flex items-center gap-1.5 px-2 py-1.5 rounded-lg transition-all text-[11px] font-semibold"])}"${_scopeId}><span class="${ssrRenderClass([currentStep.value === index + 1 ? "bg-blue-600 text-white" : currentStep.value > index + 1 ? "bg-green-500 text-white" : "bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400", "w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0"])}"${_scopeId}>`);
              if (currentStep.value > index + 1) {
                _push2(ssrRenderComponent(_component_Icon, {
                  icon: "solar:check-read-bold",
                  class: "w-3 h-3"
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<span${_scopeId}>${ssrInterpolate(index + 1)}</span>`);
              }
              _push2(`</span><span class="hidden xl:inline"${_scopeId}>${ssrInterpolate(step.label)}</span></button>`);
              if (index < steps.length - 1) {
                _push2(`<div class="${ssrRenderClass([currentStep.value > index + 1 ? "bg-green-400" : "bg-gray-200 dark:bg-gray-700", "flex-1 h-0.5 mx-1"])}"${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--]-->`);
            });
            _push2(`<!--]--></div></div><form${_scopeId}><div class="bg-paper dark:bg-gray-800 p-8 rounded-card border border-gray-100 dark:border-gray-700 space-y-6" style="${ssrRenderStyle(currentStep.value === 1 ? null : { display: "none" })}"${_scopeId}><h4 class="text-sm font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 pb-3 flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:info-square-bold",
              class: "w-5 h-5 text-blue-500"
            }, null, _parent2, _scopeId));
            _push2(` Informasi Dasar</h4><div class="grid grid-cols-1 md:grid-cols-3 gap-6"${_scopeId}><div class="md:col-span-3"${_scopeId}><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"${_scopeId}>Judul Kajian <span class="text-red-500"${_scopeId}>*</span></label><input type="text"${ssrRenderAttr("value", unref(form).judul)} required class="${ssrRenderClass([stepErrors.value.judul ? "border-red-400" : "", "w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5 focus:ring-2 focus:ring-blue-500/20"])}"${_scopeId}>`);
            if (stepErrors.value.judul) {
              _push2(`<span class="text-[11px] text-red-500 mt-1 block"${_scopeId}>${ssrInterpolate(stepErrors.value.judul)}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"${_scopeId}>Tahun <span class="text-red-500"${_scopeId}>*</span></label>`);
            _push2(ssrRenderComponent(_component_SearchSelect, {
              modelValue: unref(form).tahun_id,
              "onUpdate:modelValue": ($event) => unref(form).tahun_id = $event,
              options: tahunOptions.value,
              placeholder: "Pilih Tahun",
              required: true
            }, null, _parent2, _scopeId));
            if (stepErrors.value.tahun_id) {
              _push2(`<span class="text-[11px] text-red-500 mt-1 block"${_scopeId}>${ssrInterpolate(stepErrors.value.tahun_id)}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"${_scopeId}>Bidang <span class="text-red-500"${_scopeId}>*</span></label>`);
            _push2(ssrRenderComponent(_component_SearchSelect, {
              modelValue: unref(form).bidang_id,
              "onUpdate:modelValue": ($event) => unref(form).bidang_id = $event,
              options: bidangOptions.value,
              placeholder: "Pilih Bidang",
              required: true
            }, null, _parent2, _scopeId));
            if (stepErrors.value.bidang_id) {
              _push2(`<span class="text-[11px] text-red-500 mt-1 block"${_scopeId}>${ssrInterpolate(stepErrors.value.bidang_id)}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"${_scopeId}>Jenis Kajian <span class="text-red-500"${_scopeId}>*</span></label>`);
            _push2(ssrRenderComponent(_component_SearchSelect, {
              modelValue: unref(form).jenis_id,
              "onUpdate:modelValue": ($event) => unref(form).jenis_id = $event,
              options: jenisOptions.value,
              placeholder: "Pilih Jenis",
              required: true
            }, null, _parent2, _scopeId));
            if (stepErrors.value.jenis_id) {
              _push2(`<span class="text-[11px] text-red-500 mt-1 block"${_scopeId}>${ssrInterpolate(stepErrors.value.jenis_id)}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="bg-paper dark:bg-gray-800 p-8 rounded-card border border-gray-100 dark:border-gray-700 space-y-6" style="${ssrRenderStyle(currentStep.value === 2 ? null : { display: "none" })}"${_scopeId}><h4 class="text-sm font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 pb-3 flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:document-text-bold",
              class: "w-5 h-5 text-blue-500"
            }, null, _parent2, _scopeId));
            _push2(` Deskripsi &amp; Substansi</h4><div class="space-y-5"${_scopeId}><div${_scopeId}><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"${_scopeId}>Ringkasan Eksekutif</label><textarea rows="4" class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5 focus:ring-2 focus:ring-blue-500/20"${_scopeId}>${ssrInterpolate(unref(form).ringkasan)}</textarea></div><div class="grid grid-cols-1 md:grid-cols-2 gap-5"${_scopeId}><div${_scopeId}><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"${_scopeId}>Tujuan Kajian</label><textarea rows="3" class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5"${_scopeId}>${ssrInterpolate(unref(form).tujuan)}</textarea></div><div${_scopeId}><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"${_scopeId}>Latar Belakang</label><textarea rows="3" class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5"${_scopeId}>${ssrInterpolate(unref(form).latar_belakang)}</textarea></div></div><div${_scopeId}><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"${_scopeId}>Metodologi</label><textarea rows="3" class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5"${_scopeId}>${ssrInterpolate(unref(form).metodologi)}</textarea></div></div></div><div class="bg-paper dark:bg-gray-800 p-8 rounded-card border border-gray-100 dark:border-gray-700 space-y-6" style="${ssrRenderStyle(currentStep.value === 3 ? null : { display: "none" })}"${_scopeId}><h4 class="text-sm font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 pb-3 flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:users-group-two-rounded-bold",
              class: "w-5 h-5 text-blue-500"
            }, null, _parent2, _scopeId));
            _push2(` Pelaksanaan &amp; Kemitraan</h4><div class="grid grid-cols-1 md:grid-cols-2 gap-5"${_scopeId}><div${_scopeId}><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"${_scopeId}>Lokasi</label><input type="text"${ssrRenderAttr("value", unref(form).lokasi)} class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"${_scopeId}>Tanggal</label><input type="date"${ssrRenderAttr("value", unref(form).tanggal)} class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"${_scopeId}>Penanggung Jawab</label><input type="text"${ssrRenderAttr("value", unref(form).penanggung_jawab)} class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"${_scopeId}>Mitra</label><input type="text"${ssrRenderAttr("value", unref(form).mitra)} class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5"${_scopeId}></div></div></div><div class="bg-paper dark:bg-gray-800 p-8 rounded-card border border-gray-100 dark:border-gray-700 space-y-6" style="${ssrRenderStyle(currentStep.value === 4 ? null : { display: "none" })}"${_scopeId}><h4 class="text-sm font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 pb-3 flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:diploma-verified-bold",
              class: "w-5 h-5 text-blue-500"
            }, null, _parent2, _scopeId));
            _push2(` Hasil &amp; Rekomendasi</h4><div class="space-y-5"${_scopeId}><div${_scopeId}><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"${_scopeId}>Temuan Utama</label><textarea rows="4" class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5"${_scopeId}>${ssrInterpolate(unref(form).temuan)}</textarea></div><div${_scopeId}><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"${_scopeId}>Rekomendasi Strategis</label><textarea rows="4" class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5"${_scopeId}>${ssrInterpolate(unref(form).rekomendasi)}</textarea></div></div></div><div class="bg-paper dark:bg-gray-800 p-8 rounded-card border border-gray-100 dark:border-gray-700 space-y-6" style="${ssrRenderStyle(currentStep.value === 5 ? null : { display: "none" })}"${_scopeId}><h4 class="text-sm font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 pb-3 flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:tag-bold",
              class: "w-5 h-5 text-blue-500"
            }, null, _parent2, _scopeId));
            _push2(` Kata Kunci</h4><div class="flex flex-wrap gap-2"${_scopeId}><!--[-->`);
            ssrRenderList(__props.keywords, (kw) => {
              _push2(`<label class="${ssrRenderClass([unref(form).keywords.includes(kw.id) ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300" : "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-700 text-gray-500 dark:text-gray-400", "inline-flex items-center gap-1.5 px-2 py-1 rounded text-[11px] border cursor-pointer select-none transition-colors"])}"${_scopeId}><input type="checkbox"${ssrRenderAttr("value", kw.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).keywords) ? ssrLooseContain(unref(form).keywords, kw.id) : unref(form).keywords) ? " checked" : ""} class="sr-only"${_scopeId}><span class="${ssrRenderClass([unref(form).keywords.includes(kw.id) ? "bg-blue-500 border-blue-500" : "border-gray-300 dark:border-gray-600", "w-3 h-3 rounded-sm border flex items-center justify-center shrink-0"])}"${_scopeId}>`);
              if (unref(form).keywords.includes(kw.id)) {
                _push2(ssrRenderComponent(_component_Icon, {
                  icon: "solar:check-read-bold",
                  class: "w-2.5 h-2.5 text-white"
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</span><span class="font-medium"${_scopeId}>${ssrInterpolate(kw.nama)}</span></label>`);
            });
            _push2(`<!--]--></div></div><div class="bg-paper dark:bg-gray-800 p-8 rounded-card border border-gray-100 dark:border-gray-700 space-y-6" style="${ssrRenderStyle(currentStep.value === 6 ? null : { display: "none" })}"${_scopeId}><h4 class="text-sm font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 pb-3 flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:upload-bold",
              class: "w-5 h-5 text-blue-500"
            }, null, _parent2, _scopeId));
            _push2(` Upload Berkas <span class="text-[10px] font-normal normal-case tracking-normal text-gray-400"${_scopeId}>(Kosongkan jika tidak diubah)</span></h4><div class="grid grid-cols-1 md:grid-cols-3 gap-6"${_scopeId}><div class="p-6 border border-dashed border-gray-200 dark:border-gray-700 rounded-card flex flex-col items-center text-center hover:border-blue-400 hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors"${_scopeId}><div class="w-14 h-14 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:gallery-bold",
              class: "w-7 h-7 text-blue-500"
            }, null, _parent2, _scopeId));
            _push2(`</div><span class="text-sm font-semibold text-gray-700 dark:text-gray-300"${_scopeId}>Gambar Cover</span><span class="text-[11px] text-gray-400 mt-1"${_scopeId}>JPG, PNG (Maks 5MB)</span>`);
            if (getFileUrl("cover")) {
              _push2(`<a${ssrRenderAttr("href", getFileUrl("cover"))} target="_blank" class="text-[10px] text-blue-500 font-semibold underline mt-2"${_scopeId}>Lihat File Aktif</a>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<label class="mt-3 px-4 py-2 text-xs font-semibold rounded-lg border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:upload-minimalistic-bold",
              class: "w-4 h-4 inline-block mr-1"
            }, null, _parent2, _scopeId));
            _push2(`Pilih Berkas</label><input type="file" class="hidden" accept="image/*"${_scopeId}>`);
            if (unref(form).file_cover) {
              _push2(`<span class="text-[10px] text-gray-400 mt-2"${_scopeId}>${ssrInterpolate(unref(form).file_cover.name)}</span>`);
            } else {
              _push2(`<span class="text-[10px] text-gray-300 dark:text-gray-600 mt-2"${_scopeId}>Belum ada berkas baru</span>`);
            }
            _push2(`</div><div class="p-6 border-2 border-dashed border-red-200 dark:border-red-900/40 rounded-card flex flex-col items-center text-center hover:border-red-400 hover:bg-red-50/30 dark:hover:bg-red-900/10 transition-colors"${_scopeId}><div class="w-14 h-14 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center mb-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:file-text-bold",
              class: "w-7 h-7 text-red-500"
            }, null, _parent2, _scopeId));
            _push2(`</div><span class="text-sm font-semibold text-gray-700 dark:text-gray-300"${_scopeId}>Dokumen Utama</span><span class="text-[11px] text-gray-400 mt-1"${_scopeId}>PDF Only (Maks 20MB)</span>`);
            if (getFileUrl("pdf")) {
              _push2(`<a${ssrRenderAttr("href", getFileUrl("pdf"))} target="_blank" class="text-[10px] text-blue-500 font-semibold underline mt-2"${_scopeId}>Lihat File Aktif</a>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<label class="mt-3 px-4 py-2 text-xs font-semibold rounded-lg border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:upload-minimalistic-bold",
              class: "w-4 h-4 inline-block mr-1"
            }, null, _parent2, _scopeId));
            _push2(`Pilih Berkas</label><input type="file" class="hidden" accept="application/pdf"${_scopeId}>`);
            if (unref(form).file_pdf) {
              _push2(`<span class="text-[10px] text-gray-400 mt-2"${_scopeId}>${ssrInterpolate(unref(form).file_pdf.name)}</span>`);
            } else {
              _push2(`<span class="text-[10px] text-gray-300 dark:text-gray-600 mt-2"${_scopeId}>Belum ada berkas baru</span>`);
            }
            _push2(`</div><div class="p-6 border border-dashed border-gray-200 dark:border-gray-700 rounded-card flex flex-col items-center text-center hover:border-amber-400 hover:bg-amber-50/30 dark:hover:bg-amber-900/10 transition-colors"${_scopeId}><div class="w-14 h-14 rounded-full bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center mb-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:play-bold",
              class: "w-7 h-7 text-amber-500"
            }, null, _parent2, _scopeId));
            _push2(`</div><span class="text-sm font-semibold text-gray-700 dark:text-gray-300"${_scopeId}>Presentasi / Slide</span><span class="text-[11px] text-gray-400 mt-1"${_scopeId}>PPT, PPTX, PDF (Maks 20MB)</span>`);
            if (getFileUrl("presentasi")) {
              _push2(`<a${ssrRenderAttr("href", getFileUrl("presentasi"))} target="_blank" class="text-[10px] text-blue-500 font-semibold underline mt-2"${_scopeId}>Lihat File Aktif</a>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<label class="mt-3 px-4 py-2 text-xs font-semibold rounded-lg border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:upload-minimalistic-bold",
              class: "w-4 h-4 inline-block mr-1"
            }, null, _parent2, _scopeId));
            _push2(`Pilih Berkas</label><input type="file" class="hidden" accept=".ppt,.pptx,application/pdf"${_scopeId}>`);
            if (unref(form).file_presentasi) {
              _push2(`<span class="text-[10px] text-gray-400 mt-2"${_scopeId}>${ssrInterpolate(unref(form).file_presentasi.name)}</span>`);
            } else {
              _push2(`<span class="text-[10px] text-gray-300 dark:text-gray-600 mt-2"${_scopeId}>Belum ada berkas baru</span>`);
            }
            _push2(`</div></div></div><div class="bg-paper dark:bg-gray-800 p-8 rounded-card border border-gray-100 dark:border-gray-700 space-y-6" style="${ssrRenderStyle(currentStep.value === 7 ? null : { display: "none" })}"${_scopeId}><h4 class="text-sm font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 pb-3 flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:history-bold",
              class: "w-5 h-5 text-blue-500"
            }, null, _parent2, _scopeId));
            _push2(` Catatan Perubahan</h4><div${_scopeId}><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"${_scopeId}>Ringkasan Perubahan <span class="text-red-500"${_scopeId}>*</span></label><input type="text"${ssrRenderAttr("value", unref(form).changes_summary)} required class="${ssrRenderClass([stepErrors.value.changes_summary ? "border-red-400" : "", "w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5 focus:ring-2 focus:ring-blue-500/20"])}" placeholder="Contoh: Mengoreksi temuan utama, Memperbarui berkas presentasi..."${_scopeId}>`);
            if (stepErrors.value.changes_summary) {
              _push2(`<span class="text-[11px] text-red-500 mt-1 block"${_scopeId}>${ssrInterpolate(stepErrors.value.changes_summary)}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="flex items-center justify-between mt-4"${_scopeId}><div${_scopeId}>`);
            if (currentStep.value === 1) {
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("kajian.show", __props.kajian.uuid),
                class: "px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-card text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Batal`);
                  } else {
                    return [
                      createTextVNode("Batal")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<button type="button" class="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-card text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                icon: "solar:arrow-left-outline",
                class: "w-4 h-4 inline-block mr-1"
              }, null, _parent2, _scopeId));
              _push2(`Sebelumnya</button>`);
            }
            _push2(`</div><div class="flex gap-2"${_scopeId}>`);
            if (currentStep.value < totalSteps) {
              _push2(`<button type="button" class="px-5 py-2 bg-blue-600 text-white font-bold rounded-card text-sm hover:bg-blue-700 transition-colors inline-flex items-center gap-1"${_scopeId}>Selanjutnya`);
              _push2(ssrRenderComponent(_component_Icon, {
                icon: "solar:arrow-right-outline",
                class: "w-4 h-4"
              }, null, _parent2, _scopeId));
              _push2(`</button>`);
            } else {
              _push2(`<button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="px-5 py-2 bg-accent text-accent-ink font-bold rounded-card text-sm disabled:opacity-50 inline-flex items-center gap-2"${_scopeId}>`);
              if (unref(form).processing) {
                _push2(ssrRenderComponent(_component_Icon, {
                  icon: "svg-spinners:ring-resize",
                  class: "w-4 h-4 animate-spin"
                }, null, _parent2, _scopeId));
              } else {
                _push2(ssrRenderComponent(_component_Icon, {
                  icon: "solar:disk-bold",
                  class: "w-4 h-4"
                }, null, _parent2, _scopeId));
              }
              _push2(`Simpan Perubahan</button>`);
            }
            _push2(`</div></div></form></div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-4" }, [
                createVNode("div", { class: "bg-paper dark:bg-gray-800 p-5 rounded-card border border-gray-100 dark:border-gray-700" }, [
                  createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" }, [
                    createVNode("div", { class: "flex items-center gap-3" }, [
                      createVNode(unref(Link), {
                        href: _ctx.route("kajian.show", __props.kajian.uuid),
                        class: "p-2 bg-gray-50 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-sm transition-all"
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
                        createVNode("h3", { class: "text-lg font-bold text-gray-900 dark:text-white" }, "Edit: " + toDisplayString(__props.kajian.judul), 1),
                        createVNode("p", { class: "text-[11px] text-gray-500 mt-0.5" }, "Langkah " + toDisplayString(currentStep.value) + " dari " + toDisplayString(totalSteps) + ": " + toDisplayString(steps[currentStep.value - 1].label), 1)
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "flex items-center justify-between mt-4" }, [
                    (openBlock(), createBlock(Fragment, null, renderList(steps, (step, index) => {
                      return openBlock(), createBlock(Fragment, { key: index }, [
                        createVNode("button", {
                          onClick: ($event) => goToStep(index + 1),
                          class: ["flex items-center gap-1.5 px-2 py-1.5 rounded-lg transition-all text-[11px] font-semibold", currentStep.value === index + 1 ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" : currentStep.value > index + 1 ? "text-green-600 dark:text-green-400" : "text-gray-400 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700"]
                        }, [
                          createVNode("span", {
                            class: ["w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0", currentStep.value === index + 1 ? "bg-blue-600 text-white" : currentStep.value > index + 1 ? "bg-green-500 text-white" : "bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400"]
                          }, [
                            currentStep.value > index + 1 ? (openBlock(), createBlock(_component_Icon, {
                              key: 0,
                              icon: "solar:check-read-bold",
                              class: "w-3 h-3"
                            })) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(index + 1), 1))
                          ], 2),
                          createVNode("span", { class: "hidden xl:inline" }, toDisplayString(step.label), 1)
                        ], 10, ["onClick"]),
                        index < steps.length - 1 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: ["flex-1 h-0.5 mx-1", currentStep.value > index + 1 ? "bg-green-400" : "bg-gray-200 dark:bg-gray-700"]
                        }, null, 2)) : createCommentVNode("", true)
                      ], 64);
                    }), 64))
                  ])
                ]),
                createVNode("form", {
                  onSubmit: withModifiers(submit, ["prevent"])
                }, [
                  withDirectives(createVNode("div", { class: "bg-paper dark:bg-gray-800 p-8 rounded-card border border-gray-100 dark:border-gray-700 space-y-6" }, [
                    createVNode("h4", { class: "text-sm font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 pb-3 flex items-center gap-2" }, [
                      createVNode(_component_Icon, {
                        icon: "solar:info-square-bold",
                        class: "w-5 h-5 text-blue-500"
                      }),
                      createTextVNode(" Informasi Dasar")
                    ]),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-6" }, [
                      createVNode("div", { class: "md:col-span-3" }, [
                        createVNode("label", { class: "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2" }, [
                          createTextVNode("Judul Kajian "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).judul = $event,
                          required: "",
                          class: ["w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5 focus:ring-2 focus:ring-blue-500/20", stepErrors.value.judul ? "border-red-400" : ""]
                        }, null, 10, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).judul]
                        ]),
                        stepErrors.value.judul ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "text-[11px] text-red-500 mt-1 block"
                        }, toDisplayString(stepErrors.value.judul), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2" }, [
                          createTextVNode("Tahun "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        createVNode(_component_SearchSelect, {
                          modelValue: unref(form).tahun_id,
                          "onUpdate:modelValue": ($event) => unref(form).tahun_id = $event,
                          options: tahunOptions.value,
                          placeholder: "Pilih Tahun",
                          required: true
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                        stepErrors.value.tahun_id ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "text-[11px] text-red-500 mt-1 block"
                        }, toDisplayString(stepErrors.value.tahun_id), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2" }, [
                          createTextVNode("Bidang "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        createVNode(_component_SearchSelect, {
                          modelValue: unref(form).bidang_id,
                          "onUpdate:modelValue": ($event) => unref(form).bidang_id = $event,
                          options: bidangOptions.value,
                          placeholder: "Pilih Bidang",
                          required: true
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                        stepErrors.value.bidang_id ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "text-[11px] text-red-500 mt-1 block"
                        }, toDisplayString(stepErrors.value.bidang_id), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2" }, [
                          createTextVNode("Jenis Kajian "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        createVNode(_component_SearchSelect, {
                          modelValue: unref(form).jenis_id,
                          "onUpdate:modelValue": ($event) => unref(form).jenis_id = $event,
                          options: jenisOptions.value,
                          placeholder: "Pilih Jenis",
                          required: true
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                        stepErrors.value.jenis_id ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "text-[11px] text-red-500 mt-1 block"
                        }, toDisplayString(stepErrors.value.jenis_id), 1)) : createCommentVNode("", true)
                      ])
                    ])
                  ], 512), [
                    [vShow, currentStep.value === 1]
                  ]),
                  withDirectives(createVNode("div", { class: "bg-paper dark:bg-gray-800 p-8 rounded-card border border-gray-100 dark:border-gray-700 space-y-6" }, [
                    createVNode("h4", { class: "text-sm font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 pb-3 flex items-center gap-2" }, [
                      createVNode(_component_Icon, {
                        icon: "solar:document-text-bold",
                        class: "w-5 h-5 text-blue-500"
                      }),
                      createTextVNode(" Deskripsi & Substansi")
                    ]),
                    createVNode("div", { class: "space-y-5" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2" }, "Ringkasan Eksekutif"),
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
                        createVNode("label", { class: "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2" }, "Metodologi"),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(form).metodologi = $event,
                          rows: "3",
                          class: "w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).metodologi]
                        ])
                      ])
                    ])
                  ], 512), [
                    [vShow, currentStep.value === 2]
                  ]),
                  withDirectives(createVNode("div", { class: "bg-paper dark:bg-gray-800 p-8 rounded-card border border-gray-100 dark:border-gray-700 space-y-6" }, [
                    createVNode("h4", { class: "text-sm font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 pb-3 flex items-center gap-2" }, [
                      createVNode(_component_Icon, {
                        icon: "solar:users-group-two-rounded-bold",
                        class: "w-5 h-5 text-blue-500"
                      }),
                      createTextVNode(" Pelaksanaan & Kemitraan")
                    ]),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-5" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2" }, "Lokasi"),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).lokasi = $event,
                          class: "w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).lokasi]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2" }, "Tanggal"),
                        withDirectives(createVNode("input", {
                          type: "date",
                          "onUpdate:modelValue": ($event) => unref(form).tanggal = $event,
                          class: "w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).tanggal]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2" }, "Penanggung Jawab"),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).penanggung_jawab = $event,
                          class: "w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).penanggung_jawab]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2" }, "Mitra"),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).mitra = $event,
                          class: "w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).mitra]
                        ])
                      ])
                    ])
                  ], 512), [
                    [vShow, currentStep.value === 3]
                  ]),
                  withDirectives(createVNode("div", { class: "bg-paper dark:bg-gray-800 p-8 rounded-card border border-gray-100 dark:border-gray-700 space-y-6" }, [
                    createVNode("h4", { class: "text-sm font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 pb-3 flex items-center gap-2" }, [
                      createVNode(_component_Icon, {
                        icon: "solar:diploma-verified-bold",
                        class: "w-5 h-5 text-blue-500"
                      }),
                      createTextVNode(" Hasil & Rekomendasi")
                    ]),
                    createVNode("div", { class: "space-y-5" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2" }, "Temuan Utama"),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(form).temuan = $event,
                          rows: "4",
                          class: "w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).temuan]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2" }, "Rekomendasi Strategis"),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(form).rekomendasi = $event,
                          rows: "4",
                          class: "w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).rekomendasi]
                        ])
                      ])
                    ])
                  ], 512), [
                    [vShow, currentStep.value === 4]
                  ]),
                  withDirectives(createVNode("div", { class: "bg-paper dark:bg-gray-800 p-8 rounded-card border border-gray-100 dark:border-gray-700 space-y-6" }, [
                    createVNode("h4", { class: "text-sm font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 pb-3 flex items-center gap-2" }, [
                      createVNode(_component_Icon, {
                        icon: "solar:tag-bold",
                        class: "w-5 h-5 text-blue-500"
                      }),
                      createTextVNode(" Kata Kunci")
                    ]),
                    createVNode("div", { class: "flex flex-wrap gap-2" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.keywords, (kw) => {
                        return openBlock(), createBlock("label", {
                          key: kw.id,
                          class: ["inline-flex items-center gap-1.5 px-2 py-1 rounded text-[11px] border cursor-pointer select-none transition-colors", unref(form).keywords.includes(kw.id) ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300" : "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-700 text-gray-500 dark:text-gray-400"]
                        }, [
                          withDirectives(createVNode("input", {
                            type: "checkbox",
                            value: kw.id,
                            "onUpdate:modelValue": ($event) => unref(form).keywords = $event,
                            class: "sr-only"
                          }, null, 8, ["value", "onUpdate:modelValue"]), [
                            [vModelCheckbox, unref(form).keywords]
                          ]),
                          createVNode("span", {
                            class: ["w-3 h-3 rounded-sm border flex items-center justify-center shrink-0", unref(form).keywords.includes(kw.id) ? "bg-blue-500 border-blue-500" : "border-gray-300 dark:border-gray-600"]
                          }, [
                            unref(form).keywords.includes(kw.id) ? (openBlock(), createBlock(_component_Icon, {
                              key: 0,
                              icon: "solar:check-read-bold",
                              class: "w-2.5 h-2.5 text-white"
                            })) : createCommentVNode("", true)
                          ], 2),
                          createVNode("span", { class: "font-medium" }, toDisplayString(kw.nama), 1)
                        ], 2);
                      }), 128))
                    ])
                  ], 512), [
                    [vShow, currentStep.value === 5]
                  ]),
                  withDirectives(createVNode("div", { class: "bg-paper dark:bg-gray-800 p-8 rounded-card border border-gray-100 dark:border-gray-700 space-y-6" }, [
                    createVNode("h4", { class: "text-sm font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 pb-3 flex items-center gap-2" }, [
                      createVNode(_component_Icon, {
                        icon: "solar:upload-bold",
                        class: "w-5 h-5 text-blue-500"
                      }),
                      createTextVNode(" Upload Berkas "),
                      createVNode("span", { class: "text-[10px] font-normal normal-case tracking-normal text-gray-400" }, "(Kosongkan jika tidak diubah)")
                    ]),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-6" }, [
                      createVNode("div", { class: "p-6 border border-dashed border-gray-200 dark:border-gray-700 rounded-card flex flex-col items-center text-center hover:border-blue-400 hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors" }, [
                        createVNode("div", { class: "w-14 h-14 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-3" }, [
                          createVNode(_component_Icon, {
                            icon: "solar:gallery-bold",
                            class: "w-7 h-7 text-blue-500"
                          })
                        ]),
                        createVNode("span", { class: "text-sm font-semibold text-gray-700 dark:text-gray-300" }, "Gambar Cover"),
                        createVNode("span", { class: "text-[11px] text-gray-400 mt-1" }, "JPG, PNG (Maks 5MB)"),
                        getFileUrl("cover") ? (openBlock(), createBlock("a", {
                          key: 0,
                          href: getFileUrl("cover"),
                          target: "_blank",
                          class: "text-[10px] text-blue-500 font-semibold underline mt-2"
                        }, "Lihat File Aktif", 8, ["href"])) : createCommentVNode("", true),
                        createVNode("label", { class: "mt-3 px-4 py-2 text-xs font-semibold rounded-lg border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors" }, [
                          createVNode(_component_Icon, {
                            icon: "solar:upload-minimalistic-bold",
                            class: "w-4 h-4 inline-block mr-1"
                          }),
                          createTextVNode("Pilih Berkas")
                        ]),
                        createVNode("input", {
                          type: "file",
                          class: "hidden",
                          onChange: ($event) => handleFileChange($event, "file_cover"),
                          accept: "image/*"
                        }, null, 40, ["onChange"]),
                        unref(form).file_cover ? (openBlock(), createBlock("span", {
                          key: 1,
                          class: "text-[10px] text-gray-400 mt-2"
                        }, toDisplayString(unref(form).file_cover.name), 1)) : (openBlock(), createBlock("span", {
                          key: 2,
                          class: "text-[10px] text-gray-300 dark:text-gray-600 mt-2"
                        }, "Belum ada berkas baru"))
                      ]),
                      createVNode("div", { class: "p-6 border-2 border-dashed border-red-200 dark:border-red-900/40 rounded-card flex flex-col items-center text-center hover:border-red-400 hover:bg-red-50/30 dark:hover:bg-red-900/10 transition-colors" }, [
                        createVNode("div", { class: "w-14 h-14 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center mb-3" }, [
                          createVNode(_component_Icon, {
                            icon: "solar:file-text-bold",
                            class: "w-7 h-7 text-red-500"
                          })
                        ]),
                        createVNode("span", { class: "text-sm font-semibold text-gray-700 dark:text-gray-300" }, "Dokumen Utama"),
                        createVNode("span", { class: "text-[11px] text-gray-400 mt-1" }, "PDF Only (Maks 20MB)"),
                        getFileUrl("pdf") ? (openBlock(), createBlock("a", {
                          key: 0,
                          href: getFileUrl("pdf"),
                          target: "_blank",
                          class: "text-[10px] text-blue-500 font-semibold underline mt-2"
                        }, "Lihat File Aktif", 8, ["href"])) : createCommentVNode("", true),
                        createVNode("label", { class: "mt-3 px-4 py-2 text-xs font-semibold rounded-lg border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors" }, [
                          createVNode(_component_Icon, {
                            icon: "solar:upload-minimalistic-bold",
                            class: "w-4 h-4 inline-block mr-1"
                          }),
                          createTextVNode("Pilih Berkas")
                        ]),
                        createVNode("input", {
                          type: "file",
                          class: "hidden",
                          onChange: ($event) => handleFileChange($event, "file_pdf"),
                          accept: "application/pdf"
                        }, null, 40, ["onChange"]),
                        unref(form).file_pdf ? (openBlock(), createBlock("span", {
                          key: 1,
                          class: "text-[10px] text-gray-400 mt-2"
                        }, toDisplayString(unref(form).file_pdf.name), 1)) : (openBlock(), createBlock("span", {
                          key: 2,
                          class: "text-[10px] text-gray-300 dark:text-gray-600 mt-2"
                        }, "Belum ada berkas baru"))
                      ]),
                      createVNode("div", { class: "p-6 border border-dashed border-gray-200 dark:border-gray-700 rounded-card flex flex-col items-center text-center hover:border-amber-400 hover:bg-amber-50/30 dark:hover:bg-amber-900/10 transition-colors" }, [
                        createVNode("div", { class: "w-14 h-14 rounded-full bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center mb-3" }, [
                          createVNode(_component_Icon, {
                            icon: "solar:play-bold",
                            class: "w-7 h-7 text-amber-500"
                          })
                        ]),
                        createVNode("span", { class: "text-sm font-semibold text-gray-700 dark:text-gray-300" }, "Presentasi / Slide"),
                        createVNode("span", { class: "text-[11px] text-gray-400 mt-1" }, "PPT, PPTX, PDF (Maks 20MB)"),
                        getFileUrl("presentasi") ? (openBlock(), createBlock("a", {
                          key: 0,
                          href: getFileUrl("presentasi"),
                          target: "_blank",
                          class: "text-[10px] text-blue-500 font-semibold underline mt-2"
                        }, "Lihat File Aktif", 8, ["href"])) : createCommentVNode("", true),
                        createVNode("label", { class: "mt-3 px-4 py-2 text-xs font-semibold rounded-lg border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors" }, [
                          createVNode(_component_Icon, {
                            icon: "solar:upload-minimalistic-bold",
                            class: "w-4 h-4 inline-block mr-1"
                          }),
                          createTextVNode("Pilih Berkas")
                        ]),
                        createVNode("input", {
                          type: "file",
                          class: "hidden",
                          onChange: ($event) => handleFileChange($event, "file_presentasi"),
                          accept: ".ppt,.pptx,application/pdf"
                        }, null, 40, ["onChange"]),
                        unref(form).file_presentasi ? (openBlock(), createBlock("span", {
                          key: 1,
                          class: "text-[10px] text-gray-400 mt-2"
                        }, toDisplayString(unref(form).file_presentasi.name), 1)) : (openBlock(), createBlock("span", {
                          key: 2,
                          class: "text-[10px] text-gray-300 dark:text-gray-600 mt-2"
                        }, "Belum ada berkas baru"))
                      ])
                    ])
                  ], 512), [
                    [vShow, currentStep.value === 6]
                  ]),
                  withDirectives(createVNode("div", { class: "bg-paper dark:bg-gray-800 p-8 rounded-card border border-gray-100 dark:border-gray-700 space-y-6" }, [
                    createVNode("h4", { class: "text-sm font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 pb-3 flex items-center gap-2" }, [
                      createVNode(_component_Icon, {
                        icon: "solar:history-bold",
                        class: "w-5 h-5 text-blue-500"
                      }),
                      createTextVNode(" Catatan Perubahan")
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
                        class: ["w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5 focus:ring-2 focus:ring-blue-500/20", stepErrors.value.changes_summary ? "border-red-400" : ""],
                        placeholder: "Contoh: Mengoreksi temuan utama, Memperbarui berkas presentasi..."
                      }, null, 10, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).changes_summary]
                      ]),
                      stepErrors.value.changes_summary ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: "text-[11px] text-red-500 mt-1 block"
                      }, toDisplayString(stepErrors.value.changes_summary), 1)) : createCommentVNode("", true)
                    ])
                  ], 512), [
                    [vShow, currentStep.value === 7]
                  ]),
                  createVNode("div", { class: "flex items-center justify-between mt-4" }, [
                    createVNode("div", null, [
                      currentStep.value === 1 ? (openBlock(), createBlock(unref(Link), {
                        key: 0,
                        href: _ctx.route("kajian.show", __props.kajian.uuid),
                        class: "px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-card text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Batal")
                        ]),
                        _: 1
                      }, 8, ["href"])) : (openBlock(), createBlock("button", {
                        key: 1,
                        type: "button",
                        onClick: prevStep,
                        class: "px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-card text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      }, [
                        createVNode(_component_Icon, {
                          icon: "solar:arrow-left-outline",
                          class: "w-4 h-4 inline-block mr-1"
                        }),
                        createTextVNode("Sebelumnya")
                      ]))
                    ]),
                    createVNode("div", { class: "flex gap-2" }, [
                      currentStep.value < totalSteps ? (openBlock(), createBlock("button", {
                        key: 0,
                        type: "button",
                        onClick: nextStep,
                        class: "px-5 py-2 bg-blue-600 text-white font-bold rounded-card text-sm hover:bg-blue-700 transition-colors inline-flex items-center gap-1"
                      }, [
                        createTextVNode("Selanjutnya"),
                        createVNode(_component_Icon, {
                          icon: "solar:arrow-right-outline",
                          class: "w-4 h-4"
                        })
                      ])) : (openBlock(), createBlock("button", {
                        key: 1,
                        type: "submit",
                        disabled: unref(form).processing,
                        class: "px-5 py-2 bg-accent text-accent-ink font-bold rounded-card text-sm disabled:opacity-50 inline-flex items-center gap-2"
                      }, [
                        unref(form).processing ? (openBlock(), createBlock(_component_Icon, {
                          key: 0,
                          icon: "svg-spinners:ring-resize",
                          class: "w-4 h-4 animate-spin"
                        })) : (openBlock(), createBlock(_component_Icon, {
                          key: 1,
                          icon: "solar:disk-bold",
                          class: "w-4 h-4"
                        })),
                        createTextVNode("Simpan Perubahan")
                      ], 8, ["disabled"]))
                    ])
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
