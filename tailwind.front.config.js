const edgeComponent = require('@jrmc/edge-components/build/tailwind.config').default
const emerald = require('daisyui/src/theming/themes')['emerald']
const dracula = require('daisyui/src/theming/themes')['dracula']

module.exports = {
  content: [
    './resources/views/errors/**/*.edge',
    './resources/views/layouts/front.edge',
    './resources/views/front/**/*.edge',
    './resources/views/components/front/**/*.edge',
  ],
  plugins: [
    require('tailwindcss-safe-area'),
    require('@tailwindcss/typography')({
      modifiers: [],
    }),
    ...edgeComponent.plugins,
  ],
  daisyui: {
    themes: [
      { emerald },
      {
        dracula: {
          ...dracula,
          primary: dracula.accent,
          accent: dracula.primary,
        },
      },
    ],
    darkTheme: 'dracula',
  },
}
