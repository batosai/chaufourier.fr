import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Article from 'App/Models/Article'
import User from 'App/Models/User'
import articles from './resources/articles'
import Tag from 'App/Models/Tag'

export default class extends BaseSeeder {
  public async run() {
    const user = await User.findBy('email', 'jeremy@chaufourier.fr')

    for (const source of articles) {
      const article = await Article.create({
        title: source.title,
        slug: source.slug,
        visible: source.visible,
        body: JSON.parse(source.body),
        publishedOn: source.publishedOn,
        imageId: null,
        userId: user!.id,
      })

      if (article.$isPersisted) {
        const tags: Array<Tag> = []
        for (const t of source.tags) {
          tags.push((await Tag.findBy('name', t))!)
        }
        await article.related('tags').sync(tags.map((t) => t.id))
        await article.save()
      }
    }
  }
}
