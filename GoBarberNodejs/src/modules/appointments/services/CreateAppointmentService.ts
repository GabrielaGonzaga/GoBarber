import "reflect-metadata";
import { injectable, inject } from "tsyringe";
import { isBefore, startOfHour, getHours } from "date-fns";
import AppError from '@shared/errors/AppError';
import Appointment from "../infra/typeorm/entities/appointment";
import IAppointmentsRepository from "../repositories/IAppointmentsRepository";

interface RequestDTO{
    provider_id: string;
    user_id: string
    date: Date;
}

@injectable()
class CreateAppointmentService {

    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository:IAppointmentsRepository
    ){}

    public async execute({date, provider_id, user_id }: RequestDTO): Promise<Appointment>{

    const appointmentDate = startOfHour(new Date(date));

    //if the date is before the current date, it throws an error
    if (isBefore(appointmentDate, Date.now())){
        throw new AppError("You can't create an appointment on a passed date");
    }

    if (user_id === provider_id){
        throw new AppError("You can't create an appointment with yourself!");
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17){
        throw new AppError("You can only create appointments between 8am and 5pm");
    }

    // search appointments that have the same date by the method findApByDate
    const findAppointmentInSameDate = await this.appointmentsRepository.findApByDate(appointmentDate, provider_id);

    //if has the same date, then it shows an error 
    if(await findAppointmentInSameDate){
        throw new AppError('This appointment is already booked');
    }

    // create a new appointment by the create method on the AppointementsRepository and save
    const appointment = await this.appointmentsRepository.create({
        provider_id, 
        user_id,
        date: appointmentDate,
    });

    return appointment;

    }
}

export default CreateAppointmentService;