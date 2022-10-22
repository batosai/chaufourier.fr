/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import View from '@ioc:Adonis/Core/View'
import jrmc from '@jrmc/edge-components'
import { edgeIconify, addCollection } from 'edge-iconify'
import { icons as akarIcons } from '@iconify-json/akar-icons'
import { icons as faIcons } from '@iconify-json/fa-solid'

addCollection(akarIcons)
addCollection(faIcons)

View.use(jrmc)
View.use(edgeIconify)

View.getRenderer()
