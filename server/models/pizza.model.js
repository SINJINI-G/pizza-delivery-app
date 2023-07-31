const mongoose = require("mongoose")

const pizzaSchema = new mongoose.Schema({
    name: { type: String, required: true },
    desc: { type: String, required: true },
    isVeg: { type: Boolean, required: true },
    size: 
        {
            small: { type: Number, required: true },
            medium: { type: Number, required: true },
            large: { type: Number, required: true }
        },
    
    extra: 
        {
            cheese: { type: Number, required: true },
            olive: { type: Number, required: true },
            pepperoni: { type: Number, required: true },
            sauce: { type: Number, required: true },
            origano: { type: Number, required: true },
            chilliFlakes: { type: Number, required: true },
        },
    
    img:
    {
        data: Buffer,
        contentType: String
    }
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


const Pizza = mongoose.model("Pizza", pizzaSchema)

module.exports= Pizza