import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import UserFactory from 'Database/factories/UserFactory'
import I18n from '@ioc:Adonis/Addons/I18n'

test.group('Login page', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Should display login page', async ({ visit, route }) => {
    const page = await visit(route('auth.session.create'))

    await page.assertExists('input[name="email"]')
  })

  test('Should display error message if validation with empty fields', async ({ visit, route }) => {
    const page = await visit(route('auth.session.create'))
    await page.locator('text=validate').click()

    await page.assertElementsCount(await page.getByText(/Invalid credentials/), 1)
  })

  test('Should display admin after validation login form', async ({ visit, route }) => {
    const user = await UserFactory.merge({ password: 'secret' }).create()

    const page = await visit(route('auth.session.create'))

    await page.locator('input[name="email"]').fill(user.email)
    await page.locator('input[name="password"]').fill('secret')

    // await page.pause()

    await page.locator('text=validate').click()

    // await page.screenshot({ path: 'screenshot.png', fullPage: true })

    await page.assertElementsCount(
      await page.getByText(I18n.locale(I18n.defaultLocale).formatMessage('form.success.session')),
      1
    )
  })

  test('Should display error message for blocked user', async ({ visit, route }) => {
    const user = await UserFactory.apply('disabled').merge({ password: 'secret' }).create()

    const page = await visit(route('auth.session.create'))

    await page.locator('input[name="email"]').fill(user.email)
    await page.locator('input[name="password"]').fill('secret')
    await page.locator('text=validate').click()

    await page.assertTextContains('body', 'Your account is disabled')
  })

  test('Should create cookie after check remember me', async ({ visit, route }) => {
    const user = await UserFactory.merge({ password: 'secret' }).create()

    const page = await visit(route('auth.session.create'))

    await page.locator('input[name="email"]').fill(user.email)
    await page.locator('input[name="password"]').fill('secret')
    await page.getByLabel('Remember me').click()
    await page.locator('text=validate').click()

    await page.assertCookie('remember_web')
  })
})
