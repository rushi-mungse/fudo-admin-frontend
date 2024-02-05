/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                active: "#01b074",
                activeLight: "#d9f3eb",
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
