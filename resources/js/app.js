import 'unpoly'

import 'unpoly/unpoly.css'
import '../css/app.css'

import Alpine from 'alpinejs'

up.log.enable()

up.link.config.followSelectors.push('a[href]')
up.form.config.submitSelectors.push(['form'])
up.feedback.config.currentClasses.push(['active'])
up.feedback.config.navSelectors.push(['nav'])

up.layer.config.drawer.size = 'large'
up.layer.config.drawer.position = 'right'

Alpine.start()

window.getTopPosition = (el) => el.offsetTop + (el.offsetParent && getTopPosition(el.offsetParent))
window.getLeftPosition = (el) =>
  el.offsetLeft + (el.offsetParent && getLeftPosition(el.offsetParent))

window.getBottomPosition = (el) => getTopPosition(el) + el.offsetHeight
window.getRightPosition = (el) => getLeftPosition(el) + el.offsetWidth
