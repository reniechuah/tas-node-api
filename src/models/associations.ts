// models/associations.ts
import User from './User';
import TeacherInfo from './TeacherInfo';
import StudentInfo from './StudentInfo';
import TeacherStudent from './TeacherStudent';

export function associateModels(): void {
  // User <-> TeacherInfo
  TeacherInfo.belongsTo(User, { foreignKey: 'userId' });

  // User <-> StudentInfo
  StudentInfo.belongsTo(User, { foreignKey: 'userId' });

  // Many-to-many TeacherInfo <-> StudentInfo via TeacherStudent
  TeacherInfo.belongsToMany(StudentInfo, {
    through: TeacherStudent,
    foreignKey: 'teacherInfoId',
    otherKey: 'studentInfoId',
  });
  StudentInfo.belongsToMany(TeacherInfo, {
    through: TeacherStudent,
    foreignKey: 'studentInfoId',
    otherKey: 'teacherInfoId',
  });

  // TeacherStudent belongsTo both TeacherInfo and StudentInfo
  TeacherStudent.belongsTo(TeacherInfo, { foreignKey: 'teacherInfoId' });
  TeacherStudent.belongsTo(StudentInfo, { foreignKey: 'studentInfoId' });
  
}
