import express, { Router } from 'express';
import { chatList } from '../controllers/chat.controller';

export const chatRouter: Router = express.Router();

chatRouter.get('/', chatList);