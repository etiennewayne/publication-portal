import defaultTheme from 'tailwindcss/defaultTheme';


/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                primary: ['UnifrakturCook', 'cursive'],
                secondary: ['Poppins', 'sans-serif'],
            },
            backgroundColor: {
                page: ['background-color', '#d9dcdb']
            },
            textColor: {
                textColorDefault: ['color', '#063223d8'],
            }
        },
    },

    plugins: [],
};
