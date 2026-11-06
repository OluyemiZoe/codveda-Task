import ProductService from '../services/product.service.js';

class ProductController {
    static async getAll(req, res) {
        try {
            const products = await ProductService.getAllProducts();
            
            const payload = Array.isArray(products) ? products : [];
            res.status(200).json(payload);
        } catch (error) {
            console.error('❌ Error in ProductController.getAll:', error);
            res.status(500).json({ error: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const id = req.params.id;
            const product = await ProductService.getProductById(id);
            res.status(200).json(product);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    static async create(req, res) {
        try {
            const newProduct = await ProductService.createProduct(req.body);
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async update(req, res) {
        try {
            const id = req.params.id;
            const updatedProduct = await ProductService.updateProduct(id, req.body);
            res.status(200).json(updatedProduct);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const id = req.params.id;
            await ProductService.deleteProduct(id);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default ProductController;
