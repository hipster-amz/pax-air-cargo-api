"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class AirportCurrency extends sequelize_1.Model {
}
AirportCurrency.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    iataCode: {
        type: sequelize_1.DataTypes.STRING(3),
        allowNull: false,
        unique: true,
        field: 'iata_code',
    },
    cityName: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        field: 'city_name',
    },
    country: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    currencyCode: {
        type: sequelize_1.DataTypes.STRING(3),
        allowNull: false,
        field: 'currency_code',
    },
    currencySymbol: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false,
        field: 'currency_symbol',
    },
    exchangeRateToUsd: {
        type: sequelize_1.DataTypes.DECIMAL(10, 4),
        allowNull: false,
        field: 'exchange_rate_to_usd',
    },
    region: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
    modelName: 'airport_currencies',
    timestamps: true,
    underscored: true,
    indexes: [
        {
            fields: ['iata_code'],
        },
    ],
});
exports.default = AirportCurrency;
