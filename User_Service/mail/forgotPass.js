
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





export async function sendFrofotPasswordMail(userinfo, password) {
    

    const mailOptions = {
        from: `Myc E Shop <${process.env.EMAIL}>`, 
        to: userinfo.email,          
        subject: 'Welcome to MysEshop!',
        text: `Your password ` ,
        html: `<!DOCTYPE html>
                <html>
                <head>
                <title>Welcome</title>
                <style>
                    body { font-family: Arial, sans-serif; }
                    .container { padding: 20px; background-color: #f9f9f9; }
                    .header { font-size: 24px; color: #333; }
                    .content { font-size: 16px; margin-top: 10px; }
                </style>
                </head>
                <body>
                <div class="container">
                    <div class="header">Welcome to Your password!</div>
                    <div class="content">
                    <p>Hello ${userinfo.first_name},</p>
                    <p>You are using our password service </p>
                    <p>your password is : ${password}</p>
                    <p>Regards, <br> The Team MycEshop</p>
                    </div>
                </div>
                </body>
                </html>`
    };




    try{
        await transporter.sendMail(mailOptions);
        console.log("mail send");
    }catch(err){
        console.log("error in sending the mail",err)
    }
}
