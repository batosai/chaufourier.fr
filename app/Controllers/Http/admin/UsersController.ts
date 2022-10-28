import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Route from '@ioc:Adonis/Core/Route'
import User from 'App/Models/User'

export default class DashboardController {
  public async index({ request, session, view, bouncer }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('viewList')

    let { page = 1, reset,  ...input } = request.qs()
    const limit = 10

    if(reset) {
      if (reset === 'all') {
        input = {}
        session.forget('usersFilter')
      } else {
        delete input[reset]
        if (session.has('usersFilter')) {
          session.forget(`usersFilter.${reset}`)
        }
      }
    }

    if (!Object.keys(input).length && session.has('usersFilter')) {
      input = session.get('usersFilter')
    } else if(Object.keys(input).length) {
      session.put('usersFilter', input)
    }

    const users = await User.filter(input).paginate(page, limit)
    users.baseUrl(Route.builder().make('admin.users.index'))

    return view.render('admin/users/index', {
      users,
    })
  }
}
