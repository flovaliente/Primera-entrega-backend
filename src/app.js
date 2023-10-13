import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import ProductManager from './ProductManager.js';
import CartManager from './CartManager.js';
import express from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const productManager = new ProductManager(path.join(__dirname, './products.json'));
const cartManager = new CartManager(path.join(__dirname, './carrito.json'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Ruta para products
const productsRouter = express.Router();
app.use('/api/products', productsRouter);

// Get products
productsRouter.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    const { limit } = req.query;
    if(!limit)
        res.status(200).json(products);
    else
        res.status(200).json(products.slice(0, parseInt(limit)));
})

// Get product by id
productsRouter.get('/:pid', async (req, res) =>{ 
    const { pid } = req.params;
    const product = await productManager.getProductById(parseInt(pid));
    if(product){
        return res.status(200).json(product);
    }else{
        return res.status(404).send('Producto no encontrado.');
    }
});

// Add product
productsRouter.post('/', async (req, res) => {
    try {
        //const { body } = req;
        await productManager.addProduct(req.body);
        const newProducts = await productManager.getProducts();
        res.status(200).json(newProducts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update product
productsRouter.put('/:pid', async (req, res) => {
    try{
        const { pid } = req.params;
        //const { body } = req;
        const updated = await productManager.updateProduct(pid, req.body);
        res.status(200).json(updated);
    } catch(error){
        res.status(400).json({ error: error.message });
    }
});

// Delete product
productsRouter.delete('/:pid', async (req, res) => {
    try{
        const { pid } = req.params;
        await productManager.deleteProduct(pid);
        res.status(200).json({ success: 'Product borrado exitosamente.'});
    }catch (error){
        res.status(404).json({ error: 'Product not found.'});
    }
});


// Ruta para carts
const cartRouter = express.Router();
app.use('/api/carts', cartRouter);

// Create carts
cartRouter.post('/', async (req, res) => {
    try{
        const carts = await cartManager.createCart();
        res.status(200).json(carts);
    }catch (error){
        res.status(400).json({error: error.message});
    }
});

// Get cart
cartRouter.get('/:cid', async (req, res) => {
    try{
        const { cid } = req.params;
        const cart = await cartManager.getCartById(cid);
        if(!cart){
            res.status(404).json({error: 'Cart not found.'});
            return;
        }    
        
        const productsWithQuantities = [];
        for(const i of cart.products){
            let product = await productManager.getProductById(i.product);
            if(product){
                productsWithQuantities.push({
                    product: product,
                    quantity: i.quantity
                });
            }
        }
        res.status(200).json(productsWithQuantities);
    }catch (error){
        res.status(400).json({error: error.message});
    }
});

// Add product to cart
cartRouter.post('/:cid/product/:pid', async (req, res) => {
    try{
        const { cid, pid } = req.params;
        
        // Me fijo si exite el carrito
        const cart = await cartManager.getCartById(parseInt(cid));
        if(!cart){
            res.status(404).json({error: 'Cart not found.'});
            return;
        }
    
        await cartManager.updateCart(cid, pid);
        res.status(200).json({status:'Producto añadido al carrito correctamente'});
    }catch (error){
        res.status(400).json({error: error.message});
    }
    
})

app.listen(8080, () =>{
    console.log('Servidor escuchando en puerto 8080.');
});