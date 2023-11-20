// import request from 'supertest';
// import express from 'express';
// import recordRouter from '../routes/recordRoutes.ts';

// jest.mock('../data/dataManager.ts', () => ({
//     loadData: jest.fn(() => [{ id: 1231, name: 'check 1231', contact: 21231, address: 'Galle1231' }]),
//     saveData: jest.fn(),
// }));

// describe('Record API Integration Tests', () => {
//     let app: express.Application;

//     beforeAll(() => {
//         app = express();
//         app.use(express.json());
//         app.use('/api/records', recordRouter);
//     });

//     afterEach(() => {
//         jest.clearAllMocks();
//     });

//     it('should create, update, and delete a record', async () => {
//         // Create a new record
//         const createResponse = await request(app)
//             .post('/api/records/')
//             .send({
//                 id: 1232,
//                 name: 'New Record',
//                 contact: 98765,
//                 address: 'New Address',
//             });

//         expect(createResponse.status).toBe(201);

//         // Update the created record
//         const updatedRecordData = {
//             id: 1232,
//             name: 'Updated Name',
//             contact: 12345,
//             address: 'Updated Address',
//         };

//         const updateResponse = await request(app)
//             .put('/api/records/1232')
//             .send(updatedRecordData);

//         expect(updateResponse.status).toBe(200);
//         expect(updateResponse.body).toEqual(updatedRecordData);

//         // Delete the updated record
//         const deleteResponse = await request(app).delete('/api/records/1232');
//         expect(deleteResponse.status).toBe(204);

//         // Verify the record is deleted
//         const getResponse = await request(app).get('/api/records/1232');
//         expect(getResponse.status).toBe(404);
//     });

// });
