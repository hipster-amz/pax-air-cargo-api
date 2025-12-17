import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class RouteData extends Model {
  public id!: number;
  public routeCode!: string;
  public carrierCode!: string;
  public carrier!: string;
  public operationRegion!: string;
  public equip!: string;
  public codeDep!: string;
  public codeArr!: string;
  public operationType!: string;
  public blockHours!: number;
  public distanceKm!: number;
  public capacityTonnes!: number;
  public capacityAtk!: number;
  public weeklyFlightCount!: number;
}

RouteData.init(
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
    carrierCode: {
      type: DataTypes.STRING(3),
      allowNull: false,
    },
    carrier: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    operationRegion: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    equip: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    codeDep: {
      type: DataTypes.STRING(3),
      allowNull: false,
    },
    codeArr: {
      type: DataTypes.STRING(3),
      allowNull: false,
    },
    operationType: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    blockHours: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false,
    },
    distanceKm: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    capacityTonnes: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false,
    },
    capacityAtk: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: 'capacity_atk_x1000',
    },
    weeklyFlightCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'route_data',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        fields: ['code_dep', 'code_arr'],
      },
      {
        fields: ['carrier_code'],
      },
      {
        fields: ['equip'],
      },
    ],
  }
);

export default RouteData;