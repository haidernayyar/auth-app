/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#38E07B',  
        secondary: '#1976D2',
        background: '#111714',
        card: '#29382F', 
        'text-main': '#FFFFFF',
        'text-subtle': '#9CA3AF',
        'border-color': '#4B5563',
        error: '#ED4337'
      },
      spacing: {
        container: '30px',
      }
    },
  },
  plugins: [],
}

