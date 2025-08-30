// import User from '../models/user.model.js';
import User from '../db/user.js';
import { hashSync } from 'bcrypt';
import { compareSync } from 'bcrypt';
import jwt from 'jsonwebtoken';

const secretKey = 'JWT_SECRET_KEY';

const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    secretKey,
    { expiresIn: process.env.JWT_EXPIRE || '1h' }
  );
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    throw new Error('Invalid token');
  }
};

function registerUser(req, res) {
  const { username, email, password } = req.body;

  // encript password
  const hashedPassword = hashSync(password, 10);
  let con = connectDB()

  let sql = `INSERT INTO Users (username, email, password) VALUES ('${username}', '${email}', '${hashedPassword}')`;

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    res.send({ message: true })
  });

}

function loginUser(req, res) {
  const { email, password } = req.body;
  const row = User.find(u => u.email === email);

  // 2. Verify password
  // const isMatch = compareSync(password, row.password);
  // if (!isMatch) {
  //   return res.status(401).json({
  //     success: false,
  //     message: 'Invalid credentials'
  //   });
  // }

  const token = generateToken(row.id);

  // 4. Set cookie
  res.cookie('authToken', token, {
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
    maxAge: 3600000 // 1 hour in milliseconds
  });

  // 5. Send response (without sensitive data)
  res.json({
    success: true,
    user: {
      name: row.username,
      email: row.email,
      role: row.role
    }
  });
}

export { registerUser, loginUser, generateToken, verifyToken }