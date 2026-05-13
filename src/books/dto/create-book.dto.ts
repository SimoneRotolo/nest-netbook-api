// CreateBookDto (Data Transfer Object) definisce la struttura dei dati necessari per creare un libro.
export class CreateBookDto {
  // Titolo del libro (stringa).
  title: string;
  // Autore del libro (stringa).
  author: string;
  // Anno di pubblicazione (numero).
  year: number;
}
