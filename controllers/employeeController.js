import User from "../models/User.js";
import multer from 'multer'
import path from 'path'
import bcrypt from 'bcrypt'
import Employee from '../models/Employees.js'
import AddDepartment from "../models/AddDepartment.js";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })

export const addEmployee = async (req, res) => {
    try {
        const {
            name,
            email,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary,
            password,
            role
        } = req.body;

        const user = await User.findOne({ email });

        if (user) {
            return res.status(200).json({ success: false, error: "User Already Exists in Employee" })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            name,
            email,
            password: hashPassword,
            role,
            profileImage: req.file ? req.file.filename : ""
        })

        const savedUser = await newUser.save()

        const newEmployee = new Employee({
            userId: savedUser._id,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary
        })

        await newEmployee.save()
        return res.status(200).json({ success: true, message: "Employee Created" })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success: false, error: "Add Employee Server Error" })
    }
}

export const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find()
            .populate("userId", { password: 0 })
            .populate("department");

        return res.status(200).json({ success: true, employees });
    } catch (error) {
        console.error("Error fetching employees:", error.message);
        return res.status(500).json({ success: false, error: "Fetch employees Server Error" });
    }
};

export const viewEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        let employee;
        employee = await Employee.findById({ _id: id })
            .populate("userId", { password: 0 })
            .populate("department");

        // new
        if (!employee) {
            employee = await Employee.findOne({ userId: id })
                .populate("userId", { password: 0 })
                .populate("department");

        }
        return res.status(200).json({ success: true, employee });
    } catch (error) {
        console.error("Error fetching employees:", error.message);
        return res.status(500).json({ success: false, error: "View employees Server Error" });
    }
}

export const editEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name,
            maritalStatus,
            designation,
            department,
            salary,
        } = req.body;

        const employee = await Employee.findByIdAndUpdate({ _id: id })

        if (!employee) {
            return res.status(404).json({ success: false, error: "Employee not found..!!" })
        }

        const user = await User.findById({ _id: employee.userId })
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found..!!" })
        }

        const updateUser = await User.findByIdAndUpdate({ _id: employee.userId }, { name })
        const updateEmployee = await Employee.findByIdAndUpdate({ _id: id }, {
            maritalStatus,
            designation,
            salary,
            department,
        })

        if (!updateUser || !updateEmployee) {
            return res.status(404).json({ success: false, error: "Document not found..!!" })
        } else {
            return res.status(200).json({ success: true, message: "Employee Updated" })
        }

    } catch (error) {
        return res.status(500).json({ success: false, error: "Edit Employee Server Error" })
    }
}

export const fetchEmployeesByDepId = async (req, res) => {
    const { id } = req.params;
    try {
        const employees = await Employee.find({ department: id })

        return res.status(200).json({ success: true, employees });

    } catch (error) {
        console.error("Error fetching employees:", error.message);
        return res.status(500).json({ success: false, error: "fetch employees by Department Server Error" });
    }
}

export { upload } 