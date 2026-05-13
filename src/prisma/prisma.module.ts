import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// Il decoratore @Module organizza il codice in blocchi funzionali.
@Module({
  // 'providers' definisce le classi che possono essere istanziate e condivise tramite Dependency Injection.
  providers: [PrismaService],
  // 'exports' permette ad altri moduli che importano PrismaModule di utilizzare il PrismaService.
  exports: [PrismaService],
})
export class PrismaModule {}
