import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import UserFactory from 'Database/factories/UserFactory'
import Roles from 'App/Enums/Roles'
import User from 'App/Models/User'


test.group('User policy actions', (group) => {
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

  test('admin can not auto delete', async ({ client, route }) => {
    const response = await client
      .delete(route('admin.users.destroy', admin!))
      .withCsrfToken()
      .loginAs(admin!)

      response.assertStatus(403)
  })

  test('admin can not auto disabled', async ({ client, route }) => {
    const response = await client
      .patch(route('admin.users.toggle.disabled', admin!))
      .withCsrfToken()
      .loginAs(admin!)

      response.assertStatus(403)
  })

  test('admin can not auto forgot password', async ({ client, route }) => {
    const response = await client
      .post(route('admin.users.forgot.password', admin!))
      .withCsrfToken()
      .loginAs(admin!)

      response.assertStatus(403)
  })

  test('admin can not auto impersonate', async ({ client, route }) => {
    const response = await client
      .post(route('impersonate.store', admin!))
      .withCsrfToken()
      .loginAs(admin!)

      response.assertStatus(403)
  })

  // -----------------------

  test('admin can delete user', async ({ client, route }) => {
    const customer = await UserFactory.merge({
      role: Roles.USER,
    }).create()

    const response = await client
      .delete(route('admin.users.destroy', customer))
      .withCsrfToken()
      .loginAs(admin!)

      response.assertStatus(200)
  })

  test('admin can disabled user', async ({ client, route }) => {
    const customer = await UserFactory.merge({
      role: Roles.USER,
    }).create()

    const response = await client
      .patch(route('admin.users.toggle.disabled', customer))
      .withCsrfToken()
      .loginAs(admin!)

      response.assertStatus(200)
  })

  test('admin can forgot password user', async ({ client, route }) => {
    const customer = await UserFactory.merge({
      role: Roles.USER,
    }).create()

    const response = await client
      .post(route('admin.users.forgot.password', customer))
      .withCsrfToken()
      .loginAs(admin!)

      response.assertStatus(200)
  })

  test('admin can impersonate user', async ({ client, route }) => {
    const customer = await UserFactory.merge({
      role: Roles.USER,
    }).create()

    const response = await client
      .post(route('impersonate.store', customer))
      .withCsrfToken()
      .loginAs(admin!)

      response.assertStatus(200)
  })

  // -----------------------

  test('user can not delete user', async ({ client, route }) => {
    const customer = await UserFactory.merge({
      role: Roles.USER,
    }).create()

    const response = await client
      .delete(route('admin.users.destroy', customer))
      .withCsrfToken()
      .loginAs(user!)

      response.assertStatus(403)
  })

  test('user can not disabled user', async ({ client, route }) => {
    const customer = await UserFactory.merge({
      role: Roles.USER,
    }).create()

    const response = await client
      .patch(route('admin.users.toggle.disabled', customer))
      .withCsrfToken()
      .loginAs(user!)

      response.assertStatus(403)
  })

  test('user can not forgot password user', async ({ client, route }) => {
    const customer = await UserFactory.merge({
      role: Roles.USER,
    }).create()

    const response = await client
      .post(route('admin.users.forgot.password', customer))
      .withCsrfToken()
      .loginAs(user!)

      response.assertStatus(403)
  })

  test('user can not impersonate user', async ({ client, route }) => {
    const customer = await UserFactory.merge({
      role: Roles.USER,
    }).create()

    const response = await client
      .post(route('impersonate.store', customer))
      .withCsrfToken()
      .loginAs(user!)

      response.assertStatus(403)
  })
})
