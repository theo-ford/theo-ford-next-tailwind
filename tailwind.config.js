/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      width: {
        25: "calc(25% - 6.5px)",
        65: "65px"
      },
      animationDelay: {
        "1s": "2s"
      },
      animation: {
        scale: "scale 1s linear forwards",
        fade: "fade 2s linear forwards"
      },
      keyframes: {
        scale: {
          "0%": { width: "calc(25% - 6.5px)" },
          "100%": { width: "74px" }
        },
        fade: {
          "0%": { opacity: "0" },
          "50%": { opacity: "0" },
          "100%": { opacity: "1" }
        }
      },
      fontFamily: {
        sans: ["Helvetica", "Arial", "sans-serif"]
      }
    }
  },
  plugins: []
};
