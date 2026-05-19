import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        linen:        '#F2EFE9',
        'linen-warm': '#EDE8DF',
        'linen-cool': '#E8E4DC',
        sage:         '#567360',
        'sage-deep':  '#3F5648',
        walnut:       '#85532D',
        'walnut-deep':'#6B3F1F',
        camel:        '#D79F70',
        burnished:    '#B07B4E',
        forest:       '#274034',
        lichen:       '#8AA699',
        heather:      '#D9C7B8',
        flatiron:     '#9B5236',
        espresso:     '#2B1810',
        onyx:         '#0D0D0D',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        body:    ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        caps: '0.18em',
        capsTight: '0.12em',
      },
      maxWidth: {
        site: '1280px',
        prose: '65ch',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 70s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
