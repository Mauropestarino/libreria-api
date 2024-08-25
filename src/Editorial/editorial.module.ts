import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EditorialService } from './editorial.service';
import { EditorialController } from './editorial.controller';
import { Editorial } from './model/editorial.model';

@Module({
    imports: [SequelizeModule.forFeature([Editorial])],
    controllers: [EditorialController],
    providers: [EditorialService],
})
export class EditorialModule { }
