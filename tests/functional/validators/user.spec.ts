import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import I18n from '@ioc:Adonis/Addons/I18n'
import UserFactory from 'Database/factories/UserFactory'
import Roles from 'App/Enums/Roles'
import { faker } from '@faker-js/faker'
import { PASSWORD_MIN_LENGTH } from 'App/Validators/Rules/Password'
import { MIN_LENGTH, MAX_LENGTH } from 'App/Validators/admin/UserValidator'
import User from 'App/Models/User'



test.group('user validator', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Invalid required', async ({ client, route }) => {
    const user = await UserFactory.merge({
      role: Roles.ADMIN,
    }).create()

    const response = await client
      .post(route('admin.users.store'))
      .redirects(0)
      .withCsrfToken()
      .loginAs(user)

    // console.log(response.flashMessages())

    response.assertFlashMessage('errors', {
      firstname: [I18n.locale(I18n.defaultLocale).formatMessage('validator.shared.firstname.required')],
      lastname: [I18n.locale(I18n.defaultLocale).formatMessage('validator.shared.lastname.required')],
      email: [I18n.locale(I18n.defaultLocale).formatMessage('validator.shared.email.required')],
      role: [I18n.locale(I18n.defaultLocale).formatMessage('validator.shared.role.required')],
    })
  })

  test('Invalid min lenght lastname and firstname', async ({ client, route }) => {
    const user = await UserFactory.merge({
      role: Roles.ADMIN,
    }).create()

    const response = await client
      .post(route('admin.users.store'))
      .fields({
        lastname: 'a',
        firstname: 'b',
        email: faker.internet.email(),
        role: Roles.USER,
      })
      .redirects(0)
      .withCsrfToken()
      .loginAs(user)

    response.assertFlashMessage('errors', {
      firstname: [I18n.locale(I18n.defaultLocale).formatMessage('validator.shared.firstname.minLength', { min_length: MIN_LENGTH })],
      lastname: [I18n.locale(I18n.defaultLocale).formatMessage('validator.shared.lastname.minLength', { min_length: MIN_LENGTH })],
    })
  })

  test('Invalid max lenght lastname and firstname', async ({ client, route }) => {
    const user = await UserFactory.merge({
      role: Roles.ADMIN,
    }).create()

    const response = await client
      .post(route('admin.users.store'))
      .fields({
        lastname: faker.lorem.words(51),
        firstname: faker.lorem.words(51),
        email: faker.internet.email(),
        role: Roles.USER,
      })
      .redirects(0)
      .withCsrfToken()
      .loginAs(user)

    response.assertFlashMessage('errors', {
      firstname: [I18n.locale(I18n.defaultLocale).formatMessage('validator.shared.firstname.maxLength', { max_length: MAX_LENGTH })],
      lastname: [I18n.locale(I18n.defaultLocale).formatMessage('validator.shared.lastname.maxLength', { max_length: MAX_LENGTH })],
    })
  })

  test('Invalid format email', async ({ client, route }) => {
    const user = await UserFactory.merge({
      role: Roles.ADMIN,
    }).create()

    const response = await client
      .post(route('admin.users.store'))
      .fields({
        lastname: faker.name.lastName(),
        firstname: faker.name.firstName(),
        email: 'jeremadonis.com',
        role: Roles.USER,
      })
      .redirects(0)
      .withCsrfToken()
      .loginAs(user)

    response.assertFlashMessage('errors', {
      email: [I18n.locale(I18n.defaultLocale).formatMessage('validator.shared.email.email')],
    })
  })

  test('Invalid unique email', async ({ client, route }) => {
    const user = await UserFactory.merge({
      role: Roles.ADMIN,
    }).create()

    const response = await client
      .post(route('admin.users.store'))
      .fields({
        lastname: faker.name.lastName(),
        firstname: faker.name.firstName(),
        email: user.email,
        role: Roles.USER,
      })
      .redirects(0)
      .withCsrfToken()
      .loginAs(user)

    response.assertFlashMessage('errors', {
      email: [I18n.locale(I18n.defaultLocale).formatMessage('validator.shared.email.unique')],
    })
  })

  test('Invalid password', async ({ client, route }) => {
    const user = await UserFactory.merge({
      role: Roles.ADMIN,
    }).create()

    const response = await client
      .post(route('admin.users.store'))
      .fields({
        lastname: faker.name.lastName(),
        firstname: faker.name.firstName(),
        email: faker.internet.email(),
        role: Roles.USER,
        password: '.',
        password_confirmation: '.'
      })
      .redirects(0)
      .withCsrfToken()
      .loginAs(user)

    response.assertFlashMessage('errors', {
      password: [
        I18n.locale(I18n.defaultLocale).formatMessage('validator.shared.password.minLength', { password_min_length: PASSWORD_MIN_LENGTH }),
        I18n.locale(I18n.defaultLocale).formatMessage('validator.shared.password.oneLowerCaseAtLeast'),
        I18n.locale(I18n.defaultLocale).formatMessage('validator.shared.password.oneNumericAtLeast'),
        I18n.locale(I18n.defaultLocale).formatMessage('validator.shared.password.oneUpperCaseAtLeast'),
        I18n.locale(I18n.defaultLocale).formatMessage('validator.shared.password.oneSpecialCharacterAtLeast'),
      ],
    })
  })

  test('authorize disabled user', async ({ client, route }) => {
    const user = await UserFactory.merge({
      role: Roles.ADMIN,
    }).create()
    const customer = await UserFactory.create()

    const response = await client
      .patch(route('admin.users.toggle.disabled', customer))
      .redirects(0)
      .withCsrfToken()
      .loginAs(user)

    response.assertFlashMessage('success', {
      message: I18n.locale(I18n.defaultLocale).formatMessage('form.success.user.toggle.disabled')
    })
  })

  test('unauthorize disabled user', async ({ client, route }) => {
    const user = await UserFactory.merge({
      role: Roles.ADMIN,
    }).create()

    const response = await client
      .patch(route('admin.users.toggle.disabled', user))
      .redirects(0)
      .withCsrfToken()
      .loginAs(user)

    response.assertStatus(403)
  })

  test('authorize change role user', async ({ client, route, assert }) => {
    const user = await UserFactory.merge({
      role: Roles.ADMIN,
    }).create()
    const customer = await UserFactory.create()

    await client
      .put(route('admin.users.update', customer))
      .fields({
        firstname: customer.firstname,
        lastname: customer.lastname,
        email: customer.email,
        role: Roles.ADMIN,
      })
      .redirects(0)
      .withCsrfToken()
      .loginAs(user)

    const customerUpdate = await User.findBy('email', customer.email)

    assert.equal(customerUpdate?.role, Roles.ADMIN)
  })

  test('unauthorize change role user', async ({ client, route, assert }) => {
    const user = await UserFactory.merge({
      role: Roles.ADMIN,
    }).create()

    await client
      .put(route('admin.users.update', user))
      .fields({
        role: Roles.USER,
      })
      .redirects(0)
      .withCsrfToken()
      .loginAs(user)

    assert.equal(user.role, Roles.ADMIN)
  })

})

