// models/User.ts
import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

// Define the shape of your model attributes
interface UserAttributes {
  id: number;
  name: string;
  email: string;
}

// Define which attributes are optional when creating (id is auto-generated)
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;

  // Optional if you use timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    }
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'User',
    timestamps: false // Set to true if using createdAt/updatedAt
  }
);

export default User;
