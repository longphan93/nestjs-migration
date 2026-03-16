import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-cat.dto';
import { Cat } from './cat.entity';

@Injectable()
export class CatService {
  constructor(
    @Inject('CATS_REPOSITORY')
    private catsRepository: typeof Cat,
  ) {}

  getCats(): Promise<Cat[]> {
    return this.catsRepository.findAll();
  }

  getCat(catId: string): Promise<Cat | null> {
    return this.catsRepository.findOne({ where: { id: catId } });
  }

  async createCat(cat: CreateUserDto): Promise<Cat> {
    const insertedResult = await this.catsRepository.create({ ...cat });
    return insertedResult;
  }

  async deleteCat(catId: string): Promise<void> {
    await this.catsRepository.destroy({ where: { id: catId } });
  }
}
