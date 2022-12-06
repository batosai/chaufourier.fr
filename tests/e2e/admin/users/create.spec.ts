import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import UserFactory from 'Database/factories/UserFactory'
import Roles from 'App/Enums/Roles'
import I18n from '@ioc:Adonis/Addons/I18n'
import { faker } from '@faker-js/faker'

test.group('Admin create user', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return async () => {
      await Database.rollbackGlobalTransaction()
    }
  })

  test('should create errors validation fields', async ({ assert, login, page, route }) => {
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

    await page.locator('#lastname').fill(faker.lorem.words(51))
    await page.locator('#firstname').fill(faker.lorem.words(51))
    await page.locator('#email').fill('virk@adonisjs.com')
    await page.locator('text=validate').click()

    assert.equal(
      await page.getByText(I18n.locale(I18n.defaultLocale).formatMessage('validator.shared.lastname.maxLength', {
        max_length: 50,
      })).count(),
      1
    )
    assert.equal(
      await page.getByText(I18n.locale(I18n.defaultLocale).formatMessage('validator.shared.firstname.maxLength', {
        max_length: 50,
      })).count(),
      1
    )
    assert.equal(
      await page.getByText(I18n.locale(I18n.defaultLocale).formatMessage('validator.shared.email.unique')).count(),
      1
    )

  })

  test('should create success', async ({ assert, login, page, route }) => {
    const user = await UserFactory.merge({
      password: 'secret',
      email: 'virk@adonisjs.com',
      role: Roles.ADMIN,
    }).create()

    await login(user.email, 'secret')

    await page.goto(route('admin.users.index'))

    assert.equal(await page.locator('tbody tr').count(), 1)

    await page.goto(route('admin.users.create'))

    await page.locator('#lastname').fill(faker.name.lastName())
    await page.locator('#firstname').fill(faker.name.firstName())
    await page.locator('#email').fill(faker.internet.email())
    await page.locator('text=validate').click()

    assert.equal(await page.locator('tbody tr').count(), 2)
    assert.equal(
      await page.getByText(I18n.locale(I18n.defaultLocale).formatMessage('form.success.user.create')).count(),
      1
    )
  })
})
