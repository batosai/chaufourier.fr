import Alpine from 'alpinejs'

import editor from '../modules/alpinejs/editor'
import uppy from '../modules/alpinejs/uppy'
import autocomplete from '../modules/alpinejs/autocomplete'

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
