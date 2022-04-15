import {Router} from 'express';
import { createUsuario, deleteUsuario, getUsuario, getUsuarios, updateUsuario } from '../controllers/usuarios.controller';

const router=Router();

router.get('/', getUsuarios);
router.get('/:id', getUsuario);
router.post('/', createUsuario);
router.put('/:id', updateUsuario);
router.delete('/:id', deleteUsuario);

export default router;