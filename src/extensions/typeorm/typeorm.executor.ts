import { CreateIndexAction, CreateForeignKeyAction, CreatePrimaryKeyAction } from '../../actions';
import { BaseExecutor } from '../../executors/base.executor';
import { QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';
import { TableColumnOptions } from '../../types';
import { createTableColumn } from './typeorm.helper';

export class TypeOrmExecutor extends BaseExecutor {
  constructor(
    private queryRunner: QueryRunner,
    driver: string,
  ) {
    super(driver);
  }

  async createTable(name: string, columns: TableColumnOptions[]): Promise<void> {
    const table = new Table();
    table.name = name;
    table.columns = columns.map((column) => createTableColumn(column, this.driver));
    await this.queryRunner.createTable(table);
  }

  async createColumn(table: string, column: TableColumnOptions): Promise<void> {
    await this.queryRunner.addColumn(table, createTableColumn(column, this.driver));
  }

  async createIndex(table: string, action: CreateIndexAction): Promise<void> {
    await this.queryRunner.createIndex(
      table,
      new TableIndex({
        columnNames: action.columns,
        name: action.constraintName,
      }),
    );
  }

  async createForeignKey(table: string, action: CreateForeignKeyAction): Promise<void> {
    await this.queryRunner.createForeignKey(
      table,
      new TableForeignKey({
        columnNames: action.columns,
        referencedTableName: action.referenceTable,
        referencedColumnNames: action.referenceColumns,
        onDelete: action.onDelete,
        onUpdate: action.onUpdate,
        name: action.constraintName,
      }),
    );
  }

  async createPrimary(table: string, action: CreatePrimaryKeyAction): Promise<void> {
    await this.queryRunner.createPrimaryKey(table, action.columns, action.constraintName);
  }

  async dropTable(name: string): Promise<void> {
    await this.queryRunner.dropTable(name);
  }

  async dropColumn(table: string, column: string): Promise<void> {
    await this.queryRunner.dropColumn(table, column);
  }

  async runSQL(query: string): Promise<void> {
    await this.queryRunner.query(query);
  }
}
