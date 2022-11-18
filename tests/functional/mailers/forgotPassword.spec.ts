import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import Mail from '@ioc:Adonis/Addons/Mail'
import I18n from '@ioc:Adonis/Addons/I18n'
import UserFactory from 'Database/factories/UserFactory'

test.group('Forgot password mailer', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('exist email address', async ({ assert, client, route }) => {
    const mailer = Mail.fake()
    await client
      .post(route('auth.password.store'))
      .fields({
        email: 'jeremy@adonis.com',
      })
      .redirects(0)
      .withCsrfToken()

    assert.isFalse(
      mailer.exists((mail) => {
        return mail.subject === 'Welcome to AdonisJS'
      })
    )

    Mail.restore()
  })

  test('not exist email address', async ({ assert, client, route }) => {
    const mailer = Mail.fake()
    const user = await UserFactory.create()

    await client
      .post(route('auth.password.store'))
      .fields({
        email: user.email,
      })
      .redirects(0)
      .withCsrfToken()

    assert.isTrue(
      mailer.exists({
        subject: I18n.locale(I18n.defaultLocale).formatMessage('email.forgotPassword.subject'),
      })
    )

    Mail.restore()
  })
})
