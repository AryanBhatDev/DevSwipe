import express, { Router } from 'express';
import { chatList } from '../controllers/chat.controller';
import { authenticate } from '../middlewares/auth.middleware';

export const chatRouter: Router = express.Router();

chatRouter.get('/all',authenticate, chatList);