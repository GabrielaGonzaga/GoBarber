import CreateAppointmentService from "./CreateAppointmentService";
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import AppError from "@shared/errors/AppError";

let createAppointment: CreateAppointmentService;
let fakeAppointmentsRepository: FakeAppointmentsRepository

describe('CreateAppointment', () =>{
    
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();  
        createAppointment = new CreateAppointmentService(fakeAppointmentsRepository);     
    });
    
    it('should be able to create a new appointment', async () =>{

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        })

        const appointment = await createAppointment.execute({
            date: new Date(2020, 4, 10, 13),
            user_id: 'user_id',
            provider_id: '1272872'
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('1272872');
    });

    it('should be not able to create two appointments on the same time', async () =>{

        const appointmentDate = new Date(2022, 8, 10, 15);

        await createAppointment.execute({
            date: appointmentDate,
            user_id: 'user_id',
            provider_id: '1272872'
        });

        await expect(createAppointment.execute({
            date: appointmentDate,
            user_id: 'user_id',
            provider_id: '1272872'
        })).rejects.toBeInstanceOf(AppError)

    });

    it('should be not able to create an appointment on a past date', async () =>{

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        })

        await expect(createAppointment.execute({
            date:  new Date(2020, 4, 10, 11),
            user_id: 'user_id',
            provider_id: '1272872'
        })).rejects.toBeInstanceOf(AppError)

    });

    it('should be not able to create an appointment with the same user as provider', async () =>{

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        })

        await expect(createAppointment.execute({
            date:  new Date(2020, 4, 10, 13),
            user_id: 'user-id',
            provider_id: 'user-id'
        })).rejects.toBeInstanceOf(AppError)

    });

    it('should be able to create an appointment only beetween 8am and 5pm', async () =>{

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 6).getTime();
        })

        await expect(createAppointment.execute({
            date:  new Date(2020, 4, 10, 7),
            user_id: 'user-id',
            provider_id: 'provider-id'
        })).rejects.toBeInstanceOf(AppError);

        await expect(createAppointment.execute({
            date:  new Date(2020, 4, 10, 18),
            user_id: 'user-id',
            provider_id: 'provider-id'
        })).rejects.toBeInstanceOf(AppError);

    });
    
});