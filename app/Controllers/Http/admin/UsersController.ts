import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Route from '@ioc:Adonis/Core/Route'
import Event from '@ioc:Adonis/Core/Event'
import { Attachment } from '@ioc:Adonis/Addons/AttachmentAdvanced'
import User from 'App/Models/User'
import UserSessionFilterService from 'App/Services/UserSessionFilterService'
import UserValidator from 'App/Validators/admin/UserValidator'
import ForgotPasswordMailer from 'App/Mailers/ForgotPasswordMailer'

export default class UsersController {
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

  public async store({ request, response, bouncer, session, i18n, auth, up }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('create')
    const avatar = request.file('avatar')!
    /**
     * Validate new user account creation form
     */
    const payload = await request.validate(UserValidator)

    /**
     * Create a new user
     */
    const user = new User()
    await user.fill(payload)

    if (avatar) {
      user.avatar = Attachment.fromFile(avatar)
    }
    await user.save()

    Event.emit("audit:new", {
      label: `Create user ${user!.fullname}`,
      username: auth.user!.fullname,
      userId: auth.user!.id,
      action: "CREATE",
      target: "USER",
      targetId: user.id,
      payload: user.serialize()
    })

    session.flash('success.message', i18n.formatMessage('form.success.user.create'))

    // const events = [ { type: "user:created" } ]
    // up.setEvents(JSON.stringify(events))
    if (up.getMode() === 'drawer') {
      up.setDismissLayer('{}')
    } else {
      response.redirect().toRoute('admin.users.index')
    }
  }

  public async edit({ request, view, bouncer }: HttpContextContract) {
    const user = await User.findOrFail(request.param('id'))
    await bouncer.with('UserPolicy').authorize('update', user)

    user.password = ''

    // user.avatar = Attachment.regenerate(user.avatar)
    // user.avatar = Attachment.regenerate(user.avatar, 'medium')
    // user.avatar = Attachment.regenerate(user.avatar, ['thumbnail', 'large'])
    // await user.save()

    // await User.attachmentRegenerate()
    // await User.attachmentRegenerate('medium')
    // await User.attachmentRegenerate(['thumbnail', 'large'])

    return view.render('admin/users/edit', {
      user,
    })
  }

  public async update(ctx: HttpContextContract) {
    const { request, response, auth, bouncer, session, i18n, up } = ctx
    const user = await User.findOrFail(request.param('id'))

    await bouncer.with('UserPolicy').authorize('update', user)
    const avatar = request.file('avatar')!

    const payload = await request.validate(new UserValidator(ctx, user))

    await user.merge(payload)

    if (avatar) {
      user.avatar = Attachment.fromFile(avatar)
    }
    const dirty = user.$dirty
    await user.save()

    Event.emit("audit:new", {
      label: `Update user ${user!.fullname}`,
      username: auth.user!.fullname,
      userId: auth.user!.id,
      action: "UPDATE",
      target: "USER",
      targetId: user.id,
      payload: dirty
    })

    session.flash('success.message', i18n.formatMessage('form.success.user.edit'))

    if (up.getMode() === 'drawer') {
      up.setDismissLayer('{}')
    } else {
      if (auth.user?.isAdmin) {
        response.redirect().toRoute('admin.users.index')
      } else {
        response.redirect().toRoute('admin.dashboard')
      }
    }
  }

  public async destroy({ params, response, bouncer, session, i18n, auth, up }: HttpContextContract) {
    const { id } = params
    const user = await User.findOrFail(id)
    await bouncer.with('UserPolicy').authorize('delete', user)
    const payload = user.serialize()
    const fullname = user!.fullname
    await user.delete()

    Event.emit("audit:new", {
      label: `Delete user ${fullname}`,
      username: auth.user!.fullname,
      userId: auth.user!.id,
      action: "DELETE",
      target: "USER",
      targetId: id,
      payload
    })

    session.flash('success.message', i18n.formatMessage('form.success.user.delete'))

    if (up.getMode() === 'drawer') {
      up.setDismissLayer('{}')
    } else {
      response.redirect().toRoute('admin.users.index')
    }
  }

  public async toggleDisabled({ request, response, bouncer, session, i18n, auth, up }: HttpContextContract) {
    const user = await User.findOrFail(request.param('id'))
    await bouncer.with('UserPolicy').authorize('disabled', user)

    user.disabled = !user.disabled
    await user.save()

    if (user.disabled) {
      Event.emit("audit:new", {
        label: `Disabled user ${user!.fullname}`,
        username: auth.user!.fullname,
        userId: auth.user!.id,
        action: "UPDATE",
        target: "USER",
        targetId: user.id,
      })
      session.flash('success.message', i18n.formatMessage('form.success.user.toggle.disabled'))
    } else {
      Event.emit("audit:new", {
        label: `Enabled user ${user!.fullname}`,
        username: auth.user!.fullname,
        userId: auth.user!.id,
        action: "UPDATE",
        target: "USER",
        targetId: user.id,
      })
      session.flash('success.message', i18n.formatMessage('form.success.user.toggle.enabled'))
    }

    if (up.getMode() === 'drawer') {
      up.setDismissLayer('{}')
    } else {
      response.redirect().back()
    }
  }

  public async forgotPassword({ request, response, bouncer, session, i18n, auth, up }: HttpContextContract) {
    const user = await User.findOrFail(request.param('id'))
    await bouncer.with('UserPolicy').authorize('forgot', user)

    await new ForgotPasswordMailer(user).sendLater()

    Event.emit("audit:new", {
      label: `Forgot password user ${user!.fullname}`,
      username: auth.user!.fullname,
      userId: auth.user!.id,
      action: "UPDATE",
      target: "USER",
      targetId: user.id,
    })

    session.flash('success.message', i18n.formatMessage('form.success.user.forgot'))

    if (up.getMode() === 'drawer') {
      up.setDismissLayer('{}')
    } else {
      response.redirect().back()
    }
  }
}
