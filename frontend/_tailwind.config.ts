import plugin from 'tailwindcss/plugin';
import defaultTheme from 'tailwindcss/defaultTheme';
import screens from '@/utils/dimensions.json';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './ui/**/*.{ts,tsx}',
    './out/*.{html,js}',
  ],
  theme: {
    extend: {
      screens,
      fontFamily: {
        sans: ['Verdana', ...defaultTheme.fontFamily.sans],
      },
      borderWidth: {
        0: '0',
        1: '1px',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        border: 'hsl(var(--border))',
        white: '#fff',
        white10: 'rgba(255,255,255,0.1)',
        darkBlue: '#053449',
        link: '#006599',
        menu: '#959595',
        lightGray: '#707070',
        darkGray: '#111111',
        btnBg: '#1e3a8a',
        btnText: 'white',
        btnHover: '#1e40af',
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem', letterSpacing: 'normal' }],
        sm: ['0.8125rem', { lineHeight: '1rem', letterSpacing: 'normal' }],
        smbase: ['0.875rem', { lineHeight: '1.25', letterSpacing: 'normal' }],
        base: ['1rem', { lineHeight: '1.375rem', letterSpacing: 'normal' }],
        md: ['1.125rem', { lineHeight: '1.75rem', letterSpacing: 'normal' }],
        lg: ['1.25rem', { lineHeight: '1.5', letterSpacing: 'normal' }],
        xl: ['1.375rem', { lineHeight: '1.75rem', letterSpacing: 'normal' }],
        '2xl': ['1.5rem', { lineHeight: '1.75rem', letterSpacing: 'normal' }],
        '3xl': ['1.75rem', { lineHeight: '1.25', letterSpacing: 'normal' }],
        '4xl': ['2rem', { lineHeight: '1.2', letterSpacing: 'normal' }],
        '5xl': ['2.5rem', { lineHeight: '1.1', letterSpacing: 'normal' }],
        '6xl': ['3rem', { lineHeight: '1.1', letterSpacing: 'normal' }],
        '7xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        '8xl': ['3.875rem', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        '9xl': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        '10xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        '11xl': ['5rem', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        '12xl': ['6rem', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        '13xl': ['7rem', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        '14xl': ['7.5rem', { lineHeight: '1.2', letterSpacing: 'normal' }],
        '15xl': ['8rem', { lineHeight: '1.2', letterSpacing: 'normal' }],
      },
      fontWeight: {
        bold: '700',
        semibold: '587',
        normalMedium: '493',
        normal: '400',
      },
      animation: {
        'text-reveal': 'text-reveal 1.5s cubic-bezier(0.77, 0, 0.175, 1) 0.5s',
      },
      keyframes: {
        'text-reveal': {
          '0%': {
            transform: 'translate(0, 100%)',
          },
          '100%': {
            transform: 'translate(0, 0)',
          },
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents, addBase, theme, addUtilities }) {
      addUtilities({
        '.font-features': {
          fontFeatureSettings: '"cv11", "ss01"',
          fontVariationSettings: '"ss01" on',
        },
      });

      addComponents({
        '.container': {
          width: '100%',
          padding: '0 1rem',
          margin: '0 auto',
          '@screen mobile': {
            maxWidth: '52rem',
            padding: '0 1rem',
          },
          '@screen tablet': {
            maxWidth: '80rem',
            padding: '0 1.5rem',
          },
          '@screen desktop': {
            maxWidth: '90rem',
            padding: '0 4rem',
          },
        },
      });

      addComponents({
        '.pLarge': {
          'font-weight': theme('fontWeight.normalMedium'),
          'letter-spacing': '0',
          '@screen desktop': {
            'line-height': '150%',
            'font-size': theme('fontSize.lg'),
          },
          '@screen tablet': {
            'line-height': '150%',
            'font-size': theme('fontSize.lg'),
          },
          '@screen mobile': {
            'line-height': '155.556%',
            'font-size': theme('fontSize.md'),
          },
        },
        '.pNormal': {
          'font-weight': theme('fontWeight.normalMedium'),
          'letter-spacing': '0',
          '@screen desktop': {
            'line-height': '137.5%',
            'font-size': theme('fontSize.base'),
          },
          '@screen tablet': {
            'line-height': '137.5%',
            'font-size': theme('fontSize.base'),
          },
          '@screen mobile': {
            'line-height': '142.857%',
            'font-size': theme('fontSize.smbase'),
          },
        },
        '.pSmall': {
          'font-weight': theme('fontWeight.normal'),
          '@screen desktop': {
            'letter-spacing': '-0.008rem',
            'line-height': '123.077%',
            'font-size': '0.813rem',
          },
          '@screen tablet': {
            'letter-spacing': '-0.008rem',
            'line-height': '123.077%',
            'font-size': '0.813rem',
          },
          '@screen mobile': {
            'letter-spacing': '0',
            'line-height': '116.667%',
            'font-size': '0.75rem',
          },
        },
        '.pBoldLink': {
          'font-weight': theme('fontWeight.semibold'),
          'line-height': '100%',
          '@screen desktop': {
            'letter-spacing': '0',
            'font-size': theme('fontSize.base'),
          },
          '@screen tablet': {
            'letter-spacing': '0',
            'font-size': theme('fontSize.base'),
          },
          '@screen mobile': {
            'letter-spacing': '0.004375rem',
            'font-size': theme('fontSize.smbase'),
          },
        },
        '.label': {
          'line-height': '114.286%',
          'font-weight': theme('fontWeight.semibold'),
          '@screen desktop': {
            'letter-spacing': '0.02rem',
            'font-size': theme('fontSize.smbase'),
          },
          '@screen tablet': {
            'letter-spacing': '0.02rem',
            'font-size': theme('fontSize.smbase'),
          },
          '@screen mobile': {
            'line-height': '133.333%',
            'letter-spacing': '0.0225rem',
            'font-size': theme('fontSize.xs'),
          },
        },
      });

      addBase({
        'h1, h2, h3, h4, h5, .h1, .h2, .h3, .h4, .h5': {
          'font-weight': theme('fontWeight.normalMedium'),
        },
        '.h0': {
          'font-weight': theme('fontWeight.semibold'),
          'letter-spacing': '-0.1875rem',
          '@screen desktop': {
            'line-height': '116.667%',
            'font-size': theme('fontSize.14xl'),
          },
          '@screen tablet': {
            'letter-spacing': '-0.125rem',
            'line-height': '120%',
            'font-size': theme('fontSize.11xl'),
          },
          '@screen mobile': {
            'line-height': '115.385%',
            'font-size': theme('fontSize.6_5xl'),
          },
        },
        'h1, .h1': {
          'line-height': '90%',
          '@screen desktop': {
            'letter-spacing': '-0.15rem',
            'font-size': theme('fontSize.12xl'),
          },
          '@screen tablet': {
            'letter-spacing': '-0.125rem',
            'font-size': theme('fontSize.11xl'),
          },
          '@screen mobile': {
            'line-height': '91.667%',
            'letter-spacing': '-0.075rem',
            'font-size': theme('fontSize.6xl'),
          },
        },
        'h2, .h2': {
          'line-height': '100%',
          '@screen desktop': {
            'letter-spacing': '-0.1125rem',
            'font-size': theme('fontSize.10xl'),
          },
          '@screen tablet': {
            'letter-spacing': '-0.09375rem',
            'font-size': theme('fontSize.7xl'),
          },
          '@screen mobile': {
            'letter-spacing': '-0.0625rem',
            'font-size': theme('fontSize.5xl'),
          },
        },
        'h3, .h3': {
          '@screen desktop': {
            'letter-spacing': '-0.075rem',
            'line-height': '108%',
            'font-size': theme('fontSize.6xl'),
          },
          '@screen tablet': {
            'letter-spacing': '-0.06875rem',
            'line-height': '118.182%',
            'font-size': theme('fontSize.5_5xl'),
          },
          '@screen mobile': {
            'letter-spacing': '-0.04375rem',
            'line-height': '114.286%',
            'font-size': theme('fontSize.3xl'),
          },
        },
        'h4, .h4': {
          'line-height': '125%',
          '@screen desktop': {
            'letter-spacing': '-0.04rem',
            'font-size': theme('fontSize.4xl'),
          },
          '@screen tablet': {
            'letter-spacing': '-0.04rem',
            'font-size': theme('fontSize.4xl'),
          },
          '@screen mobile': {
            'line-height': '133.33%',
            'letter-spacing': '-0.03rem',
            'font-size': theme('fontSize.2xl'),
          },
        },
        'h5, .h5': {
          'line-height': '133.33%',
          '@screen desktop': {
            'letter-spacing': '-0.0375rem',
            'font-size': theme('fontSize.2xl'),
          },
          '@screen tablet': {
            'letter-spacing': '-0.0375rem',
            'font-size': theme('fontSize.2xl'),
          },
          '@screen mobile': {
            'letter-spacing': '-0.03125rem',
            'line-height': '140%',
            'font-size': theme('fontSize.lg'),
          },
        },
        'h6, .h6': {
          'line-height': '150%',
          'letter-spacing': '0',
          'font-weight': theme('fontWeight.bold'),
          '@screen desktop': {
            'font-size': theme('fontSize.lg'),
          },
          '@screen tablet': {
            'font-size': theme('fontSize.lg'),
          },
          '@screen mobile': {
            'line-height': '155.55%',
            'font-size': theme('fontSize.md'),
          },
        },
      });
    }),
  ],
};

export default config;
