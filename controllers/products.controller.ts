import { Request, Response } from 'express';
import Products from '../models/products';
import Status_Products from '../models/status_products';

export const getProducts=async(req:Request, res:Response)=>{
    let {offset=0, limit=3}=req.query;
    const filter={status:1};
    offset=Number(offset);
    limit=Number(limit);
    try{
        const result=await Products.findAndCountAll({
                                where:filter,
                                offset,
                                limit
                            });
        res.json({
            ok:true,
            total:result.count,
            products:result.rows
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'Ocurrió un error al conectar a la bd'
        });
    }
};

export const getProduct=async (req:Request, res:Response)=>{
    const {id}=req.params;
    try{
        const product=await Products.findByPk(id);
        res.json({
            ok:true,
            product
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'Ocurrió un error al conectar a la bd'
        });
    }
};

export const createProduct=async(req:Request, res:Response)=>{
    const {name, description, quantity=0, status}=req.body;
    const data={ name, description, quantity, status };
    try{
        const product=await Products.create(data);
        res.json({
            ok:true,
            product
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'Ocurrió un error al conectar a la bd'
        });
    }
};

export const updateProduct=async (req:Request, res:Response)=>{
    const {id}=req.params;
    const {name, description, quantity}=req.body;
    try{
        const product=await Products.findByPk(id);
        if(!product){
            return res.status(400).json({
                ok:false,
                msg:`Doesn't exists a product with id ${id}`
            });
        }
        const data={
            name, description, quantity
        };
        await product.update(data);
        res.json({
            ok:true,
            product
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'Ocurrió un error al conectar a la bd'
        });
    }
};

export const deleteProduct=async (req:Request, res:Response)=>{
    const {id}=req.params;
    try{
        const product=await Products.findByPk(id);
        if(!product){
            return res.status(400).json({
                ok:false,
                msg:`Doesn't exists a product with id ${id}`
            });
        }
        await product.destroy();
        res.json({
            ok:true,
            msg:'Product deleted',
            product
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'Ocurrió un error al conectar a la bd'
        });
    }
};