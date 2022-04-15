"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../db/connection");
const Status_Products = connection_1.dbSql.define('Products', {
    id: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
    }
}, {
    freezeTableName: true,
    tableName: 'status_products',
    timestamps: false,
    // paranoid:true dont delete record, add column with deletedAt need timestamps in true
    // underscored:true change updatedAt to updated_at
});
exports.default = Status_Products;
//# sourceMappingURL=status_products.js.map