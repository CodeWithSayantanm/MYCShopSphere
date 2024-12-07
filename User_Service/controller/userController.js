import userService from "../service/userService.js"
import roleService from "../service/roleService.js"
import {sendRegisterMail} from "../mail/registermail.js"
import {sendFrofotPasswordMail} from "../mail/forgotPass.js"


const register = async(req,res,next) => {
    // const { name, email, password } = req.body;
    // Add user to the database
    try{
    const ans = await userService.registerService(req.body);
        if(ans){
             sendRegisterMail(ans.email,ans.first_name,ans.last_name)
        }
    res.status(201).json({ message: 'User created successfully',details: ans});
    }catch(err){
        next(err);
    }
}



const login = async(req, res, next) => { 
    try{
        const {email, password} = req.body;
        
        let token = await userService.loginService(email, password);
        req.session.user = token.user//session saved 
        
        req.session.newpassword = password;
       
        // console.log(req.session);

        req.session.save();
        //add to rolelist
        const {name} = req.session.user?.role
        const id = req.session.user?._id;
        
        // ad in log in db 
        const rolelist = await roleService.addRoleService(id,name);

        // if(rolelist){console.log("added to role list",id,name)}


    
        
        res.status(200).json({ messsage:"logged in succesful",token});


    }catch(err){
        next(err);
    }
}

const getUserById = async(req, res, next) => {
    try{
        const id = req.params.userId;
        const user =  await userService.getUaserService(id);
        res.status(200).json({user})
    }catch(err){
        next(err);
    }
}

const editUser = async(req, res, next) => {
    try{
        const id = req.params.userId;
        
        // const id  = req.session.user._id;
        const data = req.body;
        const isupdated = await userService.editUserService(id,data);
        
        //session created again
        if(isupdated){
            console.log(isupdated)
            req.session.user = isupdated
        }
        
        res.status(200).json({message:"user updated"})

        
    }catch(err){
        next(err);
    }
}


const delUser = async (req,res,next) => {
        try{
            const id = req.params.userId;
            const deleteUser = await userService.deleteUserService(id);
            res.status(200).json({message:"user deleted succesfully",deleteUser})
        }catch(err){
            next(err);
        }
}



const Forgot = async(req, res, next) => {
    try{  
        // const id  = req.params.uid;
        const id = req.session.user?._id.toString();
        
        const pass = req.session.newpassword;

        const ans = await userService.getForgetPasswordService(id)
        // console.log(req.session);
        if(ans){
            sendFrofotPasswordMail(ans,pass);
            res.status(200).json({message:"password is returned"});
        }
        //  sendFrofotPasswordMail(ans,pass);
        res.status(500).json({message:"password not returned"});

    }catch(err){
        next(err);
    }
}

const LogOut =  async (req, res , next ) => {
    try{
        req.session.destroy(err => {
             if (err) { return res.status(500).send('Failed to destroy session');

              }
         res.status(200).json({message:"user logged out"}); 
        });
        console.log("user succesfully log out");
    }catch(err){
        next(err);
    }
}


const roles =  async (req, res , next ) => {
    try{    
        const userRole =  req.session.user?.role.name;
        if (userRole){
            res.status(200).json({role:userRole})
        }
        res.status(500).json({message:"User role not found"});
    }catch(err){
        next(err);
    }

}


const resetPassword = async (req, res, next) => {
    try{    
        const {oldpassword,newpassword} = req.body;
        // console.log(oldpassword ,newpassword)


        const uid = req.session.user?._id;
        const ans = await userService.resetService(uid,oldpassword,newpassword);
        if(ans){
            res.status(200).json({message:"User reset password"});
        }

    }catch(err){
        next(err);
    }
}



export default {
    register,
    login,
    getUserById,
    editUser,
    delUser,
    Forgot,
    LogOut,
    roles,
    resetPassword,
}   