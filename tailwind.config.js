/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {},
    },
    daisyui: {
        themes: ['light', 'dark', 'retro'],
    },
    plugins: [require("@tailwindcss/typography"), require('daisyui')],
}
