import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Route from '@ioc:Adonis/Core/Route'
import Event from '@ioc:Adonis/Core/Event'
import Tag from 'App/Models/Tag'
import TagSessionFilterService from 'App/Services/TagSessionFilterService'
import TagValidator from 'App/Validators/admin/TagValidator'

export default class TagsController {
  public async index(ctx: HttpContextContract) {
    const { view, bouncer } = ctx
    await bouncer.with('TagPolicy').authorize('viewList')

    const limit = 10
    const { page = 1, ...payload } = await TagSessionFilterService.handle(ctx)

    const tags = await Tag.filter(payload).paginate(page, limit)
    tags.baseUrl(Route.builder().make('admin.tags.index'))
    tags.queryString(payload)

    return view.render('admin/tags/index', {
      tags,
    })
  }

  public async create({ view, bouncer }: HttpContextContract) {
    await bouncer.with('TagPolicy').authorize('create')
    return view.render('admin/tags/create')
  }

  public async store({ request, response, bouncer, session, i18n, auth, up }: HttpContextContract) {
    await bouncer.with('TagPolicy').authorize('create')

    const payload = await request.validate(TagValidator)

    const tag = new Tag()
    await tag.fill(payload)
    await tag.save()

    Event.emit('audit:new', {
      label: `Create tag ${tag!.name}`,
      username: auth.user!.fullname,
      userId: auth.user!.id,
      action: 'CREATE',
      target: 'TAG',
      targetId: tag.id,
      payload: tag.serialize(),
    })

    session.flash('success.message', i18n.formatMessage('form.success.tag.create'))

    if (up.getMode() === 'drawer') {
      up.setDismissLayer('{}')
    } else {
      response.redirect().toRoute('admin.tags.index')
    }
  }

  public async edit({ request, view, bouncer }: HttpContextContract) {
    const tag = await Tag.findOrFail(request.param('id'))
    await bouncer.with('TagPolicy').authorize('update')

    return view.render('admin/tags/edit', {
      tag,
    })
  }

  public async update(ctx: HttpContextContract) {
    const { request, response, auth, bouncer, session, i18n, up } = ctx
    const tag = await Tag.findOrFail(request.param('id'))

    await bouncer.with('TagPolicy').authorize('update')

    const payload = await request.validate(new TagValidator(ctx, tag))

    await tag.merge(payload)

    const dirty = tag.$dirty
    await tag.save()

    Event.emit('audit:new', {
      label: `Update tag ${tag!.name}`,
      username: auth.user!.fullname,
      userId: auth.user!.id,
      action: 'UPDATE',
      target: 'TAG',
      targetId: tag.id,
      payload: dirty,
    })

    session.flash('success.message', i18n.formatMessage('form.success.tag.edit'))

    if (up.getMode() === 'drawer') {
      up.setDismissLayer('{}')
    } else {
      response.redirect().toRoute('admin.tags.index')
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
    const tag = await Tag.findOrFail(id)
    await bouncer.with('TagPolicy').authorize('delete')
    const payload = tag.serialize()
    const name = tag!.name
    await tag.delete()

    Event.emit('audit:new', {
      label: `Delete tag ${name}`,
      username: auth.user!.fullname,
      userId: auth.user!.id,
      action: 'DELETE',
      target: 'TAG',
      targetId: id,
      payload,
    })

    session.flash('success.message', i18n.formatMessage('form.success.tag.delete'))

    if (up.getMode() === 'drawer') {
      up.setDismissLayer('{}')
    } else {
      response.redirect().toRoute('admin.tags.index')
    }
  }
}
