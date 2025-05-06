import express from 'express'
import { verifyUser } from '../middleware/authMiddleware.js'
import { addDepartment, getDepartments, getDepartment,deleteDepartments, updateDepartments } from '../controllers/departmentController.js'

const router = express.Router()

router.post("/add", verifyUser, addDepartment)

router.get("/", verifyUser, getDepartments)

router.get("/:id", verifyUser, getDepartment)

router.put("/:id", verifyUser, updateDepartments)

router.delete("/:id", verifyUser, deleteDepartments)



export default router