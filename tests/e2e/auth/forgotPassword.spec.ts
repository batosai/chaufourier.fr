import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import UserFactory from 'Database/factories/UserFactory'
import I18n from '@ioc:Adonis/Addons/I18n'

test.group('Forgot password page', group => {

  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Should display error message if validation with empty fields', async ({ assert, page, route, getScreen }) => {
    await page.goto(route('auth.password.create'))

    await page.locator('text=validate').click()

    let screen = await getScreen()

    assert.exists(await screen.findByText(/Email field is required/))
  })

  test('Should display success message', async ({ assert, page, route, getScreen }) => {
    const user = await UserFactory.create()

    await page.goto(route('auth.password.create'))

    await page.getByLabel('Your email').fill(user.email)
    await page.locator('text=validate').click()

    let screen = await getScreen()

    assert.exists(await screen.findByText(
      I18n.locale(I18n.defaultLocale).formatMessage('form.success.forgotPassword')
    ))
  })
})
