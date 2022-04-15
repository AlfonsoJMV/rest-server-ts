import {Sequelize} from 'sequelize';

const db=new Sequelize('node', 'root', '', {
    host:'localhost',
    dialect:'mysql',
    // logging:false
});

export const dbSql=new Sequelize('webstore', 'usernode', 'Ure3time29', {
    host:'URESER135',
    dialect:'mssql',
    dialectOptions: {
        options: {
            encrypt:false,
            trustServerCertificate:true,
            instanceName: 'ETIMEP'
        }
      }
    // logging:false
});

export default db;