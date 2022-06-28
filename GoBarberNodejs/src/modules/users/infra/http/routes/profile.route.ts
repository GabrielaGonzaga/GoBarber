import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ProfileController from '../controllers/ProfileController';


const profileRouter = Router();
const profileController = new ProfileController();

//indicate that the user need to be authenticated to user this route
profileRouter.use(ensureAuthenticated);

profileRouter.put('/', profileController.create);
profileRouter.get('/', profileController.show);

export default profileRouter;