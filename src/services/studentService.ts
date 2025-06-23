import User from '../models/User';
import StudentInfo from '../models/StudentInfo';
import StudentNotFoundError from '../errors/StudentNotFoundError';

// Suspend a student
export async function suspendStudentByEmail(email: string): Promise<void> {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new StudentNotFoundError();

  const studentInfo = await StudentInfo.findOne({ where: { userId: user.id } });
  if (!studentInfo) throw new StudentNotFoundError();

  if (studentInfo.status === 'SUSPENDED') return;
  
  studentInfo.status = 'SUSPENDED';
  await studentInfo.save();
}
