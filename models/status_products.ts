import {DataTypes} from 'sequelize';
import {dbSql} from '../db/connection';

const Status_Products=dbSql.define('Products',{
    id:{
        type:DataTypes.NUMBER,
    },
    description:{
        type:DataTypes.STRING,
    }
},{
    freezeTableName:true,
    tableName:'status_products',
    timestamps:false,
    // paranoid:true dont delete record, add column with deletedAt need timestamps in true
    // underscored:true change updatedAt to updated_at
});

export default Status_Products;