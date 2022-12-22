import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import UserFactory from 'Database/factories/UserFactory'
import Roles from 'App/Enums/Roles'
import I18n from '@ioc:Adonis/Addons/I18n'

test.group('Admin disabled user', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return async () => {
      await Database.rollbackGlobalTransaction()
    }
  })

  test('should toggle success', async ({ assert, login, page, route }) => {
    const user = await UserFactory.merge({
      password: 'secret',
      email: 'virk@adonisjs.com',
      role: Roles.ADMIN,
    }).create()
    const customer = await UserFactory.create()

    await login(user.email, 'secret')

    await page.goto(route('admin.users.edit', customer))

    await page.locator('#actions-form').getByRole('button').nth(1).click()
    await page.getByRole('button', { name: 'ok' }).click()
    assert.equal(
      await page.getByText(I18n.locale(I18n.defaultLocale).formatMessage('form.success.user.toggle.disabled')).count(),
      1
    )

    await page.locator('#actions-form').getByRole('button').nth(1).click()
    await page.getByRole('button', { name: 'ok' }).click()
    assert.equal(
      await page.getByText(I18n.locale(I18n.defaultLocale).formatMessage('form.success.user.toggle.enabled')).count(),
      1
    )
  })
})
