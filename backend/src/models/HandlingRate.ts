import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class HandlingRate extends Model {
  public id!: number;
  public airportCode!: string;
  public airportName!: string;
  public city!: string;
  public country!: string;
  public region!: string;
  public originRatePerKg!: number;
  public destinationRatePerKg!: number;
}

HandlingRate.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    airportCode: {
      type: DataTypes.STRING(3),
      allowNull: false,
      unique: true,
      field: 'airport_code',
    },
    airportName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'airport_name',
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    region: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    originRatePerKg: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: 'origin_rate_usd_per_kg',
    },
    destinationRatePerKg: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: 'destination_rate_usd_per_kg',
    },
  },
  {
    sequelize,
    modelName: 'handling_rates',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        fields: ['airport_code'],
      },
      {
        fields: ['region'],
      },
    ],
  }
);

export default HandlingRate;