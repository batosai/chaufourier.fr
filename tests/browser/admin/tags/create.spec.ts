import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import UserFactory from 'Database/factories/UserFactory'
import Roles from 'App/Enums/Roles'
import I18n from '@ioc:Adonis/Addons/I18n'
import { faker } from '@faker-js/faker'
import User from 'App/Models/User'

test.group('Admin create tag', (group) => {
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

  test('should create errors validation fields', async ({ login, visit, route }) => {
    await login(user!.email, 'secret')

    const page = await visit(route('admin.tags.create'))

    await page.locator('input[name="name"]').fill('a')
    await page.locator('text=validate').click()

    await page.assertElementsCount(
      await page.getByText(
        I18n.locale(I18n.defaultLocale).formatMessage('validator.shared.name.minLength', {
          min_length: 2,
        })
      ),
      1
    )
  })

  test('should create success', async ({ login, visit, route }) => {
    await login(user!.email, 'secret')

    // await page.pause()

    const page = await visit(route('admin.tags.index'))

    await page.assertElementsCount('tbody tr', 0)

    await page.goto(route('admin.tags.create'))

    await page.locator('input[name="name"]').fill(faker.lorem.words(5))
    await page.locator('text=validate').click()
    // await page.pause()

    await page.assertElementsCount('tbody tr', 1)
    await page.assertElementsCount(
      await page.getByText(
        I18n.locale(I18n.defaultLocale).formatMessage('form.success.tag.create')
      ),
      1
    )
  })
})
