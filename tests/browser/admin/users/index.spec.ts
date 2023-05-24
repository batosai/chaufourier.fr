import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import UserFactory from 'Database/factories/UserFactory'
import Roles from 'App/Enums/Roles'
import User from 'App/Models/User'

test.group('Admin users', (group) => {
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

  test('should access users list', async ({ login, visit, route }) => {
    await UserFactory.createMany(12)

    await login(user!.email, 'secret')

    const page = await visit(route('admin.users.index'))
    // await page.pause()

    await page.assertElementsCount('tbody tr', 10)

    await page.goto(
      route('admin.users.index', {
        qs: {
          page: 2,
        },
      })
    )

    await page.assertElementsCount('tbody tr', 3)
  })

  test('should find specific user', async ({ login, visit, route }) => {
    await UserFactory.createMany(12)

    await login(user!.email, 'secret')
    const page = await visit(route('admin.users.index'))

    await page.getByPlaceholder('search').fill(user!.email)
    await page.keyboard.press('Enter')

    await page.assertElementsCount('tbody tr', 1)

    await page.assertExists(
      page.locator('tbody tr:first-child > td:nth-of-type(2)', { hasText: user!.email })
    )
  })

  test('should change order of list', async ({ login, visit, route }) => {
    const user2 = await UserFactory.merge({ email: 'romain@adonisjs.com' }).create()

    await login(user!.email, 'secret')
    const page = await visit(route('admin.users.index'))

    await page.locator('select[name="order"]').selectOption('email+asc')
    await page.keyboard.press('Enter')

    await page.assertExists(
      page.locator('tbody tr:first-child > td:nth-of-type(2)', { hasText: user2.email })
    )
  })

  test('should filter by admin user', async ({ login, visit, route }) => {
    await UserFactory.createMany(12)

    await login(user!.email, 'secret')
    const page = await visit(route('admin.users.index'))

    await page.getByRole('button', { name: 'Filter' }).click()

    await page.locator('select[name="role"]').selectOption(`${Roles.ADMIN}`)
    await page.keyboard.press('Enter')

    await page.assertElementsCount('tbody tr', 1)
  })

  test('should filter by disabled status', async ({ login, visit, route }) => {
    await UserFactory.apply('disabled').createMany(2)
    await UserFactory.createMany(7)

    await login(user!.email, 'secret')
    const page = await visit(route('admin.users.index'))

    await page.assertElementsCount('tbody tr', 10)

    await page.getByRole('button', { name: 'Filter' }).click()

    await page.getByLabel('Disabled').click()
    await page.keyboard.press('Enter')

    await page.assertElementsCount('tbody tr', 2)
  })

  test('should clear filter', async ({ login, visit, route }) => {
    await UserFactory.createMany(9)

    await login(user!.email, 'secret')
    const page = await visit(route('admin.users.index'))

    await page.assertElementsCount('tbody tr', 10)

    await page.getByPlaceholder('search').fill(user!.email)
    await page.keyboard.press('Enter')

    await page.assertElementsCount('tbody tr', 1)

    await page.getByRole('button', { name: 'Reset all' }).click()

    await page.assertElementsCount('tbody tr', 10)
  })
})
