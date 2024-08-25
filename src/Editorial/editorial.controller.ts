import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EditorialService } from './editorial.service';
import { CreateEditorialDto } from './dto/create-editorial.dto';
import { UpdateEditorialDto } from './dto/update-editorial.dto';

@ApiTags('Editoriales')
@Controller('editoriales')
export class EditorialController {
    constructor(private readonly editorialService: EditorialService) { }

    @Post()
    @ApiOperation({ summary: 'Crear una nueva editorial' })
    @ApiResponse({ status: 201, description: 'La editorial ha sido creada con éxito.' })
    @ApiResponse({ status: 400, description: 'Datos inválidos.' })
    create(@Body() createEditorialDto: CreateEditorialDto) {
        return this.editorialService.create(createEditorialDto);
    }

    @Get()
    @ApiOperation({ summary: 'Obtener todas las editoriales' })
    @ApiResponse({ status: 200, description: 'Lista de editoriales.' })
    findAll() {
        return this.editorialService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener una editorial por ID' })
    @ApiResponse({ status: 200, description: 'Datos de la editorial.' })
    @ApiResponse({ status: 404, description: 'Editorial no encontrada.' })
    findOne(@Param('id') id: string) {
        return this.editorialService.findOne(+id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar una editorial por ID' })
    @ApiResponse({ status: 200, description: 'La editorial ha sido actualizada con éxito.' })
    @ApiResponse({ status: 404, description: 'Editorial no encontrada.' })
    update(@Param('id') id: string, @Body() updateEditorialDto: UpdateEditorialDto) {
        return this.editorialService.update(+id, updateEditorialDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar una editorial por ID' })
    @ApiResponse({ status: 200, description: 'La editorial ha sido eliminada con éxito.' })
    @ApiResponse({ status: 404, description: 'Editorial no encontrada.' })
    remove(@Param('id') id: string) {
        return this.editorialService.remove(+id);
    }
}
