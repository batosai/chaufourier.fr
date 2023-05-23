import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'

export default class ArticlePolicy extends BasePolicy {
  public async viewList(currentUser: User) {
    return currentUser.isAdmin
  }

  public async create(currentUser: User) {
    return currentUser.isAdmin
  }

  public async update(currentUser: User) {
    return currentUser.isAdmin
  }

  public async delete(currentUser: User) {
    return currentUser.isAdmin
  }
}
