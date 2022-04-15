"use strict";
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
exports.deleteUsuario = exports.updateUsuario = exports.createUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_1.default.findAll();
    res.json({
        ok: true,
        usuarios
    });
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_1.default.findByPk(id);
    if (!usuario) {
        return res.status(404).json({
            ok: false,
            msg: `No existe un usuario con el id ${id}`
        });
    }
    res.json({
        ok: true,
        usuario
    });
});
exports.getUsuario = getUsuario;
const createUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const existeEmail = yield usuario_1.default.findOne({
            where: {
                email: body.email
            }
        });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: `Ya existe un usuario con el email ${body.email}`
            });
        }
        const usuario = usuario_1.default.build(body);
        yield usuario.save();
        res.json({
            ok: true,
            usuario
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error con la conexión a la bd, contacta al administrador'
        });
    }
});
exports.createUsuario = createUsuario;
const updateUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: `No existe un usuario con el id ${id}`
            });
        }
        yield usuario.update(body);
        res.json({
            ok: true,
            usuario
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error con la conexión a la bd, contacta al administrador'
        });
    }
});
exports.updateUsuario = updateUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: `No existe un usuario con el id ${id}`
            });
        }
        // ELIMINACION FISICA
        // await usuario.destroy();
        // ELIMINACION LOGICA, ACTUALIZAR ESTADO
        yield usuario.update({ estado: false });
        res.json({
            ok: true,
            usuario
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error con la conexión a la bd, contacta al administrador'
        });
    }
});
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuarios.controller.js.map