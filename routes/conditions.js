import express from 'express'
import { createEntry, readAllEntries, entriesByLoc, entriesByVal, filterEntries } from '../controllers/conditions.js';

const router = express.Router();

//create
router.post('/', createEntry);

//read all entries
router.get('/', readAllEntries);
//filter entries
router.get('/filter', filterEntries);

//Search by location
router.get('/byLocation', entriesByLoc);

//Search by Val
router.get('/byValues', entriesByVal);

export default router;
