import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import authRoutes from './routes/auth.js';
import entryRoutes from './routes/entries.js';
import { MONGO_URI } from './config/env.js';

const app = express();

//  Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/entries', entryRoutes);

//  Test route
app.get('/', (req, res) => {
  res.send(' Khata backend is running');
});

//  404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

//  Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Unhandled Error:', err.stack);
  res.status(500).json({ error: 'Server error' });
});

//  Start server
const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(' MongoDB connected');

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(` Server listening at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(' MongoDB connection error:', err.message);
    process.exit(1);
  }
};

console.log(' Starting server...');
startServer();
