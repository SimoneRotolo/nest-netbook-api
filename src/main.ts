import { NestFactory } from '@nestjs/core';// questo è il framework principale di NestJS
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';// questo è per la documentazione swagger
import { AppModule } from './app.module'; // questo è il modulo principale dell'applicazione
import { config } from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()// questo è per configurare la documentazione swagger
    .setTitle('Blog API')
    .setDescription('API per la gestione di un blog')
    .setVersion('1.0')
    .addTag('users')
    .addTag('posts')
    .build();
  const document = SwaggerModule.createDocument(app, options);// questo crea la documentazione swagger basata sui controller e sui DTO definiti nell'applicazione
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
