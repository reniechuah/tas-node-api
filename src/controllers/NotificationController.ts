import Express, { RequestHandler, NextFunction } from 'express';
import { getNotificationRecipients } from '../services/notificationService';
import { StatusCodes } from 'http-status-codes';

const NotificationController = Express.Router();


/**
 * Given a teacher and a notification, returns a list of students who should receive it.
 * 
 * Requirements:
 * - Students must not be suspended.
 * - Students must either be registered to the teacher OR @mentioned in the notification.
 * 
 * Expects: { "teacher": string, "notification": string }
 * Returns: { "recipients": string[] }
 * 
 */
const retrieveRecipients: RequestHandler = async (req, res, next: NextFunction) => {
  const { teacher, notification } = req.body;

  // Validate request input
  if (!teacher || !notification) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Missing teacher or notification',
    });
  }

  
  try {
    const recipients = await getNotificationRecipients(teacher, notification);
    return res.status(StatusCodes.OK).json({ recipients });
  } catch (err: unknown) {
    next(err);
  }
}

// Register route
NotificationController.post('/retrievefornotifications', retrieveRecipients);

export default NotificationController;
