import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'

export default class CachePolicy extends BasePolicy {
  public async clear(currentUser: User) {
    return currentUser.isAdmin
  }
}
