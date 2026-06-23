import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/connection';
import Contact from './Contact';

interface AppointmentAttributes {
  id: string;
  contactId?: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  location?: string;
  type: 'meeting' | 'call' | 'email' | 'task';
  createdAt?: Date;
  updatedAt?: Date;
}

interface AppointmentCreationAttributes extends Optional<AppointmentAttributes, 'id'> {}

export class Appointment extends Model<AppointmentAttributes, AppointmentCreationAttributes> implements AppointmentAttributes {
  public id!: string;
  public contactId?: string;
  public title!: string;
  public description?: string;
  public startDate!: Date;
  public endDate!: Date;
  public location?: string;
  public type!: 'meeting' | 'call' | 'email' | 'task';
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Association
  public contact?: Contact;
}

Appointment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    contactId: {
      type: DataTypes.UUID,
      references: {
        model: Contact,
        key: 'id',
      },
      onDelete: 'SET NULL',
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1, 255] },
    },
    description: DataTypes.TEXT,
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    location: DataTypes.STRING,
    type: {
      type: DataTypes.ENUM('meeting', 'call', 'email', 'task'),
      defaultValue: 'meeting',
    },
  },
  {
    sequelize,
    tableName: 'appointments',
    timestamps: true,
  }
);

Appointment.belongsTo(Contact, { foreignKey: 'contactId', as: 'contact' });
Contact.hasMany(Appointment, { foreignKey: 'contactId', as: 'appointments' });

export default Appointment;
