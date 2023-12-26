import ProductModel from './models/product.model.js';
import { Exception } from '../utils.js';

export default class ProductManager {
    static get(query = {}){
        const criteria = {};
        if(query.course){
            criteria.course = query.course;
        }
        return ProductModel.find(criteria);
    }

    static async create(data){
        const product = await ProductModel.create(data);
        console.log('Product created successfully 😎');
        return product;
    }

    static async getById(pid){
        const product = await ProductModel.findById(pid);
        if(!product){
            throw new Exception(`Product with id: ${pid} do not exist 😩`, 404);
        }
        return product;
    }
    
    static async updateById(pid, data){
        const product = await ProductModel.findById(pid);
        if(!product){
            throw new Exception(`Product with id: ${pid} do not exist 😩`, 404);
        }

        const criteria = { _id: pid };
        const operation = { $set: data };
        await ProductModel.updateOne(criteria, operation);
        console.log(`Product with id: ${pid} updated successfully ♻️`);
    }

    static async deleteById(pid){
        const product = await ProductModel.findById(pid);
        if(!product){
            throw new Exception(`Product with id: ${pid} do not exist 😩`, 404);
        }

        const criteria = { _id: pid };
        await ProductModel.deleteOne(criteria);
        console.log(`Product with id: ${pid} deleted successfully 🗑️`);
    }
}

