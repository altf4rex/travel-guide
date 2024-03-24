import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryDark: "#000000",
        primaryLight: "#E4EEEC",
        secondary: "#61788A",
        secondaryBackground: "#F0F2F5",
        secondaryBackgroundHover: "#C8C8C8",
      }
    },
  },
  plugins: [],
  darkMode: "class"
};
export default config;
