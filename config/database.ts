/**
 * Config source: https://git.io/JesV9
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import Env from '@ioc:Adonis/Core/Env'
import Application from '@ioc:Adonis/Core/Application'
import { DatabaseConfig } from '@ioc:Adonis/Lucid/Database'

const databaseConfig: DatabaseConfig = {
  /*
  |--------------------------------------------------------------------------
  | Connection
  |--------------------------------------------------------------------------
  |
  | The primary connection for making database queries across the application
  | You can use any key from the `connections` object defined in this same
  | file.
  |
  */
  connection: Env.get('DB_CONNECTION'),

  connections: {
    pg: {
      client: 'pg',
      connection: {
        host: Env.get('PG_HOST'),
        port: Env.get('PG_PORT'),
        user: Env.get('PG_USER'),
        password: Env.get('PG_PASSWORD', ''),
        database: Env.get('PG_DB_NAME'),
      },
      migrations: {
        naturalSort: true,
        disableRollbacksInProduction: true,
      },
      useNullAsDefault: true,
      healthCheck: Env.get('NODE_ENV') === 'production',
      debug: Env.get('NODE_ENV') === 'development',
    },
    sqlite: {
      client: 'sqlite',
      connection: {
        filename:
          Env.get('NODE_ENV') === 'test'
            ? Application.tmpPath('db-test.sqlite3')
            : Application.tmpPath('db.sqlite3'),
      },
      pool: {
        afterCreate: (conn, cb) => {
          conn.run('PRAGMA foreign_keys=true', cb)
        },
      },
      seeders: {
        paths: ['./database/seeders/MainSeeder'],
      },
      migrations: {
        naturalSort: true,
      },
      useNullAsDefault: true,
      healthCheck: Env.get('NODE_ENV') === 'development',
      debug: Env.get('NODE_ENV') === 'development',
    },
  },
}

export default databaseConfig
