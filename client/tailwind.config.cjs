/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            maxHeight: {
                '6xl': '1152px', // custom max-h-6xl
            },
            minWidth: {
                'sm': '24rem'
            }
        },
    },
    plugins: [],
}
