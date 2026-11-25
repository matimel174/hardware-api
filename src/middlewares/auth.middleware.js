import { verifyToken } from '../utils/token-generator.js';

export function authenticate(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Falta el token de autenticacion' });
  }

  try {
    req.user = verifyToken(header.split(' ')[1]);
    next();
  } catch {
    res.status(403).json({ error: 'Token invalido o vencido' });
  }
}