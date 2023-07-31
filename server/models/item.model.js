const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema({
    userId: { type: String, requirde: true },
    name: { type: String, required: true },
    size: { type: String, enum: ["Small", "Medium", "Large"], default: "Medium" },
    extra: 
        [{
            cheese: { type: Boolean },
            olive: { type: Boolean },
            pepperoni: { type: Boolean },
            sauce: { type: Number },
            origano: { type: Number },
            chilliFlakes: { type: Number },
        }],
    quantity: { type: Number, required: true, default: 1 },
    isPrepared: { type: Boolean, required: true, default: false }
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


const Item = mongoose.model("Item", itemSchema)

module.exports= Item