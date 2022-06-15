import { uuid } from 'uuidv4';
import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";
import IUsersRepository from "../../repositories/IUserRepository";
import User from "../../infra/typeorm/entities/User";


class FakeUsersRepository implements IUsersRepository{

    private users: User[] = [];
   
    public async findById(id: string): Promise<User | undefined>{
        const user = this.users.find(user => user.id == id)
        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined>{
        const user = this.users.find(user => user.email == email)
        return user;
    }

    public async create({name, email, password}: ICreateUserDTO): Promise<User> {

        const user = new User();

        //declare the atributes, from the instanced class
        Object.assign(user, {id:uuid(), name, email, password});

        this.users.push(user);

        return user
    }

    public async save(user: User): Promise<User> {

        const findeIndex = this.users.findIndex(user => user.id == user.id)
        this.users[findeIndex] = (user);
        return user;
    }
}

export default FakeUsersRepository;
