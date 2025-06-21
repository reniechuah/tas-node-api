import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

// 1. Define attribute interfaces
interface TeacherInfoAttributes {
  id: number;
  userId: number;
  status: string;
  year: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TeacherInfoCreationAttributes extends Optional<TeacherInfoAttributes, 'id'> {}

// 2. Extend Model with typing
class TeacherInfo extends Model<TeacherInfoAttributes, TeacherInfoCreationAttributes> implements TeacherInfoAttributes {
  public id!: number;
  public userId!: number;
  public status!: string;
  public year!: number;

  public readonly createdAt!: Date;  // if using timestamps
  public readonly updatedAt!: Date;  // if using timestamps
}

// 3. Initialize model
TeacherInfo.init(
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
    modelName: 'TeacherInfo',
    tableName: 'TeacherInfo',  
    timestamps: false
  }
);

export default TeacherInfo;
