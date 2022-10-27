import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Route from '@ioc:Adonis/Core/Route'
import User from 'App/Models/User'

export default class DashboardController {
  public async index({ request, view, bouncer }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('viewList')

    const { page = 1, ...input } = request.qs()
    const limit = 10

    const users = await User.filter(input).paginate(page, limit)
    users.baseUrl(Route.builder().make('admin.users.index'))

    return view.render('admin/users/index', {
      users,
    })
  }
}
