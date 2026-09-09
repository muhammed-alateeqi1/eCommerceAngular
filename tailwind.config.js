/** @type {import('tailwindcss').Config} */
module.exports = {
  // Class strategy (not 'media') so the in-app theme toggle can override the OS
  // preference. ThemeService adds/removes `.dark` on <html>.
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1rem', sm: '1.5rem', lg: '2rem' },
    },
    extend: {
      colors: {
        brand: {
          50: '#ecfdf0',
          100: '#d1fadd',
          200: '#a7f3c0',
          300: '#6ee7a0',
          400: '#34d777',
          500: '#00ad18',
          600: '#009614',
          700: '#007d12',
          800: '#056211',
          900: '#064f11',
        },
      },
      fontFamily: {
        sans: ['"Encode Sans Expanded"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px 0 rgb(0 0 0 / 0.04), 0 1px 3px 0 rgb(0 0 0 / 0.06)',
        'card-hover': '0 10px 25px -5px rgb(0 0 0 / 0.10), 0 8px 10px -6px rgb(0 0 0 / 0.06)',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up .35s ease-out both',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
