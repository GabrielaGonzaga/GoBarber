import "reflect-metadata";
import { injectable, inject } from 'tsyringe';
import User from "../infra/typeorm/entities/user";
import AppError from "@shared/errors/AppError";
import IUsersRepository from "../repositories/IUsersRepository";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";

interface IRequest {
    user_id: string;
    name: string;
    email: string;
    old_password?: string;
    password?: string;
}

@injectable()
class UpdateProfileService{

    constructor(
        @inject('UsersRepository')
        private UsersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider
    ){}

    public async execute({user_id, name, email, password, old_password}: IRequest): Promise<User>{

        // //verify if the user_id received is the user on the model
        const user = await this.UsersRepository.findById(user_id);

        //if don't throw error
        if(!user){
            throw new AppError('User not found!');
        }

        const userDuplicatedEmail = await this.UsersRepository.findByEmail(email);

        //verify if the email has been already used by another user
        if(userDuplicatedEmail && userDuplicatedEmail.id !== user_id){
            throw new AppError('This email is already used!');
        }
        
        user.name = name;
        user.email = email;

        if(password && !old_password){
            throw new AppError('Set the old password to set a new password');
        }

        if(password && old_password){
            const checkOldPassword = await this.hashProvider.compareHash(old_password, user.password);

            if(!checkOldPassword ){
                throw new AppError('Wrong old password ');
            }

            user.password = await this.hashProvider.generateHash(password);
        }

        return this.UsersRepository.save(user);
    }
}

export default UpdateProfileService;