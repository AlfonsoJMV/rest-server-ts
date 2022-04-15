"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validarCampos = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            msg: errors["errors"][0].msg,
            param: errors["errors"][0].param,
            value: errors["errors"][0].value,
        });
    }
    next();
};
exports.default = validarCampos;
//# sourceMappingURL=validar-campos.js.map