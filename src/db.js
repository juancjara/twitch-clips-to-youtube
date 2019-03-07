const mongoose = require('mongoose');

const connect = () => mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {useNewUrlParser: true});

module.exports.connect = connect
