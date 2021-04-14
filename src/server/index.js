var path = require("path");
const express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");

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

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

// designates what port the app will listen to for incoming requests
app.listen(process.env.PORT || 8081, function () {
  console.log("Example app listening on port 8081!");
});
