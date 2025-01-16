import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../../../database/pg_configdev';
import {UserAttributes , UserRole} from './userinterface';
import {Userhash} from '../../../../utils/bcrypt';



export interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public googleId?: string;
  public firstName?: string;
  public lastName?: string;
  public email!: string;
  public gender?: string;
  public phoneNumber?: number;
  public password?: string;
  public role!: UserRole;  
  public createdAt!: Date;
  public updatedAt!: Date;
  public ProfileComplete!: boolean;
  public comparePassword?: (password: string) => Promise<boolean>;
}

User.init({
  id: {
    type: DataTypes.UUID, 
    defaultValue: DataTypes.UUIDV4, 
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phoneNumber: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ProfileComplete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  tableName: 'users',
  hooks: {
    beforeCreate: async (user: User) => {
      await Userhash.hashPassword(user);
    },
    beforeUpdate: async (user: User) => {
      await Userhash.hashPassword(user);
    },
  },
});

export default User;
