import { Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from "typeorm";

import User from "@modules/users/infra/typeorm/entities/user"

// class appointment
@Entity('appointments')
class Appointment  {
    //declare the atributes/params
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    provider_id: string;

    @ManyToOne(() => User)
    @JoinColumn({name: 'provider_id'})
    provider: User;

    @Column()
    user_id: string;

    @ManyToOne(() => User)
    @JoinColumn({name: 'user_id'})
    user: User;

    @Column('timestamp with time zone')
    date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Appointment;

  // //constructor get the infos given and declare that they're are the atributes 
    // constructor({provider, date}: Omit< Appointment, 'id'>){
    //     this.id = uuid();
    //     this.provider = provider;
    //     this.date = date;
    // }