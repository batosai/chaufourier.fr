import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import UserFactory from 'Database/factories/UserFactory'


test.group('Admin', group => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('should access', async ({ assert, page, route, login, getScreen }) => {
    const user = await UserFactory
      .merge({ password: 'secret' })
      .create()

    await login(user.email, 'secret')

    await page.goto(route('admin.dashboard.index'))

    let screen = await getScreen()

    assert.exists(await screen.findByText(/admin/))
  })
})
