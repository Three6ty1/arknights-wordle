import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      animation: {
        flip: 'flip 1s ease-out forwards',
        win: 'win 2.5s linear forwards',
        'fade-in-out': 'fade-in-out 3s linear forwards',
        'fade-in': 'fade-in 2s linear forwards',
        'slow-spin': 'spin 4s linear infinite'
      },
      fontFamily: {
        sans: ['Azbuka W01 Condensed', ...fontFamily.sans],
      },
      colors: {
        incorrect: '#919090',
        higher: '#08aadd',
        lower: '#c80000',
        half: '#FFAC1C',
        correct: '#6BBF59',
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
    require('react-chartkick')
  ],
} satisfies Config;
