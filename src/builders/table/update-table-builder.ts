import { BaseExecutor } from '../../executors';
import { BaseAction, CreateIndexAction } from '../../actions';
import { ColumnBuilder, ColumnTypeStep } from '../column';
import { TableBuilder } from './table-builder';
import { DropColumnAction } from '../../actions/drop-column.action';

export class UpdateTableBuilder extends TableBuilder {
  private name: string;
  private columns: ColumnBuilder[] = [];
  private actions: BaseAction[] = [];

  constructor(name: string) {
    super();
    this.name = name;
  }

  async execute(executor: BaseExecutor): Promise<void> {
    for (const column of this.columns) {
      await executor.createColumn(this.name, column.build());
    }

    for (const action of this.actions) {
      await action.execute(executor, this.name);
    }
  }

  addColumn(name: string): ColumnTypeStep {
    const builder = ColumnBuilder.new(name);
    this.columns.push(builder);
    return builder;
  }

  dropColumn(name: string): void {
    this.actions.push(new DropColumnAction(name));
  }

  createIndex(columns: string[], constraintName?: string): void {
    this.actions.push(new CreateIndexAction(columns, constraintName));
  }
}
