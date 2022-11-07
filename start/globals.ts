import View from '@ioc:Adonis/Core/View'
import UserStatus from 'App/Enums/UserStatus'
import Roles from 'App/Enums/Roles'

View.global('UserStatus', UserStatus)
View.global('Roles', Roles)
