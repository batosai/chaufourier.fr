import { test } from '@japa/runner'

test.group('Admin', () => {
  test('Admin visit should redirect to login page', async ({ client, route }) => {
    const response = await client.get(route('admin.dashboard'))

    response.assertRedirectsToRoute('auth.session.create')
    response.assertTextIncludes('Unauthorized access')
  })
})
