import "reflect-metadata";
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from "../repositories/IUserRepository";
import IUserTokenRepository from "../repositories/IUserTokenRepository";
import IMailProvider from "@shared/container/providers/MailProvider/models/IMailProvider";

interface IRequest{
    email: string;
}

@injectable()
class SendForgotPassowrdEmailService{

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('MailProvider')
        private mailProvider: IMailProvider,

        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokenRepository,
    ){}

    public async execute({email}: IRequest):  Promise<void> {
        const user = await this.usersRepository.findByEmail(email)

        if(!user){
            throw new AppError('User does not exists')
        }
        
        await  this.userTokensRepository.generate(user.id);

        this.mailProvider.sendMail(email, 'Recover password requisition received')
    }
}

export default SendForgotPassowrdEmailService;