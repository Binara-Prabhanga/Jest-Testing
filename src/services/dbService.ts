// src/services/dbService.ts
import { createConnection, Connection } from 'typeorm';

export const connectToDatabase = async (): Promise<Connection> => {
    return await createConnection();
};
