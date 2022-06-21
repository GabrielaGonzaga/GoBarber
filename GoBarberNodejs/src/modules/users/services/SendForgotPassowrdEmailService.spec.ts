import SendForgotPassowrdEmailService from './SendForgotPassowrdEmailService';
import FakeUsersRepository from '../../users/repositories/fakes/FakeUserRepository'
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokenRepository: FakeUserTokenRepository;
let sendForgotPassowrdEmailService: SendForgotPassowrdEmailService;


describe('SendForgotPassowrdEmailService', () =>{

    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeUserTokenRepository = new FakeUserTokenRepository();
        fakeMailProvider = new FakeMailProvider();

        sendForgotPassowrdEmailService = new SendForgotPassowrdEmailService(
            fakeUsersRepository, 
            fakeMailProvider,
            fakeUserTokenRepository
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
        const generateToken = jest.spyOn(fakeUserTokenRepository, 'generate');

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