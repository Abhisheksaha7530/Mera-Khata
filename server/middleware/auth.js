import jwt from 'jsonwebtoken';

export default function (req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1]; // Get token after 'Bearer '

  if (!token) return res.status(401).json({ message: 'No token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // Correct field
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
}
