/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./*.tsx",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Inter"', 'sans-serif'],
            },
            colors: {
                black: '#000000',
                zinc: {
                    850: '#1f1f22',
                    900: '#18181b',
                    950: '#09090b',
                },
                brand: {
                    bg: '#000000',
                    surface: '#0A0A0B',
                    elevated: '#141416',
                    accent: '#5B5BD6',
                    'accent-light': '#7878E8',
                    'accent-muted': 'rgba(91, 91, 214, 0.15)',
                    success: '#30A46C',
                    warning: '#F5A623',
                    danger: '#E5484D',
                    'text-primary': '#FAFAFA',
                    'text-secondary': '#A1A1AA',
                    'text-muted': '#52525B',
                }
            },
            animation: {
                'float': 'float 8s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'slide-up': 'slideUp 0.5s ease-out forwards',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(100%)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                }
            }
        }
    },
    plugins: [],
}
