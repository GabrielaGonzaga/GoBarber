import { Request, Response } from "express";
import { container } from "tsyringe";
import ShowProfileService from "@modules/users/services/ShowProfileService";
import UpdateProfileService from "@modules/users/services/UpdateProfileService";

export default class ProfileController {

    public async show(request: Request, response: Response): Promise<Response>{

        //get the user_id from the authentication token
        const user_id = request.user.id

        const showProfile = container.resolve(ShowProfileService);

        const user = await showProfile.execute({user_id})

        // delete user.password;

        return response.json(user);

    }

    public async create(request: Request, response: Response): Promise<Response>{

        //get the user_id from the authentication token
        const user_id = request.user.id
        const {name, email, old_password, password } = request.body;

        const updateProfile = container.resolve(UpdateProfileService);
    
        const user = await updateProfile.execute({
            user_id,
            name,
            email,
            old_password,
            password
        });
    
        delete user.password;
    
        return response.json(user);
    }
} 