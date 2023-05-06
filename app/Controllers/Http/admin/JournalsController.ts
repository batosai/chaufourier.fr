import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Route from '@ioc:Adonis/Core/Route'
import Audit from 'App/Models/Audit'

export default class JournalsController {
  public async index({ view, bouncer, request }: HttpContextContract) {
    await bouncer.with('AuditPolicy').authorize('viewList')

    const page = request.input('page', 1)
    const limit = 10

    const audits = await Audit.query().orderBy('createdAt', 'desc').paginate(page, limit)
    audits.baseUrl(Route.builder().make('admin.journals.index'))

    return view.render('admin/journals/index', {
      audits,
    })
  }

  public async show({ view, bouncer, request }: HttpContextContract) {
    await bouncer.with('AuditPolicy').authorize('show')

    const audit = await Audit.findOrFail(request.param('id'))

    return view.render('admin/journals/show', {
      audit,
    })
  }
}
