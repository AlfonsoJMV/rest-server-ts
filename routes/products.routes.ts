import {Router} from 'express';
import { check } from 'express-validator';
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../controllers/products.controller';
import { existsProductById, existsProductByName } from '../helpers/db-validators';
import validarCampos from '../middlewares/validar-campos';

const router=Router();

router.get('/', getProducts);

router.get('/:id', [
    check('id', 'Its not a valid id').isInt(),
    validarCampos,
    check('id').custom(existsProductById),
    validarCampos
], getProduct);

router.post('/', [
    check('name', 'Field name is required').notEmpty(),
    validarCampos,
    check('description', 'Field description is required').notEmpty(),
    validarCampos,
    check('name').custom(existsProductByName),
    validarCampos
], createProduct);

router.put('/:id', [
    check('id', 'Its not a valid id').isInt(),
    validarCampos,
    check('id').custom(existsProductById),
    validarCampos,
    check('name', 'Field name is required'),
    validarCampos
], updateProduct);

router.delete('/:id', [
    check('id', 'Its not a valid id').isInt(),
    validarCampos,
    check('id').custom(existsProductById),
    validarCampos
], deleteProduct);

export default router;