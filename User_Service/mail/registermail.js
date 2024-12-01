
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:  {
        user: 'islamsavage8@gmail.com',    
        pass: process.env.gmailpassword,     
      },
});


export async function sendRegisterMail(usermail,f_name,lname){
    const mailOptions = {
        from: "islamsavage8@gmail.com", 
        to: usermail,          
        subject: 'Welcome to MysEshop!',
        text: `Thank you for registering! We are excited to have you with us ${f_name} ${lname} ` ,
        

    };
    try{
        await transporter.sendMail(mailOptions);
        console.log("mail send");
    }catch(err){
        console.log("error in sending the mail",err)
    }
}
