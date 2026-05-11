import { Module } from '@nestjs/common'; //importazione del decoratore Module da NestJS
import { AppController } from './app.controller'; //importazione del controller principale dell'applicazione
import { AppService } from './app.service'; //importazione del servizio principale dell'applicazione
import { PrismaModule } from './prisma/prisma.module'; //importazione del modulo Prisma, che gestisce la connessione al database e le operazioni sui dati
import { BooksModule } from './books/books.module';

@Module({
  //decorazione della classe AppModule con il decoratore Module, che definisce i moduli, i controller e i provider dell'applicazione
  imports: [PrismaModule, BooksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {} //esportazione della classe AppModule, che rappresenta il modulo principale dell'applicazione NestJS
