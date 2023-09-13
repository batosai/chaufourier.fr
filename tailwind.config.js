const edgeComponent = require('@jrmc/edge-components/build/tailwind.config').default
const light = require('daisyui/src/theming/themes')['[data-theme=light]']
const dark = require('daisyui/src/theming/themes')['[data-theme=dark]']

module.exports = {
  mode: 'jit',
  content: ['./resources/views/**/*.edge', ...edgeComponent.content],
  plugins: [
    ...edgeComponent.plugins,
    require('@tailwindcss/typography'),
    require('tailwindcss-safe-area'),
    require('@tailwindcss/aspect-ratio'),
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...light,
          primary: light.accent,
          accent: light.primary,
        },
      },
      {
        dark: {
          ...dark,
          primary: dark.accent,
          accent: dark.primary,
        },
      },
    ],
    darkTheme: 'dark',
  },
}
