import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './src/routes/auth.routes.js';
import productsRoutes from './src/routes/products.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ mensaje: 'API de HardStore funcionando' });
});

app.use('/auth', authRoutes);
app.use('/api/products', productsRoutes);

// Rutas desconocidas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Errores generales (por ejemplo un JSON mal formado en el body)
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    error: status === 400 ? 'El cuerpo de la peticion no es un JSON valido' : 'Error interno del servidor'
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});