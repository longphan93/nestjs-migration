import { BaseAction } from './base.action';
import { BaseExecutor } from '../executors';

export class CreateIndexAction extends BaseAction {
  constructor(
    public columns: string[],
    public constraintName?: string,
  ) {
    super();
  }

  async execute(executor: BaseExecutor, table: string): Promise<void> {
    await executor.createIndex(table, this);
  }
}
