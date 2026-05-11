import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController; //definizione di una variabile "appController" di tipo AppController, che verrà utilizzata nei test

  beforeEach(async () => {
    //definizione di una funzione "beforeEach" che viene eseguita prima di ogni test, per creare un modulo di test e ottenere un'istanza del controller da testare
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController); //ottenimento di un'istanza del controller AppController dal modulo di test, che verrà utilizzata nei test
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!'); //test che verifica se il metodo "getHello" del controller restituisce la stringa "Hello World!"
    });
  });
});
