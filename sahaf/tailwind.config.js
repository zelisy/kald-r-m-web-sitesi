/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          navy: {
            50: '#f0f4f8',
            100: '#d9e2ec',
            200: '#b3c5d7',
            300: '#8da1b7',
            400: '#677d97',
            500: '#4a5d77',
            600: '#3d4c63',
            700: '#303b4f',
            800: '#232a3b',
            900: '#161927',
          },
        },
      },
    },
    plugins: [],
  } 