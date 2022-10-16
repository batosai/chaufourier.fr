import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'

test.group('Forgot password page', group => {

  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Should display error message if validation with empty fields', async ({ assert, page, route, getScreen }) => {
    await page.goto(route('auth.password.create'))

    let screen = await getScreen()

    await page.locator('text=validate').click()

    screen = await getScreen()

    assert.exists(await screen.findByText(/Email field is required/))
  })
})
