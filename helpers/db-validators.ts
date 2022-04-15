import {Products} from '../models';

export const existsProductById=async(id:number)=>{
    const existsProduct=await Products.findByPk(id);
    if(!existsProduct){
        throw new Error(`Doesn't exists a product with id ${id}`);
    }
}

export const existsProductByName=async(name:string)=>{
    const existsProduct=await Products.findOne({where:{name}});
    if(existsProduct){
        throw new Error(`Already exists a product with name ${name}`);
    }
}