import { QueryInterface } from 'sequelize';
import { BaseMigration } from '../../migrations';
import { SequelizeExecutor } from './sequelize.executor';

export abstract class SequelizeMigration extends BaseMigration {
  up(queryInterface: QueryInterface): Promise<any> {
    if (!this['driver']) {
      throw new Error('Database driver is not specified in the migration class.');
    }
    this.initialize(new SequelizeExecutor(queryInterface, this['driver']));
    return this.execute();
  }

  down(queryInterface: QueryInterface): Promise<any> {
    if (!this['driver']) {
      throw new Error('Database driver is not specified in the migration class.');
    }
    this.initialize(new SequelizeExecutor(queryInterface, this['driver']));
    return this.rollback();
  }
}
