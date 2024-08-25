import { Table, Column, Model, DataType, ForeignKey, BelongsToMany, BelongsTo } from 'sequelize-typescript';
import { Autor } from '../../Autor/model/autor.model';
import { Editorial } from '../../Editorial/model/editorial.model';

@Table({
    tableName: 'libros',
    timestamps: false,
})
export class Libro extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    titulo: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    categoriaLiteraria: string;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    precio: number;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    fechaLanzamiento: Date;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    descripcion: string;

    @BelongsToMany(() => Autor, 'LibroAutores', 'libroId', 'autorId')
    autores: Autor[];

    @ForeignKey(() => Editorial)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    editorialId: number;

    @BelongsTo(() => Editorial)
    editorial: Editorial;
}
