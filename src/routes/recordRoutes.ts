import express from 'express';
import {
    createRecord,
    updateRecord,
    deleteRecord,
    getRecordById,
    getAllRecords
} from '../controllers/recordAPI.ts';

const router = express.Router();

router.post("/", createRecord);
router.put("/:id", updateRecord);
router.delete("/:id", deleteRecord);
router.get("/:id", getRecordById);
router.get('/', getAllRecords);

export default router;
