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
        // Was 70s linear. Felt sluggish on mobile per user feedback
        // 2026-05-22. 35s reads as 'paced' on desktop while feeling alive
        // on phones where the visible window is smaller and the eye reads
        // each label faster.
        marquee: 'marquee 35s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
