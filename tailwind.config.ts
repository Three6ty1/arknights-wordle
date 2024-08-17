import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      animation: {
        flip: 'flip 0.75s ease-out forwards',
        win: 'win 2.5s linear forwards',
        'slow-spin': 'spin 4s linear infinite'
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
        "base-200": "#edeeee"
      }},
      {'dark': {
        ...require("daisyui/src/theming/themes")["dark"],
        "base-content": "white",
        "neutral-content": "white",
        "primary-content": "white",
        "secondary-content": "white",
        "base-100": "#15191e",
        "base-200": "black",
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
