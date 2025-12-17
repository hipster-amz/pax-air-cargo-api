import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(process.cwd(), 'data', 'database.sqlite'),
  logging: process.env.NODE_ENV === 'development' ? console.log : false
});

export default sequelize;