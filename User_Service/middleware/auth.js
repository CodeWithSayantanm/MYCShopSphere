import jwt from 'jsonwebtoken';
import AppError from "../error/AppError.js"
import dotenv from 'dotenv';

dotenv.config({ path: "./.env"}); // Specify a custom .env file path
const jwtSecret = process.env.jwtSecret;
const jwtRefreshSecret = process.env.jwtRefreshSecret;
// const jwtAccessExpire = process.env.jwtAccessExpire;
// const jwtRefreshExpire = process.env.jwtRefreshExpire;
const authenticate = (req,res,next) => {
    const token = req.headers.auth;
    const refresh_token = req.headers['x-refresh-token'];
    
    
    // check if the session is valid or not --- check first 
    
    // if(req.session.user== null){
    //     return  next(new AppError('session expired ',400));
    // }
    // check if token in req headers 
    if(!token){
        return  next(new AppError('Token not Present login please ',400));
    }

    jwt.verify(token,jwtSecret,(err ,decoded)=>{
        if(err){
            //checks for tokenexpires error if refresh_token is present then verfiy
            if(err.name = 'TokenExpiredErro'&& refresh_token){
                jwt.verify(refresh_token ,jwtRefreshSecret, (err,refdecoded)=>{
                    if(err){
                        res.status(401).json({message:'invalid refresh token please login'})
                    }
                        /* if ref token is valid refdecoded contains info  
                        of user make another jwt accesstoken  form it */
                    const newAccessToken =  jwt.sign({ id:user._id, email:user.email, role: user.role  }, jwtSecret, { expiresIn :process.env.jwtAccessExpire});
                    
                        //attach new token
                        res.setHeader('x-new-access-token',newAccessToken);
                        req.user = refdecoded;
                        next();
                });
            }else{
                return res.status(401).json({ message: 'Invalid or expired access token' });
            }
        }else{
            //if ref token is ok 
            req.user =decoded;
            next();
        }
    });





}

const authorization = (req,res,next) =>{

    if(req.user.role?.name !=='Admin'){
        return next(new AppError('You do not have permission to perform this action', 403));
    }
    next();
}


export default {
    authenticate,
    authorization

}