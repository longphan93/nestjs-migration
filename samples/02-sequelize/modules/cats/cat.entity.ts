import { Table, Column, Model } from 'sequelize-typescript';

@Table({ modelName: 'cats' })
export class Cat extends Model {
  @Column
  name: string;

  @Column
  age: number;

  @Column({ allowNull: true })
  breed?: string;
}
