import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Libro } from './model/libro.model';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';
import { Autor } from '../Autor/model/autor.model';
import { Editorial } from '../Editorial/model/editorial.model';

@Injectable()
export class LibroService {
  constructor(
    @InjectModel(Libro)
    private libroModel: typeof Libro,
  ) { }

  async create(createLibroDto: CreateLibroDto): Promise<Libro> {
    const { autoresIds, editorialId, ...libroData } = createLibroDto;

    const editorial = await Editorial.findByPk(editorialId);
    if (!editorial) {
      throw new NotFoundException('Editorial no encontrada');
    }

    const libro = await this.libroModel.create({
      ...libroData,
      editorialId,
    });

    if (autoresIds) {
      const autores = await Autor.findAll({ where: { id: autoresIds } });
      const autoresIdsValidos = autores.map(autor => autor.id); 
      await libro.$set('autores', autoresIdsValidos);
    }

    return libro;
  }

  async findAll(
    categoriaLiteraria?: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ data: Libro[]; total: number; page: number; limit: number }> {
    const offset = (page - 1) * limit;
    const whereCondition = categoriaLiteraria ? { categoriaLiteraria } : {};

    const { rows, count } = await this.libroModel.findAndCountAll({
      where: whereCondition,
      include: [Autor, Editorial],
      offset,
      limit,
    });

    return {
      data: rows,
      total: count,
      page,
      limit,
    };
  }

  async findOne(id: number): Promise<Libro> {
    const libro = await this.libroModel.findByPk(id, {
      include: [Autor, Editorial],
    });
    if (!libro) {
      throw new NotFoundException('Libro no encontrado');
    }
    return libro;
  }

  async update(id: number, updateLibroDto: UpdateLibroDto): Promise<Libro> {
    const libro = await this.findOne(id);
    const { autoresIds, editorialId, ...libroData } = updateLibroDto;

    await libro.update(libroData);

    if (autoresIds) {
      const autores = await Autor.findAll({ where: { id: autoresIds } });
      const autoresIdsValidos = autores.map(autor => autor.id); 
      await libro.$set('autores', autoresIdsValidos);
    }

    if (editorialId) {
      const editorial = await Editorial.findByPk(editorialId);
      if (!editorial) {
        throw new NotFoundException('Editorial no encontrada');
      }
      libro.editorialId = editorialId;
      await libro.save();
    }

    return libro;
  }

  async remove(id: number): Promise<void> {
    const libro = await this.findOne(id);
    await libro.destroy();
  }
}
