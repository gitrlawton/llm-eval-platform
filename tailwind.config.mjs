/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4F46E5", // Tailwind blue-500
          foreground: "white",
        },
        secondary: {
          DEFAULT: "#6B7280", // Tailwind gray-500
          foreground: "white",
        },
        destructive: {
          DEFAULT: "#EF4444", // Tailwind red-500
          foreground: "white",
        },
        background: "white",
        accent: "#F3F4F6", // Tailwind gray-100
      },
    },
  },
  plugins: [],
};
