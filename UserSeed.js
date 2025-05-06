import User from './models/User.js'
import bcrypt from 'bcrypt'
import connectToDatabase from './DB/db.js'

const userRegister = async () => {
    connectToDatabase()
    try {
        //converting a simple password into hashed password
        const hashPassword = await bcrypt.hash("123", 10)
        const newUser = new User({
            name: "Habiba",
            email: "123",
            password: hashPassword,
            role: "admin"
        })
        await newUser.save()
    } catch (error) {
        console.log(error)
    }
}

userRegister()