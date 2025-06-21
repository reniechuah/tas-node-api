import Express, { RequestHandler } from 'express';
import { getNotificationRecipients } from '../services/notificationService';

const NotificationController = Express.Router();

const retrieveRecipients: RequestHandler = async (req, res) => {
  const { teacher, notification } = req.body;

  if (!teacher || !notification) {
    return res.status(400).json({ error: 'Missing teacher or notification' });
  }
  
  try {
    const recipients = await getNotificationRecipients(teacher, notification);
    return res.status(200).json({ recipients });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(404).json({ error: err.message });
    }
    return res.status(500).json({ error: 'Unknown error occurred' });
  }
}

NotificationController.post('/retrievefornotifications', retrieveRecipients);

export default NotificationController;
