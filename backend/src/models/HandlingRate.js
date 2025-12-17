"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class HandlingRate extends sequelize_1.Model {
}
HandlingRate.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    airportCode: {
        type: sequelize_1.DataTypes.STRING(3),
        allowNull: false,
        unique: true,
        field: 'airport_code',
    },
    airportName: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        field: 'airport_name',
    },
    city: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    country: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    region: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    originRatePerKg: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field: 'origin_rate_usd_per_kg',
    },
    destinationRatePerKg: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field: 'destination_rate_usd_per_kg',
    },
}, {
    sequelize: database_1.default,
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
});
exports.default = HandlingRate;
