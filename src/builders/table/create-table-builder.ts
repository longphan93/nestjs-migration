import { BaseExecutor } from 'src/executors';
import { BaseAction, CreatePrimaryKeyAction } from '../../actions';
import { ColumnBuilder, ColumnTypeStep } from '../column';
import { TableBuilder } from './table-builder';

export class CreateTableBuilder extends TableBuilder {
  private name: string;
  private columns: ColumnBuilder[] = [];
  private actions: BaseAction[] = [];

  constructor(name: string) {
    super();
    this.name = name;
  }

  async execute(executor: BaseExecutor): Promise<void> {
    const columns = this.columns.map((column) => column.build());
    const actions = [...this.columns.flatMap((column) => column.actions), ...this.actions];

    await executor.createTable(this.name, columns);

    for (const action of actions) {
      await action.execute(executor, this.name);
    }
  }

  column(name: string): ColumnTypeStep {
    const builder = ColumnBuilder.new(name);
    this.columns.push(builder);
    return builder;
  }

  primaryColumns(columns: string[]): void {
    this.actions.push(new CreatePrimaryKeyAction(columns));
  }
}
