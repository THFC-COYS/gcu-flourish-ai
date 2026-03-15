/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gcu: {
          purple: '#4B2E83',
          'purple-dark': '#3A2268',
          'purple-light': '#6B4FA3',
          'purple-pale': '#EDE8F5',
          gold: '#FFC627',
          'gold-dark': '#E6A800',
          'gold-light': '#FFD980',
          'gold-pale': '#FFF8E1',
        },
        molted: {
          black: '#FFFFFF',             // page background — white
          surface: '#FAFAFA',           // slightly off-white surface
          elevated: '#F2F2F7',          // Apple system gray 6 — card bg
          border: '#D1D1D6',            // Apple gray 3 — light border
          /* Logo palette — Jobs-refined: amber-gold (alive) · scarlet (statement) */
          charcoal: '#1C1C1E',
          gold: '#E8A020',        /* amber-gold */
          'gold-light': '#F5B740',
          'gold-dark': '#C4841A',
          red: '#E8170F',         /* scarlet */
          'red-light': '#FF3D35',
          'red-dark': '#BF100A',
          white: '#1C1C1E',             // Apple label — near-black headlines
          muted: '#636366',             // Apple secondary label
          subtle: '#AEAEB2',            // Apple tertiary — placeholder / quiet
          /* Aliases so existing classes keep working */
          violet: '#E8A020',
          'violet-light': '#F5B740',
          'violet-dark': '#C4841A',
          ember: '#E8170F',
          'ember-light': '#FF3D35',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-in': 'slideIn 0.25s ease-out',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'typing': 'typing 1.2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'reveal': 'reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'ember-drift': 'emberDrift 8s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        typing: {
          '0%, 60%, 100%': { transform: 'translateY(0)' },
          '30%': { transform: 'translateY(-6px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        emberDrift: {
          '0%': { transform: 'translate(0, 0) rotate(0deg)', opacity: '0.3' },
          '33%': { transform: 'translate(20px, -30px) rotate(120deg)', opacity: '0.6' },
          '66%': { transform: 'translate(-15px, -60px) rotate(240deg)', opacity: '0.4' },
          '100%': { transform: 'translate(5px, -90px) rotate(360deg)', opacity: '0' },
        },
      },
      boxShadow: {
        'gcu': '0 4px 24px rgba(75, 46, 131, 0.12)',
        'gcu-gold': '0 4px 24px rgba(255, 198, 39, 0.20)',
        'card': '0 2px 12px rgba(0,0,0,0.06)',
        'card-hover': '0 8px 32px rgba(75, 46, 131, 0.15)',
        'molted-glow': '0 0 60px rgba(232, 160, 32, 0.18), 0 0 120px rgba(232, 160, 32, 0.08)',
        'molted-violet': '0 4px 32px rgba(232, 160, 32, 0.28)',
        'molted-ember': '0 4px 32px rgba(232, 23, 15, 0.28)',
        'molted-gold': '0 4px 32px rgba(232, 160, 32, 0.32)',
        'molted-red': '0 4px 32px rgba(232, 23, 15, 0.30)',
        'molted-card': '0 1px 3px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)',
        'molted-card-hover': '0 4px 20px rgba(0, 0, 0, 0.10), 0 2px 6px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
}
