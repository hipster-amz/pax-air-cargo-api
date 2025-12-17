"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class SystemParameter extends sequelize_1.Model {
}
SystemParameter.init({
    parameterName: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true,
        field: 'parameter_name',
    },
    parameterValue: {
        type: sequelize_1.DataTypes.DECIMAL(10, 4),
        allowNull: false,
        field: 'parameter_value',
    },
    unit: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    lastUpdated: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
        field: 'last_updated',
    },
    updatedBy: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'system',
        field: 'updated_by',
    },
}, {
    sequelize: database_1.default,
    modelName: 'system_parameters',
    timestamps: false,
});
exports.default = SystemParameter;
