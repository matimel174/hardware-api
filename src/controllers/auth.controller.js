import { generateToken } from '../utils/token-generator.js';

const default_user = {
  id: 1,
  email: "admin@gmail.com",
  password: "123456"
};

export async function login(req, res) {
  const { email, password } = req.body ?? {};

  if (email === default_user.email && password === default_user.password) {
    const user = { id: default_user.id, email };
    const token = generateToken(user);
    return res.json({ token });
  }

  res.status(401).json({ error: 'Credenciales invalidas' });
}