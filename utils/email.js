const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const path = require('path')
dotenv.config({
    path:path.join(__dirname,'./../config.env')
})
const transport = nodemailer.createTransport({
    host:process.env.MAIL_HOST,
    port:process.env.MAIL_PORT,
    auth:{
        user:process.env.MAIL_USERNAME,
        pass:process.env.MAIL_PASSWORD
    }
});
const sendEmail =async (options)=>{ 
    await transport.sendMail({
    from:'ABDCHAITANYA <abcd@gmail.com>',
    to:`${options.email}`,
    subject:'This is your mail',
    text:`${options.text}`
})}
module.exports = sendEmail;