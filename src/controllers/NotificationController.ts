import Express, { RequestHandler, NextFunction } from 'express';
import { getNotificationRecipients } from '../services/notificationService';
import { StatusCodes } from 'http-status-codes';
import validator from 'validator';
import Logger from '../config/logger';

const NotificationController = Express.Router();
const LOG = new Logger('NotificationController.ts');

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
  if (!teacher || !notification || !validator.isEmail(teacher)) {
    LOG.warn(`Invalid input: teacher=${teacher}, notification=${notification ? 'present' : 'missing'}`);
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Missing or invalid teacher or notification',
    });
  }
  
  try {
    const recipients = await getNotificationRecipients(teacher, notification);
    LOG.info(`Notification recipients retrieved for teacher: ${teacher}`);
    return res.status(StatusCodes.OK).json({ recipients });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    LOG.error(`Error retrieving notification recipients for teacher ${teacher}: ${errorMessage}`);
    next(err);
  }
}

// Register route
NotificationController.post('/retrievefornotifications', retrieveRecipients);

export default NotificationController;
