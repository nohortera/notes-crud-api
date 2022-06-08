const {Schema, model} = require('mongoose');

const Note = new Schema({
  userId: String,
  completed: {type: Boolean, default: false},
  text: String,
  createdDate: {type: Date, default: Date.now()},
}, {versionKey: false});

module.exports = model('Note', Note);
