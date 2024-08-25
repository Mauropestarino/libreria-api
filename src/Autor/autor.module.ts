import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AutorService } from './autor.service';
import { AutorController } from './autor.controller';
import { Autor } from './model/autor.model';

@Module({
    imports: [SequelizeModule.forFeature([Autor])],
    controllers: [AutorController],
    providers: [AutorService],
})
export class AutorModule { }
