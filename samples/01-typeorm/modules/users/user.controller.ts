import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  getUsers(): Promise<UserEntity[]> {
    return this.usersService.getUsers();
  }

  @Get(':userId')
  getUser(@Param('userId') userId: string): Promise<UserEntity> {
    return this.usersService.getUser(userId);
  }

  @Post()
  createUser(@Body() dto: CreateUserDto): Promise<UserEntity> {
    return this.usersService.createUser(dto);
  }

  @Delete(':userId')
  deleteUser(@Param('userId') userId: string): Promise<void> {
    return this.usersService.deleteUser(userId);
  }
}
