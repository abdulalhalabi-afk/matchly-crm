import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/connection';
import Contact from './Contact';

interface ActivityNoteAttributes {
  id: string;
  contactId?: string;
  content: string;
  type: 'call' | 'email' | 'meeting' | 'note' | 'task';
  createdAt?: Date;
  updatedAt?: Date;
}

interface ActivityNoteCreationAttributes extends Optional<ActivityNoteAttributes, 'id'> {}

export class ActivityNote extends Model<ActivityNoteAttributes, ActivityNoteCreationAttributes> implements ActivityNoteAttributes {
  public id!: string;
  public contactId?: string;
  public content!: string;
  public type!: 'call' | 'email' | 'meeting' | 'note' | 'task';
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Association
  public contact?: Contact;
}

ActivityNote.init(
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
      onDelete: 'CASCADE',
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('call', 'email', 'meeting', 'note', 'task'),
      defaultValue: 'note',
    },
  },
  {
    sequelize,
    tableName: 'activity_notes',
    timestamps: true,
  }
);

ActivityNote.belongsTo(Contact, { foreignKey: 'contactId', as: 'contact' });
Contact.hasMany(ActivityNote, { foreignKey: 'contactId', as: 'activities' });

export default ActivityNote;
