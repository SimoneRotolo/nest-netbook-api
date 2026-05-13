import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

// Il decoratore @Controller('books') definisce il prefisso della rotta HTTP per questo controller.
@Controller('books')
export class BooksController {
  // Iniezione automatica del BooksService tramite il costruttore.
  constructor(private readonly booksService: BooksService) {}

  // Gestisce le richieste POST /books per creare un nuovo libro.
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    // @Body() estrae il corpo della richiesta e lo mappa sull'oggetto DTO (Data Transfer Object).
    return this.booksService.create(createBookDto);
  }

  // Gestisce le richieste GET /books per ottenere la lista di tutti i libri.
  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  // Gestisce le richieste GET /books/:id per ottenere un singolo libro tramite ID.
  @Get(':id')
  findOne(@Param('id') id: string) {
    // @Param('id') estrae il parametro ID dall'URL; il segno '+' converte la stringa in numero.
    return this.booksService.findOne(+id);
  }

  // Gestisce le richieste PATCH /books/:id per aggiornare parzialmente un libro.
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  // Gestisce le richieste DELETE /books/:id per eliminare un libro.
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
