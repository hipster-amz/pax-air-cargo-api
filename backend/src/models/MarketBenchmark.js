"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class MarketBenchmark extends sequelize_1.Model {
}
MarketBenchmark.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    routeCode: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false,
    },
    originAirportCode: {
        type: sequelize_1.DataTypes.STRING(3),
        allowNull: false,
        field: 'origin_airport_code',
    },
    destinationAirportCode: {
        type: sequelize_1.DataTypes.STRING(3),
        allowNull: false,
        field: 'destination_airport_code',
    },
    year: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    month: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    totalRate: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field: 'total_rate',
    },
}, {
    sequelize: database_1.default,
    modelName: 'market_benchmarks',
    timestamps: true,
    underscored: true,
    indexes: [
        {
            fields: ['origin_airport_code', 'destination_airport_code'],
        },
    ],
});
exports.default = MarketBenchmark;
