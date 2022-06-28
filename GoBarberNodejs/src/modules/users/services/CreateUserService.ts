import "reflect-metadata";
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/user'
import IUsersRepository from "../repositories/IUsersRepository";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";

interface IRequest{
    name:string;
    email: string;
    password:string;
}

@injectable()
class CreateUserService{

    constructor(
        @inject('UsersRepository')
        private UsersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider : IHashProvider 
    ){}

    public async execute({name, email, password}: IRequest):  Promise<User> {

        //Verify if the email is unique
        const checkUserExists = await this.UsersRepository.findByEmail(email)
        //if don't throws an exception
        if (checkUserExists){
            throw new AppError('Email adress already used.')
        }

        const hashedPassword = await this.hashProvider.generateHash(password)

        //create the new user and save
        const user = await this.UsersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        //return the created user
        return user;
    }
}

export default CreateUserService;