const mongoose = require('mongoose')

const guestSchema = new mongoose.Schema({
    phoneNumber: { type: String },
    otp: { type: String }
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


const Guest = mongoose.model("Guest", guestSchema)

module.exports= Guest