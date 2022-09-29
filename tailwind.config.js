const edgeComponent = require('@jrmc/edge-components/build/tailwind.config').default

module.exports = {
  mode: 'jit',
  content: ['./resources/views/**/*.edge', ...edgeComponent.content],
  plugins: [...edgeComponent.plugins],
}
