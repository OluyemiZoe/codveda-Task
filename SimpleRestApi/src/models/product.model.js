import { getCollection } from '../config/database.js';
import { ObjectId } from 'mongodb';

class ProductModel {
    
    static async getAll() {
        try {
            const productCollection = getCollection('products');
            const data = await productCollection.find({}).toArray();
            // Force an array output layout even if the remote collection is entirely empty
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error('Database tier find crash:', error);
            return [];
        }
    }

    
    static async getById(id) {
        const productCollection = getCollection('products');
        try {
            return await productCollection.findOne({ _id: new ObjectId(id) });
        } catch (error) {
            return null;
        }
    }

    
    static async create(productData) {
        const productCollection = getCollection('products');
        const newProduct = {
            ...productData,
            createdAt: new Date()
        };
        const result = await productCollection.insertOne(newProduct);
        return { _id: result.insertedId, ...newProduct };
    }

    
    static async update(id, updatedData) {
        const productCollection = getCollection('products');
        try {
            const result = await productCollection.findOneAndUpdate(
                { _id: new ObjectId(id) },
                { $set: updatedData },
                { returnDocument: 'after' }
            );
            return result;
        } catch (error) {
            return null;
        }
    }

    
    static async delete(id) {
        const productCollection = getCollection('products');
        try {
            const result = await productCollection.deleteOne({ _id: new ObjectId(id) });
            return result.deletedCount > 0;
        } catch (error) {
            console.error('Database tier deletion crash:', error);
            return false;
        }
    }
}

export default ProductModel;
