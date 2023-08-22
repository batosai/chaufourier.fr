import { Attachment } from '@ioc:Adonis/Addons/AttachmentAdvanced'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Route from '@ioc:Adonis/Core/Route'
import Media from 'App/Models/Media'
import MediaSessionFilterService from 'App/Services/MediaSessionFilterService'

export default class MediaController {
  public async index(ctx: HttpContextContract) {
    const { view, bouncer } = ctx
    await bouncer.with('MediaPolicy').authorize('viewList')

    const limit = 10
    const { page = 1, ...payload } = await MediaSessionFilterService.handle(ctx)

    const media = await Media.filter(payload).paginate(page, limit)
    media.baseUrl(Route.builder().make('admin.users.index'))
    media.queryString(payload)

    return view.render('admin/media/index', {
      media
    })
  }

  public async show({ request, view, bouncer }: HttpContextContract) {
    const media = await Media.findOrFail(request.param('id'))
    await media.load('user')
    // await bouncer.with('MediaPolicy').authorize('show')
    return view.render('admin/media/show', {
      media
    })
  }

  public async create({ view, bouncer }: HttpContextContract) {
    await bouncer.with('MediaPolicy').authorize('create')
    return view.render('admin/media/create')
  }

  public async store({ request, response, bouncer, auth }: HttpContextContract) {
    await bouncer.with('MediaPolicy').authorize('create')
    const file = request.file('file')!

    const media = new Media()
    media.file = Attachment.fromFile(file)
    media.type = media.file.mimeType
    media.userId = auth.user!.id
    await media.save()

    response.type('json')
  }
}
