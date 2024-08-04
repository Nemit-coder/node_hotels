// Function
// function abc(a,b){
//     console.log(`The sum is ${a+b}`);
// }
// abc(2,2)

// let add = function(a,b) {
//     console.log(`The sum is ${a+b}`);
// }
// add(5,5)

// let add = (a,b) => {
//     console.log(`The sum is ${a+b}`);
// }
// add(10,10)


// CallBack Functions
// let msg = () => {
//     console.log("The sum is Completed");
// }

// let main = (a,b,callback) => {
//     let sum = a + b;
//     console.log("The Sum is " + sum);
//     callback();
// }
// main(2,2,msg)


// Using OS and fs from node modules
// var fs = require('fs');
// var os = require('os');

// var user = os.userInfo()


// fs.appendFile('greeting.txt',"Hi " + user.username +"!"+ "\n", function() {
//     console.log("The File Is Created Successfully");
// })



// Using exports
// var notes = require('./notes.js')

// var age = notes.age
// var result = notes.addNumbers(age+2,10)
// console.log(result);


// Using Lodash
var _ = require('lodash')

var data = ["person","person",1,1,2,3,2,"name","yash","name"]
var filter = _.uniq(data)
console.log(filter);

console.log(_.isString(3));

