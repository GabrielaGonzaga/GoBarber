import { Request, Response, NextFunction } from "express";
import authConfig from '@config/auth';
import { verify } from "jsonwebtoken";
import AppError from "@shared/errors/AppError";

// interface with the token will have to return 
interface TokenPayload{
    iat: number;
    exp: number;
    sub: string;
     
}

//MIDDLEWARE - request, reponse, next;
export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction): void{

    //get the token by the header
    const authHeader = request.headers.authorization;

    // verify if there's a header
    if (!authHeader){
        throw new AppError('JWT token is missing', 403);
    }

    //splitthe array: Bearer/token
    const  [, token] = authHeader.split(' ')

    
    try{
        //verify if the token is valid
        const decoded = verify(token, authConfig.jwt.secret);

        //get sub object from TokenPayload interface
        const {sub} = decoded as TokenPayload;

        request.user = {
            id: sub,
        }

        //if is, go to the next step
        return next();

    }catch{
        //if don't throw this error
        throw new AppError('Invalid JWT token', 403);
    }

   


}