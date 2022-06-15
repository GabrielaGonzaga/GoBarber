import AuthenticateUserService from "@modules/users/services/AuthenticateUserService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class SessionsController{
    public async create( request: Request, response: Response ): Promise<Response>{
        
    //request body
    const {email, password} = request.body;

    // call the service with the authentications
    const authenticateUser = container.resolve(AuthenticateUserService);

    // says what the service will verify
    const {user, token} = await authenticateUser.execute({
      email,
      password
    });

    // remove the password from the response 
    delete user.password;

    // retrun the user
    return response.json({user, token});

    } 
}