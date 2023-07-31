const { Module } = require("module")

const generateOTP = (length) => {
    return Math.random().toString().substring(2, 2+length)
}

module.exports = generateOTP