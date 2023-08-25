import Uppy from '@uppy/core'
import Dashboard from '@uppy/dashboard'
import ImageEditor from '@uppy/image-editor'
import XHR from '@uppy/xhr-upload'

import '@uppy/core/dist/style.min.css'
import '@uppy/dashboard/dist/style.min.css'
import '@uppy/image-editor/dist/style.min.css'

export default () => ({
  uppy: null,

  init() {
    const csrf = this.$el.closest('form').querySelector('[name="_csrf"]').value ?? document.querySelector('meta[name="csrf-token"]').content
    this.uppy = new Uppy()
      .use(Dashboard, {
        inline: true,
        width: '100%',
        height: 'calc(100vh - 96px)',
        target: this.$el,
        showProgressDetails: true,
        theme: 'auto',
        locale: {
          strings: {
            poweredBy: '',
          },
        },
      })
      .use(ImageEditor, { target: Dashboard })
      .use(XHR, {
        endpoint: this.$el.dataset.endpoint,
        fieldName: this.$el.dataset.fieldName,
        headers: () => ({
          'X-CSRF-TOKEN': csrf,
        }),
      })
  },
})
