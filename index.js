import express from 'express'
import cors from "cors"
import authRouter from './routes/auth.js'
import connectToDatabase from './DB/db.js'
import dptRouter from './routes/department.js'
import empRouter from './routes/employee.js'
import salaryRouter from './routes/salary.js'
import leaveRouter from './routes/leave.js'
import settingRouter from './routes/setting.js'
import dashboardRouter from './routes/dashboard.js'

connectToDatabase()
const app = express()
app.use(cors())
app.use(express.static('public/uploads'))
app.use(express.json())

app.use('/api/auth', authRouter)

app.use('/api/department', dptRouter)

app.use('/api/employees', empRouter)

app.use('/api/salary', salaryRouter)

app.use('/api/leave', leaveRouter)

app.use('/api/setting', settingRouter)

app.use('/api/dashboard', dashboardRouter)


app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT ${process.env.PORT}`)
})