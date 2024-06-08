const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Nunito', ...defaultTheme.fontFamily.sans],
            },
            backgroundColor: {
                'larasocial-primary': '#111827',
                'larasocial-secondary': '#3772FF'
            },
            borderColor: {
                'larasocial-primary': '#111827',
                'larasocial-secondary': '#3772FF'
            },
            ringColor: {
                'larasocial-primary': '#111827',
                'larasocial-secondary': '#3772FF'
            },
            textColor: {
                'larasocial-primary': '#111827',
                'larasocial-secondary': '#3772FF'
            },
        },
    },

    plugins: [require('@tailwindcss/forms')],
};
