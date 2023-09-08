import Alpine from 'alpinejs'

import editor from './editor'
import uppy from './uppy'
import autocomplete from './autocomplete'

// Alpine

Alpine.data('editor', editor)
Alpine.data('uploader', uppy)
Alpine.data('autocomplete', autocomplete)

Alpine.start()

// window.getTopPosition = (el) => el.offsetTop + (el.offsetParent && getTopPosition(el.offsetParent))
// window.getLeftPosition = (el) =>
//   el.offsetLeft + (el.offsetParent && getLeftPosition(el.offsetParent))

// window.getBottomPosition = (el) => getTopPosition(el) + el.offsetHeight
// window.getRightPosition = (el) => getLeftPosition(el) + el.offsetWidth
