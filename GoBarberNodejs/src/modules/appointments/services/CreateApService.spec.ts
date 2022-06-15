import CreateApService from "./CreateApService";
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import AppError from "@shared/errors/AppError";

describe('CreateAppointment', () =>{
    
    it('should be able to create a new appointment', async () =>{

        //instance the fake repository
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();

        //use the Ap service by the fake repopsitory/interface
        const createAppointment = new CreateApService(fakeAppointmentsRepository);

        //call the createAppointments method from the service to test
        const appointment = await createAppointment.execute({
            date: new Date(),
            provider_id: '1272872'
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('1272872');
    });

    it('should be not able to create two appointments on the same time', async () =>{

        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const createAppointment = new CreateApService(fakeAppointmentsRepository);

        const appointmentDate = new Date(2020, 4, 10, 11);

        await createAppointment.execute({
            date: appointmentDate,
            provider_id: '1272872'
        });

        await expect(createAppointment.execute({
            date: appointmentDate,
            provider_id: '1272872'
        })).rejects.toBeInstanceOf(AppError)

        // expect(appointment).toHaveProperty('id');
        // expect(appointment.provider_id).toBe('1272872');
    });

    
});