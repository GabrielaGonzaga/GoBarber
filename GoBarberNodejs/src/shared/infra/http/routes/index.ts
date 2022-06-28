import {Router} from 'express';
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.route';
import passwordRouter from '@modules/users/infra/http/routes/password.route';
import usersRouter from '@modules/users/infra/http/routes/users.route';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.route';
import profileRouter from '@modules/users/infra/http/routes/profile.route';
import providersRouter from '@modules/appointments/infra/http/routes/providers.route';

const routes = Router();

// all the routes that use "appointment" 'll be passed to the appointments.route
routes.use('/users', usersRouter);
routes.use('/profile', profileRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/providers', providersRouter);
routes.use('/appointments', appointmentsRouter);


export default routes;