import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { LibroService } from './libro.service';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';

@ApiTags('Libros')
@Controller('libros')
export class LibroController {
    constructor(private readonly libroService: LibroService) { }

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo libro' })
    @ApiResponse({ status: 201, description: 'El libro ha sido creado con éxito.' })
    @ApiResponse({ status: 400, description: 'Datos inválidos.' })
    create(@Body() createLibroDto: CreateLibroDto) {
        return this.libroService.create(createLibroDto);
    }

    @Get()
    @ApiOperation({ summary: 'Obtener todos los libros (opcionalmente filtrados por categoría literaria y con paginación)' })
    @ApiResponse({ status: 200, description: 'Lista de libros.' })
    @ApiQuery({ name: 'categoriaLiteraria', required: false, type: String })
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página' })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Número de resultados por página' })
    findAll(
        @Query('categoriaLiteraria') categoriaLiteraria?: string,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ) {
        return this.libroService.findAll(categoriaLiteraria, page, limit);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un libro por ID' })
    @ApiResponse({ status: 200, description: 'Datos del libro.' })
    @ApiResponse({ status: 404, description: 'Libro no encontrado.' })
    findOne(@Param('id') id: string) {
        return this.libroService.findOne(+id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar un libro por ID' })
    @ApiResponse({ status: 200, description: 'El libro ha sido actualizado con éxito.' })
    @ApiResponse({ status: 404, description: 'Libro no encontrado.' })
    update(@Param('id') id: string, @Body() updateLibroDto: UpdateLibroDto) {
        return this.libroService.update(+id, updateLibroDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un libro por ID' })
    @ApiResponse({ status: 200, description: 'El libro ha sido eliminado con éxito.' })
    @ApiResponse({ status: 404, description: 'Libro no encontrado.' })
    remove(@Param('id') id: string) {
        return this.libroService.remove(+id);
    }
}
