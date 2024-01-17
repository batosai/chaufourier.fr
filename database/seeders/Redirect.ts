import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Redirect from 'App/Models/Redirect'

export default class extends BaseSeeder {
  public static environment = ['development']

  public async run() {
    await Redirect.createMany([
      { source: '/tips', destination: '/blog', code: 301 },
      {
        source: '/tips/elasticsearch',
        destination: '/blog/gestion-des-indexes-elasticsearch-avec-curl',
        code: 301,
      },
      { source: '/tips/solidus-regenerer-les-images', destination: '/blog', code: 301 },
      {
        source: '/tips/separateur-de-rupture-de-mot',
        destination: '/blog/comprendre-limportance-du-separateur-de-rupture-de-mot-dans-les-url',
        code: 301,
      },
      {
        source: '/tips/datetime-en-millisecondes',
        destination: '/blog/obtenir-une-date-en-millisecondes-en-ruby',
        code: 301,
      },
      {
        source: '/tips/case-sensitive-git',
        destination: '/blog/utilisation-de-la-commande-git-mv-pour-renommer-des-fichiers-dans-git',
        code: 301,
      },
      {
        source: '/tips/autofocus',
        destination: '/blog/utilisation-de-l-attribut-html-autofocus',
        code: 301,
      },
      {
        source: '/tips/comment-ajouter-une-classe-a-un-element-en-javascript-vanilla',
        destination: '/blog/ajout-de-classes-css-en-javascript',
        code: 301,
      },
      // { source: '', destination: '', code: 301 },
    ])
  }
}
