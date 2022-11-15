import View from '@ioc:Adonis/Core/View'
import Roles from 'App/Enums/Roles'
import UserStatus from 'App/Enums/UserStatus'

View.global('Roles', Roles)
View.global('UserStatus', UserStatus)
