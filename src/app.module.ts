import { Module } from '@nestjs/common';
import { DatabaseModule } from './Database/database.module';
import { LibroModule } from './libro/libro.module';
import { AutorModule } from './autor/autor.module';
import { EditorialModule } from './editorial/editorial.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    LibroModule,
    AutorModule,
    EditorialModule,
  ],
})
export class AppModule { }
