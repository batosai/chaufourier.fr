import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'

export default class HealthPolicy extends BasePolicy {
  public async view(currentUser: User) {
    return currentUser.isAdmin
  }
}
