import express from 'express'
import { verifyUser } from '../middleware/authMiddleware.js'
import { addSalary,getSalary } from '../controllers/salaryController.js'

const router = express.Router()

router.post("/add", verifyUser, addSalary)
router.get("/:id/:role", verifyUser, getSalary)




export default router

