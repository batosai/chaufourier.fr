import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import UserFactory from 'Database/factories/UserFactory'
import Roles from 'App/Enums/Roles'
import I18n from '@ioc:Adonis/Addons/I18n'
import { faker } from '@faker-js/faker'

test.group('Admin edit user', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return async () => {
      await Database.rollbackGlobalTransaction()
    }
  })

  test('should edit success', async ({ assert, login, page, route }) => {
    const user = await UserFactory.merge({
      password: 'secret',
      email: 'virk@adonisjs.com',
      role: Roles.ADMIN,
    }).create()

    await login(user.email, 'secret')

    await page.goto(route('admin.users.edit', user))

    await page.locator('#lastname').fill(faker.name.lastName())
    await page.locator('text=validate').click()

    assert.equal(
      await page.getByText(I18n.locale(I18n.defaultLocale).formatMessage('form.success.user.edit')).count(),
      1
    )
  })
})
