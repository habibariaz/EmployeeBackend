import express from 'express'
import { verifyUser } from '../middleware/authMiddleware.js'
import { getSummary } from '../controllers/dashboardController.js'

const router = express.Router()

router.get('/summary', verifyUser, getSummary )


export default router;