import express from 'express';
import { login, getMe } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/login', login);
router.get('/me', authenticate, getMe);

export default router;
