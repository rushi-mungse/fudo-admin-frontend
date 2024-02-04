/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                active: "#FE416B",
                activeLight: "#FDEDF0",
                gray: "#606060",
                bgColor: "#FFFFFF",
                pure: "#000000",
            },
            boxShadow: {
                shadow: "rgba(0,_0,_0,_0.1)_0px_0px_16px",
            },
        },
    },
    plugins: [],
    corePlugins: { preflight: false },
};
