/**
 * Contract source: https://git.io/JfefG
 *
 * Feel free to let us know via PR, if you find something broken in this contract
 * file.
 */

import { ModelObject } from '@ioc:Adonis/Lucid/Orm'

declare module '@ioc:Adonis/Core/Event' {
  /*
  |--------------------------------------------------------------------------
  | Define typed events
  |--------------------------------------------------------------------------
  |
  | You can define types for events inside the following interface and
  | AdonisJS will make sure that all listeners and emit calls adheres
  | to the defined types.
  |
  | For example:
  |
  | interface EventsList {
  |   'new:user': UserModel
  | }
  |
  | Now calling `Event.emit('new:user')` will statically ensure that passed value is
  | an instance of the the UserModel only.
  |
  */

  interface NewAudit {
    label: string
    username: string
    userId: string | number
    action: 'CREATE' | 'DELETE' | 'UPDATE' | 'IMPERSONATE'
    target?: 'ARTICLE' | 'USER' | 'TAG' | 'MEDIA' | 'SEO' | 'REDIRECT'
    targetId?: string | number
    payload?: JSON | ModelObject
  }

  interface EventsList {
    'audit:new': NewAudit
  }
}
