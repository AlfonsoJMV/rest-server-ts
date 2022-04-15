import { Request, Response } from 'express';
import Usuario from '../models/usuario';

export const getUsuarios=async(req:Request, res:Response)=>{
    const usuarios=await Usuario.findAll();
    res.json({
        ok:true,
        usuarios
    });
};

export const getUsuario=async(req:Request, res:Response)=>{
    const {id}=req.params;
    const usuario=await Usuario.findByPk(id);
    if(!usuario){
        return res.status(404).json({
            ok:false,
            msg:`No existe un usuario con el id ${id}`
        });
    }
    res.json({
        ok:true,
        usuario
    });
};

export const createUsuario=async(req:Request, res:Response)=>{
    const {body}=req;
    try{
        const existeEmail=await Usuario.findOne({
            where:{
                email:body.email
            }
        });
        if(existeEmail){
            return res.status(400).json({
                ok:false,
                msg:`Ya existe un usuario con el email ${body.email}`
            });
        }
        const usuario= Usuario.build(body);
        await usuario.save();
        res.json({
            ok:true,
            usuario
        });
    }catch(error){
        console.error(error);
        res.status(500).json({
            ok:false,
            msg:'Error con la conexión a la bd, contacta al administrador'
        });
    }
};

export const updateUsuario=async(req:Request, res:Response)=>{
    const {id}=req.params;
    const {body}=req;
    try{
        const usuario=await Usuario.findByPk(id);
        if(!usuario){
            return res.status(404).json({
                ok:false,
                msg:`No existe un usuario con el id ${id}`
            })
        }
        await usuario.update(body);
        res.json({
            ok:true,
            usuario
        });
    }catch(error){
        console.error(error);
        res.status(500).json({
            ok:false,
            msg:'Error con la conexión a la bd, contacta al administrador'
        });
    }
};

export const deleteUsuario=async (req:Request, res:Response)=>{
    const {id}=req.params;
    try{
        const usuario=await Usuario.findByPk(id);
        if(!usuario){
            return res.status(404).json({
                ok:false,
                msg:`No existe un usuario con el id ${id}`
            })
        }
        // ELIMINACION FISICA
        // await usuario.destroy();
        // ELIMINACION LOGICA, ACTUALIZAR ESTADO
        await usuario.update({estado:false});
        res.json({
            ok:true,
            usuario
        });
    }catch(error){
        console.error(error);
        res.status(500).json({
            ok:false,
            msg:'Error con la conexión a la bd, contacta al administrador'
        });
    }
};