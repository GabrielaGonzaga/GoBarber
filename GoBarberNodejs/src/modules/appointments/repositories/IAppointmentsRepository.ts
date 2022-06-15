import Appointment from '../infra/typeorm/entities/appointment'
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';

export default interface IAppointmentsRepository {

    create(data: ICreateAppointmentDTO): Promise<Appointment>;

    findApByDate( date: Date): Promise<Appointment|undefined>;

    // findApById( id: string): Promise<Appointment|undefined>;

}