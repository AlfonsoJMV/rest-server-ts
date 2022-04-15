"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../db/connection");
const Products = connection_1.dbSql.define('Products', {
    name: {
        type: sequelize_1.DataTypes.STRING,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
    },
    quantity: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    status: {
        type: sequelize_1.DataTypes.NUMBER,
        defaultValue: 1
    }
}, {
    freezeTableName: true,
    tableName: 'products',
    timestamps: false,
    // paranoid:true dont delete record, add column with deletedAt need timestamps in true
    // underscored:true change updatedAt to updated_at
});
exports.default = Products;
//# sourceMappingURL=products.js.map