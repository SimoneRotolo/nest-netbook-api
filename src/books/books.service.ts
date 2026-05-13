import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class BooksService {
  private readonly storagePath = path.join(process.cwd(), 'books_json');

  constructor(private prisma: PrismaService) {
    this.ensureStorageExists();
  }

  private async ensureStorageExists() {
    try {
      await fs.access(this.storagePath);
    } catch {
      await fs.mkdir(this.storagePath, { recursive: true });
    }
  }

  async create(createBookDto: CreateBookDto) {
    const book = await this.prisma.book.create({
      data: createBookDto,
    });

    await this.saveToFile(book);

    return book;
  }

  private async saveToFile(book: any) {
    const fileName = `book_${book.id}.json`;
    const filePath = path.join(this.storagePath, fileName);
    await fs.writeFile(filePath, JSON.stringify(book, null, 2));
  }

  findAll() {
    return this.prisma.book.findMany();
  }

  findOne(id: number) {
    return this.prisma.book.findUnique({
      where: { id },
    });
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return this.prisma.book.update({
      where: { id },
      data: updateBookDto,
    });
  }

  remove(id: number) {
    return this.prisma.book.delete({
      where: { id },
    });
  }
}
