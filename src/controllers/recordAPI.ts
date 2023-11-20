import { Request, Response } from 'express';
import { Pool } from 'pg';

// pool to manage database connections
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'database123',
    password: 'root1234',
    port: 5432 
});

// Function to create a new record
export const createRecord = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, contact, address } = req.body;

        const result = await pool.query(
            'INSERT INTO records (name, contact, address) VALUES ($1, $2, $3) RETURNING *',
            [name, contact, address]
        );

        const newRecord = result.rows[0];
        res.status(201).json(newRecord);
    } catch (error) {
        console.error('Error creating record:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Function to update an existing record
export const updateRecord = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { name, contact, address } = req.body;

        const result = await pool.query(
            'UPDATE records SET name = $1, contact = $2, address = $3 WHERE id = $4 RETURNING *',
            [name, contact, address, id]
        );

        const updatedRecord = result.rows[0];

        if (updatedRecord) {
            res.status(200).json(updatedRecord);
        } else {
            res.status(404).json({ error: 'Record not found' });
        }
    } catch (error) {
        console.error('Error updating record:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Function to view a record by ID
export const getRecordById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const result = await pool.query('SELECT * FROM records WHERE id = $1', [id]);
        const record = result.rows[0];

        if (record) {
            res.status(200).json(record);
        } else {
            res.status(404).json({ error: 'Record not found' });
        }
    } catch (error) {
        console.error('Error retrieving record:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Function to delete a record by ID
export const deleteRecord = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const result = await pool.query('DELETE FROM records WHERE id = $1 RETURNING *', [id]);
        const deletedRecord = result.rows[0];

        if (deletedRecord) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Record not found' });
        }
    } catch (error) {
        console.error('Error deleting record:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
