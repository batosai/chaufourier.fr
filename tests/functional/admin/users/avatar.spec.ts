import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import Drive from '@ioc:Adonis/Core/Drive'
import { file } from '@ioc:Adonis/Core/Helpers'
import { faker } from '@faker-js/faker'
import UserFactory from 'Database/factories/UserFactory'
import Roles from 'App/Enums/Roles'

test.group('User avatar', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('user can create avatar', async ({ client, assert, route }) => {
    const fakeDrive = Drive.fake()

    const user = await UserFactory.merge({
      role: Roles.ADMIN,
    }).create()

    const fakeAvatar = await file.generatePng('1mb')

    await client
      .post(route('admin.users.store'))
      .withCsrfToken()
      .loginAs(user)
      .fields({
        lastname: faker.person.lastName(),
        firstname: faker.person.firstName(),
        email: faker.internet.email(),
        role: Roles.USER,
      })
      .file('avatar', fakeAvatar.contents, { filename: fakeAvatar.name })

    assert.isTrue(await fakeDrive.exists(fakeAvatar.name))

    Drive.restore()
  })

  test('user can update avatar', async ({ client, assert, route }) => {
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
