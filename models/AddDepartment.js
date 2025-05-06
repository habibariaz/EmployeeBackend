import mongoose, { mongo } from "mongoose";
import Employee from '../models/Employees.js'
import Leave from '../models/Leave.js'
import Salary from '../models/Salary.js'

const dpt_Schema = new mongoose.Schema({
    dep_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

dpt_Schema.pre("deleteOne", { document: true, query: false }, async function (next) {
    try {
        const employees = await Employee.find({ department: this._id })
        const empsIds = employees.map(emp => emp._id)

        await Employee.deleteMany({ department: this._id })
        await Leave.deleteMany({ employeeId: { $in: empsIds } })
        await Salary.deleteMany({ employeeId: { $in: empsIds } })
        next()

    } catch (error) {
        next(error)
    }
})


const AddDepartment = mongoose.model("Department", dpt_Schema)

export default AddDepartment;