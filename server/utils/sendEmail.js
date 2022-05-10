const nodemailer = require ('nodemailer')
var mailTransport=nodemailer.createTransport({
    service:'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user : process.env.MAIL_ADMIN,
        pass : process.env.MAIL_PASS,
    }
});
function sendMail(){
    mailTransport.sendMail({
        from: 'ifc.datacollection@gmail.com',
        to : 'thamtc.ifc@gmail.com',
        subject : 'Hello',
        text: "Hello How do u do ?",
    },function(err,info){
        if(err){
            console.log('Unable to send the mail :'+err.message);
        }
        else{
            console.log('Message response : '+info.response);
        }
    });
}
module.exports = sendMail()