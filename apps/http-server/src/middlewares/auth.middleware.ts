import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload{
    email: string;
    name: string;
}
export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies["__Secure-next-auth.session-token"] || req.cookies["next-auth.session-token"];
        
        if(!token){
            res.status(401).json({
                message: "Incorrect token provided"
            });
            return
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;

        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            message: "Invalid token or token not provided"
        });
        return
    }
}