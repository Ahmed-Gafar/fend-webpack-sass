var path = require("path");
const express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
// to use json
app.use(bodyParser.json());
// to use url encoded values
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static("dist"));

// if (process.env.NODE_ENV === "production"){
//   app.use(express.static("build"));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname,  "build", "index.html"));
//   });
// }

let API_KEY = process.env.API_KEY;

app.get("/api_key", function (req, res) {
    res.json(process.env.API_KEY);
});

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

// designates what port the app will listen to for incoming requests
app.listen(process.env.PORT || 8081, function () {
  console.log('from logs in server : '  + process.env.API_KEY);

  console.log("Example app listening on port 8081!");
});
