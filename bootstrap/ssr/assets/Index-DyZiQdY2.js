import { ref, resolveComponent, unref, withCtx, createVNode, createTextVNode, withDirectives, withKeys, vModelText, openBlock, createBlock, Fragment, renderList, toDisplayString, vModelSelect, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { Head, Link, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-C8eooNFo.js";
import { _ as _sfc_main$2 } from "./Pagination-DE6AvrVK.js";
import { _ as _sfc_main$3 } from "./ConfirmModal-C43yiw5v.js";
import { useToast } from "vue-toastification";
import "flowbite-vue";
import "./ApplicationLogo-CmsQkCHn.js";
import "@iconify/vue";
import "mitt";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    kajians: Object,
    filters: Object,
    bidangs: Array,
    jenisKajians: Array,
    tahuns: Array
  },
  setup(__props) {
    const toast = useToast();
    const props = __props;
    const search = ref(props.filters.search || "");
    const bidang_id = ref(props.filters.bidang_id || "");
    const jenis_id = ref(props.filters.jenis_id || "");
    const tahun_id = ref(props.filters.tahun_id || "");
    const status = ref(props.filters.status || "");
    const handleFilter = () => {
      router.get(route("kajian.index"), {
        search: search.value,
        bidang_id: bidang_id.value,
        jenis_id: jenis_id.value,
        tahun_id: tahun_id.value,
        status: status.value
      }, {
        preserveState: true,
        preserveScroll: true
      });
    };
    const resetFilter = () => {
      search.value = "";
      bidang_id.value = "";
      jenis_id.value = "";
      tahun_id.value = "";
      status.value = "";
      handleFilter();
    };
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
    const deleteKajian = (id) => {
      openConfirm(
        "Hapus Dokumen Kajian",
        "Apakah Anda yakin ingin menghapus dokumen kajian ini? Tindakan ini tidak dapat dibatalkan.",
        "Ya, Hapus",
        "danger",
        () => {
          router.delete(route("kajian.destroy", id), {
            onSuccess: () => {
              showConfirmModal.value = false;
            },
            onError: () => toast.error("Gagal menghapus kajian.")
          });
        }
      );
    };
    const publishKajian = (uuid) => {
      openConfirm(
        "Publikasikan Kajian",
        "Apakah Anda yakin ingin mempublikasikan kajian ini ke portal publik?",
        "Ya, Publikasikan",
        "success",
        () => {
          router.post(route("kajian.publish", uuid), {}, {
            onSuccess: () => {
              showConfirmModal.value = false;
            },
            onError: () => toast.error("Gagal mempublikasikan kajian.")
          });
        }
      );
    };
    const archiveKajian = (uuid) => {
      openConfirm(
        "Arsipkan Kajian",
        "Apakah Anda yakin ingin mengarsipkan kajian ini?",
        "Ya, Arsipkan",
        "warning",
        () => {
          router.post(route("kajian.archive", uuid), {}, {
            onSuccess: () => {
              showConfirmModal.value = false;
            },
            onError: () => toast.error("Gagal mengarsipkan kajian.")
          });
        }
      );
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = resolveComponent("Icon");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Manajemen Kajian" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-6"${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700"${_scopeId}><div${_scopeId}><h3 class="text-xl font-bold text-gray-900 dark:text-white"${_scopeId}>Daftar Dokumen Kajian &amp; Riset</h3><p class="text-xs text-gray-500 mt-1"${_scopeId}>Kelola publikasi, naskah akademik, dan draf kajian OPD.</p></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("kajian.create"),
              class: "inline-flex items-center gap-2 px-5 py-3 bg-accent text-accent-ink font-semibold rounded-card transition-all text-sm shrink-0"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Icon, {
                    icon: "solar:add-circle-bold",
                    class: "w-5 h-5"
                  }, null, _parent3, _scopeId2));
                  _push3(` Tambah Kajian `);
                } else {
                  return [
                    createVNode(_component_Icon, {
                      icon: "solar:add-circle-bold",
                      class: "w-5 h-5"
                    }),
                    createTextVNode(" Tambah Kajian ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700 space-y-4"${_scopeId}><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"${_scopeId}><div${_scopeId}><label class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2"${_scopeId}>Cari</label><input type="text"${ssrRenderAttr("value", search.value)} placeholder="Judul, Penulis..." class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5"${_scopeId}></div><div${_scopeId}><label class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2"${_scopeId}>Bidang</label><select class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(bidang_id.value) ? ssrLooseContain(bidang_id.value, "") : ssrLooseEqual(bidang_id.value, "")) ? " selected" : ""}${_scopeId}>Semua Bidang</option><!--[-->`);
            ssrRenderList(__props.bidangs, (b) => {
              _push2(`<option${ssrRenderAttr("value", b.id)}${ssrIncludeBooleanAttr(Array.isArray(bidang_id.value) ? ssrLooseContain(bidang_id.value, b.id) : ssrLooseEqual(bidang_id.value, b.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(b.nama)}</option>`);
            });
            _push2(`<!--]--></select></div><div${_scopeId}><label class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2"${_scopeId}>Jenis</label><select class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(jenis_id.value) ? ssrLooseContain(jenis_id.value, "") : ssrLooseEqual(jenis_id.value, "")) ? " selected" : ""}${_scopeId}>Semua Jenis</option><!--[-->`);
            ssrRenderList(__props.jenisKajians, (j) => {
              _push2(`<option${ssrRenderAttr("value", j.id)}${ssrIncludeBooleanAttr(Array.isArray(jenis_id.value) ? ssrLooseContain(jenis_id.value, j.id) : ssrLooseEqual(jenis_id.value, j.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(j.nama)}</option>`);
            });
            _push2(`<!--]--></select></div><div${_scopeId}><label class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2"${_scopeId}>Tahun</label><select class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(tahun_id.value) ? ssrLooseContain(tahun_id.value, "") : ssrLooseEqual(tahun_id.value, "")) ? " selected" : ""}${_scopeId}>Semua Tahun</option><!--[-->`);
            ssrRenderList(__props.tahuns, (t) => {
              _push2(`<option${ssrRenderAttr("value", t.id)}${ssrIncludeBooleanAttr(Array.isArray(tahun_id.value) ? ssrLooseContain(tahun_id.value, t.id) : ssrLooseEqual(tahun_id.value, t.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(t.tahun)}</option>`);
            });
            _push2(`<!--]--></select></div><div${_scopeId}><label class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2"${_scopeId}>Status</label><select class="w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(status.value) ? ssrLooseContain(status.value, "") : ssrLooseEqual(status.value, "")) ? " selected" : ""}${_scopeId}>Semua Status</option><option value="draft"${ssrIncludeBooleanAttr(Array.isArray(status.value) ? ssrLooseContain(status.value, "draft") : ssrLooseEqual(status.value, "draft")) ? " selected" : ""}${_scopeId}>Draft</option><option value="review"${ssrIncludeBooleanAttr(Array.isArray(status.value) ? ssrLooseContain(status.value, "review") : ssrLooseEqual(status.value, "review")) ? " selected" : ""}${_scopeId}>Review</option><option value="published"${ssrIncludeBooleanAttr(Array.isArray(status.value) ? ssrLooseContain(status.value, "published") : ssrLooseEqual(status.value, "published")) ? " selected" : ""}${_scopeId}>Published</option><option value="archived"${ssrIncludeBooleanAttr(Array.isArray(status.value) ? ssrLooseContain(status.value, "archived") : ssrLooseEqual(status.value, "archived")) ? " selected" : ""}${_scopeId}>Archived</option></select></div></div><div class="flex justify-end gap-2 pt-2"${_scopeId}><button class="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-white text-xs font-semibold rounded-sm transition-colors"${_scopeId}> Reset Filter </button><button class="px-4 py-2 bg-accent text-accent-ink text-xs font-semibold rounded-sm transition-colors"${_scopeId}> Terapkan </button></div></div><div class="bg-paper dark:bg-gray-800 rounded-card border border-gray-100 dark:border-gray-700 overflow-hidden"${_scopeId}><div class="overflow-x-auto"${_scopeId}><table class="w-full text-left text-sm"${_scopeId}><thead class="bg-gray-50/70 dark:bg-gray-900/50 text-gray-400 text-xs font-semibold uppercase tracking-wider border-b border-gray-100 dark:border-gray-700"${_scopeId}><tr${_scopeId}><th class="px-6 py-4"${_scopeId}>Informasi Kajian</th><th class="px-6 py-4"${_scopeId}>Bidang / Jenis</th><th class="px-6 py-4"${_scopeId}>Tahun</th><th class="px-6 py-4"${_scopeId}>Status</th><th class="px-6 py-4 text-right"${_scopeId}>Aksi</th></tr></thead><tbody class="divide-y divide-gray-100 dark:divide-gray-700"${_scopeId}>`);
            if (__props.kajians.data.length === 0) {
              _push2(`<tr${_scopeId}><td colspan="5" class="px-6 py-12 text-center text-gray-400 font-medium"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                icon: "solar:folder-error-bold",
                class: "w-12 h-12 mx-auto mb-2 text-gray-300"
              }, null, _parent2, _scopeId));
              _push2(` Tidak ada dokumen kajian yang ditemukan. </td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(__props.kajians.data, (item) => {
              var _a, _b, _c;
              _push2(`<tr class="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors"${_scopeId}><td class="px-6 py-4 max-w-md"${_scopeId}><div class="font-semibold text-gray-900 dark:text-white line-clamp-2"${_scopeId}>${ssrInterpolate(item.judul)}</div><div class="text-xs text-gray-400 mt-1 flex items-center gap-2"${_scopeId}><span${_scopeId}>PJ: ${ssrInterpolate(item.penanggung_jawab || "-")}</span></div></td><td class="px-6 py-4"${_scopeId}><div class="text-xs font-semibold text-gray-700 dark:text-gray-300"${_scopeId}>${ssrInterpolate(((_a = item.bidang) == null ? void 0 : _a.nama) || "-")}</div><div class="text-[10px] text-gray-400 mt-0.5"${_scopeId}>${ssrInterpolate(((_b = item.jenis_kajian) == null ? void 0 : _b.nama) || "-")}</div></td><td class="px-6 py-4 text-gray-500 font-medium"${_scopeId}>${ssrInterpolate((_c = item.tahun) == null ? void 0 : _c.tahun)}</td><td class="px-6 py-4"${_scopeId}><span class="${ssrRenderClass([{
                "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800": item.status === "published",
                "bg-paper-2 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800": item.status === "draft",
                "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800": item.status === "review",
                "bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-950/30 dark:text-gray-400 dark:border-gray-800": item.status === "archived"
              }, "px-2.5 py-1 rounded-full text-xs font-bold border capitalize"])}"${_scopeId}>${ssrInterpolate(item.status)}</span></td><td class="px-6 py-4 text-right"${_scopeId}><div class="flex items-center justify-end gap-2"${_scopeId}>`);
              if (item.status === "review" && _ctx.$page.props.auth.roles.some((r) => ["superadmin", "admin"].includes(r))) {
                _push2(`<button class="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-sm transition-all" title="Publish"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_Icon, {
                  icon: "solar:check-square-bold",
                  class: "w-4 h-4"
                }, null, _parent2, _scopeId));
                _push2(`</button>`);
              } else {
                _push2(`<!---->`);
              }
              if (item.status === "published" && _ctx.$page.props.auth.roles.some((r) => ["superadmin", "admin"].includes(r))) {
                _push2(`<button class="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-sm transition-all" title="Archive"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_Icon, {
                  icon: "solar:archive-down-bold",
                  class: "w-4 h-4"
                }, null, _parent2, _scopeId));
                _push2(`</button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("kajian.show", item.id),
                class: "p-2 bg-gray-50 hover:bg-paper-2 text-gray-600 hover:text-blue-600 dark:bg-gray-700 dark:text-gray-300 rounded-sm transition-all",
                title: "Detail"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_Icon, {
                      icon: "solar:eye-bold",
                      class: "w-4 h-4"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_Icon, {
                        icon: "solar:eye-bold",
                        class: "w-4 h-4"
                      })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("kajian.edit", item.id),
                class: "p-2 bg-gray-50 hover:bg-amber-50 text-gray-600 hover:text-amber-600 dark:bg-gray-700 dark:text-gray-300 rounded-sm transition-all",
                title: "Edit"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_Icon, {
                      icon: "solar:pen-bold",
                      class: "w-4 h-4"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_Icon, {
                        icon: "solar:pen-bold",
                        class: "w-4 h-4"
                      })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`<button class="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-sm transition-all" title="Delete"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                icon: "solar:trash-bin-trash-bold",
                class: "w-4 h-4"
              }, null, _parent2, _scopeId));
              _push2(`</button></div></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div><div class="px-6 py-4 border-t border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4"${_scopeId}><p class="text-xs text-gray-400 font-medium"${_scopeId}> Menampilkan ${ssrInterpolate(__props.kajians.from || 0)} sampai ${ssrInterpolate(__props.kajians.to || 0)} dari ${ssrInterpolate(__props.kajians.total)} data </p>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              links: __props.kajians.links
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
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
                createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700" }, [
                  createVNode("div", null, [
                    createVNode("h3", { class: "text-xl font-bold text-gray-900 dark:text-white" }, "Daftar Dokumen Kajian & Riset"),
                    createVNode("p", { class: "text-xs text-gray-500 mt-1" }, "Kelola publikasi, naskah akademik, dan draf kajian OPD.")
                  ]),
                  createVNode(unref(Link), {
                    href: _ctx.route("kajian.create"),
                    class: "inline-flex items-center gap-2 px-5 py-3 bg-accent text-accent-ink font-semibold rounded-card transition-all text-sm shrink-0"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Icon, {
                        icon: "solar:add-circle-bold",
                        class: "w-5 h-5"
                      }),
                      createTextVNode(" Tambah Kajian ")
                    ]),
                    _: 1
                  }, 8, ["href"])
                ]),
                createVNode("div", { class: "bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700 space-y-4" }, [
                  createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4" }, [
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2" }, "Cari"),
                      withDirectives(createVNode("input", {
                        type: "text",
                        "onUpdate:modelValue": ($event) => search.value = $event,
                        placeholder: "Judul, Penulis...",
                        class: "w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5",
                        onKeyup: withKeys(handleFilter, ["enter"])
                      }, null, 40, ["onUpdate:modelValue"]), [
                        [vModelText, search.value]
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2" }, "Bidang"),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => bidang_id.value = $event,
                        class: "w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5",
                        onChange: handleFilter
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
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2" }, "Jenis"),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => jenis_id.value = $event,
                        class: "w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5",
                        onChange: handleFilter
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
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2" }, "Tahun"),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => tahun_id.value = $event,
                        class: "w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5",
                        onChange: handleFilter
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
                      createVNode("label", { class: "block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2" }, "Status"),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => status.value = $event,
                        class: "w-full text-sm rounded-sm border border-gray-200 dark:border-gray-700 bg-paper dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5",
                        onChange: handleFilter
                      }, [
                        createVNode("option", { value: "" }, "Semua Status"),
                        createVNode("option", { value: "draft" }, "Draft"),
                        createVNode("option", { value: "review" }, "Review"),
                        createVNode("option", { value: "published" }, "Published"),
                        createVNode("option", { value: "archived" }, "Archived")
                      ], 40, ["onUpdate:modelValue"]), [
                        [vModelSelect, status.value]
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "flex justify-end gap-2 pt-2" }, [
                    createVNode("button", {
                      onClick: resetFilter,
                      class: "px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-white text-xs font-semibold rounded-sm transition-colors"
                    }, " Reset Filter "),
                    createVNode("button", {
                      onClick: handleFilter,
                      class: "px-4 py-2 bg-accent text-accent-ink text-xs font-semibold rounded-sm transition-colors"
                    }, " Terapkan ")
                  ])
                ]),
                createVNode("div", { class: "bg-paper dark:bg-gray-800 rounded-card border border-gray-100 dark:border-gray-700 overflow-hidden" }, [
                  createVNode("div", { class: "overflow-x-auto" }, [
                    createVNode("table", { class: "w-full text-left text-sm" }, [
                      createVNode("thead", { class: "bg-gray-50/70 dark:bg-gray-900/50 text-gray-400 text-xs font-semibold uppercase tracking-wider border-b border-gray-100 dark:border-gray-700" }, [
                        createVNode("tr", null, [
                          createVNode("th", { class: "px-6 py-4" }, "Informasi Kajian"),
                          createVNode("th", { class: "px-6 py-4" }, "Bidang / Jenis"),
                          createVNode("th", { class: "px-6 py-4" }, "Tahun"),
                          createVNode("th", { class: "px-6 py-4" }, "Status"),
                          createVNode("th", { class: "px-6 py-4 text-right" }, "Aksi")
                        ])
                      ]),
                      createVNode("tbody", { class: "divide-y divide-gray-100 dark:divide-gray-700" }, [
                        __props.kajians.data.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                          createVNode("td", {
                            colspan: "5",
                            class: "px-6 py-12 text-center text-gray-400 font-medium"
                          }, [
                            createVNode(_component_Icon, {
                              icon: "solar:folder-error-bold",
                              class: "w-12 h-12 mx-auto mb-2 text-gray-300"
                            }),
                            createTextVNode(" Tidak ada dokumen kajian yang ditemukan. ")
                          ])
                        ])) : createCommentVNode("", true),
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.kajians.data, (item) => {
                          var _a, _b, _c;
                          return openBlock(), createBlock("tr", {
                            key: item.id,
                            class: "hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors"
                          }, [
                            createVNode("td", { class: "px-6 py-4 max-w-md" }, [
                              createVNode("div", { class: "font-semibold text-gray-900 dark:text-white line-clamp-2" }, toDisplayString(item.judul), 1),
                              createVNode("div", { class: "text-xs text-gray-400 mt-1 flex items-center gap-2" }, [
                                createVNode("span", null, "PJ: " + toDisplayString(item.penanggung_jawab || "-"), 1)
                              ])
                            ]),
                            createVNode("td", { class: "px-6 py-4" }, [
                              createVNode("div", { class: "text-xs font-semibold text-gray-700 dark:text-gray-300" }, toDisplayString(((_a = item.bidang) == null ? void 0 : _a.nama) || "-"), 1),
                              createVNode("div", { class: "text-[10px] text-gray-400 mt-0.5" }, toDisplayString(((_b = item.jenis_kajian) == null ? void 0 : _b.nama) || "-"), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 text-gray-500 font-medium" }, toDisplayString((_c = item.tahun) == null ? void 0 : _c.tahun), 1),
                            createVNode("td", { class: "px-6 py-4" }, [
                              createVNode("span", {
                                class: ["px-2.5 py-1 rounded-full text-xs font-bold border capitalize", {
                                  "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800": item.status === "published",
                                  "bg-paper-2 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800": item.status === "draft",
                                  "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800": item.status === "review",
                                  "bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-950/30 dark:text-gray-400 dark:border-gray-800": item.status === "archived"
                                }]
                              }, toDisplayString(item.status), 3)
                            ]),
                            createVNode("td", { class: "px-6 py-4 text-right" }, [
                              createVNode("div", { class: "flex items-center justify-end gap-2" }, [
                                item.status === "review" && _ctx.$page.props.auth.roles.some((r) => ["superadmin", "admin"].includes(r)) ? (openBlock(), createBlock("button", {
                                  key: 0,
                                  onClick: ($event) => publishKajian(item.uuid),
                                  class: "p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-sm transition-all",
                                  title: "Publish"
                                }, [
                                  createVNode(_component_Icon, {
                                    icon: "solar:check-square-bold",
                                    class: "w-4 h-4"
                                  })
                                ], 8, ["onClick"])) : createCommentVNode("", true),
                                item.status === "published" && _ctx.$page.props.auth.roles.some((r) => ["superadmin", "admin"].includes(r)) ? (openBlock(), createBlock("button", {
                                  key: 1,
                                  onClick: ($event) => archiveKajian(item.uuid),
                                  class: "p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-sm transition-all",
                                  title: "Archive"
                                }, [
                                  createVNode(_component_Icon, {
                                    icon: "solar:archive-down-bold",
                                    class: "w-4 h-4"
                                  })
                                ], 8, ["onClick"])) : createCommentVNode("", true),
                                createVNode(unref(Link), {
                                  href: _ctx.route("kajian.show", item.id),
                                  class: "p-2 bg-gray-50 hover:bg-paper-2 text-gray-600 hover:text-blue-600 dark:bg-gray-700 dark:text-gray-300 rounded-sm transition-all",
                                  title: "Detail"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_Icon, {
                                      icon: "solar:eye-bold",
                                      class: "w-4 h-4"
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["href"]),
                                createVNode(unref(Link), {
                                  href: _ctx.route("kajian.edit", item.id),
                                  class: "p-2 bg-gray-50 hover:bg-amber-50 text-gray-600 hover:text-amber-600 dark:bg-gray-700 dark:text-gray-300 rounded-sm transition-all",
                                  title: "Edit"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_Icon, {
                                      icon: "solar:pen-bold",
                                      class: "w-4 h-4"
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["href"]),
                                createVNode("button", {
                                  onClick: ($event) => deleteKajian(item.id),
                                  class: "p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-sm transition-all",
                                  title: "Delete"
                                }, [
                                  createVNode(_component_Icon, {
                                    icon: "solar:trash-bin-trash-bold",
                                    class: "w-4 h-4"
                                  })
                                ], 8, ["onClick"])
                              ])
                            ])
                          ]);
                        }), 128))
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "px-6 py-4 border-t border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4" }, [
                    createVNode("p", { class: "text-xs text-gray-400 font-medium" }, " Menampilkan " + toDisplayString(__props.kajians.from || 0) + " sampai " + toDisplayString(__props.kajians.to || 0) + " dari " + toDisplayString(__props.kajians.total) + " data ", 1),
                    createVNode(_sfc_main$2, {
                      links: __props.kajians.links
                    }, null, 8, ["links"])
                  ])
                ]),
                createVNode(_sfc_main$3, {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Backend/Kajian/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
