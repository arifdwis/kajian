import '../css/app.css';
import './bootstrap';

import { createInertiaApp, Link, Head, router } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createApp, h } from 'vue';
import { ZiggyVue, route } from '../../vendor/tightenco/ziggy';

import { DateTime } from 'luxon';
import { Icon } from '@iconify/vue';

import Toast, { useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";

import ConfirmationService from 'primevue/confirmationservice';
import PrimeVue from 'primevue/config';
import MyPreset from './datatable';
import Tooltip from 'primevue/tooltip';
import 'primeicons/primeicons.css';
import SearchSelect from './Components/SearchSelect.vue';

const PrimeCustom = {
    ptOptions: {
        mergeSections: false,
        mergeProps: false,
    },
    ripple: false,
    theme: {
        preset: MyPreset,
        options: {
            darkModeSelector: '.dark',
        },
    },
    buttonStyle: 'contained',
    inputStyle: 'outlined',
    autoZIndex: false,
    blockUI: false,
    locale: {
        monthNames: [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ]
    }
};

const ToastOptions = {
    position: "top-right",
    timeout: 5000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: "button",
    icon: true,
    rtl: false
};

const appName = 'SIKAJIAN';

const formatDateTime = (date) => {
    if (!date) return '-';
    return DateTime.fromISO(date)
        .setLocale('id')
        .toFormat('dd MMMM yyyy HH:mm');
};

const formatDate = (date) => {
    if (!date) return '-';
    return DateTime.fromISO(date)
        .setLocale('id')
        .toFormat('dd MMM yyyy');
};

const diffForHumans = (date) => {
    if (!date) return '-';
    const now = DateTime.now();
    const targetDate = DateTime.fromISO(date);
    return targetDate.toRelative({ base: now });
};

function headerField(str) {
    return str.replace(/_/g, ' ');
}

createInertiaApp({
    title: (title) => title ? `${title} - ${appName}` : appName,
    resolve: (name) =>
        resolvePageComponent(`./Pages/${name}.vue`,
            import.meta.glob('./Pages/**/*.vue')),
    setup({ el, App, props, plugin }) {
        const app = createApp({ render: () => h(App, props) });

        // Global properties
        app.config.globalProperties.$headerField = headerField;
        app.config.globalProperties.$formatDate = formatDate;
        app.config.globalProperties.$formatDateTime = formatDateTime;
        app.config.globalProperties.$diffForHumans = diffForHumans;
        app.config.globalProperties.$route = route;

        // Global components
        app.component('Link', Link);
        app.component('Head', Head);
        app.component('Icon', Icon);
        app.component('SearchSelect', SearchSelect);

        app.use(Toast, ToastOptions);
        app.use(plugin)
            .use(ZiggyVue)
            .use(ConfirmationService)
            .use(PrimeVue, PrimeCustom)
            .directive('tooltip', Tooltip);

        // Global Inertia flash -> toast bridge
        const globalToast = useToast();
        const showFlashToasts = (flash) => {
            if (!flash) return;
            if (flash.success) globalToast.success(flash.success);
            if (flash.error) globalToast.error(flash.error);
            if (flash.warning) globalToast.warning(flash.warning);
            if (flash.info) globalToast.info(flash.info);
        };

        // Navigation listener
        router.on('success', (event) => {
            showFlashToasts(event.detail?.page?.props?.flash);
        });

        // Load flash on start
        showFlashToasts(props.initialPage?.props?.flash);

        app.mount(el);
    },
    progress: {
        color: '#3B82F6',
    },
});
