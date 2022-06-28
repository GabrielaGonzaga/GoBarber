import ResetPassowordService from './ResetPassowordService';
import FakeUsersRepository from '../repositories/fakes/FakeUserRepository'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;
let resetPassword: ResetPassowordService;

describe('ResetPassowordService', () =>{

    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeUserTokensRepository = new FakeUserTokensRepository();
        fakeHashProvider = new FakeHashProvider();

        resetPassword = new ResetPassowordService(
            fakeUsersRepository, 
            fakeUserTokensRepository,
            fakeHashProvider
        );      
    });

    it('should be able reset the password', async () =>{

        const generateHash = jest.spyOn(fakeHashProvider, 'generateHash')
       
        //create a new user
        const user = await fakeUsersRepository.create({
            name: 'Teste',
            email: 'teste@gmail.com',
            password: '123456'
        });
       
        //generate a token
        const {token} = await fakeUserTokensRepository.generate(user.id);

         await resetPassword.execute({
            password: '123123', 
            token
        });

        const updatedUser = await fakeUsersRepository.findById(user.id)

        expect(generateHash).toHaveBeenCalledWith('123123');
        expect(updatedUser?.password).toBe('123123');
    });

    it('should not be able reset the password with an non-existing-user', async () =>{
        
        const {token} = await fakeUserTokensRepository.generate('non-existing-token')

        await expect(resetPassword.execute({
            password: '123123', 
            token
        }),
        ).rejects.toBeInstanceOf(AppError);
    });


    it('should not be able reset the password with an non-existing-token', async () =>{
        await expect(resetPassword.execute({
            password: '123123', 
            token: 'non-valid-token'
        }),
        ).rejects.toBeInstanceOf(AppError);
    });


    it('should not be able reset the password if the token got expired (2 hours)', async () =>{
       
        //create a new user
        const user = await fakeUsersRepository.create({
            name: 'Teste',
            email: 'teste@gmail.com',
            password: '123456'
        });
       
        //generate the token
        const {token} = await fakeUserTokensRepository.generate(user.id);

        //when the method call the Date.now() function It'll execute the function writed on the mock (once)
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            const customDate = new Date();

            return customDate.setHours(customDate.getHours() + 3);
        });

        await expect(
            resetPassword.execute({
                password: '123123', 
                token
            }),
        ).rejects.toBeInstanceOf(AppError)

    });
});
