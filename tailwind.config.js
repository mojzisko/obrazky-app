/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  future: {
    hoverOnlyWhenSupported: true
  },
  theme: {
    sans: ['Barlow', 'sans-serif'],
    extend: {
      scale: {
        '110': '1.1', // Custom scale for 110%
      },
      blur: {
        '2': '2px', // Custom blur value if not already available
      },
      transitionTimingFunction: {
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        underlineSlide: {
          'from': { width: '0%' },
          'to': { width: '100%' },
        },
      },
      animation: {
        underlineSlide: 'underlineSlide 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
}

