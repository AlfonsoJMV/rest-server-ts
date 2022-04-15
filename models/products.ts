import {DataTypes} from 'sequelize';
import {dbSql} from '../db/connection';

const Products=dbSql.define('Products',{
    name:{
        type:DataTypes.STRING,
    },
    description:{
        type:DataTypes.STRING,
    },
    quantity:{
        type:DataTypes.NUMBER,
    },
    status:{
        type:DataTypes.NUMBER,
        defaultValue:1
    }
},{
    freezeTableName:true,
    tableName:'products',
    timestamps:false,
    // paranoid:true dont delete record, add column with deletedAt need timestamps in true
    // underscored:true change updatedAt to updated_at
});

export default Products;