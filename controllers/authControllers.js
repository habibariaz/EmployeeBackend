import User from "../models/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ success: false, error: "User Not Found...!!!" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(404).json({ success: false, error: "Wrong Password...!!!" })
        }

        //generate token
        const token = jwt.sign({ _id: user._id, role: user.role },
            process.env.JWT_KEY, { expiresIn: "3d" }
        )

        return res.status(200).json({
            success: true,
            token,
            user: {
                _id: user._id,
                name: user.name,
                role: user.role
            }
        })
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}

export const Verify = (req, res) => {
    return res.status(200).json({ success: true, user: req.user })
}
