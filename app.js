const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const options = require("./secrets");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", function name(req, res) {
  const fisrtName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fisrtName,
          LNAME: lastName,
        },
      },
    ],
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us14.api.mailchimp.com/3.0/lists/40ef769ee4";

  const request = https.request(url, options, function (response) {
    response.on("data", function (data) {
        console.log(JSON.parse(data));
    })
  }); 
  request.write(jsonData);
  request.end();
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server start on port 3000");
});
