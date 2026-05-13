import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';

// UpdateBookDto estende CreateBookDto rendendo tutti i suoi campi opzionali grazie a PartialType.
// Questo permette di inviare solo i campi che si desidera aggiornare.
export class UpdateBookDto extends PartialType(CreateBookDto) {}
