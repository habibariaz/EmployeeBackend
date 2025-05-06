import AddDepartment from '../models/AddDepartment.js'


export const addDepartment = async (req, res) => {

    try {
        const { dep_name, description } = req.body;
        const newDpt = new AddDepartment({
            dep_name,
            description
        })
        await newDpt.save()
        return res.status(200).json({ success: true, department: newDpt })
    } catch (error) {
        return res.status(500).json({ success: false, error: "Add Department Server Error" })
    }
}

export const getDepartments = async (req, res) => {
    try {
        const departments = await AddDepartment.find()
        return res.status(200).json({ success: true, departments })
    } catch (error) {
        return res.status(500).json({ success: false, error: "Fetch Department Server Error" })
    }
}

export const getDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const department = await AddDepartment.findById({ _id: id })
        return res.status(200).json({ success: true, department })

    } catch (error) {
        return res.status(500).json({ success: false, error: "Get Department Server Error" })
    }
}

export const updateDepartments = async (req, res) => {
    try {
        const { id } = req.params;
        const { dep_name, description } = req.body;

        const updateDepartment = await AddDepartment.findByIdAndUpdate({ _id: id }, {
            dep_name,
            description
        })

        return res.status(200).json({ success: true, updateDepartment })

    } catch (error) {
        return res.status(500).json({ success: false, error: "Updated Department Server Error" })
    }
}

export const deleteDepartments = async (req, res) => {
    try {
        const { id } = req.params;

        // const deleteDepartment = await AddDepartment.findByIdAndDelete({ _id: id })
        // const deleteDepartment = await AddDepartment.findByIdAndDelete(id )
        const deleteDepartment = await AddDepartment.findById({_id:id} )
        await deleteDepartment.deleteOne()


        return res.status(200).json({ success: true, deleteDepartment })

    } catch (error) {
        return res.status(500).json({ success: false, error: "Delete Department Server Error" })
    }
}