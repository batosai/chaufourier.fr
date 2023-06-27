import { Attachment } from '@ioc:Adonis/Addons/AttachmentAdvanced'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Media from 'App/Models/Media'

export default class MediaController {
  public async index({ view, bouncer }: HttpContextContract) {
    await bouncer.with('MediaPolicy').authorize('viewList')
    return view.render('admin/media/index')
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
