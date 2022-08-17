const nodemailer  = require('nodemailer');

const config = nodemailer.createTransport({
    // host: 'smtp.ethereal.email',
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'alex.nodemailer.cornejo@gmail.com',
        pass: 'bvzehkrhbnhaqghs'
    }
});
module.exports = config;