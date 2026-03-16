import { ColumnOptionsStep, ColumnPrimaryStep, ColumnTypeStep } from './column-builder-step';
import { BaseAction, CreateForeignKeyAction, CreateIndexAction } from '../../actions';
import { TableColumnOptions } from '../../types';
import { ColumnTypeEnum } from '../../enums';

export class ColumnBuilder implements ColumnTypeStep, ColumnPrimaryStep, ColumnOptionsStep {
  private options: TableColumnOptions;
  public actions: BaseAction[] = [];

  static new(name: string): ColumnBuilder {
    const builder = new ColumnBuilder();
    builder.options = { name, isNullable: false };
    return builder;
  }

  uuid(): ColumnOptionsStep & ColumnPrimaryStep {
    this.options.type = ColumnTypeEnum.UUID;
    return this;
  }

  integer(): ColumnOptionsStep & ColumnPrimaryStep {
    this.options.type = ColumnTypeEnum.INTEGER;
    return this;
  }

  boolean(): ColumnOptionsStep {
    this.options.type = ColumnTypeEnum.BOOLEAN;
    return this;
  }

  string(length: number = 255): ColumnOptionsStep {
    this.options.type = ColumnTypeEnum.STRING;
    this.options.length = length;
    return this;
  }

  text(): ColumnOptionsStep {
    this.options.type = ColumnTypeEnum.TEXT;
    return this;
  }

  timestamp(): ColumnOptionsStep {
    this.options.type = ColumnTypeEnum.TIMESTAMP;
    return this;
  }

  float(precision?: number, scale?: number): ColumnOptionsStep {
    this.options.type = ColumnTypeEnum.FLOAT;
    this.options.precision = precision;
    this.options.scale = scale;
    return this;
  }

  double(precision?: number, scale?: number): ColumnOptionsStep {
    this.options.type = ColumnTypeEnum.DOUBLE;
    this.options.precision = precision;
    this.options.scale = scale;
    return this;
  }

  decimal(precision?: number, scale?: number): ColumnOptionsStep {
    this.options.type = ColumnTypeEnum.DECIMAL;
    this.options.precision = precision;
    this.options.scale = scale;
    return this;
  }

  primary(): ColumnPrimaryStep {
    this.options.isPrimary = true;
    return this;
  }

  nullable(): ColumnOptionsStep {
    this.options.isNullable = true;
    return this;
  }

  unique(): ColumnOptionsStep {
    this.options.isUnique = true;
    return this;
  }

  default(value: any): ColumnOptionsStep & ColumnPrimaryStep {
    this.options.default = value;
    return this;
  }

  autoIncrement(): ColumnPrimaryStep {
    this.options.autoIncrement = true;
    return this;
  }

  index(): ColumnOptionsStep {
    this.actions.push(new CreateIndexAction([this.options.name]));
    return this;
  }

  foreign(referenceTable: string, referenceColumn?: string): ColumnOptionsStep {
    this.actions.push(
      new CreateForeignKeyAction(
        [this.options.name],
        referenceTable,
        referenceColumn ? [referenceColumn] : ['id'],
      ),
    );
    return this;
  }

  build(): TableColumnOptions {
    if (!this.options.type) {
      throw new Error(`Column type is not defined for column: ${this.options.name}`);
    }
    return this.options;
  }
}
