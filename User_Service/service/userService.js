import userRepo from "../repository/userRepo.js";
import bcrypt from "bcryptjs"
import AppError from "../error/AppError.js"
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ path: "./.env"}); // Specify a custom .env file path



//register
const registerService = async (userInfo) => {
    const hashedPassword = await bcrypt.hash(userInfo.password,10);
    userInfo.password = hashedPassword;
    return await userRepo.registerRepo(userInfo);
};
//login
const loginService = async(email, password) => {

    const user =  await userRepo.fetchUser(email);
   

    if(!user){throw new AppError('email not valid ',400)}
    const isMatch =  await bcrypt.compare(password,user.password);
    

    if(!isMatch){
        throw new AppError('Invalid password',400);
    }
    
    const acessToken =await generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);

     



    return {acessToken, refreshToken, user};


}



// generate access token
const generateAccessToken = async (user)=>{
    return jwt.sign({ id:user._id, email: user.email, role: user.role  },process.env.jwtSecret, { expiresIn :process.env.jwtAccessExpire});
    
}
//generate refresh token 
const generateRefreshToken = async (user)=>{
    return jwt.sign({ id:user._id, email:user.email, role: user.role ,type:"refresh" },process.env.jwtSecret, { expiresIn :process.env.jwtAccessExpire});
}


const getUaserService = async (userId)=>{

    const user = await userRepo.getUserById(userId);
   
    if(!user){
        throw new AppError("User not found with this id ");
    }
    return user;


}


const editUserService = async (userId,data) =>{
    const editUser =await userRepo.editUser(userId,data);
   
    return editUser;
}

const deleteUserService = async (userId)=>{
    const deluser = await userRepo.deleteUser(userId);
    if(!deluser){
        throw new AppError("id not found to be deleted",404);
    }

    return deluser; 
}


const getForgetPasswordService = async (uid)=>{
    const ans = await userRepo.getForgotPassword(uid);
    return ans;

}

const resetService= async (uid,oldpass,newpass)=>{
    //uid from session  password form req.body
    const dbpass = await userRepo.fetchPassword(uid);
    
    console.log(typeof(dbpass));
    if(!dbpass){ throw new AppError("password not found")}
    
    const ismatch = await bcrypt.compare(oldpass,dbpass.password)// await missing
    
    const newhashed_password = await bcrypt.hash(newpass,10);
    
    if(ismatch){
        const rsetpass = await userRepo.resetPassword(uid, newhashed_password);
        console.log(rsetpass.password);
        return rsetpass;
        
    }
     
    
}







export default {
    registerService,
    loginService,
    getUaserService,
    editUserService,
    deleteUserService,
    getForgetPasswordService,
    resetService,
};
