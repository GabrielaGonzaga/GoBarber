
import User from "../infra/typeorm/entities/user";
import ICreateUserDTO from '../dtos/ICreateUserDTO'
import IFindAllProvidersDTO from '../dtos/IFindAllProvidersDTO'

interface IUserRepository{
    findAllProviders(data: IFindAllProvidersDTO): Promise<User[]>
    findById(id: string): Promise<User | undefined>
    findByEmail(email: string): Promise<User | undefined>
    create(data: ICreateUserDTO): Promise<User>;
    save(user: User): Promise<User>;
}

export default IUserRepository;