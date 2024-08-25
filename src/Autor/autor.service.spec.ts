import { Test, TestingModule } from '@nestjs/testing';
import { AutorService } from './autor.service';
import { getModelToken } from '@nestjs/sequelize';
import { Autor } from './model/autor.model';
import { CreateAutorDto } from './dto/create-autor.dto';
import { NotFoundException } from '@nestjs/common';

describe('AutorService', () => {
    let service: AutorService;
    let model: typeof Autor;

    const autorArray = [
        {
            id: 1,
            nombre: 'Gabriel',
            apellido: 'García Márquez',
            dni: '12345678',
            nacionalidad: 'Colombiana',
        },
        {
            id: 2,
            nombre: 'Isabel',
            apellido: 'Allende',
            dni: '23456789',
            nacionalidad: 'Chilena',
        },
    ];

    const oneAutor = autorArray[0];

    // Crear un mock de la instancia del modelo de Sequelize
    const mockAutorInstance = (autorData) => ({
        ...autorData,
        update: jest.fn().mockResolvedValue(autorData),
        destroy: jest.fn().mockResolvedValue(undefined),
        save: jest.fn().mockResolvedValue(autorData),
        reload: jest.fn().mockResolvedValue(autorData),
        _attributes: autorData,
        dataValues: autorData,
        isNewRecord: false,
        isSoftDeleted: false,
        _previousDataValues: {},
        changed: jest.fn(),
    });

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AutorService,
                {
                    provide: getModelToken(Autor),
                    useValue: {
                        findAll: jest.fn(() => autorArray),
                        findByPk: jest.fn((id: number) => {
                            const autor = autorArray.find((autor) => autor.id === id);
                            return autor ? mockAutorInstance(autor) : null;
                        }),
                        create: jest.fn((dto: CreateAutorDto) => mockAutorInstance({ ...dto, id: 3 })),
                    },
                },
            ],
        }).compile();

        service = module.get<AutorService>(AutorService);
        model = module.get<typeof Autor>(getModelToken(Autor));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create a new autor', async () => {
        const createAutorDto = {
            nombre: 'Jorge',
            apellido: 'Luis Borges',
            dni: '34567890',
            nacionalidad: 'Argentina',
        };

        const result = await service.create(createAutorDto);
        expect(result.nombre).toBe(createAutorDto.nombre);
        expect(result.apellido).toBe(createAutorDto.apellido);
        expect(result.dni).toBe(createAutorDto.dni);
        expect(result.nacionalidad).toBe(createAutorDto.nacionalidad);
        expect(result.id).toBe(3);
    });

    it('should return all autores', async () => {
        const result = await service.findAll();
        expect(result).toEqual(autorArray);
    });

    it('should return one autor by id', async () => {
        const result = await service.findOne(1);
        expect(result.nombre).toBe(oneAutor.nombre);
        expect(result.apellido).toBe(oneAutor.apellido);
        expect(result.dni).toBe(oneAutor.dni);
        expect(result.nacionalidad).toBe(oneAutor.nacionalidad);
        expect(result.id).toBe(oneAutor.id);
    });

    it('should throw an error if autor not found', async () => {
        jest.spyOn(model, 'findByPk').mockReturnValueOnce(null);
        await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });

    it('should update an autor', async () => {
        const updateAutorDto = { ...oneAutor, nombre: 'Gabriel José' };
        jest.spyOn(model, 'findByPk').mockReturnValue(Promise.resolve(mockAutorInstance(updateAutorDto)));
        const autor = await service.update(1, updateAutorDto);
        expect(autor.nombre).toBe('Gabriel José');
    });

    it('should delete an autor', async () => {
        jest.spyOn(model, 'findByPk').mockReturnValue(Promise.resolve(mockAutorInstance(oneAutor)));
        const result = await service.remove(1);
        expect(result).toBeUndefined();
    });
});
