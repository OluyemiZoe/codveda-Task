import ProductModel from '../models/product.model.js';

class ProductService {
    static getAllProducts() {
        return ProductModel.getAll();
    }

    static getProductById(id) {
        const product = ProductModel.getById(id);
        if (!product) throw new Error('NOT_FOUND');
        return product;
    }

    static createProduct(data) {
        if (!data.name || data.price === undefined || data.stock === undefined) {
            throw new Error('INVALID_INPUT');
        }
        return ProductModel.create(data);
    }

    static updateProduct(id, data) {
        if (!data.name || data.price === undefined || data.stock === undefined) {
            throw new Error('INVALID_INPUT');
        }
        const updated = ProductModel.update(id, data);
        if (!updated) throw new Error('NOT_FOUND');
        return updated;
    }

    static deleteProduct(id) {
        const isDeleted = ProductModel.delete(id);
        if (!isDeleted) throw new Error('NOT_FOUND');
        return true;
    }
}

export default ProductService;
