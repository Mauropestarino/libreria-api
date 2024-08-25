import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LibroService } from './libro.service';
import { LibroController } from './libro.controller';
import { Libro } from './model/libro.model';
import { Autor } from '../Autor/model/autor.model';
import { Editorial } from '../Editorial/model/editorial.model';

@Module({
    imports: [SequelizeModule.forFeature([Libro, Autor, Editorial])],
    controllers: [LibroController],
    providers: [LibroService],
})
export class LibroModule { }
