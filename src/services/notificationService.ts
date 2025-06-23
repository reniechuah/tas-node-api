import User from '../models/User';
import TeacherInfo from '../models/TeacherInfo';
import StudentInfo from '../models/StudentInfo';
import TeacherStudent from '../models/TeacherStudent';
import TeacherNotFoundError from '../errors/TeacherNotFoundError';

export async function getNotificationRecipients(teacherEmail: string, notification: string): Promise<string[]> {
  // 1. Get teacher's user and teacher info
  const teacherUser = await User.findOne({ where: { email: teacherEmail } });
  if (!teacherUser) throw new TeacherNotFoundError();

  const teacherInfo = await TeacherInfo.findOne({ where: { userId: teacherUser.id } });
  if (!teacherInfo) throw new TeacherNotFoundError();

  // 2. Get students registered with teacher
  const registeredLinks = await TeacherStudent.findAll({
    where: { teacherInfoId: teacherInfo.id },
    include: [{ model: StudentInfo, include: [User] }]
  });

  const registeredEmails = registeredLinks
    .filter(link => link.StudentInfo?.status !== 'SUSPENDED')
    .map(link => link.StudentInfo?.User?.email)
    .filter((email): email is string => !!email);

  // 3. Extract @mentioned student emails from notification
  const mentionedEmails = (notification.match(/@([\w.+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g) || [])
    .map(email => email.slice(1)); // Remove '@'
  
  const mentionedUsers = await User.findAll({
    where: { email: mentionedEmails }
  });

  const mentionedStudentInfos = await StudentInfo.findAll({
    where: {
      userId: mentionedUsers.map(u => u.id),
      status: 'ACTIVE'
    },
    include: [User]
  });

  const mentionedActiveEmails = mentionedStudentInfos
    .map(si => si.User?.email)
    .filter((email): email is string => !!email);

  // 4. Combine and deduplicate
  const allRecipients = Array.from(new Set([...registeredEmails, ...mentionedActiveEmails]));

  return allRecipients;
}
