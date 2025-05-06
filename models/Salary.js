import mongoose, { Schema } from "mongoose";

const salarySchema = new mongoose.Schema({
    employeeId: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    allowances: {
        type: Number,
        default: 0
    },
    deduction: {
        type: Number,
        default: 0
    },
    netSalary: {
        type: Number,
    },
    payDate: {
        type: Date,
        required: true,
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})
const Salary = mongoose.model("Salary", salarySchema)
export default Salary;