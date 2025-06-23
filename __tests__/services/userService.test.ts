import { registerStudentsToTeacher, getCommonStudents } from '../../src/services/userService';
import User from '../../src/models/User';
import TeacherInfo from '../../src/models/TeacherInfo';
import StudentInfo from '../../src/models/StudentInfo';
import TeacherStudent from '../../src/models/TeacherStudent';

jest.mock('../../src/models/User');
jest.mock('../../src/models/TeacherInfo');
jest.mock('../../src/models/StudentInfo');
jest.mock('../../src/models/TeacherStudent');

describe('userService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('registerStudentsToTeacher', () => {
    it('should register students to a teacher', async () => {
      const teacherEmail = 'teacher@example.com';
      const studentEmails = ['student1@example.com', 'student2@example.com'];

      (User.findOne as jest.Mock).mockResolvedValue({ id: 1 });
      (TeacherInfo.findOne as jest.Mock).mockResolvedValue({ id: 10 });
      (User.findAll as jest.Mock).mockResolvedValue([{ id: 101 }, { id: 102 }]);
      (StudentInfo.findAll as jest.Mock).mockResolvedValue([{ id: 201 }, { id: 202 }]);
      (TeacherStudent.findOrCreate as jest.Mock).mockResolvedValue([]);

      await registerStudentsToTeacher(teacherEmail, studentEmails);

      expect(User.findOne).toHaveBeenCalledWith({ where: { email: teacherEmail } });
      expect(TeacherInfo.findOne).toHaveBeenCalledWith({ where: { userId: 1 } });
      expect(User.findAll).toHaveBeenCalledWith({ where: { email: studentEmails } });
      expect(StudentInfo.findAll).toHaveBeenCalledWith({ where: { userId: [101, 102] } });
      expect(TeacherStudent.findOrCreate).toHaveBeenCalledTimes(2);
    });
  });

  describe('getCommonStudents', () => {
    it('should return common students for teachers', async () => {
      const teacherEmails = ['teacher1@example.com', 'teacher2@example.com'];

      (User.findAll as jest.Mock).mockResolvedValue([{ id: 1 }, { id: 2 }]);
      (TeacherInfo.findOne as jest.Mock)
        .mockResolvedValueOnce({ id: 11 })
        .mockResolvedValueOnce({ id: 12 });

      (TeacherStudent.findAll as jest.Mock)
        .mockResolvedValueOnce([{ studentInfoId: 201 }, { studentInfoId: 202 }])
        .mockResolvedValueOnce([{ studentInfoId: 202 }, { studentInfoId: 203 }]);

      (StudentInfo.findAll as jest.Mock).mockResolvedValue([
        { User: { email: 'student2@example.com' } },
      ]);

      const result = await getCommonStudents(teacherEmails);
      expect(result).toEqual(['student2@example.com']);
    });
  });
});
