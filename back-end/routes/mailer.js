var nodemailer = require('nodemailer')
var dotenv = require('dotenv')

dotenv.config()

// setup default SMTP transport
var transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST, // sender host
  port: 465, // sender host port
  secure: true, // true for 465, false for other ports
  auth: {
      user: process.env.MAIL_FROM, // generated ethereal user
      pass: process.env.MAIL_PASS //generated ethereal password
  }
});

exports.send = function(object, code){
  var content = `您的验证码是 ${code}`
  
  // setup email data
  var mail = {
    from: `"Fangoo" <${process.env.MAIL_FROM}>`,
    to: object,
    subject: '[Fangoo] email verification',
    text: content
  }

  // send email with transporter defined before
  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({msg: 'fail'})
    } else {
      res.json({msg: 'success'})
    }
  })
}
