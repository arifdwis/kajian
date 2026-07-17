import { unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "Pagination",
  __ssrInlineRender: true,
  props: {
    links: {
      type: Array,
      required: true
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.links.length > 3) {
        _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex flex-wrap -mb-1 justify-center sm:justify-start gap-1"><!--[-->`);
        ssrRenderList(__props.links, (link, key) => {
          _push(`<!--[-->`);
          if (link.url === null) {
            _push(`<div class="mr-1 mb-1 px-4 py-2 text-sm leading-4 text-gray-400 border border-gray-200 dark:border-gray-700 rounded-sm">${link.label ?? ""}</div>`);
          } else {
            _push(ssrRenderComponent(unref(Link), {
              key: `link-${key}`,
              class: ["mr-1 mb-1 px-4 py-2 text-sm leading-4 border rounded-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:border-blue-500 focus:text-blue-500 transition-colors", { "bg-accent border-blue-600 hover:bg-blue-700 text-white dark:text-white": link.active, "text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700": !link.active }],
              href: link.url
            }, null, _parent));
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Pagination.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
