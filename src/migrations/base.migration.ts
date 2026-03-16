import { BaseExecutor } from 'src/executors';
import { CreateTableBuilder, UpdateTableBuilder } from '../builders';

export abstract class BaseMigration {
  protected executor: BaseExecutor;

  abstract execute(): Promise<void>;
  abstract rollback(): Promise<void>;

  protected initialize(executor: BaseExecutor): void {
    this.executor = executor;
  }

  async createTable(name: string, callback: (builder: CreateTableBuilder) => void): Promise<void> {
    const builder = new CreateTableBuilder(name);
    callback(builder);
    await builder.execute(this.executor);
  }

  async updateTable(name: string, callback: (builder: UpdateTableBuilder) => void): Promise<void> {
    const builder = new UpdateTableBuilder(name);
    callback(builder);
    await builder.execute(this.executor);
  }

  async dropTable(name: string): Promise<void> {
    await this.executor.dropTable(name);
  }

  async runSQL(query: string): Promise<void> {
    await this.executor.runSQL(query);
  }
}
