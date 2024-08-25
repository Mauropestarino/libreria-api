import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsDateString } from 'class-validator';

export class CreateLibroDto {
    @ApiProperty({ description: 'Título del libro' })
    @IsNotEmpty()
    @IsString()
    titulo: string;

    @ApiProperty({ description: 'Categoría literaria del libro' })
    @IsNotEmpty()
    @IsString()
    categoriaLiteraria: string;

    @ApiProperty({ description: 'Precio del libro' })
    @IsNotEmpty()
    @IsNumber()
    precio: number;

    @ApiProperty({ description: 'Fecha de lanzamiento del libro', format: 'date-time' })
    @IsNotEmpty()
    @IsDateString()
    fechaLanzamiento: string;

    @ApiProperty({ description: 'Descripción del libro' })
    @IsNotEmpty()
    @IsString()
    descripcion: string;

    @ApiProperty({ description: 'ID de la editorial del libro' })
    @IsNotEmpty()
    @IsNumber()
    editorialId: number;

    @ApiProperty({ description: 'IDs de los autores del libro', isArray: true, type: Number })
    @IsNotEmpty()
    autoresIds: number[];
}
