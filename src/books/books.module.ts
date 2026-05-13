import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { PrismaModule } from '../prisma/prisma.module';

// @Module definisce il modulo 'Books', collegando controller e servizi.
@Module({
  // 'imports' include PrismaModule per permettere a BooksService di usare il PrismaService.
  imports: [PrismaModule],
  // 'controllers' elenca le classi che gestiscono le richieste HTTP in entrata.
  controllers: [BooksController],
  // 'providers' elenca i servizi che contengono la logica di business del modulo.
  providers: [BooksService],
})
export class BooksModule {}
