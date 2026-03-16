import { BaseExecutor } from '../../executors';

export abstract class TableBuilder {
  abstract execute(executor: BaseExecutor): Promise<void>;
}
