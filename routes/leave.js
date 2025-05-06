import express from 'express'
import { verifyUser } from '../middleware/authMiddleware.js'
import { addLeave,getLeaves,getLeave,getLeaveDetail,updateLeave } from '../controllers/leaveControllers.js'

const router = express.Router()

router.post("/add", verifyUser, addLeave)
router.get("/:id", verifyUser, getLeaves)
router.get("/detail/:id", verifyUser, getLeaveDetail)
router.put("/:id", verifyUser, updateLeave)

router.get("/", verifyUser, getLeave)






export default router
