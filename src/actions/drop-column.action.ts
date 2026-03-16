import { BaseExecutor } from 'src/executors';
import { BaseAction } from './base.action';

export class DropColumnAction extends BaseAction {
  constructor(public column: string) {
    super();
  }

  execute(executor: BaseExecutor, table: string): Promise<void> {
    return executor.dropColumn(table, this.column);
  }
}
