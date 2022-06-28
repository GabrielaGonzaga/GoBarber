import CreateAppointmentService from "@modules/appointments/services/CreateAppointmentService";
import { parseISO } from "date-fns";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class AppointmentsController{

    public async create(request: Request, response: Response): Promise<Response>{

        const user_id = request.user.id;

        const {provider_id, date} = request.body;

        // convert the date and change the hour to 0
        const parseDate = parseISO(date);
        
        const createAppointment = container.resolve(CreateAppointmentService);
        
        const appointment = await createAppointment.execute({
            date: parseDate, 
            user_id,
            provider_id
        });

        // return the new appointment
        return response.json(appointment);

    }
}