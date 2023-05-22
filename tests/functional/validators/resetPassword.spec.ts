import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import I18n from '@ioc:Adonis/Addons/I18n'
import UserFactory from 'Database/factories/UserFactory'

test.group('Reset password validator', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('invalid signature', async ({ client, route }) => {
    const response = await client
      .get(route('auth.password.reset.create', { email: 'virk@adonisjs.com' }))
      .withCsrfToken()

    response.assertTextIncludes(
      I18n.locale(I18n.defaultLocale).formatMessage('auth.session.invalidResetLink')
    )
  })

  test('empty fields', async ({ client, route }) => {
    const response = await client
      .post(route('auth.password.reset.store'))
      .fields({
        password: '',
        password_confirmation: '',
        email: '',
      })
      .redirects(0)
      .withCsrfToken()

    response.assertFlashMessage('errors', {
      email: [I18n.locale(I18n.defaultLocale).formatMessage('validator.shared.email.required')],
      password: [
        I18n.locale(I18n.defaultLocale).formatMessage('validator.shared.password.required'),
      ],
    })
  })

  test('invalid email', async ({ client, route }) => {
    const response = await client
      .post(route('auth.password.reset.store'))
      .fields({
        password: 'Wsdfs254@',
        password_confirmation: 'Wsdfs254@',
        email: 'adonis.com',
      })
      .redirects(0)
      .withCsrfToken()

    response.assertFlashMessage('errors', {
      email: [
        I18n.locale(I18n.defaultLocale).formatMessage('validator.shared.email.email'),
        I18n.locale(I18n.defaultLocale).formatMessage('validator.shared.email.exists'),
      ],
    })
  })

  test('missing password', async ({ client, route }) => {
    const user = await UserFactory.create()
    const response = await client
      .post(route('auth.password.reset.store'))
      .fields({
        email: user.email,
      })
      .redirects(0)
      .withCsrfToken()

    response.assertFlashMessage('errors', {
      password: [
        I18n.locale(I18n.defaultLocale).formatMessage('validator.shared.password.required'),
      ],
    })
  })

  test('invalid password', async ({ client, route }) => {
    const user = await UserFactory.create()
    const response = await client
      .post(route('auth.password.reset.store'))
      .fields({
        password: ' ',
        password_confirmation: ' ',
        email: user.email,
      })
      .redirects(0)
      .withCsrfToken()

    response.assertFlashMessage('errors', {
      password: [
        I18n.locale(I18n.defaultLocale).formatMessage('validator.shared.password.minLength', {
          password_min_length: 8,
        }),
        I18n.locale(I18n.defaultLocale).formatMessage(
          'validator.shared.password.oneLowerCaseAtLeast'
        ),
        I18n.locale(I18n.defaultLocale).formatMessage(
          'validator.shared.password.oneNumericAtLeast'
        ),
        I18n.locale(I18n.defaultLocale).formatMessage(
          'validator.shared.password.oneUpperCaseAtLeast'
        ),
        I18n.locale(I18n.defaultLocale).formatMessage(
          'validator.shared.password.oneSpecialCharacterAtLeast'
        ),
      ],
    })
  })

  test('different password', async ({ client, route }) => {
    const user = await UserFactory.create()
    const response = await client
      .post(route('auth.password.reset.store'))
      .fields({
        password: 'Wsdfs254@',
        password_confirmation: '',
        email: user.email,
      })
      .redirects(0)
      .withCsrfToken()

    response.assertFlashMessage('errors', {
      password_confirmation: [
        I18n.locale(I18n.defaultLocale).formatMessage(
          'validator.shared.password_confirmation.confirmed'
        ),
      ],
    })
  })
})
