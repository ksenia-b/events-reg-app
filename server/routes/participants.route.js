import express from 'express';
import { getParticipants, addParticipants } from '../controllers/participants.controller.js';

const router = express.Router();


router.get('/:eventId', getParticipants);
router.post('/', addParticipants);

export default router