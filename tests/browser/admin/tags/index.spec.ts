import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import UserFactory from 'Database/factories/UserFactory'
import TagFactory from 'Database/factories/TagFactory'
import Roles from 'App/Enums/Roles'
import User from 'App/Models/User'

test.group('Admin tags', (group) => {
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

  test('should access tags list', async ({ login, visit, route }) => {
    await TagFactory.createMany(12)

    await login(user!.email, 'secret')

    const page = await visit(route('admin.tags.index'))
    // await page.pause()

    await page.assertElementsCount('tbody tr', 10)

    await page.goto(
      route('admin.tags.index', {
        qs: {
          page: 2,
        },
      })
    )

    await page.assertElementsCount('tbody tr', 2)
  })

  test('should find specific user', async ({ login, visit, route }) => {
    const tags = await TagFactory.createMany(12)

    await login(user!.email, 'secret')
    const page = await visit(route('admin.tags.index'))

    await page.getByPlaceholder('search').fill(tags[0].name)
    await page.keyboard.press('Enter')

    await page.assertElementsCount('tbody tr', 1)

    await page.assertExists(
      page.locator('tbody tr:first-child > td:nth-of-type(1)', { hasText: tags[0].name })
    )
  })

  test('should change order of list', async ({ login, visit, route }) => {
    await TagFactory.merge({
      name: 'adonis',
    }).create()

    const tag = await TagFactory.merge({
      name: 'rails',
    }).create()

    await login(user!.email, 'secret')
    const page = await visit(route('admin.tags.index'))

    await page.locator('select[name="order"]').selectOption('name+desc')
    await page.keyboard.press('Enter')

    await page.assertExists(
      page.locator('tbody tr:first-child > td:nth-of-type(1)', { hasText: tag.name })
    )
  })

  test('should clear filter', async ({ login, visit, route }) => {
    const tag = await TagFactory.merge({
      name: 'adonis',
    }).create()

    await TagFactory.merge({
      name: 'rails',
    }).create()

    await login(user!.email, 'secret')
    const page = await visit(route('admin.tags.index'))

    await page.assertElementsCount('tbody tr', 2)

    await page.getByPlaceholder('search').fill(tag.name)
    await page.keyboard.press('Enter')

    await page.assertElementsCount('tbody tr', 1)

    await page.getByText('Clear all').click()

    await page.assertElementsCount('tbody tr', 2)
  })
})
