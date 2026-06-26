import Prisma from '@/config/db';

export class AccessControllRepository {
  async getRoleByUserId(userId: string) {
    const user = await Prisma.user.findUnique({
      where: { id: userId },
      select: {
        role: true,
      },
    });
    return user;
  }
}
