const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const cron = require('node-cron');
const bodyParser = require('body-parser');
const mailSchema = require('./model/email.mongo')


const appRoute = require('./routes/route.js')
const { getbill } = require('./controller/appController.js')
const app = express();
const PORT = process.env.PORT || 4321;

app.use(bodyParser.json()); // to parse JSON request body
app.use(bodyParser.urlencoded({ extended: true })); // to parse URL-encoded request body
app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static())
app.use(cors({
    origin:'*'
}));
/** routes */
// app.use('/', appRoute);

function connect() {
    const uri = 'mongodb+srv://dhruvarora595:HDGACBSP@cluster0.lfjzspy.mongodb.net/email?retryWrites=true&w=majority';

    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.log(error));

}

cron.schedule("15 13 * * *", getbill);

app.get("/getbll", getbill);
app.get("/prabhu", function (req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
    // res.send(200);
})
app.post("/add_mail", async function(req, res) {
    // console.log(res);
    const id = req.body;
   // console.log(Object.keys(id)[0]);
   const findemail = await mailSchema.find({email:Object.keys(id)[0]});
   if(findemail.length > 0){
    console.log("already exists")
    res.send("already exists")
   }
   else {const newemail = await mailSchema.create({email:Object.keys(id)[0]});
   console.log(newemail);
   res.send("added");
}
})

app.listen(PORT, () => {
    connect();
    console.log(`Server is running on http://localhost:${PORT}`)
})
