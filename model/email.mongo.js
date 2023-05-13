const mongoose = require('mongoose');

const mailSchema = new mongoose.Schema({
  email:{
    type:String,
    unique:true
  }
});

module.exports = mongoose.model('Mail', mailSchema);
