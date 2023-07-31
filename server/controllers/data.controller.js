const Pizza = require('../models/pizza.model')

exports.getPizzaData = async (req,res) =>{
    try{
        const data = await Pizza.find();
        
        if(data) return res.status(200).json(data)
        else res.status(404).json({err: "db is empty"});
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}

exports.setPizzaData = async (req,res) => {
    try{
        const data = req.body
        await Pizza.create(data)
        res.status(200).json({msg: "data added"})
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}

exports.updatePizzaData = async (req,res) => {
    try{
        const {id} = req.query
        const data = req.body
        const pizza = await Pizza.findById(id)
        if(pizza){
            await pizza.updateOne(data)
            res.status(200).json({msg: "updated"})
        }
        else{
            console.log("id not found")
            res.status(500).json({err: "not found"})
        }
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}

exports.deletePizzaData = async (req,res) => {
    try{
        const {id} = req.query
        const pizza = await Pizza.findById(id)
        if(pizza){
            await pizza.deleteOne()
            res.status(200).json({msg: "deleted"})
        }
        else{
            console.log("id not found")
            res.status(500).json({err: "not found"})
        }
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}