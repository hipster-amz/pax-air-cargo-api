import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class SystemParameter extends Model {
  public parameterName!: string;
  public parameterValue!: number;
  public unit!: string;
  public description!: string;
  public lastUpdated!: Date;
  public updatedBy!: string;
}

SystemParameter.init(
  {
    parameterName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
      field: 'parameter_name',
    },
    parameterValue: {
      type: DataTypes.DECIMAL(10, 4),
      allowNull: false,
      field: 'parameter_value',
    },
    unit: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    lastUpdated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'last_updated',
    },
    updatedBy: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'system',
      field: 'updated_by',
    },
  },
  {
    sequelize,
    modelName: 'system_parameters',
    timestamps: false,
  }
);

export default SystemParameter;