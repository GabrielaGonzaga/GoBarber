import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";
import IFindAllProvidersDTO from "@modules/users/dtos/IFindAllProvidersDTO";
import {getRepository, Not, Repository} from "typeorm";
import IUsersRepository from "../../../repositories/IUsersRepository";
import User from "../entities/user";


class UsersRepository implements IUsersRepository{

    //indicate the type of the repository
    private ormRepository: Repository<User>

     constructor(){
        //create the repository typed above
        this.ormRepository = getRepository(User);
    }

    public async findAllProviders({except_user_id}: IFindAllProvidersDTO): Promise<User[]> {

        let users: User[]

        if (except_user_id){
            users = await this.ormRepository.find({
                where:{
                    id: Not(except_user_id),
                }
            })
        }else{
            users = await this.ormRepository.find();
        }

        return users
    }
   
    public async findById(id: string): Promise<User | undefined>{

        const user = await this.ormRepository.findOne(id)
        return user
    }

    public async findByEmail(email: string): Promise<User | undefined>{
        const user = await this.ormRepository.findOne({
            where: {email: email}
        })
        return user
    }

    public async create({name, email, password}: ICreateUserDTO): Promise<User> {
        
        const User = this.ormRepository.create({name, email, password})

        await this.ormRepository.save(User);

        return User;
    }

    public async save(user: User): Promise<User> {

        await this.ormRepository.save(user);

        return user;
    }
}

export default UsersRepository
