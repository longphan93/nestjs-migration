import { ColumnTypeEnum } from 'src/enums/column-type.enum';

export abstract class DbDriver {
  abstract mapColumnType(type: ColumnTypeEnum): string;
}
