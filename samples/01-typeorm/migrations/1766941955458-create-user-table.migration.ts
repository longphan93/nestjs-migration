import { TypeOrmMigration } from 'src/extensions/typeorm';

export class CreateUserTable1766941955458 extends TypeOrmMigration {
  driver = 'postgres';

  async execute(): Promise<void> {
    await this.createTable('users', (table) => {
      table.column('id').uuid().primary().default('uuidv7()');
      table.column('name').string().nullable();
      table.column('isActive').boolean().default(true);
    });
  }

  async rollback(): Promise<void> {
    await this.dropTable('users');
  }
}
