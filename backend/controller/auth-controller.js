const otpService = require("../services/otp-service");
const HashService=require("../services/hash-service")
const userService= require('../services/user-service')
const tokenService=require('../services/token-service')
const userdto=require ("../dtos/user-dto")
class AuthController {
    async sendOtp(req, res) {
      const { phone } = req.body;
  
      if (!phone) {
        res.status(400).json({ message: 'Phone field is required.' });
      }

     const otp=await otpService.generateOtp();


     const ttl=1000*60*2;

     const expires=Date.now()+ttl;

     const data=`${phone}.${otp}.${expires}`

     const hash=HashService.hashOtp(data);
 
     try{
        await otpService.sendOtp(phone,otp);
        res.json({
            hash:`${hash}.${expires}`,
            phone,
        })
     } catch(err){
        console.log(err);
        res.status(500).json({message:'message sending failed'})
     }
    
     res.json({hash:hash});

    }


  async  verifyotp(req,res){
//Logic
const{otp,hash,phone}=req.body;
if(!otp||!hash||!phone){
  res.status(400).json({message:"All fields are required"});
}

 const[hashedOtp,expires]=hash.split('.');
 if(Date.now()> +expires){
  res.status(400).json({message:"OTP expires"})
 }
 const data=`${phone}.${otp}.${expires}`
const isValid=otpService.verifyOtp(hashedOtp,data);
if(!isValid){
  res.status(400).json({message:"Invaid Otp"});
}

let user;


try{
  user=await userService.findUser({phone:phone})
  if(!user){
  user=  await userService.createUser({phone:phone})
  }
}catch(error){
console.log(error);
res.status(500).json({message:"Db error"});
}

//token
const{accessToken, refreshToken}=tokenService.generateTokens({_id:user._id,activated:false})
await tokenService.storeRefreshToken(refreshToken,user._id)

res.cookie('refreshtoken',refreshToken,{
  maxAge:1000*60*60*24*30,
  httpOnly:true
})

res.cookie('accessToken',accessToken,{
  maxAge:1000*60*60*24*30,
  httpOnly:true,

})
const userdto=new UserDto(user);
res.json({user:userdto,auth:true});

    }


async refresh(req,res){
  //get refresh token from cookie
const {refreshToken:refreshTokenFromCookie}=req.cookies;

  //check if token is valid
  let userData;
  try{
userData=await tokenService.verifyRefreshToken(refreshTokenFromCookie);
  }catch(error){
return res.status(401).json({message:'Invalid Token'})
  }
  // check if token is in database
  try{
    const token =tokenService.findRefreshToken(userData._id,refreshTokenFromCookie);
    if(!token){
      return res.status(401).json({message:'Invalid Token'})
    }
  }catch(error){
    return res.status(500).json({message:'Invalid Token'})
  }
  //check if valid user
  const user=await userService.findUser({_id:userData._id})
  if(!user){
    return res.status(404).json({message:'No User'})
  }
 
  //generate new tokens
  const{refreshToken,accessToken}=tokenService.generateTokens({_id:userData._id});
  //update refresh token
  try{
await tokenService.updateRefreshToken(userId,refreshToken)
  }catch(err){
    return res.status(500).json({message:'Invalid Token'})
  }

  //put token in cookie
  res.cookie('refreshtoken',refreshToken,{
    maxAge:1000*60*60*24*30,
    httpOnly:true
  })
  
  res.cookie('accessToken',accessToken,{
    maxAge:1000*60*60*24*30,
    httpOnly:true,
  
  })

  //response
  const userdto=new UserDto(user);
  res.json({user:userdto,auth:true});



}
async logout(req,res){
  const{refreshToken}=req.cookies;
  //delete refresh token from db
  await tokenService.removeToken(refreshToken);

  //delete cookies
res.clearCookie('refreshtoken');
res.clearCookie('accessToken');
res.json({user:null,auth:false});

}


  }
  
  module.exports = AuthController;