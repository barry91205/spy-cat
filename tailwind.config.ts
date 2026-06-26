import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream:    '#FFF8F0',
        paw:      '#FF8C55',
        pawDark:  '#E8723C',
        caramel:  '#F4A261',
        warm:     '#FDE8D8',
        muted:    '#8B7355',
      },
      fontFamily: {
        sans: ['Noto Sans TC', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
} satisfies Config