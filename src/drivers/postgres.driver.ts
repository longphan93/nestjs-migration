import { ColumnTypeEnum } from '../enums';
import { DbDriver } from './db.driver';

export class PostgresDriver extends DbDriver {
  mapColumnType(type: ColumnTypeEnum): string {
    switch (type) {
      case ColumnTypeEnum.UUID:
        return 'UUID';
      case ColumnTypeEnum.STRING:
        return `CHARACTER VARYING`;
      case ColumnTypeEnum.TEXT:
        return 'TEXT';
      case ColumnTypeEnum.INTEGER:
        return 'INTEGER';
      case ColumnTypeEnum.BOOLEAN:
        return 'BOOLEAN';
      case ColumnTypeEnum.FLOAT:
        return 'REAL';
      case ColumnTypeEnum.DOUBLE:
        return 'DOUBLE PRECISION';
      case ColumnTypeEnum.DECIMAL:
        return 'DECIMAL';
      case ColumnTypeEnum.TIMESTAMP:
        return 'TIMESTAMP';
      default:
        throw new Error(`Unsupported column type for Postgres: ${type as string}`);
    }
  }
}
