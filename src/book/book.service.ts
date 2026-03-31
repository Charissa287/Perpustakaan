import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatebookDto } from './dto/create-book.dto';
import { UpdatebookDto } from './dto/update-book.dto';

@Injectable()
export class bookService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatebookDto) {
    return this.prisma.book.create({ data: dto });
  }

  async findAll() {
    return this.prisma.book.findMany({ orderBy: { id: 'desc' } });
  }

  async findOne(id: number) {
    const book = await this.prisma.book.findUnique({ where: { id } });
    if (!book) throw new NotFoundException('book not found');
    return book;
  }

  async update(id: number, dto: UpdatebookDto) {
    // pastikan ada dulu
    await this.findOne(id);
    return this.prisma.book.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    // pastikan ada dulu
    await this.findOne(id);
    return this.prisma.book.delete({ where: { id } });
  }
  async findByTitle(title: string) {
  return this.prisma.book.findMany({
    where: {
      title: {
        contains: title,
      },
    },
    orderBy: { id: 'desc' },
  });
}
}


