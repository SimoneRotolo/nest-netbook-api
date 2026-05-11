import { Test, TestingModule } from '@nestjs/testing'; //importazione delle funzioni Test e TestingModule da NestJS, che vengono utilizzate per creare un modulo di test e gestire le dipendenze durante i test
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  //definizione di un blocco di test per il servizio PrismaService
  let service: PrismaService; //definizione di una variabile "service" di tipo PrismaService, che verrà utilizzata nei test

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
