import { Router } from 'express';
import { verifyAuth } from '../middleware/auth';
import { updateHistory } from '../controller';

export const historiesRouter = Router();

historiesRouter.post('/create', verifyAuth, updateHistory);
