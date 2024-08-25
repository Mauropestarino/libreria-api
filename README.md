# Librería API

## Descripción

Librería API es una aplicación RESTful desarrollada con NestJS que permite gestionar una librería. La API proporciona operaciones CRUD para libros, autores y editoriales. Además, incluye funcionalidades adicionales como validación de datos, paginación y filtrado, y está documentada con Swagger.

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **NestJS**: Framework para construir aplicaciones Node.js eficientes y escalables.
- **Sequelize**: ORM para Node.js que soporta varios dialectos de bases de datos SQL.
- **MySQL**: Sistema de gestión de bases de datos relacional.
- **Swagger**: Herramienta para documentar y probar APIs.
- **Jest**: Framework de pruebas en JavaScript.

## Requisitos

- Node.js (v14 o superior)
- MySQL (v5.7 o superior)
- npm (v6 o superior)

## Instalación

1. **Clonar el Repositorio**

  git clone https://github.com/Mauropestarino/libreria-api.git
  cd libreria-api

2. **Instalar Dependencias**
  npm install

3. **Configurar la Base de Datos**
  Crea una base de datos en MySQL (libreria).
  configura credenciales de MySQL.
    DB_HOST=localhost
    DB_PORT=3306
    DB_USER=""
    DB_PASSWORD="---"
    DB_NAME=libreria

4. **Iniciar el Servidor**
  npm run start

5. **Acceder a la Documentación Swagger** 
  La documentación de la API estará disponible en http://localhost:3000/api.

Endpoints
  Libros
    GET /libros: Obtener todos los libros. Soporta filtros opcionales por categoría literaria y paginación.
    GET /libros/:id: Obtener un libro por su ID.
    POST /libros: Crear un nuevo libro.
    PATCH /libros/:id: Actualizar un libro existente.
    DELETE /libros/:id: Eliminar un libro.
  Autores
    GET /autores: Obtener todos los autores.
    GET /autores/:id: Obtener un autor por su ID.
    POST /autores: Crear un nuevo autor.
    PATCH /autores/:id: Actualizar un autor existente.
    DELETE /autores/:id: Eliminar un autor.
  Editoriales
    GET /editoriales: Obtener todas las editoriales.
    GET /editoriales/:id: Obtener una editorial por su ID.
    POST /editoriales: Crear una nueva editorial.
    PATCH /editoriales/:id: Actualizar una editorial existente.
    DELETE /editoriales/:id: Eliminar una editorial.

Paginación
La API soporta paginación en la consulta de todos los libros. Los siguientes parámetros de consulta (query parameters) están disponibles:
  page: El número de página (por defecto es 1).
  limit: El número de resultados por página (por defecto es 10).
  
  GET /libros?page=2&limit=5

Pruebas
Las pruebas unitarias se han implementado utilizando Jest. Para ejecutar las pruebas, utiliza el siguiente comando:
  npm run test