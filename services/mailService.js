const nodemailer = require("nodemailer");
const sendgrid = require("nodemailer-sendgrid-transport");

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport(
      sendgrid({
        host: "smtp.sendgrid.net",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          api_key: process.env.SENDGRID_API_KEY        
        },
      })
    );

    this.mailOptions = {
        from: process.env.EMAIL_FROM,
        to: '',
        subject: "Send From HK",
        text: "Hey there.",
        html: "",
      };
  }

  async sendMail(options){    
    this.transporter.sendMail(options)
    .then((info) => console.log(info))
    .catch(err => console.log(err))
  }

  async sendEmailConfirmToken(to, token) {
    let link = process.env.BASE_URL + 'confirm-email/' + token;
    let href = `<a href=${link}'>Confirm E-mail</a>`;
    let options = {...this.mailOptions, to: to, html: href}  
    this.sendMail(options);
  }
}

module.exports = new MailService();
