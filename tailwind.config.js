/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        violet: {
          50:  '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
      },
      animation: {
        'fade-in':        'fadeIn 0.5s ease-out',
        'fade-in-fast':   'fadeIn 0.2s ease-out',
        'slide-up':       'slideUp 0.4s ease-out',
        'slide-up-fast':  'slideUp 0.25s ease-out',
        'slide-in':       'slideIn 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.35s ease-out',
        'slide-down':     'slideDown 0.3s ease-out',
        'scale-in':       'scaleIn 0.2s ease-out',
        'bounce-subtle':  'bounceSubtle 0.5s ease-out',
        'pulse-slow':     'pulse 3s ease-in-out infinite',
        'shimmer':        'shimmer 1.5s infinite linear',
        'float':          'float 3s ease-in-out infinite',
        'spin-slow':      'spin 3s linear infinite',
        'toast-in':       'toastIn 0.35s cubic-bezier(0.34,1.56,0.64,1)',
        'toast-out':      'toastOut 0.25s ease-in forwards',
        'progress':       'progress 0.8s ease-out',
        'counter':        'counter 1.5s ease-out forwards',
        'card-hover':     'cardHover 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%':   { opacity: '0', transform: 'translateX(-16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%':   { opacity: '0', transform: 'translateX(16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideDown: {
          '0%':   { opacity: '0', transform: 'translateY(-12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%':   { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        toastIn: {
          '0%':   { opacity: '0', transform: 'translateY(16px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        toastOut: {
          '0%':   { opacity: '1', transform: 'translateY(0) scale(1)' },
          '100%': { opacity: '0', transform: 'translateY(8px) scale(0.95)' },
        },
        progress: {
          '0%':   { width: '0%' },
          '100%': { width: '100%' },
        },
        cardHover: {
          '0%':   { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-4px)' },
        },
      },
      boxShadow: {
        'card':     '0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px -1px rgba(0,0,0,0.04)',
        'card-md':  '0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -2px rgba(0,0,0,0.05)',
        'card-lg':  '0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -4px rgba(0,0,0,0.04)',
        'card-xl':  '0 20px 25px -5px rgba(0,0,0,0.08), 0 8px 10px -6px rgba(0,0,0,0.04)',
        'violet':   '0 4px 14px 0 rgba(124,58,237,0.25)',
        'violet-lg':'0 8px 25px 0 rgba(124,58,237,0.35)',
        'glow':     '0 0 20px rgba(124,58,237,0.15)',
        'inner-sm': 'inset 0 1px 2px rgba(0,0,0,0.05)',
      },
      backgroundImage: {
        'shimmer-gradient': 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
        'hero-gradient':    'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
        'card-gradient':    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
}
