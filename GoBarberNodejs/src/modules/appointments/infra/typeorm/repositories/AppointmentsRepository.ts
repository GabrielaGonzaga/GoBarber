import ICreateAppointmentDTO from "@modules/appointments/dtos/ICreateAppointmentDTO";
import IFindAllDayFromProviderDTO from "@modules/appointments/dtos/IFindAllDayFromProviderDTO";
import IFindAllMonthFromProviderDTO from "@modules/appointments/dtos/IFindAllMonthFromProviderDTO";
import {getRepository, Repository, Raw} from "typeorm";
import IAppointmentsRepository from "../../../repositories/IAppointmentsRepository";
import Appointment from "../entities/appointment";


class AppointmentsRepository implements IAppointmentsRepository{

    //indicate the type of the repository
    private ormRepository: Repository<Appointment>

     constructor(){
        //create the repository typed above
        this.ormRepository = getRepository(Appointment);
     }

     public async findAllInMonthProvider({provider_id, month, year}: IFindAllMonthFromProviderDTO): Promise<Appointment[]> {
        // if the month is only with 2 algarisms it will pass the 0 on the start
        const parsedMonth = String(month).padStart(2, '0');

        const appoitments = await this.ormRepository.find({
            where: {
                provider_id, 
                date: Raw(dateFieldName => `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`)
            }
        })

        return appoitments
    }

    public async findAllInDayProvider({provider_id, day, month, year}: IFindAllDayFromProviderDTO): Promise<Appointment[]> {
        const parsedDay = String(day).padStart(2, '0');
        const parsedMonth = String(month).padStart(2, '0');

        const appoitments = await this.ormRepository.find({
            where: {
                provider_id, 
                date: Raw(dateFieldName => `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`)
            }
        })

        return appoitments
    }
   
    public async findApById(id: string): Promise<Appointment | undefined>{
        const findApById = await this.ormRepository.findOne({
            where: {id: id}
        })
        return findApById || undefined
    }

    //Find Appointment By Date method
    public async findApByDate(date: Date): Promise<Appointment | undefined>{
        const findApByDate = await this.ormRepository.findOne({
            where: {date: date}
        })

        return findApByDate || undefined;
    }

    public async create({provider_id, date, user_id}: ICreateAppointmentDTO): Promise<Appointment> {
        
        const appointment = this.ormRepository.create({provider_id, user_id, date})

        await this.ormRepository.save(appointment);

        return appointment;
    }

}

export default AppointmentsRepository
