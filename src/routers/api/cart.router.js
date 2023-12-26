import { Router } from 'express';
import CartManager from '../../dao/CartManager.js';
import cartModel from '../../dao/models/messages.model.js';
import productModel from '../../dao/models/product.model.js';

const router = Router();

/*
//GET
router.get('/carts', async (req, res) => {
    try {
      const { query = {} } = req;
        const carts = await CartManager.getCarts(query);
        res.status(200).json(carts);  
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
    
});

router.get('/carts/:cid', async (req, res) => {
    try {
        const { params: { cid } } = req;
        const cart = await CartManager.getById(cid, true);
        res.status(200).json(cart);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

//POST
router.post('/carts', async (req, res) => {
    //const { body } = req;
    const carts = await CartManager.getCarts();//Obtengo los carritos
    let newCart = await CartManager.create();//Creo un nuevo carrito
    carts.push(newCart);
    res.status(200).send(newCart);
});

router.post('/carts/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        let cart = await cartModel.findById(cid);
        let product = await productModel.findById(pid);

        if(!product){//No existe el producto
            return res.status(404).json({ message: `Product with id ${pid} not found`});
        }

        if(!cart){//No existe el carrito
            return res.status(404).json({ message: `Cart with id ${cid} not found`});
        }

        CartManager.addToCart(cid, pid, 1);//Agrega el producto al carrito

    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

//PUT
router.put('/carts/:cid', async (req, res) => {
    const { cid } = req.params;
    const { body } = req;
    try {
        const result = await cartModel.updateOne({ _id: cid }, { $set: body });
        if(result){
            res.status(204).end();
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/carts/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
        if(!quantity){
            return res.status(400).json(`The quantity has to be a number`);
        }
        const result = await cartModel.updateOne({ _id: cid, "products.productId": pid }, { $set: { "products.$.quantity": quantity } });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

//DELETE
router.delete('/carts/:cid/product/:pid', (req, res) => {
    const { cid, pid } = req.params;
    
});

export default router;*/

//GET
router.get('/carts', async (req, res) => {
    try {
        //const { query = {} } = req;
        const carts = await CartManager.getCarts();
        res.status(200).json(carts);  
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
    
});

router.get('/carts/:cid', async (req, res) => {
    try {
        const { params: { cid } } = req;
        const cart = await CartManager.getById(cid, true);
        res.status(200).json(cart);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

//POST
router.post('/carts', async (req, res) => {
    //const { body } = req;
    const carts = await CartManager.getCarts();//Obtengo los carritos
    let newCart = await CartManager.create();//Creo un nuevo carrito
    carts.push(newCart);
    res.status(200).send(newCart);
});

router.post('/carts/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        let cart = await cartModel.findById(cid);
        let product = await productModel.findById(pid);

        if(!product){//No existe el producto
            return res.status(404).json({ message: `Product with id ${pid} not found`});
        }

        if(!cart){//No existe el carrito
            return res.status(404).json({ message: `Cart with id ${cid} not found`});
        }

        CartManager.addToCart(cid, pid, 1);//Agrega el producto al carrito

    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

//PUT
router.put('/carts/:cid', async (req, res) => {
    const { cid } = req.params;
    const { body } = req;
    try {
        const result = await cartModel.updateOne({ _id: cid }, { $set: body });
        if(result){
            res.status(204).end();
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/carts/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
        if(!quantity){
            return res.status(400).json(`The quantity has to be a number`);
        }
        const result = await cartModel.updateOne({ _id: cid, "products.productId": pid }, { $set: { "products.$.quantity": quantity } });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

//DELETE
router.delete('/carts/:cid/product/:pid', (req, res) => {
    const { cid, pid } = req.params;
    
});

export default router;