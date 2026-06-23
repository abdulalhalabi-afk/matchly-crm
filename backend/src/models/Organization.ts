import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/connection';

interface OrganizationAttributes {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  website?: string;
  address?: string;
  city?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface OrganizationCreationAttributes extends Optional<OrganizationAttributes, 'id'> {}

export class Organization extends Model<OrganizationAttributes, OrganizationCreationAttributes> implements OrganizationAttributes {
  public id!: string;
  public name!: string;
  public email?: string;
  public phone?: string;
  public website?: string;
  public address?: string;
  public city?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Organization.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1, 255] },
    },
    email: {
      type: DataTypes.STRING,
      validate: { isEmail: true },
    },
    phone: DataTypes.STRING,
    website: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
  },
  {
    sequelize,
    tableName: 'organizations',
    timestamps: true,
  }
);

export default Organization;
