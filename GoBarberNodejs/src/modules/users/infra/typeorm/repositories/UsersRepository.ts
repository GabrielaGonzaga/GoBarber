import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";
import {getRepository, Repository} from "typeorm";
import IUsersRepository from "../../../repositories/IUsersRepository";
import User from "../entities/User";


class UsersRepository implements IUsersRepository{

    //indicate the type of the repository
    private ormRepository: Repository<User>

     constructor(){
        //create the repository typed above
        this.ormRepository = getRepository(User);
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
