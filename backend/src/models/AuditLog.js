"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class AuditLog extends sequelize_1.Model {
}
AuditLog.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    actionType: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        field: 'action_type',
    },
    tableName: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        field: 'table_name',
    },
    recordId: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true,
        field: 'record_id',
    },
    changes: {
        type: sequelize_1.DataTypes.JSONB,
        allowNull: false,
    },
    userId: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'system',
        field: 'user_id',
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
        field: 'created_at',
    },
}, {
    sequelize: database_1.default,
    modelName: 'audit_logs',
    timestamps: false,
});
exports.default = AuditLog;
