import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class AircraftCost extends Model {
  public id!: number;
  public aircraftType!: string;
  public totalCostPerHour!: number;
  public crewCost!: number;
  public maintenanceCost!: number;
  public fuelCost!: number;
  public depreciationCost!: number;
  public insuranceCost!: number;
  public otherCost!: number;
  public fuelBurnRatePerHour!: number;
}

AircraftCost.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    aircraftType: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      field: 'aircraft_type',
    },
    totalCostPerHour: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: 'total_cost_per_hour',
    },
    crewCost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: 'crew_cost',
    },
    maintenanceCost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: 'maintenance_cost',
    },
    fuelCost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: 'fuel_cost',
    },
    depreciationCost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: 'depreciation_cost',
    },
    insuranceCost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: 'insurance_cost',
    },
    otherCost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: 'other_cost',
    },
    fuelBurnRatePerHour: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: 'fuel_burn_rate_l_per_hour',
    },
  },
  {
    sequelize,
    modelName: 'aircraft_costs',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        fields: ['aircraft_type'],
      },
    ],
  }
);

export default AircraftCost;