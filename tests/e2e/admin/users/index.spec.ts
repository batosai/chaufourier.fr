import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import UserFactory from 'Database/factories/UserFactory'
import Roles from 'App/Enums/Roles'
import { sleep } from '../../../helpers'

test.group('Admin users', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return async () => {
      await Database.rollbackGlobalTransaction()
    }
  })

  test('should access users list', async ({ assert, login, page, route }) => {
    const user = await UserFactory.merge({
      password: 'secret',
      email: 'virk@adonisjs.com',
      role: Roles.ADMIN,
    }).create()

    await UserFactory.createMany(12)

    await login(user.email, 'secret')

    await page.goto(route('admin.users.index'))
    // await page.pause()

    assert.equal(await page.locator('tbody tr').count(), 10)

    await page.goto(
      route('admin.users.index', {
        qs: {
          page: 2,
        },
      })
    )
    assert.equal(await page.locator('tbody tr').count(), 3)
  })

  test('should find specific user', async ({ assert, login, page, route }) => {
    const user = await UserFactory.merge({
      password: 'secret',
      email: 'virk@adonisjs.com',
      role: Roles.ADMIN,
    }).create()

    await UserFactory.createMany(12)

    await login(user.email, 'secret')
    await page.goto(route('admin.users.index'))

    await page.getByPlaceholder('search').fill(user.email)
    await page.keyboard.press('Enter')
    await sleep(500)

    assert.equal(await page.locator('tbody tr').count(), 1)

    assert.equal(
      await page.locator('tbody tr:first-child > td:nth-of-type(1)').innerText(),
      user.email
    )
  })

  test('should change order of list', async ({ assert, login, page, route }) => {
    const user = await UserFactory.merge({
      password: 'secret',
      email: 'virk@adonisjs.com',
      role: Roles.ADMIN,
    }).create()

    const user2 = await UserFactory.merge({ email: 'romain@adonisjs.com' }).create()

    await login(user.email, 'secret')
    await page.goto(route('admin.users.index'))

    await page.locator('select[name="order"]').selectOption('email+asc')
    await page.keyboard.press('Enter')
    await sleep(500)

    assert.equal(
      await page.locator('tbody tr:first-child > td:nth-of-type(1)').innerText(),
      user2.email
    )
  })

  test('should filter by admin user', async ({ assert, login, page, route }) => {
    const user = await UserFactory.merge({
      password: 'secret',
      email: 'virk@adonisjs.com',
      role: Roles.ADMIN,
    }).create()

    await UserFactory.createMany(12)

    await login(user.email, 'secret')
    await page.goto(route('admin.users.index'))

    await page.getByRole('button', { name: 'Filter' }).click()
    await sleep(500)

    await page.locator('select[name="role"]').selectOption(`${Roles.ADMIN}`)
    await page.keyboard.press('Enter')
    await sleep(500)

    assert.equal(await page.locator('tbody tr').count(), 1)
  })

  test('should filter by disabled status', async ({ assert, login, page, route }) => {
    const user = await UserFactory.merge({
      password: 'secret',
      email: 'virk@adonisjs.com',
      role: Roles.ADMIN,
    }).create()

    await UserFactory.apply('disabled').createMany(2)
    await UserFactory.createMany(7)

    await login(user.email, 'secret')
    await page.goto(route('admin.users.index'))

    assert.equal(await page.locator('tbody tr').count(), 10)

    await page.getByRole('button', { name: 'Filter' }).click()
    await sleep(500)

    await page.getByLabel('Disabled').click()
    await page.keyboard.press('Enter')
    await sleep(500)

    assert.equal(await page.locator('tbody tr').count(), 2)
  })

  test('should clear filter', async ({ assert, login, page, route }) => {
    const user = await UserFactory.merge({
      password: 'secret',
      email: 'virk@adonisjs.com',
      role: Roles.ADMIN,
    }).create()

    await UserFactory.createMany(9)

    await login(user.email, 'secret')
    await page.goto(route('admin.users.index'))

    assert.equal(await page.locator('tbody tr').count(), 10)

    await page.getByPlaceholder('search').fill(user.email)
    await page.keyboard.press('Enter')
    await sleep(500)

    assert.equal(await page.locator('tbody tr').count(), 1)

    await page.getByRole('button', { name: 'Reset all' }).click()

    assert.equal(await page.locator('tbody tr').count(), 10)
  })
})
