import express from "express"
import { events, getEventById } from '../controllers/events.controller.js';

const router = express.Router()

router.get('/', events);
router.get('/:id', getEventById)

export default router