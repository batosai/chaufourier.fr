import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import UserFactory from 'Database/factories/UserFactory'
import Roles from 'App/Enums/Roles'
import I18n from '@ioc:Adonis/Addons/I18n'
import User from 'App/Models/User'

test.group('Admin forgot password user', (group) => {
  let user: User | null = null

  group.each.setup(async () => {
    await Database.beginGlobalTransaction()

    user = await UserFactory.merge({
      password: 'secret',
      email: 'virk@adonisjs.com',
      role: Roles.ADMIN,
    }).create()

    return async () => {
      await Database.rollbackGlobalTransaction()
    }
  })

  test('should send with success', async ({ login, visit, route }) => {
    const customer = await UserFactory.create()

    await login(user!.email, 'secret')

    const page = await visit(route('admin.users.edit', customer))

    await page.getByRole('button', { name: 'Yes, forget' }).click()
    await page.locator('.modal').getByRole('button', { name: 'ok' }).click()

    await page.assertElementsCount(
      await page.getByText(
        I18n.locale(I18n.defaultLocale).formatMessage('form.success.user.forgot')
      ),
      1
    )
  })
})
