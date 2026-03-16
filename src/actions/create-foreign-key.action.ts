import { BaseAction } from './base.action';
import { BaseExecutor } from '../executors';

export class CreateForeignKeyAction extends BaseAction {
  constructor(
    public columns: string[],
    public referenceTable: string,
    public referenceColumns: string[],
    public constraintName?: string,
    public onDelete?: 'CASCADE' | 'SET NULL' | 'RESTRICT' | 'NO ACTION',
    public onUpdate?: 'CASCADE' | 'SET NULL' | 'RESTRICT' | 'NO ACTION',
  ) {
    super();
  }

  async execute(executor: BaseExecutor, table: string): Promise<void> {
    await executor.createForeignKey(table, this);
  }
}
