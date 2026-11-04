import {
  DataTypes,
  Model,
  type CreationOptional,
  type ForeignKey,
  type InferAttributes,
  type InferCreationAttributes,
} from 'sequelize'
import { sequelize } from '#lib/db.ts'
import type {
  SessionEntity,
  SessionItemEntity,
  MessageEntity,
} from '@nce-talk/types'

class Session
  extends Model<InferAttributes<Session>, InferCreationAttributes<Session>>
  implements SessionEntity
{
  declare id: CreationOptional<string>
  declare userId: string
  declare title?: string
  declare status?: 'regular' | 'archived'
  declare custom?: unknown
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}

class SessionItem
  extends Model<
    InferAttributes<SessionItem>,
    InferCreationAttributes<SessionItem>
  >
  implements SessionItemEntity
{
  declare id: CreationOptional<number>
  declare sessionId: ForeignKey<Session['id']>
  declare item: unknown
  declare createdAt: CreationOptional<Date>
}

class Message
  extends Model<InferAttributes<Message>, InferCreationAttributes<Message>>
  implements MessageEntity
{
  declare id: CreationOptional<string>
  declare threadId: ForeignKey<Session['id']>
  declare parentId: string
  declare format: string
  declare content: Record<string, unknown>
  declare createdAt: CreationOptional<Date>
}

Session.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: DataTypes.STRING,
    status: DataTypes.ENUM('regular', 'archived'),
    custom: DataTypes.JSONB,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    underscored: true,
    tableName: 'sessions',
  },
)

SessionItem.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    item: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    sessionId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: 'session_items',
    updatedAt: false,
    underscored: true,
  },
)

Message.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    threadId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    parentId: DataTypes.STRING,
    format: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: 'messages',
    updatedAt: false,
    underscored: true,
  },
)

Session.hasMany(SessionItem, { foreignKey: 'sessionId', onDelete: 'CASCADE' })
SessionItem.belongsTo(Session, { foreignKey: 'sessionId' })

Session.hasMany(Message, { foreignKey: 'threadId', onDelete: 'CASCADE' })
Message.belongsTo(Session, { foreignKey: 'threadId' })

export { Session, SessionItem, Message }
