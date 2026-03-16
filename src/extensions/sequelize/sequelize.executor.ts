import { QueryInterface } from 'sequelize';
import { CreateIndexAction, CreateForeignKeyAction, CreatePrimaryKeyAction } from '../../actions';
import { BaseExecutor } from '../../executors';
import { TableColumnOptions } from '../../types';
import { createTableColumn } from './sequelize.helper';

export class SequelizeExecutor extends BaseExecutor {
  constructor(
    private queryInterface: QueryInterface,
    driver: string,
  ) {
    super(driver);
  }

  async createTable(name: string, columns: TableColumnOptions[]): Promise<void> {
    const attributes = columns.reduce(
      (attributes, column) => {
        attributes[column.name] = createTableColumn(column, this.driver);
        return attributes;
      },
      {} as Record<string, any>,
    );
    await this.queryInterface.createTable(name, attributes);
  }

  async createColumn(table: string, column: TableColumnOptions): Promise<void> {
    await this.queryInterface.addColumn(table, column.name, createTableColumn(column, this.driver));
  }

  async createIndex(table: string, action: CreateIndexAction): Promise<void> {
    await this.queryInterface.addIndex(table, {
      name: action.constraintName,
      fields: action.columns,
    });
  }

  async createForeignKey(table: string, action: CreateForeignKeyAction): Promise<void> {
    await this.queryInterface.addConstraint(table, {
      fields: action.columns,
      type: 'foreign key',
      name: action.constraintName,
      references: {
        table: action.referenceTable,
        field: action.referenceColumns[0],
      },
      onDelete: action.onDelete ?? 'CASCADE',
      onUpdate: action.onUpdate ?? 'CASCADE',
    });
  }

  async createPrimary(table: string, action: CreatePrimaryKeyAction): Promise<void> {
    await this.queryInterface.addConstraint(table, {
      type: 'primary key',
      fields: action.columns,
      name: action.constraintName,
    });
  }

  async dropTable(name: string): Promise<void> {
    await this.queryInterface.dropTable(name);
  }

  async dropColumn(table: string, column: string): Promise<void> {
    await this.queryInterface.removeColumn(table, column);
  }

  async runSQL(query: string): Promise<void> {
    await this.queryInterface.sequelize.query(query);
  }
}
