import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import UserFactory from 'Database/factories/UserFactory'
import Role from 'App/Enums/Roles'
import { sleep } from '../../../helpers'

test.group('Admin users', group => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('should access users list', async ({ assert, login, page,  route }) => {
    const user = await UserFactory
      .merge({ password: 'secret' })
      .create()
    user.assignRole(Role.ADMIN)

    await UserFactory.createMany(12)

    await login(user.email, 'secret')

    await page.goto(route('admin.users.index'))
    // await page.pause();

    assert.lengthOf((await page.$$('tbody tr')), 10)

    await page.goto(route('admin.users.index', {
      qs: {
        page: 2
      }
    }))
    assert.lengthOf((await page.$$('tbody tr')), 5)
  })

  test('should find specific user', async ({ assert, login, page,  route }) => {
    const user = await UserFactory
    .merge({ password: 'secret' })
    .create()
    user.assignRole(Role.ADMIN)

    await UserFactory.createMany(12)

    await login(user.email, 'secret')
    await page.goto(route('admin.users.index'))

    await page.getByPlaceholder('search').fill('virk@adonisjs.com')
    await page.keyboard.press('Enter');
    await sleep(500)

    assert.lengthOf((await page.$$('tbody tr')), 1)
  })
})
// TODO
// test ok, WTF error ?????
// test connexion member, no access
// replace getscreen and remove package playwright-testing-library
// test filter
