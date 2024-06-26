import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Route from '@ioc:Adonis/Core/Route'
import Media from 'App/Models/Media'

export default class MediaPickerController {
  public async index(ctx: HttpContextContract) {
    const { view, bouncer, request } = ctx
    await bouncer.with('MediaPolicy').authorize('viewList')

    const limit = 24
    const page = request.input('page', 1)
    const type = request.input('types', [])
    const inputName = request.input('name', 'mediaId')

    const media = await Media.query()
      .filter({ type })
      .orderBy('createdAt', 'desc')
      .paginate(page, limit)
    media.baseUrl(Route.builder().make('admin.media.index'))

    return view.render('admin/mediapicker/index', {
      media,
      inputName,
    })
  }

  public async create({ view, bouncer }: HttpContextContract) {
    await bouncer.with('MediaPolicy').authorize('create')
    return view.render('admin/mediapicker/create')
  }

  public async show({ request, view, bouncer }: HttpContextContract) {
    const media = await Media.findOrFail(request.param('id'))
    await bouncer.with('MediaPolicy').authorize('show', media)
    return view.render('admin/mediapicker/show', {
      media,
    })
  }
}
