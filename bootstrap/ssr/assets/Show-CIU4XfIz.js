import { computed, ref, resolveComponent, unref, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderList } from "vue/server-renderer";
import { usePage, Head, Link, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-Cmsx4Vff.js";
import { _ as _sfc_main$2 } from "./ConfirmModal-C43yiw5v.js";
import { useToast } from "vue-toastification";
import "flowbite-vue";
import "./ApplicationLogo-CmsQkCHn.js";
import "@iconify/vue";
import "mitt";
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    kajian: Object
  },
  setup(__props) {
    const toast = useToast();
    const props = __props;
    const page = usePage();
    const roles = computed(() => page.props.auth.roles || []);
    const isAdmin = computed(() => roles.value.some((r) => ["superadmin", "admin"].includes(r)));
    const getFile = (type) => {
      if (!props.kajian.files) return null;
      return props.kajian.files.find((f) => f.tipe === type);
    };
    const filePdf = computed(() => getFile("pdf"));
    const filePresentasi = computed(() => getFile("presentasi"));
    const fileCover = computed(() => getFile("cover"));
    const hasAnyFiles = computed(() => filePdf.value || filePresentasi.value || fileCover.value);
    const showConfirmModal = ref(false);
    const confirmModalConfig = ref({
      title: "",
      message: "",
      confirmText: "",
      type: "danger",
      onConfirm: () => {
      }
    });
    const openConfirm = (title, message, confirmText, type, onConfirm) => {
      confirmModalConfig.value = {
        title,
        message,
        confirmText,
        type,
        onConfirm
      };
      showConfirmModal.value = true;
    };
    const publishKajian = () => {
      openConfirm(
        "Publikasikan Kajian",
        "Apakah Anda yakin ingin mempublikasikan kajian ini?",
        "Ya, Publikasikan",
        "success",
        () => {
          router.post(route("kajian.publish", props.kajian.uuid), {}, {
            onSuccess: () => {
              showConfirmModal.value = false;
            },
            onError: () => toast.error("Gagal mempublikasikan kajian.")
          });
        }
      );
    };
    const archiveKajian = () => {
      openConfirm(
        "Arsipkan Kajian",
        "Apakah Anda yakin ingin mengarsipkan kajian ini?",
        "Ya, Arsipkan",
        "warning",
        () => {
          router.post(route("kajian.archive", props.kajian.uuid), {}, {
            onSuccess: () => {
              showConfirmModal.value = false;
            },
            onError: () => toast.error("Gagal mengarsipkan kajian.")
          });
        }
      );
    };
    const toDraftKajian = () => {
      openConfirm(
        "Kembalikan ke Draft",
        "Apakah Anda yakin ingin mengembalikan status kajian ini ke draft?",
        "Ya, Set ke Draft",
        "warning",
        () => {
          router.post(route("kajian.draft", props.kajian.uuid), {}, {
            onSuccess: () => {
              showConfirmModal.value = false;
            },
            onError: () => toast.error("Gagal memproses.")
          });
        }
      );
    };
    const deleteKajian = () => {
      openConfirm(
        "Hapus Kajian",
        "Apakah Anda yakin ingin menghapus kajian ini? Tindakan ini tidak dapat dibatalkan.",
        "Ya, Hapus",
        "danger",
        () => {
          router.delete(route("kajian.destroy", props.kajian.uuid), {
            onSuccess: () => {
              showConfirmModal.value = false;
            },
            onError: () => toast.error("Gagal menghapus kajian.")
          });
        }
      );
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
            _push2(`<div class="space-y-6"${_scopeId}><div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700"${_scopeId}><div class="flex items-center gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("kajian.index"),
              class: "p-2.5 bg-gray-50 dark:bg-gray-700 dark:text-gray-300 hover:bg-paper-2 hover:text-blue-600 rounded-sm transition-colors duration-150"
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
            _push2(`<div${_scopeId}><span class="text-xs font-semibold text-blue-600 dark:text-blue-400 capitalize bg-paper-2 dark:bg-blue-900/30 px-2.5 py-1 rounded-full border border-blue-100 dark:border-blue-800"${_scopeId}>${ssrInterpolate((_a = __props.kajian.jenis_kajian) == null ? void 0 : _a.nama)}</span><h3 class="text-lg font-bold text-gray-900 dark:text-white mt-2 max-w-2xl line-clamp-1"${ssrRenderAttr("title", __props.kajian.judul)}${_scopeId}>${ssrInterpolate(__props.kajian.judul)}</h3></div></div><div class="flex flex-wrap gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("kajian.edit", __props.kajian.uuid),
              class: "px-4 py-2.5 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 text-gray-700 font-bold rounded-sm text-xs transition-colors duration-150 inline-flex items-center gap-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Icon, {
                    icon: "solar:pen-bold",
                    class: "w-4 h-4"
                  }, null, _parent3, _scopeId2));
                  _push3(` Edit `);
                } else {
                  return [
                    createVNode(_component_Icon, {
                      icon: "solar:pen-bold",
                      class: "w-4 h-4"
                    }),
                    createTextVNode(" Edit ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (__props.kajian.status === "draft" && isAdmin.value) {
              _push2(`<button class="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-sm text-xs transition-colors duration-150 inline-flex items-center gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                icon: "solar:check-square-bold",
                class: "w-4 h-4"
              }, null, _parent2, _scopeId));
              _push2(` Publish </button>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.kajian.status === "published" && isAdmin.value) {
              _push2(`<button class="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-sm text-xs transition-colors duration-150 inline-flex items-center gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                icon: "solar:archive-down-bold",
                class: "w-4 h-4"
              }, null, _parent2, _scopeId));
              _push2(` Arsipkan </button>`);
            } else {
              _push2(`<!---->`);
            }
            if (["published", "archived", "review"].includes(__props.kajian.status)) {
              _push2(`<button class="px-4 py-2.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-bold rounded-sm text-xs transition-colors duration-150 inline-flex items-center gap-2 border border-indigo-100 dark:border-indigo-800"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                icon: "solar:notes-bold",
                class: "w-4 h-4"
              }, null, _parent2, _scopeId));
              _push2(` Kembalikan ke Draft </button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<button class="px-4 py-2.5 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 hover:bg-red-100 font-bold rounded-sm text-xs transition-colors duration-150 inline-flex items-center gap-2 border border-red-100 dark:border-red-900/50"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:trash-bin-trash-bold",
              class: "w-4 h-4"
            }, null, _parent2, _scopeId));
            _push2(` Hapus </button></div></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-8"${_scopeId}><div class="lg:col-span-2 space-y-6"${_scopeId}><div class="bg-paper dark:bg-gray-800 p-8 rounded-card border border-gray-100 dark:border-gray-700 space-y-6"${_scopeId}><div class="flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-4"${_scopeId}><h4 class="font-bold text-gray-800 dark:text-white"${_scopeId}>Rincian Dokumen</h4><span class="${ssrRenderClass([{
              "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800": __props.kajian.status === "published",
              "bg-paper-2 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800": __props.kajian.status === "draft",
              "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800": __props.kajian.status === "review",
              "bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-950/30 dark:text-gray-400 dark:border-gray-800": __props.kajian.status === "archived"
            }, "ml-auto px-2.5 py-0.5 rounded-full text-xs font-bold border capitalize"])}"${_scopeId}> Status: ${ssrInterpolate(__props.kajian.status)}</span></div><div class="grid grid-cols-2 md:grid-cols-4 gap-6"${_scopeId}><div${_scopeId}><span class="text-[10px] text-gray-400 font-bold uppercase tracking-wider block"${_scopeId}>Tahun Terbit</span><span class="text-sm font-semibold text-gray-700 dark:text-gray-200 mt-1 block"${_scopeId}>${ssrInterpolate((_b = __props.kajian.tahun) == null ? void 0 : _b.tahun)}</span></div><div${_scopeId}><span class="text-[10px] text-gray-400 font-bold uppercase tracking-wider block"${_scopeId}>Bidang</span><span class="text-sm font-semibold text-gray-700 dark:text-gray-200 mt-1 block"${_scopeId}>${ssrInterpolate((_c = __props.kajian.bidang) == null ? void 0 : _c.nama)}</span></div><div${_scopeId}><span class="text-[10px] text-gray-400 font-bold uppercase tracking-wider block"${_scopeId}>Penanggung Jawab</span><span class="text-sm font-semibold text-gray-700 dark:text-gray-200 mt-1 block"${_scopeId}>${ssrInterpolate(__props.kajian.penanggung_jawab || "-")}</span></div><div${_scopeId}><span class="text-[10px] text-gray-400 font-bold uppercase tracking-wider block"${_scopeId}>Mitra Peneliti</span><span class="text-sm font-semibold text-gray-700 dark:text-gray-200 mt-1 block"${_scopeId}>${ssrInterpolate(__props.kajian.mitra || "-")}</span></div></div>`);
            if (__props.kajian.ringkasan) {
              _push2(`<div class="space-y-2 pt-4 border-t border-gray-100 dark:border-gray-700"${_scopeId}><span class="text-[10px] text-gray-400 font-bold uppercase tracking-wider block"${_scopeId}>Ringkasan Eksekutif (Abstrak)</span><p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-light whitespace-pre-line"${_scopeId}>${ssrInterpolate(__props.kajian.ringkasan)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100 dark:border-gray-700"${_scopeId}>`);
            if (__props.kajian.tujuan) {
              _push2(`<div class="space-y-1"${_scopeId}><span class="text-[10px] text-gray-400 font-bold uppercase tracking-wider block"${_scopeId}>Tujuan Penelitian</span><p class="text-xs text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line"${_scopeId}>${ssrInterpolate(__props.kajian.tujuan)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.kajian.latar_belakang) {
              _push2(`<div class="space-y-1"${_scopeId}><span class="text-[10px] text-gray-400 font-bold uppercase tracking-wider block"${_scopeId}>Latar Belakang</span><p class="text-xs text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line"${_scopeId}>${ssrInterpolate(__props.kajian.latar_belakang)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.kajian.metodologi) {
              _push2(`<div class="space-y-1 md:col-span-2"${_scopeId}><span class="text-[10px] text-gray-400 font-bold uppercase tracking-wider block"${_scopeId}>Metodologi</span><p class="text-xs text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line"${_scopeId}>${ssrInterpolate(__props.kajian.metodologi)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="grid grid-cols-1 gap-6 pt-4 border-t border-gray-100 dark:border-gray-700"${_scopeId}>`);
            if (__props.kajian.temuan) {
              _push2(`<div class="space-y-1"${_scopeId}><span class="text-[10px] text-gray-400 font-bold uppercase tracking-wider block"${_scopeId}>Temuan Utama</span><p class="text-xs text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line"${_scopeId}>${ssrInterpolate(__props.kajian.temuan)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.kajian.rekomendasi) {
              _push2(`<div class="space-y-1"${_scopeId}><span class="text-[10px] text-gray-400 font-bold uppercase tracking-wider block"${_scopeId}>Rekomendasi Kebijakan</span><p class="text-xs text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line"${_scopeId}>${ssrInterpolate(__props.kajian.rekomendasi)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (__props.kajian.keywords && __props.kajian.keywords.length > 0) {
              _push2(`<div class="pt-4 border-t border-gray-100 dark:border-gray-700 space-y-2"${_scopeId}><span class="text-[10px] text-gray-400 font-bold uppercase tracking-wider block"${_scopeId}>Kata Kunci</span><div class="flex flex-wrap gap-2"${_scopeId}><!--[-->`);
              ssrRenderList(__props.kajian.keywords, (kw) => {
                _push2(`<span class="text-xs bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-medium px-3 py-1 rounded-sm border border-gray-100 dark:border-gray-600"${_scopeId}>${ssrInterpolate(kw.nama)}</span>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="space-y-6"${_scopeId}><div class="bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700 space-y-6"${_scopeId}><h4 class="font-bold text-gray-800 dark:text-white text-sm border-b border-gray-50 dark:border-gray-700 pb-3"${_scopeId}>Cover &amp; Lampiran Berkas</h4>`);
            if (!hasAnyFiles.value) {
              _push2(`<div class="text-center py-8"${_scopeId}><div class="w-16 h-16 mx-auto mb-3 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                icon: "solar:file-corrupt-bold",
                class: "w-8 h-8 text-gray-300 dark:text-gray-600"
              }, null, _parent2, _scopeId));
              _push2(`</div><p class="text-xs font-semibold text-gray-400"${_scopeId}>Belum ada berkas</p><p class="text-[10px] text-gray-300 dark:text-gray-600 mt-1"${_scopeId}>Dokumen cover, laporan, dan presentasi belum tersedia.</p></div>`);
            } else {
              _push2(`<!--[--><div class="aspect-[4/3] bg-gray-100 dark:bg-gray-900 rounded-card overflow-hidden border border-gray-200 dark:border-gray-700 relative flex items-center justify-center"${_scopeId}>`);
              if (fileCover.value) {
                _push2(`<img${ssrRenderAttr("src", `/storage/${fileCover.value.path}`)} alt="Cover" class="w-full h-full object-cover"${_scopeId}>`);
              } else {
                _push2(`<div class="text-center p-6 text-gray-300"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_Icon, {
                  icon: "solar:gallery-bold",
                  class: "w-12 h-12 mx-auto mb-2"
                }, null, _parent2, _scopeId));
                _push2(`<span class="text-xs"${_scopeId}>Tidak ada cover</span></div>`);
              }
              _push2(`</div><div class="space-y-3"${_scopeId}>`);
              if (filePdf.value) {
                _push2(`<a${ssrRenderAttr("href", `/storage/${filePdf.value.path}`)} target="_blank" class="w-full flex items-center gap-3 p-3 border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-sm transition-colors duration-150"${_scopeId}><div class="p-2 bg-red-50 text-red-500 rounded-sm"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_Icon, {
                  icon: "solar:file-text-bold",
                  class: "w-5 h-5"
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="min-w-0 flex-1"${_scopeId}><span class="block text-xs font-bold text-gray-800 dark:text-gray-200 truncate"${_scopeId}>Laporan Kajian Utama</span><span class="text-[10px] text-gray-400 block mt-0.5"${_scopeId}>${ssrInterpolate((filePdf.value.size / 1024 / 1024).toFixed(2))} MB • PDF</span></div>`);
                _push2(ssrRenderComponent(_component_Icon, {
                  icon: "solar:download-bold",
                  class: "w-4 h-4 text-gray-400"
                }, null, _parent2, _scopeId));
                _push2(`</a>`);
              } else {
                _push2(`<!---->`);
              }
              if (filePresentasi.value) {
                _push2(`<a${ssrRenderAttr("href", `/storage/${filePresentasi.value.path}`)} target="_blank" class="w-full flex items-center gap-3 p-3 border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-sm transition-colors duration-150"${_scopeId}><div class="p-2 bg-amber-50 text-amber-500 rounded-sm"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_Icon, {
                  icon: "solar:play-bold",
                  class: "w-5 h-5"
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="min-w-0 flex-1"${_scopeId}><span class="block text-xs font-bold text-gray-800 dark:text-gray-200 truncate"${_scopeId}>Bahan Presentasi / Slide</span><span class="text-[10px] text-gray-400 block mt-0.5"${_scopeId}>${ssrInterpolate((filePresentasi.value.size / 1024 / 1024).toFixed(2))} MB</span></div>`);
                _push2(ssrRenderComponent(_component_Icon, {
                  icon: "solar:download-bold",
                  class: "w-4 h-4 text-gray-400"
                }, null, _parent2, _scopeId));
                _push2(`</a>`);
              } else {
                _push2(`<!---->`);
              }
              if (!filePdf.value && !filePresentasi.value) {
                _push2(`<div class="flex items-center gap-2.5 p-3 rounded-lg bg-gray-50 dark:bg-gray-900"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_Icon, {
                  icon: "solar:info-circle-bold",
                  class: "w-4 h-4 shrink-0 text-gray-400"
                }, null, _parent2, _scopeId));
                _push2(`<span class="text-[11px] text-gray-400"${_scopeId}>Laporan dan presentasi belum tersedia.</span></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><!--]-->`);
            }
            _push2(`</div><div class="bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700 space-y-6"${_scopeId}><h4 class="font-bold text-gray-800 dark:text-white text-sm border-b border-gray-50 dark:border-gray-700 pb-3 flex items-center justify-between"${_scopeId}><span${_scopeId}>Riwayat Versi</span><span class="bg-paper-2 text-blue-600 dark:bg-blue-900/30 text-[10px] font-bold px-2 py-0.5 rounded-full"${_scopeId}>v${ssrInterpolate(__props.kajian.version)}</span></h4><div class="space-y-4 max-h-[300px] overflow-y-auto"${_scopeId}>`);
            if (!__props.kajian.versions || __props.kajian.versions.length === 0) {
              _push2(`<div class="text-center text-xs text-gray-400 py-6"${_scopeId}> Belum ada riwayat perubahan terekam. </div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(__props.kajian.versions, (ver) => {
              var _a2;
              _push2(`<div class="relative pl-5 border-l-2 border-gray-100 dark:border-gray-700 pb-4 last:pb-0"${_scopeId}><div class="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-paper-20"${_scopeId}></div><div class="flex items-center justify-between"${_scopeId}><span class="text-[10px] font-bold text-blue-600 bg-paper-2 dark:bg-blue-900/30 px-2 py-0.5 rounded"${_scopeId}> Versi ${ssrInterpolate(ver.version_number)}</span><span class="text-[9px] text-gray-400"${_scopeId}>${ssrInterpolate(new Date(ver.created_at).toLocaleDateString("id-ID"))}</span></div><p class="text-xs text-gray-600 dark:text-gray-300 mt-2 font-medium leading-relaxed"${_scopeId}>${ssrInterpolate(ver.description)}</p><span class="text-[9px] text-gray-400 mt-1 block"${_scopeId}>Oleh: ${ssrInterpolate(((_a2 = ver.creator) == null ? void 0 : _a2.name) || "Sistem")}</span></div>`);
            });
            _push2(`<!--]--></div></div></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              show: showConfirmModal.value,
              title: confirmModalConfig.value.title,
              message: confirmModalConfig.value.message,
              "confirm-text": confirmModalConfig.value.confirmText,
              type: confirmModalConfig.value.type,
              onConfirm: confirmModalConfig.value.onConfirm,
              onCancel: ($event) => showConfirmModal.value = false
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-6" }, [
                createVNode("div", { class: "flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700" }, [
                  createVNode("div", { class: "flex items-center gap-3" }, [
                    createVNode(unref(Link), {
                      href: _ctx.route("kajian.index"),
                      class: "p-2.5 bg-gray-50 dark:bg-gray-700 dark:text-gray-300 hover:bg-paper-2 hover:text-blue-600 rounded-sm transition-colors duration-150"
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
                      createVNode("span", { class: "text-xs font-semibold text-blue-600 dark:text-blue-400 capitalize bg-paper-2 dark:bg-blue-900/30 px-2.5 py-1 rounded-full border border-blue-100 dark:border-blue-800" }, toDisplayString((_d = __props.kajian.jenis_kajian) == null ? void 0 : _d.nama), 1),
                      createVNode("h3", {
                        class: "text-lg font-bold text-gray-900 dark:text-white mt-2 max-w-2xl line-clamp-1",
                        title: __props.kajian.judul
                      }, toDisplayString(__props.kajian.judul), 9, ["title"])
                    ])
                  ]),
                  createVNode("div", { class: "flex flex-wrap gap-2" }, [
                    createVNode(unref(Link), {
                      href: _ctx.route("kajian.edit", __props.kajian.uuid),
                      class: "px-4 py-2.5 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 text-gray-700 font-bold rounded-sm text-xs transition-colors duration-150 inline-flex items-center gap-2"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, {
                          icon: "solar:pen-bold",
                          class: "w-4 h-4"
                        }),
                        createTextVNode(" Edit ")
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    __props.kajian.status === "draft" && isAdmin.value ? (openBlock(), createBlock("button", {
                      key: 0,
                      onClick: publishKajian,
                      class: "px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-sm text-xs transition-colors duration-150 inline-flex items-center gap-2"
                    }, [
                      createVNode(_component_Icon, {
                        icon: "solar:check-square-bold",
                        class: "w-4 h-4"
                      }),
                      createTextVNode(" Publish ")
                    ])) : createCommentVNode("", true),
                    __props.kajian.status === "published" && isAdmin.value ? (openBlock(), createBlock("button", {
                      key: 1,
                      onClick: archiveKajian,
                      class: "px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-sm text-xs transition-colors duration-150 inline-flex items-center gap-2"
                    }, [
                      createVNode(_component_Icon, {
                        icon: "solar:archive-down-bold",
                        class: "w-4 h-4"
                      }),
                      createTextVNode(" Arsipkan ")
                    ])) : createCommentVNode("", true),
                    ["published", "archived", "review"].includes(__props.kajian.status) ? (openBlock(), createBlock("button", {
                      key: 2,
                      onClick: toDraftKajian,
                      class: "px-4 py-2.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-bold rounded-sm text-xs transition-colors duration-150 inline-flex items-center gap-2 border border-indigo-100 dark:border-indigo-800"
                    }, [
                      createVNode(_component_Icon, {
                        icon: "solar:notes-bold",
                        class: "w-4 h-4"
                      }),
                      createTextVNode(" Kembalikan ke Draft ")
                    ])) : createCommentVNode("", true),
                    createVNode("button", {
                      onClick: deleteKajian,
                      class: "px-4 py-2.5 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 hover:bg-red-100 font-bold rounded-sm text-xs transition-colors duration-150 inline-flex items-center gap-2 border border-red-100 dark:border-red-900/50"
                    }, [
                      createVNode(_component_Icon, {
                        icon: "solar:trash-bin-trash-bold",
                        class: "w-4 h-4"
                      }),
                      createTextVNode(" Hapus ")
                    ])
                  ])
                ]),
                createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-3 gap-8" }, [
                  createVNode("div", { class: "lg:col-span-2 space-y-6" }, [
                    createVNode("div", { class: "bg-paper dark:bg-gray-800 p-8 rounded-card border border-gray-100 dark:border-gray-700 space-y-6" }, [
                      createVNode("div", { class: "flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-4" }, [
                        createVNode("h4", { class: "font-bold text-gray-800 dark:text-white" }, "Rincian Dokumen"),
                        createVNode("span", {
                          class: ["ml-auto px-2.5 py-0.5 rounded-full text-xs font-bold border capitalize", {
                            "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800": __props.kajian.status === "published",
                            "bg-paper-2 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800": __props.kajian.status === "draft",
                            "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800": __props.kajian.status === "review",
                            "bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-950/30 dark:text-gray-400 dark:border-gray-800": __props.kajian.status === "archived"
                          }]
                        }, " Status: " + toDisplayString(__props.kajian.status), 3)
                      ]),
                      createVNode("div", { class: "grid grid-cols-2 md:grid-cols-4 gap-6" }, [
                        createVNode("div", null, [
                          createVNode("span", { class: "text-[10px] text-gray-400 font-bold uppercase tracking-wider block" }, "Tahun Terbit"),
                          createVNode("span", { class: "text-sm font-semibold text-gray-700 dark:text-gray-200 mt-1 block" }, toDisplayString((_e = __props.kajian.tahun) == null ? void 0 : _e.tahun), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("span", { class: "text-[10px] text-gray-400 font-bold uppercase tracking-wider block" }, "Bidang"),
                          createVNode("span", { class: "text-sm font-semibold text-gray-700 dark:text-gray-200 mt-1 block" }, toDisplayString((_f = __props.kajian.bidang) == null ? void 0 : _f.nama), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("span", { class: "text-[10px] text-gray-400 font-bold uppercase tracking-wider block" }, "Penanggung Jawab"),
                          createVNode("span", { class: "text-sm font-semibold text-gray-700 dark:text-gray-200 mt-1 block" }, toDisplayString(__props.kajian.penanggung_jawab || "-"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("span", { class: "text-[10px] text-gray-400 font-bold uppercase tracking-wider block" }, "Mitra Peneliti"),
                          createVNode("span", { class: "text-sm font-semibold text-gray-700 dark:text-gray-200 mt-1 block" }, toDisplayString(__props.kajian.mitra || "-"), 1)
                        ])
                      ]),
                      __props.kajian.ringkasan ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "space-y-2 pt-4 border-t border-gray-100 dark:border-gray-700"
                      }, [
                        createVNode("span", { class: "text-[10px] text-gray-400 font-bold uppercase tracking-wider block" }, "Ringkasan Eksekutif (Abstrak)"),
                        createVNode("p", { class: "text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-light whitespace-pre-line" }, toDisplayString(__props.kajian.ringkasan), 1)
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100 dark:border-gray-700" }, [
                        __props.kajian.tujuan ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "space-y-1"
                        }, [
                          createVNode("span", { class: "text-[10px] text-gray-400 font-bold uppercase tracking-wider block" }, "Tujuan Penelitian"),
                          createVNode("p", { class: "text-xs text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line" }, toDisplayString(__props.kajian.tujuan), 1)
                        ])) : createCommentVNode("", true),
                        __props.kajian.latar_belakang ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "space-y-1"
                        }, [
                          createVNode("span", { class: "text-[10px] text-gray-400 font-bold uppercase tracking-wider block" }, "Latar Belakang"),
                          createVNode("p", { class: "text-xs text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line" }, toDisplayString(__props.kajian.latar_belakang), 1)
                        ])) : createCommentVNode("", true),
                        __props.kajian.metodologi ? (openBlock(), createBlock("div", {
                          key: 2,
                          class: "space-y-1 md:col-span-2"
                        }, [
                          createVNode("span", { class: "text-[10px] text-gray-400 font-bold uppercase tracking-wider block" }, "Metodologi"),
                          createVNode("p", { class: "text-xs text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line" }, toDisplayString(__props.kajian.metodologi), 1)
                        ])) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "grid grid-cols-1 gap-6 pt-4 border-t border-gray-100 dark:border-gray-700" }, [
                        __props.kajian.temuan ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "space-y-1"
                        }, [
                          createVNode("span", { class: "text-[10px] text-gray-400 font-bold uppercase tracking-wider block" }, "Temuan Utama"),
                          createVNode("p", { class: "text-xs text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line" }, toDisplayString(__props.kajian.temuan), 1)
                        ])) : createCommentVNode("", true),
                        __props.kajian.rekomendasi ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "space-y-1"
                        }, [
                          createVNode("span", { class: "text-[10px] text-gray-400 font-bold uppercase tracking-wider block" }, "Rekomendasi Kebijakan"),
                          createVNode("p", { class: "text-xs text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line" }, toDisplayString(__props.kajian.rekomendasi), 1)
                        ])) : createCommentVNode("", true)
                      ]),
                      __props.kajian.keywords && __props.kajian.keywords.length > 0 ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "pt-4 border-t border-gray-100 dark:border-gray-700 space-y-2"
                      }, [
                        createVNode("span", { class: "text-[10px] text-gray-400 font-bold uppercase tracking-wider block" }, "Kata Kunci"),
                        createVNode("div", { class: "flex flex-wrap gap-2" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.kajian.keywords, (kw) => {
                            return openBlock(), createBlock("span", {
                              key: kw.id,
                              class: "text-xs bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-medium px-3 py-1 rounded-sm border border-gray-100 dark:border-gray-600"
                            }, toDisplayString(kw.nama), 1);
                          }), 128))
                        ])
                      ])) : createCommentVNode("", true)
                    ])
                  ]),
                  createVNode("div", { class: "space-y-6" }, [
                    createVNode("div", { class: "bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700 space-y-6" }, [
                      createVNode("h4", { class: "font-bold text-gray-800 dark:text-white text-sm border-b border-gray-50 dark:border-gray-700 pb-3" }, "Cover & Lampiran Berkas"),
                      !hasAnyFiles.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-center py-8"
                      }, [
                        createVNode("div", { class: "w-16 h-16 mx-auto mb-3 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center" }, [
                          createVNode(_component_Icon, {
                            icon: "solar:file-corrupt-bold",
                            class: "w-8 h-8 text-gray-300 dark:text-gray-600"
                          })
                        ]),
                        createVNode("p", { class: "text-xs font-semibold text-gray-400" }, "Belum ada berkas"),
                        createVNode("p", { class: "text-[10px] text-gray-300 dark:text-gray-600 mt-1" }, "Dokumen cover, laporan, dan presentasi belum tersedia.")
                      ])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                        createVNode("div", { class: "aspect-[4/3] bg-gray-100 dark:bg-gray-900 rounded-card overflow-hidden border border-gray-200 dark:border-gray-700 relative flex items-center justify-center" }, [
                          fileCover.value ? (openBlock(), createBlock("img", {
                            key: 0,
                            src: `/storage/${fileCover.value.path}`,
                            alt: "Cover",
                            class: "w-full h-full object-cover"
                          }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "text-center p-6 text-gray-300"
                          }, [
                            createVNode(_component_Icon, {
                              icon: "solar:gallery-bold",
                              class: "w-12 h-12 mx-auto mb-2"
                            }),
                            createVNode("span", { class: "text-xs" }, "Tidak ada cover")
                          ]))
                        ]),
                        createVNode("div", { class: "space-y-3" }, [
                          filePdf.value ? (openBlock(), createBlock("a", {
                            key: 0,
                            href: `/storage/${filePdf.value.path}`,
                            target: "_blank",
                            class: "w-full flex items-center gap-3 p-3 border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-sm transition-colors duration-150"
                          }, [
                            createVNode("div", { class: "p-2 bg-red-50 text-red-500 rounded-sm" }, [
                              createVNode(_component_Icon, {
                                icon: "solar:file-text-bold",
                                class: "w-5 h-5"
                              })
                            ]),
                            createVNode("div", { class: "min-w-0 flex-1" }, [
                              createVNode("span", { class: "block text-xs font-bold text-gray-800 dark:text-gray-200 truncate" }, "Laporan Kajian Utama"),
                              createVNode("span", { class: "text-[10px] text-gray-400 block mt-0.5" }, toDisplayString((filePdf.value.size / 1024 / 1024).toFixed(2)) + " MB • PDF", 1)
                            ]),
                            createVNode(_component_Icon, {
                              icon: "solar:download-bold",
                              class: "w-4 h-4 text-gray-400"
                            })
                          ], 8, ["href"])) : createCommentVNode("", true),
                          filePresentasi.value ? (openBlock(), createBlock("a", {
                            key: 1,
                            href: `/storage/${filePresentasi.value.path}`,
                            target: "_blank",
                            class: "w-full flex items-center gap-3 p-3 border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-sm transition-colors duration-150"
                          }, [
                            createVNode("div", { class: "p-2 bg-amber-50 text-amber-500 rounded-sm" }, [
                              createVNode(_component_Icon, {
                                icon: "solar:play-bold",
                                class: "w-5 h-5"
                              })
                            ]),
                            createVNode("div", { class: "min-w-0 flex-1" }, [
                              createVNode("span", { class: "block text-xs font-bold text-gray-800 dark:text-gray-200 truncate" }, "Bahan Presentasi / Slide"),
                              createVNode("span", { class: "text-[10px] text-gray-400 block mt-0.5" }, toDisplayString((filePresentasi.value.size / 1024 / 1024).toFixed(2)) + " MB", 1)
                            ]),
                            createVNode(_component_Icon, {
                              icon: "solar:download-bold",
                              class: "w-4 h-4 text-gray-400"
                            })
                          ], 8, ["href"])) : createCommentVNode("", true),
                          !filePdf.value && !filePresentasi.value ? (openBlock(), createBlock("div", {
                            key: 2,
                            class: "flex items-center gap-2.5 p-3 rounded-lg bg-gray-50 dark:bg-gray-900"
                          }, [
                            createVNode(_component_Icon, {
                              icon: "solar:info-circle-bold",
                              class: "w-4 h-4 shrink-0 text-gray-400"
                            }),
                            createVNode("span", { class: "text-[11px] text-gray-400" }, "Laporan dan presentasi belum tersedia.")
                          ])) : createCommentVNode("", true)
                        ])
                      ], 64))
                    ]),
                    createVNode("div", { class: "bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700 space-y-6" }, [
                      createVNode("h4", { class: "font-bold text-gray-800 dark:text-white text-sm border-b border-gray-50 dark:border-gray-700 pb-3 flex items-center justify-between" }, [
                        createVNode("span", null, "Riwayat Versi"),
                        createVNode("span", { class: "bg-paper-2 text-blue-600 dark:bg-blue-900/30 text-[10px] font-bold px-2 py-0.5 rounded-full" }, "v" + toDisplayString(__props.kajian.version), 1)
                      ]),
                      createVNode("div", { class: "space-y-4 max-h-[300px] overflow-y-auto" }, [
                        !__props.kajian.versions || __props.kajian.versions.length === 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-center text-xs text-gray-400 py-6"
                        }, " Belum ada riwayat perubahan terekam. ")) : createCommentVNode("", true),
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.kajian.versions, (ver) => {
                          var _a2;
                          return openBlock(), createBlock("div", {
                            key: ver.id,
                            class: "relative pl-5 border-l-2 border-gray-100 dark:border-gray-700 pb-4 last:pb-0"
                          }, [
                            createVNode("div", { class: "absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-paper-20" }),
                            createVNode("div", { class: "flex items-center justify-between" }, [
                              createVNode("span", { class: "text-[10px] font-bold text-blue-600 bg-paper-2 dark:bg-blue-900/30 px-2 py-0.5 rounded" }, " Versi " + toDisplayString(ver.version_number), 1),
                              createVNode("span", { class: "text-[9px] text-gray-400" }, toDisplayString(new Date(ver.created_at).toLocaleDateString("id-ID")), 1)
                            ]),
                            createVNode("p", { class: "text-xs text-gray-600 dark:text-gray-300 mt-2 font-medium leading-relaxed" }, toDisplayString(ver.description), 1),
                            createVNode("span", { class: "text-[9px] text-gray-400 mt-1 block" }, "Oleh: " + toDisplayString(((_a2 = ver.creator) == null ? void 0 : _a2.name) || "Sistem"), 1)
                          ]);
                        }), 128))
                      ])
                    ])
                  ])
                ]),
                createVNode(_sfc_main$2, {
                  show: showConfirmModal.value,
                  title: confirmModalConfig.value.title,
                  message: confirmModalConfig.value.message,
                  "confirm-text": confirmModalConfig.value.confirmText,
                  type: confirmModalConfig.value.type,
                  onConfirm: confirmModalConfig.value.onConfirm,
                  onCancel: ($event) => showConfirmModal.value = false
                }, null, 8, ["show", "title", "message", "confirm-text", "type", "onConfirm", "onCancel"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Backend/Kajian/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
