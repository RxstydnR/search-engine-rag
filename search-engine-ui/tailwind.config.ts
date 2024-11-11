import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        float: 'float var(--duration) infinite linear',
        slideUp: 'slideUp 0.3s ease-out',
        zoomOut: 'zoomOut 1s forwards',
      },
      keyframes: {
        float: {
          '0%': { transform: 'translate(0, 0) rotate(0deg)' },
          '33%': { transform: 'translate(30px, 30px) rotate(120deg)' },
          '66%': { transform: 'translate(-30px, 30px) rotate(240deg)' },
          '100%': { transform: 'translate(0, 0) rotate(360deg)' },
        },
        slideUp: {
          'from': { transform: 'translateY(20px)', opacity: '0' },
          'to': { transform: 'translateY(0)', opacity: '1' },
        },
        zoomOut: {
          '0%': { transform: 'scale(1) translateZ(0)' },
          '100%': { transform: 'scale(1.3) translateZ(1000px)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
