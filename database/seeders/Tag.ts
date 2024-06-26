import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Tag from 'App/Models/Tag'

export default class extends BaseSeeder {
  public async run() {
    await Tag.createMany([
      { name: 'adonisjs', slug: 'adonisjs' },
      { name: 'ruby on rails', slug: 'ruby-on-rails' },
      { name: 'ruby', slug: 'ruby' },
      { name: 'javascript', slug: 'javascript' },
      { name: 'html', slug: 'html' },
      { name: 'css', slug: 'css' },
      { name: 'typescript', slug: 'typescript' },
      { name: 'nodejs', slug: 'nodejs' },
      { name: 'php', slug: 'php' },
      { name: 'bash', slug: 'bash' },
      { name: 'git', slug: 'git' },
      { name: 'trick', slug: 'trick' },
      { name: 'tuto', slug: 'tuto' },
      { name: 'side project', slug: 'side-project' },
      { name: 'elasticsearch', slug: 'elasticsearch' },
    ])
  }
}
