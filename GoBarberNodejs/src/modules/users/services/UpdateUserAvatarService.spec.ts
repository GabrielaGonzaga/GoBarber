import AppError from "@shared/errors/AppError";
import UpdateUserAvatarService from "./UpdateUserAvatarService";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import FakeUsersRepository from '../../users/repositories/fakes/FakeUserRepository'
import FakeStorageProvider from "@shared/container/providers/StorageProvider/fakes/FakeStorageProvider";


describe('UpdateUserAvatar', () =>{
    
    it('should be able to update an user avatar', async () =>{

        //instance the fake repository
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeStorageProvider = new FakeStorageProvider();

        //use the user service by the fake repopsitory/interface
        const updateUserAvatar = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);

        const user = await fakeUsersRepository.create({
            name: "Teste da Silva",
            email: 'teste@gmail.com',
            password: '123456'
        })

        //call the createUsers method from the service to test
        const response = await updateUserAvatar.execute({
            user_id: user.id,
            avatarFilename: 'foto.png'
        });

        //verify if the user have an id
        expect(user.avatar).toBe('foto.png');
    });

    it('should be not able to update avatar from an non existing user user ', async () =>{

        //instance the fake repository
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeStorageProvider = new FakeStorageProvider();

        //use the user service by the fake repopsitory/interface
        const updateUserAvatar = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);

        //verify if the user have an id
        await expect(updateUserAvatar.execute({
            user_id: 'non-exist-userId',
            avatarFilename: 'foto.png'
        }),).rejects.toBeInstanceOf(AppError);
    });

    it('should delete the old user avatar, before saving the new one', async () =>{

        //instance the fake repository
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeStorageProvider = new FakeStorageProvider();

        //spy the deleteFile mtehod
        const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

        //use the update service by the fakes repopsitories
        const updateUserAvatar = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);

        const user = await fakeUsersRepository.create({
            name: "Teste da Silva",
            email: 'teste@gmail.com',
            password: '123456'
        })

        //call the updateUser method from the service to put an avatar
        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFilename: 'foto.png'
        });

        //call the updateUser method from the service to test if it'll be deleted
        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFilename: 'foto2.png'
        });

        //expect that the deleteFile method was called to delete the old avatar
        expect(deleteFile).toHaveBeenCalledWith('foto.png');

        //expect that the new avatar is the second on 'foto2.png'
        expect(user.avatar).toBe('foto2.png');
    });

});