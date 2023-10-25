import * as fs from "fs";
import path = require("path");
import { Record } from "../models/record";

let records: Record[] = [];
const dataFilePath = path.join(__dirname, "data.json");

export function loadData(): Record[] {
    try {
        const data = fs.readFileSync(dataFilePath, "utf8");
        return JSON.parse(data) as Record[];
    } catch (error) {
        console.error("Error loading data! :", error);
        return [];
    }
}

export function saveData(records: Record[]): Record[] {
    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(records, null, 2), "utf8");
        return records;
    } catch (error) {
        console.error("Error saving data:", error);
        return [];
    }
}