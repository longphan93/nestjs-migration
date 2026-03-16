import { Module } from '@nestjs/common';
import { Cat } from './modules/cats/cat.entity';
import { CatModule } from './modules/cats/cat.module';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'mysql',
      password: 'mysql',
      database: 'enosta',
      models: [Cat],
      autoLoadModels: true,
      synchronize: false,
    }),
    CatModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
