const express = require ('express')
const cors = require ('cors')
const morgan = require ('morgan')

const app = express()

app.use(cors({ origin:'*' }))
app.use(morgan('tiny'))
app.use(express.json({limit:'5mb'}))

app.use(require("./routes"))
module.exports = app