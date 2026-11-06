const request = require('supertest');
const app = require('../../src/app');

describe('Product API Endpoints', () => {
    
    
    afterAll(async () => {
        if (app.close) {
            await app.close();
        }
    });

    describe('GET /api/products', () => {
        test('should return 200 OK and a JSON array of products', async () => {
            const res = await request(app)
                .get('/api/products')
                .expect('Content-Type', /json/)
                .expect(200);

            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    describe('POST /api/products', () => {
        test('should return 201 Created when payload is structurally valid', async () => {
            const payload = { name: 'Bluetooth Speaker', price: 49.99, stock: 12 };
            const res = await request(app)
                .post('/api/products')
                .send(payload)
                .expect(201);

            expect(res.body.name).toBe('Bluetooth Speaker');
        });
    });

        describe('GET /api/products/:id', () => {
        test('should return 200 OK and the specific product', async () => {
            await request(app)
                .get('/api/products/1')
                .expect(200);
        });

        test('should return 404 Not Found for missing IDs', async () => {
            await request(app)
                .get('/api/products/999')
                .expect(404);
        });
    });

    describe('PUT /api/products/:id', () => {
        test('should return 200 OK and update the product asset', async () => {
            const payload = { name: 'Mouse', price: 45.00, stock: 20 };
            const res = await request(app)
                .put('/api/products/1')
                .send(payload)
                .expect(200);
            expect(res.body.name).toBe('Mouse');
        });
    });

    describe('DELETE /api/products/:id', () => {
        test('should return 204 No Content upon deletion', async () => {
            await request(app)
                .delete('/api/products/1')
                .expect(204);
        });
    });

});
