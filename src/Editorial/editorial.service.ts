import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Editorial } from './model/editorial.model';
import { CreateEditorialDto } from './dto/create-editorial.dto';
import { UpdateEditorialDto } from './dto/update-editorial.dto';

@Injectable()
export class EditorialService {
    constructor(
        @InjectModel(Editorial)
        private editorialModel: typeof Editorial,
    ) { }

    async create(createEditorialDto: CreateEditorialDto): Promise<Editorial> {
        return this.editorialModel.create(createEditorialDto as any); // Casting explícito a 'any'
    }

    async findAll(): Promise<Editorial[]> {
        return this.editorialModel.findAll();
    }

    async findOne(id: number): Promise<Editorial> {
        const editorial = await this.editorialModel.findByPk(id);
        if (!editorial) {
            throw new NotFoundException('Editorial no encontrada');
        }
        return editorial;
    }

    async update(id: number, updateEditorialDto: UpdateEditorialDto): Promise<Editorial> {
        const editorial = await this.findOne(id);
        return editorial.update(updateEditorialDto);
    }

    async remove(id: number): Promise<void> {
        const editorial = await this.findOne(id);
        await editorial.destroy();
    }
}
