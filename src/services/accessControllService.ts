import { AccessControllRepository } from '../repositories/accessControllRepository';
import { NotFoundError } from '@/errors/concreteErrors';

export class AccessControllService {
  private accessControllRepository: AccessControllRepository;

  constructor() {
    this.accessControllRepository = new AccessControllRepository();
  }

  async getAccessByUserId(userId: string) {
    const result = await this.accessControllRepository.getRoleByUserId(userId);

    if (!result) {
      throw new NotFoundError('User not found');
    }

    if (!result.role) {
      throw new NotFoundError('Access control role not found for this user');
    }

    return result.role;
  }
}
