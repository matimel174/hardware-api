# HardStore API

API REST para administrar el catalogo de productos de una tienda de hardware. Los datos se guardan en Firestore y las rutas de escritura estan protegidas con JWT.

## Tecnologias
- Node.js con ES Modules
- Express, cors y body-parser
- Firebase Firestore
- jsonwebtoken (JWT)
- dotenv para las variables de entorno

## Instalacion
    npm install
    npm run start

El servidor corre en http://localhost:3000. La configuracion esta en el archivo .env.

## Arquitectura
- index.js: configuracion del servidor y middlewares globales
- src/routes: definicion de rutas
- src/controllers: validan la peticion y arman la respuesta
- src/services: logica de la aplicacion
- src/models: acceso a Firestore
- src/middlewares: autenticacion con JWT
- src/config: conexion a Firebase
- src/utils: generacion y verificacion de tokens

## Endpoints

| Metodo | Ruta | Auth | Descripcion |
|--------|------|------|-------------|
| POST | /auth/login | No | Devuelve el Bearer token |
| GET | /api/products | No | Lista todos los productos |
| GET | /api/products/:id | No | Devuelve un producto |
| POST | /api/products/create | Si | Crea un producto |
| DELETE | /api/products/:id | Si | Elimina un producto |

Las rutas protegidas requieren el header `Authorization: Bearer <token>`.

## Usuario de prueba
- Email: admin@gmail.com
- Password: 123456

## Manejo de errores
- 400: datos invalidos o JSON mal formado
- 401: falta el token o credenciales incorrectas
- 403: token invalido o vencido
- 404: ruta o producto inexistente
- 500: error del servidor o de Firestore