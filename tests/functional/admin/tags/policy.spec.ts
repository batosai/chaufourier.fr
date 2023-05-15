import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import UserFactory from 'Database/factories/UserFactory'
import TagFactory from 'Database/factories/TagFactory'
import Roles from 'App/Enums/Roles'
import User from 'App/Models/User'


test.group('tag policy actions', (group) => {
  let user: User | null  = null
  let admin: User | null  = null

  group.each.setup(async () => {
    await Database.beginGlobalTransaction()

    admin = await UserFactory.merge({
      role: Roles.ADMIN,
    }).create()

    user = await UserFactory.merge({
      role: Roles.USER,
    }).create()

    return () => Database.rollbackGlobalTransaction()
  })

  test('A admin can delete tag', async ({ client, route }) => {
    const tag = await TagFactory.create()

    const response = await client
      .delete(route('admin.tags.destroy', tag))
      .withCsrfToken()
      .loginAs(admin!)

      response.assertStatus(200)
  })

  test('A user can not delete tag', async ({ client, route }) => {
    const tag = await TagFactory.create()

    const response = await client
      .delete(route('admin.users.destroy', tag))
      .withCsrfToken()
      .loginAs(user!)

      response.assertStatus(404)
  })
})
