import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import UserFactory from 'Database/factories/UserFactory'
import Roles from 'App/Enums/Roles'
import { sleep } from '../../../helpers'

test.group('Admin users', group => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return async () => {
      await Database.rollbackGlobalTransaction()
    }
  })

  test('should access users list', async ({ assert, login, page,  route }) => {
    const user = await UserFactory
      .merge({ password: 'secret', email: 'virk@adonisjs.com', roleId: Roles.ADMIN })
      .create()

    await UserFactory.createMany(12)

    await login(user.email, 'secret')

    await page.goto(route('admin.users.index'))
    // await page.pause()

    assert.lengthOf((await page.$$('tbody tr')), 10)

    await page.goto(route('admin.users.index', {
      qs: {
        page: 2
      }
    }))
    assert.lengthOf(await page.$$('tbody tr'), 3)
  })

  test('should find specific user', async ({ assert, login, page,  route }) => {
    const user = await UserFactory
    .merge({ password: 'secret', email: 'virk@adonisjs.com', roleId: Roles.ADMIN })
    .create()

    await UserFactory.createMany(12)

    await login(user.email, 'secret')
    await page.goto(route('admin.users.index'))

    await page.getByPlaceholder('search').fill('virk@adonisjs.com')
    await page.keyboard.press('Enter');
    await sleep(500)

    assert.lengthOf(await page.$$('tbody tr'), 1)
  })
})
// TODO
// test connexion member, no access (dir auth)
// test filter
// test reset filter
