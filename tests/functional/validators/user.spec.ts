import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import I18n from '@ioc:Adonis/Addons/I18n'
import UserFactory from 'Database/factories/UserFactory'

test.group('user validator', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Invalid required', async ({ client, route }) => {

  })

  test('Invalid min lenght lastname and firstname', async ({ client, route }) => {

  })

  test('Invalid max lenght lastname and firstname', async ({ client, route }) => {

  })

  test('Invalid format email', async ({ client, route }) => {

  })

  test('Invalid unique email', async ({ client, route }) => {

  })

  test('Invalid password', async ({ client, route }) => {

  })

  test('authorize disabled user', async ({ client, route }) => {

  })

  test('unauthorize disabled user', async ({ client, route }) => {

  })

  test('authorize change role user', async ({ client, route }) => {

  })

  test('unauthorize change role user', async ({ client, route }) => {

  })

})

