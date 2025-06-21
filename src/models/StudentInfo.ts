import { Association, DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

// 1. Define attribute interfaces
interface StudentInfoAttributes {
  id: number;
  userId: number;
  status: string;
  year: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface StudentInfoCreationAttributes extends Optional<StudentInfoAttributes, 'id'> {}

// 2. Extend Model with typing
class StudentInfo extends Model<StudentInfoAttributes, StudentInfoCreationAttributes> implements StudentInfoAttributes {
  public id!: number;
  public userId!: number;
  public status!: string;
  public year!: number;

  public readonly createdAt!: Date;  // if using timestamps
  public readonly updatedAt!: Date;  // if using timestamps

  public User?: User;
  public static associations: {
    user: Association<StudentInfo, User>;
  };
}

// 3. Initialize model
StudentInfo.init(
  {
    id: { 
      type: DataTypes.INTEGER.UNSIGNED, 
      autoIncrement: true, 
      primaryKey: true 
    },
    userId: { 
      type: DataTypes.INTEGER.UNSIGNED, 
      allowNull: false 
    },
    status: { 
      type: DataTypes.STRING(50), 
      defaultValue: 'ACTIVE' 
    },
    year: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
  },
  {
    sequelize,
    modelName: 'StudentInfo',
    tableName: 'StudentInfo',  
    timestamps: false
  }
);

export default StudentInfo;
