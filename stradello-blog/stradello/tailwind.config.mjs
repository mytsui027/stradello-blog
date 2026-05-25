/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Stradello brand palette — warm, grounded, editorial
        stone: {
          50:  '#faf9f7',
          100: '#f3f0ec',
          200: '#e8e2da',
          300: '#d4ccc0',
          400: '#b8ad9e',
          500: '#9e9082',
          600: '#857569',
          700: '#6d5f55',
          800: '#574d45',
          900: '#453d37',
          950: '#26211d',
        },
        sage: {
          50:  '#f4f7f4',
          100: '#e6ece5',
          200: '#cddacc',
          300: '#a8bfa7',
          400: '#7d9e7b',
          500: '#5d805b',
          600: '#496748',
          700: '#3b523a',
          800: '#314330',
          900: '#293829',
          950: '#141f14',
        },
        cream: {
          50:  '#fefdf9',
          100: '#fdf9ef',
          200: '#f9f1d8',
          300: '#f3e4b4',
          400: '#ebcf83',
          500: '#e2b955',
          600: '#d4a030',
          700: '#b08025',
          800: '#8d6522',
          900: '#745321',
          950: '#3f2c0f',
        },
        terra: {
          50:  '#fdf5f0',
          100: '#fae8dc',
          200: '#f5cfb9',
          300: '#eead8a',
          400: '#e58358',
          500: '#dc6232',
          600: '#cd4c22',
          700: '#aa3b1e',
          800: '#88311f',
          900: '#6e2b1e',
          950: '#3b130d',
        },
      },
      fontFamily: {
        // Display: Cormorant Garamond — literary, timeless, emotional
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        // Body: DM Sans — clean, friendly, readable
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        // Mono: for code/metadata
        mono: ['JetBrains Mono', 'monospace'],
        // Accent: Lora for pull quotes
        serif: ['Lora', 'Georgia', 'serif'],
      },
      fontSize: {
        'fluid-sm':  'clamp(0.875rem, 0.8rem + 0.25vw, 1rem)',
        'fluid-base':'clamp(1rem, 0.9rem + 0.3vw, 1.125rem)',
        'fluid-lg':  'clamp(1.125rem, 1rem + 0.5vw, 1.375rem)',
        'fluid-xl':  'clamp(1.375rem, 1.2rem + 0.75vw, 1.75rem)',
        'fluid-2xl': 'clamp(1.75rem, 1.5rem + 1vw, 2.5rem)',
        'fluid-3xl': 'clamp(2.5rem, 2rem + 1.5vw, 4rem)',
        'fluid-4xl': 'clamp(3.5rem, 2.5rem + 2.5vw, 6rem)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
      },
      maxWidth: {
        'prose-sm': '55ch',
        'prose':    '68ch',
        'prose-lg': '75ch',
        'site':     '1280px',
        'wide':     '1440px',
      },
      lineHeight: {
        'relaxed-plus': '1.8',
        'loose-plus':   '2.1',
      },
      letterSpacing: {
        'widest-plus': '0.25em',
      },
      borderRadius: {
        'sm': '0.25rem',
        DEFAULT: '0.375rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      transitionTimingFunction: {
        'ease-in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'ease-out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
        'ease-in-out-expo': 'cubic-bezier(0.87, 0, 0.13, 1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'slide-in': 'slideIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.stone.800'),
            '--tw-prose-headings': theme('colors.stone.950'),
            '--tw-prose-links': theme('colors.sage.600'),
            '--tw-prose-bold': theme('colors.stone.900'),
            '--tw-prose-quotes': theme('colors.stone.700'),
            '--tw-prose-quote-borders': theme('colors.sage.300'),
            maxWidth: '68ch',
            fontFamily: theme('fontFamily.sans').join(', '),
            fontSize: '1.0625rem',
            lineHeight: '1.8',
            h1: {
              fontFamily: theme('fontFamily.display').join(', '),
              fontWeight: '600',
              fontSize: 'clamp(2rem, 1.5rem + 1.5vw, 3rem)',
              letterSpacing: '-0.02em',
              lineHeight: '1.15',
            },
            h2: {
              fontFamily: theme('fontFamily.display').join(', '),
              fontWeight: '500',
              fontSize: 'clamp(1.4rem, 1.2rem + 0.75vw, 2rem)',
              letterSpacing: '-0.01em',
              lineHeight: '1.25',
            },
            h3: {
              fontFamily: theme('fontFamily.display').join(', '),
              fontWeight: '500',
            },
            blockquote: {
              fontFamily: theme('fontFamily.serif').join(', '),
              fontStyle: 'italic',
              fontSize: '1.15rem',
              lineHeight: '1.7',
              borderLeftWidth: '3px',
              borderLeftColor: theme('colors.sage.300'),
              paddingLeft: '1.5rem',
              color: theme('colors.stone.600'),
            },
            a: {
              textDecoration: 'underline',
              textDecorationColor: theme('colors.sage.300'),
              textUnderlineOffset: '3px',
              transition: 'color 0.2s ease',
              '&:hover': {
                color: theme('colors.sage.700'),
              },
            },
          },
        },
        invert: {
          css: {
            '--tw-prose-body': theme('colors.stone.200'),
            '--tw-prose-headings': theme('colors.stone.50'),
            '--tw-prose-links': theme('colors.sage.300'),
            '--tw-prose-bold': theme('colors.stone.100'),
            '--tw-prose-quotes': theme('colors.stone.300'),
            '--tw-prose-quote-borders': theme('colors.sage.600'),
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
