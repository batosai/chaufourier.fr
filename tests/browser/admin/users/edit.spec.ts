import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import UserFactory from 'Database/factories/UserFactory'
import Roles from 'App/Enums/Roles'
import I18n from '@ioc:Adonis/Addons/I18n'
import { faker } from '@faker-js/faker'
import User from 'App/Models/User'

test.group('Admin edit user', (group) => {
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

  test('should edit success', async ({ login, visit, route }) => {

    await login(user!.email, 'secret')

    const page = await visit(route('admin.users.edit', user!))

    await page.locator('input[name="lastname"]').fill(faker.person.lastName())
    await page.locator('text=validate').click()

    await page.assertElementsCount(
      await page.getByText(I18n.locale(I18n.defaultLocale).formatMessage('form.success.user.edit')),
      1
    )
  })
})
