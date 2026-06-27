import Prisma from '@/config/db';
import type { CreateItemType, UpdateItemType } from '../dtos/itemDto';

export class ItemRepository {
  async create(data: CreateItemType) {
    return Prisma.item.create({
      data: {
        name: data.name,
        type: data.type,
        description: data.description,
        price: data.price,
        colors: data.colors
          ? {
              create: data.colors.map((colorVariant) => ({
                color: colorVariant.color,
                images: colorVariant.images,
                sizes: {
                  create: colorVariant.sizes.map((sizeStock) => ({
                    size: sizeStock.size,
                    stock: sizeStock.stock,
                  })),
                },
              })),
            }
          : undefined,
      },
      include: {
        colors: {
          include: {
            sizes: true,
          },
        },
      },
    });
  }

  async findAll() {
    return Prisma.item.findMany({
      include: {
        colors: {
          include: {
            sizes: true,
          },
        },
      },
    });
  }

  async findById(id: string) {
    return Prisma.item.findUnique({
      where: { id },
      include: {
        colors: {
          include: {
            sizes: true,
          },
        },
      },
    });
  }

  async update(id: string, data: UpdateItemType) {
    return Prisma.item.update({
      where: { id },
      data: {
        name: data.name,
        type: data.type, // <-- আপডেট করার সময়ও পাঠানো হচ্ছে
        description: data.description,
        price: data.price,
      },
      include: {
        colors: {
          include: {
            sizes: true,
          },
        },
      },
    });
  }

  async delete(id: string) {
    return Prisma.item.delete({
      where: { id },
    });
  }
}
