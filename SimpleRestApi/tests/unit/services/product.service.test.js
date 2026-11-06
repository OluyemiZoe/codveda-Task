const ProductService = require('../../../src/services/product.service');

describe('ProductService', () => {
    describe('getAllProducts', () => {
        test('should return an array of all products', () => {
            const result = ProductService.getAllProducts();
            expect(Array.isArray(result)).toBe(true);
        });
    });

    describe('createProduct', () => {
        test('should successfully validate and return a created product', () => {
            const validProduct = { name: 'Power Bank', price: 500.00, stock: 8 };
            const result = ProductService.createProduct(validProduct);
            expect(result.name).toBe('Power Bank');
        });

        test('should throw an INVALID_INPUT error if required properties are missing', () => {
            const invalidProduct = { price: 200 }; 
            expect(() => {
                ProductService.createProduct(invalidProduct);
            }).toThrow('INVALID_INPUT');
        });
    });

        describe('getProductById', () => {
        test('should return a product if it exists', () => {
            const result = ProductService.getProductById(1);
            expect(result.id).toBe(1);
        });

        test('should throw NOT_FOUND if the product does not exist', () => {
            expect(() => ProductService.getProductById(999)).toThrow('NOT_FOUND');
        });
    });

    describe('updateProduct', () => {
        test('should update a product successfully', () => {
            const updateData = { name: 'Keyboard', price: 100.00, stock: 10 };
            const result = ProductService.updateProduct(1, updateData);
            expect(result.name).toBe('Keyboard');
        });
    });

    describe('deleteProduct', () => {
        test('should return true if deletion succeeds', () => {
            const result = ProductService.deleteProduct(1);
            expect(result).toBe(true);
        });
    });

});
