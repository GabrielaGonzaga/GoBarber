import "reflect-metadata";
import { injectable, inject } from 'tsyringe';
import {getDaysInMonth, getDate, isAfter} from "date-fns";
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'

interface IRequest {
    provider_id: string;
    month: number;
    year: number;
}    

type IResponse = Array<{
    day: number;
    available: boolean
}>;

@injectable()
class ListProviderMonthAvailabilityService{

    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository
    ){}

    public async execute({ provider_id, month, year }: IRequest): Promise<IResponse>{
        const appointments = await this.appointmentsRepository.findAllInMonthProvider({
            provider_id,
            year,
            month,
        })

        // number of days in the month passed
        const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1 ))

        //array by the number of days in month 
        const eachDayArray = Array.from({
            //* add +1 to start with 1, and not 0
            length: numberOfDaysInMonth},  (value, index) => index + 1)

        const availability = eachDayArray.map(day => {
            const compareDate = new Date(year, month - 1, day, 23, 59, 59);
            const appointmentsInDay = appointments.filter(appointment => {
                return getDate(appointment.date) == day;
            });

            console.log(compareDate)

            return {
                day,
                //the day have 10 available appointmenats hours, if it has less then 10, then there's hours available
                available:  isAfter(compareDate, new Date()) && appointmentsInDay.length < 10,
            }
        })

        return availability;
        
    }
    
}

export default ListProviderMonthAvailabilityService;