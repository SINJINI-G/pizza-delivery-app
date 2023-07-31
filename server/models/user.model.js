const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    nearestLandmark:  { type: String, required: true },
    zipCode: { type: Number, required: true } 
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
})


const User = mongoose.model("User", userSchema)

module.exports= User