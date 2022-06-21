import CreateUserService from "./CreateUserService";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import FakeUsersRepository from '../../users/repositories/fakes/FakeUserRepository'
import AppError from "@shared/errors/AppError";

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () =>{

    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();  

        createUser = new CreateUserService(
            fakeUsersRepository, 
            fakeHashProvider
        );
    });
    
    it('should be able to create a new user', async () =>{

        //call the createUsers method from the service to test
        const user = await createUser.execute({
            name: 'Teste',
            email: 'teste@gmail.com',
            password: '123456'
        });

        //verify if the user have an id
        expect(user).toHaveProperty('id');
    });

    it('should be not able to create two users with the same email', async () =>{
        const email = 'teste@gmail.com';

        await createUser.execute({
            name: 'Teste',
            email: email,
            password: '123456'
        });

        await expect(createUser.execute({
            name: 'Teste',
            email: email,
            password: '123456'
        })).rejects.toBeInstanceOf(AppError)
    });
});