const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    desc: { type: String, required: true },
    item: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Item" }],
    totalPrice: { type: Number, required: true },
    address: { type: String, required: true },
    isPaid: { type: Boolean, required: true, default: false },
    paymentMode: { type: String, required: true },
    isOutForDelivery: { type: Boolean, required: true, default: false },
    isDelivered: { type: Boolean, required: true, default: false },
    deliveryAgentName: { type: String },
    deliveryAgentPhno: { type: String }
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


const Order = mongoose.model("Order", orderSchema)

module.exports= Order