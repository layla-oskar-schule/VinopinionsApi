import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Winemaker } from './entities/winemaker.entity';

@Injectable()
export class WinemakersService {
  constructor(
    @InjectRepository(Winemaker)
    private winemakersRepository: Repository<Winemaker>,
  ) {}

  async create(name: string): Promise<Winemaker> {
    const existingWinemaker: Winemaker | null =
      await this.winemakersRepository.findOne({
        where: { name },
      });

    if (existingWinemaker !== null)
      throw new ConflictException('winemaker with that name already exists');

    const user: Winemaker = this.winemakersRepository.create({ name });
    return this.winemakersRepository.save(user);
  }

  findOneById(id: string): Promise<Winemaker | null> {
    return this.winemakersRepository.findOne({
      where: { id },
      relations: {
        wines: true,
      },
    });
  }

  async findAll(): Promise<Winemaker[]> {
    return await this.winemakersRepository.find();
  }
}
