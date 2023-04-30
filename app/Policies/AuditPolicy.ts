import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'

export default class AuditPolicy extends BasePolicy {
  public async viewList(currentUser: User) {
    return currentUser.isAdmin
  }

  public async show(currentUser: User) {
    return currentUser.isAdmin
  }
}
