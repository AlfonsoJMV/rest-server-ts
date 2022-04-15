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
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProduct = exports.getProducts = void 0;
const products_1 = __importDefault(require("../models/products"));
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { offset = 0, limit = 3 } = req.query;
    const filter = { status: 1 };
    offset = Number(offset);
    limit = Number(limit);
    try {
        const result = yield products_1.default.findAndCountAll({
            where: filter,
            offset,
            limit
        });
        res.json({
            ok: true,
            total: result.count,
            products: result.rows
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error al conectar a la bd'
        });
    }
});
exports.getProducts = getProducts;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const product = yield products_1.default.findByPk(id);
        res.json({
            ok: true,
            product
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error al conectar a la bd'
        });
    }
});
exports.getProduct = getProduct;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, quantity = 0, status } = req.body;
    const data = { name, description, quantity, status };
    try {
        const product = yield products_1.default.create(data);
        res.json({
            ok: true,
            product
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error al conectar a la bd'
        });
    }
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, description, quantity } = req.body;
    try {
        const product = yield products_1.default.findByPk(id);
        if (!product) {
            return res.status(400).json({
                ok: false,
                msg: `Doesn't exists a product with id ${id}`
            });
        }
        const data = {
            name, description, quantity
        };
        yield product.update(data);
        res.json({
            ok: true,
            product
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error al conectar a la bd'
        });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const product = yield products_1.default.findByPk(id);
        if (!product) {
            return res.status(400).json({
                ok: false,
                msg: `Doesn't exists a product with id ${id}`
            });
        }
        yield product.destroy();
        res.json({
            ok: true,
            msg: 'Product deleted',
            product
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error al conectar a la bd'
        });
    }
});
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=products.controller.js.map