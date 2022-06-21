import AuthenticateUserService from "./AuthenticateUserService";
import FakeUsersRepository from '../../users/repositories/fakes/FakeUserRepository'
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import AppError from "@shared/errors/AppError";
import CreateUserService from "./CreateUserService";

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () =>{

    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
        authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);      
    });
    
    it('should be able to authenticate a user', async () =>{

        //call the createUsers method from the service to test
        const user = await createUser.execute({
            name: 'Teste',
            email: 'email@gmail.com',
            password: '123456'
        });

        //call the createUsers method from the service to test
        const response = await authenticateUser.execute({
            email: 'email@gmail.com',
            password: '123456'
        });

        //verify if the user have an id
        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);
    });

    it('should be not able to authenticate with non existing user', async () =>{

        await expect(
            authenticateUser.execute({
                email: 'email@gmail.com',
                password: '123456'
            }),
        ).rejects.toBeInstanceOf(AppError)

    });

    it('should be not able to authenticate with wrong password', async () =>{

       //call the createUsers method from the service to test
       await createUser.execute({
           name: 'Teste',
           email: 'email@gmail.com',
           password: '123456'
       });

       //verify if the user have an id
       await expect(authenticateUser.execute({
            email: 'email@gmail.com',
            password: 'wrong-passoword'
        })).rejects.toBeInstanceOf(AppError)

    });
});