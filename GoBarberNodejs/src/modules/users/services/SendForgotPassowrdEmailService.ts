import "reflect-metadata";
import path from "path";
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from "../repositories/IUsersRepository";
import IUserTokensRepository from "../repositories/IUserTokensRepository";
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
        private userTokensRepository: IUserTokensRepository,
    ){}

    public async execute({email}: IRequest):  Promise<void> {
        
        const user = await this.usersRepository.findByEmail(email)

        if(!user){
            throw new AppError('User does not exists')
        }
        
        const {token} = await this.userTokensRepository.generate(user.id);
        const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot.password.hbs')

        await this.mailProvider.sendMail({
            to: {
                name: user.name,
                email: user.email
            },
            subject: '[GoBarber] Password Recover',
            templateData:{
                file: forgotPasswordTemplate,
                variables:{
                    name: user.name,
                    link: `http://localhost:3000/reset_password?token=${token}`,
                },
            },
        });
    }
}

export default SendForgotPassowrdEmailService;