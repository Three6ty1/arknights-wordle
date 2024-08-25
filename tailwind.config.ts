import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      animation: {
        flip: 'flip 0.75s ease-out forwards',
        win: 'win 2.5s linear forwards',
        'slow-spin': 'spin 4s linear infinite',
        shake: 'shake 0.2s ease-out forwards',
        appear: 'appear 3s linear forwards'
      },
      fontFamily: {
        sans: ['Azbuka W01 Condensed', ...fontFamily.sans],
      },
      colors: {
        incorrect: 'var(--color-incorrect)',
        higher: 'var(--color-higher)',
        lower: 'var(--color-lower)',
        half: 'var(--color-half)',
        correct: 'var(--color-correct)',
      },
    },
  },
  daisyui: {
    themes: [{
      "light": {
        ...require("daisyui/src/theming/themes")["light"],
        "base-200": "#edeeee",
        "success": "#6BBF59",
        "info": "#009E73",
      }},
      {'dark': {
        ...require("daisyui/src/theming/themes")["dark"],
        "base-content": "white",
        "neutral-content": "white",
        "primary-content": "white",
        "secondary-content": "white",
        "base-100": "#15191e",
        "base-200": "black",
        "success": "#6BBF59",
        "info": "#009E73",
      }}
    ]
    
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
} satisfies Config;
