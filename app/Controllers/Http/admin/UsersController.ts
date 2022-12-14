import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Route from '@ioc:Adonis/Core/Route'
import { Attachment } from '@ioc:Adonis/Addons/AttachmentLite'
import User from 'App/Models/User'
import UserSessionFilterService from 'App/Services/UsersSessionFilterService'
import UserValidator from 'App/Validators/admin/UserValidator'
import ForgotPasswordMailer from 'App/Mailers/ForgotPasswordMailer'

export default class DashboardController {
  public async index(ctx: HttpContextContract) {
    const { view, bouncer } = ctx
    await bouncer.with('UserPolicy').authorize('viewList')

    const limit = 10
    const { page = 1, ...payload } = await UserSessionFilterService.handle(ctx)

    const users = await User.filter(payload).paginate(page, limit)
    users.baseUrl(Route.builder().make('admin.users.index'))
    users.queryString(payload)

    return view.render('admin/users/index', {
      users,
    })
  }

  public async create({ view, bouncer }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('create')
    return view.render('admin/users/create')
  }

  public async store({ request, response, bouncer, session, i18n }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('create')
    const avatar = request.file('avatar')!
    // /**
    //  * Validate new user account creation form
    //  */
    const payload = await request.validate(UserValidator)

    // /**
    //  * Create a new user
    //  */
    const user = new User()
    await user.fill(payload)

    if (avatar) {
      user.avatar = Attachment.fromFile(avatar)
    }
    await user.save()

    session.flash('success.message', i18n.formatMessage('form.success.user.create'))

    response.redirect().toRoute('admin.users.index')
  }

  public async edit({ request, view, bouncer }: HttpContextContract) {
    const user = await User.findOrFail(request.param('id'))
    await bouncer.with('UserPolicy').authorize('update', user)

    user.password = ''

    return view.render('admin/users/edit', {
      user,
    })
  }

  public async update(ctx: HttpContextContract) {
    const { request, response, auth, bouncer, session, i18n } = ctx
    const user = await User.findOrFail(request.param('id'))

    await bouncer.with('UserPolicy').authorize('update', user)
    const avatar = request.file('avatar')!

    const payload = await request.validate(new UserValidator(ctx, user))

    await user.merge(payload)

    if (avatar) {
      user.avatar = Attachment.fromFile(avatar)
    }
    await user.save()

    session.flash('success.message', i18n.formatMessage('form.success.user.edit'))

    if (auth.user?.isAdmin) {
      response.redirect().toRoute('admin.users.index')
    } else {
      response.redirect().toRoute('admin.dashboard')
    }
  }

  public async destroy({ params, response, bouncer, session, i18n }: HttpContextContract) {
    const { id } = params
    const user = await User.findOrFail(id)
    await bouncer.with('UserPolicy').authorize('delete', user)
    await user.delete()

    session.flash('success.message', i18n.formatMessage('form.success.user.delete'))
    response.redirect().toRoute('admin.users.index')
  }

  public async toggleDisabled({ request, response, bouncer, session, i18n }: HttpContextContract) {
    const user = await User.findOrFail(request.param('id'))
    await bouncer.with('UserPolicy').authorize('disabled', user)

    user.disabled = !user.disabled
    await user.save()

    if (user.disabled) {
      session.flash('success.message', i18n.formatMessage('form.success.user.toggle.disabled'))
    } else {
      session.flash('success.message', i18n.formatMessage('form.success.user.toggle.enabled'))
    }
    response.redirect().back()
  }

  public async forgotPassword({ request, response, bouncer, session, i18n }: HttpContextContract) {
    const user = await User.findOrFail(request.param('id'))
    await bouncer.with('UserPolicy').authorize('forgot', user)

    await new ForgotPasswordMailer(user).sendLater()

    session.flash('success.message', i18n.formatMessage('form.success.user.forgot'))
    response.redirect().back()
  }
}
