const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const Trip = require('../../models/trip.model');
describe('Pruebas sobre la Api de trips', () => {

    beforeAll(async () => {
        await mongoose.connect('mongodb://127.0.0.1/familyTrips');
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });
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

    describe('POST /api/trips', () => {

        const newTrip = {
            name: 'test trips',
            destination: 'Berlin',
            category: 'familiar',
            start_date: '2022-06-20'
        };

        afterAll(async () => {
            await Trip.deleteMany({ name: 'test trips' });
        });

        it('La ruta funcione', async () => {
            const response = await request(app).post('/api/trips').send(newTrip);

            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });

        it('Se inserta correctamente', async () => {
            const response = await request(app).post('/api/trips').send(newTrip);

            expect(response.body._id).toBeDefined();
            expect(response.body.name).toBe(newTrip.name);
        })
    });
});