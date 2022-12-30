const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");


const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname+ "/signup.html");
})
app.post("/", function name(req, res) {
    
    var fisrtName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;
    console.log(fisrtName, lastName, email);
})



app.listen(process.env.PORT||3000, function(){
    console.log("Server start on port 3000");

})