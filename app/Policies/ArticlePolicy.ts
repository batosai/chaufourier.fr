import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import Article from 'App/Models/Article'
import User from 'App/Models/User'

export default class ArticlePolicy extends BasePolicy {
  public async viewList(currentUser: User) {
    return currentUser.isAdmin
  }

  public async create(currentUser: User) {
    return currentUser.isAdmin
  }

  public async update(currentUser: User, article: Article) {
    return currentUser.isAdmin || currentUser.id === article.userId
  }

  public async delete(currentUser: User, article: Article) {
    return currentUser.isAdmin || currentUser.id === article.userId
  }

  public async seo(currentUser: User, article: Article) {
    return currentUser.isAdmin || currentUser.id === article.userId
  }

  public async preview(currentUser: User, article: Article) {
    return currentUser.isAdmin || currentUser.id === article.userId
  }
}
