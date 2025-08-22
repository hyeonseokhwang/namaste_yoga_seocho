import typography from '@tailwindcss/typography';
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display','serif'],
        sans: ['Pretendard','system-ui','-apple-system','BlinkMacSystemFont','Segoe UI','Roboto','Helvetica Neue','Arial','Noto Sans','sans-serif']
      },
      colors: {
        // New benchmark-driven palette (inspired by modern calm wellness sites)
        brand: {
          50:'#f5f8fa',
          100:'#e9f0f5',
          200:'#d4e2eb',
          300:'#b3ccd9',
          400:'#7fa8bc',
          500:'#4d849f',
          600:'#32657f',
          700:'#285166',
          800:'#1f3f51',
          900:'#152b37'
        },
        accent: {
          50:'#fef9f3',
          100:'#fcefdc',
          200:'#f8dcb6',
          300:'#f3c48a',
          400:'#ec9d4a',
          500:'#df7d1f',
          600:'#c26215',
          700:'#9a4c14',
          800:'#783c16',
          900:'#5d3015'
        },
        neutral: {
          50:'#f9fafb',
          100:'#f0f3f5',
          200:'#e2e7ea',
          300:'#ccd3d8',
          400:'#aab5bc',
          500:'#85929b',
          600:'#647179',
          700:'#4f5a61',
          800:'#3e474d',
          900:'#2d3337'
        },
        success:{500:'#3a7f52'},
        danger:{500:'#c84949'},
        info:{500:'#2d6fb5'}
      },
      boxShadow: {
        'soft-lg':'0 8px 28px -4px rgba(16,38,49,0.08),0 4px 12px -2px rgba(16,38,49,0.06)'
      },
      keyframes: {
        'fade-in': { '0%':{opacity:0, transform:'translateY(12px)'}, '100%':{opacity:1, transform:'translateY(0)'} },
        'slow-pan': {'0%':{transform:'scale(1) translateY(0)'},'100%':{transform:'scale(1.05) translateY(-2%)'}},
      },
      animation: {
        'fade-in':'fade-in .8s ease-out forwards',
        'slow-pan':'slow-pan 18s linear infinite alternate'
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: '#374151',
            h2: { color: '#285166', fontWeight: '600' },
            h3: { color: '#32657f', fontWeight: '600' },
            strong: { color: '#285166' },
            a: { color: '#32657f', textDecoration: 'none', fontWeight: '500' },
            'a:hover': { color: '#1f3f51' },
            li: { marginTop: '0.4em', marginBottom: '0.4em' },
            code: { background: '#f5f8fa', padding: '2px 5px', borderRadius: '4px' }
          }
        }
      }
    },
  },
  plugins: [typography],
};
