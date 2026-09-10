/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#14181F',
          800: '#1B212B',
          700: '#232B38',
        },
        paper: {
          DEFAULT: '#F6F7F9',
          100: '#FFFFFF',
          200: '#EEF0F3',
        },
        coffee: {
          DEFAULT: '#8B5A2B',
          light: '#A9662B',
          dark: '#6B4520',
        },
        signal: {
          DEFAULT: '#3B5170',
          light: '#5A7196',
        },
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        '7xl': '80rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(20, 24, 31, 0.06)',
      },
      keyframes: {
        caret: {
          '0%, 49%': { opacity: 1 },
          '50%, 100%': { opacity: 0 },
        },
        riseIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        caret: 'caret 1s steps(1) infinite',
        riseIn: 'riseIn 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
}
