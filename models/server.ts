import express, {Application, json} from 'express';
// COMO ES EXPORTACION POR DEFECTO,SE LE PUEDE ASIGNAR UN ALIAS DESDE UN INICIO
import userRoutes from '../routes/usuarios.routes';
import productsRoutes from '../routes/products.routes';
import cors from 'cors';

import db, {dbSql} from '../db/connection';

class Server{
    private app:Application;
    private port:string;
    private apiPaths={
        usuarios:'/api/usuarios',
        products:'/api/products'
    };

    constructor(){
        this.app=express();
        this.port=process.env.PORT || '8080';

        // DB
        // this.dbConnection();

        // DB SQL
        this.dbSqlConnection();

        // MIDDLEWARES FUNCIONES QUE SE EJECUTAN ANTES DE LAS RUTAS
        this.middlewares();

        // DEFINIR RUTAS
        this.routes();
    }

    async dbConnection(){
        try{
            await db.authenticate();
            console.log('DB Online');
        }catch(error){
            console.log(error);
            throw new Error('error al conectar a la bd');
        }
    }

    // SQL SERVER CONNECTION
    async dbSqlConnection(){
        try{
            await dbSql.authenticate();
            console.log('DB Sql Online');
        }catch(error){
            console.log(error);
            throw new Error('error al conectar a la bd de sql');
        }
    }

    middlewares(){
        // CORS
        this.app.use(cors());

        // PARSE BODY
        this.app.use(express.json());

        // CARPETA PUBLICA
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.apiPaths.usuarios, userRoutes);
        this.app.use(this.apiPaths.products, productsRoutes);
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Servidor corriendo en puerto: ${this.port}`);
        });
    }
}

export default Server;