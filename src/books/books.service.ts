import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as fs from 'fs/promises';
import * as path from 'path';

// @Injectable() marca la classe come un fornitore di servizi che NestJS può iniettare altrove.
@Injectable()
export class BooksService {
  // Percorso della cartella dove verranno salvati i file JSON dei libri.
  private readonly storagePath = path.join(process.cwd(), 'books_json');

  // Il costruttore inietta il PrismaService per interagire con il database.
  constructor(private prisma: PrismaService) {
    // Assicura che la cartella di archiviazione esista all'avvio.
    this.ensureStorageExists();
  }

  // Crea la cartella 'books_json' se non esiste già.
  private async ensureStorageExists() {
    try {
      await fs.access(this.storagePath);
    } catch {
      await fs.mkdir(this.storagePath, { recursive: true });
    }
  }

  // Crea un nuovo libro nel database e lo salva anche su file.
  async create(createBookDto: CreateBookDto) {
    // Utilizza Prisma per inserire il record nella tabella 'book'.
    const book = await this.prisma.book.create({
      data: createBookDto,
    });

    // Chiama il metodo privato per salvare i dati del libro in un file JSON.
    await this.saveToFile(book);

    return book;
  }

  // Salva i dati di un libro in un file JSON dedicato nella cartella 'books_json'.
  private async saveToFile(book: any) {
    const fileName = `book_${book.id}.json`;
    const filePath = path.join(this.storagePath, fileName);
    // Scrive il file in formato JSON formattato (indentazione di 2 spazi).
    await fs.writeFile(filePath, JSON.stringify(book, null, 2));
  }

  // Restituisce tutti i libri presenti nel database.
  findAll() {
    return this.prisma.book.findMany();
  }

  // Trova un singolo libro tramite il suo ID unico.
  findOne(id: number) {
    return this.prisma.book.findUnique({
      where: { id },
    });
  }

  // Aggiorna i dati di un libro esistente identificato dall'ID.
  update(id: number, updateBookDto: UpdateBookDto) {
    return this.prisma.book.update({
      where: { id },
      data: updateBookDto,
    });
  }

  // Elimina un libro dal database in base all'ID.
  remove(id: number) {
    return this.prisma.book.delete({
      where: { id },
    });
  }
}
