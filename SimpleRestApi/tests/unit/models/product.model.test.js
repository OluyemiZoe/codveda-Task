const ProductModel = require('../../../src/models/product.model');

describe('ProductModel', () => {
    test('getAll should return the initial products array', () => {
        const result = ProductModel.getAll();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(2);
    });

    test('create should add a new product to the list', () => {
        const newProductData = { name: 'Table Fan', price: 30.99, stock: 20 };
        const result = ProductModel.create(newProductData);
        
        expect(result).toHaveProperty('id');
        expect(result.name).toBe('Table Fan');
    });

       test('getById should return the matching product or undefined if missing', () => {
        const found = ProductModel.getById(1);
        expect(found.name).toBe('Wireless Mouse');
        expect(ProductModel.getById(999)).toBeUndefined();
    });

    test('update should modify an existing product and return it', () => {
        const updated = ProductModel.update(1, { name: 'Premium Mouse', price: 35.00, stock: 10 });
        expect(updated.name).toBe('Premium Mouse');
        expect(updated.price).toBe(35.00);
    });

    test('delete should remove a product and return true, or false if not found', () => {
        const isDeleted = ProductModel.delete(2);
        expect(isDeleted).toBe(true);
        expect(ProductModel.delete(999)).toBe(false);
    });
 
});
