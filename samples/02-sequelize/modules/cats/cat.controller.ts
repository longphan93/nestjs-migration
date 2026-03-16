import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CatService } from './cat.service';
import { CreateUserDto } from './dto/create-cat.dto';
import { Cat } from './cat.entity';

@Controller('cats')
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Get()
  getUsers(): Promise<Cat[]> {
    return this.catService.getCats();
  }

  @Get(':catId')
  getCat(@Param('catId') catId: string): Promise<Cat | null> {
    return this.catService.getCat(catId);
  }

  @Post()
  createUser(@Body() dto: CreateUserDto): Promise<Cat> {
    return this.catService.createCat(dto);
  }

  @Delete(':catId')
  deleteCat(@Param('catId') catId: string): Promise<void> {
    return this.catService.deleteCat(catId);
  }
}
