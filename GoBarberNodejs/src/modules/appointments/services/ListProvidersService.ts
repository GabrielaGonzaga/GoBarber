import "reflect-metadata";
import { injectable, inject } from 'tsyringe';
import User from "@modules/users/infra/typeorm/entities/user";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";

interface IRequest {
    user_id: string;
}      

@injectable()
class ListProviderService{

    constructor(
        @inject('UsersRepository')
        private UsersRepository: IUsersRepository,
    ){}

    public async execute({ user_id }: IRequest): Promise<User[]>{

        const users = await this.UsersRepository.findAllProviders({except_user_id: user_id});

        return users;
    }
}

export default ListProviderService;