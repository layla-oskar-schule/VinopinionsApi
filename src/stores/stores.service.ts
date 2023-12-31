import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from './entities/store.entity';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store) private storeRepository: Repository<Store>,
  ) {}

  async create(name: string, address?: string, url?: string): Promise<Store> {
    const store: Store = this.storeRepository.create({
      name,
      address,
      url,
    });
    return this.storeRepository.save(store);
  }

  findAll() {
    return this.storeRepository.find({
      relations: {
        wines: true,
      },
    });
  }

  findOneById(id: string): Promise<Store | null> {
    return this.storeRepository.findOne({
      where: { id },
      relations: {
        wines: true,
      },
    });
  }

  async remove(id: string): Promise<Store> {
    const store: Store | null = await this.findOneById(id);
    if (store == null) throw new NotFoundException();
    return this.storeRepository.remove(store);
  }
}
