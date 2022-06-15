import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from "typeorm";

// class appointment
@Entity('users')
class User  {
    //declare the atributes/params
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    avatar: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default User;

  // //constructor get the infos given and declare that they're are the atributes 
    // constructor({provider, date}: Omit< Appointment, 'id'>){
    //     this.id = uuid();
    //     this.provider = provider;
    //     this.date = date;
    // }