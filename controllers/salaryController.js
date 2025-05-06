import Salary from "../models/Salary.js";
import Employee from '../models/Employees.js'

export const addSalary = async (req, res) => {

    try {
        const { employeeId, salary, allowances, deduction, payDate } = req.body;

        const totalSalary = Number(salary) + Number(allowances) - Number(deduction);

        // const totalSalary = parseInt(basicSalary) + parseInt(allowances) - parseInt(deduction)

        const newSalary = new Salary({
            employeeId,
            salary,
            allowances,
            deduction,
            netSalary: totalSalary,
            payDate
        })

        await newSalary.save()
        return res.status(200).json({ success: true })

    } catch (error) {
        return res.status(500).json({ success: false, error: "Salary Add Server error" })

    }
}

export const getSalary = async (req, res) => {
    try {
        const { id, role } = req.params;
        console.log(role)
        console.log(id)

        let salary;

        if (role === "admin") {
            salary = await Salary.find({ employeeId: id }).populate("employeeId", "employeeId")
        }
        else {
            const employee = await Employee.findOne({ userId: id })
            salary = await Salary.find({ employeeId: employee._id }).populate("employeeId", "employeeId")
        }



        return res.status(200).json({ success: true, salary })

    } catch (error) {
        return res.status(500).json({ success: false, error: "Get Salar Server error" })
    }
}