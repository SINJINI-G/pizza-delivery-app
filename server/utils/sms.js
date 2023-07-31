const { Vonage } = require("@vonage/server-sdk")
const { VONAGE_API_KEY, VONAGE_API_SECRET, FAKE_SMS } = require("../config")
const { log, Console } = require("console")

const vonage = new Vonage({
    apiKey: VONAGE_API_KEY,
    apiSecret: VONAGE_API_SECRET
})

const from = "Vonage APIs"

let sendSMS = async (to, OTP) =>{
    const text = `${OTP} is your OTP for Swiggy account.`
    await vonage.sms
        .send({ to, from, text })
        .then((resp) => {
            console.log("Message sent successfully")
            console.log(resp)
        })
        .catch((err) => {
            console.log("There was ann error sending the messages");
            console.log(err);
        })
}

if(FAKE_SMS){
    sendSMS =async (to, OTP) => {
        console.log("Fake SMS sent successfully");
    }
}

module.exports = sendSMS