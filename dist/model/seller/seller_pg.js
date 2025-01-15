"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const pg_configdev_1 = __importDefault(require("../../database/pg_configdev"));
const bcrypt_1 = require("../../utils/bcrypt");
class Seller extends sequelize_1.Model {
}
Seller.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    gender: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: 'seller',
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: pg_configdev_1.default,
    tableName: 'seller',
    hooks: {
        beforeCreate: async (seller) => {
            await bcrypt_1.Sellerhash.hashPassword(seller);
        },
        beforeUpdate: async (seller) => {
            await bcrypt_1.Sellerhash.hashPassword(seller);
        }
    }
});
exports.default = Seller;
