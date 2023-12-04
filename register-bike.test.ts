import request from 'supertest';
import server from '../server'
import prisma from '../external/database/db';

describe('Register bike route', () => {
    beforeEach(async () => {
        await prisma.bike.deleteMany({});
    });

    afterAll(async () => {
        await prisma.bike.deleteMany({});
    });

    it('registers a bike with valid data', async () => {
        await request(server)
            .post('/api/bikes')
            .send({
                name: 'SONICO',
                type: 'Mountain',
                bodySize: 26,
                maxLoad: 120,
                rate: 10,
                description: 'A sturdy mountain bike',
                ratings: 4.5,
                imageUrls: ['https://example.com/bike.jpg'],
                available: true,
                location: { latitude: 40.7128, longitude: -74.0060 }
            })
            .expect(201)
            .then((res) => {
                expect(res.body.id).toBeDefined();
            });
    });

});
