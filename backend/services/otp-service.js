
const crypto = require('crypto')
const smsSid=process.env.SMS_SID
const smsAuthToken=process.env.SMS_AUTHTOKEN

const HashService=require("../services/hash-service")

const twilio =require('twilio')(smsSid,smsAuthToken,{
    lazyloading:true
});
class OtpService{

async generateOtp(){
const otp= crypto.randomInt(1000,9999);
return otp;

}

async sendOtp(phone,otp){
   return await twilio.messages.create({
   to:phone,
   from:process.env.SMS_FROM_NUMBER,
   body:`Your CodersHouse otpis ${otp}`
   })
}
verifyOtp(hashedOtp,data){
let computedhash=hashService.hashOtp(data);

if(computedhash===hashedOtp){
    return true;
}return false;

}


}


module.exports=new OtpService();