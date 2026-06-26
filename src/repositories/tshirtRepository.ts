import Prisma from '@/config/db';
import type { CreateTshirtType, UpdateTshirtType } from '../dtos/tshirtDto';

export class TshirtRepository {
  async create(data: CreateTshirtType) {
    return Prisma.tshirt.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        variants: {
          create: data.variants,
        },
      },
      include: { variants: true },
    });
  }

  async findAll() {
    return Prisma.tshirt.findMany({
      include: { variants: true },
    });
  }

  async findById(id: string) {
    return Prisma.tshirt.findUnique({
      where: { id },
      include: { variants: true },
    });
  }

  async update(id: string, data: UpdateTshirtType) {
    return Prisma.tshirt.update({
      where: { id },
      data,
      include: { variants: true },
    });
  }

  async delete(id: string) {
    return Prisma.tshirt.delete({
      where: { id },
    });
  }
}
