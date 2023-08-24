import { Attachment } from '@ioc:Adonis/Addons/AttachmentAdvanced'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Route from '@ioc:Adonis/Core/Route'
import Event from '@ioc:Adonis/Core/Event'
import Media from 'App/Models/Media'
import MediaSessionFilterService from 'App/Services/MediaSessionFilterService'
import MediaDataValidator from 'App/Validators/admin/MediaDataValidator'
import MediaValidator from 'App/Validators/admin/MediaValidator'
import Application from '@ioc:Adonis/Core/Application'

export default class MediaController {
  public async index(ctx: HttpContextContract) {
    const { view, bouncer } = ctx
    await bouncer.with('MediaPolicy').authorize('viewList')

    const limit = 24
    const { page = 1, ...payload } = await MediaSessionFilterService.handle(ctx)

    const media = await Media.filter(payload).orderBy('createdAt', 'desc').paginate(page, limit)
    media.baseUrl(Route.builder().make('admin.media.index'))
    media.queryString(payload)

    return view.render('admin/media/index', {
      media,
    })
  }

  public async show({ request, view, bouncer }: HttpContextContract) {
    const media = await Media.findOrFail(request.param('id'))
    await media.load('user')
    await bouncer.with('MediaPolicy').authorize('show', media)
    return view.render('admin/media/show', {
      media,
    })
  }

  public async create({ view, bouncer }: HttpContextContract) {
    await bouncer.with('MediaPolicy').authorize('create')
    return view.render('admin/media/create')
  }

  public async store({ request, response, bouncer, auth }: HttpContextContract) {
    await bouncer.with('MediaPolicy').authorize('create')
    const file = request.file('file')!

    await request.validate(MediaValidator)

    const media = new Media()
    media.file = Attachment.fromFile(file)
    media.type = media.file.mimeType
    media.title = file.clientName
    media.userId = auth.user!.id
    await media.save()

    Event.emit('audit:new', {
      label: `Create media ${media!.title}`,
      username: auth.user!.fullname,
      userId: auth.user!.id,
      action: 'CREATE',
      target: 'MEDIA',
      targetId: media.id,
      payload: media.serialize(),
    })

    response.type('json')
  }

  public async edit({ request, view, bouncer }: HttpContextContract) {
    const media = await Media.findOrFail(request.param('id'))
    await bouncer.with('MediaPolicy').authorize('update', media)

    return view.render('admin/media/edit', {
      media,
    })
  }

  public async update(ctx: HttpContextContract) {
    const { request, response, auth, bouncer, session, i18n, up } = ctx
    const media = await Media.findOrFail(request.param('id'))

    await bouncer.with('MediaPolicy').authorize('update', media)

    const payload = await request.validate(MediaDataValidator)

    await media.merge(payload)

    const dirty = media.$dirty
    const original = media.$original
    await media.save()

    Event.emit('audit:new', {
      label: `Update media ${original!.title}`,
      username: auth.user!.fullname,
      userId: auth.user!.id,
      action: 'UPDATE',
      target: 'MEDIA',
      targetId: media.id,
      payload: dirty,
    })

    session.flash('success.message', i18n.formatMessage('form.success.media.edit'))

    if (up.getMode() === 'modal') {
      up.setDismissLayer('{}')
    } else {
      response.redirect().toRoute('admin.media.index')
    }
  }

  public async destroy({
    params,
    response,
    bouncer,
    session,
    i18n,
    auth,
    up,
  }: HttpContextContract) {
    const { id } = params
    const media = await Media.findOrFail(id)
    await bouncer.with('MediaPolicy').authorize('delete', media)
    const payload = media.serialize()
    const title = media!.title
    await media.delete()

    Event.emit('audit:new', {
      label: `Delete media ${title}`,
      username: auth.user!.fullname,
      userId: auth.user!.id,
      action: 'DELETE',
      target: 'MEDIA',
      targetId: id,
      payload,
    })

    session.flash('success.message', i18n.formatMessage('form.success.media.delete'))

    if (up.getMode() === 'drawer') {
      up.setDismissLayer('{}')
    } else {
      response.redirect().toRoute('admin.media.index')
    }
  }

  public async download({ params, response, bouncer }: HttpContextContract) {
    const { id } = params
    const media = await Media.findOrFail(id)
    await bouncer.with('MediaPolicy').authorize('show', media)

    const filePath = Application.tmpPath(`uploads/${media.file.name}`)

    response.attachment(filePath, 'foo.jpg')

    // response.download(filePath, true, (error) => {
    //   if (error.code === 'ENOENT') {
    //     return ['File does not exists', 404]
    //   }

    //   return ['Cannot download file', 400]
    // })
  }
}
