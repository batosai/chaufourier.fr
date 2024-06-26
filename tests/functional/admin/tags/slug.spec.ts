import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import TagFactory from 'Database/factories/TagFactory'

test.group('Tag slug', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('has correct slug', async ({ assert }) => {
    const tag = await TagFactory.merge({
      name: 'My first t@g',
    }).create()

    assert.equal(tag.slug, 'my-first-tg')
  })
})
