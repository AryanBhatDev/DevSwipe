import { Request, Response } from 'express';
import { chatService } from '../services/chat.service';

export const chatList = async (req: Request, res: Response): Promise<void> => {
    try {
        const userEmail = req.user?.email;
        if (!userEmail) {
            res.status(400).json({
                message: 'User email not available',
            });
            return
        }

        const response = await chatService.chatsList(userEmail);

        res.status(200).json({
            chats :response,
        });
    } catch (e) {
        res.status(401).json({
            message: e instanceof Error ? e.message : 'Unknown error',
        });
    }
};
