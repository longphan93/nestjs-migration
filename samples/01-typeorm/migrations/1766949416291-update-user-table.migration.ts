import { TypeOrmMigration } from 'src/extensions/typeorm';

export class UpdateUserTable1766949416291 extends TypeOrmMigration {
  driver = 'postgres';

  async execute(): Promise<void> {
    await this.updateTable('users', (table) => {
      table.addColumn('email').string().unique();
    });
  }

  async rollback(): Promise<void> {
    await this.updateTable('users', (table) => {
      table.dropColumn('email');
    });
  }
}
