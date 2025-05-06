import express from 'express'
import { verifyUser } from '../middleware/authMiddleware.js'
import { changePassword } from '../controllers/settingController.js'

const router = express.Router()

router.put("/change-password", verifyUser, changePassword)


export default router

