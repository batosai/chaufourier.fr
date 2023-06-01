const edgeComponent = require('@jrmc/edge-components/build/tailwind.config').default
const dark = require('daisyui/src/colors/themes')['[data-theme=dark]']

module.exports = {
  mode: 'jit',
  content: ['./resources/views/**/*.edge', ...edgeComponent.content],
  plugins: [...edgeComponent.plugins, require('@tailwindcss/typography')],
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
