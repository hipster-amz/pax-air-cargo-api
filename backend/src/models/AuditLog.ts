import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class AuditLog extends Model {
  public id!: number;
  public actionType!: string;
  public tableName!: string;
  public recordId!: string | null;
  public changes!: object;
  public userId!: string;
  public createdAt!: Date;
}

AuditLog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    actionType: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'action_type',
    },
    tableName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'table_name',
    },
    recordId: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'record_id',
    },
    changes: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'system',
      field: 'user_id',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'created_at',
    },
  },
  {
    sequelize,
    modelName: 'audit_logs',
    timestamps: false,
  }
);

export default AuditLog;