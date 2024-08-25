import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateEditorialDto {
    @ApiProperty({ description: 'Nombre de la editorial' })
    @IsNotEmpty()
    @IsString()
    nombre: string;

    @ApiProperty({ description: 'Dirección de la editorial' })
    @IsNotEmpty()
    @IsString()
    direccion: string;

    @ApiProperty({ description: 'CUIT de la editorial', example: '20-12345678-1' })
    @IsNotEmpty()
    @Matches(/^\d{2}-\d{8}-\d{1}$/, { message: 'CUIT must follow the format XX-XXXXXXXX-X' })
    cuit: string;
}
