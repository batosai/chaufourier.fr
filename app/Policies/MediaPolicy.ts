import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import Media from 'App/Models/Media'

export default class MediaPolicy extends BasePolicy {
	public async viewList(currentUser: User) {
    return currentUser.isAdmin
  }
	public async create(currentUser: User) {
    return currentUser.isAdmin
  }
	public async update(currentUser: User, media: Media) {
    return currentUser.isAdmin || currentUser.id === media.userId
  }
	public async delete(currentUser: User, media: Media) {
    return currentUser.isAdmin || currentUser.id === media.userId
  }
}
