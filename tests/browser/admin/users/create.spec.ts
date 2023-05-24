import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import UserFactory from 'Database/factories/UserFactory'
import Roles from 'App/Enums/Roles'
import I18n from '@ioc:Adonis/Addons/I18n'
import { faker } from '@faker-js/faker'
import User from 'App/Models/User'

test.group('Admin create user', (group) => {
  let user: User | null  = null

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

    const page = await visit(route('admin.users.create'))

    await page.locator('input[name="lastname"]').fill('a')
    await page.locator('input[name="firstname"]').fill('a')
    await page.locator('input[name="email"]').fill('a')
    await page.locator('text=validate').click()

    await page.assertElementsCount(
      await page.getByText(I18n.locale(I18n.defaultLocale).formatMessage('validator.shared.lastname.minLength', {
        min_length: 2,
      })),
      1
    )
    await page.assertElementsCount(
      await page.getByText(I18n.locale(I18n.defaultLocale).formatMessage('validator.shared.firstname.minLength', {
        min_length: 2,
      })),
      1
    )
    await page.assertElementsCount(
      await page.getByText(I18n.locale(I18n.defaultLocale).formatMessage('validator.shared.email.email')),
      1
    )

    await page.locator('input[name="lastname"]').fill(faker.lorem.words(51))
    await page.locator('input[name="firstname"]').fill(faker.lorem.words(51))
    await page.locator('input[name="email"]').fill('virk@adonisjs.com')
    await page.locator('text=validate').click()

    await page.assertElementsCount(
      await page.getByText(I18n.locale(I18n.defaultLocale).formatMessage('validator.shared.lastname.maxLength', {
        max_length: 50,
      })),
      1
    )
    await page.assertElementsCount(
      await page.getByText(I18n.locale(I18n.defaultLocale).formatMessage('validator.shared.firstname.maxLength', {
        max_length: 50,
      })),
      1
    )
    await page.assertElementsCount(
      await page.getByText(I18n.locale(I18n.defaultLocale).formatMessage('validator.shared.email.unique')),
      1
    )

  })

  test('should create success', async ({ login, visit, route }) => {
    await login(user!.email, 'secret')

    // await page.pause()

    const page = await visit(route('admin.users.index'))

    await page.assertElementsCount('tbody tr', 1)

    await page.goto(route('admin.users.create'))

    await page.locator('input[name="lastname"]').fill(faker.person.lastName())
    await page.locator('input[name="firstname"]').fill(faker.person.firstName())
    await page.locator('input[name="email"]').fill(faker.internet.email())
    await page.locator('text=validate').click()
    // await page.pause()

    await page.assertElementsCount('tbody tr', 2)
    await page.assertElementsCount(
      await page.getByText(I18n.locale(I18n.defaultLocale).formatMessage('form.success.user.create')),
      1
    )
  })
})
