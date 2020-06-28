const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
require("dotenv/config");

//Import Routes
const apiRoute = require("./routes/api");

//Middleware
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use("/api", apiRoute);

//Connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to database")
);

//Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//Listening
app.listen(process.env.PORT || 8000, () => {
  console.log("Express server started");
});
