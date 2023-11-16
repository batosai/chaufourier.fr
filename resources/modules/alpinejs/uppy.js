import Uppy from '@uppy/core'
import Dashboard from '@uppy/dashboard'
// import DragDrop from '@uppy/drag-drop'
// import StatusBar from '@uppy/status-bar'
import ImageEditor from '@uppy/image-editor'
import XHR from '@uppy/xhr-upload'

import '@uppy/core/dist/style.min.css'
import '@uppy/dashboard/dist/style.min.css'
import '@uppy/image-editor/dist/style.min.css'
// import '@uppy/drag-drop/dist/style.min.css'
// import '@uppy/status-bar/dist/style.min.css'

export default () => ({
  uppy: null,

  init() {
    const csrf = document.querySelector('meta[name="csrf-token"]').content
    this.uppy = new Uppy()
    // .use(DragDrop, { target: this.$el })
    // .use(StatusBar, {
    //   target: this.$el,
    //   hideAfterFinish: false,
    //   showProgressDetails: true
    // })
      .use(Dashboard, {
        inline: true,
        width: '100%',
        // height: 'calc(100vh - 96px)',
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

      this.uppy.on("complete", (result) => {
        if (result.failed.length === 0) {
          // console.log("Upload successful üòÄ")
          up.layer.current.dismiss()
        } else {
          // console.warn("Upload failed üòû")
        }
        // console.log("successful files:", result.successful)
        // console.log("failed files:", result.failed)
      })
  },
})
