import User from '../models/User';
import StudentInfo from '../models/StudentInfo';

export async function suspendStudentByEmail(email: string): Promise<void> {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('Student not found');

  const studentInfo = await StudentInfo.findOne({ where: { userId: user.id } });
  if (!studentInfo) throw new Error('StudentInfo not found');

  if (studentInfo.status === 'SUSPENDED') return;
  
  studentInfo.status = 'SUSPENDED';
  await studentInfo.save();
}
