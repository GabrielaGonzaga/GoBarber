import AppError from "@shared/errors/AppError";
import FakeUsersRepository from "../repositories/fakes/FakeUserRepository";
import ShowProfileService from "./ShowProfileService";


let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('UpdateProfile', () =>{

    
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();

        showProfile = new ShowProfileService(fakeUsersRepository);     
    });

    it('should be able to show the profile', async () =>{

        const user = await fakeUsersRepository.create({
            name: "Teste da Silva",
            email: 'teste@gmail.com',
            password: '123456'
        })

        //call the updateProfile method from the service to test
        const profile = await showProfile.execute({
            user_id: user.id
        });

        //verify if the user informations were updated
        expect(profile.name).toBe('Teste da Silva');
        expect(profile.email).toBe('teste@gmail.com');
    });

    it('should not be able to show the profile from a non-existing user', async () =>{

        await expect(showProfile.execute({
                user_id: 'non-existing-user-id'
            }),
        ).rejects.toBeInstanceOf(AppError);

    });
});