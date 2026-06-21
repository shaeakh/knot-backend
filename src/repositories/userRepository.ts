import prisma from '../config/db';
import { User } from '../generated/prisma/client';

export class UserRepository {
  async findByGoogleId(googleId: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { googleId },
    });
  }

  async createUser(data: {
    googleId: string;
    email: string;
    name?: string;
    avatar?: string;
  }): Promise<User> {
    return prisma.user.create({ data });
  }
}
