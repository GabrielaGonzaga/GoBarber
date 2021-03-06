import "reflect-metadata";
import { injectable, inject } from 'tsyringe';
import User from "../infra/typeorm/entities/user";
import AppError from "@shared/errors/AppError";
import IUsersRepository from "../repositories/IUsersRepository";

interface IRequest {
    user_id: string;
}

@injectable()
class ShowProfileService{

    constructor(
        @inject('UsersRepository')
        private UsersRepository: IUsersRepository,
    ){}

    public async execute({ user_id }: IRequest): Promise<User>{

        const user = await this.UsersRepository.findById(user_id);

        //if don't throw error
        if(!user){
            throw new AppError('User not found!');
        }

        return user;
    }
}

export default ShowProfileService;