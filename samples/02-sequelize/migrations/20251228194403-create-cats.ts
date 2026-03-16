import { Sequelize } from 'sequelize';
import { SequelizeMigration } from '../../../src/extensions/sequelize';

export class Migration extends SequelizeMigration {
  driver = 'mysql';

  async execute(): Promise<void> {
    await this.createTable('cats', (table) => {
      table.column('id').integer().primary().autoIncrement();
      table.column('name').string();
      table.column('age').integer();
      table.column('breed').string().nullable();
      table.column('createdAt').timestamp().default(Sequelize.fn('CURRENT_TIMESTAMP'));
      table.column('updatedAt').timestamp().default(Sequelize.fn('CURRENT_TIMESTAMP'));
    });
  }

  async rollback(): Promise<void> {
    await this.dropTable('cats');
  }
}

const migration = new Migration();
export const up = migration.up.bind(migration);
export const down = migration.down.bind(migration);
