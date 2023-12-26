import { Router } from "express";
import ProductModel from '../../dao/models/product.model.js';
import ProductManager from '../../dao/ProductManager.js';
import mongoosePaginate from 'mongoose-paginate-v2';
import { uploader } from "../../utils.js";
import productModel from "../../dao/models/product.model.js";

const router = Router();
const _URL = 'http://localhost:8080/img/';


const buildResponse = (data) => {
    return {
        status: 'success',
        payload: data.docs.map( (product) => product.toJSON()),
        totalPages: data.totalPages,
        prevPage: data.prevPage,
        nextPage: data.nextPage,
        page: data.page,
        hasPrevPage: data.hasPrevPage,
        hasNextPage: data.nextPage,
        prevLink: data.hasPrevPage ? `http://localhost:8080/api/products?limit=${data.limit}&page=${data.prevPage}${data.category ? `&category=${data.category}` : ""}${data.stock ? `&stock=${data.stock}` : ""}` : "",
        nextLink: data.hasNextPage ? `http://localhost:8080/api/products?limit=${data.limit}&page=${data.nextPage}${data.category ? `&category=${data.category}` : ""}${data.stock ? `&stock=${data.stock}` : ""}` : ""
    };
};

//GET
router.get('/products', async (req, res) =>{
    try {
        const { page = 1, limit = 10, category, stock, query, sort } = req.query;
        const options = { page, limit, sort: { price: sort || "asc"} };
        const criteria = {};
        if(category){
            criteria.category = category;
        }
        if(query){
            query = JSON.parse(query);
            criteria.query = query;
        }
        const result = await ProductModel.paginate(criteria, options);
        //res.status(200).render('home' , buildResponse(result));
        res.status(200).render("products", buildResponse({ ...result, category, stock }));
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
});

router.get('/products/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await ProductModel.findById(pid);
        const result = await ProductModel.paginate({ _id: pid }, { limit: 1 });
        if(product){
            res.render('home', buildResponse(result));
        }else{
            res.json({ message: `Product ${pid} not found`});
        }
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
});

//POST
router.post('/products', uploader.single('thumbnails'), async (req, res) => {
    try {
        const filename = req.file.filename;
        const imageURL = `${_URL}${filename}`;
        const {
            title: prodTitle,
            description: prodDescription,
            code: prodCode,
            price: prodPrice,
            status: prodStatus,
            stock: prodStock,
            category: prodCategory
        } = req.body;
        const prodThumbnails = imageURL || '';
        const products = await productModel.find();
        if( !(prodTitle && prodDescription && prodCode && prodPrice && prodStock && prodCategory) || products.find((prod) => prod.code === prodCode)){
            res.status(400).json(`Required file is empty or the code ${prodCode} already exist`);
        }else{
            await productModel.create({ title: prodTitle, description: prodDescription, code: prodCode, price: prodPrice, status: prodStatus || true, stock: prodStock, category: prodCategory, thumbnails: prodThumbnails });
              const newProduct = await productModel.find();
      
              res.status(201).send(newProduct.find((prod) => prod.code === prodCode));
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//PUT
router.put('/products/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        //const { body } = req;
        const updated = await ProductManager.updateProduct(pid, req.body);
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
    
});

//DELETE
router.delete('/products/:pid', async (req,res) => {
    try {
        const { pid } = req.params;
        await ProductManager.deleteById(pid); //Preg si tengo que devolver algo con json o basta con mostrar en la consola
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;