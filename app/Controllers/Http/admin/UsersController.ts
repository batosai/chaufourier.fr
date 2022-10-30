import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Route from '@ioc:Adonis/Core/Route'
import User from 'App/Models/User'
import UserSessionFilterService from 'App/Services/UsersSessionFilterService'

export default class DashboardController {
  public async index(ctx: HttpContextContract) {
    const { view, bouncer } = ctx
    await bouncer.with('UserPolicy').authorize('viewList')

    const limit = 1
    const { page = 1, ...payload } = await UserSessionFilterService.handle(ctx)

    console.log(payload)

    const users = await User.filter(payload).paginate(page, limit)
    users.baseUrl(Route.builder().make('admin.users.index'))

    return view.render('admin/users/index', {
      users,
    })
  }
}
