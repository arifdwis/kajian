import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import flowbitePlugin from 'flowbite/plugin';

export default {
    darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.vue',
        'node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx,vue}',
        'node_modules/flowbite/**/*.{js,jsx,ts,tsx}',
        'node_modules/tailwindcss-primeui/**/*.{js,jsx,ts,tsx,vue}',
    ],
    theme: {
        extend: {
            colors: {
                paper: {
                    DEFAULT: '#FCFCFD',
                    dark: '#1E1F22',
                    2: '#F2F3F5',
                },
                rule: {
                    DEFAULT: '#E4E5E7',
                    dark: '#42444A',
                },
                accent: {
                    DEFAULT: '#546B41',
                    dark: '#6B8460',
                    light: '#99AD7A',
                    ink: '#FFFFFF',
                },
                ink: {
                    DEFAULT: '#2C2E36',
                    dark: '#EAEBED',
                    2: '#6C6F7A',
                },
                graphite: {
                    DEFAULT: '#34363E',
                    dark: '#4A4D56',
                },
            },
            fontFamily: {
                display: ['Outfit', ...defaultTheme.fontFamily.sans],
                body: ['Inter', ...defaultTheme.fontFamily.sans],
                mono: ['Geist Mono', ...defaultTheme.fontFamily.mono],
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
            },
            borderRadius: {
                sm: '6px',
                card: '8px',
            },
        },
    },
    plugins: [
        forms,
        flowbitePlugin,
        require('tailwindcss-primeui')
    ],
};
