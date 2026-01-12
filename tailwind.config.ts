import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fce8ec',
          100: '#f8c5ce',
          200: '#f29dab',
          300: '#eb7488',
          400: '#e6566e',
          500: '#DC143C',
          600: '#E8354F',
          700: '#DC143C',
          800: '#B01030',
          900: '#8B0A1E',
          DEFAULT: '#DC143C',
          light: '#E8354F',
          dark: '#B01030',
        },
        secondary: {
          DEFAULT: '#0D0D0D',
          light: '#1A1A1A',
        },
        background: '#FAFAFA',
        card: '#FFFFFF',
        text: {
          DEFAULT: '#0D0D0D',
          muted: '#666666',
        },
        'product-bg': '#1A1A1A',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
