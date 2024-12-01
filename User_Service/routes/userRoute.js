import express from "express";
import userController from "../controller/userController.js"
import auth from "../middleware/auth.js"


const userRoute = express.Router();


userRoute.post('/register',userController.register);

userRoute.post('/login',userController.login);

userRoute.post('/logout',userController.LogOut);

userRoute.get('/:userId',userController.getUserById);

userRoute.put('/:userId',auth.authenticate,userController.editUser);

userRoute.delete('/:userId',auth.authenticate,userController.delUser);

userRoute.get('/get/role',userController.roles);

userRoute.get('/forgot/password',auth.authenticate,userController.Forgot);

userRoute.get('/reset-password',);

userRoute.get('/',);

export default userRoute;