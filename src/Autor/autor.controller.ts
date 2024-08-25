import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AutorService } from './autor.service';
import { CreateAutorDto } from './dto/create-autor.dto';
import { UpdateAutorDto } from './dto/update-autor.dto';

@ApiTags('Autores')
@Controller('autores')
export class AutorController {
    constructor(private readonly autorService: AutorService) { }

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo autor' })
    @ApiResponse({ status: 201, description: 'El autor ha sido creado con éxito.' })
    @ApiResponse({ status: 400, description: 'Datos inválidos.' })
    create(@Body() createAutorDto: CreateAutorDto) {
        return this.autorService.create(createAutorDto);
    }

    @Get()
    @ApiOperation({ summary: 'Obtener todos los autores' })
    @ApiResponse({ status: 200, description: 'Lista de autores.' })
    findAll() {
        return this.autorService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un autor por ID' })
    @ApiResponse({ status: 200, description: 'Datos del autor.' })
    @ApiResponse({ status: 404, description: 'Autor no encontrado.' })
    findOne(@Param('id') id: string) {
        return this.autorService.findOne(+id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar un autor por ID' })
    @ApiResponse({ status: 200, description: 'El autor ha sido actualizado con éxito.' })
    @ApiResponse({ status: 404, description: 'Autor no encontrado.' })
    update(@Param('id') id: string, @Body() updateAutorDto: UpdateAutorDto) {
        return this.autorService.update(+id, updateAutorDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un autor por ID' })
    @ApiResponse({ status: 200, description: 'El autor ha sido eliminado con éxito.' })
    @ApiResponse({ status: 404, description: 'Autor no encontrado.' })
    remove(@Param('id') id: string) {
        return this.autorService.remove(+id);
    }
}
