import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import UserFactory from 'Database/factories/UserFactory'
import I18n from '@ioc:Adonis/Addons/I18n'

test.group('Login page', group => {

  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Should display login page', async ({ assert, page, route }) => {
    await page.goto(route('auth.session.create'))

    assert.exists(await page.getByText(/Your email/))
  })

  test('Should display error message if validation with empty fields', async ({ assert, page, route }) => {
    await page.goto(route('auth.session.create'))
    await page.locator('text=validate').click()

    assert.exists(await page.getByText(/Invalid credentials/))
  })

  test('Should display admin after validation login form', async ({ assert, page, route }) => {
    const user = await UserFactory
      .merge({ password: 'secret' })
      .create()

    await page.goto(route('auth.session.create'))

    await page.getByLabel('Your email').fill(user.email)
    await page.getByLabel('Your password').fill('secret')

    // await page.pause();

    await page.locator('text=validate').click()

    // await page.screenshot({ path: 'screenshot.png', fullPage: true })

    assert.exists(await page.getByText(
      I18n.locale(I18n.defaultLocale).formatMessage('form.success.session')
    ))
  })

  test('Should display error message for blocked user', async ({ assert, page, route }) => {
    const user = await UserFactory
      .apply('disabled')
      .merge({ password: 'secret',  })
      .create()

    await page.goto(route('auth.session.create'))

    await page.getByLabel('Your email').fill(user.email)
    await page.getByLabel('Your password').fill('secret')
    await page.locator('text=validate').click()

    assert.exists(await page.getByText('Your account is disabled'))
  })
})
