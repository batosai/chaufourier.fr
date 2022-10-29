import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Route from '@ioc:Adonis/Core/Route'
import User from 'App/Models/User'
import UserSessionFilterService from 'App/Services/UsersSessionFilterService'

export default class DashboardController {
  public async index(ctx: HttpContextContract) {
    const { request, view, bouncer } = ctx
    await bouncer.with('UserPolicy').authorize('viewList')

    const limit = 10
    const { page = 1 } = request.qs()
    const payload = await UserSessionFilterService.handle(ctx)

    const users = await User.filter(payload).paginate(page, limit)
    users.baseUrl(Route.builder().make('admin.users.index'))

    return view.render('admin/users/index', {
      users,
    })
  }
}
