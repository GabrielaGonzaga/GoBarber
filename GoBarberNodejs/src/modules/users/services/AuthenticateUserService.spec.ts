import AuthenticateUserService from "./AuthenticateUserService";
import FakeUsersRepository from '../../users/repositories/fakes/FakeUserRepository'
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import AppError from "@shared/errors/AppError";
import CreateUserService from "./CreateUserService";

describe('AuthenticateUser', () =>{
    
    it('should be able to authenticate a user', async () =>{

        //instance the fake repository
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

        //use the user service by the fake repopsitory/interface
        const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);

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

        //instance the fake repository
        const fakeUsersRepository = new FakeUsersRepository();

        const fakeHashProvider = new FakeHashProvider();

        //use the user service by the fake repopsitory/interface
        const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);

        await expect(
            authenticateUser.execute({
                email: 'email@gmail.com',
                password: '123456'
            }),
        ).rejects.toBeInstanceOf(AppError)

    });

    it('should be not able to authenticate with wrong password', async () =>{

       //instance the fake repository
       const fakeUsersRepository = new FakeUsersRepository();
       const fakeHashProvider = new FakeHashProvider();

       const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

       //use the user service by the fake repopsitory/interface
       const authenticateUser = new AuthenticateUserService(fakeUsersRepository,fakeHashProvider );

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