import roleRepo from '../repository/roleRepo.js';
import AppError from "../error/AppError.js"


const addRoleService = async (id,name)=>{
    const role = await roleRepo.addrole(id,name);
    if(!role){
        throw new AppError("Couldn't add role in role list ",500)
    }
    return role;
}

export default {
    addRoleService,
}