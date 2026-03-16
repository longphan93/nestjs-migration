import { ColumnTypeEnum } from 'src/enums';

export type TableColumnOptions = {
  name: string;
  type?: ColumnTypeEnum;

  length?: number;
  precision?: number;
  scale?: number;

  autoIncrement?: boolean;
  isPrimary?: boolean;
  isNullable?: boolean;
  isUnique?: boolean;
  default?: any;
};
