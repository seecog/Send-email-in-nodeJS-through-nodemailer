var express = require("express");
var app = express();
var route = express.Router();

//bodyparser starts
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//bodyparser endnd

//email configuration start
var nodemailer = require("nodemailer");
    var smtpTransport = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
            user: "***@gmail.com",
            pass: "***"
        }
    });

    var mailOptions = {
        to: "ari.ballav@gmail.com",
        subject: "Testing",
        text: "Hello world"
    }
//email configuration end

route.post('/email', function (req, res) {
 
    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
            res.end("error");
        } else {
            res.json({ message: 'email sent' })
        }
    });

});

app.use('/api', route);
app.listen(3000, function () {
    console.log('server starts');
});