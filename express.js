// JSON To Object
// var jsonString = '{"name":"nemit","age":25,"hobbies": "dancing"}';

// var jsonObject = JSON.parse(jsonString)
// console.log(jsonObject);

// Object To JSON
// var jsonObject = {name: "nemit", age: 25, hobby: "reading"}
// var jsonString = JSON.stringify(jsonObject)
// console.log(jsonString);


// Creating Server
var express = require('express');
var app = express();
const db = require('./db');
require('dotenv').config();
const passport = require('./auth');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 5000

// Middleware Function
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`);
    next();
}
app.use(logRequest);


app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local',{session: false});
app.get('/', function(req, res) {
    res.send("Welcome to menu")
})


// Extra Request Handlers
app.get('/vadapav', function(req, res) {
    var variety = {
        vadapav1: "simple",
        vadapav2: "butter",
        vadapav3: "grill"
    }
    res.send(variety)
})
app.get('/Samosa', function(req, res) {
    res.send("Here you can get Samosa")
})

//Import the router files
const personRouter = require('./routes/personRoutes');
const menuitemRouter = require('./routes/menuitemRoutes');
// const passport = require('passport');

// Use the routers
app.use('/person',localAuthMiddleware, personRouter);
app.use('/menu', localAuthMiddleware ,menuitemRouter);

app.listen(PORT, () => {console.log('Server Started Sucessfully');})
