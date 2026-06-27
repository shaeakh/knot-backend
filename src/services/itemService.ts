import { ItemRepository } from '../repositories/itemRepository';
import { NotFoundError } from '@/errors/concreteErrors';
import type { CreateItemType, UpdateItemType } from '../dtos/itemDto';

export class ItemService {
  private itemRepository: ItemRepository;

  constructor() {
    this.itemRepository = new ItemRepository();
  }

  async createItem(data: CreateItemType) {
    return this.itemRepository.create(data);
  }

  async getAllItems() {
    return this.itemRepository.findAll();
  }

  async getItemById(id: string) {
    const item = await this.itemRepository.findById(id);
    if (!item) {
      throw new NotFoundError('Item not found');
    }
    return item;
  }

  async updateItem(id: string, data: UpdateItemType) {
    await this.getItemById(id);
    return this.itemRepository.update(id, data);
  }

  async deleteItem(id: string) {
    await this.getItemById(id);
    await this.itemRepository.delete(id);
    return { message: 'Item deleted successfully' };
  }
}
