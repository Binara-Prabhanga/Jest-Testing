import request from 'supertest';
import express from 'express';
import recordRouter from '../routes/recordRoutes.ts';

jest.mock('../data/dataManager.ts', () => ({
    loadData: jest.fn(() => [{ id: 1231, name: 'check 1231', contact: 21231, address: 'Galle1231' }]),
    saveData: jest.fn(),
}));

describe('recordController Functions', () => {
    let app: express.Application;

    beforeAll(() => {
        app = express();
        app.use(express.json());
        app.use('/api/records', recordRouter);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create a new record', async () => {
        const response = await request(app)
            .post('/api/records/')
            .send({
                id: 1231,
                name: 'check 1231',
                contact: 21231,
                address: 'Galle1231',
            });

        expect(response.body).toEqual({
            id: 1231,
            name: 'check 1231',
            contact: 21231,
            address: 'Galle1231',
        });

    });


    it('should update an existing record', async () => {
        const updatedRecordData = {
            id: 1231,
            name: 'Updated Name',
            contact: 98765,
            address: 'Updated Address',
        };

        const response = await request(app)
            .put('/api/records/1231')
            .send(updatedRecordData);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(updatedRecordData);
    });

    it('should return 404 if trying to update non-existing record', async () => {
        const nonExistingRecordData = {
            id: 9999,
            name: 'Non Existing Record',
            contact: 12345,
            address: 'Non Existing Address',
        };

        const response = await request(app)
            .put('/api/records/9999')
            .send(nonExistingRecordData);

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: 'Record not found' });
    });


    it('should delete an existing record', async () => {
        const response = await request(app)
            .delete('/api/records/1231');

        expect(response.status).toBe(204);
        expect(response.body).toEqual({});
    });

    it('should return 404 if trying to delete non-existing record', async () => {
        const response = await request(app)
            .delete('/api/records/9999');

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: 'Record not found' });
    });

    it('should get an existing record by ID', async () => {
        const response = await request(app)
            .get('/api/records/1231');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            id: 1231,
            name: 'check 1231',
            contact: 21231,
            address: 'Galle1231',
        });
    });

    it('should return 404 if trying to get non-existing record by ID', async () => {
        const response = await request(app)
            .get('/api/records/9999');

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: 'Record not found' });
    });

    it('should get all records',  async () => {
        const response = await request(app)
            .get('/api/records');

        expect(response.status).toBe(200);
        expect(response.body).toEqual([{ id: 1231, name: 'check 1231', contact: 21231, address: 'Galle1231' }]);
    });

});
