import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
    tableName: 'editoriales',
    timestamps: false,
})
export class Editorial extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    nombre: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    direccion: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    cuit: string;
}
