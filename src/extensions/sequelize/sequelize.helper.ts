import { DataTypes, ModelAttributeColumnOptions } from 'sequelize';
import { DbDriver } from '../../drivers';
import { ColumnTypeEnum } from '../../enums';
import { TableColumnOptions } from '../../types';

export function mapDataTypes(options: TableColumnOptions): ModelAttributeColumnOptions['type'] {
  const constructorMap: Record<ColumnTypeEnum, ModelAttributeColumnOptions['type']> = {
    [ColumnTypeEnum.UUID]: DataTypes.UUID,
    [ColumnTypeEnum.STRING]: DataTypes.STRING(options.length),
    [ColumnTypeEnum.TEXT]: DataTypes.TEXT,
    [ColumnTypeEnum.INTEGER]: DataTypes.INTEGER,
    [ColumnTypeEnum.BOOLEAN]: DataTypes.BOOLEAN,
    [ColumnTypeEnum.TIMESTAMP]: DataTypes.DATE,
    [ColumnTypeEnum.FLOAT]: DataTypes.FLOAT(options.precision, options.scale),
    [ColumnTypeEnum.DOUBLE]: DataTypes.DOUBLE(options.precision, options.scale),
    [ColumnTypeEnum.DECIMAL]: DataTypes.DECIMAL(options.precision, options.scale),
  };

  if (!constructorMap[options.type!]) {
    throw new Error(`Unsupported column type for Sequelize: ${options.type as string}`);
  }

  return constructorMap[options.type!];
}

export function createTableColumn(
  options: TableColumnOptions,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _: DbDriver,
): ModelAttributeColumnOptions {
  return {
    type: mapDataTypes(options),
    allowNull: options.isNullable,
    unique: options.isUnique,
    primaryKey: options.isPrimary,
    defaultValue: options.default,
    autoIncrement: options.autoIncrement,
  };
}
