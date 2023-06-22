import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cache from '@ioc:Adonis/Addons/Cache'

export default class CachesController {
  public async destroy({ response, request, bouncer, session, i18n }: HttpContextContract) {
    await bouncer.with('CachePolicy').authorize('clear')

    const { keys = [] } = request.qs()

    if (keys.length) {
      await Cache.forgetMultiple(keys)
    } else {
      await Cache.clear()
    }

    session.flash('success.message', i18n.formatMessage('form.success.cache.clear'))

    response.redirect().back()
  }
}
