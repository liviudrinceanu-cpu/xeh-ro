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
          50: '#e6eaf0',
          100: '#c2cce0',
          200: '#9aabc9',
          300: '#7289b2',
          400: '#5370a1',
          500: '#345790',
          600: '#2d4d80',
          700: '#24406b',
          800: '#1a365d',
          900: '#0f1f36',
          DEFAULT: '#1a365d',
        },
        accent: {
          50: '#fef3e6',
          100: '#fde0c2',
          200: '#fbcc99',
          300: '#f9b870',
          400: '#f7a852',
          500: '#ed8936',
          600: '#dd6b20',
          700: '#c05621',
          800: '#9c4221',
          900: '#7b341e',
          DEFAULT: '#ed8936',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
