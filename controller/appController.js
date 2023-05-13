const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
const mailSchema= require('../model/email.mongo')
const {getQuote} = require("./quotes.js");
const { EMAIL, PASSWORD } = require('../env.js')

/** send mail from testing account */

// const signup = async (req, res) => {

//     /** testing account */
//     let testAccount = await nodemailer.createTestAccount();

//       // create reusable transporter object using the default SMTP transport
//     let transporter = nodemailer.createTransport({
//         host: "smtp.ethereal.email",
//         port: 587,
//         secure: false, // true for 465, false for other ports
//         auth: {
//             user: testAccount.user, // generated ethereal user
//             pass: testAccount.pass, // generated ethereal password
//         },
//     });

//     let message = {
//         from: '"Fred Foo 👻" <foo@example.com>', // sender address
//         to: "bar@example.com, baz@example.com", // list of receivers
//         subject: "Hello ✔", // Subject line
//         text: "Successfully Register with us.", // plain text body
//         html: "<b>Successfully Register with us.</b>", // html body
//       }


//     transporter.sendMail(message).then((info) => {
//         return res.status(201)
//         .json({ 
//             msg: "you should receive an email",
//             info : info.messageId,
//             preview: nodemailer.getTestMessageUrl(info)
//         })
//     }).catch(error => {
//         return res.status(500).json({ error })
//     })

//     // res.status(201).json("Signup Successfully...!");
// }


/** send mail from real gmail account */
const getbill = async (req, res) => {
    console.log("hariiiiii");
    const data = await mailSchema.find({});
    // const { userEmail } = req.body;
    // console.log(userEmail);
    let customerList = "";
    console.log(data.length);
    for(let i = 0; i < data.length; ++i) {
        if(i != data.length - 1) {
            customerList += data[i].email;
            customerList += ", ";
        } else {
            customerList += data[i].email;

        }
    }
    console.log(data);
    console.log("herererre");
    console.log(customerList);
    const [pic, quote] = await getQuote();
    let config = {
        service : 'gmail',
        auth : {
            user: EMAIL,
            pass: PASSWORD
        }
    }

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
        theme: 'salted',
    // Custom text direction
    //textDirection: 'rtl',
        product: {
        name: "Dhruv-Arora-Git",
        link:pic,
        // Custom product logo URL
        logo: pic,
        // Custom logo height
        logoHeight: '108px',
        logoWidth:  '108px',

    }
    })

    let response = {
        body: {
            greeting: "Hare Krishna",
            name : "Devotee",
            intro: [`${quote}`],
            outro: ["Wish you a very Happy Krishna Conscious day"],
        },
        product: {
        name: 'Dhruv Arora',
        link: 'https://github.com/Dhruv-Arora-Git',
        // Custom copyright notice
        copyright: 'Copyright © 2023 Dhruv-Arora-Git. All rights reserved.',
    }
    }

    let mail = MailGenerator.generate(response)
    const today = (new Date()).toString().split(' ').splice(1,3).join(' ');
    let message = {
        from : EMAIL,
        bcc : customerList,
        subject: `Prabhupada Vani - ${today}`,
        html: mail
    }

    transporter.sendMail(message).then(() => {
        // return res.status(201).json({
           console.log("you should receive an email");
        // })
    }).catch(error => {
        console.log(error);
    })

    // res.status(201).json("getBill Successfully...!");
}


module.exports = {
    getbill
}