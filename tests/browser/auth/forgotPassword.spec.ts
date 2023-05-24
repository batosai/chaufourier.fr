import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import UserFactory from 'Database/factories/UserFactory'
import I18n from '@ioc:Adonis/Addons/I18n'

test.group('Forgot password page', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('should display error message if validation with empty fields', async ({ visit, route }) => {
    const page = await visit(route('auth.password.create'))
    await page.locator('text=validate').click()

    await page.assertElementsCount(await page.getByText(/Email field is required/), 1)
  })

  test('should display success message', async ({ visit, route }) => {
    const user = await UserFactory.create()

    const page = await visit(route('auth.password.create'))

    await page.locator('input[name="email"]').fill(user.email)
    await page.locator('text=validate').click()

    await page.assertElementsCount(
      await page.getByText(
        I18n.locale(I18n.defaultLocale).formatMessage('form.success.forgotPassword')
      ),
      1
    )
  })
})
