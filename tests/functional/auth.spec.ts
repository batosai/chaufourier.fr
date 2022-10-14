import { test } from '@japa/runner'

test.group('Auth', () => {
  test('Should display login page', async ({ client, route }) => {
    const response = await client.get(route('auth.create'))

    response.assertStatus(200)
    response.assertTextIncludes('Your email')
  })
})
