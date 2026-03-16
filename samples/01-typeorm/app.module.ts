import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './modules/users/user.entity';
import { UserModule } from './modules/users/user.module';
import { CreateUserTable1766941955458 } from './migrations/1766941955458-create-user-table.migration';
import { UpdateUserTable1766949416291 } from './migrations/1766949416291-update-user-table.migration';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://postgres:postgres@localhost:5432/enosta',
      entities: [UserEntity],
      migrations: [CreateUserTable1766941955458, UpdateUserTable1766949416291],
      migrationsRun: true,
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
