import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary_text: "rgba(24, 25, 31, 1)",
        secondary_text: "rgba(255, 255, 255, 1)",
        tertiary_text: "rgba(209, 213, 219, 1)",
        primary_color: "rgba(9, 188, 138, 1)",
        secondary_color: "rgba(0, 67, 70, 1)",
        card_color: "rgba(80, 137, 145, 1)",
        dark_green: "rgba(23, 42, 58, 1)",
        just_red: "rgba(153, 32, 32, 1)",
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
      lineHeight: {
        '130': '1.3',
      },
    },
  },
  plugins: [],
};

export default config;
