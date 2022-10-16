import { test } from '@japa/runner'
import I18n from '@ioc:Adonis/Addons/I18n'

test.group('Forgot password validator', () => {
  test('Empty email', async ({ client, route }) => {
    const response = await client
      .post(route('auth.password.store'))
      .fields({
        email: '',
      }).redirects(0).withCsrfToken()

    response.assertFlashMessage('errors', {
      email: [
        I18n.locale(I18n.defaultLocale).formatMessage('validator.shared.email.required')
      ]
    })
  })

  test('Invalid email', async ({ client, route }) => {
    const response = await client
      .post(route('auth.password.store'))
      .fields({
        email: 'no valid email',
      }).redirects(0).withCsrfToken()

    response.assertFlashMessage('errors', {
      email: [
        I18n.locale(I18n.defaultLocale).formatMessage('validator.shared.email.email')
      ]
    })
  })

  test('valid email', async ({ client, route }) => {
    const response = await client
      .post(route('auth.password.store'))
      .fields({
        email: 'jeremy@adonis.com',
      }).redirects(0).withCsrfToken()

    response.assertFlashMessage('success', {
      message: I18n.locale(I18n.defaultLocale).formatMessage('form.success.forgotPassword')
    })
  })
})
