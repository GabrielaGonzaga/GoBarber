import CreateApService from "@modules/appointments/services/CreateApService";
import { parseISO } from "date-fns";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class AppointmentsController{

    public async create(request: Request, response: Response): Promise<Response>{
        const {provider_id, date} = request.body;

        // convert the date and change the hour to 0
        const parseDate = parseISO(date);
        
        const createAppointment = container.resolve(CreateApService);
        
        const appointment = await createAppointment.execute({
            date: parseDate, 
            provider_id
        });

        // return the new appointment
        return response.json(appointment);

    }
}