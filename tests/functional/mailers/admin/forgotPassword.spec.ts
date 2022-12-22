import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import Mail from '@ioc:Adonis/Addons/Mail'
import I18n from '@ioc:Adonis/Addons/I18n'
import UserFactory from 'Database/factories/UserFactory'
import Roles from 'App/Enums/Roles'

test.group(' Admin Forgot password mailer', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('send reset password instructions', async ({ assert, client, route }) => {
    const user = await UserFactory.merge({
      role: Roles.ADMIN,
    }).create()
    const mailer = Mail.fake()
    const customer = await UserFactory.create()

    await client
      .post(route('admin.users.forgot.password', customer))
      .redirects(0)
      .withCsrfToken()
      .loginAs(user)

    assert.isTrue(
      mailer.exists({
        subject: I18n.locale(I18n.defaultLocale).formatMessage('email.forgotPassword.subject'),
      })
    )

    Mail.restore()
  })
})
