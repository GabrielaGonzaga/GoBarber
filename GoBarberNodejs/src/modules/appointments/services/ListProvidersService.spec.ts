import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUserRepository";
import ListProviderService from "./ListProvidersService";

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProviderService;

describe('ListProviderMonthAvailability', () =>{

    
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();

        listProviders = new ListProviderService(fakeUsersRepository);     
    });

    it('should be able to list the providers', async () =>{

        const user1 = await fakeUsersRepository.create({
            name: "Teste da Silva",
            email: 'testesilva@gmail.com',
            password: '1234'
        })

        const user2 = await fakeUsersRepository.create({
            name: "Teste Pereira",
            email: 'testepereira@gmail.com',
            password: '12345'
        })

        const loggedUser = await fakeUsersRepository.create({
            name: "Teste Santos",
            email: 'testesantos@gmail.com',
            password: '123456'
        })

        //call the updateProfile method from the service to test
        const providers = await listProviders.execute({
            user_id: loggedUser.id
        });

        //verify if the providers were listed
        expect(providers).toEqual([user1, user2]);
    });
});