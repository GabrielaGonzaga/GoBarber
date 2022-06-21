import AuthenticateUserService from "@modules/users/services/AuthenticateUserService";
import SendForgotPassowrdEmailService from "@modules/users/services/SendForgotPassowrdEmailService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class ForgotPasswordController{
    public async create( request: Request, response: Response ): Promise<Response>{
        
    //request body
    const {email} = request.body;

    // call the service with the authentications
    const sendForgotPassowrdEmailService = container.resolve(SendForgotPassowrdEmailService);

    // says what the service will verify
    await sendForgotPassowrdEmailService.execute({
      email
    });

    // retrun the user
    return response.status(204).json();

    } 
}