const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phoneNumber: { type: Number, required: true, unique: true }
    },
    {
        timestamps: true,
        toJSON: {
            transform(doc, ret){
                delete ret.createdAt
                delete ret.updatedAt
                delete ret.__v
            }
        }
    }
)

const Admin = mongoose.model("Admin", adminSchema)

module.exports = Admin