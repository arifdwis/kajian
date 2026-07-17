import { ref, resolveComponent, unref, withCtx, createVNode, createTextVNode, openBlock, createBlock, createCommentVNode, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import { Head, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-CCLRqrRv.js";
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
    notifications: Object
  },
  setup(__props) {
    const toast = useToast();
    const markAsRead = (uuid) => {
      router.post(route("notifikasi.read", uuid), {}, {
        onError: () => toast.error("Gagal memproses.")
      });
    };
    const showConfirm = ref(false);
    const markAllAsRead = () => {
      showConfirm.value = true;
    };
    const executeMarkAllAsRead = () => {
      router.post(route("notifikasi.read-all"), {}, {
        onSuccess: () => {
          showConfirm.value = false;
        },
        onError: () => toast.error("Gagal memproses.")
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = resolveComponent("Icon");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Kotak Masuk Notifikasi" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-6 w-full"${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700"${_scopeId}><div${_scopeId}><h3 class="text-xl font-bold text-gray-900 dark:text-white"${_scopeId}>Notifikasi Saya</h3><p class="text-xs text-gray-500 mt-1"${_scopeId}>Kotak masuk info aktivitas, review kajian, dan persetujuan dari sistem.</p></div><button class="inline-flex items-center gap-1.5 px-4 py-2 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-bold rounded-sm text-xs hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:check-square-bold",
              class: "w-4 h-4"
            }, null, _parent2, _scopeId));
            _push2(` Tandai Semua Dibaca </button></div><div class="bg-paper dark:bg-gray-800 rounded-card border border-gray-100 dark:border-gray-700 overflow-hidden p-6 space-y-4"${_scopeId}>`);
            if (__props.notifications.data.length === 0) {
              _push2(`<div class="text-center text-gray-400 py-12 text-xs"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                icon: "solar:bell-bing-bold",
                class: "w-12 h-12 mx-auto mb-2 text-gray-350"
              }, null, _parent2, _scopeId));
              _push2(` Tidak ada notifikasi baru untuk Anda. </div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="divide-y divide-gray-100 dark:divide-gray-700"${_scopeId}><!--[-->`);
            ssrRenderList(__props.notifications.data, (item) => {
              _push2(`<div class="${ssrRenderClass([{ "opacity-60": item.is_read }, "py-4 first:pt-0 last:pb-0 flex items-start justify-between gap-4"])}"${_scopeId}><div class="flex items-start gap-3"${_scopeId}><div class="${ssrRenderClass([item.is_read ? "bg-gray-50 text-gray-450 dark:bg-gray-900/60" : "bg-paper-2 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400", "p-2.5 rounded-sm shrink-0"])}"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                icon: "solar:bell-bold",
                class: "w-5 h-5"
              }, null, _parent2, _scopeId));
              _push2(`</div><div${_scopeId}><div class="flex items-center gap-2"${_scopeId}><span class="text-xs font-semibold text-gray-950 dark:text-white"${_scopeId}>${ssrInterpolate(item.title)}</span>`);
              if (!item.is_read) {
                _push2(`<span class="w-2 h-2 rounded-full bg-accent shrink-0"${_scopeId}></span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><p class="text-xs text-gray-550 dark:text-gray-300 mt-1 leading-relaxed"${_scopeId}>${ssrInterpolate(item.message)}</p><span class="text-[9px] text-gray-400 mt-2 block font-medium"${_scopeId}>${ssrInterpolate(_ctx.$diffForHumans(item.created_at))}</span></div></div>`);
              if (!item.is_read) {
                _push2(`<button class="text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:underline px-3 py-1.5 hover:bg-paper-2 dark:hover:bg-blue-900/30 rounded-sm shrink-0 transition-colors"${_scopeId}> Tandai Dibaca </button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            });
            _push2(`<!--]--></div><div class="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t dark:border-gray-700"${_scopeId}><p class="text-xs text-gray-400"${_scopeId}> Menampilkan ${ssrInterpolate(__props.notifications.from || 0)} sampai ${ssrInterpolate(__props.notifications.to || 0)} dari ${ssrInterpolate(__props.notifications.total)} data </p>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              links: __props.notifications.links
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              show: showConfirm.value,
              title: "Tandai Semua Telah Dibaca",
              message: "Apakah Anda yakin ingin menandai semua notifikasi sebagai telah dibaca?",
              "confirm-text": "Ya, Tandai Dibaca",
              "cancel-text": "Batal",
              type: "info",
              onConfirm: executeMarkAllAsRead,
              onCancel: ($event) => showConfirm.value = false
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-6 w-full" }, [
                createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700" }, [
                  createVNode("div", null, [
                    createVNode("h3", { class: "text-xl font-bold text-gray-900 dark:text-white" }, "Notifikasi Saya"),
                    createVNode("p", { class: "text-xs text-gray-500 mt-1" }, "Kotak masuk info aktivitas, review kajian, dan persetujuan dari sistem.")
                  ]),
                  createVNode("button", {
                    onClick: markAllAsRead,
                    class: "inline-flex items-center gap-1.5 px-4 py-2 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-bold rounded-sm text-xs hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                  }, [
                    createVNode(_component_Icon, {
                      icon: "solar:check-square-bold",
                      class: "w-4 h-4"
                    }),
                    createTextVNode(" Tandai Semua Dibaca ")
                  ])
                ]),
                createVNode("div", { class: "bg-paper dark:bg-gray-800 rounded-card border border-gray-100 dark:border-gray-700 overflow-hidden p-6 space-y-4" }, [
                  __props.notifications.data.length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "text-center text-gray-400 py-12 text-xs"
                  }, [
                    createVNode(_component_Icon, {
                      icon: "solar:bell-bing-bold",
                      class: "w-12 h-12 mx-auto mb-2 text-gray-350"
                    }),
                    createTextVNode(" Tidak ada notifikasi baru untuk Anda. ")
                  ])) : createCommentVNode("", true),
                  createVNode("div", { class: "divide-y divide-gray-100 dark:divide-gray-700" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.notifications.data, (item) => {
                      return openBlock(), createBlock("div", {
                        key: item.id,
                        class: ["py-4 first:pt-0 last:pb-0 flex items-start justify-between gap-4", { "opacity-60": item.is_read }]
                      }, [
                        createVNode("div", { class: "flex items-start gap-3" }, [
                          createVNode("div", {
                            class: ["p-2.5 rounded-sm shrink-0", item.is_read ? "bg-gray-50 text-gray-450 dark:bg-gray-900/60" : "bg-paper-2 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"]
                          }, [
                            createVNode(_component_Icon, {
                              icon: "solar:bell-bold",
                              class: "w-5 h-5"
                            })
                          ], 2),
                          createVNode("div", null, [
                            createVNode("div", { class: "flex items-center gap-2" }, [
                              createVNode("span", { class: "text-xs font-semibold text-gray-950 dark:text-white" }, toDisplayString(item.title), 1),
                              !item.is_read ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "w-2 h-2 rounded-full bg-accent shrink-0"
                              })) : createCommentVNode("", true)
                            ]),
                            createVNode("p", { class: "text-xs text-gray-550 dark:text-gray-300 mt-1 leading-relaxed" }, toDisplayString(item.message), 1),
                            createVNode("span", { class: "text-[9px] text-gray-400 mt-2 block font-medium" }, toDisplayString(_ctx.$diffForHumans(item.created_at)), 1)
                          ])
                        ]),
                        !item.is_read ? (openBlock(), createBlock("button", {
                          key: 0,
                          onClick: ($event) => markAsRead(item.uuid),
                          class: "text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:underline px-3 py-1.5 hover:bg-paper-2 dark:hover:bg-blue-900/30 rounded-sm shrink-0 transition-colors"
                        }, " Tandai Dibaca ", 8, ["onClick"])) : createCommentVNode("", true)
                      ], 2);
                    }), 128))
                  ]),
                  createVNode("div", { class: "flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t dark:border-gray-700" }, [
                    createVNode("p", { class: "text-xs text-gray-400" }, " Menampilkan " + toDisplayString(__props.notifications.from || 0) + " sampai " + toDisplayString(__props.notifications.to || 0) + " dari " + toDisplayString(__props.notifications.total) + " data ", 1),
                    createVNode(_sfc_main$2, {
                      links: __props.notifications.links
                    }, null, 8, ["links"])
                  ])
                ]),
                createVNode(_sfc_main$3, {
                  show: showConfirm.value,
                  title: "Tandai Semua Telah Dibaca",
                  message: "Apakah Anda yakin ingin menandai semua notifikasi sebagai telah dibaca?",
                  "confirm-text": "Ya, Tandai Dibaca",
                  "cancel-text": "Batal",
                  type: "info",
                  onConfirm: executeMarkAllAsRead,
                  onCancel: ($event) => showConfirm.value = false
                }, null, 8, ["show", "onCancel"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Backend/Notifikasi/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
