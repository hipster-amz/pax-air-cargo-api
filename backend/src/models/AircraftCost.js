"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class AircraftCost extends sequelize_1.Model {
}
AircraftCost.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    aircraftType: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
        unique: true,
        field: 'aircraft_type',
    },
    totalCostPerHour: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field: 'total_cost_per_hour',
    },
    crewCost: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field: 'crew_cost',
    },
    maintenanceCost: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field: 'maintenance_cost',
    },
    fuelCost: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field: 'fuel_cost',
    },
    depreciationCost: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field: 'depreciation_cost',
    },
    insuranceCost: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field: 'insurance_cost',
    },
    otherCost: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field: 'other_cost',
    },
    fuelBurnRatePerHour: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field: 'fuel_burn_rate_l_per_hour',
    },
}, {
    sequelize: database_1.default,
    modelName: 'aircraft_costs',
    timestamps: true,
    underscored: true,
    indexes: [
        {
            fields: ['aircraft_type'],
        },
    ],
});
exports.default = AircraftCost;
