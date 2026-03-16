import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  getUsers(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  getUser(userId: string): Promise<UserEntity> {
    return this.usersRepository.findOneByOrFail({ id: userId });
  }

  async createUser(user: CreateUserDto): Promise<UserEntity> {
    const insertedResult = await this.usersRepository.insert(user);
    const userId = insertedResult.identifiers[0].id;
    return await this.usersRepository.findOneByOrFail({ id: userId });
  }

  async deleteUser(userId: string): Promise<void> {
    await this.usersRepository.delete(userId);
  }
}
