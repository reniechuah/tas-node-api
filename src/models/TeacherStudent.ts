import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import TeacherInfo from './TeacherInfo';
import StudentInfo from './StudentInfo';

// Define attributes
interface TeacherStudentAttributes {
  teacherInfoId: number;
  studentInfoId: number;
}

class TeacherStudent
  extends Model<TeacherStudentAttributes>
  implements TeacherStudentAttributes {
  public teacherInfoId!: number;
  public studentInfoId!: number;

  public StudentInfo?: StudentInfo;
  public TeacherInfo?: TeacherInfo;
}

TeacherStudent.init(
  {
    teacherInfoId: { type: DataTypes.INTEGER, primaryKey: true },
    studentInfoId: { type: DataTypes.INTEGER, primaryKey: true }
  },
  {
    sequelize,
    modelName: 'TeacherStudent',
    tableName: 'TeacherStudent', 
    timestamps: false
  }
);

export default TeacherStudent;
