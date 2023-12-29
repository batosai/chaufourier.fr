import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from '@ioc:Adonis/Core/Event'
import Article from 'App/Models/Article'
import ArticleSeoValidator from 'App/Validators/admin/ArticleSeoValidator'
import Seo from 'App/Models/Seo'

export default class ArticleSeoController {
  public async create({ request, view, bouncer }: HttpContextContract) {
    const article = await Article.findOrFail(request.param('article_id'))
    await bouncer.with('ArticlePolicy').authorize('seo', article)
    return view.render('admin/articles/seo/create', { article })
  }

  public async store({ request, response, bouncer, session, i18n, auth, up }: HttpContextContract) {
    const article = await Article.findOrFail(request.param('article_id'))
    await bouncer.with('ArticlePolicy').authorize('seo', article)

    const payload = await request.validate(ArticleSeoValidator)

    const seo = await article.related('seo').create(payload)

    Event.emit('audit:new', {
      label: `Create seo ${seo!.title}`,
      username: auth.user!.fullname,
      userId: auth.user!.id,
      action: 'CREATE',
      target: 'SEO',
      targetId: seo.id,
      payload: seo.serialize(),
    })

    session.flash('success.message', i18n.formatMessage('form.success.article.seo.edit'))

    if (up.getMode() === 'drawer') {
      up.setDismissLayer('{}')
    } else {
      response.redirect().toRoute('admin.articles.edit', article)
    }
  }

  public async edit({ request, view, bouncer }: HttpContextContract) {
    const article = await Article.findOrFail(request.param('article_id'))
    await bouncer.with('ArticlePolicy').authorize('seo', article)

    const seo = await Seo.findOrFail(request.param('id'))
    await seo.load('image')

    return view.render('admin/articles/seo/edit', {
      article,
      seo,
    })
  }

  public async update(ctx: HttpContextContract) {
    const { request, response, auth, bouncer, session, i18n, up } = ctx
    const article = await Article.findOrFail(request.param('article_id'))

    await bouncer.with('ArticlePolicy').authorize('seo', article)

    const seo = await Seo.findOrFail(request.param('id'))

    const payload = await request.validate(ArticleSeoValidator)

    await seo.merge(payload)

    if (!payload.imageId) {
      seo.imageId = null
    }

    const dirty = seo.$dirty
    const original = seo.$original
    await seo.save()

    Event.emit('audit:new', {
      label: `Update seo ${original!.title}`,
      username: auth.user!.fullname,
      userId: auth.user!.id,
      action: 'UPDATE',
      target: 'SEO',
      targetId: seo.id,
      payload: dirty,
    })

    session.flash('success.message', i18n.formatMessage('form.success.article.seo.edit'))

    if (up.getMode() === 'drawer') {
      up.setDismissLayer('{}')
    } else {
      response.redirect().toRoute('admin.articles.edit', article)
    }
  }
}
