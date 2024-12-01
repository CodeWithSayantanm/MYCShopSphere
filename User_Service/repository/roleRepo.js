import db from '../models/roleModel.js';


const addrole = async (id,name)=>{
    const info = {
        id:id,
        name:name,
    }

const obj = await db.find({});//get the first object and one and only enrty

// if array empty insert this way
if(obj[0]==undefined){
    const crt1 = await db.create({
        entries: [
            info,
        ]
    })
    
    return crt1;

}else if(obj[0]!==undefined){
    //find by id and update
    const crt2 = await db.updateOne({id:obj._id},{$push: {entries:info}})
    return crt2;
}

}





export default {
    addrole,
}