import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import Drive from '@ioc:Adonis/Core/Drive'
import { file } from '@ioc:Adonis/Core/Helpers'
import UserFactory from 'Database/factories/UserFactory'
import Roles from 'App/Enums/Roles'
import User from 'App/Models/User'


test.group('user avatar', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('A user can update avatar', async ({ client, assert, route }) => {
    const fakeDrive = Drive.fake()

    const user = await UserFactory.merge({
      role: Roles.ADMIN,
    }).create()

    const fakeAvatar = await file.generatePng('1mb')

    await client
      .put(route('admin.users.update', user))
      .withCsrfToken()
      .loginAs(user)
      .fields({
        lastname: user.lastname,
        firstname: user.firstname,
        email: user.email,
      })
      .file('avatar', fakeAvatar.contents, { filename: fakeAvatar.name })

    assert.isTrue(await fakeDrive.exists(fakeAvatar.name))

    Drive.restore()
  })
})
