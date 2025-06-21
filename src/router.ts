import Express from 'express';
import HealthcheckController from './controllers/HealthcheckController';
import UserController from './controllers/UserController';
import NotificationController from './controllers/NotificationController';

const router = Express.Router();

// Temporarily mounting controllers at '/' to match the endpoint structure in the assignment doc.
router.use('/', HealthcheckController);
router.use('/', UserController);
router.use('/', NotificationController);

export default router;
