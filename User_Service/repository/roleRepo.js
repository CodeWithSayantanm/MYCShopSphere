import db from '../models/roleModel.js';


const addrole = async (id,name)=>{
    const info = {
        id:id,
        name:name,
    }

const obj = await db.find({});//get the first object and one and only enrty
const isFound = await db.find({
    entries:{
        $elemMatch: {id: id}
    }
})//check if it exists
// console.log(isFound)
// if array empty insert this way
if(obj[0]==undefined){
    const crt1 = await db.create({
        entries: [
            info,
        ]
    })
    
    return crt1;

}else if(obj[0]!==undefined && isFound==false){
    //find by id and update
    const crt2 = await db.updateOne({id:obj._id},{$push: {entries:info}})
    return crt2;
}
return true;
}

const findUserByEmail = async (useremail)=>{
    return await db.findOne({email:useremail});
}



export default {
    addrole,
    findUserByEmail
}