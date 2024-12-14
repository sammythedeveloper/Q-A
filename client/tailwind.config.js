// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}", // Add paths to your template files
//   ],
//   theme: {
//     extend: {
//       animation: {
//         shine: 'shine 2s infinite',
//       },
//       keyframes: {
//         shine: {
//           '0%': { left: '-100%' },
//           '50%': { left: '100%' },
//           '100%': { left: '100%' },
//         },
//       },
//     },
//   },
//   plugins: [],
// };

// tailwind.config.js
module.exports = {
    content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Add paths to your template files
  ],
  theme: {
    extend: {
      colors: {
        violet: {
          400: '#7e22ce', // Example color, replace with your desired color
        },
        fuchsia: {
          400: '#d946ef', // Example color
          900: '#9d174d', // Example color
        },
        amber: {
          300: '#fbbf24', // Example color
        },
        teal: {
          300: '#4fd1c5', // Example color
        },
        gray: {
          950: '#1f2937', // Example color
        },
        indigo: {
          300: '#3b82f6', // Example color
          950: '#111827', // Example color
        },
      },
    },
  },
  plugins: [
    function ({ addBase, theme }) {
      addBase({
        ':root': {
          '--color-violet-400': theme('colors.violet.400'),
          '--color-fuchsia-400': theme('colors.fuchsia.400'),
          '--color-fuchsia-900': theme('colors.fuchsia.900'),
          '--color-amber-300': theme('colors.amber.300'),
          '--color-teal-300': theme('colors.teal.300'),
          '--color-gray-950': theme('colors.gray.950'),
          '--color-indigo-950': theme('colors.indigo.950'),
          '--color-border': theme('colors.gray.200'), // Note: you can also reference a specific opacity like `theme('colors.gray.200/20%')`
        },
      });
    },
  ],
};
