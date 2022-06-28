import AppError from "@shared/errors/AppError";
import FakeUsersRepository from "../repositories/fakes/FakeUserRepository";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import UpdateProfileService from "./UpdateProfileService";


let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () =>{

    
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();

        updateProfile = new UpdateProfileService(
            fakeUsersRepository, 
            fakeHashProvider
        );     
    });

    it('should be able to update an profile', async () =>{

        const user = await fakeUsersRepository.create({
            name: "Teste da Silva",
            email: 'teste@gmail.com',
            password: '123456'
        })

        //call the updateProfile method from the service to test
        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'Gabriela Gonzaga',
            email: 'testegg@gmail.com'
        });

        //verify if the user informations were updated
        expect(updatedUser.name).toBe('Gabriela Gonzaga');
        expect(updatedUser.email).toBe('testegg@gmail.com');
    });

    it('should be not able to update an profile with an used email', async () =>{

        await fakeUsersRepository.create({
            name: "Teste da Silva",
            email: 'teste@gmail.com',
            password: '123456'
        })

        const user = await fakeUsersRepository.create({
            name: "Teste Sousa",
            email: 'testesilva@gmail.com',
            password: '123456'
        })

        //call the createUsers method from the service to test
       await expect(updateProfile.execute({
                user_id: user.id,
                name: 'Gabriela Gonzaga',
                email: 'teste@gmail.com'
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to update the password', async () =>{

        const user = await fakeUsersRepository.create({
            name: "Teste da Silva",
            email: 'teste@gmail.com',
            password: '123456'
        })

        //call the updateProfile method from the service to test
        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'Gabriela Gonzaga',
            email: 'testegg@gmail.com',
            old_password: '123456',
            password: '123'
        });

        //verify if the user password were updated
        expect(updatedUser.password).toBe('123');
    }); 

    it('should not be able to update the password without the old password', async () =>{

        const user = await fakeUsersRepository.create({
            name: "Teste da Silva",
            email: 'teste@gmail.com',
            password: '123456'
        })

        //call the updateProfile method from the service to test
        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'Gabriela Gonzaga',
                email: 'testegg@gmail.com',
                password: '123'
            }),
        ).rejects.toBeInstanceOf(AppError);
    }); 

    it('should not be able to update the password with wrong old password', async () =>{

        const user = await fakeUsersRepository.create({
            name: "Teste da Silva",
            email: 'teste@gmail.com',
            password: '123456'
        })

        //call the updateProfile method from the service to test
        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'Gabriela Gonzaga',
                email: 'testegg@gmail.com',
                old_password: '12345',
                password: '123'
            }),
        ).rejects.toBeInstanceOf(AppError);
    }); 

    it('should not be able to update the profile from a non-existing user', async () =>{

        await expect(updateProfile.execute({
                user_id: 'non-existing-user-id',
                name: "Teste da Silva",
                email: 'teste@gmail.com',
                password: '123456'
            }),
        ).rejects.toBeInstanceOf(AppError);

    });
    

});