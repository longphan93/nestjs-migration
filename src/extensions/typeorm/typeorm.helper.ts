import { TableColumn } from 'typeorm';
import { TableColumnOptions } from '../../types';
import { DbDriver } from '../../drivers';

export function createTableColumn(options: TableColumnOptions, driver: DbDriver): TableColumn {
  return new TableColumn({
    ...options,
    type: driver.mapColumnType(options.type!),
    length: options.length?.toString(),
    isGenerated: options.autoIncrement,
  });
}
