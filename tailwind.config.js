const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        xs: '360px',
        sm: '480px',
        md: '768px',
        lg: '1024px',
        xl: '1400px',
        xxl: '1600px',
      },
    },
    colors: {
      blue: {
        100: '#E4EDFE',
        200: '#AEC8FB',
        300: '#78A4F9',
        400: '#417FF6',
        500: '#0B5BF4',
        600: '#0947BD',
        700: '#063287',
        800: '#041E51',
        900: '#08152D',
      },
      gray: {
        100: '#F0F0FF',
        200: '#CECFDD',
        300: '#B7B9C6',
        400: '#868893',
        500: '#575A63',
        600: '#32363D',
        700: '#23272F',
        800: '#171C23',
        900: '#10151B',
      },
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      serif: ['SourceSerifPro', 'Times New Roman', 'serif'],
      heading: ['Unbounded', 'sans'],
    },
    borderRadius: {
      lg: 'var(--radius)',
      md: 'calc(var(--radius) - 2px)',
      sm: 'calc(var(--radius) - 4px)',
      full: '9999px',
    },
    boxShadow: {
      DEFAULT:
        '-1px 1px 6px 0px rgba(61, 64, 82, 0.09), -4px 4px 18px 0px rgba(61, 64, 82, 0.14), -16px 16px 80px 0px rgba(61, 64, 82, 0.23);',
      button: '0px 3px 10px 0px #0B5BF4',
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        white: 'hsl(240 100% 97%)',
        black: 'hsl(213 26% 8%)',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        xl: '1rem',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.icon': {
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          maskPosition: 'center',
          maskRepeat: 'no-repeat',
          maskSize: 'contain',
        },
      };

      addUtilities(newUtilities);
    }),
    require('tailwindcss-animate'),
  ],
};
