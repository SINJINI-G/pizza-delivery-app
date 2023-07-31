const express = require ('express')
const router = express.Router()
const { verifyToken } = require("../middlewares/auth")

const AuthController = require("../controllers/auth.controller")
const DataController = require("../controllers/data.controller")


// Auth routes
router.route('/signup').post(AuthController.signup)
router.route('/login').post(AuthController.login)
router.route('/signupVerifyOTP').post(verifyToken, AuthController.signupVerifyOTP)
router.route('/loginVerifyOTP').post(verifyToken, AuthController.loginVerifyOTP)

// Data routes
router.route('/getPizzaData').get(DataController.getPizzaData)
router.route('/setPizzaData').post(DataController.setPizzaData)
router.route('/updatePizzaData').patch(DataController.updatePizzaData)
router.route('/deletePizzaData').delete(DataController.deletePizzaData)

module.exports = router