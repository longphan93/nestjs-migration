/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { TypeOrmExecutor } from './typeorm.executor';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { BaseMigration } from '../../migrations/base.migration';

export abstract class TypeOrmMigration extends BaseMigration implements MigrationInterface {
  up(queryRunner: QueryRunner): Promise<any> {
    if (!this['driver']) {
      throw new Error('Database driver is not specified in the migration class.');
    }
    this.initialize(new TypeOrmExecutor(queryRunner, this['driver']));
    return this.execute();
  }

  down(queryRunner: QueryRunner): Promise<any> {
    if (!this['driver']) {
      throw new Error('Database driver is not specified in the migration class.');
    }
    this.initialize(new TypeOrmExecutor(queryRunner, this['driver']));
    return this.rollback();
  }
}
