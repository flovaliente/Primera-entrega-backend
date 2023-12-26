import CartModel from './models/cart.model.js';
import { Exception } from '../utils.js';

export default class CartManager {
    static async getCarts(){//Obtiene todos los carritos
        const carts = await CartModel.find().populate('products.productId');
        return carts;
    }

    static async create(){
        let newCart = await CartModel.create();
        return newCart;
    }
    

    static async addToCart(cid, pid, quantity){//ESTO DEBERIA FUNCIONAR
        const cart = await CartModel.findById(cid);//Obtengo el carrito con id cid
        if(!cart){
            throw new Exception(`The cart with id: ${cid} do not exist 😩`, 404);
        }
        //console.log('Cart:', cart);
        const index = cart.products.findIndex( (product) => String(product._id) === pid );//Obtengo el indice del producto, si no existe devuelve -1
        if(index === -1){//Chequeo que exista el producto
            cart.products.push( { product: pid, quantity: quantity });//Si no existe lo agrego al carrito
        }else{
            cart.products[index].quantity += quantity;//Si ya existe le incremento la cantidad
        }
        await CartModel.updateOne({ _id: cid}, cart);//Actualizo el carrito
    }

    static async getById(cid, populate = false){
        try {
           const cart = await CartModel.findOne({ _id: cid });
           if(populate){
            return await cart.populate('products.productId');
           }
           return cart;
        } catch (error) {
            throw new Exception(`Cart ${cid} not found❌`, 404);
        }
        
        
    }


    static async deleteById(cid){
        const cart = await CartModel.findById(cid);
        if(!cart){
            throw new Exception(`The cart with id: ${cid} do not exist 😩`, 404);
        }
        const criteria = { _id: cid };
        await CartModel.deleteOne(criteria);
        console.log(`The cart with id: ${cid} was deleted successfully 🗑️`);
    }
    
    
}