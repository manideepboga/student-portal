import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
export const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'TKR College Portal API is running' });
});

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';

// Import routes (to be added)
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
// app.use('/api/student', studentRoutes);
// app.use('/api/faculty', facultyRoutes);
// app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
