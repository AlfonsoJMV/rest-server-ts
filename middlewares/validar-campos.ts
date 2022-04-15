import {Request, Response} from 'express';
import {validationResult} from 'express-validator';

const validarCampos=(req:Request, res:Response, next: () => void)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            ok:false,
            msg:errors["errors"][0].msg,
            param:errors["errors"][0].param,
            value:errors["errors"][0].value,
        });
    }
    next();
};

export default validarCampos;