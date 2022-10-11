const request = require('supertest');
const app = require('../../app')
describe('Pruebas sobre la Api de trips', () => {

    describe('GET /api/trips', () => {

        let response
        beforeEach(async () => {
            response = await request(app).get('/api/trips').send();

        })

        it('La ruta funciona', async () => {

            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });

        it('La petición nos devuelve un array de trips', async () => {
            expect(response.body).toBeInstanceOf(Array);
        })
    });
});