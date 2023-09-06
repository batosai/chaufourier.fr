import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import UserFactory from 'Database/factories/UserFactory'
import Roles from 'App/Enums/Roles'
import User from 'App/Models/User'

test.group('Admin impersonate user', (group) => {
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

  test('should impersonate success', async ({ login, visit, route }) => {
    const customer = await UserFactory.create()

    await login(user!.email, 'secret')

    const page = await visit(route('admin.users.edit', customer))

    await page.getByRole('button', { name: 'Yes, impersonate' }).click()
    await page.locator('.modal').getByRole('button', { name: 'ok' }).click()

    await page.assertTextContains('body', customer.firstname)
    await page.assertTextContains('body', customer.lastname)

    await page.locator('form').getByRole('button').click()

    await page.assertTextContains('body', user!.firstname)
    await page.assertTextContains('body', user!.lastname)
  })
})
