/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Custom breakpoints matching UX spec
      screens: {
        'mobile': '320px',
        'tablet': '768px',
        'desktop': '1024px',
      },
      // Pitline Corner Color System
      colors: {
        // Neutrals (Base) - Thème Classique
        background: '#ffffff',
        container: '#f5f5f5',
        border: '#9e9e9e',
        text: '#424242',
        'text-secondary': '#757575',
        accent: '#e0e0e0',
        
        // Brand Colors (F1 Inspired)
        primary: '#ff1801', // F1 Red
        secondary: '#15151e', // Dark Blue/Black
        tertiary: '#ffffff', // White

        // Semantics (Actions & États)
        error: '#d32f2f',
        success: '#388e3c',
        warning: '#f57c00',
        info: '#1976d2',

        // F1-Specific (Données de Course)
        'tire-soft': '#e53935',
        'tire-medium': '#fbc02d',
        'tire-hard': '#f5f5f5',
        'tire-intermediate': '#4caf50',
        'tire-wet': '#2196f3',
        'position-gain': '#66bb6a',
        'position-loss': '#f44336',
        'position-same': '#9e9e9e',
      },
      // Typography
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        mono: ['"SF Mono"', 'Monaco', '"Cascadia Code"', '"Courier New"', 'monospace'],
      },
      fontSize: {
        '2xs': ['11px', { lineHeight: '1.25' }],
        'xs': ['12px', { lineHeight: '1.25' }],
        'sm': ['14px', { lineHeight: '1.25' }],
        'base': ['16px', { lineHeight: '1.25' }],
        'lg': ['18px', { lineHeight: '1.25' }],
        'xl': ['20px', { lineHeight: '1.25' }],
        '2xl': ['24px', { lineHeight: '1.15' }],
        '3xl': ['28px', { lineHeight: '1.15' }],
        '4xl': ['36px', { lineHeight: '1.15' }],
        '5xl': ['48px', { lineHeight: '1.15' }],
      },
      // Spacing - 20px grid system
      spacing: {
        'grid': '20px',
        '4.5': '18px',
        '5.5': '22px',
      },
      // Border Radius
      borderRadius: {
        'card': '8px',
        'card-lg': '12px',
        'button': '6px',
        'input': '4px',
      },
      // Box Shadow
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 4px 16px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
}
