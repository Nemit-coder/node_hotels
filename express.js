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

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 5000


app.get('/', function(req, res) {
    res.send("Welcome to menu")
})

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

// Use the routers
app.use('/person', personRouter);
app.use('/menu', menuitemRouter);

app.listen(PORT, () => {console.log('Server Started Sucessfully');})