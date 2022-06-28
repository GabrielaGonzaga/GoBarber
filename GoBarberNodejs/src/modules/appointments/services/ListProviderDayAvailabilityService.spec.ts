import ListProviderDayAvailabilityService from "./ListProviderDayAvailabilityService";
import FakeAppointmentsRepository from "../repositories/fakes/FakeAppointmentsRepository"

let listProviderDayAvailability: ListProviderDayAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository

describe('ListProviderDayAvailability', () =>{

    
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();  
        listProviderDayAvailability = new ListProviderDayAvailabilityService(fakeAppointmentsRepository);     
    });

    it('should be able to list the day availability from a provider', async () =>{

        await fakeAppointmentsRepository.create({
            provider_id: 'user_id',
            user_id: 'user_id',
            date: new Date(2022, 4, 20, 14, 0, 0)
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'user_id',
            user_id: 'user_id',
            date: new Date(2022, 4, 20, 15, 0, 0)
        });

        //when the method call the Date.now() function It'll execute the function writed on the mock (once)
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date (2022, 4, 20, 11).getTime();
        });

        const availability = await listProviderDayAvailability.execute({
            provider_id: 'user_id',
            day: 20,
            year: 2022,
            month: 5
        });

        expect(availability).toEqual(expect.arrayContaining([
            {hour:8, available: false},
            {hour:9, available: false},
            {hour:10, available: false},
            {hour:11, available: false},
            {hour:12, available: true},
            {hour:13, available: true},
            {hour:14, available: false},
            {hour:15, available: false},
            {hour:16, available: true},
            {hour:17, available: true},
        ]))
    });
});