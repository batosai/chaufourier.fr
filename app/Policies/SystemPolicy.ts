import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'

export default class SystemPolicy extends BasePolicy {
  public async index(currentUser: User) {
    return currentUser.isAdmin
  }
}
