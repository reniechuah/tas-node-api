import { getNotificationRecipients } from '../src/services/notificationService';
import User from '../src/models/User';
import TeacherInfo from '../src/models/TeacherInfo';
import StudentInfo from '../src/models/StudentInfo';
import TeacherStudent from '../src/models/TeacherStudent';

jest.mock('../src/models/User');
jest.mock('../src/models/TeacherInfo');
jest.mock('../src/models/StudentInfo');
jest.mock('../src/models/TeacherStudent');

describe('getNotificationRecipients', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns registered and mentioned active students (no duplicates)', async () => {
    // Mocked teacher and teacherInfo
    const mockTeacherUser = { id: 1 } as User;
    const mockTeacherInfo = { id: 10, userId: 1 } as TeacherInfo;

    // Registered student (ACTIVE)
    const mockStudent1User = { id: 2, email: 'student1@gmail.com' } as User;
    const mockStudent1 = {
      userId: 2,
      status: 'ACTIVE',
      User: mockStudent1User,
    } as StudentInfo;

    const mockTeacherStudent = {
      teacherInfoId: 10,
      studentInfoId: 2,
      StudentInfo: mockStudent1,
    } as unknown as TeacherStudent;

    // Mentioned student (ACTIVE)
    const mockStudent2User = { id: 3, email: 'student2@gmail.com' } as User;
    const mockStudent2 = {
      userId: 3,
      status: 'ACTIVE',
      User: mockStudent2User,
    } as StudentInfo;

    // Mock implementations
    (User.findOne as jest.Mock).mockResolvedValue(mockTeacherUser);
    (TeacherInfo.findOne as jest.Mock).mockResolvedValue(mockTeacherInfo);
    (TeacherStudent.findAll as jest.Mock).mockResolvedValue([mockTeacherStudent]);
    (User.findAll as jest.Mock).mockResolvedValue([mockStudent2User]);
    (StudentInfo.findAll as jest.Mock).mockResolvedValue([mockStudent2]);

    const recipients = await getNotificationRecipients(
      'teacherken@gmail.com',
      'Hello students! @student2@gmail.com'
    );

    expect(recipients).toContain('student1@gmail.com');
    expect(recipients).toContain('student2@gmail.com');
    expect(recipients.length).toBe(2);
  });

  it('throws error if teacher not found', async () => {
    (User.findOne as jest.Mock).mockResolvedValue(null);

    await expect(
      getNotificationRecipients('unknown@example.com', 'Hello')
    ).rejects.toThrow('Teacher not found');
  });

  it('throws error if teacherInfo not found', async () => {
    (User.findOne as jest.Mock).mockResolvedValue({ id: 1 } as User);
    (TeacherInfo.findOne as jest.Mock).mockResolvedValue(null);

    await expect(
      getNotificationRecipients('teacher@example.com', 'Hello')
    ).rejects.toThrow('TeacherInfo not found');
  });
});
