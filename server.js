const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/logins", {
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Error ...', err);
    process.exit();
});

const login = express();

login.use(bodyParser.urlencoded({ extended: true }))

login.use(bodyParser.json())

login.get('/', (req, res) => {
    res.json({"message": "Server is running :D"});
});

let PORT = 8080

require('./login/routes/loginroute.js')(login);

login.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});