"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = require("dotenv");
const path_1 = require("path");
dotenv_1.default.config();
const sequelize = new sequelize_1.Sequelize({
    dialect: 'sqlite',
    storage: path_1.default.join(process.cwd(), 'data', 'database.sqlite'),
    logging: process.env.NODE_ENV === 'development' ? console.log : false
});
exports.default = sequelize;
