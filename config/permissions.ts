/**
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */
import { PermissionsConfigContract } from '@ioc:Verful/Permissions'

const permissionsConfig: PermissionsConfigContract = {
  tableNames: {
    permissions: 'permissions',
    roles: 'roles',
    roleHasPermissions: 'role_has_permissions'
  }
}

export default permissionsConfig
