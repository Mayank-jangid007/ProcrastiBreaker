/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Barlow: ['Barlow', 'sans-serif'],
        Hachi: ["Hachi Maru Pop", "cursive"],
        Edu: ["Edu AU VIC WA NT Pre", "cursive"],
        Silk: ["Silkscreen", "sans-serif"],
        Inconsolata: ["Inconsolata", "monospace"],
      },
      animation: {
        'expandBg': 'expandBackground 0.5s ease-out forwards'
      },
      keyframes: {
        expandBackground: {
          '0%': {
            transform: 'scale(0)',
            borderRadius: '9999px',
            opacity: '0'
          },
          '100%': {
            transform: 'scale(1)',
            borderRadius: '24px',
            opacity: '1'
          }
        }
      }
    },
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
  experimental: {
    optimizeUniversal: true,
  }
}

