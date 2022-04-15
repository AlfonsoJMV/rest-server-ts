"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbSql = void 0;
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize('node', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    // logging:false
});
exports.dbSql = new sequelize_1.Sequelize('webstore', 'usernode', 'Ure3time29', {
    host: 'URESER135',
    dialect: 'mssql',
    dialectOptions: {
        options: {
            encrypt: false,
            trustServerCertificate: true,
            instanceName: 'ETIMEP'
        }
    }
    // logging:false
});
exports.default = db;
//# sourceMappingURL=connection.js.map