import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import UserFactory from 'Database/factories/UserFactory'

test.group('Auth', group => {

  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Should display login page', async ({ assert, page, route, getScreen }) => {
    await page.goto(route('auth.session.create'))
    let screen = await getScreen()

    assert.exists(await screen.findByText(/Your email/))
  })

  test('Should display error message if validation with empty fields', async ({ assert, page, route, getScreen }) => {
    await page.goto(route('auth.session.create'))

    let screen = await getScreen()

    await page.locator('text=Login').click()

    screen = await getScreen()

    assert.exists(await screen.findByText(/Invalid credentials/))
  })

  test('Should display admin after validation login form', async ({ assert, page, route, getScreen }) => {
    const user = await UserFactory
      .merge({ password: 'secret' })
      .create()

    await page.goto(route('auth.session.create'))

    await page.getByLabel('Your email').fill(user.email)
    await page.getByText('Your password').fill('secret')

    // await page.pause();

    await page.locator('text=Login').click()

    let screen = await getScreen()

    // await page.screenshot({ path: 'screenshot.png', fullPage: true })

    assert.exists(await screen.findByText(/admin/))
  })

  test('Should display error message for blocked user', async ({ assert, page, route, getScreen }) => {
    const user = await UserFactory
      .apply('disabled')
      .merge({ password: 'secret',  })
      .create()

    await page.goto(route('auth.session.create'))

    await page.getByLabel('Your email').fill(user.email)
    await page.getByLabel('Your password').fill('secret')
    await page.locator('text=Login').click()

    let screen = await getScreen()

    assert.exists(await screen.findByText('Your account is disabled'))
  })
})
