"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const products_controller_1 = require("../controllers/products.controller");
const db_validators_1 = require("../helpers/db-validators");
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const router = (0, express_1.Router)();
router.get('/', products_controller_1.getProducts);
router.get('/:id', [
    (0, express_validator_1.check)('id', 'Its not a valid id').isInt(),
    validar_campos_1.default,
    (0, express_validator_1.check)('id').custom(db_validators_1.existsProductById),
    validar_campos_1.default
], products_controller_1.getProduct);
router.post('/', [
    (0, express_validator_1.check)('name', 'Field name is required').notEmpty(),
    validar_campos_1.default,
    (0, express_validator_1.check)('description', 'Field description is required').notEmpty(),
    validar_campos_1.default,
    (0, express_validator_1.check)('name').custom(db_validators_1.existsProductByName),
    validar_campos_1.default
], products_controller_1.createProduct);
router.put('/:id', [
    (0, express_validator_1.check)('id', 'Its not a valid id').isInt(),
    validar_campos_1.default,
    (0, express_validator_1.check)('id').custom(db_validators_1.existsProductById),
    validar_campos_1.default,
    (0, express_validator_1.check)('name', 'Field name is required'),
    validar_campos_1.default
], products_controller_1.updateProduct);
router.delete('/:id', [
    (0, express_validator_1.check)('id', 'Its not a valid id').isInt(),
    validar_campos_1.default,
    (0, express_validator_1.check)('id').custom(db_validators_1.existsProductById),
    validar_campos_1.default
], products_controller_1.deleteProduct);
exports.default = router;
//# sourceMappingURL=products.routes.js.map