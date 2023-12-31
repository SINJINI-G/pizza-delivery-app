require('dotenv').config()

module.exports = {
    PORT: process.env.PORT,
    DB_URI: process.env.DB_URI,
    VONAGE_APIKEY: process.env.VONAGE_APIKEY,
    VONAGE_APISECRET: process.env.VONAGE_APISECRET,
    FAKE_SMS: process.env.FAKE_SMS,
    JWT_SECRET: process.env.JWT_SECRET
}