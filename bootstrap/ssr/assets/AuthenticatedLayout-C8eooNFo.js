import { ref, watchEffect, onMounted, onUnmounted, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, toDisplayString, createCommentVNode, useSSRContext, computed } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderStyle, ssrRenderSlot } from "vue/server-renderer";
import { FwbAvatar } from "flowbite-vue";
import { usePage, Link } from "@inertiajs/vue3";
import { A as ApplicationLogo, _ as _export_sfc } from "./ApplicationLogo-CmsQkCHn.js";
import { Icon } from "@iconify/vue";
import mitt from "mitt";
const eventBus = mitt();
const _sfc_main$3 = {
  __name: "Navbar",
  __ssrInlineRender: true,
  setup(__props) {
    usePage();
    const searchQuery = ref("");
    const isCollapsed = ref(localStorage.getItem("sidebarCollapsed") === "true");
    const isDarkMode = ref(localStorage.getItem("darkMode") === "true");
    const isDropdownOpen = ref(false);
    const isMobile = ref(window.innerWidth <= 640);
    const updateMobileState = () => {
      isMobile.value = window.innerWidth <= 640;
    };
    watchEffect(() => {
      document.documentElement.classList.toggle("dark", isDarkMode.value);
    });
    const getInitials = (name) => {
      if (!name) return "US";
      const names = name.split(" ").filter((n) => n);
      return names.length > 1 ? (names[0][0] + names[1][0]).toUpperCase() : names[0][0].toUpperCase();
    };
    onMounted(() => {
      updateMobileState();
      window.addEventListener("resize", updateMobileState);
      if (isMobile.value && localStorage.getItem("sidebarCollapsed") === null) {
        isCollapsed.value = true;
        localStorage.setItem("sidebarCollapsed", "true");
        eventBus.emit("toggle-sidebar", true);
      }
    });
    onUnmounted(() => {
      window.removeEventListener("resize", updateMobileState);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<nav${ssrRenderAttrs(mergeProps({ class: "fixed top-0 left-0 right-0 z-40 h-16 border-b border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700" }, _attrs))}><div class="flex items-center justify-between h-full px-3 sm:px-4"><div class="flex items-center gap-3">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("dashboard"),
        class: "flex-shrink-0"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(ApplicationLogo, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(ApplicationLogo)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="p-2 text-ink-2 hover:text-gray-900 dark:text-ink-2 dark:hover:text-white rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: isCollapsed.value ? "solar:hamburger-menu-bold-duotone" : "solar:double-alt-arrow-left-bold-duotone",
        class: "w-6 h-6"
      }, null, _parent));
      _push(`</button></div><div class="hidden md:flex flex-1 max-w-md mx-4"><form class="w-full"><div class="relative"><div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "solar:magnifer-bold-duotone",
        class: "w-5 h-5 text-ink-2"
      }, null, _parent));
      _push(`</div><input type="search"${ssrRenderAttr("value", searchQuery.value)} class="block w-full pl-10 pr-3 py-2 text-sm rounded-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-400 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" placeholder="Cari dokumen kajian Bapperida..."></div></form></div><div class="flex items-center gap-3">`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: "hidden sm:flex items-center gap-1 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Icon), {
              icon: "solar:globus-bold-duotone",
              class: "w-5 h-5"
            }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>Portal Publik</span>`);
          } else {
            return [
              createVNode(unref(Icon), {
                icon: "solar:globus-bold-duotone",
                class: "w-5 h-5"
              }),
              createVNode("span", null, "Portal Publik")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("notifikasi.index"),
        class: "relative p-2 text-ink-2 hover:text-gray-900 dark:text-ink-2 dark:hover:text-white rounded-sm",
        title: "Notifikasi"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Icon), {
              icon: "solar:bell-bold-duotone",
              class: "w-5 h-5"
            }, null, _parent2, _scopeId));
            if (_ctx.$page.props.auth.unread_notifications_count > 0) {
              _push2(`<span class="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-white dark:border-gray-800"${_scopeId}>${ssrInterpolate(_ctx.$page.props.auth.unread_notifications_count)}</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(unref(Icon), {
                icon: "solar:bell-bold-duotone",
                class: "w-5 h-5"
              }),
              _ctx.$page.props.auth.unread_notifications_count > 0 ? (openBlock(), createBlock("span", {
                key: 0,
                class: "absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-white dark:border-gray-800"
              }, toDisplayString(_ctx.$page.props.auth.unread_notifications_count), 1)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="p-2 text-ink-2 hover:text-gray-900 dark:text-ink-2 dark:hover:text-white rounded-sm">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: isDarkMode.value ? "solar:sun-2-bold-duotone" : "solar:moon-bold-duotone",
        class: "w-5 h-5 text-amber-500"
      }, null, _parent));
      _push(`</button><div class="relative"><div class="flex items-center gap-2 cursor-pointer p-1 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition">`);
      _push(ssrRenderComponent(unref(FwbAvatar), {
        size: "sm",
        initials: getInitials(_ctx.$page.props.auth.user.name),
        rounded: ""
      }, null, _parent));
      if (!isMobile.value) {
        _push(`<div class="flex flex-col items-start pr-2"><span class="font-bold text-sm text-gray-700 dark:text-gray-200 leading-tight">${ssrInterpolate(_ctx.$page.props.auth.user.name)}</span><span class="text-[10px] text-ink-2 capitalize">${ssrInterpolate(_ctx.$page.props.auth.role)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (isDropdownOpen.value) {
        _push(`<div class="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-rule dark:border-rule-dark rounded-card z-50 py-2 divide-y divide-gray-100 dark:divide-gray-700"><div class="px-4 py-2.5"><span class="block text-xs font-bold text-gray-900 dark:text-white leading-tight truncate">${ssrInterpolate(_ctx.$page.props.auth.user.name)}</span><span class="block text-[10px] text-ink-2 truncate mt-0.5">${ssrInterpolate(_ctx.$page.props.auth.user.email)}</span></div><div class="py-1">`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("profile.edit"),
          onClick: ($event) => isDropdownOpen.value = false,
          class: "flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-gray-700 dark:text-ink-2 bg-paper-2 dark:bg-paper-2-dark transition"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(Icon), {
                icon: "solar:user-bold-duotone",
                class: "w-4 h-4 text-blue-500"
              }, null, _parent2, _scopeId));
              _push2(`<span${_scopeId}>Edit Profil</span>`);
            } else {
              return [
                createVNode(unref(Icon), {
                  icon: "solar:user-bold-duotone",
                  class: "w-4 h-4 text-blue-500"
                }),
                createVNode("span", null, "Edit Profil")
              ];
            }
          }),
          _: 1
        }, _parent));
        if (_ctx.$page.props.auth.role === "superadmin" || _ctx.$page.props.auth.role === "admin") {
          _push(ssrRenderComponent(unref(Link), {
            href: _ctx.route("settings.users.index"),
            onClick: ($event) => isDropdownOpen.value = false,
            class: "flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-gray-700 dark:text-ink-2 bg-paper-2 dark:bg-paper-2-dark transition"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(Icon), {
                  icon: "solar:settings-bold-duotone",
                  class: "w-4 h-4 text-indigo-500"
                }, null, _parent2, _scopeId));
                _push2(`<span${_scopeId}>Pengaturan Sistem</span>`);
              } else {
                return [
                  createVNode(unref(Icon), {
                    icon: "solar:settings-bold-duotone",
                    class: "w-4 h-4 text-indigo-500"
                  }),
                  createVNode("span", null, "Pengaturan Sistem")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="py-1"><button class="flex items-center justify-between w-full px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition"><span>Keluar Aplikasi</span>`);
        _push(ssrRenderComponent(unref(Icon), {
          icon: "solar:power-bold-duotone",
          class: "w-4 h-4"
        }, null, _parent));
        _push(`</button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (isDropdownOpen.value) {
        _push(`<div class="fixed inset-0 z-40"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></nav>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/Partials/Navbar.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "Sidebar",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const currentUrl = computed(() => page.url);
    const isCollapsed = ref(JSON.parse(localStorage.getItem("sidebarCollapsed") || "false"));
    const menuItems = computed(() => {
      var _a;
      return ((_a = page.props.auth) == null ? void 0 : _a.menu) || [];
    });
    const openDropdowns = ref({});
    const isActive = (routeName) => {
      if (!routeName) return false;
      if (routeName.startsWith("/")) {
        const normalizedRoute = routeName.replace(/\/$/, "");
        const normalizedCurrentUrl = currentUrl.value.split("?")[0].replace(/\/$/, "");
        return normalizedCurrentUrl === normalizedRoute || normalizedCurrentUrl.startsWith(normalizedRoute + "/");
      }
      try {
        return route().current(routeName + "*");
      } catch (e) {
        return false;
      }
    };
    const hasActiveChild = (item) => {
      if (!item.children) return false;
      return item.children.some((child) => isActive(child.route));
    };
    const getHref = (routeName) => {
      if (!routeName) return "#";
      if (routeName.startsWith("/")) return routeName;
      try {
        return route(routeName);
      } catch (e) {
        return "#";
      }
    };
    const handleSidebar = (state) => {
      isCollapsed.value = state;
    };
    onMounted(() => {
      eventBus.on("toggle-sidebar", handleSidebar);
      if (menuItems.value && Array.isArray(menuItems.value)) {
        menuItems.value.forEach((item, index) => {
          if (item && item.children && hasActiveChild(item)) {
            openDropdowns.value[index] = true;
          }
        });
      }
    });
    onUnmounted(() => {
      eventBus.off("toggle-sidebar", handleSidebar);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<aside${ssrRenderAttrs(mergeProps({
        class: ["fixed top-0 left-0 z-20 flex flex-col flex-shrink-0 h-full pt-16 font-normal duration-300 transition-all bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700", isCollapsed.value ? "w-16" : "w-64"],
        "aria-label": "Sidebar"
      }, _attrs))}><div class="relative flex flex-col flex-1 min-h-0 pt-0"><div class="flex flex-col flex-1 pt-4 overflow-y-auto overflow-x-hidden"><div class="flex-1 px-3 space-y-1 divide-dashed divide-y divide-gray-200 dark:divide-gray-700"><ul class="py-2 space-y-2"><!--[-->`);
      ssrRenderList(menuItems.value, (item, index) => {
        _push(`<li>`);
        if (item.children && item.children.length > 0) {
          _push(`<!--[--><div class="${ssrRenderClass([[
            isCollapsed.value ? "justify-center" : "justify-between",
            {
              "bg-paper-2 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400": hasActiveChild(item) || openDropdowns.value[index],
              "bg-paper-2 dark:bg-paper-2-dark/50 text-ink dark:text-ink-dark": !hasActiveChild(item) && !openDropdowns.value[index]
            }
          ], "flex items-center py-2.5 px-3 text-sm font-semibold rounded-sm cursor-pointer transition-all duration-150 group relative"])}"><div class="flex items-center">`);
          _push(ssrRenderComponent(unref(Icon), {
            class: ["w-5 h-5 transition duration-75 shrink-0", {
              "text-blue-600 dark:text-blue-400": hasActiveChild(item) || openDropdowns.value[index],
              "text-ink-2 group-hover:text-gray-700 dark:group-hover:text-white": !hasActiveChild(item) && !openDropdowns.value[index]
            }],
            icon: item.icon || "solar:folder-bold-duotone"
          }, null, _parent));
          if (!isCollapsed.value) {
            _push(`<span class="ml-3 whitespace-nowrap">${ssrInterpolate(item.title)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
          if (!isCollapsed.value) {
            _push(ssrRenderComponent(unref(Icon), {
              icon: "solar:alt-arrow-down-linear",
              class: ["w-4 h-4 transition-transform duration-200", { "rotate-180": openDropdowns.value[index] }]
            }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
          if (!isCollapsed.value) {
            _push(`<ul class="py-1.5 space-y-1.5 pl-4" style="${ssrRenderStyle(openDropdowns.value[index] ? null : { display: "none" })}"><!--[-->`);
            ssrRenderList(item.children, (child) => {
              _push(`<li>`);
              _push(ssrRenderComponent(unref(Link), {
                href: getHref(child.route),
                class: ["flex items-center py-2 px-3 text-[13px] font-semibold border-l-[1.5px] border-dashed transition-all duration-150 rounded-r-xl", {
                  "border-blue-600 bg-paper-2/50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400": isActive(child.route),
                  "border-rule dark:border-rule-dark hover:border-blue-400 text-gray-600 dark:text-ink-2 hover:text-blue-600 dark:hover:text-blue-400": !isActive(child.route)
                }]
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`<span class="whitespace-nowrap"${_scopeId}>${ssrInterpolate(child.title)}</span>`);
                  } else {
                    return [
                      createVNode("span", { class: "whitespace-nowrap" }, toDisplayString(child.title), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent));
              _push(`</li>`);
            });
            _push(`<!--]--></ul>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        } else {
          _push(ssrRenderComponent(unref(Link), {
            href: getHref(item.route),
            class: ["flex items-center py-2.5 px-3 text-sm font-semibold rounded-sm transition-all duration-150 group relative", [
              isCollapsed.value ? "justify-center" : "",
              {
                "bg-accent text-white ": isActive(item.route),
                "bg-paper-2 dark:bg-paper-2-dark/50 text-ink dark:text-ink-dark": !isActive(item.route)
              }
            ]]
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(Icon), {
                  class: ["w-5 h-5 transition duration-75 shrink-0", {
                    "text-white": isActive(item.route),
                    "text-ink-2 group-hover:text-gray-700 dark:group-hover:text-white": !isActive(item.route)
                  }],
                  icon: item.icon || "solar:widget-bold-duotone"
                }, null, _parent2, _scopeId));
                if (!isCollapsed.value) {
                  _push2(`<span class="ml-3 whitespace-nowrap"${_scopeId}>${ssrInterpolate(item.title)}</span>`);
                } else {
                  _push2(`<!---->`);
                }
              } else {
                return [
                  createVNode(unref(Icon), {
                    class: ["w-5 h-5 transition duration-75 shrink-0", {
                      "text-white": isActive(item.route),
                      "text-ink-2 group-hover:text-gray-700 dark:group-hover:text-white": !isActive(item.route)
                    }],
                    icon: item.icon || "solar:widget-bold-duotone"
                  }, null, 8, ["class", "icon"]),
                  !isCollapsed.value ? (openBlock(), createBlock("span", {
                    key: 0,
                    class: "ml-3 whitespace-nowrap"
                  }, toDisplayString(item.title), 1)) : createCommentVNode("", true)
                ];
              }
            }),
            _: 2
          }, _parent));
        }
        _push(`</li>`);
      });
      _push(`<!--]--></ul></div></div></div></aside>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/Partials/Sidebar.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<footer${ssrRenderAttrs(mergeProps({ class: "py-6 px-4 text-center text-xs text-gray-400 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 transition mt-auto" }, _attrs))}><p>© ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} SIKAJIAN - Sistem Informasi Kajian &amp; Riset Bapperida Kota Samarinda. All rights reserved.</p></footer>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/Partials/Footer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const Footer = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = {
  __name: "AuthenticatedLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const isCollapsed = ref(JSON.parse(localStorage.getItem("sidebarCollapsed") || "false"));
    const handleSidebar = (state) => {
      isCollapsed.value = state;
    };
    onMounted(() => {
      eventBus.on("toggle-sidebar", handleSidebar);
      const isDark = localStorage.getItem("darkMode") === "true";
      document.documentElement.classList.toggle("dark", isDark);
    });
    onUnmounted(() => {
      eventBus.off("toggle-sidebar", handleSidebar);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$3, null, null, _parent));
      _push(`<div class="flex flex-1 pt-16">`);
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(`<div class="${ssrRenderClass([isCollapsed.value ? "pl-16" : "pl-64", "flex flex-col flex-1 duration-300 transition-all"])}"><main class="flex-1 p-6 sm:p-8">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main>`);
      _push(ssrRenderComponent(Footer, null, null, _parent));
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/AuthenticatedLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
