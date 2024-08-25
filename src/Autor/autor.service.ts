import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Autor } from './model/autor.model';
import { CreateAutorDto } from './dto/create-autor.dto';
import { UpdateAutorDto } from './dto/update-autor.dto';

@Injectable()
export class AutorService {
    constructor(
        @InjectModel(Autor)
        private autorModel: typeof Autor,
    ) { }

    async create(createAutorDto: CreateAutorDto): Promise<Autor> {
        return this.autorModel.create(createAutorDto as any); // Casting explícito a 'any'
    }

    async findAll(): Promise<Autor[]> {
        return this.autorModel.findAll();
    }

    async findOne(id: number): Promise<Autor> {
        const autor = await this.autorModel.findByPk(id);
        if (!autor) {
            throw new NotFoundException('Autor no encontrado');
        }
        return autor;
    }

    async update(id: number, updateAutorDto: UpdateAutorDto): Promise<Autor> {
        const autor = await this.findOne(id);
        return autor.update(updateAutorDto);
    }

    async remove(id: number): Promise<void> {
        const autor = await this.findOne(id);
        await autor.destroy();
    }
}
