const User = require("../models/user.model")
const Admin = require("../models/admin.model")
const Guest = require("../models/guest.model")
const sendSMS = require("../utils/sms")
const generateOTP = require("../utils")
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require("../config")

exports.login = async (req, res) => {
    try {
        const { phoneNumber } = req.body
        const adminFound = await Admin.findOne({ phoneNumber })
        if (!adminFound) {
            const userFound = await User.findOne({ phoneNumber })
            if (userFound) {
                const otp = generateOTP(4)
                await sendSMS(phoneNumber, otp)


                /* Create JWT Token */
                const accessToken = jwt.sign(
                    {
                        phoneNumber: userFound.phoneNumber,
                    },
                    JWT_SECRET,
                    { expiresIn: "30d" }
                )


                await Guest.create({ phoneNumber, otp })

                return res.status(200).json({ message: "Guest created", accessToken })
            } else
                return res.status(409).json({ message: "Phone number not registered" })
        }
        else {
            const otp = generateOTP(4)
            await sendSMS(phoneNumber, otp)

            req.app.locals.OTP = otp
            console.log(otp)
        }
    } catch (e) {
        console.log(e)
        return res.status(422).json({ error: e })
    }
}

exports.signup = async (req, res) => {
    try {
        const {
            phoneNumber
        } = req.body

        const userFound = await User.findOne({ phoneNumber })

        if (userFound)
            return res.status(422).json({ message: "User already exists!" })
        else {

            const otp = generateOTP(4)
            await sendSMS(phoneNumber, otp)

            await Guest.create({ phoneNumber, otp })

            /* Create JWT Token */
            const accessToken = jwt.sign(
                {
                    phoneNumber: phoneNumber,
                },
                JWT_SECRET,
                { expiresIn: "30d" }
            )

            return res.status(200).json({ message: "Guest created", accessToken })
        }
    } catch (e) {
        console.log(e)
        return res.status(422).json({ error: e })
    }
}

exports.signupVerifyOTP = async (req, res) => {
    const {
        user, Cotp
    } = req.body

    try {
        const guest = await Guest.findOne({ phoneNumber: user.phoneNumber })
        console.log(guest.otp);
        if (Cotp === guest.otp) {
            const newUser = await User.create(user)

            /* Create JWT Token */
            const accessToken = jwt.sign(
                {
                    userId: newUser._id,
                },
                JWT_SECRET,
                { expiresIn: "30d" }
            )

            await Guest.deleteOne({ phoneNumber: user.phoneNumber })

            return res.status(200).json(newUser)
        } else {
            // await Guest.deleteOne({ phoneNumber: user.phoneNumber })
            return res.status(400).json({ error: "Invalid OTP" })
        }
    } catch (err) {
        // await Guest.deleteOne({ phoneNumber: user.phoneNumber })
        console.log(err)
        return res.status(500).json(err)
    }
}

exports.loginVerifyOTP = async (req, res) => {
    const {
        phoneNumber, Cotp
    } = req.body

    try {
        const guest = await Guest.findOne({ phoneNumber })
        console.log(phoneNumber, guest.otp, Cotp)

        /* OTP Checking */
        if (Cotp === guest.otp) {
            const user = await User.findOne({ phoneNumber })

            await Guest.deleteOne({ phoneNumber: user.phoneNumber })
            return res.status(200).json( user )
        } else {
            // await Guest.deleteOne({ phoneNumber: user.phoneNumber })
            return res.status(400).json({ error: "Invalid OTP" })
        }
    } catch (err) {
        // await Guest.deleteOne({ phoneNumber: user.phoneNumber })
        console.log(err)
        return res.status(500).json(err)
    }
}
