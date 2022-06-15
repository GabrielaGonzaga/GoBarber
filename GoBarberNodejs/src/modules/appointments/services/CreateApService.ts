import "reflect-metadata";
import { injectable, inject } from "tsyringe";
import { startOfHour } from "date-fns";
import AppError from '@shared/errors/AppError';
import Appointment from "../infra/typeorm/entities/appointment";
import IAppointmentsRepository from "../repositories/IAppointmentsRepository";

interface RequestDTO{
    provider_id: string;
    date: Date;
}

@injectable()
class CreateApService {

    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository:IAppointmentsRepository
    ){}

    public async execute({date, provider_id}: RequestDTO): Promise<Appointment>{

    const appointmentDate = startOfHour(date);
    // search appointments that have the same date by the method findApByDate
    const findAppointmentInSameDate = await this.appointmentsRepository.findApByDate(appointmentDate);
    //if has the same date, then it shows an error 
    if(await findAppointmentInSameDate){
        throw new AppError('This appointment is already booked');
    }
    // create a new appointment by the create method on the AppointementsRepository and save
    const appointment = await this.appointmentsRepository.create({
        provider_id, 
        date: appointmentDate
    });

    return appointment;

    }

}

export default CreateApService;