
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Route from '@ioc:Adonis/Core/Route'
import Media from 'App/Models/Media'

export default class MediaPickerController {
  public async index(ctx: HttpContextContract) {
    const { view, bouncer, request } = ctx
    await bouncer.with('MediaPolicy').authorize('viewList')

    const limit = 24
    const page = request.input('page', 1)

    const media = await Media.query().orderBy('createdAt', 'desc').paginate(page, limit)
    media.baseUrl(Route.builder().make('admin.media.index'))

    return view.render('admin/mediapicker/index', {
      media,
    })
  }

  public async store(ctx: HttpContextContract) {

  }
}
