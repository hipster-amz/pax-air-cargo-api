import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class AirportCurrency extends Model {
  public id!: number;
  public iataCode!: string;
  public cityName!: string;
  public country!: string;
  public currencyCode!: string;
  public currencySymbol!: string;
  public exchangeRateToUsd!: number;
  public region!: string;
}

AirportCurrency.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    iataCode: {
      type: DataTypes.STRING(3),
      allowNull: false,
      unique: true,
      field: 'iata_code',
    },
    cityName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'city_name',
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    currencyCode: {
      type: DataTypes.STRING(3),
      allowNull: false,
      field: 'currency_code',
    },
    currencySymbol: {
      type: DataTypes.STRING(10),
      allowNull: false,
      field: 'currency_symbol',
    },
    exchangeRateToUsd: {
      type: DataTypes.DECIMAL(10, 4),
      allowNull: false,
      field: 'exchange_rate_to_usd',
    },
    region: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'airport_currencies',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        fields: ['iata_code'],
      },
    ],
  }
);

export default AirportCurrency;