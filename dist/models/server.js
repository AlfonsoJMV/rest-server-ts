"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// COMO ES EXPORTACION POR DEFECTO,SE LE PUEDE ASIGNAR UN ALIAS DESDE UN INICIO
const usuarios_routes_1 = __importDefault(require("../routes/usuarios.routes"));
const products_routes_1 = __importDefault(require("../routes/products.routes"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importStar(require("../db/connection"));
class Server {
    constructor() {
        this.apiPaths = {
            usuarios: '/api/usuarios',
            products: '/api/products'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8080';
        // DB
        // this.dbConnection();
        // DB SQL
        this.dbSqlConnection();
        // MIDDLEWARES FUNCIONES QUE SE EJECUTAN ANTES DE LAS RUTAS
        this.middlewares();
        // DEFINIR RUTAS
        this.routes();
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log('DB Online');
            }
            catch (error) {
                console.log(error);
                throw new Error('error al conectar a la bd');
            }
        });
    }
    // SQL SERVER CONNECTION
    dbSqlConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.dbSql.authenticate();
                console.log('DB Sql Online');
            }
            catch (error) {
                console.log(error);
                throw new Error('error al conectar a la bd de sql');
            }
        });
    }
    middlewares() {
        // CORS
        this.app.use((0, cors_1.default)());
        // PARSE BODY
        this.app.use(express_1.default.json());
        // CARPETA PUBLICA
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        this.app.use(this.apiPaths.usuarios, usuarios_routes_1.default);
        this.app.use(this.apiPaths.products, products_routes_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto: ${this.port}`);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map