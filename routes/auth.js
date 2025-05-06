import express, { Router } from 'express'
import { Login, Verify } from '../controllers/authControllers.js'
import { verifyUser } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/login', Login)

//middleware to check verify a valid user that registered
router.get('/verify', verifyUser, Verify)


export default router;