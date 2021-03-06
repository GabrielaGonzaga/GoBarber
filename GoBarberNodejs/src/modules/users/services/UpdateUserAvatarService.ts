import "reflect-metadata";
import { injectable, inject } from 'tsyringe';
import User from "../infra/typeorm/entities/user";
import AppError from "@shared/errors/AppError";
import IUsersRepository from "../repositories/IUsersRepository";
import IStorageProvider from "@shared/container/providers/StorageProvider/models/IStorageProvider";

interface IRequest {
    user_id: string;
    avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService{

    constructor(
        @inject('UsersRepository')
        private UsersRepository: IUsersRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider
    ){}

    public async execute({user_id, avatarFilename}: IRequest): Promise<User>{

        //verify if the user_id received is the user on the model
        const user = await this.UsersRepository.findById(user_id);

        //if don't throw error
        if(!user){
            throw new AppError('Only authenticated users can change avatar.', 401);
        }

        //verify if the user already have an avatar
        if(user.avatar){
            await this.storageProvider.deleteFile(user.avatar);
        }

        const filename = await this.storageProvider.saveFile(avatarFilename);
        
        user.avatar = filename;

        await this.UsersRepository.save(user);

        return user;
        
    }
}

export default UpdateUserAvatarService;