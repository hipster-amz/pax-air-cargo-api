import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class MarketBenchmark extends Model {
  public id!: number;
  public routeCode!: string;
  public originAirportCode!: string;
  public destinationAirportCode!: string;
  public year!: number;
  public month!: number;
  public totalRate!: number;
}

MarketBenchmark.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    routeCode: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    originAirportCode: {
      type: DataTypes.STRING(3),
      allowNull: false,
      field: 'origin_airport_code',
    },
    destinationAirportCode: {
      type: DataTypes.STRING(3),
      allowNull: false,
      field: 'destination_airport_code',
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    month: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalRate: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: 'total_rate',
    },
  },
  {
    sequelize,
    modelName: 'market_benchmarks',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        fields: ['origin_airport_code', 'destination_airport_code'],
      },
    ],
  }
);

export default MarketBenchmark;