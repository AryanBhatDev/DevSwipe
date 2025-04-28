import { Request, Response } from "express";
import { chatService } from "../services/chat.service";



export const chatList = async(req:Request,res:Response):Promise<void>=>{

    try{
        const body = req.body;

        console.log(body);

        const response = await chatService.chatsList();

        res.status(200).json({
            response
        })
    }catch(e){
        res.status(401).json({
            message: e instanceof Error ? e.message :"Unknown error"
        })
    }
}