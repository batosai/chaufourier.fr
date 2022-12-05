import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import UserFactory from 'Database/factories/UserFactory'
import Roles from 'App/Enums/Roles'
import I18n from '@ioc:Adonis/Addons/I18n'

test.group('Admin create user', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return async () => {
      await Database.rollbackGlobalTransaction()
    }
  })

  test('should create errors validation required fields', async ({ assert, login, page, route }) => {
    const user = await UserFactory.merge({
      password: 'secret',
      email: 'virk@adonisjs.com',
      role: Roles.ADMIN,
    }).create()

    await login(user.email, 'secret')

    await page.goto(route('admin.users.create'))

    await page.locator('#lastname').fill('a')
    await page.locator('#firstname').fill('a')
    await page.locator('#email').fill('a')

    await page.locator('text=validate').click()

    assert.equal(
      await page.getByText(I18n.locale(I18n.defaultLocale).formatMessage('validator.shared.lastname.minLength', {
        min_length: 2,
      })).count(),
      1
    )
    assert.equal(
      await page.getByText(I18n.locale(I18n.defaultLocale).formatMessage('validator.shared.firstname.minLength', {
        min_length: 2,
      })).count(),
      1
    )
    assert.equal(
      await page.getByText(I18n.locale(I18n.defaultLocale).formatMessage('validator.shared.email.email')).count(),
      1
    )

  })
})
