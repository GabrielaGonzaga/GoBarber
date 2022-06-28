import SendForgotPassowrdEmailService from './SendForgotPassowrdEmailService';
import FakeUsersRepository from '../../users/repositories/fakes/FakeUserRepository'
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPassowrdEmailService: SendForgotPassowrdEmailService;


describe('SendForgotPassowrdEmailService', () =>{

    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeMailProvider = new FakeMailProvider();
        fakeUserTokensRepository = new FakeUserTokensRepository();
        
        sendForgotPassowrdEmailService = new SendForgotPassowrdEmailService(
            fakeUsersRepository, 
            fakeMailProvider,
            fakeUserTokensRepository
        );      
    });
    
    it('should be able to recover thye password using the email', async () =>{

        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        await fakeUsersRepository.create({
            name: 'Teste',
            email: 'teste@gmail.com',
            password: '123456'
        });

         await sendForgotPassowrdEmailService.execute({
            email: 'teste@gmail.com',
        });

        expect(sendMail).toHaveBeenCalled();
    });

     
    it('should be able to recover a non-existing user password', async () =>{

        await expect(sendForgotPassowrdEmailService.execute({
            email: 'teste@gmail.com',
        })).rejects.toBeInstanceOf(AppError);

    });

    it('should generate a forgot password token', async () =>{
        const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

        const user = await fakeUsersRepository.create({
            name: 'Teste',
            email: 'teste@gmail.com',
            password: '123456'
        });

         await sendForgotPassowrdEmailService.execute({
            email: 'teste@gmail.com',
        });

        expect(generateToken).toHaveBeenCalledWith(user.id);

    });
    
});