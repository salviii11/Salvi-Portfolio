module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#a18fff', // light indigo
          DEFAULT: '#6366f1', // indigo-500
          dark: '#7c3aed', // purple-600
        },
        accent: '#f472b6', // pink-400
        dark: '#18181b', // zinc-900
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-to-br': 'linear-gradient(to bottom right, #6366f1, #7c3aed)',
      },
    },
  },
  plugins: [],
}; 