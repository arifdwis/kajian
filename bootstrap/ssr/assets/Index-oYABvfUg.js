import { computed, ref, resolveComponent, unref, withCtx, createVNode, createTextVNode, openBlock, createBlock, createCommentVNode, Fragment, renderList, toDisplayString, withModifiers, withDirectives, vModelText, vModelCheckbox, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain } from "vue/server-renderer";
import { useForm, Head, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-CCLRqrRv.js";
import { _ as _sfc_main$2 } from "./ConfirmModal-C43yiw5v.js";
import { useToast } from "vue-toastification";
import "flowbite-vue";
import "./ApplicationLogo-CmsQkCHn.js";
import "@iconify/vue";
import "mitt";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    menus: Array,
    roles: Array
  },
  setup(__props) {
    const toast = useToast();
    const props = __props;
    const menuOptions = computed(() => [
      { label: "Menu Utama (Parent)", value: "" },
      ...props.menus.map((m) => ({ label: m.title, value: m.id }))
    ]);
    const showModal = ref(false);
    const isEdit = ref(false);
    const currentId = ref(null);
    const form = useForm({
      title: "",
      route: "",
      icon: "",
      permission_name: "",
      roles: [],
      parent_id: ""
    });
    const openCreateModal = () => {
      isEdit.value = false;
      form.reset();
      form.clearErrors();
      showModal.value = true;
    };
    const openEditModal = (menu) => {
      isEdit.value = true;
      currentId.value = menu.id;
      form.title = menu.title || "";
      form.route = menu.route || "";
      form.icon = menu.icon || "";
      form.permission_name = menu.permission_name || "";
      form.roles = menu.roles ? menu.roles.split(",") : [];
      form.parent_id = menu.parent_id || "";
      form.clearErrors();
      showModal.value = true;
    };
    const closeModal = () => {
      showModal.value = false;
      form.reset();
    };
    const submit = () => {
      if (isEdit.value) {
        form.put(route("settings.menu.update", currentId.value), {
          onSuccess: () => {
            closeModal();
          },
          onError: (errors) => {
            Object.values(errors).forEach((err) => toast.error(err));
          }
        });
      } else {
        form.post(route("settings.menu.store"), {
          onSuccess: () => {
            closeModal();
          },
          onError: (errors) => {
            Object.values(errors).forEach((err) => toast.error(err));
          }
        });
      }
    };
    const showConfirmDelete = ref(false);
    const deleteTargetId = ref(null);
    const confirmDeleteMenu = (id) => {
      deleteTargetId.value = id;
      showConfirmDelete.value = true;
    };
    const executeDeleteMenu = () => {
      router.delete(route("settings.menu.destroy", deleteTargetId.value), {
        onSuccess: () => {
          showConfirmDelete.value = false;
        },
        onError: (error) => toast.error("Gagal menghapus menu.")
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = resolveComponent("Icon");
      const _component_SearchSelect = resolveComponent("SearchSelect");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Manajemen Menu Sidebar" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-6 w-full"${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700"${_scopeId}><div${_scopeId}><h3 class="text-xl font-bold text-gray-900 dark:text-white"${_scopeId}>Pengaturan Menu Sidebar</h3><p class="text-xs text-gray-500 mt-1"${_scopeId}>Konfigurasi menu navigasi sidebar, hak akses peran, dan ikon navigasi.</p></div><button class="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-accent-ink font-semibold rounded-card transition-all text-sm shrink-0"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              icon: "solar:add-circle-bold",
              class: "w-5 h-5"
            }, null, _parent2, _scopeId));
            _push2(` Tambah Menu </button></div><div class="bg-paper dark:bg-gray-800 rounded-card border border-gray-100 dark:border-gray-700 p-6 space-y-4"${_scopeId}><h4 class="font-bold text-sm text-gray-800 dark:text-white border-b dark:border-gray-700 pb-3"${_scopeId}>Struktur Menu Aktif</h4>`);
            if (__props.menus.length === 0) {
              _push2(`<div class="text-center text-xs text-gray-400 py-12"${_scopeId}> Belum ada menu yang dibuat. Klik tombol diatas untuk menambahkan. </div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="space-y-3"${_scopeId}><!--[-->`);
            ssrRenderList(__props.menus, (menu) => {
              _push2(`<div class="border border-gray-100 dark:border-gray-600 rounded-card p-4 bg-gray-50/50 dark:bg-gray-900/20"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><div class="p-2 bg-paper dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-sm text-blue-600 dark:text-blue-400 shrink-0"${_scopeId}>`);
              if (menu.icon) {
                _push2(ssrRenderComponent(_component_Icon, {
                  icon: menu.icon,
                  class: "w-5 h-5"
                }, null, _parent2, _scopeId));
              } else {
                _push2(ssrRenderComponent(_component_Icon, {
                  icon: "solar:document-bold",
                  class: "w-5 h-5"
                }, null, _parent2, _scopeId));
              }
              _push2(`</div><div${_scopeId}><span class="text-xs font-semibold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(menu.title)}</span>`);
              if (menu.route) {
                _push2(`<span class="block text-[10px] text-gray-400 font-mono mt-0.5"${_scopeId}>${ssrInterpolate(menu.route)}</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div><div class="flex items-center gap-2"${_scopeId}><button class="p-2 bg-paper dark:bg-gray-800 border dark:border-gray-600 text-gray-600 hover:text-amber-500 rounded-sm transition-all" title="Edit"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                icon: "solar:pen-bold",
                class: "w-4 h-4"
              }, null, _parent2, _scopeId));
              _push2(`</button><button class="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-sm transition-all" title="Hapus"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                icon: "solar:trash-bin-trash-bold",
                class: "w-4 h-4"
              }, null, _parent2, _scopeId));
              _push2(`</button></div></div>`);
              if (menu.children && menu.children.length > 0) {
                _push2(`<div class="mt-3 pl-8 space-y-2 border-l border-dashed border-gray-200 dark:border-gray-700"${_scopeId}><!--[-->`);
                ssrRenderList(menu.children, (child) => {
                  _push2(`<div class="flex items-center justify-between p-3 bg-paper dark:bg-gray-900/60 border border-gray-100 dark:border-gray-600 rounded-sm"${_scopeId}><div class="flex items-center gap-2.5"${_scopeId}>`);
                  if (child.icon) {
                    _push2(ssrRenderComponent(_component_Icon, {
                      icon: child.icon,
                      class: "w-4 h-4 text-gray-400"
                    }, null, _parent2, _scopeId));
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<div class="leading-none"${_scopeId}><span class="text-xs font-semibold text-gray-800 dark:text-gray-200"${_scopeId}>${ssrInterpolate(child.title)}</span><span class="block text-[9px] text-gray-400 font-mono mt-0.5"${_scopeId}>${ssrInterpolate(child.route)}</span></div></div><div class="flex items-center gap-2"${_scopeId}><button class="p-1.5 hover:bg-paper-2 dark:hover:bg-slate-800 border dark:border-slate-800 rounded-sm text-slate-550 transition-colors" title="Edit"${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_Icon, {
                    icon: "solar:pen-bold",
                    class: "w-3.5 h-3.5"
                  }, null, _parent2, _scopeId));
                  _push2(`</button><button class="p-1.5 hover:bg-red-50 text-red-500 rounded-sm transition-colors" title="Hapus"${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_Icon, {
                    icon: "solar:trash-bin-trash-bold",
                    class: "w-3.5 h-3.5"
                  }, null, _parent2, _scopeId));
                  _push2(`</button></div></div>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            });
            _push2(`<!--]--></div></div>`);
            if (showModal.value) {
              _push2(`<div class="fixed inset-0 z-50 flex items-center justify-center p-4"${_scopeId}><div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"${_scopeId}></div><div class="relative w-full max-w-lg bg-paper dark:bg-paper-dark border border-rule dark:border-rule-dark rounded-card p-6 space-y-4"${_scopeId}><div class="flex justify-between items-center border-b dark:border-slate-800 pb-3"${_scopeId}><h4 class="font-bold text-slate-900 dark:text-white"${_scopeId}>${ssrInterpolate(isEdit.value ? "Edit Menu" : "Tambah Menu")}</h4><button class="text-slate-400 hover:text-slate-600"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                icon: "solar:close-square-linear",
                class: "w-5 h-5"
              }, null, _parent2, _scopeId));
              _push2(`</button></div><form class="space-y-4"${_scopeId}><div class="grid grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2"${_scopeId}>Judul Menu <span class="text-red-500"${_scopeId}>*</span></label><input type="text"${ssrRenderAttr("value", unref(form).title)} required placeholder="E.g., Dashboard" class="w-full text-sm rounded-sm border border-rule dark:border-rule-dark bg-paper dark:bg-slate-955 text-slate-900 dark:text-white px-4 py-2.5"${_scopeId}></div><div${_scopeId}><label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2"${_scopeId}>Route / URL</label><input type="text"${ssrRenderAttr("value", unref(form).route)} placeholder="E.g., dashboard" class="w-full text-sm rounded-sm border border-rule dark:border-rule-dark bg-paper dark:bg-slate-955 text-slate-900 dark:text-white px-4 py-2.5"${_scopeId}></div></div><div class="grid grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2"${_scopeId}>Icon (Solar/Iconify)</label><input type="text"${ssrRenderAttr("value", unref(form).icon)} placeholder="E.g., solar:home-bold" class="w-full text-sm rounded-sm border border-rule dark:border-rule-dark bg-paper dark:bg-slate-955 text-slate-900 dark:text-white px-4 py-2.5"${_scopeId}></div><div${_scopeId}><label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2"${_scopeId}>Parent Menu</label>`);
              _push2(ssrRenderComponent(_component_SearchSelect, {
                modelValue: unref(form).parent_id,
                "onUpdate:modelValue": ($event) => unref(form).parent_id = $event,
                options: menuOptions.value,
                placeholder: "Menu Utama (Parent)"
              }, null, _parent2, _scopeId));
              _push2(`</div></div><div${_scopeId}><label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2"${_scopeId}>Permission Required</label><input type="text"${ssrRenderAttr("value", unref(form).permission_name)} placeholder="E.g., dashboard" class="w-full text-sm rounded-sm border border-rule dark:border-rule-dark bg-paper dark:bg-slate-955 text-slate-900 dark:text-white px-4 py-2.5"${_scopeId}></div><div${_scopeId}><label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3"${_scopeId}>Batasi Peran (Role)</label><div class="flex flex-wrap gap-2.5"${_scopeId}><!--[-->`);
              ssrRenderList(__props.roles, (r) => {
                _push2(`<label class="inline-flex items-center gap-1.5 px-3 py-1.5 border border-rule dark:border-rule-dark rounded-sm cursor-pointer hover:bg-paper-2 dark:hover:bg-slate-800 select-none text-xs"${_scopeId}><input type="checkbox"${ssrRenderAttr("value", r.slug)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).roles) ? ssrLooseContain(unref(form).roles, r.slug) : unref(form).roles) ? " checked" : ""} class="rounded text-blue-600 focus:ring-blue-500/20"${_scopeId}><span class="text-slate-800 dark:text-slate-200 font-semibold"${_scopeId}>${ssrInterpolate(r.name)}</span></label>`);
              });
              _push2(`<!--]--></div></div><div class="flex justify-end gap-2 border-t dark:border-slate-800 pt-4"${_scopeId}><button type="button" class="px-4 py-2 border border-rule dark:border-rule-dark text-slate-700 dark:text-slate-400 text-xs font-semibold rounded-sm"${_scopeId}> Batal </button><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="px-5 py-2 bg-accent text-accent-ink text-xs font-bold rounded-sm transition-all"${_scopeId}> Simpan </button></div></form></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_sfc_main$2, {
              show: showConfirmDelete.value,
              title: "Hapus Menu Sidebar",
              message: "Apakah Anda yakin ingin menghapus menu navigasi ini beserta seluruh submenu di dalamnya?",
              "confirm-text": "Ya, Hapus",
              "cancel-text": "Batal",
              type: "danger",
              onConfirm: executeDeleteMenu,
              onCancel: ($event) => showConfirmDelete.value = false
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-6 w-full" }, [
                createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-paper dark:bg-gray-800 p-6 rounded-card border border-gray-100 dark:border-gray-700" }, [
                  createVNode("div", null, [
                    createVNode("h3", { class: "text-xl font-bold text-gray-900 dark:text-white" }, "Pengaturan Menu Sidebar"),
                    createVNode("p", { class: "text-xs text-gray-500 mt-1" }, "Konfigurasi menu navigasi sidebar, hak akses peran, dan ikon navigasi.")
                  ]),
                  createVNode("button", {
                    onClick: openCreateModal,
                    class: "inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-accent-ink font-semibold rounded-card transition-all text-sm shrink-0"
                  }, [
                    createVNode(_component_Icon, {
                      icon: "solar:add-circle-bold",
                      class: "w-5 h-5"
                    }),
                    createTextVNode(" Tambah Menu ")
                  ])
                ]),
                createVNode("div", { class: "bg-paper dark:bg-gray-800 rounded-card border border-gray-100 dark:border-gray-700 p-6 space-y-4" }, [
                  createVNode("h4", { class: "font-bold text-sm text-gray-800 dark:text-white border-b dark:border-gray-700 pb-3" }, "Struktur Menu Aktif"),
                  __props.menus.length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "text-center text-xs text-gray-400 py-12"
                  }, " Belum ada menu yang dibuat. Klik tombol diatas untuk menambahkan. ")) : createCommentVNode("", true),
                  createVNode("div", { class: "space-y-3" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.menus, (menu) => {
                      return openBlock(), createBlock("div", {
                        key: menu.id,
                        class: "border border-gray-100 dark:border-gray-600 rounded-card p-4 bg-gray-50/50 dark:bg-gray-900/20"
                      }, [
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("div", { class: "flex items-center gap-3" }, [
                            createVNode("div", { class: "p-2 bg-paper dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-sm text-blue-600 dark:text-blue-400 shrink-0" }, [
                              menu.icon ? (openBlock(), createBlock(_component_Icon, {
                                key: 0,
                                icon: menu.icon,
                                class: "w-5 h-5"
                              }, null, 8, ["icon"])) : (openBlock(), createBlock(_component_Icon, {
                                key: 1,
                                icon: "solar:document-bold",
                                class: "w-5 h-5"
                              }))
                            ]),
                            createVNode("div", null, [
                              createVNode("span", { class: "text-xs font-semibold text-gray-900 dark:text-white" }, toDisplayString(menu.title), 1),
                              menu.route ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "block text-[10px] text-gray-400 font-mono mt-0.5"
                              }, toDisplayString(menu.route), 1)) : createCommentVNode("", true)
                            ])
                          ]),
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode("button", {
                              onClick: ($event) => openEditModal(menu),
                              class: "p-2 bg-paper dark:bg-gray-800 border dark:border-gray-600 text-gray-600 hover:text-amber-500 rounded-sm transition-all",
                              title: "Edit"
                            }, [
                              createVNode(_component_Icon, {
                                icon: "solar:pen-bold",
                                class: "w-4 h-4"
                              })
                            ], 8, ["onClick"]),
                            createVNode("button", {
                              onClick: ($event) => confirmDeleteMenu(menu.id),
                              class: "p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-sm transition-all",
                              title: "Hapus"
                            }, [
                              createVNode(_component_Icon, {
                                icon: "solar:trash-bin-trash-bold",
                                class: "w-4 h-4"
                              })
                            ], 8, ["onClick"])
                          ])
                        ]),
                        menu.children && menu.children.length > 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-3 pl-8 space-y-2 border-l border-dashed border-gray-200 dark:border-gray-700"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(menu.children, (child) => {
                            return openBlock(), createBlock("div", {
                              key: child.id,
                              class: "flex items-center justify-between p-3 bg-paper dark:bg-gray-900/60 border border-gray-100 dark:border-gray-600 rounded-sm"
                            }, [
                              createVNode("div", { class: "flex items-center gap-2.5" }, [
                                child.icon ? (openBlock(), createBlock(_component_Icon, {
                                  key: 0,
                                  icon: child.icon,
                                  class: "w-4 h-4 text-gray-400"
                                }, null, 8, ["icon"])) : createCommentVNode("", true),
                                createVNode("div", { class: "leading-none" }, [
                                  createVNode("span", { class: "text-xs font-semibold text-gray-800 dark:text-gray-200" }, toDisplayString(child.title), 1),
                                  createVNode("span", { class: "block text-[9px] text-gray-400 font-mono mt-0.5" }, toDisplayString(child.route), 1)
                                ])
                              ]),
                              createVNode("div", { class: "flex items-center gap-2" }, [
                                createVNode("button", {
                                  onClick: ($event) => openEditModal(child),
                                  class: "p-1.5 hover:bg-paper-2 dark:hover:bg-slate-800 border dark:border-slate-800 rounded-sm text-slate-550 transition-colors",
                                  title: "Edit"
                                }, [
                                  createVNode(_component_Icon, {
                                    icon: "solar:pen-bold",
                                    class: "w-3.5 h-3.5"
                                  })
                                ], 8, ["onClick"]),
                                createVNode("button", {
                                  onClick: ($event) => confirmDeleteMenu(child.id),
                                  class: "p-1.5 hover:bg-red-50 text-red-500 rounded-sm transition-colors",
                                  title: "Hapus"
                                }, [
                                  createVNode(_component_Icon, {
                                    icon: "solar:trash-bin-trash-bold",
                                    class: "w-3.5 h-3.5"
                                  })
                                ], 8, ["onClick"])
                              ])
                            ]);
                          }), 128))
                        ])) : createCommentVNode("", true)
                      ]);
                    }), 128))
                  ])
                ]),
                showModal.value ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "fixed inset-0 z-50 flex items-center justify-center p-4"
                }, [
                  createVNode("div", {
                    class: "absolute inset-0 bg-slate-900/40 backdrop-blur-sm",
                    onClick: closeModal
                  }),
                  createVNode("div", { class: "relative w-full max-w-lg bg-paper dark:bg-paper-dark border border-rule dark:border-rule-dark rounded-card p-6 space-y-4" }, [
                    createVNode("div", { class: "flex justify-between items-center border-b dark:border-slate-800 pb-3" }, [
                      createVNode("h4", { class: "font-bold text-slate-900 dark:text-white" }, toDisplayString(isEdit.value ? "Edit Menu" : "Tambah Menu"), 1),
                      createVNode("button", {
                        onClick: closeModal,
                        class: "text-slate-400 hover:text-slate-600"
                      }, [
                        createVNode(_component_Icon, {
                          icon: "solar:close-square-linear",
                          class: "w-5 h-5"
                        })
                      ])
                    ]),
                    createVNode("form", {
                      onSubmit: withModifiers(submit, ["prevent"]),
                      class: "space-y-4"
                    }, [
                      createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2" }, [
                            createTextVNode("Judul Menu "),
                            createVNode("span", { class: "text-red-500" }, "*")
                          ]),
                          withDirectives(createVNode("input", {
                            type: "text",
                            "onUpdate:modelValue": ($event) => unref(form).title = $event,
                            required: "",
                            placeholder: "E.g., Dashboard",
                            class: "w-full text-sm rounded-sm border border-rule dark:border-rule-dark bg-paper dark:bg-slate-955 text-slate-900 dark:text-white px-4 py-2.5"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).title]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2" }, "Route / URL"),
                          withDirectives(createVNode("input", {
                            type: "text",
                            "onUpdate:modelValue": ($event) => unref(form).route = $event,
                            placeholder: "E.g., dashboard",
                            class: "w-full text-sm rounded-sm border border-rule dark:border-rule-dark bg-paper dark:bg-slate-955 text-slate-900 dark:text-white px-4 py-2.5"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).route]
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2" }, "Icon (Solar/Iconify)"),
                          withDirectives(createVNode("input", {
                            type: "text",
                            "onUpdate:modelValue": ($event) => unref(form).icon = $event,
                            placeholder: "E.g., solar:home-bold",
                            class: "w-full text-sm rounded-sm border border-rule dark:border-rule-dark bg-paper dark:bg-slate-955 text-slate-900 dark:text-white px-4 py-2.5"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).icon]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2" }, "Parent Menu"),
                          createVNode(_component_SearchSelect, {
                            modelValue: unref(form).parent_id,
                            "onUpdate:modelValue": ($event) => unref(form).parent_id = $event,
                            options: menuOptions.value,
                            placeholder: "Menu Utama (Parent)"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2" }, "Permission Required"),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).permission_name = $event,
                          placeholder: "E.g., dashboard",
                          class: "w-full text-sm rounded-sm border border-rule dark:border-rule-dark bg-paper dark:bg-slate-955 text-slate-900 dark:text-white px-4 py-2.5"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).permission_name]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3" }, "Batasi Peran (Role)"),
                        createVNode("div", { class: "flex flex-wrap gap-2.5" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.roles, (r) => {
                            return openBlock(), createBlock("label", {
                              key: r.id,
                              class: "inline-flex items-center gap-1.5 px-3 py-1.5 border border-rule dark:border-rule-dark rounded-sm cursor-pointer hover:bg-paper-2 dark:hover:bg-slate-800 select-none text-xs"
                            }, [
                              withDirectives(createVNode("input", {
                                type: "checkbox",
                                value: r.slug,
                                "onUpdate:modelValue": ($event) => unref(form).roles = $event,
                                class: "rounded text-blue-600 focus:ring-blue-500/20"
                              }, null, 8, ["value", "onUpdate:modelValue"]), [
                                [vModelCheckbox, unref(form).roles]
                              ]),
                              createVNode("span", { class: "text-slate-800 dark:text-slate-200 font-semibold" }, toDisplayString(r.name), 1)
                            ]);
                          }), 128))
                        ])
                      ]),
                      createVNode("div", { class: "flex justify-end gap-2 border-t dark:border-slate-800 pt-4" }, [
                        createVNode("button", {
                          type: "button",
                          onClick: closeModal,
                          class: "px-4 py-2 border border-rule dark:border-rule-dark text-slate-700 dark:text-slate-400 text-xs font-semibold rounded-sm"
                        }, " Batal "),
                        createVNode("button", {
                          type: "submit",
                          disabled: unref(form).processing,
                          class: "px-5 py-2 bg-accent text-accent-ink text-xs font-bold rounded-sm transition-all"
                        }, " Simpan ", 8, ["disabled"])
                      ])
                    ], 32)
                  ])
                ])) : createCommentVNode("", true),
                createVNode(_sfc_main$2, {
                  show: showConfirmDelete.value,
                  title: "Hapus Menu Sidebar",
                  message: "Apakah Anda yakin ingin menghapus menu navigasi ini beserta seluruh submenu di dalamnya?",
                  "confirm-text": "Ya, Hapus",
                  "cancel-text": "Batal",
                  type: "danger",
                  onConfirm: executeDeleteMenu,
                  onCancel: ($event) => showConfirmDelete.value = false
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Backend/Settings/Menus/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
