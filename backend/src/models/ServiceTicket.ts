import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/connection';
import Contact from './Contact';

interface ServiceTicketAttributes {
  id: string;
  contactId?: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate?: Date;
  assignedTo?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ServiceTicketCreationAttributes extends Optional<ServiceTicketAttributes, 'id'> {}

export class ServiceTicket extends Model<ServiceTicketAttributes, ServiceTicketCreationAttributes> implements ServiceTicketAttributes {
  public id!: string;
  public contactId?: string;
  public title!: string;
  public description!: string;
  public status!: 'open' | 'in_progress' | 'resolved' | 'closed';
  public priority!: 'low' | 'medium' | 'high' | 'urgent';
  public dueDate?: Date;
  public assignedTo?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Association
  public contact?: Contact;
}

ServiceTicket.init(
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
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('open', 'in_progress', 'resolved', 'closed'),
      defaultValue: 'open',
    },
    priority: {
      type: DataTypes.ENUM('low', 'medium', 'high', 'urgent'),
      defaultValue: 'medium',
    },
    dueDate: DataTypes.DATE,
    assignedTo: DataTypes.STRING,
  },
  {
    sequelize,
    tableName: 'service_tickets',
    timestamps: true,
  }
);

ServiceTicket.belongsTo(Contact, { foreignKey: 'contactId', as: 'contact' });
Contact.hasMany(ServiceTicket, { foreignKey: 'contactId', as: 'tickets' });

export default ServiceTicket;
