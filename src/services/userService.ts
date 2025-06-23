import User from '../models/User';
import TeacherInfo from '../models/TeacherInfo';
import StudentInfo from '../models/StudentInfo';
import TeacherStudent from '../models/TeacherStudent';
import TeacherNotFoundError from '../errors/TeacherNotFoundError';
import MultipleTeachersNotFoundError from '../errors/MultipleTeachersNotFoundError';


// Register students under a teacher
export async function registerStudentsToTeacher(teacherEmail: string, studentEmails: string[]): Promise<void> {
  // 1. Find teacher's userId
  const teacherUser = await User.findOne({ where: { email: teacherEmail } });
  if (!teacherUser) throw new TeacherNotFoundError();

  const teacherInfo = await TeacherInfo.findOne({ where: { userId: teacherUser.id } });
  if (!teacherInfo) throw new TeacherNotFoundError();

  // 2. Find all studentInfo records by email
  const studentUsers = await User.findAll({ where: { email: studentEmails } });
  if (studentUsers.length !== studentEmails.length) throw new Error('One or more students not found');

  const studentUserIds = studentUsers.map((u) => u.id);
  const studentInfos = await StudentInfo.findAll({
    where: { userId: studentUserIds },
  });

  // 3. Insert records into TeacherStudent (ignore duplicates)
  const insertOps = studentInfos.map((si) =>
    TeacherStudent.findOrCreate({
      where: {
        teacherInfoId: teacherInfo.id,
        studentInfoId: si.id,
      },
    })
  );
  await Promise.all(insertOps);
  return;
}

// Get students common to one or more teachers
export async function getCommonStudents(teacherEmails: string[]): Promise<string[]> {

  // 1. Get User -> TeacherInfo for each teacher email
  const teacherUsers = await User.findAll({ where: { email: teacherEmails } });

  if (teacherUsers.length !== teacherEmails.length) throw new MultipleTeachersNotFoundError();

  const teacherInfoIds = await Promise.all(
    teacherUsers.map(async (user) => {
      const info = await TeacherInfo.findOne({ where: { userId: user.id } });
      return info?.id;
    })
  );

  // 2. Find all studentInfoIds for each teacher
  const teacherToStudentMap = await Promise.all(
    teacherInfoIds.map((id) =>
      TeacherStudent.findAll({ where: { teacherInfoId: id } })
    )
  );

  // 3. Get common studentInfoIds across all teachers
  const studentIdLists = teacherToStudentMap.map(list =>
    list.map(ts => ts.studentInfoId)
  );

  const commonStudentIds = studentIdLists.reduce((a, b) =>
    a.filter(id => b.includes(id))
  );

  // 4. Get student emails from studentInfoIds
  const studentInfos = await StudentInfo.findAll({
    where: { id: commonStudentIds },
    include: [{ model: User, attributes: ['email'] }]
  });

  const emailsList = studentInfos
    .map(info => info.User?.email)
    .filter((email): email is string => Boolean(email));
  return emailsList;
}