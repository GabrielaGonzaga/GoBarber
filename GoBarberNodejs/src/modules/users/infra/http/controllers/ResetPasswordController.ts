import { Request, Response } from "express";
import { container } from "tsyringe";
import ResetPassowordService from "@modules/users/services/ResetPassowordService";

export default class ResetPasswordController{
    public async create( request: Request, response: Response ): Promise<Response>{
        
    //request body
    const {password, token} = request.body;

    // call the service with the authentications
    const resetPassword = container.resolve(ResetPassowordService);

    // says what the service will verify
    await resetPassword.execute({
        password, 
        token
    });

    // retrun the user
    return response.status(204).json();

    } 
}