import { BaseExecutor } from 'src/executors/base.executor';

export abstract class BaseAction {
  abstract execute(executor: BaseExecutor, table: string): Promise<void>;
}
