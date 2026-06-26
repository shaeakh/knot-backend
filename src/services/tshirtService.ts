import { TshirtRepository } from '../repositories/tshirtRepository';
import { NotFoundError } from '@/errors/concreteErrors';
import type { CreateTshirtType, UpdateTshirtType } from '../dtos/tshirtDto';

export class TshirtService {
  private tshirtRepository: TshirtRepository;

  constructor() {
    this.tshirtRepository = new TshirtRepository();
  }

  async createTshirt(data: CreateTshirtType) {
    return this.tshirtRepository.create(data);
  }

  async getAllTshirts() {
    return this.tshirtRepository.findAll();
  }

  async getTshirtById(id: string) {
    const tshirt = await this.tshirtRepository.findById(id);
    if (!tshirt) {
      throw new NotFoundError('T-shirt not found');
    }
    return tshirt;
  }

  async updateTshirt(id: string, data: UpdateTshirtType) {
    await this.getTshirtById(id);
    return this.tshirtRepository.update(id, data);
  }

  async deleteTshirt(id: string) {
    await this.getTshirtById(id);
    await this.tshirtRepository.delete(id);
    return { message: 'T-shirt deleted successfully' };
  }
}
