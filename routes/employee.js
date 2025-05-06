import express from 'express'
// import jwt from "jsonwebtoken"
import { verifyUser } from '../middleware/authMiddleware.js'
import { addEmployee, upload, getEmployees, viewEmployee, editEmployee,fetchEmployeesByDepId } from '../controllers/employeeController.js'

const router = express.Router()

router.post("/addEmployee", verifyUser, upload.single("image"), addEmployee)

router.get("/", verifyUser, getEmployees)

router.get("/:id", verifyUser, viewEmployee)

router.put("/:id", verifyUser, editEmployee)

router.get("/department/:id", verifyUser, fetchEmployeesByDepId)


// router.delete("/:id", verifyUser, deleteDepartments)


export default router
