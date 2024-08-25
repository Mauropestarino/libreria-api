import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateAutorDto {
    @ApiProperty({ description: 'Nombre del autor' })
    @IsNotEmpty()
    @IsString()
    nombre: string;

    @ApiProperty({ description: 'Apellido del autor' })
    @IsNotEmpty()
    @IsString()
    apellido: string;

    @ApiProperty({ description: 'DNI del autor', example: '12345678' })
    @IsNotEmpty()
    @Matches(/^\d{7,8}$/, { message: 'DNI must be 7 or 8 digits' })
    dni: string;

    @ApiProperty({ description: 'Nacionalidad del autor' })
    @IsNotEmpty()
    @IsString()
    nacionalidad: string;
}
