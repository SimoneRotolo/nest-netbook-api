import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// @Injectable() definisce la classe come un provider che può essere gestito dal sistema di Dependency Injection di NestJS.
@Injectable()
// Estende PrismaClient per fornire tutte le funzionalità di Prisma (query, transazioni, ecc.) direttamente tramite questo servizio.
// Implementa OnModuleInit e OnModuleDestroy per gestire il ciclo di vita della connessione al database.
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    // Chiama il costruttore di PrismaClient configurando i log per il debug.
    super({
      log: ['query', 'info', 'warn', 'error'],
    });
  }

  // onModuleInit viene eseguito quando il modulo NestJS viene inizializzato.
  async onModuleInit() {
    // Apre la connessione al database.
    await this.$connect();
  }

  // onModuleDestroy viene eseguito quando l'applicazione viene chiusa.
  async onModuleDestroy() {
    // Chiude in modo pulito la connessione al database.
    await this.$disconnect();
  }
}
