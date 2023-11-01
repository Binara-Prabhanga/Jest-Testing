import { Request, Response } from 'express';
import { loadData, saveData } from '../data/dataManager.ts';
import { Record } from '../models/record.ts';

let records: Record[] = loadData();

export const createRecord = (req: Request, res: Response): void => {
    const { id, name, contact, address }: Record = req.body;
    const newRecord: Record = { id, name, contact, address           };
    records.push(newRecord);
    saveData(records);
    res.status(201).json(newRecord);
};

export const updateRecord = (req: Request, res: Response): void => {
    const { id } = req.params;
    const { name, contact, address }: Record = req.body;
    const record = records.find((r: { id: number; }) => r.id === parseInt(id));
    if (record) {
        record.name = name;
        record.contact = contact;
        record.address = address;
        saveData(records);
        res.status(200).json(record);
    } else {
        res.status(404).json({ error: "Record not found" });
    }
};

export const deleteRecord = (req: Request, res: Response): void => {
    const { id } = req.params;
    const index = records.findIndex((r: { id: number; }) => r.id === parseInt(id));
    if (index !== -1) {
        records.splice(index, 1);
        saveData(records);
        res.status(204).send();
    } else {
        res.status(404).json({ error: "Record not found" });
    }
};

export const getRecordById = (req: Request, res: Response): void => {
    const { id } = req.params;
    const record = records.find((r: { id: number; }) => r.id === parseInt(id));
    if (record) {
        res.status(200).json(record);
    } else {
        res.status(404).json({ error: "Record not found" });
    }
};

export const getAllRecords = (req: Request, res: Response): void => {
    res.status(200).json(records);
};
