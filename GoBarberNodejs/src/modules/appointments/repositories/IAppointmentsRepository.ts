import Appointment from '../infra/typeorm/entities/appointment'
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllDayFromProviderDTO from '../dtos/IFindAllDayFromProviderDTO';
import IFindAllMonthFromProviderDTO from '../dtos/IFindAllMonthFromProviderDTO';

export default interface IAppointmentsRepository {
    create(data: ICreateAppointmentDTO): Promise<Appointment>;
    findApByDate( date: Date, provider_id: string): Promise<Appointment|undefined>;
    findAllInMonthProvider( data: IFindAllMonthFromProviderDTO): Promise<Appointment[]>;
    findAllInDayProvider( data: IFindAllDayFromProviderDTO): Promise<Appointment[]>;
}