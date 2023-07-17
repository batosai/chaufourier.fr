const edgeComponent = require('@jrmc/edge-components/build/tailwind.config').default
const dark = require('daisyui/src/theming/themes')['[data-theme=dark]']

module.exports = {
  mode: 'jit',
  content: ['./resources/views/**/*.edge', ...edgeComponent.content],
  plugins: [...edgeComponent.plugins, require('@tailwindcss/typography'), require('tailwindcss-safe-area')],
  daisyui: {
    themes: [
      {
        dark: {
          ...dark,
          primary: dark.accent,
          accent: dark.primary,
        },
      },
    ],
  },
}
