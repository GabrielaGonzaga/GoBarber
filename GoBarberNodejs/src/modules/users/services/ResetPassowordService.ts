import "reflect-metadata";
import { injectable, inject } from 'tsyringe';
import differenceInHours from "date-fns/differenceInHours";
import AppError from '@shared/errors/AppError';
import IUsersRepository from "../repositories/IUsersRepository";
import IUserTokensRepository from "../repositories/IUserTokensRepository";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";
import { addHours, isAfter } from "date-fns";

interface IRequest{
    token: string;
    password: string;
}

@injectable()
class ResetPassowordService{

    constructor(
        @inject('UsersRepository')
        private UsersRepository: IUsersRepository,

        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokensRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ){}

    public async execute({token, password}: IRequest):  Promise<void> {
        const userToken = await this.userTokensRepository.findByToken(token);
        
        if(!userToken){
            throw new AppError('User token does not exist'); 
        }
        
        const user = await this.UsersRepository.findById(userToken.user_id);

        if(!user){
            throw new AppError('User does not exist'); 
        }

        const tokenCreatedAt = userToken.created_at;
        const compareDate = addHours(tokenCreatedAt, 2)

        if(isAfter(Date.now(), compareDate)){
            throw new AppError('Token expired.');
        }

        user.password = await this.hashProvider.generateHash(password);

        await this.UsersRepository.save(user);
    }
}

export default ResetPassowordService;