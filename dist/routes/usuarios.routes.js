"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarios_controller_1 = require("../controllers/usuarios.controller");
const router = (0, express_1.Router)();
router.get('/', usuarios_controller_1.getUsuarios);
router.get('/:id', usuarios_controller_1.getUsuario);
router.post('/', usuarios_controller_1.createUsuario);
router.put('/:id', usuarios_controller_1.updateUsuario);
router.delete('/:id', usuarios_controller_1.deleteUsuario);
exports.default = router;
//# sourceMappingURL=usuarios.routes.js.map