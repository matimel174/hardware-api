# HardStore API

API REST para gestionar el catalogo de productos de una tienda de hardware.

## Tecnologias
- Node.js con ES Modules
- Express para el servidor y el ruteo
- Firebase Firestore como base de datos en la nube
- JSON Web Tokens (jsonwebtoken) para proteger las rutas de escritura

## Instalacion
    npm install
    npm start

El servidor corre en http://localhost:3000.

## Estructura
- routes/: define las rutas y que controlador atiende cada una
- controllers/: recibe la solicitud, valida y arma la respuesta
- services/: acceso a Firestore
- middlewares/: verificacion del token
- utils/: generacion y verificacion de tokens

Se separo en capas para que cada archivo tenga una sola responsabilidad.

## Endpoints

| Metodo | Ruta | Auth | Descripcion |
|--------|------|------|-------------|
| POST | /auth/login | No | Devuelve un token JWT |
| GET | /api/products | No | Lista productos (filtro opcional ?category=) |
| GET | /api/products/:id | No | Devuelve un producto |
| POST | /api/products | Si | Crea un producto |
| PUT | /api/products/:id | Si | Actualiza un producto |
| DELETE | /api/products/:id | Si | Elimina un producto |

Las rutas protegidas requieren el header `Authorization: Bearer <token>`.

## Credenciales de prueba
- Email: admin@gmail.com
- Password: 123456

## Codigos de respuesta
200 OK, 201 creado, 400 datos invalidos, 401 sin token o credenciales invalidas, 404 no encontrado, 500 error del servidor.