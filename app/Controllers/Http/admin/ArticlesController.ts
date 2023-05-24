import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Route from '@ioc:Adonis/Core/Route'
import Event from '@ioc:Adonis/Core/Event'
import Article from 'App/Models/Article'
import ArticleSessionFilterService from 'App/Services/ArticleSessionFilterService'
import ArticleValidator from 'App/Validators/admin/ArticleValidator'

export default class ArticlesController {
  public async index(ctx: HttpContextContract) {
    const { view, bouncer } = ctx
    await bouncer.with('ArticlePolicy').authorize('viewList')

    const limit = 10
    const { page = 1, ...payload } = await ArticleSessionFilterService.handle(ctx)

    const articles = await Article.filter(payload).paginate(page, limit)
    articles.baseUrl(Route.builder().make('admin.articles.index'))
    articles.queryString(payload)

    return view.render('admin/articles/index', {
      articles,
    })
  }

  public async create({ view, bouncer }: HttpContextContract) {
    await bouncer.with('ArticlePolicy').authorize('create')
    return view.render('admin/articles/create')
  }

  public async store({ request, response, bouncer, session, i18n, auth, up }: HttpContextContract) {
    await bouncer.with('ArticlePolicy').authorize('create')

    const payload = await request.validate(ArticleValidator)

    const article = new Article()
    await article.fill(payload)
    article.userId = auth.user!.id
    await article.save()

    Event.emit('audit:new', {
      label: `Create article ${article!.title}`,
      username: auth.user!.fullname,
      userId: auth.user!.id,
      action: 'CREATE',
      target: 'ARTICLE',
      targetId: article.id,
      payload: article.serialize(),
    })

    session.flash('success.message', i18n.formatMessage('form.success.article.create'))

    if (up.getMode() === 'drawer') {
      up.setDismissLayer('{}')
    } else {
      response.redirect().toRoute('admin.articles.index')
    }
  }

  public async edit({ request, view, bouncer }: HttpContextContract) {
    const article = await Article.findOrFail(request.param('id'))
    await bouncer.with('ArticlePolicy').authorize('update')

    return view.render('admin/articles/edit', {
      article,
    })
  }

  public async update(ctx: HttpContextContract) {
    const { request, response, auth, bouncer, session, i18n, up } = ctx
    const article = await Article.findOrFail(request.param('id'))

    await bouncer.with('ArticlePolicy').authorize('update')

    const payload = await request.validate(ArticleValidator)

    await article.merge(payload)

    const dirty = article.$dirty
    await article.save()

    Event.emit('audit:new', {
      label: `Update article ${article!.title}`,
      username: auth.user!.fullname,
      userId: auth.user!.id,
      action: 'UPDATE',
      target: 'ARTICLE',
      targetId: article.id,
      payload: dirty,
    })

    session.flash('success.message', i18n.formatMessage('form.success.article.edit'))

    if (up.getMode() === 'drawer') {
      up.setDismissLayer('{}')
    } else {
      response.redirect().toRoute('admin.articles.index')
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
    const article = await Article.findOrFail(id)
    await bouncer.with('ArticlePolicy').authorize('delete')
    const payload = article.serialize()
    const title = article!.title
    await article.delete()

    Event.emit('audit:new', {
      label: `Delete article ${title}`,
      username: auth.user!.fullname,
      userId: auth.user!.id,
      action: 'DELETE',
      target: 'ARTICLE',
      targetId: id,
      payload,
    })

    session.flash('success.message', i18n.formatMessage('form.success.article.delete'))

    if (up.getMode() === 'drawer') {
      up.setDismissLayer('{}')
    } else {
      response.redirect().toRoute('admin.articles.index')
    }
  }
}