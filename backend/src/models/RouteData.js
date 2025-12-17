"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class RouteData extends sequelize_1.Model {
}
RouteData.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    routeCode: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false,
    },
    carrierCode: {
        type: sequelize_1.DataTypes.STRING(3),
        allowNull: false,
    },
    carrier: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    operationRegion: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    equip: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
    },
    codeDep: {
        type: sequelize_1.DataTypes.STRING(3),
        allowNull: false,
    },
    codeArr: {
        type: sequelize_1.DataTypes.STRING(3),
        allowNull: false,
    },
    operationType: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    blockHours: {
        type: sequelize_1.DataTypes.DECIMAL(6, 2),
        allowNull: false,
    },
    distanceKm: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    capacityTonnes: {
        type: sequelize_1.DataTypes.DECIMAL(6, 2),
        allowNull: false,
    },
    capacityAtk: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field: 'capacity_atk_x1000',
    },
    weeklyFlightCount: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
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
});
exports.default = RouteData;
