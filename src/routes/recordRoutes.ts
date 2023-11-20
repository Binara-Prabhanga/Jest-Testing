import express from 'express';
import {
    createRecord,
    updateRecord,
    deleteRecord,
    getRecordById,
} from '../controllers/recordAPI';

const router = express.Router();

router.post("/", createRecord);
router.put("/:id", updateRecord);
router.delete("/:id", deleteRecord);
router.get("/:id", getRecordById);

export default router;
