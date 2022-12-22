import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import UserFactory from 'Database/factories/UserFactory'
import Roles from 'App/Enums/Roles'
import I18n from '@ioc:Adonis/Addons/I18n'

test.group('Admin delete user', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return async () => {
      await Database.rollbackGlobalTransaction()
    }
  })

  test('should delete success', async ({ assert, login, page, route }) => {
    const user = await UserFactory.merge({
      password: 'secret',
      email: 'virk@adonisjs.com',
      role: Roles.ADMIN,
    }).create()
    const customer = await UserFactory.create()

    await login(user.email, 'secret')

    await page.goto(route('admin.users.index'))

    assert.equal(await page.locator('tbody tr').count(), 2)

    await page.goto(route('admin.users.edit', customer))

    await page.locator('#actions-form').getByRole('button').first().click()
    await page.getByRole('button', { name: 'ok' }).click()

    // await page.pause()

    assert.equal(
      await page.getByText(I18n.locale(I18n.defaultLocale).formatMessage('form.success.user.delete')).count(),
      1
    )

    assert.equal(await page.locator('tbody tr').count(), 1)

  })
})
