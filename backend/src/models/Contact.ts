import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/connection';
import Organization from './Organization';

interface ContactAttributes {
  id: string;
  organizationId?: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  position?: string;
  status: 'active' | 'inactive' | 'lead';
  tags?: string;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ContactCreationAttributes extends Optional<ContactAttributes, 'id'> {}

export class Contact extends Model<ContactAttributes, ContactCreationAttributes> implements ContactAttributes {
  public id!: string;
  public organizationId?: string;
  public firstName!: string;
  public lastName!: string;
  public email?: string;
  public phone?: string;
  public position?: string;
  public status!: 'active' | 'inactive' | 'lead';
  public tags?: string;
  public notes?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Association
  public organization?: Organization;
}

Contact.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    organizationId: {
      type: DataTypes.UUID,
      references: {
        model: Organization,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1, 100] },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1, 100] },
    },
    email: {
      type: DataTypes.STRING,
      validate: { isEmail: true },
    },
    phone: DataTypes.STRING,
    position: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'lead'),
      defaultValue: 'lead',
    },
    tags: DataTypes.STRING,
    notes: DataTypes.TEXT,
  },
  {
    sequelize,
    tableName: 'contacts',
    timestamps: true,
  }
);

Contact.belongsTo(Organization, { foreignKey: 'organizationId', as: 'organization' });
Organization.hasMany(Contact, { foreignKey: 'organizationId', as: 'contacts' });

export default Contact;
