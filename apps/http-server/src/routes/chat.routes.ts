import { Router } from 'express';
import { chatList } from '../controllers/chat.controller';

export const chatRouter = Router();

chatRouter.get('/',chatList)