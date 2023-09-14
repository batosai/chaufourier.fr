import 'unpoly'

import 'unpoly/unpoly.css'

// Unpoly

if (document.querySelector('meta[name="mode"]')) {
  up.log.enable()
}

up.fragment.config.mainTargets.push('.toasts')
up.link.config.followSelectors.push('a[href]')
up.form.config.submitSelectors.push(['form'])
up.feedback.config.currentClasses.push(['active'])
up.feedback.config.navSelectors.push(['nav'])

up.layer.config.drawer.size = 'large'
up.layer.config.drawer.position = 'right'

// after drawer closed, refresh toast for flashmessage
up.on('up:layer:dismissed', function (event) {
  up.reload('.toasts')
})

up.on('up:fragment:loaded', (event) => {
  const location = event.response.header('X-Up-Location')
  const fullReload = event.response.header('X-Full-Reload')

  const pattern = /name='csrf-token'\scontent='(.+?)'/
  const matches = event.response.text.match(pattern)
  console.info(matches[1])
  if (matches) {
    document.querySelector('meta[name="csrf-token"]').setAttribute('content', matches[1])
  }

  if (fullReload) {
    // Prevent the fragment update and don't update browser history
    event.preventDefault()
    // Make a full page load for the same request.
    // event.request.loadPage()
    // window.location.reload()
    window.location.href = location
  }
})

// override unpoly up-confirm, add custom modal
window.upConfirmCompiler = () => {
  up.compiler('[up-confirm]', function (element) {
    up.on(element, 'click', (event, element) => {
      event.preventDefault()
      up.confirm(element)
    })
  })
}
upConfirmCompiler()

up.confirm = function (element) {
  const message = element.getAttribute('up-confirm')
  const method = element.getAttribute('up-method') ?? 'GET'
  const colorButton = element.dataset.colorButton ?? 'btn-primary'

  const dialog = up.element.createFromHTML(`
    <div class="modal modal-open z-2000" x-data="{}" @keyup.escape.window="$el.remove()">
      <div class="modal-box" @click.outside="open = false">
          <h3 class="font-bold text-lg">${message}</h3>

          <div class="modal-action">
              <button @click="$root.remove()" class="btn btn-ghost">
                  cancel
              </button>

              <button class="btn ${colorButton}" @click="up.navigate({ target: 'main', url: '${element.getAttribute(
    'href'
  )}', method: '${method}' }); $root.remove()">
                  ok
              </button>
          </div>
      </div>
    </div>`)

  document.querySelector('body').append(dialog)
}
