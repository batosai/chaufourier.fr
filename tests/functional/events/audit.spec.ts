import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import Event from '@ioc:Adonis/Core/Event'
import UserFactory from 'Database/factories/UserFactory'
import Roles from 'App/Enums/Roles'
import User from 'App/Models/User'
import { faker } from '@faker-js/faker'

test.group('Audit event', (group) => {
  let user: User | null  = null

  group.each.setup(async () => {
    await Database.beginGlobalTransaction()

    user = await UserFactory.merge({
      role: Roles.ADMIN,
    }).create()

    return () => Database.rollbackGlobalTransaction()
  })

  test('create User', async ({ assert, client, route }) => {
    const emitter = Event.fake()

    await client
      .post(route('admin.users.store'))
      .fields({
        lastname: faker.person.lastName(),
        firstname: faker.person.firstName(),
        email: faker.internet.email(),
        role: Roles.USER,
        password: 'Secret@123',
        password_confirmation: 'Secret@123'
      })
      .withCsrfToken()
      .loginAs(user!)

      assert.isTrue(emitter.exists((event) => {
        return event.name === 'audit:new' && event.data.action === 'CREATE'
      }))

      Event.restore()
  })

  test('delete User', async ({ assert, client, route }) => {
    const emitter = Event.fake()

    const customer = await UserFactory.merge({
      role: Roles.USER,
    }).create()

    await client
      .delete(route('admin.users.destroy', customer))
      .withCsrfToken()
      .loginAs(user!)

      assert.isTrue(emitter.exists((event) => {
        return event.name === 'audit:new' && event.data.action === 'DELETE'
      }))

      Event.restore()
  })

  test('update User', async ({ assert, client, route }) => {
    const emitter = Event.fake()

    const customer = await UserFactory.merge({
      role: Roles.USER,
    }).create()

    await client
      .put(route('admin.users.update', customer))
      .fields({
        lastname: faker.person.lastName(),
        firstname: customer.firstname,
        email: customer.email,
        role: Roles.USER
      })
      .withCsrfToken()
      .loginAs(user!)

      assert.isTrue(emitter.exists((event) => {
        return event.name === 'audit:new' && event.data.action === 'UPDATE'
      }))

      Event.restore()
  })

  test('impersonate User', async ({ assert, client, route }) => {
    const emitter = Event.fake()

    const customer = await UserFactory.merge({
      role: Roles.USER,
    }).create()

    await client
      .post(route('impersonate.store', customer))
      .withCsrfToken()
      .loginAs(user!)

      assert.isTrue(emitter.exists((event) => {
        return event.name === 'audit:new' && event.data.action === 'IMPERSONATE'
      }))

      Event.restore()
  })

})
