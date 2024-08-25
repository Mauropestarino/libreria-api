import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
    tableName: 'autores',
    timestamps: false,
})
export class Autor extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    nombre: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    apellido: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    dni: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    nacionalidad: string;
}
