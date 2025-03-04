"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Database {
    constructor(databaseUrl) {
        this.sequelize = new sequelize_1.Sequelize(databaseUrl, {
            dialect: 'postgres',
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false,
                },
            },
            pool: {
                max: 50,
                min: 0,
                acquire: 30000,
                idle: 10000,
            },
        });
    }
}
const databaseUrl = process.env.DATABASE_URL;
const database = new Database(databaseUrl);
exports.default = database.sequelize;
