/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#030612',
          900: '#050A20', // Main background from user prompt
          850: '#080E2C',
          800: '#0C153B',
          700: '#141F4D',
          600: '#1E2D69',
        },
        neonPurple: {
          light: '#AB87FF',
          DEFAULT: '#8655FF', // Main neon purple
          dark: '#6A30E5',
          deep: '#4E19C0',
        },
        gold: {
          light: '#FFE48A',
          DEFAULT: '#FFD34E', // Golden yellow highlight
          dark: '#E5B82A',
          deep: '#B8860B',
        },
        cyberCyan: {
          light: '#67E8F9',
          DEFAULT: '#06B6D4',
          glow: '#22D3EE',
        },
        emeraldGlow: {
          light: '#6EE7B7',
          DEFAULT: '#10B981',
        }
      },
      boxShadow: {
        'glow-purple': '0 0 25px -3px rgba(134, 85, 255, 0.45)',
        'glow-purple-lg': '0 0 45px -5px rgba(134, 85, 255, 0.6)',
        'glow-gold': '0 0 25px -3px rgba(255, 211, 78, 0.45)',
        'glow-cyan': '0 0 25px -3px rgba(34, 211, 238, 0.45)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'glow-breathe': 'glowBreathe 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glowBreathe: {
          '0%, 100%': { opacity: '0.4', filter: 'blur(40px)' },
          '50%': { opacity: '0.8', filter: 'blur(55px)' },
        }
      }
    },
  },
  plugins: [],
}
