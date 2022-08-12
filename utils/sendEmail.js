const nodemailer = require('nodemailer')

export const sendEmail = (email, token) => {
    let email = email;
    let token = token;

    let mail = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'godwin2341@gmail.com',
            pass:'Kingsly8'
        }
    });
    let mailOptions = {
        from: 'godwin2341@gmail.com',
        to:email,
        subject:'Email verification',
        html: '<p>Kindly use this <a href="http://localhost:3000/verify-email?token=' + token + '">link</a> to verify your email address</p>'
    }
    mail.sendMail(mailOptions, (error, info) => {
        if(error){
            return 1
        }else {
            return 0
        }
    } )
}
