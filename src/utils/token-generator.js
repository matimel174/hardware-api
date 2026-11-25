import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'hardstore_clave_de_desarrollo';

export function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: '1h' });
}

export function verifyToken(token) {
  return jwt.verify(token, SECRET);
}