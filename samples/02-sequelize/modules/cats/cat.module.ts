import { Module } from '@nestjs/common';
import { Cat } from './cat.entity';
import { CatService } from './cat.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { CatController } from './cat.controller';

@Module({
  imports: [SequelizeModule.forFeature([Cat])],
  controllers: [CatController],
  providers: [
    {
      provide: 'CATS_REPOSITORY',
      useValue: Cat,
    },
    CatService,
  ],
})
export class CatModule {}
