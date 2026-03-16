import { ColumnTypeEnum } from '../enums';
import { DbDriver } from './db.driver';

export class MySqlDriver extends DbDriver {
  mapColumnType(type: ColumnTypeEnum): string {
    switch (type) {
      case ColumnTypeEnum.UUID:
        return 'VARCHAR(36)';
      case ColumnTypeEnum.STRING:
        return 'VARCHAR';
      case ColumnTypeEnum.TEXT:
        return 'TEXT';
      case ColumnTypeEnum.TIMESTAMP:
        return 'TIMESTAMP';
      case ColumnTypeEnum.INTEGER:
        return 'INT';
      case ColumnTypeEnum.BOOLEAN:
        return 'TINYINT(1)';
      case ColumnTypeEnum.FLOAT:
        return 'FLOAT';
      case ColumnTypeEnum.DOUBLE:
        return 'DOUBLE';
      case ColumnTypeEnum.DECIMAL:
        return 'DECIMAL';
      default:
        throw new Error(`Unsupported column type for MySQL: ${type as string}`);
    }
  }
}
