import { suspendStudentByEmail } from '../src/services/studentService';
import User from '../src/models/User';
import StudentInfo from '../src/models/StudentInfo';

jest.mock('../src/models/User');
jest.mock('../src/models/StudentInfo');

describe('suspendStudentByEmail', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should suspend the student successfully', async () => {
    const mockEmail = 'student@example.com';

    const mockUser = { id: 1 };
    const mockStudentInfo = {
      status: 'ACTIVE',
      save: jest.fn(),
    };

    (User.findOne as jest.Mock).mockResolvedValue(mockUser);
    (StudentInfo.findOne as jest.Mock).mockResolvedValue(mockStudentInfo);

    await suspendStudentByEmail(mockEmail);

    expect(User.findOne).toHaveBeenCalledWith({ where: { email: mockEmail } });
    expect(StudentInfo.findOne).toHaveBeenCalledWith({ where: { userId: mockUser.id } });
    expect(mockStudentInfo.status).toBe('SUSPENDED');
    expect(mockStudentInfo.save).toHaveBeenCalled();
  });

  it('should throw error if user not found', async () => {
    (User.findOne as jest.Mock).mockResolvedValue(null);

    await expect(suspendStudentByEmail('notfound@example.com'))
      .rejects.toThrow('Student not found');
  });

  it('should throw error if studentInfo not found', async () => {
    (User.findOne as jest.Mock).mockResolvedValue({ id: 1 });
    (StudentInfo.findOne as jest.Mock).mockResolvedValue(null);

    await expect(suspendStudentByEmail('student@example.com'))
      .rejects.toThrow('StudentInfo not found');
  });

  it('should do nothing if student is already suspended', async () => {
    const mockStudentInfo = {
      status: 'SUSPENDED',
      save: jest.fn(),
    };

    (User.findOne as jest.Mock).mockResolvedValue({ id: 1 });
    (StudentInfo.findOne as jest.Mock).mockResolvedValue(mockStudentInfo);

    await suspendStudentByEmail('student@example.com');

    expect(mockStudentInfo.save).not.toHaveBeenCalled();
  });
});
