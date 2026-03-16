import { DbDriver } from './db.driver';
import { MySqlDriver } from './mysql.driver';
import { PostgresDriver } from './postgres.driver';
import { SqliteDriver } from './sqlite.driver';

export * from './db.driver';

export function makeDbDriver(driverName: string): DbDriver {
  switch (driverName) {
    case 'sqlite':
      return new SqliteDriver();
    case 'postgres':
      return new PostgresDriver();
    case 'mysql':
      return new MySqlDriver();
    default:
      throw new Error(`Unsupported database driver: ${driverName}`);
  }
}
