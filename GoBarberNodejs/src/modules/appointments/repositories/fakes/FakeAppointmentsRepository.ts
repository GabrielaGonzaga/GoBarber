import { uuid } from 'uuidv4'
import isEqual from 'date-fns/isEqual';
import ICreateAppointmentDTO from "@modules/appointments/dtos/ICreateAppointmentDTO";
import IAppointmentsRepository from "@modules/appointments/dtos/ICreateAppointmentDTO";
import Appointment from "../../infra/typeorm/entities/appointment";


class AppointmentsRepository implements IAppointmentsRepository{
    
    provider_id: string;
    date: Date;

    private appointments: Appointment[] = [];

    // public async findApById(id: string): Promise<Appointment | undefined>{
    //     const findAppointment = this.appointments.find(appointment => appointment.id == id);
    //     return findAppointment
    // }

    //Find Appointment By Date method
    public async findApByDate(date: Date): Promise<Appointment | undefined>{
        const findAppointment = this.appointments.find(appointment => isEqual(appointment.date, date));
        return findAppointment
    }

    public async create({provider_id, date}: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = new Appointment();

        //declare the atributes, from the instanced class
        Object.assign(appointment, {id:uuid(), date, provider_id});

        this.appointments.push(appointment);

        return appointment
    }

}

export default AppointmentsRepository
