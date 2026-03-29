/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        yju: {
          primary: '#1A3A5C',
          'primary-dark': '#0F2340',
          'primary-light': '#2E6DA4',
          'primary-pale': '#E8F1FA',
          accent: '#E85D04',
          'accent-dark': '#C44E03',
          'accent-light': '#F48C4A',
          'accent-pale': '#FEF0E7',
        },
        molted: {
          black: '#FFFFFF',             // page background — white
          surface: '#F8F9FC',           // light surface
          elevated: '#F1F3F8',          // light card background
          border: 'rgba(0,0,0,0.09)',   // subtle dark border on white
          /* Logo palette — corporate: steel-blue (primary) · navy (statement) */
          charcoal: '#1C1C1E',
          gold: '#64748B',        /* slate-500 — neutral gray */
          'gold-light': '#94A3B8',
          'gold-dark': '#475569',
          red: '#1E3A8A',         /* navy blue */
          'red-light': '#3B82F6',
          'red-dark': '#172554',
          white: '#0F172A',             // near-black — primary text on white bg
          muted: '#475569',             // slate-600 — readable on white
          subtle: '#94A3B8',            // slate-400 — secondary on white
          /* Aliases so existing classes keep working */
          violet: '#64748B',
          'violet-light': '#94A3B8',
          'violet-dark': '#475569',
          ember: '#1E3A8A',
          'ember-light': '#3B82F6',
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
        'yju': '0 4px 24px rgba(26, 58, 92, 0.12)',
        'yju-accent': '0 4px 24px rgba(255, 198, 39, 0.20)',
        'card': '0 2px 12px rgba(0,0,0,0.06)',
        'card-hover': '0 8px 32px rgba(26, 58, 92, 0.15)',
        'molted-glow': '0 0 60px rgba(37, 99, 235, 0.18), 0 0 120px rgba(37, 99, 235, 0.08)',
        'molted-violet': '0 4px 32px rgba(100, 116, 139, 0.28)',
        'molted-ember': '0 4px 32px rgba(30, 58, 138, 0.28)',
        'molted-gold': '0 4px 32px rgba(100, 116, 139, 0.32)',
        'molted-red': '0 4px 32px rgba(30, 58, 138, 0.30)',
        'molted-card': '0 1px 3px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)',
        'molted-card-hover': '0 4px 20px rgba(0, 0, 0, 0.10), 0 2px 6px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
}
