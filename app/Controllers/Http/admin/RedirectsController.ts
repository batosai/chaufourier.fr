import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Route from '@ioc:Adonis/Core/Route'
import Event from '@ioc:Adonis/Core/Event'
import RedirectSessionFilterService from 'App/Services/RedirectSessionFilterService'
import RedirectValidator from 'App/Validators/admin/RedirectValidator'
import Redirect from 'App/Models/Redirect'

export default class RedirectsController {
  public async index(ctx: HttpContextContract) {
    const { view, bouncer } = ctx
    await bouncer.with('RedirectPolicy').authorize('viewList')

    const limit = 10
    const { page = 1, ...payload } = await RedirectSessionFilterService.handle(ctx)

    const redirects = await Redirect.filter(payload)
      .orderBy('createdAt', 'desc')
      .paginate(page, limit)
    redirects.baseUrl(Route.builder().make('admin.redirects.index'))
    redirects.queryString(payload)

    return view.render('admin/redirects/index', { redirects })
  }

  public async create({ view, bouncer }: HttpContextContract) {
    await bouncer.with('RedirectPolicy').authorize('create')
    return view.render('admin/redirects/create')
  }

  public async store({ request, response, bouncer, session, i18n, auth, up }: HttpContextContract) {
    await bouncer.with('RedirectPolicy').authorize('create')

    const payload = await request.validate(RedirectValidator)

    const redirect = new Redirect()
    await redirect.fill(payload)
    await redirect.save()

    Event.emit('audit:new', {
      label: `Create redirect ${redirect!.source} in ${redirect!.destination}`,
      username: auth.user!.fullname,
      userId: auth.user!.id,
      action: 'CREATE',
      target: 'REDIRECT',
      targetId: redirect.id,
      payload: redirect.serialize(),
    })

    session.flash('success.message', i18n.formatMessage('form.success.redirect.create'))

    if (up.getMode() === 'drawer') {
      up.setDismissLayer('{}')
    } else {
      response.redirect().toRoute('admin.redirects.index')
    }
  }

  public async edit({ request, view, bouncer }: HttpContextContract) {
    const redirect = await Redirect.findOrFail(request.param('id'))
    await bouncer.with('RedirectPolicy').authorize('update')

    return view.render('admin/redirects/edit', {
      redirect,
    })
  }

  public async update(ctx: HttpContextContract) {
    const { request, response, auth, bouncer, session, i18n, up } = ctx
    const redirect = await Redirect.findOrFail(request.param('id'))

    await bouncer.with('RedirectPolicy').authorize('update')

    const payload = await request.validate(RedirectValidator)

    await redirect.merge(payload)

    const dirty = redirect.$dirty
    const original = redirect.$original
    await redirect.save()

    Event.emit('audit:new', {
      label: `Update redirect ${original!.source} in ${original!.destination}`,
      username: auth.user!.fullname,
      userId: auth.user!.id,
      action: 'UPDATE',
      target: 'REDIRECT',
      targetId: redirect.id,
      payload: dirty,
    })

    session.flash('success.message', i18n.formatMessage('form.success.redirect.edit'))

    if (up.getMode() === 'drawer') {
      up.setDismissLayer('{}')
    } else {
      response.redirect().toRoute('admin.redirects.index')
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
    const redirect = await Redirect.findOrFail(id)
    await bouncer.with('TagPolicy').authorize('delete')
    const payload = redirect.serialize()
    const name = `${redirect!.source} in ${redirect!.destination}`
    await redirect.delete()

    Event.emit('audit:new', {
      label: `Delete redirect ${name}`,
      username: auth.user!.fullname,
      userId: auth.user!.id,
      action: 'DELETE',
      target: 'REDIRECT',
      targetId: id,
      payload,
    })

    session.flash('success.message', i18n.formatMessage('form.success.redirect.delete'))

    if (up.getMode() === 'drawer') {
      up.setDismissLayer('{}')
    } else {
      response.redirect().toRoute('admin.redirects.index')
    }
  }
}
