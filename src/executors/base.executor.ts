import { CreatePrimaryKeyAction } from 'src/actions/create-primary-key.action';
import { CreateIndexAction, CreateForeignKeyAction } from '../actions';
import { TableColumnOptions } from '../types';
import { DbDriver, makeDbDriver } from '../drivers';

export abstract class BaseExecutor {
  protected driver: DbDriver;

  constructor(driver: string) {
    this.driver = makeDbDriver(driver);
  }

  abstract createTable(name: string, columns: TableColumnOptions[]): Promise<void>;
  abstract createColumn(table: string, column: TableColumnOptions): Promise<void>;
  abstract createIndex(table: string, action: CreateIndexAction): Promise<void>;
  abstract createForeignKey(table: string, action: CreateForeignKeyAction): Promise<void>;
  abstract createPrimary(table: string, action: CreatePrimaryKeyAction): Promise<void>;
  abstract dropTable(name: string): Promise<void>;
  abstract dropColumn(table: string, column: string): Promise<void>;
  abstract runSQL(query: string): Promise<void>;
}
