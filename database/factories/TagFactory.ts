import Factory from '@ioc:Adonis/Lucid/Factory'
import Tag from 'App/Models/Tag'

export default Factory.define(Tag, async ({ faker }) => {
  return {
    name: faker.lorem.word(),
  }
}).build()
