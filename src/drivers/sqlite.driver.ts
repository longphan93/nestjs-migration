import { ColumnTypeEnum } from '../enums';
import { DbDriver } from './db.driver';

export class SqliteDriver extends DbDriver {
  mapColumnType(type: ColumnTypeEnum): string {
    switch (type) {
      case ColumnTypeEnum.UUID:
      case ColumnTypeEnum.STRING:
      case ColumnTypeEnum.TEXT:
      case ColumnTypeEnum.TIMESTAMP: // store timestamp as TEXT
        return 'TEXT';
      case ColumnTypeEnum.INTEGER:
        return 'INTEGER';
      case ColumnTypeEnum.BOOLEAN:
        return 'INTEGER';
      case ColumnTypeEnum.FLOAT:
      case ColumnTypeEnum.DOUBLE:
      case ColumnTypeEnum.DECIMAL:
        return 'REAL';
      default:
        throw new Error(`Unsupported column type for SQLite: ${type as string}`);
    }
  }
}
